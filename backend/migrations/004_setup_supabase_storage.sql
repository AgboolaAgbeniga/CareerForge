-- Migration: Setup Supabase Storage for file uploads
-- This migration sets up the necessary storage bucket and policies for file uploads

-- Create storage bucket for resumes (if using Supabase backend)
-- Note: This SQL should be run in Supabase SQL editor, not the application database

/*
-- Run this in Supabase SQL Editor:

-- Create resumes bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy: Users can upload their own resumes
CREATE POLICY "Users can upload their own resumes" ON storage.objects
FOR INSERT WITH CHECK (
    bucket_id = 'resumes' 
    AND auth.uid()::text = (string_to_array(storage.foldername(name), '/'))[1]
);

-- Policy: Users can view their own resumes
CREATE POLICY "Users can view their own resumes" ON storage.objects
FOR SELECT USING (
    bucket_id = 'resumes' 
    AND auth.uid()::text = (string_to_array(storage.foldername(name), '/'))[1]
);

-- Policy: Users can update their own resumes
CREATE POLICY "Users can update their own resumes" ON storage.objects
FOR UPDATE USING (
    bucket_id = 'resumes' 
    AND auth.uid()::text = (string_to_array(storage.foldername(name), '/'))[1]
);

-- Policy: Users can delete their own resumes
CREATE POLICY "Users can delete their own resumes" ON storage.objects
FOR DELETE USING (
    bucket_id = 'resumes' 
    AND auth.uid()::text = (string_to_array(storage.foldername(name), '/'))[1]
);

-- Public read access for resume files (optional - for sharing)
CREATE POLICY "Public read access for resumes" ON storage.objects
FOR SELECT USING (bucket_id = 'resumes');
*/

-- For application database, we just log that storage should be set up
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

-- Create a log entry to track this migration
DO $$
BEGIN
    RAISE NOTICE 'Supabase Storage setup: Please run the storage bucket creation SQL in Supabase SQL Editor';
    RAISE NOTICE 'See backend/migrations/004_setup_supabase_storage.sql for the required SQL commands';
END $$;