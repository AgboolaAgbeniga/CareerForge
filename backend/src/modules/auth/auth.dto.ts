import { z } from 'zod';
import { isCommonPassword } from '../../utils/passwordBlacklist';

const passwordSchema = z.string()
    .min(12, 'Password must be at least 12 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
    .refine((password) => !isCommonPassword(password), {
        message: 'This password is too common and easily guessable. Please choose a more unique password.'
    });

export const registerSchema = z.object({
    email: z.string()
        .trim()
        .toLowerCase()
        .min(1, 'Email address is required')
        .email('Please enter a valid email address (e.g. name@company.com)'),
    password: passwordSchema,
    role: z.enum(['job_seeker', 'recruiter'], {
        errorMap: () => ({ message: 'Please select whether you are a Job Seeker or Recruiter' })
    }),
    firstName: z.string()
        .trim()
        .min(1, 'First name is required')
        .max(50, 'First name must be 50 characters or fewer')
        .regex(/^[a-zA-ZÀ-ÿ' -]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
    lastName: z.string()
        .trim()
        .min(1, 'Last name is required')
        .max(50, 'Last name must be 50 characters or fewer')
        .regex(/^[a-zA-ZÀ-ÿ' -]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
});

export const loginSchema = z.object({
    email: z.string()
        .trim()
        .toLowerCase()
        .min(1, 'Email address is required')
        .email('Please enter a valid email address'),
    password: z.string()
        .min(1, 'Password is required'),
});

export const forgotPasswordSchema = z.object({
    email: z.string()
        .trim()
        .toLowerCase()
        .min(1, 'Email address is required')
        .email('Please enter a valid email address'),
});

export const resetPasswordSchema = z.object({
    token: z.string(),
    newPassword: passwordSchema,
});

export const verifyEmailSchema = z.object({
    token: z.string(),
});

export const resendEmailVerificationSchema = z.object({
    email: z.string().email(),
});

export const setup2FASchema = z.object({
    code: z.string(),
});

export const verify2FASchema = z.object({
    code: z.string(),
});

export const disable2FASchema = z.object({
    password: z.string(),
    code: z.string().optional(),
});

export const changePasswordSchema = z.object({
    oldPassword: z.string(),
    newPassword: passwordSchema,
});

export const regenerateBackupCodesSchema = z.object({
    password: z.string(),
});

export const updateUserProfileSchema = z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
});

export const updateJobSeekerProfileSchema = z.object({
    title: z.string().optional(),
    bio: z.string().optional(),
    experienceYears: z.number().optional(),
    skills: z.array(z.string()).optional(),
    education: z.string().optional(),
    experience: z.any().optional(),
    educationHistory: z.any().optional(),
    certifications: z.any().optional(),
    preferences: z.any().optional(),
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

export interface Disable2FADTO {
    password: string;
    code?: string | undefined;
}

export interface ChangePasswordDTO {
    oldPassword: string;
    newPassword: string;
}

export interface RegenerateBackupCodesDTO {
    password: string;
}

export type UpdateUserProfileDTO = z.infer<typeof updateUserProfileSchema>;

export type UpdateJobSeekerProfileDTO = z.infer<typeof updateJobSeekerProfileSchema>;

export type UpdateRecruiterProfileDTO = z.infer<typeof updateRecruiterProfileSchema>;
