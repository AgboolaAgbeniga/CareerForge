-- Migration 011: AI Agent Infrastructure
-- Adds necessary tables and columns to support the newly expanded Agent Tools.

-- 1. Bias Auditing & Compliance Table
CREATE TABLE IF NOT EXISTS ai_audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,
    action_type VARCHAR(100) NOT NULL, -- e.g., 'match_decision', 'rejection', 'screening'
    candidate_id UUID REFERENCES users(id) ON DELETE SET NULL,
    agent_id VARCHAR(100) NOT NULL, -- e.g., 'matching_engine', 'recruiter_intelligence'
    decision_reasoning TEXT NOT NULL,
    demographic_inference JSONB, -- Storing inferred markers strictly for bias auditing
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Workflow & Scheduling (Interviews)
CREATE TABLE IF NOT EXISTS interviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    recruiter_id UUID REFERENCES users(id) ON DELETE SET NULL,
    candidate_id UUID REFERENCES users(id) ON DELETE CASCADE,
    status VARCHAR(50) DEFAULT 'scheduling', -- 'scheduling', 'scheduled', 'completed', 'canceled'
    scheduled_at TIMESTAMPTZ,
    duration_minutes INTEGER DEFAULT 30,
    meeting_link VARCHAR(255),
    feedback_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Update Job Seekers for Job Preferences and Compliance
ALTER TABLE job_seekers
ADD COLUMN IF NOT EXISTS salary_min INTEGER,
ADD COLUMN IF NOT EXISTS salary_max INTEGER,
ADD COLUMN IF NOT EXISTS location_preference VARCHAR(100),
ADD COLUMN IF NOT EXISTS ai_coach_enabled BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS data_erasure_requested_at TIMESTAMPTZ;

-- 4. Update Schema for Background Verification Agent
ALTER TABLE job_seekers
ADD COLUMN IF NOT EXISTS github_competency_score JSONB, -- Stores the output of verify_github_contributions
ADD COLUMN IF NOT EXISTS verified_skills TEXT[]; -- Skills verified by cross-referencing
