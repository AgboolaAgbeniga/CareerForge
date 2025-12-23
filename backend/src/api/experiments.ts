import express from 'express';
import { z } from 'zod';
import { db } from '../utils/database';
import { experiments, experimentParticipants } from '../models/schema';
import { eq, desc, and, count } from 'drizzle-orm';
import { authenticateToken, requireRole, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Validation schemas
const createExperimentSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(['draft', 'running', 'completed', 'stopped']).default('draft'),
  variants: z.record(z.any()),
  targetAudience: z.record(z.any()).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

const updateExperimentSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  status: z.enum(['draft', 'running', 'completed', 'stopped']).optional(),
  variants: z.record(z.any()).optional(),
  targetAudience: z.record(z.any()).optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

const enrollParticipantSchema = z.object({
  variantAssigned: z.string(),
});

/**
 * @swagger
 * /api/experiments:
 *   get:
 *     summary: Get all experiments
 *     tags: [Experiments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [draft, running, completed, stopped]
 *         description: Filter by status
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
 *         description: Number of experiments per page
 *     responses:
 *       200:
 *         description: Experiments retrieved successfully
 */
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    let whereCondition = undefined;
    if (status) {
      whereCondition = eq(experiments.status, status as 'draft' | 'running' | 'completed' | 'stopped');
    }

    const experimentList = await db.select()
      .from(experiments)
      .where(whereCondition)
      .orderBy(desc(experiments.createdAt))
      .limit(Number(limit))
      .offset(offset);

    const totalCount = await db.select({ count: count() })
      .from(experiments)
      .where(whereCondition);

    res.json({
      experiments: experimentList,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: totalCount[0]?.count || 0,
        totalPages: Math.ceil((totalCount[0]?.count || 0) / Number(limit)),
      },
    });
    return;
  } catch (error) {
    console.error('Fetch experiments error:', error);
    res.status(500).json({ error: 'Failed to fetch experiments' });
    return;
  }
});

/**
 * @swagger
 * /api/experiments:
 *   post:
 *     summary: Create a new experiment
 *     tags: [Experiments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - variants
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [draft, running, completed, stopped]
 *               variants:
 *                 type: object
 *               targetAudience:
 *                 type: object
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Experiment created successfully
 */
router.post('/', authenticateToken, requireRole(['recruiter']), async (req: AuthRequest, res) => {
  try {
    const experimentData = createExperimentSchema.parse(req.body);

    const newExperiment = await db.insert(experiments).values({
      name: experimentData.name,
      description: experimentData.description || null,
      status: experimentData.status,
      variants: JSON.stringify(experimentData.variants),
      targetAudience: experimentData.targetAudience ? JSON.stringify(experimentData.targetAudience) : null,
      startDate: experimentData.startDate ? new Date(experimentData.startDate) : null,
      endDate: experimentData.endDate ? new Date(experimentData.endDate) : null,
    }).returning();

    if (newExperiment.length === 0) {
      throw new Error('Failed to create experiment');
    }

    res.status(201).json({ experiment: newExperiment[0] });
    return;
  } catch (error) {
    console.error('Create experiment error:', error);
    res.status(400).json({ error: 'Invalid input or failed to create experiment' });
    return;
  }
});

/**
 * @swagger
 * /api/experiments/{id}:
 *   get:
 *     summary: Get experiment by ID
 *     tags: [Experiments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Experiment ID
 *     responses:
 *       200:
 *         description: Experiment retrieved successfully
 *       404:
 *         description: Experiment not found
 */
router.get('/:id', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const experimentList = await db.select()
      .from(experiments)
      .where(eq(experiments.id, id!))
      .limit(1);

    if (experimentList.length === 0) {
      return res.status(404).json({ error: 'Experiment not found' });
    }

    res.json({ experiment: experimentList[0] });
    return;
  } catch (error) {
    console.error('Fetch experiment error:', error);
    res.status(500).json({ error: 'Failed to fetch experiment' });
    return;
  }
});

/**
 * @swagger
 * /api/experiments/{id}:
 *   put:
 *     summary: Update experiment
 *     tags: [Experiments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Experiment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [draft, running, completed, stopped]
 *               variants:
 *                 type: object
 *               targetAudience:
 *                 type: object
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Experiment updated successfully
 */
