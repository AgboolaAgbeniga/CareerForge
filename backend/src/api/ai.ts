import express from 'express';
import { z } from 'zod';
import { aiService } from '../services/aiService';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import multer from 'multer';

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    // Allow PDF, DOC, DOCX files
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and Word documents are allowed.'));
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
  jobId: z.number(),
  resumeId: z.number(),
});

const analyzeSkillGapsSchema = z.object({
  targetRoles: z.array(z.string()).min(1),
});

const getHiringSuggestionsSchema = z.object({
  jobDraft: z.record(z.any()),
});

const analyzeResumeSchema = z.object({
  candidateId: z.number(),
  jobId: z.number().optional(),
});

/**
 * @swagger
 * /api/ai/health:
 *   get:
 *     summary: Check AI services health
 *     tags: [AI]
 *     responses:
 *       200:
 *         description: AI services health status
 */
router.get('/health', async (req, res) => {
  try {
    const healthStatus = await aiService.healthCheck();
    const allHealthy = Object.values(healthStatus).every(status => status);

    res.json({
      status: allHealthy ? 'healthy' : 'degraded',
      services: healthStatus,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('AI health check error:', error);
    res.status(500).json({
      status: 'unhealthy',
      error: 'Failed to check AI services health',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
  }
});

/**
 * @swagger
 * /api/ai/resume/parse:
 *   post:
 *     summary: Parse resume text with AI
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *             properties:
 *               text:
 *                 type: string
 *     responses:
 *       200:
 *         description: Resume parsed successfully
 */
router.post('/resume/parse', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { text } = parseResumeSchema.parse(req.body);
    const result = await aiService.parseResume(text);

    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Resume parsing error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to parse resume',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
    return;
  }
});

/**
 * @swagger
 * /api/ai/resume/parse-file:
 *   post:
 *     summary: Parse resume file with AI
 *     tags: [AI]
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
 *     responses:
 *       200:
 *         description: Resume file parsed successfully
 */
router.post('/resume/parse-file', authenticateToken, upload.single('file'), async (req: AuthRequest, res): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({
        success: false,
        error: 'No file uploaded',
      });
      return;
    }

    const result = await aiService.parseResumeFile(req.file.buffer, req.file.originalname);

    res.json({
      success: true,
      data: result,
      filename: req.file.originalname,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Resume file parsing error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to parse resume file',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
    return;
  }
});

/**
 * @swagger
 * /api/ai/resume/optimize:
 *   post:
 *     summary: Optimize resume for job application
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - resumeData
 *               - jobRequirements
 *             properties:
 *               resumeData:
 *                 type: object
 *               jobRequirements:
 *                 type: object
 *     responses:
 *       200:
 *         description: Resume optimized successfully
 */
router.post('/resume/optimize', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { resumeData, jobRequirements } = optimizeResumeSchema.parse(req.body);
    const result = await aiService.optimizeResume(resumeData, jobRequirements);

    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Resume optimization error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to optimize resume',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
    return;
  }
});

/**
 * @swagger
 * /api/ai/matching/job/{jobSeekerId}:
 *   get:
 *     summary: Get job matches for job seeker
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobSeekerId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Job seeker ID
 *     responses:
 *       200:
 *         description: Job matches retrieved successfully
 */
