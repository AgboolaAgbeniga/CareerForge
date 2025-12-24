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
    UpdateUserProfileDTO,
    UpdateJobSeekerProfileDTO,
    UpdateRecruiterProfileDTO
} from './auth.dto';
import { encrypt, decrypt } from '../../utils/encryption';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret';

// Email transporter
const createTransporter = () => {
    if (process.env.NODE_ENV !== 'production') {
        return {
            sendMail: async (mailOptions: any) => {
                console.log('📧 [DEV MODE] Email would be sent:');
                console.log('To:', mailOptions.to);
                console.log('Subject:', mailOptions.subject);
                console.log('Text:', mailOptions.text);
                console.log('HTML:', mailOptions.html);
                console.log('---');
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

    async register(data: RegisterDTO) {
        const existingUser = await this.authRepository.findUserByEmail(data.email);
        if (existingUser) {
            logger.warn(`Registration failed: User already exists - ${data.email}`);
            throw new AppError('User already exists', 400);
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = await this.authRepository.createUser({
            email: data.email,
            passwordHash: hashedPassword,
            role: data.role,
            firstName: data.firstName,
            lastName: data.lastName,
            isVerified: false,
        });

        if (!newUser) {
            throw new AppError('Failed to create user', 500);
        }

        if (newUser.role === 'job_seeker') {
            await this.authRepository.createJobSeekerProfile(newUser.id);
        } else {
            await this.authRepository.createRecruiterProfile(newUser.id);
        }

        const tokens = this.generateTokens(newUser);

        // Send verification email
        const verificationToken = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: '24h' });
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: newUser.email,
            subject: 'Verify your email',
            text: `Please verify your email by clicking the link: ${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`,
        });

        logger.info(`User registered successfully: ${newUser.id} (${newUser.email})`);
        return { user: newUser, ...tokens };
    }

    async login(data: LoginDTO) {
        const user = await this.authRepository.findUserByEmail(data.email);
        if (!user || !user.passwordHash) {
            throw new AppError('Invalid credentials', 400);
        }

        const validPassword = await bcrypt.compare(data.password, user.passwordHash);
        if (!validPassword) {
            logger.warn(`Login failed: Invalid password - ${data.email}`);
            throw new AppError('Invalid credentials', 400);
        }

        if (!user.isVerified) {
            logger.warn(`Login failed: Email not verified - ${data.email}`);
            throw new AppError('Please verify your email before logging in', 403);
        }

        await this.authRepository.updateLastLogin(user.id);
        const tokens = this.generateTokens(user);

        logger.info(`User logged in: ${user.id} (${user.email})`);
        return { user, tokens };
    }

    async resendVerification(email: string) {
        const user = await this.authRepository.findUserByEmail(email);
        if (!user) {
            return { message: 'If the account exists, a verification link has been sent' };
        }

        if (user.isVerified) {
            throw new AppError('Email is already verified', 400);
        }

        const verificationToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Verify your email',
            text: `Please verify your email by clicking the link: ${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`,
        });

        return { message: 'Verification link sent' };
    }

    async refresh(refreshToken: string) {
        try {
            const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as any;
            const user = await this.authRepository.findUserById(decoded.userId);

            if (!user) {
                throw new AppError('User not found', 401);
            }

            const accessToken = jwt.sign(
                { userId: user.id, email: user.email, role: user.role },
                JWT_SECRET,
                { expiresIn: '15m' }
            );

            return { accessToken };
        } catch (err) {
            throw new AppError('Invalid refresh token', 401);
        }
    }

    async forgotPassword(data: ForgotPasswordDTO) {
        const user = await this.authRepository.findUserByEmail(data.email);
        if (!user) {
            // Don't reveal if email exists
            return { message: 'If the email exists, a reset link has been sent' };
        }

        const resetToken = jwt.sign({ userId: user.id }, process.env.JWT_RESET_SECRET || JWT_SECRET, { expiresIn: '1h' });

        // Send email
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: data.email,
            subject: 'Password Reset',
            text: `Reset your password: ${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`,
        });

        return { message: 'Reset link sent' };
    }

    async resetPassword(data: ResetPasswordDTO) {
        try {
            const decoded = jwt.verify(data.token, process.env.JWT_RESET_SECRET || JWT_SECRET) as any;
            const user = await this.authRepository.findUserById(decoded.userId);

            if (!user) {
                throw new AppError('Invalid token', 400);
            }

            const hashedPassword = await bcrypt.hash(data.newPassword, 10);
            await this.authRepository.updateUserPassword(user.id, hashedPassword);

            logger.info(`Password reset successful for user: ${user.id}`);
            return { message: 'Password reset successful' };
        } catch (err) {
            logger.error(`Password reset failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
            throw new AppError('Invalid token or input', 400);
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

    async verify2FA(userId: string, data: Verify2FADTO) {
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
                const isMatch = await bcrypt.compare(data.code, backupCodes[i]);
                if (isMatch) {
                    verified = true;
                    // Remove used backup code
                    const remainingCodes = backupCodes.filter((_, index) => index !== i);
                    await this.authRepository.updateUserBackupCodes(userId, remainingCodes);
                    break;
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

    async disable2FA(userId: string, data: Disable2FADTO) {
        const user = await this.authRepository.findUserById(userId);
        if (!user || !user.passwordHash) {
            throw new AppError('User not found', 404);
        }

        // Verify password for security
        const validPassword = await bcrypt.compare(data.password, user.passwordHash);
        if (!validPassword) {
            throw new AppError('Invalid password', 400);
        }

        // If 2FA is enabled, require a code (either TOTP or Backup Code)
        if (user.twoFactorEnabled && data.code) {
            const decryptedSecret = decrypt(user.twoFactorSecret!);
            let verified = speakeasy.totp.verify({
                secret: decryptedSecret,
                encoding: 'base32',
                token: data.code,
            });

            if (!verified && user.backupCodes) {
                const backupCodes = user.backupCodes as string[];
                for (let i = 0; i < backupCodes.length; i++) {
                    if (await bcrypt.compare(data.code, backupCodes[i])) {
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
        await this.authRepository.updateUser2FASecret(userId, null as any); // Clear secret
        await this.authRepository.updateUserBackupCodes(userId, null as any); // Clear backup codes

        logger.info(`2FA disabled for user: ${userId}`);
        return { message: '2FA disabled successfully' };
    }

    async regenerateBackupCodes(userId: string, data: RegenerateBackupCodesDTO) {
        const user = await this.authRepository.findUserById(userId);
        if (!user || !user.passwordHash || !user.twoFactorEnabled) {
            throw new AppError('2FA must be enabled to regenerate backup codes', 400);
        }

        // Verify password
        const validPassword = await bcrypt.compare(data.password, user.passwordHash);
        if (!validPassword) {
            throw new AppError('Invalid password', 400);
        }

        // Generate 10 new backup codes
        const plainBackupCodes = Array.from({ length: 10 }, () =>
            Math.random().toString(36).substring(2, 10).toUpperCase()
        );

        const hashedBackupCodes = await Promise.all(
            plainBackupCodes.map(code => bcrypt.hash(code, 10))
        );

        await this.authRepository.updateUserBackupCodes(userId, hashedBackupCodes);

        return {
            backupCodes: plainBackupCodes
        };
    }

    async adminDisable2FA(adminId: string, targetUserId: string) {
        // Verification of admin role is handled by middleware
        const targetUser = await this.authRepository.findUserById(targetUserId);
        if (!targetUser) {
            throw new AppError('Target user not found', 404);
        }

        await this.authRepository.updateUser2FAEnabled(targetUserId, false);
        await this.authRepository.updateUser2FASecret(targetUserId, null as any);
        await this.authRepository.updateUserBackupCodes(targetUserId, null as any);

        return { message: `2FA disabled for user ${targetUser.email}` };
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
