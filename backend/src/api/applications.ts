/**
 * Job Applications API
 * Handles job application submission, listing, and status management
 */

import express, { Response } from 'express';
import { z } from 'zod';
import { authenticateToken, AuthRequest, requireVerified } from '../middleware/auth';
import { db } from '../utils/database';
import { applications, jobs, notifications, users, jobSeekers } from '../models/schema';
import { eq, and, or, desc, inArray } from 'drizzle-orm';
import { AppError } from '../middleware/error';
import { catchAsync } from '../utils/catchAsync';
import { sanitizeText } from '../utils/sanitizer';

const router = express.Router();

// Validation schemas
const applySchema = z.object({
    jobId: z.string().uuid(),
    coverLetter: z.string().max(5000).optional(),
});

const updateStatusSchema = z.object({
    status: z.enum(['pending', 'reviewing', 'interview', 'accepted', 'rejected', 'withdrawn']),
});

const querySchema = z.object({
    page: z.string().optional().transform(v => parseInt(v || '1') || 1),
    limit: z.string().optional().transform(v => Math.min(parseInt(v || '10') || 10, 50)),
});

// Valid status transitions
const VALID_TRANSITIONS: Record<string, string[]> = {
    pending: ['reviewing', 'rejected'],
    reviewing: ['interview', 'rejected'],
    interview: ['accepted', 'rejected'],
    accepted: [],
    rejected: [],
    withdrawn: [],
};

/**
 * POST /api/applications/apply
 * Submit a job application
 */
router.post('/apply', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const userRole = req.user!.role;

    // Only job seekers can apply
    if (userRole !== 'job_seeker') {
        throw new AppError('Only job seekers can apply for jobs', 403, 'FORBIDDEN');
    }

    // Validate input
    const { jobId, coverLetter } = applySchema.parse(req.body);

    const sanitizedCoverLetter = coverLetter ? sanitizeText(coverLetter) : null;

    // Check if user's profile is complete
    const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);

    if (!user.onboardingCompleted) {
        throw new AppError('Please complete your profile before applying', 403, 'ONBOARDING_INCOMPLETE');
    }

    // Check if job exists and is open
    const [job] = await db.select().from(jobs).where(eq(jobs.id, jobId)).limit(1);

    if (!job) {
        throw new AppError('Job not found', 404, 'NOT_FOUND');
    }

    if (job.status !== 'open') {
        throw new AppError('This job is no longer accepting applications', 400, 'JOB_CLOSED');
    }

    if (job.expiresAt && new Date(job.expiresAt) < new Date()) {
        throw new AppError('This job posting has expired', 400, 'JOB_EXPIRED');
    }

    // Duplicate check
    const existing = await db
        .select()
        .from(applications)
        .where(and(eq(applications.jobSeekerId, userId), eq(applications.jobId, jobId)))
        .limit(1);

    if (existing.length > 0) {
        throw new AppError('You have already applied for this job', 409, 'ALREADY_APPLIED');
    }

    // Get user's resume
    const [jobSeekerProfile] = await db
        .select()
        .from(jobSeekers)
        .where(eq(jobSeekers.id, userId))
        .limit(1);

    if (!jobSeekerProfile || !jobSeekerProfile.resumeFileUrl) {
        throw new AppError('Please upload your resume before applying', 400, 'RESUME_REQUIRED');
    }

    // Create application
    const [newApplication] = await db.insert(applications).values({
        jobSeekerId: userId,
        jobId,
        status: 'pending',
        coverLetter: sanitizedCoverLetter,
        resumeVersionUrl: jobSeekerProfile.resumeFileUrl,
        appliedAt: new Date(),
        lastUpdatedAt: new Date(),
    }).returning();

    // Create notification
    await db.insert(notifications).values({
        userId: job.recruiterId,
        type: 'application_update',
        title: 'New Application',
        content: `New application received for ${job.title}`,
        data: { applicationId: newApplication.id },
        createdAt: new Date(),
        isRead: false,
    });

    res.status(201).json({
        success: true,
        message: 'Application submitted successfully',
        data: {
            id: newApplication.id,
            jobId: newApplication.jobId,
            status: newApplication.status,
            appliedAt: newApplication.appliedAt,
        },
    });
}));

/**
 * @swagger
 * /api/applications/user/{userId}:
 *   get:
 *     summary: Get applications for a job seeker
 *     tags: [Applications]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema: { type: string, format: uuid }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: List of user applications retrieved successfully
 */
