import { z } from 'zod';
import dotenv from 'dotenv';
import logger from '../utils/logger';

// Load environment variables
dotenv.config();

// Define the schema for environment variables
const envSchema = z.object({
    // Required variables
    DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
    JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
    JWT_REFRESH_SECRET: z.string().min(32, 'JWT_REFRESH_SECRET must be at least 32 characters'),
    JWT_RESET_SECRET: z.string().min(32).optional().default('default-reset-secret-at-least-32-chars-long'),
    ENCRYPTION_KEY: z.string().length(64, 'ENCRYPTION_KEY must be exactly 64 characters (32 bytes in hex)'),

    // Supabase configuration
    SUPABASE_URL: z.string().url().optional(),
    SUPABASE_ANON_KEY: z.string().optional(),
    SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),

    // Optional with defaults
    PORT: z.string().default('5000'),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    FRONTEND_URL: z.string().url().default('http://localhost:3000'),
    AI_SERVICE_URL: z.string().url().optional().default('http://localhost:8000'), // Legacy/Fallback
    RESUME_PARSER_URL: z.string().url().default('http://localhost:8000'),
    MATCHING_ENGINE_URL: z.string().url().default('http://localhost:8001'),
    CAREER_COACH_URL: z.string().url().default('http://localhost:8002'),

    // Email config (optional for dev)
    EMAIL_USER: z.string().email().optional(),
    EMAIL_PASS: z.string().optional(),

    // Redis Infrastructure (Phase 1)
    REDIS_URL: z.string().url().default('redis://localhost:6379'),

    // Scraper Engine (Phase 6)
    CRAWL4AI_PROXY_LIST: z.string().optional(),
    MAX_CONCURRENT_CRAWLERS: z.coerce.number().min(1).default(3),

    // Queue Workers (Phase 6)
    BULLMQ_CONCURRENCY: z.coerce.number().min(1).default(5),
});

// Create a schema for build time validation (allows missing required fields)
const buildTimeEnvSchema = envSchema.partial();

// Validate and export typed environment variables
export const validateEnv = () => {
    try {
        const env = envSchema.parse(process.env);
        logger.info('✅ Environment variables validated successfully');
        return env;
    } catch (error) {
        if (error instanceof z.ZodError) {
            logger.error('❌ Environment variable validation failed:');
            error.errors.forEach((err) => {
                logger.error(`  - ${err.path.join('.')}: ${err.message}`);
            });
            logger.error('\n💡 Please check your .env file and ensure all required variables are set.');

            // In production, don't crash the build, but log the error
            if (process.env.NODE_ENV === 'production') {
                logger.warn('⚠️ Running with incomplete environment variables - this may cause runtime errors');
                return {} as Env;
            }

            process.exit(1);
        }
        throw error;
    }
};

// Build-time safe validation
export const validateEnvForBuild = () => {
    try {
        // During build, validate with partial schema to allow missing required fields
        const env = buildTimeEnvSchema.parse(process.env);
        logger.info('✅ Build-time environment validation passed');
        return env;
    } catch (error) {
        logger.warn('⚠️ Build-time environment validation failed (this is normal during Docker build):', error);
        return {} as Partial<Env>;
    }
};

// Export validated env (runtime)
export const env = validateEnv();

// Export build-time safe env
export const buildTimeEnv = validateEnvForBuild();

// Type-safe environment variables
export type Env = z.infer<typeof envSchema>;
