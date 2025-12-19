import express from 'express';
import { z } from 'zod';
import { db } from '../utils/database';
import { messages, users } from '../models/schema';
import { eq, desc } from 'drizzle-orm';

const router = express.Router();

// Validation schemas
const sendMessageSchema = z.object({
  recipientId: z.number(),
  subject: z.string().optional(),
  content: z.string(),
  applicationId: z.number().optional(),
  attachments: z.array(z.any()).optional(),
});

const markReadSchema = z.object({
  // No body needed
});

// Database operations will be handled by Drizzle ORM

/**
 * @swagger
 * /api/messages:
 *   get:
 *     summary: Get user's messages
 *     tags: [Messaging]
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
 *         description: Number of messages per page
 *     responses:
 *       200:
 *         description: Messages retrieved successfully
 */
router.get('/', async (req, res) => {
  try {
    const userId = 'placeholder-user-id'; // TODO: From auth middleware
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 20;
    const offset = (page - 1) * limit;

    // Get messages where user is sender or recipient
    const userMessages = await db.select().from(messages)
      .where(eq(messages.senderId, userId) || eq(messages.recipientId, userId))
      .orderBy(desc(messages.sentAt))
      .limit(limit)
      .offset(offset);

    // Get total count (simplified - would need proper OR query)
    const totalResult = userMessages.length; // TODO: Implement proper count query

    res.json({
      messages: userMessages,
      pagination: {
        page,
        limit,
        total: totalResult,
      },
    });
    return;
  } catch (error) {
    console.error('Fetch messages error:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
    return;
  }
});

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Send a new message
 *     tags: [Messaging]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipientId
 *               - content
 *             properties:
 *               recipientId:
 *                 type: string
 *               subject:
 *                 type: string
 *               content:
 *                 type: string
 *               applicationId:
 *                 type: integer
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       200:
 *         description: Message sent successfully
 */
router.post('/', async (req, res) => {
  try {
    const { recipientId, subject, content, applicationId, attachments } = sendMessageSchema.parse(req.body);
    const senderId = 'placeholder-user-id'; // TODO: From auth

    const newMessage = await db.insert(messages).values({
      senderId,
      recipientId: recipientId.toString(),
      subject: subject || null,
      content,
      applicationId: applicationId ? applicationId.toString() : null,
      messageType: 'general',
      attachments: attachments ? JSON.stringify(attachments) : null,
    }).returning();

    if (newMessage.length === 0) {
      throw new Error('Failed to send message');
    }

    const message = newMessage[0] as any;

    // Emit via Socket.io (would be done in real app)
    // io.to(recipientId.toString()).emit('newMessage', message);

    res.json({ message });
    return;
  } catch (error) {
    console.error('Send message error:', error);
    res.status(400).json({ error: 'Invalid input' });
    return;
  }
});

/**
 * @swagger
 * /api/messages/{id}/read:
 *   put:
 *     summary: Mark message as read
 *     tags: [Messaging]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Message ID
 *     responses:
 *       200:
 *         description: Message marked as read
 *       404:
 *         description: Message not found
 */
router.put('/:id/read', async (req, res) => {
  try {
    const { id } = req.params;

    const existingMessages = await db.select().from(messages).where(eq(messages.id, id)).limit(1);
    if (existingMessages.length === 0) {
      return res.status(404).json({ error: 'Message not found' });
    }

    await db.update(messages).set({
      isRead: true,
      readAt: new Date(),
    }).where(eq(messages.id, id));

    const updatedMessage = await db.select().from(messages).where(eq(messages.id, id)).limit(1);
    const message = updatedMessage[0] as any;

    res.json({ message });
    return;
  } catch (error) {
    console.error('Mark as read error:', error);
    res.status(500).json({ error: 'Failed to mark as read' });
    return;
  }
});

export default router;