-- ============================================================
-- PHASE 2.1: Supabase Row Level Security (RLS) & Triggers
-- Run this in Supabase SQL Editor after schema is created
-- ============================================================

-- Step 0: Create enum type if it doesn't exist
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('job_seeker', 'recruiter');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

-- Step 1: Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_seekers ENABLE ROW LEVEL SECURITY;
ALTER TABLE recruiters ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_endorsements ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_skill_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_prerequisites ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_relations ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_synonyms ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_embeddings ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_embeddings ENABLE ROW LEVEL SECURITY;

-- Step 2: Create RLS Policies

-- Drop existing policies first
DROP POLICY IF EXISTS "Users can read own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Users can be created by auth trigger" ON users;

-- Users table: Users can read/update their own profile
CREATE POLICY "Users can read own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can be created by auth trigger"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Job Seekers: Can read/update their own profile
DROP POLICY IF EXISTS "Job seekers read own profile" ON job_seekers;
DROP POLICY IF EXISTS "Job seekers update own profile" ON job_seekers;
DROP POLICY IF EXISTS "Job seekers can create own profile" ON job_seekers;

CREATE POLICY "Job seekers read own profile"
  ON job_seekers FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Job seekers update own profile"
  ON job_seekers FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Job seekers can create own profile"
  ON job_seekers FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Recruiters: Can read/update their own profile
DROP POLICY IF EXISTS "Recruiters read own profile" ON recruiters;
DROP POLICY IF EXISTS "Recruiters update own profile" ON recruiters;
DROP POLICY IF EXISTS "Recruiters can create own profile" ON recruiters;

CREATE POLICY "Recruiters read own profile"
  ON recruiters FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Recruiters update own profile"
  ON recruiters FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Recruiters can create own profile"
  ON recruiters FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Jobs: Recruiters see/edit own jobs, everyone can view published jobs
DROP POLICY IF EXISTS "Recruiters see own jobs" ON jobs;
DROP POLICY IF EXISTS "Recruiters can edit own jobs" ON jobs;
DROP POLICY IF EXISTS "Recruiters can delete own jobs" ON jobs;
DROP POLICY IF EXISTS "Recruiters can create jobs" ON jobs;

CREATE POLICY "Recruiters see own jobs"
  ON jobs FOR SELECT
  USING (auth.uid() = recruiter_id OR status = 'open');

CREATE POLICY "Recruiters can edit own jobs"
  ON jobs FOR UPDATE
  USING (auth.uid() = recruiter_id);

CREATE POLICY "Recruiters can delete own jobs"
  ON jobs FOR DELETE
  USING (auth.uid() = recruiter_id);

CREATE POLICY "Recruiters can create jobs"
  ON jobs FOR INSERT
  WITH CHECK (auth.uid() = recruiter_id);

-- Applications: Users see own, recruiters see applications for their jobs
DROP POLICY IF EXISTS "Users see own applications" ON applications;
DROP POLICY IF EXISTS "Recruiters see applications to their jobs" ON applications;
DROP POLICY IF EXISTS "Users can create applications" ON applications;

CREATE POLICY "Users see own applications"
  ON applications FOR SELECT
  USING (auth.uid() = job_seeker_id);

CREATE POLICY "Recruiters see applications to their jobs"
  ON applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM jobs
      WHERE jobs.id = applications.job_id
      AND jobs.recruiter_id = auth.uid()
    )
  );

CREATE POLICY "Users can create applications"
  ON applications FOR INSERT
  WITH CHECK (auth.uid() = job_seeker_id);

-- Resumes: Users can read/update their own
DROP POLICY IF EXISTS "Users read own resumes" ON resumes;
DROP POLICY IF EXISTS "Users update own resumes" ON resumes;
DROP POLICY IF EXISTS "Users create own resumes" ON resumes;

CREATE POLICY "Users read own resumes"
  ON resumes FOR SELECT
  USING (auth.uid() = job_seeker_id);

CREATE POLICY "Users update own resumes"
  ON resumes FOR UPDATE
  USING (auth.uid() = job_seeker_id);

CREATE POLICY "Users create own resumes"
  ON resumes FOR INSERT
  WITH CHECK (auth.uid() = job_seeker_id);

-- Messages: Users can read messages where they're involved
DROP POLICY IF EXISTS "Users read own messages" ON messages;
DROP POLICY IF EXISTS "Users can send messages" ON messages;

CREATE POLICY "Users read own messages"
  ON messages FOR SELECT
  USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can send messages"
  ON messages FOR INSERT
  WITH CHECK (auth.uid() = sender_id);

-- Notifications: Users can read their own
DROP POLICY IF EXISTS "Users read own notifications" ON notifications;

