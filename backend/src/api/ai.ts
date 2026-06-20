import express, { Response } from 'express';
import { z } from 'zod';
import axios from 'axios';
import { aiService } from '../services/aiService';
import { authenticateToken, AuthRequest, requireVerified } from '../middleware/auth';
import { db } from '../utils/database';
import { aiChatMessages, generatedDocuments, users, jobSeekers, jobs, companies, applications, resumes } from '../models/schema';
import { eq, asc, desc, and, isNull } from 'drizzle-orm';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import os from 'os';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../middleware/error';
import { resumeStorage, uploadWithFallback } from '../utils/storage';
import logger from '../utils/logger';

const router = express.Router();

// Determine local fallback directory for development
const localUploadDir = process.env.UPLOAD_DIR
  ? path.resolve(process.env.UPLOAD_DIR)
  : path.join(os.tmpdir(), 'careerforge', 'uploads', 'resumes');

// Ensure local directory exists for fallback
try {
  fs.mkdirSync(localUploadDir, { recursive: true });
  logger.info(`Local upload fallback dir: ${localUploadDir}`);
} catch (err: any) {
  logger.warn(`Could not create local upload dir: ${err?.message || err}`);
}

// Multer config for memory storage (we'll handle Supabase upload manually)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError('Invalid file type. Only PDF, Word, and Text documents are allowed.', 400, 'INVALID_FILE_TYPE') as any);
    }
  }
});

// Validation schemas
const parseResumeSchema = z.object({
  text: z.string().min(1),
});

const optimizeResumeSchema = z.object({
  resumeData: z.record(z.any()),
  jobRequirements: z.record(z.any()),
});

const getAdviceSchema = z.object({
  context: z.string().min(1),
});

const optimizeLinkedInSchema = z.object({
  currentHeadline: z.string().min(1),
  targetRole: z.string().min(1),
});

const generateCoverLetterSchema = z.object({
  jobId: z.string().uuid(),
  resumeId: z.string().uuid(),
});

const analyzeSkillGapsSchema = z.object({
  roles: z.array(z.string()).min(1),
});

const getHiringSuggestionsSchema = z.object({
  jobDraft: z.record(z.any()),
});

const analyzeResumeSchema = z.object({
  candidateId: z.string().uuid(),
  jobId: z.string().uuid().optional(),
});

/**
 * @swagger
 * /api/ai/health:
 *   get:
 *     summary: Check AI services health
 */
router.get('/health', catchAsync(async (req: AuthRequest, res: Response) => {
  const healthStatus = await aiService.healthCheck();
  const allHealthy = Object.values(healthStatus).every(status => status);

  res.json({
    success: true,
    status: allHealthy ? 'healthy' : 'degraded',
    services: healthStatus,
    timestamp: new Date().toISOString(),
  });
}));

/**
 * @swagger
 * /api/ai/resume/parse:
 *   post:
 *     summary: Parse resume text with AI
 *     tags: [AI]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [text]
 *             properties:
 *               text: { type: string }
 *     responses:
 *       200:
 *         description: Resume parsed successfully
 */
router.post('/resume/parse', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const { text } = parseResumeSchema.parse(req.body);
  const result = await aiService.parseResume(Buffer.from(text), 'text-input.txt');

  res.json({
    success: true,
    data: result,
    timestamp: new Date().toISOString(),
  });
}));

/**
 * @swagger
 * /api/ai/resume/parse-file:
 *   post:
 *     summary: Parse resume file (PDF/Word) with AI
 *     tags: [AI]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file: { type: string, format: binary }
 *     responses:
 *       200:
 *         description: Resume file parsed successfully
 *       400:
 *         description: Missing file or invalid format
 */
