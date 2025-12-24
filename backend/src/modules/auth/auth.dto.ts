import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    role: z.enum(['job_seeker', 'recruiter']),
    firstName: z.string(),
    lastName: z.string(),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

export const forgotPasswordSchema = z.object({
    email: z.string().email(),
});

export const resetPasswordSchema = z.object({
    token: z.string(),
    newPassword: z.string().min(8),
});

export const verifyEmailSchema = z.object({
    token: z.string(),
});

export const setup2FASchema = z.object({
    code: z.string(),
});

export const verify2FASchema = z.object({
    code: z.string(),
});

export const updateUserProfileSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
});

export const updateJobSeekerProfileSchema = z.object({
    title: z.string().optional(),
    experienceYears: z.number().optional(),
    skills: z.array(z.string()).optional(),
    education: z.string().optional(),
    portfolioUrl: z.string().optional(),
    linkedinUrl: z.string().optional(),
    isProfileVisible: z.boolean().optional(),
});

export const updateRecruiterProfileSchema = z.object({
    companyName: z.string().optional(),
    industry: z.string().optional(),
    companySize: z.string().optional(),
    title: z.string().optional(),
    experienceYears: z.number().optional(),
    specialization: z.string().optional(),
    billingInfo: z.any().optional(),
    subscriptionPlan: z.string().optional(),
});

export interface RegisterDTO {
    email: string;
    password: string;
    role: 'job_seeker' | 'recruiter';
    firstName: string;
    lastName: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface ForgotPasswordDTO {
    email: string;
}

export interface ResetPasswordDTO {
    token: string;
    newPassword: string;
}

export interface VerifyEmailDTO {
    token: string;
}

export interface Setup2FADTO {
    code: string;
}

export interface Verify2FADTO {
    code: string;
}

export type UpdateUserProfileDTO = z.infer<typeof updateUserProfileSchema>;

export type UpdateJobSeekerProfileDTO = z.infer<typeof updateJobSeekerProfileSchema>;

export type UpdateRecruiterProfileDTO = z.infer<typeof updateRecruiterProfileSchema>;
