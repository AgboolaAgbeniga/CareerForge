import { createClient } from '@supabase/supabase-js';
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

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) throw new Error('FATAL: SUPABASE_URL environment variable is not configured');
if (!supabaseServiceRoleKey) throw new Error('FATAL: SUPABASE_SERVICE_ROLE_KEY environment variable is not configured');

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

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

export class AuthService {
    private authRepository: AuthRepository;

    constructor() {
        this.authRepository = new AuthRepository();
    }

    private async cleanupPartialRegistration(userId: string, role: 'job_seeker' | 'recruiter') {
        const cleanupTasks = [
            supabase.from('users').delete().eq('id', userId),
            role === 'job_seeker'
                ? supabase.from('job_seekers').delete().eq('id', userId)
                : supabase.from('recruiters').delete().eq('id', userId),
        ];

        const results = await Promise.all(cleanupTasks);
        for (const result of results) {
            if (result.error) {
                logger.warn(`Cleanup warning for ${userId}: ${result.error.message}`);
            }
        }
    }

    async register(data: RegisterDTO) {
        logger.info(`🔍 Starting registration for ${data.email} as ${data.role}`);

        let createdAuthUserId: string | null = null;

        // Create user in Supabase Auth
        // In development mode, auto-confirm email so user can log in immediately
        // In production, require email confirmation
        logger.info(`🔐 Calling supabase.auth.admin.createUser()...`);
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
            email: data.email,
            password: data.password,
            email_confirm: process.env.NODE_ENV === 'production' ? false : true,
            user_metadata: {
                firstName: data.firstName,
                lastName: data.lastName,
                role: data.role,
            },
        });

        if (authError) {
            logger.error(`❌ Supabase auth error: ${authError.message}`);
            logger.error(`Full error: ${JSON.stringify(authError)}`);
            logger.error(`Status: ${(authError as any).status}`);
            // Map Supabase errors to user-friendly messages
            let friendlyMessage = 'We couldn\'t create your account. Please try again.';
            if (authError.message?.toLowerCase().includes('already registered') ||
                authError.message?.toLowerCase().includes('already been registered') ||
                authError.message?.toLowerCase().includes('duplicate') ||
                authError.message?.toLowerCase().includes('already exists')) {
                friendlyMessage = 'An account with this email already exists. Please log in or use a different email.';
            } else if (authError.message?.toLowerCase().includes('rate limit')) {
                friendlyMessage = 'Too many sign-up attempts. Please wait a few minutes and try again.';
            } else if (authError.message?.toLowerCase().includes('invalid email')) {
                friendlyMessage = 'Please enter a valid email address.';
            }
            throw new AppError(friendlyMessage, 400, 'REGISTRATION_FAILED');
        }

        if (!authData.user) {
            logger.error(`❌ No user returned from Supabase`);
            throw new AppError('Failed to create user', 400);
        }

        createdAuthUserId = authData.user.id;
        logger.info(`✅ User created in auth: ${authData.user.id}`);
        logger.info(`⏳ Waiting for trigger to sync user to public.users table...`);

        // The Supabase trigger will automatically create the user record in public.users
        // with the metadata we provided during auth user creation
        await new Promise(resolve => setTimeout(resolve, 500));

        logger.info(`✅ Role-specific profile will be created by database trigger`);

        // Send verification email
        try {
            logger.info(`📧 Sending verification email...`);
            const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
                type: 'signup',
                email: data.email,
                password: data.password,
                options: {
                    redirectTo: `${process.env.FRONTEND_URL}/auth/email-verification`,
                },
            });

            if (linkError) {
                logger.warn(`⚠️ Failed to generate verification link: ${linkError.message}`);
            } else if (linkData?.properties?.action_link) {
                const verificationLink = linkData.properties.action_link;

                // Send verification email
                await transporter.sendMail({
                    from: process.env.EMAIL_USER || 'noreply@careerforge.com',
                    to: data.email,
                    subject: 'Verify your CareerForge email',
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                            <h2 style="color: #4f46e5;">Welcome to CareerForge!</h2>
                            <p>Hi ${data.firstName},</p>
                            <p>Thank you for signing up. Please verify your email address by clicking the link below:</p>
                            <p style="margin: 30px 0;">
                                <a href="${verificationLink}" style="background-color: #4f46e5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                                    Verify Email
                                </a>
                            </p>
                            <p>Or copy and paste this link in your browser:</p>
                            <p style="word-break: break-all; color: #666; font-size: 12px;">${verificationLink}</p>
                            <p style="color: #999; font-size: 12px; margin-top: 30px;">
                                If you didn't create this account, please ignore this email.
                            </p>
                        </div>
                    `,
                    text: `Welcome to CareerForge!\n\nPlease verify your email by visiting this link:\n\n${verificationLink}\n\nIf you didn't create this account, please ignore this email.`,
                });

                logger.info(`✅ Verification email sent to ${data.email}`);
            }
        } catch (error) {
            logger.warn(`⚠️ Failed to send verification email: ${error instanceof Error ? error.message : String(error)}`);
            // Don't fail registration if email sending fails - user can request resend
        }

        logger.info(`✅ User registered successfully: ${authData.user.id} (${data.email})`);

        // Return user info and temporary session if available
        // User will need to login or verify email to get full tokens
        return {
            user: {
                id: authData.user.id,
                email: authData.user.email,
                role: data.role,
                firstName: data.firstName,
                lastName: data.lastName,
            },
            accessToken: '',
            refreshToken: '',
            message: 'Registration successful. Please check your email to verify your account.'
        };
    }

    async login(data: LoginDTO) {
        // Authenticate with Supabase
        const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
        });

        if (authError || !authData.user || !authData.session) {
            logger.warn(`Login failed: ${authError?.message || 'Invalid credentials'} - ${data.email}`);
            throw new AppError('Invalid credentials', 401);
        }

        // Get user details from database using Supabase client (handles RLS)
        try {
            const { data: userData, error: userError } = await supabase
                .from('users')
                .select('*')
                .eq('email', data.email)
                .single();

            if (userError || !userData) {
                logger.warn(`User not found in database: ${data.email}`);
                throw new AppError('User not found', 404);
            }

            const user = userData;

            // In development mode, allow unverified login for testing
            // In production, enforce email verification
            if (!user.is_verified && process.env.NODE_ENV === 'production') {
                logger.warn(`Login failed: Email not verified - ${data.email}`);
                throw new AppError('Please verify your email before logging in', 403);
            }

            // If in development and email is not verified, log a warning but allow login
            if (!user.is_verified && process.env.NODE_ENV !== 'production') {
                logger.warn(`⚠️ DEV MODE: Login allowed for unverified email - ${data.email}`);
            }

            // Update last login
            await supabase
                .from('users')
                .update({ last_login_at: new Date().toISOString() })
                .eq('id', user.id);

            logger.info(`User logged in: ${user.id} (${user.email})`);

            // Return user in the format expected by the frontend
            return {
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    isVerified: user.is_verified,
                    phone: user.phone,
                    location: user.location,
                    onboardingCompleted: user.onboarding_completed,
                },
                tokens: {
                    accessToken: authData.session.access_token,
                    refreshToken: authData.session.refresh_token,
                }
            };
        } catch (error) {
            if (error instanceof AppError) throw error;
            logger.error(`Login database error: ${error instanceof Error ? error.message : String(error)}`);
            throw new AppError('Failed to retrieve user details', 500);
        }
    }

    async resendVerification(email: string) {
        const user = await this.authRepository.findUserByEmail(email);
        if (!user) {
            return { message: 'If the account exists, a verification link has been sent' };
        }

        if (user.isVerified) {
            throw new AppError('Email is already verified', 400);
        }

        // Resend verification email via Supabase
        const { error } = await supabase.auth.admin.generateLink({
            type: 'magiclink',
            email: email,
            options: {
                redirectTo: `${process.env.FRONTEND_URL}/verify-email`,
            },
        });

        if (error) {
            logger.warn(`Resend verification email failed: ${error.message}`);
        }

        return { message: 'Verification link sent' };
    }

    async refresh(refreshToken: string) {
        try {
            const { data, error } = await supabase.auth.refreshSession({
                refresh_token: refreshToken,
            });

            if (error || !data.session) {
                throw new AppError('Failed to refresh token', 401);
            }

            return {
                accessToken: data.session.access_token,
                refreshToken: data.session.refresh_token,
            };
        } catch (err) {
            throw new AppError('Invalid refresh token', 401);
        }
    }

    async forgotPassword(data: ForgotPasswordDTO) {
        // Check if user exists
        const user = await this.authRepository.findUserByEmail(data.email);
        if (!user) {
            // Don't reveal if email exists
            return { message: 'If the email exists, a reset link has been sent' };
        }

        // Send password reset email via Supabase
        const { error } = await supabase.auth.admin.generateLink({
            type: 'recovery',
            email: data.email,
            options: {
                redirectTo: `${process.env.FRONTEND_URL}/reset-password`,
            },
        });

        if (error) {
            logger.error(`Password reset email failed: ${error.message}`);
            return { message: 'If the email exists, a reset link has been sent' };
        }

        return { message: 'Reset link sent' };
    }

    async resetPassword(data: ResetPasswordDTO) {
        try {
            // The token here should be handled by Supabase recovery flow
            // Frontend should have received a link with the token from Supabase
            // For password reset, we use the token to update the password directly
            const { error } = await supabase.auth.updateUser(
                { password: data.newPassword }
            );

            if (error) {
                throw new AppError('Failed to reset password', 400);
            }

            logger.info(`Password reset successful`);
            return { message: 'Password reset successful' };
        } catch (err) {
            if (err instanceof AppError) throw err;
            logger.error(`Password reset failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
            throw new AppError('Invalid token or input', 400);
        }
    }

    async changePassword(userId: string, data: ChangePasswordDTO) {
        try {
            // Verify old password by attempting login with current email
            const user = await this.authRepository.findUserById(userId);
            if (!user) {
                throw new AppError('User not found', 404);
            }

            // Verify credentials with Supabase
            const { error: verifyError } = await supabase.auth.signInWithPassword({
                email: user.email,
                password: data.oldPassword,
            });

            if (verifyError) {
                logger.warn(`Password change failed: Invalid old password for user - ${userId}`);
                throw new AppError('Invalid old password', 400);
            }

            // Update password in Supabase
            const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
                password: data.newPassword,
            });

            if (updateError) {
                throw new AppError('Failed to update password', 400);
            }

            logger.info(`Password changed successfully for user: ${userId}`);
            return { message: 'Password changed successfully' };
        } catch (err) {
            if (err instanceof AppError) throw err;
            logger.error(`Password change failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
            throw new AppError('Password change failed', 400);
        }
    }

    async verifyEmail(data: VerifyEmailDTO) {
        try {
            // The token from the verification link is a hash token that Supabase uses
            // After the user clicks the link, Supabase automatically verifies them
            // We just need to check if a user with the given access token exists and verify them in our DB

            // For development/testing: if token looks like a UUID, treat it as user ID
            // For production: the verification happens via Supabase and we just mark as verified

            let userId: string | null = null;

            // Try to get the user via Supabase from the provided token
            const { data: { user: supabaseUser }, error: userError } = await supabase.auth.getUser(data.token);

            if (supabaseUser?.id) {
                userId = supabaseUser.id;
            } else if (data.token.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)) {
                // Token looks like a UUID, treat it as user ID (for development)
                userId = data.token;
            }

            if (!userId) {
                throw new AppError('Invalid token', 400);
            }

            // Find user and mark as verified
            const user = await this.authRepository.findUserById(userId);
            if (!user) {
                throw new AppError('Invalid token', 400);
            }

            await this.authRepository.updateUserVerification(user.id, true);
            logger.info(`✅ Email verified for user: ${user.id}`);
            return { message: 'Email verified successfully' };
        } catch (err) {
            if (err instanceof AppError) throw err;
            logger.error(`Email verification failed: ${err instanceof Error ? err.message : String(err)}`);
            throw new AppError('Invalid token', 400);
        }
    }

    async setup2FA(userId: string) {
        // 2FA via TOTP/backup codes will be available in Phase 4
        throw new AppError('2FA setup is not yet available. Please use Supabase Auth for primary authentication.', 501);
    }

    async verify2FA(userId: string, data: { code: string }) {
        throw new AppError('2FA verification is not yet available. Please use Supabase Auth for primary authentication.', 501);
    }

    async disable2FA(userId: string, data: { password: string; code?: string | undefined }) {
        throw new AppError('2FA is not yet available. Please use Supabase Auth for primary authentication.', 501);
    }

    async regenerateBackupCodes(userId: string, data: { password: string }) {
        throw new AppError('2FA is not yet available. Please use Supabase Auth for primary authentication.', 501);
    }

    async adminDisable2FA(adminId: string, targetUserId: string) {
        throw new AppError('2FA is not yet available. Please use Supabase Auth for primary authentication.', 501);
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

        // Debug log to check if sanitizeText is available
        logger.info(`sanitizeText function available: ${typeof sanitizeText}`);

        // Sanitize user updates
        const sanitizedUserUpdates = { ...userUpdates };
        if (sanitizedUserUpdates.firstName) sanitizedUserUpdates.firstName = sanitizeText(sanitizedUserUpdates.firstName);
        if (sanitizedUserUpdates.lastName) sanitizedUserUpdates.lastName = sanitizeText(sanitizedUserUpdates.lastName);
        if (sanitizedUserUpdates.location) sanitizedUserUpdates.location = sanitizeText(sanitizedUserUpdates.location);

        // Explicit override for onboarding completion
        const explicitOnboardingCompleted = sanitizedUserUpdates.onboardingCompleted;

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

            // Deep merge preferences to prevent JSONB overwrite
            if (sanitizedJobSeekerUpdates.preferences) {
                const existingProfile = await this.authRepository.getJobSeekerProfile(userId);
                const existingPreferences = (existingProfile?.preferences as Record<string, any>) || {};
                sanitizedJobSeekerUpdates.preferences = { ...existingPreferences, ...(sanitizedJobSeekerUpdates.preferences as Record<string, any>) };
            }

            const jobSeekerUpdatesClean = Object.fromEntries(
                Object.entries(sanitizedJobSeekerUpdates)
                    .filter(([_, value]) => value !== undefined)
                    .map(([key, value]) => [key, value ?? null])
            );
            if (Object.keys(jobSeekerUpdatesClean).length > 0) {
                await this.authRepository.updateJobSeekerProfile(userId, jobSeekerUpdatesClean as any);
            }
        } else if (user.role === 'recruiter' && recruiterUpdates && Object.keys(recruiterUpdates).length > 0) {
            const sanitizedRecruiterUpdates = { ...recruiterUpdates };
            if (sanitizedRecruiterUpdates.companyName) sanitizedRecruiterUpdates.companyName = sanitizeText(sanitizedRecruiterUpdates.companyName);
            if (sanitizedRecruiterUpdates.title) sanitizedRecruiterUpdates.title = sanitizeText(sanitizedRecruiterUpdates.title);
            if (sanitizedRecruiterUpdates.industry) sanitizedRecruiterUpdates.industry = sanitizeText(sanitizedRecruiterUpdates.industry);

            // Deep merge billingInfo to prevent JSONB overwrite
            if (sanitizedRecruiterUpdates.billingInfo) {
                const existingProfile = await this.authRepository.getRecruiterProfile(userId);
                const existingBillingInfo = (existingProfile?.billingInfo as Record<string, any>) || {};
                sanitizedRecruiterUpdates.billingInfo = { ...existingBillingInfo, ...(sanitizedRecruiterUpdates.billingInfo as Record<string, any>) };
            }

            const recruiterUpdatesClean = Object.fromEntries(
                Object.entries(sanitizedRecruiterUpdates)
                    .filter(([_, value]) => value !== undefined)
                    .map(([key, value]) => [key, value ?? null])
            );
            if (Object.keys(recruiterUpdatesClean).length > 0) {
                await this.authRepository.updateRecruiterProfile(userId, recruiterUpdatesClean as any);
            }
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
                // NOTE: jsProfile.education (legacy text) deliberately excluded —
                // the frontend only ever writes educationHistory (JSONB)
                jsProfile.educationHistory && (jsProfile.educationHistory as any[]).length > 0 ? 'educationHistory' : null,
                jsProfile.experience && (jsProfile.experience as any[]).length > 0 ? 'experience' : null,
                jsProfile.bio,
                jsProfile.certifications && (jsProfile.certifications as any[]).length > 0 ? 'certifications' : null,
                jsProfile.resumeFileUrl,
                jsProfile.skills && jsProfile.skills.length > 0 ? 'skills' : null
            ];

            const filledFields = fields.filter(f => f !== null && f !== undefined && f !== '').length;
            completionPercentage = Math.round((filledFields / fields.length) * 100);

            await this.authRepository.updateJobSeekerProfile(userId, {
                profileCompletionPercentage: completionPercentage
            });

            // Auto-complete onboarding if >= 80% and resume exists, OR if explicitly requested
            if (explicitOnboardingCompleted === true || (completionPercentage >= 80 && jsProfile.resumeFileUrl)) {
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

            if (explicitOnboardingCompleted === true || completionPercentage >= 80) {
                await this.authRepository.updateUserOnboarding(userId, true);
            }
        }

        return {
            message: 'Profile updated successfully',
            completionPercentage,
            onboardingCompleted: explicitOnboardingCompleted === true || completionPercentage >= 80
        };
    }

}
