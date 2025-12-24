import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { AppError } from '../../middleware/error';
import { catchAsync } from '../../utils/catchAsync';
import { authenticateToken, AuthRequest } from '../../middleware/auth';
import {
    registerSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    verifyEmailSchema,
    resendEmailVerificationSchema,
    setup2FASchema,
    verify2FASchema,
    updateUserProfileSchema,
    updateJobSeekerProfileSchema,
    updateRecruiterProfileSchema,
    UpdateUserProfileDTO
} from './auth.dto';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    /**
     * @swagger
     * /api/auth/register:
     *   post:
     *     summary: Register a new user
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required: [email, password, firstName, lastName, role]
     *             properties:
     *               email: { type: string, format: email }
     *               password: { type: string, minLength: 12 }
     *               firstName: { type: string }
     *               lastName: { type: string }
     *               role: { type: string, enum: [job_seeker, recruiter] }
     *     responses:
     *       201:
     *         description: User registered successfully
     *       400:
     *         description: Invalid input or user already exists
     */
    register = catchAsync(async (req: Request, res: Response) => {
        const data = registerSchema.parse(req.body);
        const { user, accessToken, refreshToken } = await this.authService.register(data);

        this.setCookies(res, accessToken, refreshToken);
        res.status(201).json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            }
        });
    });

    /**
     * @swagger
     * /api/auth/login:
     *   post:
     *     summary: Login user
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required: [email, password]
     *             properties:
     *               email: { type: string, format: email }
     *               password: { type: string }
     *               twoFactorToken: { type: string }
     *     responses:
     *       200:
     *         description: Login successful
     *       401:
     *         description: Invalid credentials
     *       403:
     *         description: Email not verified or 2FA required
     */
    login = catchAsync(async (req: Request, res: Response) => {
        const data = loginSchema.parse(req.body);
        const { user, tokens } = await this.authService.login(data);

        this.setCookies(res, tokens.accessToken, tokens.refreshToken);
        res.json({
            success: true,
            data: {
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    onboardingCompleted: user.onboardingCompleted
                }
            }
        });
    });

    /**
     * @swagger
     * /api/auth/refresh:
     *   post:
     *     summary: Refresh access token
     *     tags: [Auth]
     *     responses:
     *       200:
     *         description: Token refreshed
     *       401:
     *         description: Refresh token missing or invalid
     */
    refresh = catchAsync(async (req: Request, res: Response) => {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            throw new AppError('Refresh token required', 401, 'UNAUTHORIZED');
        }

        const { accessToken } = await this.authService.refresh(refreshToken);

        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000
        });

        res.json({ success: true, message: 'Token refreshed' });
    });

    /**
     * @swagger
     * /api/auth/logout:
     *   post:
     *     summary: Logout user
     *     tags: [Auth]
     *     responses:
     *       200:
     *         description: Logout successful
     */
    logout = (req: Request, res: Response) => {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.json({ success: true, message: 'Logout successful' });
    };

    /**
     * @swagger
     * /api/auth/forgot-password:
     *   post:
     *     summary: Request password reset email
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required: [email]
     *             properties:
     *               email: { type: string, format: email }
     *     responses:
     *       200:
     *         description: If user exists, reset email will be sent
     */
    forgotPassword = catchAsync(async (req: Request, res: Response) => {
        const data = forgotPasswordSchema.parse(req.body);
        const result = await this.authService.forgotPassword(data);
        res.json({ success: true, ...result });
    });

    /**
     * @swagger
     * /api/auth/reset-password:
     *   post:
     *     summary: Reset password with token
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required: [token, password]
     *             properties:
     *               token: { type: string }
     *               password: { type: string, minLength: 12 }
     *     responses:
     *       200:
     *         description: Password reset successful
     *       400:
     *         description: Invalid or expired token
     */
    resetPassword = catchAsync(async (req: Request, res: Response) => {
        const data = resetPasswordSchema.parse(req.body);
        const result = await this.authService.resetPassword(data);
        res.json({ success: true, ...result });
    });

    /**
     * @swagger
     * /api/auth/verify-email:
     *   post:
     *     summary: Verify email with token
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required: [token]
     *             properties:
     *               token: { type: string }
     *     responses:
     *       200:
     *         description: Email verified successfully
     *       400:
     *         description: Invalid or expired token
     */
    verifyEmail = catchAsync(async (req: Request, res: Response) => {
        const data = verifyEmailSchema.parse(req.body);
        const result = await this.authService.verifyEmail(data);
        res.json({ success: true, ...result });
    });

    /**
     * @swagger
     * /api/auth/resend-verification:
     *   post:
     *     summary: Resend verification email
     *     tags: [Auth]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required: [email]
     *             properties:
     *               email: { type: string, format: email }
     *     responses:
     *       200:
     *         description: Verification email resent
     */
    resendVerification = catchAsync(async (req: Request, res: Response) => {
        const { email } = resendEmailVerificationSchema.parse(req.body);
        const result = await this.authService.resendVerification(email);
        res.json({ success: true, ...result });
    });

    /**
     * @swagger
     * /api/auth/setup-2fa:
     *   post:
     *     summary: Setup 2FA (TOTP)
     *     tags: [Auth]
     *     security:
     *       - cookieAuth: []
     *     responses:
     *       200:
     *         description: 2FA secret and QR code URL generated
     */
    setup2FA = [
        authenticateToken,
        catchAsync(async (req: AuthRequest, res: Response) => {
            const userId = req.user!.id;
            const result = await this.authService.setup2FA(userId);
            res.json({ success: true, data: result });
        })
    ];

    /**
     * @swagger
     * /api/auth/verify-2fa:
     *   post:
     *     summary: Verify and enable 2FA
     *     tags: [Auth]
     *     security:
     *       - cookieAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required: [token]
     *             properties:
     *               token: { type: string }
     *     responses:
     *       200:
     *         description: 2FA enabled successfully
     *       400:
     *         description: Invalid token
     */
    verify2FA = [
        authenticateToken,
        catchAsync(async (req: AuthRequest, res: Response) => {
            const data = verify2FASchema.parse(req.body);
            const userId = req.user!.id;
            const result = await this.authService.verify2FA(userId, data);
            res.json({ success: true, data: result });
        })
    ];

    /**
     * @swagger
     * /api/auth/profile:
     *   get:
     *     summary: Get current user profile
     *     tags: [Auth]
     *     security:
     *       - cookieAuth: []
     *     responses:
     *       200:
     *         description: Profile data retrieved successfully
     */
    getProfile = [
        authenticateToken,
        catchAsync(async (req: AuthRequest, res: Response) => {
            const userId = req.user!.id;
            const result = await this.authService.getProfile(userId);
            res.json({ success: true, data: result });
        })
    ];

    /**
     * @swagger
     * /api/auth/profile:
     *   put:
     *     summary: Update user profile
     *     tags: [Auth]
     *     security:
     *       - cookieAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               firstName: { type: string }
     *               lastName: { type: string }
     *               phone: { type: string }
     *               location: { type: string }
     *               jobSeekerProfile: { type: object }
     *               recruiterProfile: { type: object }
     *     responses:
     *       200:
     *         description: Profile updated successfully
     */
    updateProfile = [
        authenticateToken,
        catchAsync(async (req: AuthRequest, res: Response) => {
            const userId = req.user!.id;
            const { firstName, lastName, phone, location, jobSeekerProfile, recruiterProfile } = req.body;

            const parsedUserUpdates = updateUserProfileSchema.parse({ firstName, lastName, phone, location });
            const userUpdates = Object.fromEntries(
                Object.entries(parsedUserUpdates).filter(([_, value]) => value !== undefined)
            ) as UpdateUserProfileDTO;
            let jobSeekerUpdates, recruiterUpdates;

            if (req.user!.role === 'job_seeker' && jobSeekerProfile) {
                jobSeekerUpdates = updateJobSeekerProfileSchema.parse(jobSeekerProfile);
            } else if (req.user!.role === 'recruiter' && recruiterProfile) {
                recruiterUpdates = updateRecruiterProfileSchema.parse(recruiterProfile);
            }

            const result = await this.authService.updateProfile(userId, userUpdates, jobSeekerUpdates, recruiterUpdates);
            res.json({ success: true, data: result });
        })
    ];


    private setCookies(res: Response, accessToken: string, refreshToken: string) {
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000 // 15 minutes
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
    }
}
