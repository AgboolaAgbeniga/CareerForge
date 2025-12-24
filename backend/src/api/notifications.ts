import express, { Response } from 'express';
import { z } from 'zod';
import { db } from '../utils/database';
import { notifications } from '../models/schema';
import { eq, desc, and, count } from 'drizzle-orm';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../middleware/error';

const router = express.Router();

// Validation schemas (for query and params)
const paginationSchema = z.object({
  page: z.string().transform(v => parseInt(v) || 1).optional(),
  limit: z.string().transform(v => parseInt(v) || 20).optional(),
  unreadOnly: z.string().transform(v => v === 'true').optional(),
});

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Get user's notifications
 */
router.get('/', authenticateToken, catchAsync(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { page, limit, unreadOnly } = paginationSchema.parse(req.query);
  const offset = (page! - 1) * limit!;

  const whereCondition = unreadOnly
    ? and(eq(notifications.userId, userId), eq(notifications.isRead, false))
    : eq(notifications.userId, userId);

  const userNotifications = await db.select()
    .from(notifications)
    .where(whereCondition)
    .orderBy(desc(notifications.createdAt))
    .limit(limit!)
    .offset(offset);

  const totalCount = await db.select({ count: count() }).from(notifications).where(whereCondition);
  const totalResult = Number(totalCount[0]?.count || 0);

  res.json({
    success: true,
    notifications: userNotifications,
    pagination: {
      page,
      limit,
      total: totalResult,
      totalPages: Math.ceil(totalResult / limit!),
    },
  });
}));

/**
 * @swagger
 * /api/notifications/{id}/read:
 *   put:
 *     summary: Mark notification as read
 */
router.put('/:id/read', authenticateToken, catchAsync(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;

  const [existingNotification] = await db.select()
    .from(notifications)
    .where(and(eq(notifications.id, id), eq(notifications.userId, userId)))
    .limit(1);

  if (!existingNotification) {
    throw new AppError('Notification not found', 404, 'NOT_FOUND');
  }

  const [updatedNotification] = await db.update(notifications)
    .set({
      isRead: true,
      readAt: new Date(),
    })
    .where(eq(notifications.id, id))
    .returning();

  res.json({ success: true, notification: updatedNotification });
}));

/**
 * @swagger
 * /api/notifications/{id}:
 *   delete:
 *     summary: Delete a notification
 */
router.delete('/:id', authenticateToken, catchAsync(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;

  const [existingNotification] = await db.select()
    .from(notifications)
    .where(and(eq(notifications.id, id), eq(notifications.userId, userId)))
    .limit(1);

  if (!existingNotification) {
    throw new AppError('Notification not found', 404, 'NOT_FOUND');
  }

  await db.delete(notifications).where(eq(notifications.id, id));

  res.json({ success: true, message: 'Notification deleted successfully' });
}));

/**
 * @swagger
 * /api/notifications/mark-all-read:
 *   put:
 *     summary: Mark all user notifications as read
 */
router.put('/mark-all-read', authenticateToken, catchAsync(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  await db.update(notifications)
    .set({
      isRead: true,
      readAt: new Date(),
    })
    .where(and(eq(notifications.userId, userId), eq(notifications.isRead, false)));

  res.json({ success: true, message: 'All notifications marked as read' });
}));

export default router;