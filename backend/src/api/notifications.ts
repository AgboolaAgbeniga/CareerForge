import express from 'express';
import { z } from 'zod';
import { db } from '../utils/database';
import { notifications } from '../models/schema';
import { eq, desc, and, count } from 'drizzle-orm';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Validation schemas
const createNotificationSchema = z.object({
  type: z.enum(['application_update', 'new_message', 'job_match', 'interview_invite', 'system']),
  title: z.string(),
  content: z.string(),
  data: z.record(z.any()).optional(),
  expiresAt: z.string().optional(),
});

const markReadSchema = z.object({
  // No body needed
});

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Get user's notifications
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
 *           default: 20
 *         description: Number of notifications per page
 *       - in: query
 *         name: unreadOnly
 *         schema:
 *           type: boolean
 *           default: false
 *         description: Get only unread notifications
 *     responses:
 *       200:
 *         description: Notifications retrieved successfully
 */
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const unreadOnly = req.query.unreadOnly === 'true';
    const offset = (page - 1) * limit;

    const whereCondition = unreadOnly
      ? and(eq(notifications.userId, userId), eq(notifications.isRead, false))
      : eq(notifications.userId, userId);

    const userNotifications = await db.select()
      .from(notifications)
      .where(whereCondition)
      .orderBy(desc(notifications.createdAt))
      .limit(limit)
      .offset(offset);

    const totalCount = await db.select({ count: count() }).from(notifications).where(whereCondition);
    const totalResult = totalCount[0]?.count || 0;

    res.json({
      notifications: userNotifications,
      pagination: {
        page,
        limit,
        total: totalResult,
        totalPages: Math.ceil(totalResult / limit),
      },
    });
    return;
  } catch (error) {
    console.error('Fetch notifications error:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
    return;
  }
});

/**
 * @swagger
 * /api/notifications/{id}/read:
 *   put:
 *     summary: Mark notification as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *     responses:
 *       200:
 *         description: Notification marked as read
 *       404:
 *         description: Notification not found
 */
router.put('/:id/read', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Notification ID is required' });
    }
    const userId = req.user!.id;

    const existingNotification = await db.select()
      .from(notifications)
      .where(and(eq(notifications.id, id), eq(notifications.userId, userId)))
      .limit(1);

    if (existingNotification.length === 0) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    await db.update(notifications)
      .set({
        isRead: true,
        readAt: new Date(),
      })
      .where(eq(notifications.id, id));

    const updatedNotification = await db.select()
      .from(notifications)
      .where(eq(notifications.id, id))
      .limit(1);

    res.json({ notification: updatedNotification[0] });
    return;
  } catch (error) {
    console.error('Mark notification as read error:', error);
    res.status(500).json({ error: 'Failed to mark as read' });
    return;
  }
});

/**
 * @swagger
 * /api/notifications/{id}:
 *   delete:
 *     summary: Delete a notification
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Notification ID
 *     responses:
 *       200:
 *         description: Notification deleted successfully
 *       404:
 *         description: Notification not found
 */
router.delete('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Notification ID is required' });
    }
    const userId = req.user!.id;

    const existingNotification = await db.select()
      .from(notifications)
      .where(and(eq(notifications.id, id), eq(notifications.userId, userId)))
      .limit(1);

    if (existingNotification.length === 0) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    await db.delete(notifications).where(eq(notifications.id, id));

    res.json({ message: 'Notification deleted successfully' });
    return;
  } catch (error) {
    console.error('Delete notification error:', error);
    res.status(500).json({ error: 'Failed to delete notification' });
    return;
  }
});

/**
 * @swagger
 * /api/notifications/mark-all-read:
 *   put:
 *     summary: Mark all user notifications as read
 *     tags: [Notifications]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: All notifications marked as read
 */
router.put('/mark-all-read', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;

    await db.update(notifications)
      .set({
        isRead: true,
        readAt: new Date(),
      })
      .where(and(eq(notifications.userId, userId), eq(notifications.isRead, false)));

    res.json({ message: 'All notifications marked as read' });
    return;
  } catch (error) {
    console.error('Mark all notifications as read error:', error);
    res.status(500).json({ error: 'Failed to mark notifications as read' });
    return;
  }
});

export default router;