CREATE POLICY "Users read own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

-- Skill Endorsements: Public read, users can endorse themselves
DROP POLICY IF EXISTS "Anyone can read skill endorsements" ON skill_endorsements;
DROP POLICY IF EXISTS "Users can add their own endorsements" ON skill_endorsements;
DROP POLICY IF EXISTS "Users can update their own endorsements" ON skill_endorsements;

CREATE POLICY "Anyone can read skill endorsements"
  ON skill_endorsements FOR SELECT
  USING (true);

CREATE POLICY "Users can add their own endorsements"
  ON skill_endorsements FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own endorsements"
  ON skill_endorsements FOR UPDATE
  USING (auth.uid() = user_id);

-- Skills and related tables: Public read
DROP POLICY IF EXISTS "Anyone can read skills" ON skills;
DROP POLICY IF EXISTS "Anyone can read skill categories" ON skill_categories;
DROP POLICY IF EXISTS "Anyone can read skill domains" ON skill_domains;
DROP POLICY IF EXISTS "Anyone can read role skill requirements" ON role_skill_requirements;
DROP POLICY IF EXISTS "Anyone can read skill prerequisites" ON skill_prerequisites;
DROP POLICY IF EXISTS "Anyone can read skill relations" ON skill_relations;
DROP POLICY IF EXISTS "Anyone can read skill synonyms" ON skill_synonyms;

CREATE POLICY "Anyone can read skills"
  ON skills FOR SELECT
  USING (true);

CREATE POLICY "Anyone can read skill categories"
  ON skill_categories FOR SELECT
  USING (true);

CREATE POLICY "Anyone can read skill domains"
  ON skill_domains FOR SELECT
  USING (true);

CREATE POLICY "Anyone can read role skill requirements"
  ON role_skill_requirements FOR SELECT
  USING (true);

CREATE POLICY "Anyone can read skill prerequisites"
  ON skill_prerequisites FOR SELECT
  USING (true);

CREATE POLICY "Anyone can read skill relations"
  ON skill_relations FOR SELECT
  USING (true);

CREATE POLICY "Anyone can read skill synonyms"
  ON skill_synonyms FOR SELECT
  USING (true);

-- Embeddings: Public read
DROP POLICY IF EXISTS "Anyone can read candidate embeddings" ON candidate_embeddings;
DROP POLICY IF EXISTS "Anyone can read job embeddings" ON job_embeddings;

CREATE POLICY "Anyone can read candidate embeddings"
  ON candidate_embeddings FOR SELECT
  USING (true);

CREATE POLICY "Anyone can read job embeddings"
  ON job_embeddings FOR SELECT
  USING (true);

-- Step 3: Create trigger function to sync auth.users to public.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_profile_created ON auth.users;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, role, first_name, last_name, is_verified, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.user_metadata->>'role', 'job_seeker'),
    NEW.user_metadata->>'firstName',
    NEW.user_metadata->>'lastName',
    NEW.email_confirmed_at IS NOT NULL,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET
    email = EXCLUDED.email,
    role = COALESCE(NEW.user_metadata->>'role', users.role),
    first_name = COALESCE(NEW.user_metadata->>'firstName', users.first_name),
    last_name = COALESCE(NEW.user_metadata->>'lastName', users.last_name),
    is_verified = (NEW.email_confirmed_at IS NOT NULL),
    updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Create trigger on auth.users insert/update
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Step 4: Create trigger to create role-specific profiles
CREATE OR REPLACE FUNCTION public.handle_new_user_profile()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  v_role TEXT := COALESCE(NEW.user_metadata->>'role', 'job_seeker');
BEGIN
  -- Create job_seeker profile if role is job_seeker
  IF v_role = 'job_seeker' THEN
    INSERT INTO public.job_seekers (id, created_at, updated_at)
    VALUES (NEW.id, NOW(), NOW())
    ON CONFLICT (id) DO NOTHING;
  -- Create recruiter profile if role is recruiter
  ELSIF v_role = 'recruiter' THEN
    INSERT INTO public.recruiters (id, created_at, updated_at)
    VALUES (NEW.id, NOW(), NOW())
    ON CONFLICT (id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_profile_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_profile();

-- Step 5: Create trigger to sync user deletions
DROP TRIGGER IF EXISTS on_auth_user_deleted ON auth.users;

CREATE OR REPLACE FUNCTION public.handle_user_deleted()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  DELETE FROM public.users WHERE id = OLD.id;
  RETURN OLD;
END;
$$;

CREATE TRIGGER on_auth_user_deleted
  AFTER DELETE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_user_deleted();
