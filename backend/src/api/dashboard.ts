import express, { Response } from 'express';
import { db } from '../utils/database';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { applications, jobs, notifications, jobSeekers, companies } from '../models/schema';
import { eq, desc, and, or, isNull, sql, inArray } from 'drizzle-orm';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../middleware/error';

const router = express.Router();

/**
 * @swagger
 * /api/dashboard/job-seeker:
 *   get:
 *     summary: Get job seeker dashboard data
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/job-seeker', authenticateToken, catchAsync(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  if (req.user!.role !== 'job_seeker') {
    throw new AppError('Only job seekers can access this dashboard', 403, 'FORBIDDEN');
  }

  // Get applications
  const userApplications = await db
    .select()
    .from(applications)
    .where(eq(applications.jobSeekerId, userId))
    .orderBy(desc(applications.appliedAt))
    .limit(5);

  // Get notifications
  const userNotifications = await db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt))
    .limit(10);

  // Get job seeker profile for matching
  const [jobSeekerProfile] = await db
    .select()
    .from(jobSeekers)
    .where(eq(jobSeekers.id, userId))
    .limit(1);

  // Get active jobs that are open and not expired
  const activeJobs = await db
    .select({
      id: jobs.id,
      title: jobs.title,
      description: jobs.description,
      location: jobs.location,
      jobType: jobs.jobType,
      experienceLevel: jobs.experienceLevel,
      skillsRequired: jobs.skillsRequired,
      postedAt: jobs.postedAt,
      salaryMin: jobs.salaryMin,
      salaryMax: jobs.salaryMax,
      companyName: companies.name,
    })
    .from(jobs)
    .leftJoin(companies, eq(jobs.companyId, companies.id))
    .where(
      and(
        eq(jobs.status, 'open'),
        or(isNull(jobs.expiresAt), sql`${jobs.expiresAt} > NOW()`)
      )
    )
    .orderBy(desc(jobs.postedAt))
    .limit(20);

  // Calculate real match scores
  const jobMatches = activeJobs.map(job => {
    let totalScore = 0;
    let weightSum = 0;

    // Skill Match (50% weight)
    const jobSkillsRequired = job.skillsRequired as string[] | null;
    const userSkills = (jobSeekerProfile as any)?.skills as string[] | null;

    if (jobSkillsRequired && userSkills) {
      const lowerJobSkills = jobSkillsRequired.map((s: string) => s.toLowerCase());
      const lowerUserSkills = userSkills.map((s: string) => s.toLowerCase());
      const matched = lowerJobSkills.filter((s: string) => lowerUserSkills.some((u: string) => u.includes(s) || s.includes(u)));
      const skillScore = (matched.length / lowerJobSkills.length) * 100;
      totalScore += skillScore * 50;
      weightSum += 50;
    }

    // Experience Match (30% weight)
    if (job.experienceLevel && jobSeekerProfile?.experienceYears !== undefined) {
      const expMap: Record<string, [number, number]> = {
        entry: [0, 2], mid: [2, 5], senior: [5, 10], executive: [10, 100]
      };
      const range = expMap[job.experienceLevel as keyof typeof expMap];
      if (range) {
        const [min, max] = range;
        const userExp = jobSeekerProfile.experienceYears ?? 0;
        let expScore = userExp >= min && userExp <= max ? 100 : userExp < min ? Math.max(0, 100 - (min - userExp) * 20) : Math.max(50, 100 - (userExp - max) * 10);
        totalScore += expScore * 30;
        weightSum += 30;
      }
    }

    //  Location Match (10% weight)
    const jobLoc = (job.location || '').toLowerCase();
    const locationScore = jobLoc.includes('remote') ? 100 : 50;
    totalScore += locationScore * 10;
    weightSum += 10;

    // Profile Completeness (10% weight)
    totalScore += (jobSeekerProfile?.profileCompletionPercentage ?? 0) * 10;
    weightSum += 10;

    const finalScore = weightSum > 0 ? Math.round(totalScore / weightSum) : 0;

    return {
      id: job.id,
      title: job.title,
      company: job.companyName || 'Company',
      location: job.location || 'Remote',
      type: job.jobType,
      matchScore: Math.max(0, Math.min(100, finalScore)),
      skills: job.skillsRequired || [],
      salaryMin: job.salaryMin,
      salaryMax: job.salaryMax,
      postedAt: job.postedAt || new Date(),
    };
  }).filter(j => j.matchScore >= 40).sort((a, b) => b.matchScore - a.matchScore).slice(0, 10);

  res.json({
    success: true,
    data: {
      applications: userApplications,
      notifications: userNotifications,
      jobMatches,
    }
  });
}));

/**
 * @swagger
 * /api/dashboard/recruiter:
 *   get:
 *     summary: Get recruiter dashboard data
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get('/recruiter', authenticateToken, catchAsync(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  if (req.user!.role !== 'recruiter') {
    throw new AppError('Only recruiters can access this dashboard', 403, 'FORBIDDEN');
  }

  // Get jobs posted by recruiter
  const recruiterJobs = await db
    .select()
    .from(jobs)
    .where(eq(jobs.recruiterId, userId))
    .orderBy(desc(jobs.postedAt))
    .limit(10);

  // Get applications for recruiter's jobs
  const jobIds = recruiterJobs.map(job => job.id);
  const jobApplications = jobIds.length > 0
    ? await db
      .select()
      .from(applications)
      .where(inArray(applications.jobId, jobIds))
      .orderBy(desc(applications.appliedAt))
      .limit(20)
    : [];

  // Get notifications
  const userNotifications = await db
    .select()
    .from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt))
    .limit(10);

  res.json({
    success: true,
    data: {
      jobs: recruiterJobs,
      applications: jobApplications,
      notifications: userNotifications,
    }
  });
}));

export default router;