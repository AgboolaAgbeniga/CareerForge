import express, { Response } from 'express';
import { z } from 'zod';
import { db } from '../utils/database';
import { analyticsEvents } from '../models/schema';
import { eq, desc, count, sql, and, gte, lte } from 'drizzle-orm';
import { authenticateToken, AuthRequest, optionalAuth, requireVerified } from '../middleware/auth';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../middleware/error';

const router = express.Router();

// Validation schemas
const trackEventSchema = z.object({
  eventType: z.string().min(1).max(50),
  eventData: z.record(z.any()).optional(),
  sessionId: z.string().optional(),
  userAgent: z.string().optional(),
  ipAddress: z.string().optional(),
});

const getEventsSchema = z.object({
  eventType: z.string().optional(),
  startDate: z.string().datetime().or(z.string().date()).optional(),
  endDate: z.string().datetime().or(z.string().date()).optional(),
  page: z.string().transform(v => parseInt(v) || 1).optional(),
  limit: z.string().transform(v => parseInt(v) || 50).optional(),
});

/**
 * @swagger
 * /api/analytics/events:
 *   post:
 *     summary: Track an analytics event
 */
router.post('/events', optionalAuth, catchAsync(async (req: AuthRequest, res: Response) => {
  const { eventType, eventData, sessionId, userAgent, ipAddress } = trackEventSchema.parse(req.body);
  const userId = req.user?.id;

  await db.insert(analyticsEvents).values({
    userId: userId || null,
    eventType,
    eventData: eventData ? eventData : null,
    sessionId: sessionId || null,
    userAgent: userAgent || null,
    ipAddress: ipAddress || null,
    createdAt: new Date(),
  });

  res.status(201).json({ success: true, message: 'Event tracked successfully' });
}));

/**
 * @swagger
 * /api/analytics/events:
 *   get:
 *     summary: Get analytics events
 */
router.get('/events', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  // Only admins or recruiters (for their own data maybe?) should access this. 
  // For now, let's just ensure they are authenticated.

  const { eventType, startDate, endDate, page, limit } = getEventsSchema.parse(req.query);
  const offset = (page! - 1) * limit!;

  const conditions = [];
  if (eventType) conditions.push(eq(analyticsEvents.eventType, eventType));
  if (startDate) conditions.push(gte(analyticsEvents.createdAt, new Date(startDate)));
  if (endDate) conditions.push(lte(analyticsEvents.createdAt, new Date(endDate)));

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const events = await db.select()
    .from(analyticsEvents)
    .where(whereClause)
    .orderBy(desc(analyticsEvents.createdAt))
    .limit(limit!)
    .offset(offset);

  const totalCount = await db.select({ count: count() })
    .from(analyticsEvents)
    .where(whereClause);

  const totalResult = Number(totalCount[0]?.count || 0);

  res.json({
    success: true,
    events,
    pagination: {
      page: page!,
      limit: limit!,
      total: totalResult,
      totalPages: Math.ceil(totalResult / limit!),
    },
  });
}));

/**
 * @swagger
 * /api/analytics/stats:
 *   get:
 *     summary: Get analytics statistics
 */
router.get('/stats', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const { startDate, endDate } = getEventsSchema.parse(req.query);

  const conditions = [];
  if (startDate) conditions.push(gte(analyticsEvents.createdAt, new Date(startDate)));
  if (endDate) conditions.push(lte(analyticsEvents.createdAt, new Date(endDate)));
  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  // Get total events
  const totalEventsResult = await db.select({ count: count() }).from(analyticsEvents).where(whereClause);
  const totalEvents = Number(totalEventsResult[0]?.count || 0);

  // Get events by type using Drizzle's cleaner syntax where possible, or safe sql tagged templates
  const eventsByType = await db.select({
    eventType: analyticsEvents.eventType,
    count: count(),
  })
    .from(analyticsEvents)
    .where(whereClause)
    .groupBy(analyticsEvents.eventType)
    .orderBy(desc(count()));

  // Get daily events for the last 30 days
  const dailyEvents = await db.select({
    date: sql<string>`DATE(${analyticsEvents.createdAt})`,
    count: count(),
  })
    .from(analyticsEvents)
    .where(and(whereClause, gte(analyticsEvents.createdAt, sql`NOW() - INTERVAL '30 days'`)))
    .groupBy(sql`DATE(${analyticsEvents.createdAt})`)
    .orderBy(desc(sql`DATE(${analyticsEvents.createdAt})`));

  res.json({
    success: true,
    totalEvents,
    eventsByType,
    dailyEvents,
    period: {
      startDate: startDate || 'all',
      endDate: endDate || 'all',
    },
  });
}));

export default router;