# Supabase Credentials: Where to Find Everything

This guide shows you exactly where to find each value in the Supabase Dashboard.

---

## Finding SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY

### Location: Settings → API

1. **Open Supabase Dashboard**
2. Click on your project (CareerForge)
3. Go to **Settings** (bottom left sidebar)
4. Click on **API** tab
5. You''ll see this section:

```
┌─────────────────────────────────────────────────────────┐
│ API Settings                                             │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ Project URL:                                             │
│ https://YOUR_REFERENCE.supabase.co  ← COPY THIS         │
│ [Copy button]                                            │
│                                                          │
│ Anon Key (public, safe for browsers):                   │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ... ← COPY THIS    │
│ [Copy button]                                            │
│                                                          │
│ Service Role Key (SECRET - keep private):              │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ... ← COPY THIS    │
│ [Copy button]                                            │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

**What to copy:**
- `SUPABASE_URL` = The Project URL (e.g., https://abcxyz123.supabase.co)
- `SUPABASE_ANON_KEY` = The entire Anon Key (starts with eyJhbGc...)
- `SUPABASE_SERVICE_ROLE_KEY` = The entire Service Role Key (starts with eyJhbGc...)

---

## Finding DATABASE_URL

### Location: Settings → Database

1. **Open Supabase Dashboard**
2. Go to **Settings** (bottom left)
3. Click on **Database** tab
4. You''ll see something like this:

```
┌────────────────────────────────────────────────────────────┐
│ Database Settings                                           │
├────────────────────────────────────────────────────────────┤
│                                                             │
│ Connection String (URI):                                   │
│ ┌──────────────────────────────────────────────────────┐  │
│ │ postgresql://postgres:PASSWORD@db.abcxyz123.sup...   │  │
│ │ [Copy button]                                         │  │
│ └──────────────────────────────────────────────────────┘  │
│                                                             │
│ Host:        db.abcxyz123.supabase.co                     │
│ User:        postgres                                      │
│ Password:    YOUR_PASSWORD (you set this)                 │
│ Port:        5432                                          │
│ Database:    postgres                                      │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

**What to copy:**
- Copy the entire **Connection String (URI)**
- It should look like: `postgresql://postgres:PASSWORD@db.YOUR_REFERENCE.supabase.co:5432/postgres`
- If it doesn''t end with `?connect_timeout=10&sslmode=require`, add that to the end

---

## Complete Example

Let''s say you created a project named "CareerForge" in the us-east-1 region with password "MyPassword123"

### Your credentials would be:

```
SUPABASE_URL=https://abcxyz123.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY3h5ejEyMyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzgxMjQ0ODk5LCJleHAiOjIwOTY4MjA4OTl9.f37oAJg2Fz4v8aNmQuJc7E1pu2buN5yFLGyb4RezdUI
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY3h5ejEyMyIsInJvbGUiOiJzZXJ2aWNlX3JvbGUiLCJpYXQiOjE3ODEyNDQ4OTksImV4cCI6MjA5NjgyMDg5OX0.lrsKal1XD_jBI50ms57VIvODiYsCcJlmZgR4hspenq8
DATABASE_URL=postgresql://postgres:MyPassword123@db.abcxyz123.supabase.co:5432/postgres?connect_timeout=10&sslmode=require
```

### Your backend/.env would have:

```env
# Supabase Configuration
# Get these from your Supabase project dashboard > Settings > API
SUPABASE_URL=https://abcxyz123.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY3h5ejEyMyIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzgxMjQ0ODk5LCJleHAiOjIwOTY4MjA4OTl9.f37oAJg2Fz4v8aNmQuJc7E1pu2buN5yFLGyb4RezdUI
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY3h5ejEyMyIsInJvbGUiOiJzZXJ2aWNlX3JvbGUiLCJpYXQiOjE3ODEyNDQ4OTksImV4cCI6MjA5NjgyMDg5OX0.lrsKal1XD_jBI50ms57VIvODiYsCcJlmZgR4hspenq8

# Database Configuration (PostgreSQL connection string for Supabase)
DATABASE_URL=postgresql://postgres:MyPassword123@db.abcxyz123.supabase.co:5432/postgres?connect_timeout=10&sslmode=require
```

---

## DATABASE_URL Breakdown

The DATABASE_URL has several parts:

```
postgresql://postgres:MyPassword123@db.abcxyz123.supabase.co:5432/postgres?connect_timeout=10&sslmode=require
│            │         │                │                           │    │       │
│            │         │                │                           │    │       └─ Options (keep as-is)
│            │         │                │                           │    └────────── Database name (always "postgres")
│            │         │                │                           └───────────── Port (always 5432)
│            │         │                └──────────────────────────────────────── Host (db.YOUR_REFERENCE.supabase.co)
│            │         └──────────────────────────────────────────────────────── Password (what you set)
│            └────────────────────────────────────────────────────────────────── User (always "postgres")
└──────────────────────────────────────────────────────────────────────────────── Protocol (always "postgresql://")
```

---

## Common Issues

| Problem | Solution |
|---------|----------|
| "Connection refused" when building | Check DATABASE_URL has correct password |
| "Invalid credentials" | Verify Service Role Key is pasted correctly (not Anon Key) |
| "Host not found" | Check db.YOUR_REFERENCE.supabase.co is correct |
| Don''t know my password | Go to Supabase → Settings → Database → "Reset Password" |

---

## Ready to Proceed?

Once you''ve copied all four values into `backend/.env` and saved it, let me know and I''ll:
1. Run database migrations
2. Deploy RLS policies
3. Migrate auth service to Supabase
4. Run tests
