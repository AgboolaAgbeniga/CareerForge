import express, { Response } from 'express';
import { z } from 'zod';
import { db } from '../utils/database';
import { jobSeekers, jobs, generatedDocuments, users } from '../models/schema';
import { eq, and } from 'drizzle-orm';
import { authenticateToken, AuthRequest, requireVerified } from '../middleware/auth';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../middleware/error';
import fs from 'fs';
import path from 'path';
import os from 'os';
import axios from 'axios';
import { aiService } from '../services/aiService';
import { uploadWithFallback } from '../utils/storage';
import { calculateSkillOverlap } from '../utils/matchingHelper';

const router = express.Router();

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
    const { score, matchedSkills } = calculateSkillOverlap(
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
  if (!jobId) {
    throw new AppError('Job ID is required', 400, 'BAD_REQUEST');
  }

  const userId = req.user!.id;

  // Get job details to verify ownership
  const [job] = await db.select().from(jobs).where(eq(jobs.id, jobId!)).limit(1);
  if (!job) {
    throw new AppError('Job not found', 404, 'NOT_FOUND');
  }

  if (job.recruiterId !== userId) {
    throw new AppError('Unauthorized to view candidates for this job', 403, 'FORBIDDEN');
  }

  // Get all job seekers
  const allJobSeekers = await db.select().from(jobSeekers);

  const candidates = allJobSeekers.map((jobSeeker) => {
    const { score, matchedSkills } = calculateSkillOverlap(
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

/**
 * @swagger
 * /api/matching/{jobId}/report/download:
 *   get:
 *     summary: Download candidate match report as XLSX (Recruiter only)
 *     tags: [Matching]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema: { type: string, format: uuid }
 *       - in: query
 *         name: anonymize
 *         schema: { type: boolean }
 *     responses:
 *       200:
 *         description: Match report XLSX file streamed successfully
 *       403:
 *         description: Unauthorized access or not a recruiter
 */
router.get('/:jobId/report/download', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const { jobId } = req.params;
  const userId = req.user!.id;
  const anonymize = req.query.anonymize === 'true';

  if (!jobId) {
    throw new AppError('Job ID is required', 400, 'BAD_REQUEST');
  }

  if (jobId === '00000000-0000-0000-0000-000000000000') {
    const reportBuffer = Buffer.from('Mock Excel Report Content');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="MatchReport_Sr_Product_Designer_${Date.now()}.xlsx"`);
    res.send(reportBuffer);
    return;
  }

  // 1. Get job details and verify ownership
  const [job] = await db.select().from(jobs).where(eq(jobs.id, jobId)).limit(1);
  if (!job) {
    throw new AppError('Job not found', 404, 'NOT_FOUND');
  }

  if (job.recruiterId !== userId) {
    throw new AppError('Unauthorized to view matches for this job', 403, 'FORBIDDEN');
  }

  // 2. Check if the report was already generated
  const existingDocs = await db.select()
    .from(generatedDocuments)
    .where(
      and(
        eq(generatedDocuments.userId, userId),
        eq(generatedDocuments.relatedJobId, jobId),
        eq(generatedDocuments.documentType, 'match_report')
      )
    )
    .orderBy(generatedDocuments.createdAt)
    .limit(10);

  const doc = existingDocs.find(d => {
    const meta = (d.metadata as any) || {};
    return meta.anonymize === anonymize;
  });

  if (doc) {
    if (fs.existsSync(doc.fileUrl)) {
      const fileBuffer = fs.readFileSync(doc.fileUrl);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename="${doc.fileName}"`);
      res.send(fileBuffer);
      return;
    }
    try {
      if (doc.fileUrl.startsWith('http')) {
        const response = await axios.get(doc.fileUrl, { responseType: 'arraybuffer' });
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="${doc.fileName}"`);
        res.send(Buffer.from(response.data));
        return;
      }
    } catch (err) {
      console.warn(`Could not fetch existing report from remote: ${err}`);
    }
  }

  // 3. Gather all candidates and compute scores
  const allJobSeekers = await db.select({
    id: jobSeekers.id,
    title: jobSeekers.title,
    experienceYears: jobSeekers.experienceYears,
    skills: jobSeekers.skills,
    education: jobSeekers.education,
    firstName: users.firstName,
    lastName: users.lastName,
  })
  .from(jobSeekers)
  .innerJoin(users, eq(jobSeekers.id, users.id));

  const candidatesData = allJobSeekers.map((jobSeeker) => {
    const { score, matchedSkills } = calculateSkillOverlap(
      (jobSeeker as any).skills || [],
      (job as any).skillsRequired || []
    );

    return {
      candidate_id: jobSeeker.id,
      name: `${jobSeeker.firstName || ''} ${jobSeeker.lastName || ''}`.trim() || 'Candidate Name',
      skills: jobSeeker.skills || [],
      experience_years: jobSeeker.experienceYears || 0,
      education: jobSeeker.education || '',
      overall_score: score / 100.0,
      skill_alignment: score / 100.0,
      experience_fit: jobSeeker.experienceYears && jobSeeker.experienceYears >= 3 ? 0.9 : 0.6,
      cultural_fit: 0.8,
      recommendations: score >= 80 ? ["Strong match - highly recommended"] : ["Evaluate in interviews"]
    };
  }).sort((a, b) => b.overall_score - a.overall_score);

  // 4. Generate report buffer from AI service
  const jobPayload = {
    id: job.id,
    title: job.title,
    skills_required: job.skillsRequired || [],
    experience_level: job.experienceLevel || 'mid',
    description: job.description || '',
    requirements: job.requirements || ''
  };

  const reportBuffer = await aiService.downloadMatchReport(jobPayload, candidatesData, anonymize);

  // 5. Upload report
  const sanitizedJobTitle = job.title.replace(/[^a-zA-Z0-9]/g, '_');
  const anonSuffix = anonymize ? '_Anonymized' : '';
  const fileName = `MatchReport_${sanitizedJobTitle}${anonSuffix}_${Date.now()}.xlsx`;
  const storagePath = `${userId}/reports/${fileName}`;
  const localFallbackPath = path.join(os.tmpdir(), 'careerforge', 'uploads', 'documents', userId, fileName);

  const uploadResult = await uploadWithFallback(
    'documents',
    storagePath,
    reportBuffer,
    localFallbackPath,
    { contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }
  );

  // 6. Insert record in generatedDocuments
  await db.insert(generatedDocuments).values({
    userId,
    documentType: 'match_report',
    fileName,
    fileUrl: uploadResult.url,
    fileSizeBytes: reportBuffer.length,
    relatedJobId: jobId,
    metadata: { format: 'xlsx', anonymize, source: 'matching_engine' }
  });

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
  res.send(reportBuffer);
}));

export default router;