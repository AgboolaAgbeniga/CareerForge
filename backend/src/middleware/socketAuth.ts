import { Socket } from 'socket.io';
import { ExtendedError } from 'socket.io/dist/namespace';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('FATAL: JWT_SECRET environment variable is not configured');

interface SocketAuthData {
    userId: string;
    email: string;
    role: string;
}

interface AuthenticatedSocket extends Socket {
    userId?: string;
    userRole?: string;
}

/**
 * Socket.io authentication middleware
 * Verifies JWT token from handshake and attaches userId to socket
 */
export const socketAuthMiddleware = (socket: AuthenticatedSocket, next: (err?: ExtendedError) => void) => {
    try {
        // Get token from handshake auth or query
        const token = socket.handshake.auth?.token || socket.handshake.query?.token;

        if (!token) {
            return next(new Error('Authentication error: No token provided'));
        }

        // Verify JWT token
        const decoded = jwt.verify(token as string, JWT_SECRET) as SocketAuthData;

        // Attach user info to socket
        socket.userId = decoded.userId;
        socket.userRole = decoded.role;

        logger.info(`Socket authenticated for user: ${decoded.userId}`);
        next();
    } catch (error) {
        logger.error('Socket authentication failed:', error);
        return next(new Error('Authentication error: Invalid token'));
    }
};

/**
 * Validate that the user can only join their own room
 */
export const validateUserRoom = (socket: AuthenticatedSocket, roomId: string): boolean => {
    if (!socket.userId) {
        return false;
    }

    // Users can only join rooms that match their userId
    // or conversation rooms they're part of (format: "conversation:{id}")
    if (roomId === socket.userId) {
        return true;
    }

    // Allow conversation rooms (will validate membership later)
    if (roomId.startsWith('conversation:')) {
        return true;
    }

    return false;
};

/**
 * Rate limiter for Socket.io events
 */
class SocketRateLimiter {
    private messageCounts: Map<string, { count: number; resetTime: number }> = new Map();
    private readonly maxMessages: number = 10; // 10 messages per minute
    private readonly windowMs: number = 60 * 1000; // 1 minute

    isAllowed(userId: string): boolean {
        const now = Date.now();
        const userLimit = this.messageCounts.get(userId);

        if (!userLimit || now > userLimit.resetTime) {
            // Reset or create new limit
            this.messageCounts.set(userId, {
                count: 1,
                resetTime: now + this.windowMs
            });
            return true;
        }

        if (userLimit.count >= this.maxMessages) {
            return false;
        }

        userLimit.count++;
        return true;
    }

    cleanup() {
        const now = Date.now();
        for (const [userId, limit] of this.messageCounts.entries()) {
            if (now > limit.resetTime) {
                this.messageCounts.delete(userId);
            }
        }
    }
}

export const socketRateLimiter = new SocketRateLimiter();

// Cleanup rate limiter every 5 minutes
setInterval(() => {
    socketRateLimiter.cleanup();
}, 5 * 60 * 1000);
