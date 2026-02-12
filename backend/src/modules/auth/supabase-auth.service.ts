import { supabase } from '../../utils/database';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import { AuthRepository } from './auth.repository';
import logger from '../../utils/logger';
import { AppError } from '../../middleware/error';
import {
    RegisterDTO,
    LoginDTO,
    ForgotPasswordDTO,
    ResetPasswordDTO,
    VerifyEmailDTO,
    Setup2FADTO,
    Verify2FADTO,
    Disable2FADTO,
    RegenerateBackupCodesDTO,
    ChangePasswordDTO,
    UpdateUserProfileDTO,
    UpdateJobSeekerProfileDTO,
    UpdateRecruiterProfileDTO
} from './auth.dto';
import { encrypt, decrypt } from '../../utils/encryption';
import { sanitizeText } from '../../utils/sanitizer';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';

// Email transporter
const createTransporter = () => {
    if (process.env.NODE_ENV !== 'production') {
        return {
            sendMail: async (mailOptions: any) => {
                logger.info('📧 [DEV MODE] Email would be sent:');
                logger.info(`To: ${mailOptions.to}`);
                logger.info(`Subject: ${mailOptions.subject}`);
                logger.info(`Text: ${mailOptions.text}`);
                logger.info(`HTML: ${mailOptions.html}`);
                logger.info('---');
                return { messageId: 'dev-mode-' + Date.now() };
            }
        };
    }

    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
};

const transporter = createTransporter();

export class SupabaseAuthService {
    private authRepository: AuthRepository;

    constructor() {
        this.authRepository = new AuthRepository();
    }

    private getSupabaseClient() {
        if (!supabase) {
            logger.error('Supabase client not configured');
            throw new AppError('Authentication service unavailable', 500, 'SUPABASE_NOT_CONFIGURED');
        }
        return supabase;
    }