router.get('/user/:userId', authenticateToken, catchAsync(async (req: AuthRequest, res: Response) => {
    const { userId } = req.params;
    const requesterId = req.user!.id;

    if (userId !== requesterId) {
        throw new AppError('Unauthorized: Cannot view other users\' applications', 403, 'FORBIDDEN');
    }

    const { page, limit } = querySchema.parse(req.query);
    const offset = (page - 1) * limit;

    // Get total count
    const [{ count }] = await db
        .select({ count: sql<number>`count(*)` })
        .from(applications)
        .where(eq(applications.jobSeekerId, userId));

    const total = Number(count);
    const totalPages = Math.ceil(total / limit);

    const userApplications = await db
        .select({
            id: applications.id,
            jobId: applications.jobId,
            status: applications.status,
            coverLetter: applications.coverLetter,
            appliedAt: applications.appliedAt,
            lastUpdatedAt: applications.lastUpdatedAt,
            jobTitle: jobs.title,
            jobLocation: jobs.location,
            jobType: jobs.jobType,
            companyId: jobs.companyId,
            companyName: companies.name,
        })
        .from(applications)
        .innerJoin(jobs, eq(applications.jobId, jobs.id))
        .leftJoin(companies, eq(jobs.companyId, companies.id))
        .where(eq(applications.jobSeekerId, userId))
        .orderBy(desc(applications.appliedAt))
        .limit(limit)
        .offset(offset);

    res.json({
        success: true,
        data: userApplications,
        pagination: {
            page,
            limit,
            total,
            totalPages,
            count: userApplications.length
        }
    });
}));

/**
 * @swagger
 * /api/applications/job/{jobId}:
 *   get:
 *     summary: Get applications for a job (Recruiter only)
 *     tags: [Applications]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema: { type: string, format: uuid }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: List of job applications retrieved successfully
 */
router.get('/job/:jobId', authenticateToken, catchAsync(async (req: AuthRequest, res: Response) => {
    const { jobId } = req.params;
    const userId = req.user!.id;
    const userRole = req.user!.role;

    if (userRole !== 'recruiter') {
        throw new AppError('Only recruiters can view job applications', 403, 'FORBIDDEN');
    }

    const [job] = await db.select().from(jobs).where(eq(jobs.id, jobId)).limit(1);

    if (!job) {
        throw new AppError('Job not found', 404, 'NOT_FOUND');
    }

    if (job.recruiterId !== userId) {
        throw new AppError('Unauthorized: You do not own this job posting', 403, 'FORBIDDEN');
    }

    const { page, limit } = querySchema.parse(req.query);
    const offset = (page - 1) * limit;

    // Get total count
    const [{ count }] = await db
        .select({ count: sql<number>`count(*)` })
        .from(applications)
        .where(eq(applications.jobId, jobId));

    const total = Number(count);
    const totalPages = Math.ceil(total / limit);

    const jobApplications = await db
        .select({
            id: applications.id,
            jobSeekerId: applications.jobSeekerId,
            status: applications.status,
            coverLetter: applications.coverLetter,
            appliedAt: applications.appliedAt,
            lastUpdatedAt: applications.lastUpdatedAt,
            applicantFirstName: users.firstName,
            applicantLastName: users.lastName,
            applicantEmail: users.email,
        })
        .from(applications)
        .innerJoin(users, eq(applications.jobSeekerId, users.id))
        .where(eq(applications.jobId, jobId))
        .orderBy(desc(applications.appliedAt))
        .limit(limit)
        .offset(offset);

    res.json({
        success: true,
        data: jobApplications,
        pagination: {
            page,
            limit,
            total,
            totalPages,
            count: jobApplications.length
        }
    });
}));

/**
 * @swagger
 * /api/applications/{id}/status:
 *   put:
 *     summary: Update application status (Recruiter only)
 *     tags: [Applications]
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
 *               status: { type: string, enum: [pending, reviewing, interview, accepted, rejected, withdrawn] }
 *     responses:
 *       200:
 *         description: Application status updated successfully
 *       422:
 *         description: Invalid status transition
 */
