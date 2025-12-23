import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import { AuthRepository } from './auth.repository';
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
            throw new AppError('User already exists', 400);
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        const newUser = await this.authRepository.createUser({
            email: data.email,
            passwordHash: hashedPassword,
            role: data.role,
            firstName: data.firstName,
            lastName: data.lastName,
            isVerified: true, // Auto-verify in dev
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
        return { user: newUser, ...tokens };
    }

    async login(data: LoginDTO) {
        const user = await this.authRepository.findUserByEmail(data.email);
        if (!user || !user.passwordHash) {
            throw new AppError('Invalid credentials', 400);
        }

        const validPassword = await bcrypt.compare(data.password, user.passwordHash);
        if (!validPassword) {
            throw new AppError('Invalid credentials', 400);
        }

        await this.authRepository.updateLastLogin(user.id);
        const tokens = this.generateTokens(user);

        return { user, tokens };
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

        const resetToken = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

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
            const decoded = jwt.verify(data.token, JWT_SECRET) as any;
            const user = await this.authRepository.findUserById(decoded.userId);

            if (!user) {
                throw new AppError('Invalid token', 400);
            }

            const hashedPassword = await bcrypt.hash(data.newPassword, 10);
            await this.authRepository.updateUserPassword(user.id, hashedPassword);

            return { message: 'Password reset successful' };
        } catch (err) {
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
        await this.authRepository.updateUser2FASecret(userId, encryptedSecret);

        const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url!);
        return { secret: secret.base32, qrCode: qrCodeUrl };
    }

    async verify2FA(userId: string, data: Verify2FADTO) {
        const user = await this.authRepository.findUserById(userId);
        if (!user || !user.twoFactorSecret) {
            throw new AppError('2FA not set up', 400);
        }

        const decryptedSecret = decrypt(user.twoFactorSecret);
        const verified = speakeasy.totp.verify({
            secret: decryptedSecret,
            encoding: 'base32',
            token: data.code,
        });

        if (!verified) {
            throw new AppError('Invalid code', 400);
        }

        await this.authRepository.updateUser2FAEnabled(userId, true);
        return { message: '2FA enabled' };
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

    async updateProfile(userId: string, userUpdates: UpdateUserProfileDTO, jobSeekerUpdates?: UpdateJobSeekerProfileDTO, recruiterUpdates?: UpdateRecruiterProfileDTO) {
        const user = await this.authRepository.findUserById(userId);
        if (!user) {
            throw new AppError('User not found', 404);
        }

        // Update user table
        if (Object.keys(userUpdates).length > 0) {
            await this.authRepository.updateUserProfile(userId, userUpdates);
        }

        // Update role-specific profile
        if (user.role === 'job_seeker' && jobSeekerUpdates && Object.keys(jobSeekerUpdates).length > 0) {
            await this.authRepository.updateJobSeekerProfile(userId, jobSeekerUpdates);
        } else if (user.role === 'recruiter' && recruiterUpdates && Object.keys(recruiterUpdates).length > 0) {
            await this.authRepository.updateRecruiterProfile(userId, recruiterUpdates);
        }

        return { message: 'Profile updated successfully' };
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