router.post('/resume/parse-file', authenticateToken, requireVerified, upload.single('file'), catchAsync(async (req: AuthRequest, res: Response) => {
  if (!req.file) {
    throw new AppError('No file uploaded', 400, 'MISSING_FILE');
  }

  try {
    // Use file buffer directly for AI parsing
    const fileBuffer = req.file.buffer;
    const result = await aiService.parseResume(fileBuffer, req.file.originalname);

    res.json({
      success: true,
      data: result,
      filename: req.file.originalname,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    logger.error('AI parse file error:', error);
    throw new AppError('Failed to parse resume file', 500, 'PARSE_ERROR');
  }
}));

/**
 * @swagger
 * /api/ai/resume/optimize:
 *   post:
 *     summary: Optimize resume for a specific job
 *     tags: [AI]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [resumeData, jobRequirements]
 *             properties:
 *               resumeData: { type: object }
 *               jobRequirements: { type: object }
 *     responses:
 *       200:
 *         description: Resume optimization suggestions generated
 */
router.post('/resume/optimize', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const { resumeData, jobRequirements } = optimizeResumeSchema.parse(req.body);
  const result = await aiService.optimizeResume(resumeData, JSON.stringify(jobRequirements));

  res.json({
    success: true,
    data: result,
    timestamp: new Date().toISOString(),
  });
}));

/**
 * @swagger
 * /api/ai/matching/job/{jobSeekerId}:
 *   get:
 *     summary: Get job matches for job seeker
 */
router.get('/matching/job/:jobSeekerId', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const jobSeekerId = req.params.jobSeekerId;

  // Authorization
  if (req.user!.id !== jobSeekerId) {
    throw new AppError('Unauthorized', 403, 'FORBIDDEN');
  }

  const matches = await aiService.findJobMatches(jobSeekerId);

  res.json({
    success: true,
    data: matches,
    count: matches.length,
    timestamp: new Date().toISOString(),
  });
}));

/**
 * @swagger
 * /api/ai/matching/candidates/{jobId}:
 *   get:
 *     summary: Get candidate matches for job
 */
router.get('/matching/candidates/:jobId', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const jobId = req.params.jobId;

  // Authorization: Ideally check if this recruiter posted the job
  if (!jobId) {
    throw new AppError('Job ID is required', 400, 'MISSING_PARAM');
  }
  const candidates = await aiService.matchCandidates(jobId as string);

  res.json({
    success: true,
    data: candidates,
    count: candidates.length,
    timestamp: new Date().toISOString(),
  });
}));

/**
 * @swagger
 * /api/ai/career/advice:
 *   post:
 *     summary: Get AI career advice with optional session context
 *     description: Provides personalized career advice. Include sessionId for context-aware conversations.
 *     tags: [AI]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [context]
 *             properties:
 *               context:
 *                 type: string
 *                 description: User query or career context
 *                 example: "How can I transition to a senior developer role?"
 *               sessionId:
 *                 type: string
 *                 description: Optional session ID for maintaining conversation context
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *               userContext:
 *                 type: object
 *                 description: Optional user profile information
 *                 properties:
 *                   title:
 *                     type: string
 *                   skills:
 *                     type: array
 *                     items:
 *                       type: string
 *                   experience_years:
 *                     type: number
 *     responses:
 *       200:
 *         description: AI advice retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     advice:
 *                       type: string
 *                     action_items:
 *                       type: array
 *                       items:
 *                         type: string
 *                     resources:
 *                       type: array
 *                       items:
 *                         type: string
 *                     confidence_score:
 *                       type: number
 *                       example: 0.85
 */
router.post('/career/advice', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const { context } = getAdviceSchema.parse(req.body);
  const advice = await aiService.getCareerAdvice(context, {});

  res.json({
    success: true,
    data: advice,
    timestamp: new Date().toISOString(),
  });
}));

/**
 * @swagger
 * /api/ai/career/linkedin-optimize:
 *   post:
 *     summary: Get LinkedIn profile optimization suggestions
 *     tags: [AI]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [currentHeadline, targetRole]
 *             properties:
 *               currentHeadline: { type: string }
 *               targetRole: { type: string }
 *     responses:
 *       200:
 *         description: LinkedIn optimization tips generated
 */
router.post('/career/linkedin-optimize', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const { currentHeadline, targetRole } = optimizeLinkedInSchema.parse(req.body);
  const result = await aiService.optimizeLinkedInProfile(currentHeadline, targetRole);

  res.json({
    success: true,
    data: result,
    timestamp: new Date().toISOString(),
  });
}));

/**
 * @swagger
 * /api/ai/career/cover-letter:
 *   post:
 *     summary: Generate a tailored cover letter
 *     tags: [AI]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [jobId, resumeId]
 *             properties:
 *               jobId: { type: string, format: uuid }
 *               resumeId: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Tailored cover letter generated
 */
