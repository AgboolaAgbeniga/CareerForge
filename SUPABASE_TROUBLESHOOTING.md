# Supabase Auth Error: "unexpected_failure" (500)

## Error Details

```
Code: unexpected_failure
Status: 500
```

## Root Cause Analysis

The Supabase auth service is throwing an internal server error when trying to create a user. This is typically caused by:

1. **Trigger failure** - The `handle_new_user()` trigger is failing
2. **RLS policy violation** - The trigger can't insert into public.users due to RLS
3. **Schema mismatch** - Column types or constraints don't match
4. **Supabase service issue** - Temporary infrastructure problem

## Debugging Steps

### Step 1: Check Supabase Logs

1. Go to Supabase Dashboard
2. Click **Logs** in the left sidebar
3. Look for recent errors (last 5 minutes)
4. Check PostgreSQL logs for trigger errors

### Step 2: Test Trigger Directly

Run this in Supabase SQL Editor to test the trigger manually:

```sql
-- Test the handle_new_user function manually
SELECT public.handle_new_user(
  jsonb_build_object(
    'id', gen_random_uuid(),
    'email', 'test@example.com',
    'email_confirmed_at', NOW(),
    'user_metadata', jsonb_build_object(
      'firstName', 'Test',
      'lastName', 'User',
      'role', 'job_seeker'
    )
  )::auth.users
);
```

### Step 3: Check RLS Policies

Verify the RLS policy on the `users` table isn't blocking service role:

```sql
-- Check policies on users table
SELECT policy_name, definition
FROM pg_policies
WHERE tablename = 'users'
ORDER BY policy_name;
```

Expected output should show the policies we created.

### Step 4: Check Trigger Status

Verify the trigger exists and is enabled:

```sql
SELECT 
  trigger_name,
  event_manipulation,
  event_object_table,
  action_orientation,
  action_timing
FROM information_schema.triggers
WHERE trigger_schema = 'public'
AND event_object_table = 'users';
```

### Step 5: Test User Insert Directly

Try inserting into the users table directly to see if it's a trigger issue:

```sql
-- This will fail with RLS, but should give us the RLS error, not a 500
INSERT INTO public.users (id, email, role)
VALUES (gen_random_uuid(), 'test@example.com', 'job_seeker');
```

## Possible Solutions

### Solution 1: Simplify the Trigger

If the trigger is too complex, simplify it:

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Simple version
  INSERT INTO public.users (id, email, role, is_verified, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    'job_seeker',
    NEW.email_confirmed_at IS NOT NULL,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
EXCEPTION WHEN OTHERS THEN
  RAISE LOG 'Error in handle_new_user: %', SQLERRM;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Solution 2: Add Better Error Handling

Modify the trigger to log errors instead of failing:

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  BEGIN
    INSERT INTO public.users (id, email, role, first_name, last_name, is_verified, created_at, updated_at)
    VALUES (...)
    ON CONFLICT (id) DO UPDATE
    SET ...;
  EXCEPTION WHEN OTHERS THEN
    RAISE LOG 'handle_new_user error for user %: %', NEW.id, SQLERRM;
    -- Don't fail, let the auth user be created
    RETURN NEW;
  END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### Solution 3: Check Supabase Status

1. Go to https://status.supabase.com
2. Check if there are any ongoing incidents
3. Wait if there's a known issue

### Solution 4: Recreate the Database

As a last resort, if everything looks correct but still fails:

1. Back up your data
2. Delete the triggers and recreate them
3. Or create a fresh Supabase project and migrate data

## Quick Test

Try this simpler registration without the metadata:

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "simpletest@example.com",
    "password": "TestPass123!",
    "firstName": "Simple",
    "lastName": "Test",
    "role": "job_seeker"
  }'
```

If this fails with the same error, it's not the metadata extraction but something deeper.

## Contact Supabase Support

If nothing works:

1. Go to Supabase Dashboard
2. Click **Help** → **Support**
3. Describe the error: "Auth service returns 'unexpected_failure' when creating users"
4. Provide the Supabase logs

---

## Next Steps

1. Check Supabase logs for the actual error
2. Run the trigger test query above
3. Verify all policies are correct
4. If still broken, try the simplified trigger
