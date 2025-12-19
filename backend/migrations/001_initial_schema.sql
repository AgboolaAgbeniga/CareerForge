-- CareerForge Database Schema for Supabase
-- Run this in Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  role VARCHAR(50) NOT NULL CHECK (role IN ('job_seeker', 'recruiter')),
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  location VARCHAR(255),
  is_verified BOOLEAN DEFAULT FALSE,
  email_verified_at TIMESTAMP WITH TIME ZONE,
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  two_factor_secret VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login_at TIMESTAMP WITH TIME ZONE
);

-- Job Seekers table
CREATE TABLE IF NOT EXISTS job_seekers (
  id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255),
  experience_years INT,
  skills TEXT[],
  education TEXT,
  portfolio_url VARCHAR(255),
  linkedin_url VARCHAR(255),
  resume_file_url VARCHAR(255),
  profile_completion_percentage INT DEFAULT 0,
  is_profile_visible BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Recruiters table
CREATE TABLE IF NOT EXISTS recruiters (
  id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  company_name VARCHAR(255),
  industry VARCHAR(100),
  company_size VARCHAR(50),
  title VARCHAR(255),
  experience_years INT,
  specialization TEXT,
  billing_info JSONB,
  subscription_plan VARCHAR(50) DEFAULT 'free',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  industry VARCHAR(100),
  headquarters VARCHAR(255),
  size VARCHAR(50),
  description TEXT,
  website_url VARCHAR(255),
  logo_url VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recruiter_id UUID REFERENCES recruiters(id) ON DELETE CASCADE,
  company_id UUID REFERENCES companies(id),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  requirements TEXT,
  location VARCHAR(255),
  salary_min DECIMAL(10,2),
  salary_max DECIMAL(10,2),
  currency VARCHAR(3) DEFAULT 'NGN',
  job_type VARCHAR(50) DEFAULT 'full_time' CHECK (job_type IN ('full_time', 'part_time', 'contract', 'remote')),
  experience_level VARCHAR(50) CHECK (experience_level IN ('entry', 'mid', 'senior', 'executive')),
  skills_required TEXT[],
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'open', 'closed', 'paused')),
  views_count INT DEFAULT 0,
  applications_count INT DEFAULT 0,
  posted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Applications table
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_seeker_id UUID REFERENCES job_seekers(id) ON DELETE CASCADE,
  job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'interview', 'accepted', 'rejected', 'withdrawn')),
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  match_score DECIMAL(5,2),
  cover_letter TEXT,
  resume_version_url VARCHAR(255),
  next_step VARCHAR(255),
  notes TEXT,
  UNIQUE(job_seeker_id, job_id)
);

-- Resumes table
CREATE TABLE IF NOT EXISTS resumes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_seeker_id UUID REFERENCES job_seekers(id) ON DELETE CASCADE,
  version INT DEFAULT 1,
  original_file_url VARCHAR(255),
  parsed_data JSONB,
  ai_optimized_data JSONB,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  recipient_id UUID REFERENCES users(id) ON DELETE CASCADE,
  application_id UUID REFERENCES applications(id) ON DELETE SET NULL,
  subject VARCHAR(255),
  content TEXT,
  message_type VARCHAR(50) DEFAULT 'general' CHECK (message_type IN ('application', 'interview', 'update', 'followup', 'general')),
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  attachments JSONB
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL CHECK (type IN ('application_update', 'new_message', 'job_match', 'interview_invite', 'system')),
  title VARCHAR(255),
  content TEXT,
  data JSONB,
  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  expires_at TIMESTAMP WITH TIME ZONE
);

-- Analytics Events table
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  event_type VARCHAR(100) NOT NULL,
  event_data JSONB,
  session_id VARCHAR(255),
  user_agent TEXT,
  ip_address INET,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Experiments table
CREATE TABLE IF NOT EXISTS experiments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'draft' CHECK (status IN ('draft', 'running', 'completed', 'stopped')),
  variants JSONB,
  target_audience JSONB,
  start_date TIMESTAMP WITH TIME ZONE,
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Experiment Participants table
CREATE TABLE IF NOT EXISTS experiment_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  experiment_id UUID REFERENCES experiments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  variant_assigned VARCHAR(100),
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  conversion_events JSONB
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_jobs_recruiter_id ON jobs(recruiter_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_applications_job_seeker_id ON applications(job_seeker_id);
CREATE INDEX IF NOT EXISTS idx_applications_job_id ON applications(job_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender_id ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient_id ON messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_user_id ON analytics_events(user_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON analytics_events(event_type);

-- Enable Row Level Security (RLS) for multi-tenant security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_seekers ENABLE ROW LEVEL SECURITY;
ALTER TABLE recruiters ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Create policies (basic example - customize based on your auth system)
-- These would be set up based on your authentication approach

-- Insert sample data (optional)
-- You can uncomment and modify these for testing

/*
-- Sample company
INSERT INTO companies (name, industry, headquarters, size, description)
VALUES ('TechCorp Nigeria', 'Technology', 'Lagos, Nigeria', '51-200', 'Leading tech company in Nigeria');

-- Sample users (passwords would be hashed in production)
INSERT INTO users (email, password_hash, role, first_name, last_name, is_verified)
VALUES
  ('jobseeker@example.com', '$2b$10$dummy.hash.for.demo', 'job_seeker', 'John', 'Doe', true),
  ('recruiter@example.com', '$2b$10$dummy.hash.for.demo', 'recruiter', 'Jane', 'Smith', true);
*/