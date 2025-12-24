import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../utils/database';
import { users } from '../models/schema';
import { eq } from 'drizzle-orm';
import { AppError } from './error';

/**
 * Extended Request interface to include user information
 */
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'job_seeker' | 'recruiter';
    firstName?: string | undefined;
    lastName?: string | undefined;
    isVerified: boolean;
  };
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers['authorization'];
  const token = req.cookies.accessToken || (authHeader && authHeader.split(' ')[1]);

  if (!token) {
    return next(new AppError('Access token required', 401, 'UNAUTHORIZED'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;

    // Verify user still exists
    const [user] = await db.select().from(users).where(eq(users.id, decoded.userId)).limit(1);
    if (!user) {
      return next(new AppError('User not found', 401, 'UNAUTHORIZED'));
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName || undefined,
      lastName: user.lastName || undefined,
      isVerified: !!user.isVerified,
    };

    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return next(new AppError('Invalid or expired token', 403, 'FORBIDDEN'));
  }
};

export const requireVerified = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user) {
    return next(new AppError('Authentication required', 401, 'UNAUTHORIZED'));
  }

  if (!req.user.isVerified) {
    return next(new AppError('Email verification required', 403, 'EMAIL_NOT_VERIFIED'));
  }

  next();
};

export const requireRole = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401, 'UNAUTHORIZED'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new AppError('Insufficient permissions', 403, 'FORBIDDEN'));
    }

    next();
  };
};

export const optionalAuth = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers['authorization'];
  const token = req.cookies.accessToken || (authHeader && authHeader.split(' ')[1]);

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;
      const [user] = await db.select().from(users).where(eq(users.id, decoded.userId)).limit(1);
      if (user) {
        req.user = {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.firstName || undefined,
          lastName: user.lastName || undefined,
          isVerified: !!user.isVerified,
        };
      }
    } catch (error) {
      // Ignore auth errors for optional auth
    }
  }

  next();
};
