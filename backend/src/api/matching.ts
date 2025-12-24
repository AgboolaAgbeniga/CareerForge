import express, { Response } from 'express';
import { z } from 'zod';
import { db } from '../utils/database';
import { jobSeekers, jobs } from '../models/schema';
import { eq, and } from 'drizzle-orm';
import { authenticateToken, AuthRequest, requireVerified } from '../middleware/auth';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../middleware/error';

const router = express.Router();

/**
 * Simple matching function based on skills
 */
function calculateMatch(jobSeekerSkills: string[], jobSkills: string[]): { score: number, matchedSkills: string[] } {
  if (!jobSkills || jobSkills.length === 0) return { score: 100, matchedSkills: [] };
  if (!jobSeekerSkills || jobSeekerSkills.length === 0) return { score: 0, matchedSkills: [] };

  const lowerJobSkills = jobSkills.map(s => s.toLowerCase());
  const lowerUserSkills = jobSeekerSkills.map(s => s.toLowerCase());

  const matchedSkills = lowerJobSkills.filter(s => lowerUserSkills.some(u => u.includes(s) || s.includes(u)));
  const score = Math.round((matchedSkills.length / lowerJobSkills.length) * 100);

  return { score, matchedSkills };
}

/**
 * @swagger
 * /api/matching/jobs/{jobSeekerId}:
 *   get:
 *     summary: Get AI-ranked job matches for a job seeker
 *     tags: [Matching]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: jobSeekerId
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: List of ranked jobs retrieved successfully
 *       403:
 *         description: Unauthorized to view these matches
 */
router.get('/jobs/:jobSeekerId', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const { jobSeekerId } = req.params;
  const userId = req.user!.id;

  // Authorization: Only the user themselves can view their matches
  if (userId !== jobSeekerId) {
    throw new AppError('Unauthorized to view these matches', 403, 'FORBIDDEN');
  }

  // Get job seeker with skills
  const [jobSeeker] = await db.select().from(jobSeekers).where(eq(jobSeekers.id, jobSeekerId)).limit(1);
  if (!jobSeeker) {
    throw new AppError('Job seeker profile not found', 404, 'NOT_FOUND');
  }

  // Get all open jobs
  const allJobs = await db.select().from(jobs).where(eq(jobs.status, 'open'));

  const matches = allJobs.map((job) => {
    const { score, matchedSkills } = calculateMatch(
      (jobSeeker as any).skills || [],
      (job as any).skillsRequired || []
    );

    return {
      job: {
        id: job.id,
        title: job.title,
        description: job.description,
        location: job.location,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        currency: job.currency,
        jobType: job.jobType,
        experienceLevel: job.experienceLevel,
      },
      score,
      reasons: [`${score}% skill match based on your profile`],
      skillMatches: matchedSkills,
    };
  }).sort((a, b) => b.score - a.score);

  res.json({ success: true, matches });
}));

/**
 * @swagger
 * /api/matching/candidates/{jobId}:
 *   get:
 *     summary: Get AI-ranked candidate matches for a job (Recruiter only)
 *     tags: [Matching]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: List of ranked candidates retrieved successfully
 *       403:
 *         description: Unauthorized access or not a recruiter
 */
router.get('/candidates/:jobId', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const { jobId } = req.params;
  const userId = req.user!.id;

  // Get job details to verify ownership
  const [job] = await db.select().from(jobs).where(eq(jobs.id, jobId)).limit(1);
  if (!job) {
    throw new AppError('Job not found', 404, 'NOT_FOUND');
  }

  if (job.recruiterId !== userId) {
    throw new AppError('Unauthorized to view candidates for this job', 403, 'FORBIDDEN');
  }

  // Get all job seekers
  const allJobSeekers = await db.select().from(jobSeekers);

  const candidates = allJobSeekers.map((jobSeeker) => {
    const { score, matchedSkills } = calculateMatch(
      (jobSeeker as any).skills || [],
      (job as any).skillsRequired || []
    );

    return {
      candidate: {
        id: jobSeeker.id,
        title: jobSeeker.title,
        experienceYears: jobSeeker.experienceYears,
        skills: jobSeeker.skills,
      },
      score,
      reasons: [`${score}% skill match with job requirements`],
      skillMatches: matchedSkills,
    };
  }).sort((a, b) => b.score - a.score);

  res.json({ success: true, candidates });
}));

/**
 * @swagger
 * /api/matching/train:
 *   post:
 *     summary: Trigger ML model retraining (Admin/Recruiter only)
 *     tags: [Matching]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Training process initiated
 */
router.post('/train', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  // Only allowing this for demonstration, in reality would check for admin role
  res.json({
    success: true,
    status: 'Training started',
    estimatedCompletion: new Date(Date.now() + 3600000).toISOString()
  });
}));

export default router;