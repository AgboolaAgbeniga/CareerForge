import express from 'express';
import { db } from '../utils/database';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { applications, jobs, notifications, users } from '../models/schema';
import { eq, desc, and } from 'drizzle-orm';

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
router.get('/job-seeker', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;

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

    // Get job seeker profile to extract skills
    const jobSeekerProfile = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1);

    // Get active jobs that match user's skills (basic matching for now)
    // TODO: Replace with AI-powered matching service
    const activeJobs = await db
      .select({
        id: jobs.id,
        title: jobs.title,
        location: jobs.location,
        skillsRequired: jobs.skillsRequired,
        postedAt: jobs.postedAt,
        companyId: jobs.companyId,
      })
      .from(jobs)
      .where(eq(jobs.status, 'active'))
      .orderBy(desc(jobs.postedAt))
      .limit(10);

    // Calculate basic match scores (simplified)
    // In a real implementation, this would use ML/AI
    const jobMatches = activeJobs.map(job => ({
      id: job.id,
      title: job.title,
      company: 'Company', // TODO: Join with companies table
      location: job.location || 'Remote',
      matchScore: Math.floor(Math.random() * 20) + 80, // Placeholder: 80-100
      skills: job.skillsRequired || [],
      postedAt: job.postedAt || new Date(),
    }));

    res.json({
      applications: userApplications,
      notifications: userNotifications,
      jobMatches,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

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
router.get('/recruiter', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;

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
        .where(and(...jobIds.map(id => eq(applications.jobId, id))))
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
      jobs: recruiterJobs,
      applications: jobApplications,
      notifications: userNotifications,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;