import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';
import { db } from '../utils/database';
import { users } from '../models/schema';
import { eq } from 'drizzle-orm';
import { AppError } from './error';

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error('FATAL: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables are not configured');
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

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
    // Verify token with Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      return next(new AppError('Invalid or expired token', 403, 'FORBIDDEN'));
    }

    // Get user details from database
    const [user] = await db.select().from(users).where(eq(users.id, data.user.id)).limit(1);
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
      const { data, error } = await supabase.auth.getUser(token);
      if (!error && data.user) {
        const [user] = await db.select().from(users).where(eq(users.id, data.user.id)).limit(1);
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
      }
    } catch (error) {
      // Ignore auth errors for optional auth
    }
  }

  next();
};

/**
 * Middleware to enforce resource ownership (Multi-Tenant Authorization)
 * @param resourceGetter A function that takes a resource ID from req.params.id and returns an object with a userId property.
 */
export const requireOwnership = (resourceGetter: (id: string) => Promise<{ userId?: string; jobSeekerId?: string; recruiterId?: string } | null>) => {
  return async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401, 'UNAUTHORIZED'));
    }

    const resourceId = req.params.id;
    if (!resourceId) {
       return next(new AppError('Resource ID is required', 400, 'BAD_REQUEST'));
    }

    try {
      const resource = await resourceGetter(resourceId);
      if (!resource) {
         return next(new AppError('Resource not found', 404, 'NOT_FOUND'));
      }

      // Check against standard ownership fields
      const ownerIds = [resource.userId, resource.jobSeekerId, resource.recruiterId].filter(Boolean);

      if (ownerIds.length === 0 || !ownerIds.includes(req.user.id)) {
         return next(new AppError('Forbidden: You do not have permission to access this resource', 403, 'FORBIDDEN'));
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
