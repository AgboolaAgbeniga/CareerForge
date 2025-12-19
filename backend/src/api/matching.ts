import express from 'express';
import { z } from 'zod';
import { db } from '../utils/database';
import { jobSeekers, jobs, applications } from '../models/schema';
import { eq, desc } from 'drizzle-orm';

const router = express.Router();

// Validation schemas
const trainSchema = z.object({
  // Training data
});

// Database operations will be handled by Drizzle ORM

// Simple matching function
function calculateMatchScore(jobSeekerSkills: string[], jobSkills: string[]): number {
  const intersection = jobSeekerSkills.filter(skill => jobSkills.includes(skill));
  return (intersection.length / jobSkills.length) * 100;
}

/**
 * @swagger
 * /api/matching/jobs/{jobSeekerId}:
 *   get:
 *     summary: Get AI-powered job matches for job seeker
 *     tags: [Matching]
 *     parameters:
 *       - in: path
 *         name: jobSeekerId
 *         required: true
 *         schema:
 *           type: string
 *         description: Job seeker ID
 *     responses:
 *       200:
 *         description: Job matches retrieved successfully
 *       404:
 *         description: Job seeker not found
 */
router.get('/jobs/:jobSeekerId', async (req, res) => {
  try {
    const { jobSeekerId } = req.params;

    // Get job seeker with skills
    const jobSeekerData = await db.select().from(jobSeekers).where(eq(jobSeekers.id, jobSeekerId)).limit(1);
    if (jobSeekerData.length === 0) {
      return res.status(404).json({ error: 'Job seeker not found' });
    }

    const jobSeeker = jobSeekerData[0] as any;

    // Get all jobs
    const allJobs = await db.select().from(jobs);

    const matches = allJobs.map((job: any) => ({
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
      score: calculateMatchScore((jobSeeker as any).skills || [], job.skillsRequired || []),
      reasons: [`${calculateMatchScore((jobSeeker as any).skills || [], job.skillsRequired || [])}% skill match`],
      skillMatches: ((jobSeeker as any).skills || []).filter((skill: string) => (job.skillsRequired || []).includes(skill)),
    })).sort((a: any, b: any) => b.score - a.score);

    res.json({ matches });
    return;
  } catch (error) {
    console.error('Job matching error:', error);
    res.status(500).json({ error: 'Matching failed' });
    return;
  }
});

/**
 * @swagger
 * /api/matching/candidates/{jobId}:
 *   get:
 *     summary: Get AI-ranked candidate matches for job
 *     tags: [Matching]
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: string
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Candidate matches retrieved successfully
 *       404:
 *         description: Job not found
 */
router.get('/candidates/:jobId', async (req, res) => {
  try {
    const { jobId } = req.params;

    // Get job details
    const jobData = await db.select().from(jobs).where(eq(jobs.id, jobId)).limit(1);
    if (jobData.length === 0) {
      return res.status(404).json({ error: 'Job not found' });
    }

    const job = jobData[0];

    // Get all job seekers
    const allJobSeekers = await db.select().from(jobSeekers);

    const candidates = allJobSeekers.map((jobSeeker: any) => ({
      candidate: {
        id: jobSeeker.id,
        title: jobSeeker.title,
        experienceYears: jobSeeker.experienceYears,
        skills: jobSeeker.skills,
      },
      score: calculateMatchScore(jobSeeker.skills || [], (job as any).skillsRequired || []),
      reasons: [`${calculateMatchScore(jobSeeker.skills || [], (job as any).skillsRequired || [])}% skill match`],
      culturalFit: 'High', // Mock
    })).sort((a: any, b: any) => b.score - a.score);

    res.json({ candidates });
    return;
  } catch (error) {
    console.error('Candidate matching error:', error);
    res.status(500).json({ error: 'Matching failed' });
    return;
  }
});

/**
 * @swagger
 * /api/matching/train:
 *   post:
 *     summary: Trigger ML model retraining
 *     tags: [Matching]
 *     responses:
 *       200:
 *         description: Training started successfully
 */
router.post('/train', (req, res) => {
  // Mock training
  res.json({ status: 'Training started', estimatedCompletion: '2023-12-18T01:00:00Z' });
});

export default router;