/**
 * Jobs API
 * Handles job posting creation, listing, updates, and management
 */

import express, { Response } from 'express';
import { z } from 'zod';
import { authenticateToken, AuthRequest, requireVerified } from '../middleware/auth';
import { db } from '../utils/database';
import { jobs, companies, users, recruiters } from '../models/schema';
import { eq, and, or, desc, sql, inArray, isNull, gt } from 'drizzle-orm';
import { AppError } from '../middleware/error';
import { sanitizeText } from '../utils/sanitizer';
import { catchAsync } from '../utils/catchAsync';
import logger from '../utils/logger';

const router = express.Router();

// Validation schemas
const createJobSchema = z.object({
    title: z.string().min(3).max(255),
    description: z.string().min(50).max(10000),
    requirements: z.string().min(20).max(5000),
    location: z.string().optional(),
    type: z.enum(['full_time', 'part_time', 'contract', 'remote']),
    experienceLevel: z.enum(['entry', 'mid', 'senior', 'executive']),
    salaryMin: z.number().int().positive().optional(),
    salaryMax: z.number().int().positive().optional(),
    skillsRequired: z.array(z.string()).min(1).max(50),
    companyId: z.string().uuid().optional(),
    expiresAt: z.string().datetime().optional(),
});

const updateJobSchema = createJobSchema.partial();

const updateStatusSchema = z.object({
    status: z.enum(['draft', 'open', 'closed', 'paused']),
});

const querySchema = z.object({
    type: z.enum(['full_time', 'part_time', 'contract', 'remote']).optional(),
    experienceLevel: z.enum(['entry', 'mid', 'senior', 'executive']).optional(),
    location: z.string().optional(),
    skills: z.string().optional(),
    page: z.string().optional().transform(v => parseInt(v || '1') || 1),
    limit: z.string().optional().transform(v => Math.min(parseInt(v || '10') || 10, 50)),
});

/**
 * @swagger
 * /api/jobs/create:
 *   post:
 *     summary: Create a new job posting (Recruiter only)
 *     tags: [Jobs]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title, description, requirements, type, experienceLevel, skillsRequired]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               requirements: { type: string }
 *               responsibilities: { type: string }
 *               location: { type: string }
 *               type: { type: string, enum: [full_time, part_time, contract, remote] }
 *               experienceLevel: { type: string, enum: [entry, mid, senior, executive] }
 *               salaryMin: { type: integer }
 *               salaryMax: { type: integer }
 *               skillsRequired: { type: array, items: { type: string } }
 *               companyId: { type: string, format: uuid }
 *               expiresAt: { type: string, format: date-time }
 *     responses:
 *       201:
 *         description: Job posting created successfully
 *       403:
 *         description: Not a recruiter or not verified
 */
router.post('/create', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const userRole = req.user!.role;

    // Only recruiters can create jobs
    if (userRole !== 'recruiter') {
        throw new AppError('Only recruiters can create job postings', 403, 'FORBIDDEN');
    }

    // Validate input
    const jobData = createJobSchema.parse(req.body);

    // Sanitize inputs
    const title = sanitizeText(jobData.title);
    const description = sanitizeText(jobData.description);
    const requirements = sanitizeText(jobData.requirements);
    const location = jobData.location ? sanitizeText(jobData.location) : null;

    // Validate salary range
    if (jobData.salaryMin && jobData.salaryMax && jobData.salaryMin > jobData.salaryMax) {
        throw new AppError('Minimum salary cannot be greater than maximum salary', 400, 'INVALID_SALARY_RANGE');
    }

    // Use provided companyId or null
    const companyId = jobData.companyId || null;

    // Parse expiresAt if provided
    const expiresAt = jobData.expiresAt ? new Date(jobData.expiresAt) : null;

    // Create job posting (default status: draft)
    const [newJob] = await db.insert(jobs).values({
        recruiterId: userId,
        companyId: companyId,
        title,
        description,
        requirements,
        location,
        jobType: jobData.type,
        experienceLevel: jobData.experienceLevel,
        salaryMin: jobData.salaryMin?.toString() || null,
        salaryMax: jobData.salaryMax?.toString() || null,
        skillsRequired: jobData.skillsRequired,
        status: 'draft',
        postedAt: null,
        expiresAt,
    }).returning();

    if (!newJob) {
        throw new AppError('Failed to create job posting', 500);
    }

    logger.info(`Job posting created: ${newJob.id} by recruiter ${userId}`);
    res.status(201).json({
        success: true,
        message: 'Job posting created successfully',
        data: {
            id: newJob.id,
            title: newJob.title,
            status: newJob.status,
            createdAt: newJob.createdAt,
        },
    });
}));

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: List all active job postings
 *     tags: [Jobs]
 *     parameters:
 *       - in: query
 *         name: type
 *         schema: { type: string, enum: [full_time, part_time, contract, remote] }
 *       - in: query
 *         name: experienceLevel
 *         schema: { type: string, enum: [entry, mid, senior, executive] }
 *       - in: query
 *         name: location
 *         schema: { type: string }
 *       - in: query
 *         name: skills
 *         schema: { type: string, description: 'Comma separated skills' }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: List of jobs retrieved successfully
 */
