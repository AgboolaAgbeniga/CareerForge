# Supabase Setup Guide for CareerForge

## Phase 2.0 & 2.1 Manual Configuration

Follow these steps to configure your Supabase project for CareerForge.

---

## Step 1: Collect Supabase Credentials

### 1.1: Get SUPABASE_URL, SUPABASE_ANON_KEY, and SUPABASE_SERVICE_ROLE_KEY

1. Open your Supabase Dashboard
2. Go to **Settings → API**
3. You'll see these three values:
   - **Project URL** → Copy this for `SUPABASE_URL`
   - **Anon Key** → Copy this for `SUPABASE_ANON_KEY`
   - **Service Role Key** → Copy this for `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

### 1.2: Get DATABASE_URL (PostgreSQL Connection String)

The DATABASE_URL follows this format:
```
postgresql://postgres:PASSWORD@db.REFERENCE.supabase.co:5432/postgres?connect_timeout=10&sslmode=require
```

**To construct your DATABASE_URL:**

1. In Supabase Dashboard, go to **Settings → Database**
2. Look for **Connection string** section
3. You should see something like:
   ```
   postgresql://postgres:YOUR_PASSWORD_HERE@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
   ```
4. Copy that connection string, OR manually build it:

**Manual Construction:**
- `postgres` = Always "postgres" (the default user)
- `PASSWORD` = The database password you set when creating the project
- `db.REFERENCE.supabase.co` = Your database host (find it in Settings → Database or Settings → API)
  - The REFERENCE is visible in your project URL: `https://REFERENCE.supabase.co`

**Example:**
If your project URL is `https://abcxyz123.supabase.co` and your password is `MySecurePassword123`

Then your DATABASE_URL would be:
```
postgresql://postgres:MySecurePassword123@db.abcxyz123.supabase.co:5432/postgres?connect_timeout=10&sslmode=require
```

### 1.3: Update backend/.env

1. Open `backend/.env`
2. Replace these lines with your actual values:
   ```env
   SUPABASE_URL=https://YOUR_PROJECT_REFERENCE.supabase.co
   SUPABASE_ANON_KEY=eyJhbGc... (paste your anon key here)
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (paste your service role key here)
   DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@db.YOUR_REFERENCE.supabase.co:5432/postgres?connect_timeout=10&sslmode=require
   ```

3. Save the file

---

## Step 2: Enable Authentication Providers

In Supabase Dashboard:

1. Go to **Authentication → Providers**
2. Ensure **Email** is enabled (default)
3. **Toggle ON: Email OTP** for passwordless option
4. Go to **Authentication → Email Templates**
5. Update confirmation email with your branding (optional but recommended)

---

## Step 3: Deploy Database Schema

You'll need to run SQL migrations in Supabase. Two options:

### Option A: Using Drizzle Kit (Recommended if you have drizzle set up)

```bash
cd backend
pnpm run migrate
```

### Option B: Manual SQL in Supabase Editor

1. Go to **SQL Editor** in Supabase Dashboard
2. Create a new query
3. Copy the schema from `backend/migrations/` files (001-006)
4. Run them in order
5. Then run `backend/migrations/007_supabase_rls_and_triggers.sql`

---

## Step 4: Enable Row Level Security (RLS)

**In Supabase Dashboard → SQL Editor:**

1. Create a new query
2. Copy the entire contents of `backend/migrations/007_supabase_rls_and_triggers.sql`
3. Click **Run**
4. Wait for completion (you''ll see "Success" messages)

This will:
- Enable RLS on all tables
- Create security policies for users, jobs, applications, etc.
- Create triggers to sync auth.users with public.users table

---

## Step 5: Verify RLS Setup

In Supabase Dashboard:

1. Go to **Authentication → Policies**
2. For each table, verify green checkmark appears
3. Go to **Database → Triggers**
4. Verify `on_auth_user_created` and `on_auth_user_deleted` exist

---

## Step 6: Test Database Connection

From your backend directory:

```bash
cd backend
npm install
npm run build
```

If successful, TypeScript should compile without errors.

---

## Step 7: Configure Frontend (Phase 2.3)

Once backend is ready, frontend needs Supabase client:

1. Create `frontend/.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=[your SUPABASE_URL]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your SUPABASE_ANON_KEY]
```

2. Frontend will auto-detect these and initialize Supabase client

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "PostgreSQL connection refused" | Check that DB URL includes correct password and region |
| "RLS policies not showing" | Run 007_supabase_rls_and_triggers.sql again in SQL Editor |
| "Auth table doesn''t exist" | Ensure schema migrations (001-006) ran successfully first |
| "Token verification fails" | Verify SUPABASE_SERVICE_ROLE_KEY is correct (not anon key) |
| "Users not syncing to users table" | Check that trigger `on_auth_user_created` exists and is enabled |

---

## Next Steps

Once Supabase is configured:

1. ✅ Phase 2.1 complete
2. → Phase 2.2: Migrate backend auth service to Supabase
3. → Phase 2.3: Update frontend auth integration
4. → Run full test suite
5. → Phase 3: Fix AI Services Tests

---

## Documentation References

- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase Triggers](https://supabase.com/docs/guides/database/extensions/plpgsql)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
