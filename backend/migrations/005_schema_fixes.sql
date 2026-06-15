-- CareerForge Migration: Schema fixes and additions
-- Adds missing columns identified during audit

-- Add companyId to recruiters for company association
ALTER TABLE recruiters ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES companies(id) ON DELETE SET NULL;

-- Add responsibilities column to jobs
ALTER TABLE jobs ADD COLUMN IF NOT EXISTS responsibilities TEXT;

-- Add subscription_plan to recruiters (for future billing)
-- Already present in schema.ts, ensure DB column exists
ALTER TABLE recruiters ADD COLUMN IF NOT EXISTS subscription_plan VARCHAR(50) DEFAULT 'free';

-- Full-text search index on jobs
CREATE INDEX IF NOT EXISTS idx_jobs_full_text ON jobs
  USING gin(to_tsvector('english', title || ' ' || COALESCE(description, '')));

-- GIN index on job_seekers skills array for faster matching
CREATE INDEX IF NOT EXISTS idx_job_seekers_skills ON job_seekers USING gin(skills);

-- Index on applications match_score for sorting
CREATE INDEX IF NOT EXISTS idx_applications_match_score ON applications(match_score DESC NULLS LAST);