router.get('/', catchAsync(async (req: AuthRequest, res: Response) => {
    const {
        type,
        experienceLevel,
        location,
        skills,
        page,
        limit,
    } = querySchema.parse(req.query);

    const offset = (page - 1) * limit;

    // Build query conditions
    const conditions = [
        eq(jobs.status, 'open'),
        or(
            isNull(jobs.expiresAt),
            gt(jobs.expiresAt, new Date())
        ),
    ];

    if (type) conditions.push(eq(jobs.jobType, type));
    if (experienceLevel) conditions.push(eq(jobs.experienceLevel, experienceLevel));
    if (location) conditions.push(sql`${jobs.location} ILIKE ${`%${location}%`}`);

    // Get total count for pagination
    const countResult = await db
        .select({ count: sql<number>`count(*)` })
        .from(jobs)
        .where(and(...conditions));

    const total = Number(countResult[0]?.count || 0);
    const totalPages = Math.ceil(total / limit);

    // Get list with pagination
    const jobListings = await db
        .select({
            id: jobs.id,
            title: jobs.title,
            description: jobs.description,
            requirements: jobs.requirements,
            location: jobs.location,
            jobType: jobs.jobType,
            experienceLevel: jobs.experienceLevel,
            salaryMin: jobs.salaryMin,
            salaryMax: jobs.salaryMax,
            skillsRequired: jobs.skillsRequired,
            postedAt: jobs.postedAt,
            expiresAt: jobs.expiresAt,
            companyId: jobs.companyId,
            companyName: companies.name,
        })
        .from(jobs)
        .leftJoin(companies, eq(jobs.companyId, companies.id))
        .where(and(...conditions))
        .orderBy(desc(jobs.postedAt))
        .limit(limit)
        .offset(offset);

    // Apply skill filtering in-memory for now if provided (optimizable later)
    let filteredJobs = jobListings;
    if (skills) {
        const skillsArray = skills.split(',').map(s => s.trim().toLowerCase());
        filteredJobs = jobListings.filter(job => {
            const jobSkills = (job.skillsRequired || []).map(s => s.toLowerCase());
            return skillsArray.some(skill => jobSkills.includes(skill));
        });
    }

    res.json({
        success: true,
        data: filteredJobs,
        pagination: {
            page,
            limit,
            total,
            totalPages,
            count: filteredJobs.length,
        }
    });
}));

/**
 * @swagger
 * /api/jobs/{id}:
 *   get:
 *     summary: Get single job details
 *     tags: [Jobs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Job details retrieved successfully
 *       404:
 *         description: Job not found
 */
