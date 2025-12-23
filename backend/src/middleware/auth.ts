import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { db } from '../utils/database';
import { users } from '../models/schema';
import { eq } from 'drizzle-orm';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'job_seeker' | 'recruiter';
    firstName?: string | undefined;
    lastName?: string | undefined;
  };
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers['authorization'];
  const token = req.cookies.accessToken || (authHeader && authHeader.split(' ')[1]);

  if (!token) {
    res.status(401).json({ error: 'Access token required' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret') as any;

    // Verify user still exists
    const existingUsers = await db.select().from(users).where(eq(users.id, decoded.userId)).limit(1);
    if (existingUsers.length === 0) {
      res.status(401).json({ error: 'User not found' });
      return;
    }

    const user = existingUsers[0]!;
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName || undefined,
      lastName: user.lastName || undefined,
    };

    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(403).json({ error: 'Invalid token' });
    return;
  }
};

export const requireRole = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ error: 'Insufficient permissions' });
      return;
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
      const existingUsers = await db.select().from(users).where(eq(users.id, decoded.userId)).limit(1);
      if (existingUsers.length > 0) {
        const user = existingUsers[0]!;
        req.user = {
          id: user.id,
          email: user.email,
          role: user.role,
          firstName: user.firstName || undefined,
          lastName: user.lastName || undefined,
        };
      }
    } catch (error) {
      // Ignore auth errors for optional auth
    }
  }

  next();
};