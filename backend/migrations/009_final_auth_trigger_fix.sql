-- Drop any old triggers to be safe
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_profile_created ON auth.users;

-- 1. Main User Trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  BEGIN
    INSERT INTO public.users (id, email, role, first_name, last_name, is_verified, created_at, updated_at)
    VALUES (
      NEW.id,
      NEW.email,
      COALESCE(NEW.raw_user_meta_data->>'role', 'job_seeker')::public.user_role,
      NEW.raw_user_meta_data->>'firstName',
      NEW.raw_user_meta_data->>'lastName',
      NEW.email_confirmed_at IS NOT NULL,
      NOW(),
      NOW()
    )
    ON CONFLICT (id) DO UPDATE SET
      email = EXCLUDED.email,
      role = COALESCE(NEW.raw_user_meta_data->>'role', 'job_seeker')::public.user_role,
      first_name = NEW.raw_user_meta_data->>'firstName',
      last_name = NEW.raw_user_meta_data->>'lastName',
      is_verified = (NEW.email_confirmed_at IS NOT NULL),
      updated_at = NOW();
  EXCEPTION WHEN OTHERS THEN
    RAISE LOG 'handle_new_user error for user %: %', NEW.id, SQLERRM;
  END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 2. Profile Trigger
CREATE OR REPLACE FUNCTION public.handle_new_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  BEGIN
    IF COALESCE(NEW.raw_user_meta_data->>'role', 'job_seeker') = 'job_seeker' THEN
      INSERT INTO public.job_seekers (id, created_at, updated_at)
      VALUES (NEW.id, NOW(), NOW())
      ON CONFLICT (id) DO NOTHING;
    ELSE
      INSERT INTO public.recruiters (id, created_at, updated_at)
      VALUES (NEW.id, NOW(), NOW())
      ON CONFLICT (id) DO NOTHING;
    END IF;
  EXCEPTION WHEN OTHERS THEN
    RAISE LOG 'handle_new_user_profile error for user %: %', NEW.id, SQLERRM;
  END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_profile_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_profile();