router.post('/career/cover-letter', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const { jobId, resumeId } = generateCoverLetterSchema.parse(req.body);
  const result = await aiService.generateCoverLetter(jobId, resumeId);

  res.json({
    success: true,
    data: result,
    timestamp: new Date().toISOString(),
  });
}));

/**
 * @swagger
 * /api/ai/career/skill-gaps:
 *   get:
 *     summary: Analyze skill gaps for specific roles
 *     tags: [AI]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: roles
 *         required: true
 *         schema: { type: string, description: 'Comma separated list of roles' }
 *     responses:
 *       200:
 *         description: Skill gap analysis retrieved successfully
 */
router.get('/career/skill-gaps', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const { roles } = analyzeSkillGapsSchema.parse(req.query);
  const userId = req.user!.id;
  const result = await aiService.analyzeSkillGaps(userId, roles);

  res.json({
    success: true,
    data: result,
    timestamp: new Date().toISOString(),
  });
}));

/**
 * @swagger
 * /api/ai/hiring/suggestions:
 *   post:
 *     summary: Get AI hiring suggestions for a job draft
 *     tags: [AI]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [jobDraft]
 *             properties:
 *               jobDraft: { type: object }
 *     responses:
 *       200:
 *         description: Hiring suggestions generated
 */
router.post('/hiring/suggestions', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const { jobDraft } = getHiringSuggestionsSchema.parse(req.body);
  const result = await aiService.getHiringSuggestions(jobDraft);

  res.json({
    success: true,
    data: result,
    timestamp: new Date().toISOString(),
  });
}));

/**
 * @swagger
 * /api/ai/recruiter/analyze/{candidateId}:
 *   get:
 *     summary: Analyze a candidate's resume for a recruiter
 *     tags: [AI]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: candidateId
 *         required: true
 *         schema: { type: string, format: uuid }
 *       - in: query
 *         name: jobId
 *         schema: { type: string, format: uuid }
 *     responses:
 *       200:
 *         description: Candidate analysis retrieved successfully
 */
router.get('/recruiter/analyze/:candidateId', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const candidateId = req.params.candidateId;
  const jobId = req.query.jobId as string | undefined;

  if (!candidateId) {
    throw new AppError('Candidate ID is required', 400, 'MISSING_PARAM');
  }
  const result = await aiService.analyzeResumeForRecruiter(candidateId as string, (jobId as string) || '');

  res.json({
    success: true,
    data: result,
    timestamp: new Date().toISOString(),
  });
}));

/**
 * @swagger
 * /api/ai/coach/history:
 *   get:
 *     summary: Get AI Coach chat history
 */
router.get('/coach/history', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  
  const history = await db.select()
    .from(aiChatMessages)
    .where(eq(aiChatMessages.userId, userId))
    .orderBy(asc(aiChatMessages.createdAt));

  res.json({
    success: true,
    data: history,
  });
}));

/**
 * @swagger
 * /api/ai/coach/message:
 *   post:
 *     summary: Save AI Coach messages
 */
router.post('/coach/message', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { messages } = req.body; // Array of {role, content}
  
  if (!messages || !Array.isArray(messages)) {
    throw new AppError('Messages array is required', 400, 'INVALID_INPUT');
  }

  const values = messages.map(m => ({
    userId,
    role: m.role,
    content: m.content
  }));

  const saved = await db.insert(aiChatMessages).values(values).returning();

  res.json({
    success: true,
    data: saved,
  });
}));

/**
 * @swagger
 * /api/ai/insights:
 *   post:
 *     summary: Generate page-specific AI insights
 */
router.post('/insights', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { pageType, pageContext } = req.body;
  
  if (!pageType) {
    throw new AppError('pageType is required', 400, 'INVALID_INPUT');
  }

  // Forward to Python AI service
  const aiServiceUrl = process.env.CAREER_COACH_URL || 'http://localhost:8000';
  const axios = require('axios');
  
  try {
    const response = await axios.post(`${aiServiceUrl}/agent/insights`, {
      page_type: pageType,
      page_context: pageContext || '',
      user_id: userId
    });
    
    res.json({
      success: true,
      data: response.data
    });
  } catch (err) {
    console.error("AI Insights Error:", err);
    res.json({
      success: true,
      data: { message: "Keep updating your profile to unlock more AI insights.", action: "NONE" }
    });
  }
}));