router.get('/:id', catchAsync(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    if (!id) {
        throw new AppError('Job ID is required', 400, 'BAD_REQUEST');
    }

    const [job] = await db
        .select({
            id: jobs.id,
            title: jobs.title,
            description: jobs.description,
            requirements: jobs.requirements,
            location: jobs.location,
            jobType: jobs.jobType,
            experienceLevel: jobs.experienceLevel,
            salaryMin: jobs.salaryMin,
            salaryMax: jobs.salaryMax,
            skillsRequired: jobs.skillsRequired,
            status: jobs.status,
            postedAt: jobs.postedAt,
            expiresAt: jobs.expiresAt,
            createdAt: jobs.createdAt,
            recruiterId: jobs.recruiterId,
            companyId: jobs.companyId,
            companyName: companies.name,
            companyDescription: companies.description,
            companyWebsite: companies.websiteUrl,
            companySize: companies.size,
            companyIndustry: companies.industry,
        })
        .from(jobs)
        .leftJoin(companies, eq(jobs.companyId, companies.id))
        .where(eq(jobs.id, id))
        .limit(1);

    if (!job) {
        throw new AppError('Job not found', 404, 'NOT_FOUND');
    }

    // Check authorization for draft jobs
    if (job.status === 'draft') {
        const userId = req.user?.id;
        if (!userId || job.recruiterId !== userId) {
            throw new AppError('Job posting not found or not published', 404, 'NOT_FOUND');
        }
    }

    res.json({
        success: true,
        data: job,
    });
}));

/**
 * @swagger
 * /api/jobs/recruiter/my-jobs:
 *   get:
 *     summary: Get recruiter's job postings
 *     tags: [Jobs]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [draft, open, closed, paused] }
 *     responses:
 *       200:
 *         description: List of recruiter's jobs retrieved successfully
 */
router.get('/recruiter/my-jobs', authenticateToken, catchAsync(async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const userRole = req.user!.role;

    if (userRole !== 'recruiter') {
        throw new AppError('Only recruiters can access this endpoint', 403, 'FORBIDDEN');
    }

    const { status } = req.query;
    const conditions = [eq(jobs.recruiterId, userId)];

    if (status && ['draft', 'open', 'closed', 'paused'].includes(status as string)) {
        conditions.push(eq(jobs.status, status as any));
    }

    const recruiterJobs = await db
        .select({
            id: jobs.id,
            title: jobs.title,
            location: jobs.location,
            jobType: jobs.jobType,
            experienceLevel: jobs.experienceLevel,
            status: jobs.status,
            postedAt: jobs.postedAt,
            expiresAt: jobs.expiresAt,
            createdAt: jobs.createdAt,
            companyName: companies.name,
            applicationCount: sql<number>`(
                SELECT COUNT(*) FROM applications 
                WHERE applications.job_id = ${jobs.id}
            )`,
        })
        .from(jobs)
        .leftJoin(companies, eq(jobs.companyId, companies.id))
        .where(and(...conditions))
        .orderBy(desc(jobs.createdAt));

    res.json({
        success: true,
        data: recruiterJobs,
        count: recruiterJobs.length
    });
}));

/**
 * @swagger
 * /api/jobs/{id}:
 *   put:
 *     summary: Update job posting
 *     tags: [Jobs]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/JobUpdate'
 *     responses:
 *       200:
 *         description: Job updated successfully
 */
router.put('/:id', authenticateToken, catchAsync(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    if (!id) {
        throw new AppError('Job ID is required', 400, 'BAD_REQUEST');
    }

    const userId = req.user!.id;
    const userRole = req.user!.role;

    if (userRole !== 'recruiter') {
        throw new AppError('Only recruiters can update job postings', 403, 'FORBIDDEN');
    }

    const updates = updateJobSchema.parse(req.body);

    const [existingJob] = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1);

    if (!existingJob) {
        throw new AppError('Job not found', 404, 'NOT_FOUND');
    }

    if (existingJob.recruiterId !== userId) {
        throw new AppError('You can only update your own job postings', 403, 'FORBIDDEN');
    }

    if (existingJob.status === 'closed') {
        throw new AppError('Cannot update closed job postings', 400, 'INVALID_STATE');
    }

    if (updates.salaryMin && updates.salaryMax && updates.salaryMin > updates.salaryMax) {
        throw new AppError('Minimum salary cannot be greater than maximum salary', 400, 'INVALID_SALARY_RANGE');
    }

    // Prepare update data
    const updateData: any = {
        updatedAt: new Date(),
    };

    if (updates.title) updateData.title = sanitizeText(updates.title);
    if (updates.description) updateData.description = sanitizeText(updates.description);
    if (updates.requirements) updateData.requirements = sanitizeText(updates.requirements);
    if (updates.location) updateData.location = sanitizeText(updates.location);
    if (updates.type) updateData.jobType = updates.type;
    if (updates.experienceLevel) updateData.experienceLevel = updates.experienceLevel;
    if (updates.salaryMin !== undefined) updateData.salaryMin = updates.salaryMin.toString();
    if (updates.salaryMax !== undefined) updateData.salaryMax = updates.salaryMax.toString();
    if (updates.skillsRequired) updateData.skillsRequired = updates.skillsRequired;
    if (updates.expiresAt) updateData.expiresAt = new Date(updates.expiresAt);

    const [updatedJob] = await db
        .update(jobs)
        .set(updateData)
        .where(eq(jobs.id, id))
        .returning();

    logger.info(`Job posting updated: ${id} by recruiter ${userId}`);
    res.json({
        success: true,
        message: 'Job updated successfully',
        data: updatedJob,
    });
}));

