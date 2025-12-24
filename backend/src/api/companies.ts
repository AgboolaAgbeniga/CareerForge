/**
 * Companies API
 * Handles company creation and management for recruiters
 */

import express, { Response } from 'express';
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

    // Check if recruiter already has a company
    const [existingRecruiter] = await db.select().from(recruiters).where(eq(recruiters.id, userId)).limit(1);
    if (existingRecruiter?.companyId) {
        throw new AppError('You already have a company associated with your account', 400, 'ALREADY_EXISTS');
    }

    const [company] = await db.insert(companies).values(data).returning();

    // Link company to recruiter
    await db.update(recruiters).set({ companyId: company.id }).where(eq(recruiters.id, userId));

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

    const [recruiter] = await db.select({ companyId: recruiters.companyId }).from(recruiters).where(eq(recruiters.id, userId)).limit(1);

    if (!recruiter?.companyId) {
        return res.json({
            success: true,
            company: null,
            message: 'No company associated with your account'
        });
    }

    const [company] = await db.select().from(companies).where(eq(companies.id, recruiter.companyId)).limit(1);

    if (!company) {
        return res.json({
            success: true,
            company: null,
            message: 'Company not found'
        });
    }

    res.json({
        success: true,
        company
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

    const [recruiter] = await db.select({ companyId: recruiters.companyId }).from(recruiters).where(eq(recruiters.id, userId)).limit(1);

    if (!recruiter?.companyId) {
        throw new AppError('No company associated with your account', 404, 'NOT_FOUND');
    }

    const [updatedCompany] = await db.update(companies)
        .set(data)
        .where(eq(companies.id, recruiter.companyId))
        .returning();

    res.json({
        success: true,
        message: 'Company updated successfully',
        company: updatedCompany
    });
}));

/**
 * GET /api/companies
 * Get all companies (for job listings)
 */
router.get('/', catchAsync(async (req, res: Response) => {
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