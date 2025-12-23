import { z } from 'zod';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Define the schema for environment variables
const envSchema = z.object({
    // Required variables
    DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
    JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
    JWT_REFRESH_SECRET: z.string().min(32, 'JWT_REFRESH_SECRET must be at least 32 characters'),
    ENCRYPTION_KEY: z.string().length(64, 'ENCRYPTION_KEY must be exactly 64 characters (32 bytes in hex)'),

    // Optional with defaults
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
    PORT: z.string().default('5000'),
    FRONTEND_URL: z.string().url().default('http://localhost:3000'),
    AI_SERVICE_URL: z.string().url().optional(),

    // Email config (optional for dev)
    EMAIL_USER: z.string().email().optional(),
    EMAIL_PASS: z.string().optional(),
});

// Validate and export typed environment variables
export const validateEnv = () => {
    try {
        const env = envSchema.parse(process.env);
        console.log('✅ Environment variables validated successfully');
        return env;
    } catch (error) {
        if (error instanceof z.ZodError) {
            console.error('❌ Environment variable validation failed:');
            error.errors.forEach((err) => {
                console.error(`  - ${err.path.join('.')}: ${err.message}`);
            });
            console.error('\n💡 Please check your .env file and ensure all required variables are set.');
            process.exit(1);
        }
        throw error;
    }
};

// Export validated env
export const env = validateEnv();

// Type-safe environment variables
export type Env = z.infer<typeof envSchema>;
