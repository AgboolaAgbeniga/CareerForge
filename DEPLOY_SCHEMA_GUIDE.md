# Deploying CareerForge Schema to Supabase - Quick Guide

## ✅ Follow These Steps in Supabase SQL Editor

### Step 1: Create Tables (Migration 001)
1. Go to **SQL Editor** in Supabase Dashboard
2. Click **New Query**
3. **Copy and paste** the entire contents of: `backend/migrations/001_initial_schema.sql`
4. Click **Run** (blue button)
5. ✅ Wait for success (no red errors)

### Step 2-6: Run Additional Migrations
Repeat for each file in order:
- `backend/migrations/002_seed_data.sql`
- `backend/migrations/003_add_onboarding_completed.sql`
- `backend/migrations/004_setup_supabase_storage.sql`
- `backend/migrations/005_schema_fixes.sql`
- `backend/migrations/006_pgvector_embeddings.sql`

**For each file:**
1. Click **New Query** 
2. Copy/paste the entire file contents
3. Click **Run**
4. Verify no errors (red text)

### Step 7: Deploy RLS & Triggers (Migration 007)
Once all 6 migrations complete:
1. Click **New Query**
2. Copy/paste: `backend/migrations/007_supabase_rls_and_triggers.sql`
3. Click **Run**
4. ✅ Verify all RLS policies are enabled

---

## ✅ Verify the Deployment

After all migrations complete:
1. Go to **Database** (left sidebar)
2. Click **Tables**
3. Verify you see tables like: users, jobs, applications, resumes, etc.
4. Go to **Authentication** → **Policies**
5. Verify RLS policies have green checkmarks

---

## Troubleshooting

| Error | Solution |
|-------|----------|
| "relation X already exists" | OK - just means table was created. Continue. |
| "ERROR: 42P01: relation X does not exist" | Run previous migrations first (in order) |
| "ERROR: syntax error" | Check the SQL file was pasted completely (no truncation) |

---

## Once Complete

Once all 7 migrations succeed:
- ✅ Database schema is deployed
- ✅ RLS policies are active
- ✅ Auth trigger is ready
- ✅ Ready for Phase 2.2 (Auth Service Migration)

Let me know once you''ve completed all migrations!