/**
 * @swagger
 * /api/ai/documents/my:
 *   get:
 *     summary: List all generated documents for the authenticated user
 *     tags: [AI]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of generated documents
 */
router.get('/documents/my', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const docs = await db.select()
    .from(generatedDocuments)
    .where(eq(generatedDocuments.userId, userId))
    .orderBy(desc(generatedDocuments.createdAt));
  
  res.json({
    success: true,
    data: docs
  });
}));

/**
 * @swagger
 * /api/ai/cover-letter/{jobId}/download:
 *   get:
 *     summary: Download cover letter as DOCX
 *     tags: [AI]
 *     security:
 *       - cookieAuth: []
 */
router.get('/cover-letter/:jobId/download', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const jobId = req.params.jobId as string;

  // 1. Check if we already have it in generatedDocuments
  const existingDocs = await db.select()
    .from(generatedDocuments)
    .where(
      and(
        eq(generatedDocuments.userId, userId),
        eq(generatedDocuments.relatedJobId, jobId),
        eq(generatedDocuments.documentType, 'cover_letter')
      )
    )
    .limit(1);

  const doc = existingDocs[0];
  if (doc) {
    if (fs.existsSync(doc.fileUrl)) {
      const fileBuffer = fs.readFileSync(doc.fileUrl);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      res.setHeader('Content-Disposition', `attachment; filename="${doc.fileName}"`);
      res.send(fileBuffer);
      return;
    }
    try {
      if (doc.fileUrl.startsWith('http')) {
        const response = await axios.get(doc.fileUrl, { responseType: 'arraybuffer' });
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.setHeader('Content-Disposition', `attachment; filename="${doc.fileName}"`);
        res.send(Buffer.from(response.data));
        return;
      }
    } catch (err) {
      logger.warn(`Could not fetch existing document from remote: ${err}`);
    }
  }

  // 2. Generate fresh cover letter
  const user = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  const job = await db.select().from(jobs).where(eq(jobs.id, jobId)).limit(1);
  
  const userRecord = user[0];
  if (!userRecord) {
    throw new AppError('User not found', 404, 'NOT_FOUND');
  }

  const jobRecord = job[0];
  const company = jobRecord && jobRecord.companyId
    ? await db.select().from(companies).where(eq(companies.id, jobRecord.companyId)).limit(1)
    : null;
  const companyRecord = company && company[0];

  const candidateInfo = {
    name: `${userRecord.firstName || ''} ${userRecord.lastName || ''}`.trim() || 'Candidate Name',
    email: userRecord.email,
    phone: userRecord.phone || '',
    location: userRecord.location || ''
  };

  const jobInfo = jobRecord ? {
    title: jobRecord.title,
    company: companyRecord ? companyRecord.name : '',
    description: jobRecord.description || '',
    requirements: jobRecord.requirements || ''
  } : null;

  const application = await db.select()
    .from(applications)
    .where(and(eq(applications.jobSeekerId, userId), eq(applications.jobId, jobId)))
    .limit(1);

  let coverLetterContent = "";
  const appRecord = application[0];
  if (appRecord && appRecord.coverLetter) {
    coverLetterContent = appRecord.coverLetter;
  } else {
    // Generate cover letter text via AI Service
    const aiResult = await aiService.generateCoverLetter(jobId, userId);
    coverLetterContent = aiResult.content || aiResult.cover_letter || "Dear Hiring Manager...";
  }

  // Generate the DOCX buffer via career coach download API
  const docxBuffer = await aiService.downloadCoverLetter(coverLetterContent, candidateInfo, jobInfo);

  // Save the document using uploadWithFallback
  const sanitizedJobTitle = (jobInfo?.title || 'Job').replace(/[^a-zA-Z0-9]/g, '_');
  const fileName = `CoverLetter_${sanitizedJobTitle}_${Date.now()}.docx`;
  const storagePath = `${userId}/cover_letters/${fileName}`;
  const localFallbackPath = path.join(os.tmpdir(), 'careerforge', 'uploads', 'documents', userId, fileName);

  const uploadResult = await uploadWithFallback(
    'documents',
    storagePath,
    docxBuffer,
    localFallbackPath,
    { contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
  );

  // Insert row into generatedDocuments
  await db.insert(generatedDocuments).values({
    userId,
    documentType: 'cover_letter',
    fileName,
    fileUrl: uploadResult.url,
    fileSizeBytes: docxBuffer.length,
    relatedJobId: jobId,
    metadata: { format: 'docx', source: 'career_coach' }
  });

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
  res.send(docxBuffer);
}));

