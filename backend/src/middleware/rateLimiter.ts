import rateLimit from 'express-rate-limit';

const isProd = process.env.NODE_ENV === 'production';

// Global rate limiter: 100 requests per 15 minutes
export const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: isProd ? 100 : 1000, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Strict limiter for authentication endpoints
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: isProd ? 5 : 1000, // Limit each IP to 5 attempts per windowMs
    message: 'Too many login attempts, please try again after 15 minutes.',
    skipSuccessfulRequests: true, // Don't count successful requests
});

// API rate limiter: 30 requests per minute
export const apiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: isProd ? 30 : 1000,
    message: 'API rate limit exceeded, please slow down.',
});

// AI rate limiter: 5 requests per minute (intensive operations)
export const aiLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: isProd ? 5 : 1000,
    message: 'AI processing limit exceeded. Please wait a minute before trying again.',
});