router.put('/:id/status', authenticateToken, catchAsync(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;
    const userRole = req.user!.role;

    if (userRole !== 'recruiter') {
        throw new AppError('Only recruiters can update application status', 403, 'FORBIDDEN');
    }

    const { status: newStatus } = updateStatusSchema.parse(req.body);

    const [application] = await db
        .select({
            id: applications.id,
            jobSeekerId: applications.jobSeekerId,
            jobId: applications.jobId,
            status: applications.status,
            recruiterId: jobs.recruiterId,
            jobTitle: jobs.title,
        })
        .from(applications)
        .innerJoin(jobs, eq(applications.jobId, jobs.id))
        .where(eq(applications.id, id))
        .limit(1);

    if (!application) {
        throw new AppError('Application not found', 404, 'NOT_FOUND');
    }

    if (application.recruiterId !== userId) {
        throw new AppError('Unauthorized: You do not own this job posting', 403, 'FORBIDDEN');
    }

    const currentStatus = application.status;
    const validTransitions = VALID_TRANSITIONS[currentStatus || 'pending'] || [];

    if (!validTransitions.includes(newStatus)) {
        throw new AppError(`Invalid status transition from ${currentStatus} to ${newStatus}`, 422, 'INVALID_TRANSITION');
    }

    await db
        .update(applications)
        .set({
            status: newStatus,
            lastUpdatedAt: new Date(),
        })
        .where(eq(applications.id, id));

    const statusMessages: Record<string, string> = {
        reviewing: 'is now being reviewed',
        interview: 'has moved to interview stage',
        accepted: 'has been accepted! Congratulations!',
        rejected: 'was not selected at this time',
    };

    await db.insert(notifications).values({
        userId: application.jobSeekerId,
        type: 'application_update',
        title: 'Application Update',
        content: `Your application for ${application.jobTitle} ${statusMessages[newStatus] || 'has been updated'}`,
        data: { applicationId: application.id },
        createdAt: new Date(),
        isRead: false,
    });

    res.json({
        success: true,
        message: 'Application status updated successfully',
        data: {
            id: application.id,
            status: newStatus,
            lastUpdatedAt: new Date(),
        },
    });
}));

/**
 * @swagger
 * /api/applications/{id}:
 *   get:
 *     summary: Get single application details
 *     tags: [Applications]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Application details retrieved successfully
 */
router.get('/:id', authenticateToken, catchAsync(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;

    const [application] = await db
        .select({
            id: applications.id,
            jobSeekerId: applications.jobSeekerId,
            jobId: applications.jobId,
            status: applications.status,
            coverLetter: applications.coverLetter,
            appliedAt: applications.appliedAt,
            lastUpdatedAt: applications.lastUpdatedAt,
            jobTitle: jobs.title,
            jobDescription: jobs.description,
            jobLocation: jobs.location,
            jobType: jobs.jobType,
            recruiterId: jobs.recruiterId,
        })
        .from(applications)
        .innerJoin(jobs, eq(applications.jobId, jobs.id))
        .where(eq(applications.id, id))
        .limit(1);

    if (!application) {
        throw new AppError('Application not found', 404, 'NOT_FOUND');
    }

    const isOwner = application.jobSeekerId === userId;
    const isRecruiter = application.recruiterId === userId;

    if (!isOwner && !isRecruiter) {
        throw new AppError('Unauthorized to view this application', 403, 'FORBIDDEN');
    }

    res.json({
        success: true,
        data: application,
    });
}));

/**
 * @swagger
 * /api/applications/{id}:
 *   delete:
 *     summary: Withdraw application
 *     tags: [Applications]
 *     description: Sets application status to 'withdrawn'. Only the applicant can withdraw.
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Application withdrawn successfully
 *       400:
 *         description: Cannot withdraw at this stage
 */
router.delete('/:id', authenticateToken, catchAsync(async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.user!.id;

    const [application] = await db
        .select()
        .from(applications)
        .where(eq(applications.id, id))
        .limit(1);

    if (!application) {
        throw new AppError('Application not found', 404, 'NOT_FOUND');
    }

    if (application.jobSeekerId !== userId) {
        throw new AppError('Unauthorized: You can only withdraw your own applications', 403, 'FORBIDDEN');
    }

    if (application.status && ['accepted', 'rejected'].includes(application.status)) {
        throw new AppError('Cannot withdraw application at this stage', 400, 'INVALID_STATE');
    }

    await db
        .update(applications)
        .set({
            status: 'withdrawn',
            lastUpdatedAt: new Date(),
        })
        .where(eq(applications.id, id));

    res.json({
        success: true,
        message: 'Application withdrawn successfully',
    });
}));

export default router;
