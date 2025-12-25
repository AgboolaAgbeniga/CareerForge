import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { createClient } from '@supabase/supabase-js';
import * as schema from '../models/schema';

// Supabase client configuration
const supabaseUrl = process.env.SUPABASE_URL || 'https://jplxlgsrjxcksantcgnp.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'sb_publishable_VWYoTD0tPhKaoIoatt8RoQ_kox82itZ';

export const supabaseClient = createClient(supabaseUrl, supabaseKey);

// Create the connection with fallback for build time
const getDatabaseUrl = () => {
  // During Docker build, DATABASE_URL might not be available
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }
  
  // Fallback for build time - this will be replaced at runtime
  return process.env.NODE_ENV === 'production' 
    ? 'postgresql://placeholder:placeholder@placeholder:5432/placeholder'
    : `postgresql://postgres:[YOUR-PASSWORD]@db.jplxlgsrjxcksantcgnp.supabase.co:5432/postgres`;
};

const client = postgres(getDatabaseUrl());

// Create the drizzle instance
export const db = drizzle(client, { schema });

// Export for use in other files
export default db;

// Export Supabase client for direct API access
export { supabaseClient as supabase };