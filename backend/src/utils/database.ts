import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../models/schema';

// Create the connection
const client = postgres(process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/careerforge');

// Create the drizzle instance
export const db = drizzle(client, { schema });

// Export for use in other files
export default db;