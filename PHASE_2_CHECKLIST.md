# PHASE 2 Setup Checklist

## ✅ What I''ve Prepared:
- [x] Updated `backend/.env` with placeholder template
- [x] Created SQL migration file: `backend/migrations/007_supabase_rls_and_triggers.sql`
- [x] Created setup guide: `SUPABASE_SETUP_GUIDE.md`

## 🔧 What You Need to Do (Manual Steps):

### Step 1: Configure Supabase Dashboard
- [ ] Go to Supabase Dashboard → Settings → API
- [ ] Copy and save your credentials
- [ ] Go to Authentication → Providers
- [ ] Enable Email (should be default)
- [ ] Toggle ON: Email OTP

### Step 2: Update Environment Variables

**Get Your Credentials from Supabase Dashboard:**

**For SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY:**
- [ ] Go to **Settings → API** in Supabase Dashboard
- [ ] Copy **Project URL** and paste it for `SUPABASE_URL`
- [ ] Copy **Anon Key** and paste it for `SUPABASE_ANON_KEY`
- [ ] Copy **Service Role Key** and paste it for `SUPABASE_SERVICE_ROLE_KEY`

**For DATABASE_URL (PostgreSQL Connection String):**
- [ ] Go to **Settings → Database** in Supabase Dashboard
- [ ] Find the **PostgreSQL Connection String** (or **Connection string**)
- [ ] It should look like: `postgresql://postgres:PASSWORD@db.REFERENCE.supabase.co:5432/postgres`
- [ ] Copy the entire connection string
- [ ] Ensure it includes `?connect_timeout=10&sslmode=require` at the end (add if missing)

**Update backend/.env:**
- [ ] Open `backend/.env`
- [ ] Paste your actual values:
  ```
  SUPABASE_URL=https://YOUR_REFERENCE.supabase.co
  SUPABASE_ANON_KEY=eyJhbGc...
  SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
  DATABASE_URL=postgresql://postgres:PASSWORD@db.YOUR_REFERENCE.supabase.co:5432/postgres?connect_timeout=10&sslmode=require
  ```
- [ ] Save the file

### Step 3: Deploy Database Schema
**Option A (Recommended):**
```bash
cd backend
pnpm run migrate
```

**Option B (Manual):**
- [ ] Go to Supabase Dashboard → SQL Editor
- [ ] Run migrations 001-006 in order
- [ ] Then run 007_supabase_rls_and_triggers.sql

### Step 4: Verify Setup
- [ ] Go to Authentication → Policies
- [ ] Verify RLS policies have green checkmarks
- [ ] Go to Database → Triggers
- [ ] Verify `on_auth_user_created` and `on_auth_user_deleted` exist

## 📋 Next Phase (I''ll handle):
Once your .env is filled in:
1. Phase 2.2: Migrate backend auth service to Supabase
2. Phase 2.3: Update frontend auth integration
3. Run test suite
4. Phase 3: Fix AI Services Tests

---

**Once you''ve completed the manual steps and updated .env, let me know and I''ll proceed with the code migration!**
