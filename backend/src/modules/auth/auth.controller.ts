import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';
import { authenticateToken, AuthRequest } from '../../middleware/auth';
import {
    registerSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    verifyEmailSchema,
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

    register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = registerSchema.parse(req.body);
            const { user, accessToken, refreshToken } = await this.authService.register(data);

            this.setCookies(res, accessToken, refreshToken);
            res.status(201).json({
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    firstName: user.firstName,
                    lastName: user.lastName
                }
            });
        } catch (error) {
            next(error);
        }
    };

    login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = loginSchema.parse(req.body);
            const { user, tokens } = await this.authService.login(data);

            this.setCookies(res, tokens.accessToken, tokens.refreshToken);
            res.json({
                user: {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    onboardingCompleted: user.onboardingCompleted
                }
            });
        } catch (error) {
            next(error);
        }
    };

    refresh = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                const error = new Error('Refresh token required');
                (error as any).statusCode = 401;
                throw error;
            }

            const { accessToken } = await this.authService.refresh(refreshToken);

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 15 * 60 * 1000
            });

            res.json({ message: 'Token refreshed' });
        } catch (error) {
            next(error);
        }
    };

    logout = (req: Request, res: Response) => {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        res.json({ message: 'Logout successful' });
    };

    forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = forgotPasswordSchema.parse(req.body);
            const result = await this.authService.forgotPassword(data);
            res.json(result);
        } catch (error) {
            next(error);
        }
    };

    resetPassword = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = resetPasswordSchema.parse(req.body);
            const result = await this.authService.resetPassword(data);
            res.json(result);
        } catch (error) {
            next(error);
        }
    };

    verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const data = verifyEmailSchema.parse(req.body);
            const result = await this.authService.verifyEmail(data);
            res.json(result);
        } catch (error) {
            next(error);
        }
    };

    setup2FA = [
        authenticateToken,
        async (req: AuthRequest, res: Response, next: NextFunction) => {
            try {
                const userId = req.user!.id;
                const result = await this.authService.setup2FA(userId);
                res.json(result);
            } catch (error) {
                next(error);
            }
        }
    ];

    verify2FA = [
        authenticateToken,
        async (req: AuthRequest, res: Response, next: NextFunction) => {
            try {
                const data = verify2FASchema.parse(req.body);
                const userId = req.user!.id;
                const result = await this.authService.verify2FA(userId, data);
                res.json(result);
            } catch (error) {
                next(error);
            }
        }
    ];

    getProfile = [
        authenticateToken,
        async (req: AuthRequest, res: Response, next: NextFunction) => {
            try {
                const userId = req.user!.id;
                const result = await this.authService.getProfile(userId);
                res.json(result);
            } catch (error) {
                next(error);
            }
        }
    ];

    updateProfile = [
        authenticateToken,
        async (req: AuthRequest, res: Response, next: NextFunction) => {
            try {
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
                res.json(result);
            } catch (error) {
                next(error);
            }
        }
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