router.put('/:id', authenticateToken, requireRole(['recruiter']), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Experiment ID is required' });
    }
    const updateData = updateExperimentSchema.parse(req.body);

    const updateValues: any = {};
    if (updateData.name) updateValues.name = updateData.name;
    if (updateData.description !== undefined) updateValues.description = updateData.description;
    if (updateData.status) updateValues.status = updateData.status as 'draft' | 'running' | 'completed' | 'stopped';
    if (updateData.variants) updateValues.variants = JSON.stringify(updateData.variants);
    if (updateData.targetAudience) updateValues.targetAudience = JSON.stringify(updateData.targetAudience);
    if (updateData.startDate) updateValues.startDate = new Date(updateData.startDate);
    if (updateData.endDate) updateValues.endDate = new Date(updateData.endDate);
    updateValues.updatedAt = new Date();

    await db.update(experiments)
      .set(updateValues)
      .where(eq(experiments.id, id!));

    const updatedExperiment = await db.select()
      .from(experiments)
      .where(eq(experiments.id, id!))
      .limit(1);

    res.json({ experiment: updatedExperiment[0] });
    return;
  } catch (error) {
    console.error('Update experiment error:', error);
    res.status(400).json({ error: 'Invalid input or failed to update experiment' });
    return;
  }
});

/**
 * @swagger
 * /api/experiments/{id}:
 *   delete:
 *     summary: Delete experiment
 *     tags: [Experiments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Experiment ID
 *     responses:
 *       200:
 *         description: Experiment deleted successfully
 */
router.delete('/:id', authenticateToken, requireRole(['recruiter']), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    // Delete participants first (cascade should handle this, but being explicit)
    await db.delete(experimentParticipants).where(eq(experimentParticipants.experimentId, id!));

    // Delete experiment
    await db.delete(experiments).where(eq(experiments.id, id!));

    res.json({ message: 'Experiment deleted successfully' });
    return;
  } catch (error) {
    console.error('Delete experiment error:', error);
    res.status(500).json({ error: 'Failed to delete experiment' });
    return;
  }
});

/**
 * @swagger
 * /api/experiments/{id}/enroll:
 *   post:
 *     summary: Enroll user in experiment
 *     tags: [Experiments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Experiment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - variantAssigned
 *             properties:
 *               variantAssigned:
 *                 type: string
 *     responses:
 *       201:
 *         description: User enrolled successfully
 */
router.post('/:id/enroll', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'Experiment ID is required' });
    }
    const { variantAssigned } = enrollParticipantSchema.parse(req.body);
    const userId = req.user!.id;

    // Check if experiment exists
    const experimentList = await db.select()
      .from(experiments)
      .where(eq(experiments.id, id))
      .limit(1);

    if (experimentList.length === 0) {
      return res.status(404).json({ error: 'Experiment not found' });
    }

    // Check if user is already enrolled
    const existingParticipant = await db.select()
      .from(experimentParticipants)
      .where(and(
        eq(experimentParticipants.experimentId, id!),
        eq(experimentParticipants.userId, userId)
      ))
      .limit(1);

    if (existingParticipant.length > 0) {
      return res.status(400).json({ error: 'User already enrolled in this experiment' });
    }

    // Enroll user
    const participant = await db.insert(experimentParticipants).values({
      experimentId: id!,
      userId,
      variantAssigned,
    }).returning();

    res.status(201).json({ participant: participant[0] });
    return;
  } catch (error) {
    console.error('Enroll participant error:', error);
    res.status(400).json({ error: 'Invalid input or failed to enroll' });
    return;
  }
});

/**
 * @swagger
 * /api/experiments/{id}/participants:
 *   get:
 *     summary: Get experiment participants
 *     tags: [Experiments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Experiment ID
 *     responses:
 *       200:
 *         description: Participants retrieved successfully
 */
router.get('/:id/participants', authenticateToken, requireRole(['recruiter']), async (req: AuthRequest, res) => {
  try {
    const { id } = req.params;

    const participants = await db.select()
      .from(experimentParticipants)
      .where(eq(experimentParticipants.experimentId, id!))
      .orderBy(desc(experimentParticipants.enrolledAt));

    res.json({ participants });
    return;
  } catch (error) {
    console.error('Fetch participants error:', error);
    res.status(500).json({ error: 'Failed to fetch participants' });
    return;
  }
});

export default router;