/**
 * @swagger
 * /api/jobs/{id}/status:
 *   put:
 *     summary: Update job status
 *     tags: [Jobs]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status: { type: string, enum: [draft, open, closed, paused] }
 *     responses:
 *       200:
 *         description: Job status updated successfully
 */
router.put('/:id/status', authenticateToken, catchAsync(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    if (!id) {
        throw new AppError('Job ID is required', 400, 'BAD_REQUEST');
    }

    const userId = req.user!.id;
    const userRole = req.user!.role;

    if (userRole !== 'recruiter') {
        throw new AppError('Only recruiters can update job status', 403, 'FORBIDDEN');
    }

    const { status } = updateStatusSchema.parse(req.body);

    const [existingJob] = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1);

    if (!existingJob) {
        throw new AppError('Job not found', 404, 'NOT_FOUND');
    }

    if (existingJob.recruiterId !== userId) {
        throw new AppError('You can only update your own job postings', 403, 'FORBIDDEN');
    }

    const currentStatus = existingJob.status;
    const validTransitions: Record<string, string[]> = {
        draft: ['open'],
        open: ['paused', 'closed'],
        paused: ['open', 'closed'],
        closed: [],
    };

    if (!validTransitions[currentStatus || 'draft']?.includes(status)) {
        throw new AppError(`Invalid status transition from ${currentStatus} to ${status}`, 422, 'INVALID_TRANSITION');
    }

    const updateData: any = {
        status,
        updatedAt: new Date(),
    };

    if (status === 'open' && !existingJob.postedAt) {
        updateData.postedAt = new Date();
    }

    await db.update(jobs).set(updateData).where(eq(jobs.id, id));

    logger.info(`Job status updated: ${id} to ${status} by recruiter ${userId}`);
    res.json({
        success: true,
        message: `Job status updated to ${status}`,
        data: {
            id,
            status,
            postedAt: updateData.postedAt || existingJob.postedAt,
        },
    });
}));

/**
 * @swagger
 * /api/jobs/{id}:
 *   delete:
 *     summary: Delete or close job posting
 *     tags: [Jobs]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Job deleted or closed successfully
 */
router.delete('/:id', authenticateToken, catchAsync(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    if (!id) {
        throw new AppError('Job ID is required', 400, 'BAD_REQUEST');
    }

    const userId = req.user!.id;
    const userRole = req.user!.role;

    if (userRole !== 'recruiter') {
        throw new AppError('Only recruiters can delete job postings', 403, 'FORBIDDEN');
    }

    const [job] = await db.select().from(jobs).where(eq(jobs.id, id)).limit(1);

    if (!job) {
        throw new AppError('Job not found', 404, 'NOT_FOUND');
    }

    if (job.recruiterId !== userId) {
        throw new AppError('You can only delete your own job postings', 403, 'FORBIDDEN');
    }

    if (job.status === 'draft') {
        await db.delete(jobs).where(eq(jobs.id, id));
        res.json({
            success: true,
            message: 'Job posting deleted successfully',
        });
        return;
    }

    await db.update(jobs).set({ status: 'closed', updatedAt: new Date() }).where(eq(jobs.id, id));

    res.json({
        success: true,
        message: 'Job posting closed successfully',
    });
}));

export default router;
