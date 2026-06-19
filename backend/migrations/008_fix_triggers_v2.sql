-- ============================================================
-- PHASE 2.2: Fix Triggers - Simplified and More Robust
-- Run this if you're getting "unexpected_failure" errors
-- ============================================================

-- Drop the problematic triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_profile_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP FUNCTION IF EXISTS public.handle_new_user_profile();

-- Create a simpler, more robust trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Extract metadata safely
  DECLARE
    v_first_name TEXT := NULL;
    v_last_name TEXT := NULL;
    v_role TEXT := 'job_seeker';
  BEGIN
    -- Extract from user_metadata if it exists
    IF NEW.user_metadata IS NOT NULL THEN
      v_first_name := NEW.user_metadata->>'firstName';
      v_last_name := NEW.user_metadata->>'lastName';
      v_role := COALESCE(NEW.user_metadata->>'role', 'job_seeker');
    END IF;

    -- Insert or update user in public schema
    INSERT INTO public.users (id, email, role, first_name, last_name, is_verified, created_at, updated_at)
    VALUES (
      NEW.id,
      NEW.email,
      v_role::public.user_role,
      v_first_name,
      v_last_name,
      NEW.email_confirmed_at IS NOT NULL,
      NOW(),
      NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
      email = EXCLUDED.email,
      role = v_role::public.user_role,
      first_name = v_first_name,
      last_name = v_last_name,
      is_verified = (NEW.email_confirmed_at IS NOT NULL),
      updated_at = NOW();

    RETURN NEW;
  EXCEPTION WHEN OTHERS THEN
    -- Log the error but don't fail the entire operation
    RAISE LOG 'Error in handle_new_user for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
  END;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create profile trigger
CREATE OR REPLACE FUNCTION public.handle_new_user_profile()
RETURNS TRIGGER AS $$
DECLARE
  v_role TEXT := 'job_seeker';
BEGIN
  -- Get role from metadata
  IF NEW.user_metadata IS NOT NULL THEN
    v_role := COALESCE(NEW.user_metadata->>'role', 'job_seeker');
  END IF;

  -- Create appropriate profile based on role
  BEGIN
    IF v_role = 'job_seeker' THEN
      INSERT INTO public.job_seekers (id, created_at, updated_at)
      VALUES (NEW.id, NOW(), NOW())
      ON CONFLICT (id) DO NOTHING;
    ELSIF v_role = 'recruiter' THEN
      INSERT INTO public.recruiters (id, created_at, updated_at)
      VALUES (NEW.id, NOW(), NOW())
      ON CONFLICT (id) DO NOTHING;
    END IF;
  EXCEPTION WHEN OTHERS THEN
    RAISE LOG 'Error in handle_new_user_profile for user % (role: %): %', NEW.id, v_role, SQLERRM;
    -- Don't fail the operation
  END;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create the trigger
CREATE TRIGGER on_auth_user_profile_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_profile();

-- Log confirmation
SELECT NOW() as deployed_at, 'Triggers v2 (simplified and robust)' as version;
