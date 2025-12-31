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
  console.info(`Local upload fallback dir: ${localUploadDir}`);
} catch (err: any) {
  console.warn(`Could not create local upload dir: ${err?.message || err}`);
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
 *     summary: Upload, parse, and save resume
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
    console.error('Resume upload error:', error);
    throw new AppError('Failed to upload resume', 500, 'UPLOAD_ERROR');
  }
  // ... existing upload route ...
}));

/**
 * @swagger
 * /api/resume/parse-file:
 *   post:
 *     summary: Parse a resume file directly (no DB save) - Demo/Test only
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
    console.error('Direct parse error:', error);
    throw new AppError('Failed to parse resume', 500, 'PARSE_ERROR');
  }
}));

/**
 * @swagger
 * /api/resume/{id}/optimize:
 *   post:
 *     summary: AI optimize an existing resume
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