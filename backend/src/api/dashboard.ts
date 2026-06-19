import express, { Response } from 'express';
import { db } from '../utils/database';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { applications, jobs, notifications, jobSeekers, companies } from '../models/schema';
import { eq, desc, and, or, isNull, sql, inArray } from 'drizzle-orm';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../middleware/error';
import { dashboardService } from '../services/dashboard.service';

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

  // Use the new DashboardService which fetches concurrently and caches with Redis
  const dashboardData = await dashboardService.getJobSeekerOverview(userId);

  res.json({
    success: true,
    data: dashboardData
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