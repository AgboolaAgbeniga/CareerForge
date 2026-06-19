import express, { Response } from 'express';
import multer from 'multer';
import { z } from 'zod';
import { db } from '../utils/database';
import { resumes, jobSeekers, users } from '../models/schema';
import { eq } from 'drizzle-orm';
import { authenticateToken, AuthRequest, requireVerified, requireOwnership } from '../middleware/auth';
import { catchAsync } from '../utils/catchAsync';
import { dashboardService, SECTION_KEYS } from '../services/dashboard.service';
import { AppError } from '../middleware/error';
import { aiService } from '../services/aiService';
import { resumeStorage, uploadWithFallback } from '../utils/storage';
import logger from '../utils/logger';
import { dashboardService } from '../services/dashboard.service';
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

    const sanitizedFileName = req.file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = `${userId}/resume-${Date.now()}-${sanitizedFileName}`;

    const uploadResult = await uploadWithFallback(
      'resumes',
      filePath,
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

    // Map parsed resume data → job_seekers profile columns so the
    // profile is correct on the very next login (not just locally in React state).
    const profileUpdates: Partial<typeof jobSeekers.$inferInsert> = {
      resumeFileUrl: fileUrl,
      updatedAt: new Date(),
    };

    // Title / professional headline
    if (parsedData.personal_info?.title) {
      profileUpdates.title = parsedData.personal_info.title;
    }

    // Bio / summary
    if (parsedData.summary) {
      profileUpdates.bio = parsedData.summary;
    }

    // Experience years
    if (parsedData.experience_years && parsedData.experience_years > 0) {
      profileUpdates.experienceYears = parsedData.experience_years;
    }

    // Skills (stored as text[] in the DB)
    if (parsedData.skills && Array.isArray(parsedData.skills) && parsedData.skills.length > 0) {
      profileUpdates.skills = parsedData.skills.map((s: any) =>
        typeof s === 'string' ? s : (s.skill || '')
      ).filter(Boolean);
    }

    // Work experience (stored as JSONB; normalise to the shape the frontend expects)
    if (parsedData.experience && Array.isArray(parsedData.experience) && parsedData.experience.length > 0) {
      profileUpdates.experience = parsedData.experience.map((exp: any) => ({
        title: exp.role || exp.title || exp.job_title || 'Role',
        company: exp.company || 'Company',
        location: exp.location || '',
        period: [exp.start_date, exp.end_date].filter(Boolean).join(' — ') || '',
        description: exp.description || (Array.isArray(exp.responsibilities) ? exp.responsibilities.join('\n') : '') || '',
      }));
    }

    // Education history (stored as JSONB)
    if (parsedData.education && Array.isArray(parsedData.education) && parsedData.education.length > 0) {
      profileUpdates.educationHistory = parsedData.education.map((ed: any) => ({
        institution: ed.institution || ed.school || 'University',
        degree: ed.degree || 'Degree',
        period: ed.year || ed.end_date || ed.graduation_year || '',
      }));
    }

    // Certifications (stored as JSONB)
    if (parsedData.certifications && Array.isArray(parsedData.certifications) && parsedData.certifications.length > 0) {
      profileUpdates.certifications = parsedData.certifications.map((cert: any) => ({
        name: typeof cert === 'string' ? cert : (cert.name || 'Certification'),
        issued: typeof cert === 'string' ? '' : (cert.issued || cert.date || ''),
      }));
    }

    // Persist all updates to the job_seekers table in one query
    await db.update(jobSeekers).set(profileUpdates).where(eq(jobSeekers.id, userId));

    // Also sync contact fields (phone, location) back to the users table
    const userContactUpdates: Partial<typeof users.$inferInsert> = { updatedAt: new Date() };
    if (parsedData.contact?.phone) userContactUpdates.phone = parsedData.contact.phone;
    if (parsedData.contact?.location) userContactUpdates.location = parsedData.contact.location;
    if (Object.keys(userContactUpdates).length > 1) {
      await db.update(users).set(userContactUpdates).where(eq(users.id, userId));
    }

    // Invalidate dashboard caches
    await dashboardService.invalidateSection(userId, SECTION_KEYS.RESUME);
    await dashboardService.invalidateSection(userId, SECTION_KEYS.CAREER); // Invalidate readiness index

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
 * /api/resume/linkedin-import:
 *   post:
 *     summary: Import profile data from LinkedIn
 *     tags: [Resume]
 *     security:
 *       - bearerAuth: []
 */
router.post('/linkedin-import', authenticateToken, requireVerified, catchAsync(async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  
  // In a real app, this would use the LinkedIn API with OAuth.
  // For the MVP, we simulate a successful import.
  const dummyParsedData = {
    personal_info: { name: `${req.user!.firstName} ${req.user!.lastName}` },
    skills: [{ skill: 'React', confidence: 0.9 }, { skill: 'Node.js', confidence: 0.85 }, { skill: 'TypeScript', confidence: 0.95 }],
    experience: [{ company: 'Tech Innovations', role: 'Software Engineer', start_date: '2021', end_date: 'Present' }]
  };

  await db.insert(resumes).values({
    jobSeekerId: userId,
    parsedData: dummyParsedData,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  res.json({
    success: true,
    data: dummyParsedData,
    message: 'LinkedIn profile imported successfully.'
  });
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
router.post('/:id/optimize', authenticateToken, requireVerified, requireOwnership(getResumeOwner), catchAsync(async (req: AuthRequest, res: Response) => {
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

/**
 * @swagger
 * /api/resume/{id}/score:
 *   get:
 *     summary: Compute a structured ATS score for a specific resume
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
 *     responses:
 *       200:
 *         description: ATS score computed successfully
 */
router.get('/:id/score', authenticateToken, requireOwnership(getResumeOwner), catchAsync(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;

  if (!id) {
    throw new AppError('Resume ID is required', 400, 'BAD_REQUEST');
  }

  const [resume] = await db.select().from(resumes).where(eq(resumes.id, id as string)).limit(1);

  if (!resume) {
    throw new AppError('Resume not found', 404, 'NOT_FOUND');
  }
  if (resume.jobSeekerId !== userId) {
    throw new AppError('Unauthorized', 403, 'FORBIDDEN');
  }

  const parsed = resume.parsedData as any;
  if (!parsed) {
    return res.json({
      success: true,
      data: {
        ats_score: 0,
        keyword_match_pct: 0,
        label: 'No Data',
        section_scores: {},
        top_keywords: [],
        improvements: ['Upload and parse your resume to receive an ATS score.']
      }
    });
  }

  // Section presence scoring (each section = points toward 100)
  const sectionWeights = {
    contact:       10,
    summary:       10,
    skills:        25,
    experience:    30,
    education:     15,
    certifications: 10,
  };

  const sectionScores: Record<string, number> = {};
  let totalScore = 0;

  // Contact
  const contact = parsed.contact || {};
  const contactFields = [contact.email, contact.phone, contact.location].filter(Boolean).length;
  sectionScores.contact = Math.round((contactFields / 3) * sectionWeights.contact);
  totalScore += sectionScores.contact;

  // Summary
  const summary = parsed.summary || '';
  sectionScores.summary = summary.length > 30 ? sectionWeights.summary : Math.round((summary.length / 30) * sectionWeights.summary);
  totalScore += sectionScores.summary;

  // Skills
  const skills = Array.isArray(parsed.skills) ? parsed.skills : [];
  const skillCount = skills.length;
  sectionScores.skills = Math.min(sectionWeights.skills, Math.round((skillCount / 8) * sectionWeights.skills));
  totalScore += sectionScores.skills;

  // Experience
  const experience = Array.isArray(parsed.experience) ? parsed.experience : [];
  const expWithDescriptions = experience.filter((e: any) => (e.description || '').length > 50).length;
  sectionScores.experience = experience.length === 0 ? 0
    : Math.round(((0.5 + (expWithDescriptions / Math.max(experience.length, 1)) * 0.5) * sectionWeights.experience));
  totalScore += sectionScores.experience;

  // Education
  const education = Array.isArray(parsed.education) ? parsed.education : [];
  sectionScores.education = education.length > 0 ? sectionWeights.education : 0;
  totalScore += sectionScores.education;

  // Certifications
  const certs = Array.isArray(parsed.certifications) ? parsed.certifications : [];
  sectionScores.certifications = certs.length > 0 ? sectionWeights.certifications : 0;
  totalScore += sectionScores.certifications;

  // Keyword match percentage: ratio of skills to recommended minimum (8)
  const keyword_match_pct = Math.min(100, Math.round((skillCount / 8) * 100));

  // Confidence from AI parsing if available
  const confidenceBonus = typeof parsed.confidence_score === 'number' ? Math.round(parsed.confidence_score * 10) : 0;
  const ats_score = Math.min(100, totalScore + confidenceBonus);

  // Label
  const label = ats_score >= 80 ? 'Strong' : ats_score >= 60 ? 'Good' : 'Needs Work';

  // Improvements list
  const improvements: string[] = [];
  if (!contact.phone) improvements.push('Add a phone number to your contact section.');
  if (!contact.location) improvements.push('Add a location or "Remote" to your contact section.');
  if (summary.length < 30) improvements.push('Write a professional summary (at least 2–3 sentences).');
  if (skillCount < 5) improvements.push('List at least 5–8 key skills to improve keyword matching.');
  if (experience.length === 0) improvements.push('Add work experience entries.');
  else if (expWithDescriptions < experience.length) improvements.push('Add metric-driven descriptions to each work experience entry.');
  if (education.length === 0) improvements.push('Add your education history.');

  // Top keywords = first 8 skills from parsed data
  const top_keywords = skills
    .slice(0, 8)
    .map((s: any) => (typeof s === 'string' ? s : s.skill || ''))
    .filter(Boolean);

  return res.json({
    success: true,
    data: {
      resumeId: id,
      ats_score,
      keyword_match_pct,
      label,
      section_scores: sectionScores,
      top_keywords,
      improvements,
    }
  });
}));

export default router;