# Supabase Migration Deployment Guide

## Status: ⚠️ Migration Not Yet Deployed

The auth tests are failing because the Supabase migration hasn't been successfully deployed. Follow these steps to deploy it:

---

## Step 1: Go to Supabase Dashboard

1. Open https://app.supabase.com
2. Login to your account
3. Select your **CareerForge** project

---

## Step 2: Open SQL Editor

1. In the left sidebar, click **SQL Editor**
2. Click **New Query** (or **+** button)

---

## Step 3: Copy the Migration SQL

The migration file is at:
```
backend/migrations/007_supabase_rls_and_triggers.sql
```

Copy the **entire contents** of this file.

---

## Step 4: Paste into Supabase

1. In the SQL Editor, paste the entire migration SQL
2. You should see the SQL code in the editor

---

## Step 5: Run the Migration

1. Click the **Run** button (or press `Ctrl+Enter`)
2. Wait for the execution to complete (30-60 seconds)

---

## Step 6: Check for Success

**Success looks like:**
```
Query succeeded
Execution time: 2.5s
```

**Error looks like:**
```
ERROR: ...
```

---

## What the Migration Does

✅ Creates enum type for user roles (if it doesn't exist)  
✅ Enables RLS on all tables  
✅ Drops old policies and recreates them cleanly  
✅ Creates trigger to sync auth.users → public.users  
✅ Creates trigger to auto-create role-specific profiles (job_seeker/recruiter)  
✅ Drops old triggers and recreates them cleanly  

---

## Troubleshooting

### ❌ Error: "policy already exists"
**Solution:** The migration now handles this with `DROP POLICY IF EXISTS`. Run it again.

### ❌ Error: "type user_role does not exist"
**Solution:** The migration now creates the enum in Step 0. Run it again.

### ❌ Error: "trigger already exists"
**Solution:** The migration now drops triggers before creating them. Run it again.

### ❌ Nothing happens / Hangs
**Solution:** 
1. Refresh the page
2. Create a new query
3. Try running a simple test query first: `SELECT 1;`

---

## Verify Deployment

After running the migration, verify it worked:

### Check Triggers Exist

Run this query in Supabase SQL Editor:

```sql
SELECT 
  trigger_name,
  event_manipulation,
  event_object_table
FROM information_schema.triggers
WHERE trigger_schema = 'public'
AND event_object_table = 'users'
ORDER BY trigger_name;
```

**Expected results:**
```
trigger_name              | event_manipulation | event_object_table
--------------------------|-------------------|-------------------
on_auth_user_created      | INSERT OR UPDATE   | users
on_auth_user_profile_created | INSERT          | users
on_auth_user_deleted      | DELETE             | users
```

### Check RLS is Enabled

Run this query:

```sql
SELECT 
  schemaname,
  tablename,
  rowsecurity
FROM pg_tables
WHERE tablename IN ('users', 'job_seekers', 'recruiters')
ORDER BY tablename;
```

**Expected results:**
```
tablename   | rowsecurity
------------|-------------
job_seekers | t
recruiters  | t
users       | t
```

All should have `rowsecurity = t` (true).

---

## After Migration is Deployed

Once the migration is successfully deployed:

1. **Restart the backend:**
   ```bash
   # Kill existing processes
   pkill -f "node"
   
   # Start fresh
   cd backend
   npm run dev
   ```

2. **Run the auth test:**
   ```bash
   /tmp/auth_test2.sh
   ```

3. **Expected results:**
   ```
   ✅ Signup successful
   ✅ Login successful
   ✅ Profile fetch successful
   ✅ Logout successful
   ```

---

## Still Having Issues?

Check the Supabase logs:

1. Go to Supabase Dashboard → Logs
2. Look for errors in the past few minutes
3. Check if the trigger functions are running

---

## Need Help?

If stuck:
1. Check the SQL Editor query history
2. Copy the exact error message
3. Verify all tables exist: `SELECT * FROM information_schema.tables WHERE table_schema = 'public';`

