const db = require('./dist/utils/database');
const { users } = require('./dist/models/schema');
const { eq } = require('drizzle-orm');

async function testDB() {
    try {
        console.log('Testing Drizzle DB connection...');
        // Need to use raw postgres client if we want to catch connection error properly
        const { db: drizzleDb } = require('./dist/utils/database');
        const result = await drizzleDb.select().from(users).limit(1);
        console.log('Success!', result);
        process.exit(0);
    } catch (e) {
        console.error('Failed to connect via Drizzle:', e.message);
        process.exit(1);
    }
}
testDB();