router.get('/matching/job/:jobSeekerId', authenticateToken, async (req: AuthRequest, res): Promise<void> => {
  try {
    const jobSeekerIdParam = req.params.jobSeekerId;
    if (!jobSeekerIdParam) {
      res.status(400).json({
        success: false,
        error: 'Job seeker ID is required',
      });
      return;
    }
    const jobSeekerId = parseInt(jobSeekerIdParam);
    const matches = await aiService.findJobMatches(jobSeekerId);

    res.json({
      success: true,
      data: matches,
      count: matches.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Job matching error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to find job matches',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
    return;
  }
});

/**
 * @swagger
 * /api/ai/matching/candidates/{jobId}:
 *   get:
 *     summary: Get candidate matches for job
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: jobId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Job ID
 *     responses:
 *       200:
 *         description: Candidate matches retrieved successfully
 */
router.get('/matching/candidates/:jobId', authenticateToken, async (req: AuthRequest, res): Promise<void> => {
  try {
    const jobIdParam = req.params.jobId;
    if (!jobIdParam) {
      res.status(400).json({
        success: false,
        error: 'Job ID is required',
      });
      return;
    }
    const jobId = parseInt(jobIdParam);
    const candidates = await aiService.matchCandidates(jobId);

    res.json({
      success: true,
      data: candidates,
      count: candidates.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Candidate matching error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to find candidate matches',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
    return;
  }
});

/**
 * @swagger
 * /api/ai/career/advice:
 *   post:
 *     summary: Get career advice
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - context
 *             properties:
 *               context:
 *                 type: string
 *     responses:
 *       200:
 *         description: Career advice generated successfully
 */
router.post('/career/advice', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { context } = getAdviceSchema.parse(req.body);
    const userId = parseInt(req.user!.id);
    const advice = await aiService.getCareerAdvice(userId, context);

    res.json({
      success: true,
      data: advice,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Career advice error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate career advice',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
    return;
  }
});

/**
 * @swagger
 * /api/ai/career/linkedin-optimize:
 *   post:
 *     summary: Optimize LinkedIn profile
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentHeadline
 *               - targetRole
 *             properties:
 *               currentHeadline:
 *                 type: string
 *               targetRole:
 *                 type: string
 *     responses:
 *       200:
 *         description: LinkedIn profile optimized successfully
 */
router.post('/career/linkedin-optimize', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { currentHeadline, targetRole } = optimizeLinkedInSchema.parse(req.body);
    const result = await aiService.optimizeLinkedInProfile(currentHeadline, targetRole);

    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('LinkedIn optimization error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to optimize LinkedIn profile',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
    return;
  }
});

/**
 * @swagger
 * /api/ai/career/cover-letter:
 *   post:
 *     summary: Generate cover letter
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - jobId
 *               - resumeId
 *             properties:
 *               jobId:
 *                 type: integer
 *               resumeId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Cover letter generated successfully
 */
router.post('/career/cover-letter', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { jobId, resumeId } = generateCoverLetterSchema.parse(req.body);
    const result = await aiService.generateCoverLetter(jobId, resumeId);

    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Cover letter generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate cover letter',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
    return;
  }
});

/**
 * @swagger
 * /api/ai/career/skill-gaps:
 *   get:
 *     summary: Analyze skill gaps
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: roles
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         description: Target roles to analyze
 *     responses:
 *       200:
 *         description: Skill gaps analyzed successfully
 */
router.get('/career/skill-gaps', authenticateToken, async (req: AuthRequest, res): Promise<void> => {
  try {
    const roles = req.query.roles as string[];
    if (!roles || !Array.isArray(roles) || roles.length === 0) {
      res.status(400).json({
        success: false,
        error: 'Roles parameter is required and must be an array',
      });
      return;
    }

    const userId = parseInt(req.user!.id);
    const result = await aiService.analyzeSkillGaps(userId, roles);

    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Skill gap analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze skill gaps',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
    return;
  }
});

/**
 * @swagger
 * /api/ai/hiring/suggestions:
 *   post:
 *     summary: Get hiring suggestions for job post
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - jobDraft
 *             properties:
 *               jobDraft:
 *                 type: object
 *     responses:
 *       200:
 *         description: Hiring suggestions generated successfully
 */
router.post('/hiring/suggestions', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { jobDraft } = getHiringSuggestionsSchema.parse(req.body);
    const result = await aiService.getHiringSuggestions(jobDraft);

    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Hiring suggestions error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate hiring suggestions',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
    return;
  }
});

/**
 * @swagger
 * /api/ai/recruiter/analyze/{candidateId}:
 *   get:
 *     summary: Analyze resume for recruiter
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: candidateId
 *         required: true
 *         schema:
 *           type: integer
 *         description: Candidate ID
 *       - in: query
 *         name: jobId
 *         schema:
 *           type: integer
 *         description: Job ID for comparison
 *     responses:
 *       200:
 *         description: Resume analyzed successfully
 */
router.get('/recruiter/analyze/:candidateId', authenticateToken, async (req: AuthRequest, res): Promise<void> => {
  try {
    const candidateIdParam = req.params.candidateId;
    if (!candidateIdParam) {
      res.status(400).json({
        success: false,
        error: 'Candidate ID is required',
      });
      return;
    }
    const candidateId = parseInt(candidateIdParam);
    const jobId = req.query.jobId ? parseInt(req.query.jobId as string) : undefined;

    const result = await aiService.analyzeResumeForRecruiter(candidateId, jobId);

    res.json({
      success: true,
      data: result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Resume analysis error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to analyze resume',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
    return;
  }
});

export default router;