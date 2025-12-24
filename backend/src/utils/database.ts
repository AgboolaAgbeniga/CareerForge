import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '../models/schema';

// Create the connection with fallback for build time
const getDatabaseUrl = () => {
  // During Docker build, DATABASE_URL might not be available
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }
  
  // Fallback for build time - this will be replaced at runtime
  return process.env.NODE_ENV === 'production' 
    ? 'postgresql://placeholder:placeholder@placeholder:5432/placeholder'
    : 'postgresql://postgres:Jesuschrist@2@localhost:5432/careerforge';
};

const client = postgres(getDatabaseUrl());

// Create the drizzle instance
export const db = drizzle(client, { schema });

// Export for use in other files
export default db;