/**
 * @swagger
 * /api/ai/resume/{resumeId}/download:
 *   get:
 *     summary: Download resume as DOCX
 *     tags: [AI]
 *     security:
 *       - cookieAuth: []
 */
router.get('/resume/:resumeId/download', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const resumeId = req.params.resumeId as string;
  const targetJobId = req.query.targetJobId as string | undefined;

  // 1. Check if we already have it in generatedDocuments
  const existingDocs = await db.select()
    .from(generatedDocuments)
    .where(
      and(
        eq(generatedDocuments.userId, userId),
        eq(generatedDocuments.relatedResumeId, resumeId),
        eq(generatedDocuments.documentType, 'optimized_resume'),
        targetJobId ? eq(generatedDocuments.relatedJobId, targetJobId) : isNull(generatedDocuments.relatedJobId)
      )
    )
    .limit(1);

  const doc = existingDocs[0];
  if (doc) {
    if (fs.existsSync(doc.fileUrl)) {
      const fileBuffer = fs.readFileSync(doc.fileUrl);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
      res.setHeader('Content-Disposition', `attachment; filename="${doc.fileName}"`);
      res.send(fileBuffer);
      return;
    }
    try {
      if (doc.fileUrl.startsWith('http')) {
        const response = await axios.get(doc.fileUrl, { responseType: 'arraybuffer' });
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.setHeader('Content-Disposition', `attachment; filename="${doc.fileName}"`);
        res.send(Buffer.from(response.data));
        return;
      }
    } catch (err) {
      logger.warn(`Could not fetch existing document from remote: ${err}`);
    }
  }

  // 2. Fetch the Resume data
  const resume = await db.select().from(resumes).where(and(eq(resumes.id, resumeId), eq(resumes.jobSeekerId, userId))).limit(1);
  const resumeRecord = resume[0];
  if (!resumeRecord) {
    throw new AppError('Resume not found', 404, 'NOT_FOUND');
  }

  const parsedData = (resumeRecord.parsedData as any) || {};
  let optimizations: any = null;

  // If targetJobId is specified, let's optimize or use existing optimizations
  if (targetJobId) {
    const job = await db.select().from(jobs).where(eq(jobs.id, targetJobId)).limit(1);
    const jobRecord = job[0];
    if (jobRecord) {
      const optResult = await aiService.optimizeResume(parsedData, jobRecord.requirements || jobRecord.description || '');
      optimizations = optResult.optimizations || optResult;
    }
  }

  const docxBuffer = await aiService.downloadOptimizedResume(parsedData, optimizations);

  // Save the document
  const fileName = `Resume_${Date.now()}.docx`;
  const storagePath = `${userId}/resumes/${fileName}`;
  const localFallbackPath = path.join(os.tmpdir(), 'careerforge', 'uploads', 'documents', userId, fileName);

  const uploadResult = await uploadWithFallback(
    'documents',
    storagePath,
    docxBuffer,
    localFallbackPath,
    { contentType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
  );

  // Insert row into generatedDocuments
  await db.insert(generatedDocuments).values({
    userId,
    documentType: 'optimized_resume',
    fileName,
    fileUrl: uploadResult.url,
    fileSizeBytes: docxBuffer.length,
    relatedResumeId: resumeId,
    relatedJobId: targetJobId || null,
    metadata: { format: 'docx', source: 'career_coach' }
  });

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
  res.send(docxBuffer);
}));

/**
 * @swagger
 * /api/ai/coach/guided-builder/start:
 *   post:
 *     summary: Start a new guided resume builder session
 *     tags: [AI]
 *     security:
 *       - cookieAuth: []
 */
