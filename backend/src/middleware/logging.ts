import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { v4 as uuidv4 } from 'uuid';

// Extended request interface to include a unique ID
export interface RequestWithId extends Request {
    id?: string;
}

const loggingMiddleware = (req: RequestWithId, res: Response, next: NextFunction) => {
    // Assign a unique ID to each request for tracing
    req.id = uuidv4();

    const start = Date.now();
    const { method, url, ip } = req;
    const userAgent = req.get('user-agent') || 'unknown';

    // Log on request completion
    res.on('finish', () => {
        const duration = Date.now() - start;
        const { statusCode } = res;
        const contentLength = res.get('content-length') || 0;

        const message = `${req.id} - ${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip} - ${duration}ms`;

        if (statusCode >= 500) {
            logger.error(message);
        } else if (statusCode >= 400) {
            logger.warn(message);
        } else {
            logger.http(message);
        }
    });

    next();
};

export default loggingMiddleware;
