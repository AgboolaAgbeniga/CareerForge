/**
 * Companies API
 * Handles company creation and management for recruiters
 */

import express, { Request, Response } from 'express';
import { z } from 'zod';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { db } from '../utils/database';
import { companies, recruiters } from '../models/schema';
import { eq } from 'drizzle-orm';
import { AppError } from '../middleware/error';
import { catchAsync } from '../utils/catchAsync';

const router = express.Router();

// Validation schemas
const createCompanySchema = z.object({
    name: z.string().min(1, 'Company name is required'),
    industry: z.string().optional(),
    headquarters: z.string().optional(),
    size: z.string().optional(),
    description: z.string().optional(),
    websiteUrl: z.string().url().optional(),
    logoUrl: z.string().url().optional(),
});

const updateCompanySchema = createCompanySchema.partial();

/**
 * POST /api/companies/create
 * Create a new company (recruiter only)
 */
router.post('/create', authenticateToken, catchAsync(async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const userRole = req.user!.role;

    if (userRole !== 'recruiter') {
        throw new AppError('Only recruiters can create companies', 403, 'FORBIDDEN');
    }

    const data = createCompanySchema.parse(req.body);

    // Create company - filter out undefined values
    const insertData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined)
    );

    const [company] = await db.insert(companies).values(insertData as any).returning();

    res.status(201).json({
        success: true,
        message: 'Company created successfully',
        company
    });
}));

/**
 * GET /api/companies/my
 * Get recruiter's company
 */
router.get('/my', authenticateToken, catchAsync(async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const userRole = req.user!.role;

    if (userRole !== 'recruiter') {
        throw new AppError('Only recruiters can access company information', 403, 'FORBIDDEN');
    }

    // For now, return no company since recruiters are not linked to companies
    res.json({
        success: true,
        company: null,
        message: 'Company association not implemented yet'
    });
}));

/**
 * PUT /api/companies/my
 * Update recruiter's company
 */
router.put('/my', authenticateToken, catchAsync(async (req: AuthRequest, res: Response) => {
    const userId = req.user!.id;
    const userRole = req.user!.role;

    if (userRole !== 'recruiter') {
        throw new AppError('Only recruiters can update company information', 403, 'FORBIDDEN');
    }

    const data = updateCompanySchema.parse(req.body);

    // For now, throw error since company association is not implemented
    throw new AppError('Company update not implemented yet', 501, 'NOT_IMPLEMENTED');
}));

/**
 * GET /api/companies
 * Get all companies (for job listings)
 */
router.get('/', catchAsync(async (req: Request, res: Response) => {
    const allCompanies = await db.select({
        id: companies.id,
        name: companies.name,
        industry: companies.industry,
        logoUrl: companies.logoUrl,
        headquarters: companies.headquarters,
    }).from(companies);

    res.json({
        success: true,
        companies: allCompanies
    });
}));

export default router;