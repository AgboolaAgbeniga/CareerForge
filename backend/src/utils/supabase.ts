import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Public client (for client-side operations)
export const supabase = createClient(supabaseUrl, supabaseKey);

// Admin client (for server-side operations with elevated privileges)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Database client (using existing drizzle setup)
export { db } from './database';

// Helper functions for common Supabase operations
export class SupabaseHelper {
  // Real-time subscriptions
  static subscribeToTable(table: string, callback: (payload: any) => void) {
    return supabase
      .channel(`${table}_changes`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: table
      }, callback)
      .subscribe();
  }

  // File upload to Supabase Storage
  static async uploadFile(bucket: string, fileName: string, file: Buffer, contentType: string) {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file, {
        contentType: contentType,
        upsert: false
      });

    if (error) throw error;
    return data;
  }

  // Get public URL for file
  static getPublicUrl(bucket: string, fileName: string) {
    const { data } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  // Authentication helpers
  static async signUp(email: string, password: string, metadata?: any) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });

    if (error) throw error;
    return data;
  }

  static async signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  }

  static async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }

  static async getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  }
}