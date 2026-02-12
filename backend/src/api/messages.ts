import express, { Response } from 'express';
import { z } from 'zod';
import { db } from '../utils/database';
import { messages } from '../models/schema';
import { eq, desc, or, count } from 'drizzle-orm';
import { authenticateToken, AuthRequest, requireVerified } from '../middleware/auth';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../middleware/error';
import { sanitizeText } from '../utils/sanitizer';

const router = express.Router();

// Validation schemas
const sendMessageSchema = z.object({
  recipientId: z.string().uuid(),
  subject: z.string().max(255).optional(),
  content: z.string().min(1).max(10000),
  applicationId: z.string().uuid().optional(),
  attachments: z.array(z.any()).optional(),
});

const paginationSchema = z.object({
  page: z.string().transform(v => parseInt(v) || 1).optional(),
  limit: z.string().transform(v => parseInt(v) || 20).optional(),
});

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Get user's messages
 */
router.get('/', authenticateToken, catchAsync(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { page, limit } = paginationSchema.parse(req.query);
  const offset = (page! - 1) * limit!;

  // Get messages where user is sender or recipient
  const userMessages = await db.select().from(messages)
    .where(or(eq(messages.senderId, userId), eq(messages.recipientId, userId)))
    .orderBy(desc(messages.sentAt))
    .limit(limit!)
    .offset(offset);

  // Get total count
  const totalCount = await db.select({ count: count() }).from(messages)
    .where(or(eq(messages.senderId, userId), eq(messages.recipientId, userId)));

  const totalResult = Number(totalCount[0]?.count || 0);

  res.json({
    success: true,
    data: userMessages,
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
 * /api/messages:
 *   post:
 *     summary: Send a new message
 */
router.post('/', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const { recipientId, subject, content, applicationId, attachments } = sendMessageSchema.parse(req.body);
  const senderId = req.user!.id;

  // Sanitize content
  const sanitizedContent = sanitizeText(content);
  const sanitizedSubject = subject ? sanitizeText(subject) : null;

  const [newMessage] = await db.insert(messages).values({
    senderId,
    recipientId,
    subject: sanitizedSubject,
    content: sanitizedContent,
    applicationId: applicationId || null,
    messageType: 'general',
    attachments: attachments ? attachments : null,
    sentAt: new Date(),
  }).returning();

  if (!newMessage) {
    throw new AppError('Failed to send message', 500, 'INTERNAL_ERROR');
  }

  res.status(201).json({ success: true, data: newMessage });
}));

/**
 * @swagger
 * /api/messages/{id}/read:
 *   put:
 *     summary: Mark message as read
 */
router.put('/:id/read', authenticateToken, catchAsync(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;

  const [existingMessage] = await db.select().from(messages).where(eq(messages.id, id as string)).limit(1);

  if (!existingMessage) {
    throw new AppError('Message not found', 404, 'NOT_FOUND');
  }

  // Only recipient can mark as read
  if (existingMessage.recipientId !== userId) {
    throw new AppError('Unauthorized to mark this message as read', 403, 'FORBIDDEN');
  }

  const [updatedMessage] = await db.update(messages).set({
    isRead: true,
    readAt: new Date(),
  }).where(eq(messages.id, id as string)).returning();

  res.json({ success: true, data: updatedMessage });
}));

export default router;