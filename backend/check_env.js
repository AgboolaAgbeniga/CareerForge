const { z } = require('zod');
require('dotenv').config();

const envSchema = z.object({
    DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
    JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
    JWT_REFRESH_SECRET: z.string().min(32, 'JWT_REFRESH_SECRET must be at least 32 characters'),
    JWT_RESET_SECRET: z.string().min(32, 'JWT_RESET_SECRET must be at least 32 characters'),
    ENCRYPTION_KEY: z.string().length(64, 'ENCRYPTION_KEY must be exactly 64 characters (32 bytes in hex)'),
});

const result = envSchema.safeParse(process.env);
if (!result.success) {
    console.log('Validation failed:');
    result.error.errors.forEach(err => {
        console.log(`- ${err.path[0]}: ${err.message}`);
    });
} else {
    console.log('Validation successful!');
}
