import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import logger from '../utils/logger';

export class AppError extends Error {
    public statusCode: number;
    public isOperational: boolean;
    public errorCode: string;
    public details: any;

    constructor(message: string, statusCode: number, errorCode: string = 'INTERNAL_ERROR', details: any = null) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.details = details;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // Zod validation error
    if (err instanceof z.ZodError) {
        const friendlyErrors = err.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
        }));
        // Use the first error's message as the top-level message for simple display
        const primaryMessage = friendlyErrors[0]?.message || 'Please check your input and try again';
        return res.status(400).json({
            status: 'error',
            code: 'VALIDATION_ERROR',
            message: primaryMessage,
            details: friendlyErrors
        });
    }

    if (err instanceof AppError) {
        logger.warn(`Operational Error: ${err.message}`, {
            statusCode: err.statusCode,
            code: err.errorCode,
            path: req.path,
        });
        return res.status(err.statusCode).json({
            status: 'error',
            code: err.errorCode,
            message: err.message,
            details: err.details
        });
    }

    // Default to mapping status code to common codes
    const statusCode = err.statusCode || 500;
    const errorCode = err.code || 'INTERNAL_ERROR';

    logger.error('Unexpected Error:', {
        message: err.message,
        stack: err.stack,
        path: req.path,
    });

    return res.status(statusCode).json({
        status: 'error',
        code: errorCode,
        message: process.env.NODE_ENV === 'production'
            ? 'Something went wrong'
            : err.message,
    });
};
