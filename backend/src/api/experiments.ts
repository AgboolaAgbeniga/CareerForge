import express, { Response } from 'express';
import { z } from 'zod';
import { db } from '../utils/database';
import { experiments, experimentParticipants } from '../models/schema';
import { eq, desc, and, count } from 'drizzle-orm';
import { authenticateToken, requireRole, AuthRequest, requireVerified } from '../middleware/auth';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../middleware/error';

const router = express.Router();

// Validation schemas
const createExperimentSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  status: z.enum(['draft', 'running', 'completed', 'stopped']).default('draft'),
  variants: z.record(z.any()),
  targetAudience: z.record(z.any()).optional(),
  startDate: z.string().datetime().or(z.string().date()).optional(),
  endDate: z.string().datetime().or(z.string().date()).optional(),
});

const updateExperimentSchema = createExperimentSchema.partial();

const enrollParticipantSchema = z.object({
  variantAssigned: z.string().min(1),
});

const getExperimentsSchema = z.object({
  status: z.enum(['draft', 'running', 'completed', 'stopped']).optional(),
  page: z.string().transform(v => parseInt(v) || 1).optional(),
  limit: z.string().transform(v => parseInt(v) || 20).optional(),
});

/**
 * @swagger
 * /api/experiments:
 *   get:
 *     summary: Get all experiments
 */
router.get('/', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const { status, page, limit } = getExperimentsSchema.parse(req.query);
  const offset = (page! - 1) * limit!;

  const whereCondition = status ? eq(experiments.status, status) : undefined;

  const experimentList = await db.select()
    .from(experiments)
    .where(whereCondition)
    .orderBy(desc(experiments.createdAt))
    .limit(limit!)
    .offset(offset);

  const totalCount = await db.select({ count: count() })
    .from(experiments)
    .where(whereCondition);

  const totalResult = Number(totalCount[0]?.count || 0);

  res.json({
    success: true,
    experiments: experimentList,
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
 * /api/experiments:
 *   post:
 *     summary: Create a new experiment
 */
router.post('/', authenticateToken, requireVerified, requireRole(['recruiter']), catchAsync(async (req: AuthRequest, res: Response) => {
  const experimentData = createExperimentSchema.parse(req.body);

  const [newExperiment] = await db.insert(experiments).values({
    name: experimentData.name,
    description: experimentData.description || null,
    status: experimentData.status,
    variants: experimentData.variants,
    targetAudience: experimentData.targetAudience || null,
    startDate: experimentData.startDate ? new Date(experimentData.startDate) : null,
    endDate: experimentData.endDate ? new Date(experimentData.endDate) : null,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();

  if (!newExperiment) {
    throw new AppError('Failed to create experiment', 500, 'INTERNAL_ERROR');
  }

  res.status(201).json({ success: true, experiment: newExperiment });
}));

/**
 * @swagger
 * /api/experiments/{id}:
 *   get:
 *     summary: Get experiment by ID
 */
router.get('/:id', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const [experiment] = await db.select()
    .from(experiments)
    .where(eq(experiments.id, id))
    .limit(1);

  if (!experiment) {
    throw new AppError('Experiment not found', 404, 'NOT_FOUND');
  }

  res.json({ success: true, experiment });
}));

/**
 * @swagger
 * /api/experiments/{id}:
 *   put:
 *     summary: Update experiment
 */
router.put('/:id', authenticateToken, requireVerified, requireRole(['recruiter']), catchAsync(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const updateData = updateExperimentSchema.parse(req.body);

  const [existingExperiment] = await db.select().from(experiments).where(eq(experiments.id, id)).limit(1);
  if (!existingExperiment) {
    throw new AppError('Experiment not found', 404, 'NOT_FOUND');
  }

  const [updatedExperiment] = await db.update(experiments)
    .set({
      ...updateData,
      startDate: updateData.startDate ? new Date(updateData.startDate) : undefined,
      endDate: updateData.endDate ? new Date(updateData.endDate) : undefined,
      updatedAt: new Date(),
    })
    .where(eq(experiments.id, id))
    .returning();

  res.json({ success: true, experiment: updatedExperiment });
}));

/**
 * @swagger
 * /api/experiments/{id}:
 *   delete:
 *     summary: Delete experiment
 */
router.delete('/:id', authenticateToken, requireVerified, requireRole(['recruiter']), catchAsync(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const [existingExperiment] = await db.select().from(experiments).where(eq(experiments.id, id)).limit(1);
  if (!existingExperiment) {
    throw new AppError('Experiment not found', 404, 'NOT_FOUND');
  }

  // Cascade delete handles participants
  await db.delete(experiments).where(eq(experiments.id, id));

  res.json({ success: true, message: 'Experiment deleted successfully' });
}));

/**
 * @swagger
 * /api/experiments/{id}/enroll:
 *   post:
 *     summary: Enroll user in experiment
 */
router.post('/:id/enroll', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { variantAssigned } = enrollParticipantSchema.parse(req.body);
  const userId = req.user!.id;

  // Check if experiment exists and is running
  const [experiment] = await db.select()
    .from(experiments)
    .where(eq(experiments.id, id))
    .limit(1);

  if (!experiment) {
    throw new AppError('Experiment not found', 404, 'NOT_FOUND');
  }

  if (experiment.status !== 'running') {
    throw new AppError('Experiment is not currently active', 400, 'INACTIVE_EXPERIMENT');
  }

  // Attempt enrollment
  try {
    const [participant] = await db.insert(experimentParticipants).values({
      experimentId: id,
      userId,
      variantAssigned,
      enrolledAt: new Date(),
    }).returning();

    res.status(201).json({ success: true, participant });
  } catch (error: any) {
    if (error.code === '23505') { // Unique violation
      throw new AppError('User already enrolled in this experiment', 400, 'ALREADY_ENROLLED');
    }
    throw error;
  }
}));

/**
 * @swagger
 * /api/experiments/{id}/participants:
 *   get:
 *     summary: Get experiment participants
 */
router.get('/:id/participants', authenticateToken, requireVerified, requireRole(['recruiter']), catchAsync(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { page, limit } = getExperimentsSchema.parse(req.query);
  const offset = (page! - 1) * limit!;

  const whereCondition = eq(experimentParticipants.experimentId, id);

  const participants = await db.select()
    .from(experimentParticipants)
    .where(whereCondition)
    .orderBy(desc(experimentParticipants.enrolledAt))
    .limit(limit!)
    .offset(offset);

  const totalCount = await db.select({ count: count() })
    .from(experimentParticipants)
    .where(whereCondition);

  const totalResult = Number(totalCount[0]?.count || 0);

  res.json({
    success: true,
    data: participants,
    pagination: {
      page: page!,
      limit: limit!,
      total: totalResult,
      totalPages: Math.ceil(totalResult / limit!),
      count: participants.length,
    }
  });
}));

export default router;