router.post('/coach/guided-builder/start', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const { targetRole, experienceYears, keyAchievements } = req.body;

  if (!targetRole) {
    throw new AppError('Target role is required', 400, 'BAD_REQUEST');
  }

  const result = await aiService.startGuidedBuilder(userId, targetRole, Number(experienceYears || 0), keyAchievements || '');

  res.json(result);
}));

/**
 * @swagger
 * /api/ai/coach/guided-builder/respond:
 *   post:
 *     summary: Process user response or feedback for guided builder
 *     tags: [AI]
 *     security:
 *       - cookieAuth: []
 */
router.post('/coach/guided-builder/respond', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const { sessionId, stage, answer, feedback, approve } = req.body;

  if (!sessionId) {
    throw new AppError('Session ID is required', 400, 'BAD_REQUEST');
  }

  const result = await aiService.respondGuidedBuilder(
    sessionId,
    Number(stage || 1),
    answer,
    feedback,
    approve
  );

  res.json(result);
}));

/**
 * @swagger
 * /api/ai/coach/guided-builder/session/{id}:
 *   get:
 *     summary: Get guided builder session details
 *     tags: [AI]
 *     security:
 *       - cookieAuth: []
 */
router.get('/coach/guided-builder/session/:id', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  if (!id) {
    throw new AppError('Session ID is required', 400, 'BAD_REQUEST');
  }

  const result = await aiService.getGuidedBuilderSession(id);

  res.json(result);
}));

/**
 * @swagger
 * /api/ai/coach/guided-builder/sessions:
 *   get:
 *     summary: List guided builder sessions for the user
 *     tags: [AI]
 *     security:
 *       - cookieAuth: []
 */
router.get('/coach/guided-builder/sessions', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const result = await aiService.listGuidedBuilderSessions(userId);

  res.json(result);
}));

/**
 * @swagger
 * /api/ai/career-pitch-deck/{candidateId}/download:
 *   get:
 *     summary: Download candidate career pitch deck as PPTX
 *     tags: [AI]
 *     security:
 *       - cookieAuth: []
 */
router.get('/career-pitch-deck/:candidateId/download', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const candidateId = req.params.candidateId as string;

  if (!candidateId) {
    throw new AppError('Candidate ID is required', 400, 'BAD_REQUEST');
  }

  // Verify ownership or role
  if (userId !== candidateId && req.user!.role !== 'recruiter') {
    throw new AppError('Unauthorized to view this candidate pitch deck', 403, 'FORBIDDEN');
  }

  // 1. Check if we already have it in generatedDocuments
  const existingDocs = await db.select()
    .from(generatedDocuments)
    .where(
      and(
        eq(generatedDocuments.userId, candidateId),
        eq(generatedDocuments.documentType, 'career_pitch_deck')
      )
    )
    .orderBy(desc(generatedDocuments.createdAt))
    .limit(1);

  const doc = existingDocs[0];
  if (doc) {
    if (fs.existsSync(doc.fileUrl)) {
      const fileBuffer = fs.readFileSync(doc.fileUrl);
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
      res.setHeader('Content-Disposition', `attachment; filename="${doc.fileName}"`);
      res.send(fileBuffer);
      return;
    }
  }

  // 2. Fetch the profile and active resume
  const [userRecord] = await db.select().from(users).where(eq(users.id, candidateId)).limit(1);
  const [profileRecord] = await db.select().from(jobSeekers).where(eq(jobSeekers.id, candidateId)).limit(1);
  const [activeResume] = await db.select().from(resumes).where(and(eq(resumes.jobSeekerId, candidateId), eq(resumes.isActive, true))).limit(1);

  const candidateName = `${userRecord?.firstName || ''} ${userRecord?.lastName || ''}`.trim() || 'Candidate';
  const targetRole = (req.query.targetRole as string) || profileRecord?.title || 'Professional';

  const candidateData = {
    summary: (activeResume?.parsedData as any)?.summary || profileRecord?.bio || '',
    skills: (activeResume?.parsedData as any)?.skills || profileRecord?.skills || [],
    experience_years: profileRecord?.experienceYears || 0,
    education: (activeResume?.parsedData as any)?.education || profileRecord?.education || '',
    certifications: (activeResume?.parsedData as any)?.certifications || profileRecord?.certifications || [],
    experience: (activeResume?.parsedData as any)?.experience || profileRecord?.experience || [],
    contact: {
      email: userRecord?.email || '',
      phone: userRecord?.phone || '',
    }
  };

  const { presentationService } = require('../services/presentationService');
  const pptxBuffer = await presentationService.generateCareerPitchDeck(candidateName, candidateData, targetRole);

  // 3. Upload report
  const sanitizedTitle = targetRole.replace(/[^a-zA-Z0-9]/g, '_');
  const fileName = `CareerPitchDeck_${sanitizedTitle}_${Date.now()}.pptx`;
  const storagePath = `${candidateId}/presentations/${fileName}`;
  const localFallbackPath = path.join(os.tmpdir(), 'careerforge', 'uploads', 'documents', candidateId, fileName);

  const uploadResult = await uploadWithFallback(
    'documents',
    storagePath,
    pptxBuffer,
    localFallbackPath,
    { contentType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' }
  );

  // 4. Insert row into generatedDocuments
  await db.insert(generatedDocuments).values({
    userId: candidateId,
    documentType: 'career_pitch_deck',
    fileName,
    fileUrl: uploadResult.url,
    fileSizeBytes: pptxBuffer.length,
    relatedResumeId: activeResume?.id || null,
    metadata: { format: 'pptx', source: 'career_coach' }
  });

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
  res.send(pptxBuffer);
}));

