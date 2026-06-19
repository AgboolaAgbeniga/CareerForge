import * as dotenv from 'dotenv';
dotenv.config();

import { db } from './src/utils/database';
import { users } from './src/models/schema';

async function testDB() {
    try {
        console.log('Testing Drizzle DB connection...');
        const result = await db.select().from(users).limit(1);
        console.log('Success! Connection Pooler URL is working correctly.');
        process.exit(0);
    } catch (e: any) {
        console.error('Failed to connect via Drizzle:', e);
        if (e.cause) console.error('Cause:', e.cause);
        process.exit(1);
    }
}
testDB();
