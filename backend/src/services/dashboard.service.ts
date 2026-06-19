import redis from '../config/redis';
import { db } from '../utils/database';
import { applications, jobs, notifications, jobSeekers, companies } from '../models/schema';
import { eq, desc, and, or, isNull, sql } from 'drizzle-orm';
import logger from '../utils/logger';

export interface SectionResult<T> {
  error?: boolean;
  section?: string;
  message?: string;
  data?: T;
}

export const SECTION_KEYS = {
  JOBS: 'job-matches',
  RESUME: 'resume',
  APPS: 'applications',
  NOTIFICATIONS: 'notifications',
  CAREER: 'career'
} as const;

export class DashboardService {
  /**
   * Main method to get aggregated dashboard data concurrently
   */
  async getJobSeekerOverview(userId: string) {
    const [userApplications, userNotifications, jobMatches] = await Promise.allSettled([
      this.getSection(SECTION_KEYS.APPS, userId, 60, () => this.fetchApplications(userId)),
      this.getSection(SECTION_KEYS.NOTIFICATIONS, userId, 60, () => this.fetchNotifications(userId)),
      this.getSection(SECTION_KEYS.JOBS, userId, 3600, () => this.fetchJobMatches(userId)),
    ]);

    return {
      applications: this.unwrap(userApplications, SECTION_KEYS.APPS, userId),
      notifications: this.unwrap(userNotifications, SECTION_KEYS.NOTIFICATIONS, userId),
      jobMatches: this.unwrap(jobMatches, SECTION_KEYS.JOBS, userId),
      generatedAt: new Date().toISOString(),
    };
  }

  /**
   * Generic method to fetch a section, caching it in Redis
   */
  private async getSection<T>(
    key: string,
    userId: string,
    ttlSeconds: number,
    fetcher: () => Promise<T>
  ): Promise<T> {
    const cacheKey = `dashboard:${userId}:${key}`;
    try {
      const cached = await redis.get(cacheKey);
      if (cached) {
        return JSON.parse(cached) as T;
      }
    } catch (err) {
      logger.warn(`Redis GET failed for ${cacheKey}`, err);
    }

    const data = await fetcher();

    try {
      await redis.setex(cacheKey, ttlSeconds, JSON.stringify(data));
    } catch (err) {
      logger.warn(`Redis SETEX failed for ${cacheKey}`, err);
    }

    return data;
  }

  /**
   * Invalidate a specific section in Redis
   */
  async invalidateSection(userId: string, section: string): Promise<void> {
    try {
      await redis.del(`dashboard:${userId}:${section}`);
    } catch (err) {
      logger.warn(`Redis DEL failed for dashboard:${userId}:${section}`, err);
    }
  }

  private unwrap<T>(result: PromiseSettledResult<T>, section: string, userId: string): SectionResult<T> | T {
    if (result.status === 'fulfilled') {
      return result.value;
    }
    logger.error('dashboard.section.failed', { userId, section, error: result.reason?.message || result.reason });
    return { error: true, section, message: 'Unable to load this section' };
  }

  // --- Fetchers (Business Logic) ---

  private async fetchApplications(userId: string) {
    return await db
      .select({
        id: applications.id,
        status: applications.status,
        appliedAt: applications.appliedAt,
        jobId: applications.jobId,
        jobTitle: jobs.title,
        companyName: companies.name,
        companyLogo: companies.logoUrl,
      })
      .from(applications)
      .leftJoin(jobs, eq(applications.jobId, jobs.id))
      .leftJoin(companies, eq(jobs.companyId, companies.id))
      .where(eq(applications.jobSeekerId, userId))
      .orderBy(desc(applications.appliedAt))
      .limit(5);
  }

  private async fetchNotifications(userId: string) {
    return await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, userId))
      .orderBy(desc(notifications.createdAt))
      .limit(10);
  }

  private async fetchJobMatches(userId: string) {
    // Get job seeker profile for matching
    const [jobSeekerProfile] = await db
      .select()
      .from(jobSeekers)
      .where(eq(jobSeekers.id, userId))
      .limit(1);

    // Get active jobs
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

    // Match calculation logic
    return activeJobs.map(job => {
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

      // Location Match (10% weight)
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
  }
}

export const dashboardService = new DashboardService();
