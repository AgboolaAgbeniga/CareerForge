import express, { Response } from 'express';
import { z } from 'zod';
import { aiService } from '../services/aiService';
import { authenticateToken, AuthRequest, requireVerified } from '../middleware/auth';
import { db } from '../utils/database';
import { aiChatMessages } from '../models/schema';
import { eq, asc } from 'drizzle-orm';
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
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError('Invalid file type. Only PDF and Word documents are allowed.', 400, 'INVALID_FILE_TYPE') as any);
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

export default router;