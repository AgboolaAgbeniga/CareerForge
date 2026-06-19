-- Add missing backup_codes column to users table
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS backup_codes text[];