/**
 * @swagger
 * /api/ai/talent-report/{jobId}/download:
 *   get:
 *     summary: Download recruiter talent pipeline report as PPTX
 *     tags: [AI]
 *     security:
 *       - cookieAuth: []
 */
router.get('/talent-report/:jobId/download', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const { jobId } = req.params;
  const userId = req.user!.id;

  if (!jobId) {
    throw new AppError('Job ID is required', 400, 'BAD_REQUEST');
  }

  // 1. Get job and verify ownership
  const [job] = await db.select().from(jobs).where(eq(jobs.id, jobId)).limit(1);
  if (!job) {
    throw new AppError('Job not found', 404, 'NOT_FOUND');
  }

  if (job.recruiterId !== userId) {
    throw new AppError('Unauthorized to view this talent report', 403, 'FORBIDDEN');
  }

  // Helper matching function
  function calculateLocalMatch(jobSeekerSkills: string[], jobSkills: string[]): { score: number } {
    if (!jobSkills || jobSkills.length === 0) return { score: 100 };
    if (!jobSeekerSkills || jobSeekerSkills.length === 0) return { score: 0 };
    const lowerJobSkills = jobSkills.map(s => s.toLowerCase());
    const lowerUserSkills = jobSeekerSkills.map(s => s.toLowerCase());
    const matchedSkills = lowerJobSkills.filter(s => lowerUserSkills.some(u => u.includes(s) || s.includes(u)));
    const score = Math.round((matchedSkills.length / lowerJobSkills.length) * 100);
    return { score };
  }

  // 2. Gather candidates
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
    const { score } = calculateLocalMatch(
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

  const { presentationService } = require('../services/presentationService');
  const pptxBuffer = await presentationService.generateTalentPipelineReport(
    job.title,
    job.skillsRequired || [],
    candidatesData
  );

  // 3. Upload report
  const sanitizedTitle = job.title.replace(/[^a-zA-Z0-9]/g, '_');
  const fileName = `TalentPipelineReport_${sanitizedTitle}_${Date.now()}.pptx`;
  const storagePath = `${userId}/presentations/${fileName}`;
  const localFallbackPath = path.join(os.tmpdir(), 'careerforge', 'uploads', 'documents', userId, fileName);

  const uploadResult = await uploadWithFallback(
    'documents',
    storagePath,
    pptxBuffer,
    localFallbackPath,
    { contentType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' }
  );

  // 4. Insert row into generatedDocuments
  await db.insert(generatedDocuments).values({
    userId,
    documentType: 'talent_pipeline_report',
    fileName,
    fileUrl: uploadResult.url,
    fileSizeBytes: pptxBuffer.length,
    relatedJobId: jobId,
    metadata: { format: 'pptx', source: 'matching_engine' }
  });

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
  res.send(pptxBuffer);
}));

export default router;