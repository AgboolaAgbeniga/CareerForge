import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { createClient } from '@supabase/supabase-js';
import * as schema from '../models/schema';

// Supabase client configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Supabase configuration missing. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY environment variables.');
}

export const supabaseClient = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Create the connection with validation
const getDatabaseUrl = () => {
  const dbUrl = process.env.DATABASE_URL;
  
  if (!dbUrl) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('DATABASE_URL environment variable is required in production');
    }
    console.warn('⚠️ DATABASE_URL not set. Using placeholder for development.');
    return 'postgresql://postgres:[YOUR-PASSWORD]@localhost:5432/postgres';
  }
  
  return dbUrl;
};

const client = postgres(getDatabaseUrl());

// Create the drizzle instance
export const db = drizzle(client, { schema });

// Export for use in other files
export default db;

// Export Supabase client for direct API access
export { supabaseClient as supabase };