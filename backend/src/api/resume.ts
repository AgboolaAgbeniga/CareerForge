import express, { Response } from 'express';
import multer from 'multer';
import { z } from 'zod';
import { db } from '../utils/database';
import { resumes, jobSeekers } from '../models/schema';
import { eq } from 'drizzle-orm';
import { authenticateToken, AuthRequest, requireVerified } from '../middleware/auth';
import { catchAsync } from '../utils/catchAsync';
import { AppError } from '../middleware/error';
import { aiService } from '../services/aiService';
import { resumeStorage, uploadWithFallback } from '../utils/storage';
import logger from '../utils/logger';
import fs from 'fs';
import path from 'path';
import os from 'os';

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
  limits: { fileSize: 10 * 1024 * 1024 },
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
const optimizeSchema = z.object({
  targetJobId: z.string().uuid().optional(),
  optimizationType: z.string().optional(),
});

/**
 * @swagger
 * /api/resume/upload:
 *   post:
 *     summary: Upload, parse, and save resume to database
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Resume file (PDF or DOCX)
 *     responses:
 *       200:
 *         description: Resume uploaded and parsed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 resume:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     parsed_data:
 *                       type: object
 *                       properties:
 *                         skills:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               skill:
 *                                 type: string
 *                               confidence:
 *                                 type: number
 *                         experience:
 *                           type: array
 *                           items:
 *                             type: object
 *                         education:
 *                           type: array
 *                           items:
 *                             type: object
 *                         contact:
 *                           type: object
 *                           properties:
 *                             email:
 *                               type: string
 *                             phone:
 *                               type: string
 *       400:
 *         description: Invalid file type or missing file
 *       401:
 *         description: Unauthorized
 */
router.post('/upload', authenticateToken, requireVerified, upload.single('file'), catchAsync(async (req: AuthRequest, res: Response) => {
  if (!req.file) {
    throw new AppError('No file uploaded', 400, 'MISSING_FILE');
  }

  const userId = req.user!.id;

  // Verify job seeker exists
  const [jobSeeker] = await db.select().from(jobSeekers).where(eq(jobSeekers.id, userId)).limit(1);
  if (!jobSeeker) {
    throw new AppError('Job seeker profile not found. Please complete onboarding first.', 404, 'NOT_FOUND');
  }

  try {
    // Upload to Supabase Storage with fallback to local
    const fileBuffer = req.file.buffer;
    const localFallbackPath = path.join(localUploadDir, `${userId}-${Date.now()}-${req.file.originalname}`);

    const uploadResult = await uploadWithFallback(
      'resumes',
      '', // Will be set by resumeStorage.uploadResume
      fileBuffer,
      localFallbackPath,
      {
        cacheControl: '3600',
        contentType: req.file.mimetype,
      }
    );

    // If we have a local fallback, use that path
    const fileUrl = uploadResult.localPath || uploadResult.publicUrl;

    // Call AI service to parse the resume
    const parsedData = await aiService.parseResume(fileBuffer, req.file.originalname);

    // Save to database
    const [newResume] = await db.insert(resumes).values({
      jobSeekerId: userId,
      originalFileUrl: fileUrl,
      parsedData: parsedData,
      createdAt: new Date(),
      updatedAt: new Date(),
    }).returning();

    if (!newResume) {
      throw new AppError('Failed to save resume record', 500, 'INTERNAL_ERROR');
    }

    res.status(201).json({
      success: true,
      resumeId: newResume.id,
      parsedData,
      fileUrl: uploadResult.publicUrl,
      isLocal: !!uploadResult.localPath
    });
  } catch (error) {
    logger.error('Resume upload error:', error);
    throw new AppError('Failed to upload resume', 500, 'UPLOAD_ERROR');
  }
  // ... existing upload route ...
}));

/**
 * @swagger
 * /api/resume/parse-file:
 *   post:
 *     summary: Parse a resume file directly without saving to database
 *     description: Test endpoint for resume parsing. Returns parsed data without database storage.
 *     tags: [Resume]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Resume file (PDF, DOCX, HTML, or TXT)
 *     responses:
 *       200:
 *         description: Resume parsed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 personal_info:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                 skills:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       skill:
 *                         type: string
 *                         example: "Python"
 *                       confidence:
 *                         type: number
 *                         example: 0.95
 *                 experience:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       company:
 *                         type: string
 *                       start_date:
 *                         type: string
 *                       end_date:
 *                         type: string
 *                 education:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       degree:
 *                         type: string
 *                       institution:
 *                         type: string
 *                       year:
 *                         type: string
 *                 contact:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: "john@example.com"
 *                     phone:
 *                       type: string
 *                       example: "555-123-4567"
 *                 summary:
 *                   type: string
 *                 confidence_score:
 *                   type: number
 *                   example: 0.85
 *                   description: Overall confidence in parsing accuracy (0-1)
 *       400:
 *         description: Invalid file type or parsing error
 *       500:
 *         description: Internal server error
 */
router.post('/parse-file', upload.single('file'), catchAsync(async (req: AuthRequest, res: Response) => {
  if (!req.file) {
    throw new AppError('No file uploaded', 400, 'MISSING_FILE');
  }

  try {
    const fileBuffer = req.file.buffer;
    const parsedData = await aiService.parseResume(fileBuffer, req.file.originalname);

    res.json({
      success: true,
      data: parsedData
    });
  } catch (error) {
    logger.error('Direct parse error:', error);
    throw new AppError('Failed to parse resume', 500, 'PARSE_ERROR');
  }
}));

/**
 * @swagger
 * /api/resume/{id}/optimize:
 *   post:
 *     summary: AI-optimize an existing resume for a target job
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Resume ID
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               targetJobId:
 *                 type: string
 *                 format: uuid
 *                 description: Optional job ID to optimize for
 *               optimizationType:
 *                 type: string
 *                 description: Type of optimization
 *     responses:
 *       200:
 *         description: Resume optimized successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 optimized_data:
 *                   type: object
 *                   description: AI-optimized resume data
 *       404:
 *         description: Resume not found
 *       401:
 *         description: Unauthorized
 */
router.post('/:id/optimize', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError('Resume ID is required', 400, 'BAD_REQUEST');
  }

  const { targetJobId } = optimizeSchema.parse(req.body);
  const userId = req.user!.id;

  const [resume] = await db.select().from(resumes).where(eq(resumes.id, id)).limit(1);

  if (!resume) {
    throw new AppError('Resume not found', 404, 'NOT_FOUND');
  }

  if (resume.jobSeekerId !== userId) {
    throw new AppError('Unauthorized', 403, 'FORBIDDEN');
  }

  // Call AI service to optimize
  const optimizedData = await aiService.optimizeResume(resume.parsedData as any, targetJobId || '');

  await db.update(resumes).set({
    aiOptimizedData: optimizedData,
    updatedAt: new Date(),
  }).where(eq(resumes.id, id));

  res.json({
    success: true,
    optimizedResume: optimizedData,
    suggestions: (optimizedData as any).suggestions || []
  });
}));

/**
 * @swagger
 * /api/resume/my:
 *   get:
 *     summary: Get all resumes for the current user
 */
router.get('/my', authenticateToken, catchAsync(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;

  const myResumes = await db.select().from(resumes)
    .where(eq(resumes.jobSeekerId, userId))
    .orderBy(eq(resumes.isActive, true));

  res.json({
    success: true,
    data: myResumes
  });
}));

export default router;