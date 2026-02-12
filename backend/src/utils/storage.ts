import { supabaseClient } from './database';

export interface UploadResult {
  path: string;
  url: string;
  publicUrl: string;
}

export interface UploadOptions {
  cacheControl?: string;
  contentType?: string;
  upsert?: boolean;
}

/**
 * Upload file to Supabase Storage
 */
export async function uploadToSupabase(
  bucket: string,
  filePath: string,
  file: Buffer | File,
  options: UploadOptions = {}
): Promise<UploadResult> {
  try {
    if (!supabaseClient) {
      throw new Error('Supabase client not initialized');
    }

    const uploadOptions: any = {
      cacheControl: options.cacheControl || '3600',
      upsert: options.upsert || false,
    };
    
    if (options.contentType) {
      uploadOptions.contentType = options.contentType;
    }

    const { data, error } = await supabaseClient.storage
      .from(bucket)
      .upload(filePath, file, uploadOptions);

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    // Get public URL
    const { data: urlData } = supabaseClient.storage
      .from(bucket)
      .getPublicUrl(data.path);

    return {
      path: data.path,
      url: data.path,
      publicUrl: urlData.publicUrl,
    };
  } catch (error) {
    console.error('Supabase upload error:', error);
    throw error;
  }
}

/**
 * Delete file from Supabase Storage
 */
export async function deleteFromSupabase(bucket: string, filePath: string): Promise<void> {
  try {
    if (!supabaseClient) {
      throw new Error('Supabase client not initialized');
    }

    const { error } = await supabaseClient.storage
      .from(bucket)
      .remove([filePath]);

    if (error) {
      throw new Error(`Delete failed: ${error.message}`);
    }
  } catch (error) {
    console.error('Supabase delete error:', error);
    throw error;
  }
}

/**
 * Get public URL for file in Supabase Storage
 */
export function getPublicUrl(bucket: string, filePath: string): string {
  if (!supabaseClient) {
    throw new Error('Supabase client not initialized');
  }

  const { data } = supabaseClient.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return data.publicUrl;
}

/**
 * Check if file exists in Supabase Storage
 */
export async function fileExists(bucket: string, filePath: string): Promise<boolean> {
  try {
    if (!supabaseClient) {
      return false;
    }

    const { data, error } = await supabaseClient.storage
      .from(bucket)
      .list('', {
        search: filePath,
      });

    if (error) {
      return false;
    }

    return data && data.length > 0;
  } catch (error) {
    console.error('Supabase file exists check error:', error);
    return false;
  }
}

/**
 * Resume-specific upload functions
 */
export const resumeStorage = {
  /**
   * Upload resume file for a user
   */
  async uploadResume(userId: string, fileName: string, file: Buffer | File): Promise<UploadResult> {
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = `${userId}/resume-${Date.now()}-${sanitizedFileName}`;
    
    return uploadToSupabase('resumes', filePath, file, {
      cacheControl: '3600',
      contentType: 'application/pdf',
    });
  },

  /**
   * Delete resume file
   */
  async deleteResume(filePath: string): Promise<void> {
    return deleteFromSupabase('resumes', filePath);
  },

  /**
   * Get public URL for resume
   */
  getResumeUrl(filePath: string): string {
    return getPublicUrl('resumes', filePath);
  },

  /**
   * Check if resume exists
   */
  async resumeExists(filePath: string): Promise<boolean> {
    return fileExists('resumes', filePath);
  },
};

/**
 * Generic file upload with fallback to local storage
 */
export async function uploadWithFallback(
  bucket: string,
  filePath: string,
  file: Buffer | File,
  localFallbackPath: string,
  options: UploadOptions = {}
): Promise<UploadResult & { localPath?: string }> {
  try {
    // Try Supabase upload first
    const result = await uploadToSupabase(bucket, filePath, file, options);
    return result;
  } catch (error) {
    console.warn('Supabase upload failed, falling back to local storage:', error);
    
    // Fallback to local storage for development
    const fs = require('fs');
    const path = require('path');
    
    // Ensure directory exists
    const dir = path.dirname(localFallbackPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Write file locally
    if (file instanceof Buffer) {
      fs.writeFileSync(localFallbackPath, file);
    } else {
      // File type
      const arrayBuffer = await (file as File).arrayBuffer();
      fs.writeFileSync(localFallbackPath, Buffer.from(arrayBuffer));
    }
    
    return {
      path: localFallbackPath,
      url: localFallbackPath,
      publicUrl: localFallbackPath,
      localPath: localFallbackPath,
    };
  }
}