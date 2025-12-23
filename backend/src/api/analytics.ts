import express from 'express';
import { z } from 'zod';
import { db } from '../utils/database';
import { analyticsEvents } from '../models/schema';
import { eq, desc, count, sql } from 'drizzle-orm';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Validation schemas
const trackEventSchema = z.object({
  eventType: z.string(),
  eventData: z.record(z.any()).optional(),
  sessionId: z.string().optional(),
  userAgent: z.string().optional(),
  ipAddress: z.string().optional(),
});

/**
 * @swagger
 * /api/analytics/events:
 *   post:
 *     summary: Track an analytics event
 *     tags: [Analytics]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventType
 *             properties:
 *               eventType:
 *                 type: string
 *               eventData:
 *                 type: object
 *               sessionId:
 *                 type: string
 *               userAgent:
 *                 type: string
 *               ipAddress:
 *                 type: string
 *     responses:
 *       201:
 *         description: Event tracked successfully
 */
router.post('/events', async (req, res) => {
  try {
    const { eventType, eventData, sessionId, userAgent, ipAddress } = trackEventSchema.parse(req.body);

    // Get user ID from optional auth
    const userId = (req as AuthRequest).user?.id;

    await db.insert(analyticsEvents).values({
      userId: userId || null,
      eventType,
      eventData: eventData ? JSON.stringify(eventData) : null,
      sessionId: sessionId || null,
      userAgent: userAgent || null,
      ipAddress: ipAddress || null,
    });

    res.status(201).json({ message: 'Event tracked successfully' });
    return;
  } catch (error) {
    console.error('Track event error:', error);
    res.status(400).json({ error: 'Invalid input' });
    return;
  }
});

/**
 * @swagger
 * /api/analytics/events:
 *   get:
 *     summary: Get analytics events
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: eventType
 *         schema:
 *           type: string
 *         description: Filter by event type
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date (ISO format)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date (ISO format)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 50
 *         description: Number of events per page
 *     responses:
 *       200:
 *         description: Events retrieved successfully
 */
router.get('/events', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { eventType, startDate, endDate, page = 1, limit = 50 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let whereConditions = [];

    if (eventType) {
      whereConditions.push(eq(analyticsEvents.eventType, eventType as string));
    }

    if (startDate) {
      whereConditions.push(sql`${analyticsEvents.createdAt} >= ${startDate}`);
    }

    if (endDate) {
      whereConditions.push(sql`${analyticsEvents.createdAt} <= ${endDate}`);
    }

    const whereClause = whereConditions.length > 0 ? sql.join(whereConditions, sql` AND `) : undefined;

    const events = await db.select()
      .from(analyticsEvents)
      .where(whereClause)
      .orderBy(desc(analyticsEvents.createdAt))
      .limit(Number(limit))
      .offset(offset);

    const totalCount = await db.select({ count: count() })
      .from(analyticsEvents)
      .where(whereClause);

    res.json({
      events,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: totalCount[0]?.count || 0,
        totalPages: Math.ceil((totalCount[0]?.count || 0) / Number(limit)),
      },
    });
    return;
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ error: 'Failed to retrieve events' });
    return;
  }
});

/**
 * @swagger
 * /api/analytics/stats:
 *   get:
 *     summary: Get analytics statistics
 *     tags: [Analytics]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date (ISO format)
 *       - in: query
 *         name: endDate
 *         schema:
 *           type: string
 *           format: date
 *         description: End date (ISO format)
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully
 */
router.get('/stats', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { startDate, endDate } = req.query;

    let dateFilter = '';
    if (startDate && endDate) {
      dateFilter = `WHERE created_at >= '${startDate}' AND created_at <= '${endDate}'`;
    } else if (startDate) {
      dateFilter = `WHERE created_at >= '${startDate}'`;
    } else if (endDate) {
      dateFilter = `WHERE created_at <= '${endDate}'`;
    }

    // Get total events
    const totalEventsResult = await db.select({ count: count() }).from(analyticsEvents);
    const totalEvents = totalEventsResult[0]?.count || 0;

    // Get events by type
    const eventsByType = await db.execute(sql`
      SELECT event_type, COUNT(*) as count
      FROM analytics_events
      ${sql.raw(dateFilter)}
      GROUP BY event_type
      ORDER BY count DESC
    `);

    // Get daily events for the last 30 days
    const dailyEvents = await db.execute(sql`
      SELECT DATE(created_at) as date, COUNT(*) as count
      FROM analytics_events
      WHERE created_at >= NOW() - INTERVAL '30 days'
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `);

    res.json({
      totalEvents,
      eventsByType,
      dailyEvents,
      period: {
        startDate: startDate || 'all',
        endDate: endDate || 'all',
      },
    });
    return;
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to retrieve statistics' });
    return;
  }
});

export default router;