    async register(data: RegisterDTO) {
        // Check if user already exists in our custom users table
        const existingUser = await this.authRepository.findUserByEmail(data.email);
        if (existingUser) {
            logger.warn(`Registration failed: User already exists - ${data.email}`);
            throw new AppError('User already exists', 400);
        }

        try {
            // Create user in Supabase Auth
            const { data: supabaseUser, error: supabaseError } = await this.getSupabaseClient().auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                    data: {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        role: data.role
                    }
                }
            });

            if (supabaseError) {
                throw new AppError(supabaseError.message, 400);
            }

            if (!supabaseUser.user) {
                throw new AppError('Failed to create user', 500);
            }

            // Create user profile in our custom users table
            const newUser = await this.authRepository.createUser({
                id: supabaseUser.user.id, // Use Supabase user ID
                email: data.email,
                passwordHash: null, // Password is managed by Supabase
                role: data.role,
                firstName: data.firstName,
                lastName: data.lastName,
                isVerified: supabaseUser.user.email_confirmed_at ? true : false,
            });

            if (!newUser) {
                throw new AppError('Failed to create user profile', 500);
            }

            // Create role-specific profile
            if (newUser.role === 'job_seeker') {
                await this.authRepository.createJobSeekerProfile(newUser.id);
            } else {
                await this.authRepository.createRecruiterProfile(newUser.id);
            }

            const tokens = this.generateTokens(newUser);

            // If email confirmation is required, send verification email
            if (!supabaseUser.user.email_confirmed_at) {
                const verificationToken = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '24h' });
                await transporter.sendMail({
                    from: process.env.EMAIL_USER,
                    to: newUser.email,
                    subject: 'Verify your email',
                    text: `Please verify your email by clicking the link: ${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`,
                });
            }

            logger.info(`User registered successfully: ${newUser.id} (${newUser.email})`);
            return { user: newUser, accessToken: supabaseUser.session?.access_token || tokens.accessToken, refreshToken: supabaseUser.session?.refresh_token || tokens.refreshToken };
        } catch (error) {
            logger.error(`Registration failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw error;
        }
    }

    async login(data: LoginDTO) {
        try {
            // Authenticate with Supabase
            const { data: supabaseUser, error: supabaseError } = await this.getSupabaseClient().auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });

            if (supabaseError) {
                throw new AppError('Invalid credentials', 400);
            }

            if (!supabaseUser.user) {
                throw new AppError('Invalid credentials', 400);
            }

            // Get user profile from our custom table
            const user = await this.authRepository.findUserById(supabaseUser.user.id);
            if (!user) {
                throw new AppError('User profile not found', 404);
            }

            // Check if email is verified (Supabase handles this, but we can also check our table)
            if (!user.isVerified && supabaseUser.user.email_confirmed_at) {
                await this.authRepository.updateUserVerification(user.id, true);
                user.isVerified = true;
            }

            if (!user.isVerified) {
                logger.warn(`Login failed: Email not verified - ${data.email}`);
                throw new AppError('Please verify your email before logging in', 403);
            }

            await this.authRepository.updateLastLogin(user.id);

            logger.info(`User logged in: ${user.id} (${user.email})`);
            return {
                user,
                tokens: {
                    accessToken: supabaseUser.session?.access_token || '',
                    refreshToken: supabaseUser.session?.refresh_token || ''
                }
            };
        } catch (error) {
            logger.error(`Login failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
            throw error;
        }
    }

    async logout() {
        try {
            const { error } = await this.getSupabaseClient().auth.signOut();
            if (error) {
                throw new AppError(error.message, 400);
            }
            return { message: 'Logout successful' };
        } catch (error) {
            throw new AppError('Logout failed', 400);
        }
    }

    async refresh(refreshToken: string) {
        try {
            const { data, error } = await this.getSupabaseClient().auth.refreshSession({
                refresh_token: refreshToken
            });

            if (error) {
                throw new AppError('Invalid refresh token', 401);
            }

            return {
                accessToken: data.session?.access_token || '',
                refreshToken: data.session?.refresh_token || refreshToken
            };
        } catch (error) {
            throw new AppError('Invalid refresh token', 401);
        }
    }

    async forgotPassword(data: ForgotPasswordDTO) {
        try {
            const { error } = await this.getSupabaseClient().auth.resetPasswordForEmail(data.email, {
                redirectTo: `${process.env.FRONTEND_URL}/reset-password`,
            });

            if (error) {
                // Don't reveal if email exists
                return { message: 'If the email exists, a reset link has been sent' };
            }

            return { message: 'Reset link sent' };
        } catch (error) {
            return { message: 'If the email exists, a reset link has been sent' };
        }
    }

    async resetPassword(data: ResetPasswordDTO) {
        try {
            const { error } = await this.getSupabaseClient().auth.updateUser({
                password: data.newPassword
            });

            if (error) {
                throw new AppError('Password reset failed', 400);
            }

            logger.info(`Password reset successful`);
            return { message: 'Password reset successful' };
        } catch (error) {
            throw new AppError('Password reset failed', 400);
        }
    }

    async verifyEmail(data: VerifyEmailDTO) {
        try {
            const decoded = jwt.verify(data.token, JWT_SECRET) as any;
            const user = await this.authRepository.findUserById(decoded.userId);

            if (!user) {
                throw new AppError('Invalid token', 400);
            }

            await this.authRepository.updateUserVerification(user.id, true);
            return { message: 'Email verified' };
        } catch (err) {
            throw new AppError('Invalid token', 400);
        }
    }

    async resendVerification(email: string) {
        try {
            const { error } = await this.getSupabaseClient().auth.resend({
                type: 'signup',
                email: email,
                options: {
                    emailRedirectTo: `${process.env.FRONTEND_URL}/verify-email`
                }
            });

            if (error) {
                return { message: 'If the account exists, a verification link has been sent' };
            }

            return { message: 'Verification link sent' };
        } catch (error) {
            return { message: 'If the account exists, a verification link has been sent' };
        }
    }

    // Keep all the existing 2FA and profile management methods
    async setup2FA(userId: string) {
        const secret = speakeasy.generateSecret({ name: 'CareerForge', issuer: 'CareerForge' });
        const encryptedSecret = encrypt(secret.base32);

        // Generate 10 backup codes
        const plainBackupCodes = Array.from({ length: 10 }, () =>
            Math.random().toString(36).substring(2, 10).toUpperCase()
        );

        // Hash backup codes before storing
        const hashedBackupCodes = await Promise.all(
            plainBackupCodes.map(code => bcrypt.hash(code, 10))
        );

        await this.authRepository.updateUser2FASecret(userId, encryptedSecret);
        await this.authRepository.updateUserBackupCodes(userId, hashedBackupCodes);

        const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url!);
        return {
            secret: secret.base32,
            qrCode: qrCodeUrl,
            backupCodes: plainBackupCodes // User must save these
        };
    }

    async verify2FA(userId: string, data: { code: string }) {
        const user = await this.authRepository.findUserById(userId);
        if (!user || !user.twoFactorSecret) {
            throw new AppError('2FA not set up', 400);
        }

        let verified = false;

        // 1. Try TOTP verification
        const decryptedSecret = decrypt(user.twoFactorSecret);
        verified = speakeasy.totp.verify({
            secret: decryptedSecret,
            encoding: 'base32',
            token: data.code,
        });

        // 2. If TOTP fails, try backup codes
        if (!verified && user.backupCodes) {
            const backupCodes = user.backupCodes as string[];
            for (let i = 0; i < backupCodes.length; i++) {
                const backupCode = backupCodes[i];
                if (backupCode !== undefined) {
                    const isMatch = await bcrypt.compare(data.code, backupCode);
                    if (isMatch) {
                        verified = true;
                        // Remove used backup code
                        const remainingCodes = backupCodes.filter((_, index) => index !== i);
                        await this.authRepository.updateUserBackupCodes(userId, remainingCodes);
                        break;
                    }
                }
            }
        }

        if (!verified) {
            logger.warn(`2FA verification failed for user: ${userId}`);
            throw new AppError('Invalid code', 400);
        }

        await this.authRepository.updateUser2FAEnabled(userId, true);
        logger.info(`2FA enabled for user: ${userId}`);
        return { message: '2FA verified successfully' };
    }

    async disable2FA(userId: string, data: { password: string; code?: string | undefined }) {
        const user = await this.authRepository.findUserById(userId);
        if (!user) {
            throw new AppError('User not found', 404);
        }

        // Verify password using Supabase
        const { error: verifyError } = await this.getSupabaseClient().auth.signInWithPassword({
            email: user.email,
            password: data.password
        });

        if (verifyError) {
            throw new AppError('Invalid password', 400);
        }

        // If 2FA is enabled, require a code (either TOTP or Backup Code)
        if (user.twoFactorEnabled && data.code) {
            const code = data.code;
            const decryptedSecret = decrypt(user.twoFactorSecret!);
            let verified = speakeasy.totp.verify({
                secret: decryptedSecret,
                encoding: 'base32',
                token: code,
            });

            if (!verified && user.backupCodes) {
                const backupCodes = user.backupCodes as string[];
                for (let i = 0; i < backupCodes.length; i++) {
                    const backupCode = backupCodes[i];
                    if (backupCode !== undefined && await bcrypt.compare(code, backupCode)) {
                        verified = true;
                        break;
                    }
                }
            }

            if (!verified) {
                throw new AppError('Invalid 2FA code', 400);
            }
        }

        await this.authRepository.updateUser2FAEnabled(userId, false);
        await this.authRepository.updateUser2FASecret(userId, null as any);
        await this.authRepository.updateUserBackupCodes(userId, null as any);

        logger.info(`2FA disabled for user: ${userId}`);
        return { message: '2FA disabled successfully' };
    }

    async changePassword(userId: string, data: ChangePasswordDTO) {
        const user = await this.authRepository.findUserById(userId);
        if (!user) {
            throw new AppError('User not found', 404);
        }

        // Verify old password using Supabase
        const { error: verifyError } = await this.getSupabaseClient().auth.signInWithPassword({
            email: user.email,
            password: data.oldPassword
        });

        if (verifyError) {
            throw new AppError('Invalid old password', 400);
        }

        // Update password in Supabase
        const { error: updateError } = await this.getSupabaseClient().auth.updateUser({
            password: data.newPassword
        });

        if (updateError) {
            throw new AppError('Password update failed', 400);
        }

        logger.info(`Password changed successfully for user: ${userId}`);
        return { message: 'Password changed successfully' };
    }

    async getProfile(userId: string) {
        const user = await this.authRepository.findUserById(userId);
        if (!user) {
            throw new AppError('User not found', 404);
        }

        let profile = null;
        if (user.role === 'job_seeker') {
            profile = await this.authRepository.getJobSeekerProfile(userId);
        } else if (user.role === 'recruiter') {
            profile = await this.authRepository.getRecruiterProfile(userId);
        }

        return { user, profile };
    }

    async updateProfile(
        userId: string,
        userUpdates: UpdateUserProfileDTO,
        jobSeekerUpdates?: UpdateJobSeekerProfileDTO,
        recruiterUpdates?: UpdateRecruiterProfileDTO
    ) {
        const user = await this.authRepository.findUserById(userId);
        if (!user) {
            throw new AppError('User not found', 404);
        }

        // Sanitize user updates
        const sanitizedUserUpdates = { ...userUpdates };
        if (sanitizedUserUpdates.firstName) sanitizedUserUpdates.firstName = sanitizeText(sanitizedUserUpdates.firstName);
        if (sanitizedUserUpdates.lastName) sanitizedUserUpdates.lastName = sanitizeText(sanitizedUserUpdates.lastName);
        if (sanitizedUserUpdates.location) sanitizedUserUpdates.location = sanitizeText(sanitizedUserUpdates.location);

        // Update user table
        if (Object.keys(sanitizedUserUpdates).length > 0) {
            const userUpdatesWithNull = Object.fromEntries(
                Object.entries(sanitizedUserUpdates).map(([key, value]) => [key, value ?? null])
            );
            await this.authRepository.updateUserProfile(userId, userUpdatesWithNull as any);
        }

        // Update role-specific profile
        if (user.role === 'job_seeker' && jobSeekerUpdates && Object.keys(jobSeekerUpdates).length > 0) {
            const sanitizedJobSeekerUpdates = { ...jobSeekerUpdates };
            if (sanitizedJobSeekerUpdates.title) sanitizedJobSeekerUpdates.title = sanitizeText(sanitizedJobSeekerUpdates.title);
            if (sanitizedJobSeekerUpdates.education) sanitizedJobSeekerUpdates.education = sanitizeText(sanitizedJobSeekerUpdates.education);

            const jobSeekerUpdatesWithNull = Object.fromEntries(
                Object.entries(sanitizedJobSeekerUpdates).map(([key, value]) => [key, value ?? null])
            );
            await this.authRepository.updateJobSeekerProfile(userId, jobSeekerUpdatesWithNull as any);
        } else if (user.role === 'recruiter' && recruiterUpdates && Object.keys(recruiterUpdates).length > 0) {
            const sanitizedRecruiterUpdates = { ...recruiterUpdates };
            if (sanitizedRecruiterUpdates.companyName) sanitizedRecruiterUpdates.companyName = sanitizeText(sanitizedRecruiterUpdates.companyName);
            if (sanitizedRecruiterUpdates.title) sanitizedRecruiterUpdates.title = sanitizeText(sanitizedRecruiterUpdates.title);
            if (sanitizedRecruiterUpdates.industry) sanitizedRecruiterUpdates.industry = sanitizeText(sanitizedRecruiterUpdates.industry);

            const recruiterUpdatesWithNull = Object.fromEntries(
                Object.entries(sanitizedRecruiterUpdates).map(([key, value]) => [key, value ?? null])
            );
            await this.authRepository.updateRecruiterProfile(userId, recruiterUpdatesWithNull as any);
        }

        // Calculate profile completeness and trigger onboarding completion
        const { user: updatedUser, profile } = await this.getProfile(userId);
        let completionPercentage = 0;

        if (updatedUser.role === 'job_seeker' && profile) {
            const jsProfile = profile as any;
            const fields = [
                updatedUser.firstName,
                updatedUser.lastName,
                updatedUser.phone,
                updatedUser.location,
                jsProfile.title,
                jsProfile.experienceYears,
                jsProfile.education,
                jsProfile.resumeFileUrl,
                jsProfile.skills && jsProfile.skills.length > 0 ? 'skills' : null
            ];

            const filledFields = fields.filter(f => f !== null && f !== undefined && f !== '').length;
            completionPercentage = Math.round((filledFields / fields.length) * 100);

            await this.authRepository.updateJobSeekerProfile(userId, {
                profileCompletionPercentage: completionPercentage
            });

            // Auto-complete onboarding if >= 80% and resume exists
            if (completionPercentage >= 80 && jsProfile.resumeFileUrl) {
                await this.authRepository.updateUserOnboarding(userId, true);
            }
        } else if (updatedUser.role === 'recruiter' && profile) {
            const rProfile = profile as any;
            const fields = [
                updatedUser.firstName,
                updatedUser.lastName,
                updatedUser.phone,
                updatedUser.location,
                rProfile.companyName,
                rProfile.title,
                rProfile.industry
            ];
            const filledFields = fields.filter(f => f !== null && f !== undefined && f !== '').length;
            completionPercentage = Math.round((filledFields / fields.length) * 100);

            if (completionPercentage >= 80) {
                await this.authRepository.updateUserOnboarding(userId, true);
            }
        }

        return {
            message: 'Profile updated successfully',
            completionPercentage,
            onboardingCompleted: completionPercentage >= 80
        };
    }

    private generateTokens(user: any) {
        const accessToken = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            { userId: user.id },
            JWT_REFRESH_SECRET,
            { expiresIn: '7d' }
        );

        return { accessToken, refreshToken };
    }
}