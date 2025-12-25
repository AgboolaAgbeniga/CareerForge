# CareerForge Supabase Setup Instructions

## Current Status
✅ Supabase configuration is correct  
❌ Database schema not created yet  

## Quick Fix: Run Database Migration

You need to create the database tables in your Supabase database. Here's how:

### Step 1: Open Supabase Dashboard
Go to: https://jplxlgsrjxcksantcgnp.supabase.co

### Step 2: Access SQL Editor
1. Click **"SQL Editor"** in the left sidebar
2. Click **"New Query"** button

### Step 3: Run the Migration
1. **Copy the entire contents** of the file: `backend/supabase-schema.sql`
2. **Paste it** into the SQL Editor
3. **Click "Run"** to execute the SQL

### Step 4: Verify Success
You should see messages like:
- `CREATE TABLE`
- `CREATE INDEX`
- `ALTER TABLE`

## What This Creates
The migration will create these tables:
- `users` - Core user information
- `job_seekers` - Job seeker profiles  
- `recruiters` - Recruiter profiles
- `companies` - Company data
- `jobs` - Job postings
- `applications` - Job applications
- `messages` - User messaging
- `notifications` - System notifications
- `analytics_events` - Analytics tracking
- `experiments` - A/B testing

## After Running the Migration

### Test Your Setup
```bash
cd backend
node test-supabase.js
```

You should see:
```
✅ Supabase connection successful!
✅ Database accessible
🎉 All tests passed! Supabase integration is working correctly.
```

### Alternative: Test Basic Connection First
If you want to test just the Supabase connection without database:
```bash
cd backend
node test-supabase-simple.js
```

## Troubleshooting

### Still Getting "Invalid Schema" Error?
- Make sure you clicked "Run" in the SQL Editor
- Check that the query completed successfully
- Try refreshing the Supabase dashboard and running again

### Database Connection Issues?
1. **Check your `.env` file** has the correct Supabase credentials
2. **Get your database password** from Supabase Dashboard → Settings → Database
3. **Update DATABASE_URL** in `.env` with your actual password

### Need Help?
- Check the Supabase documentation: https://supabase.com/docs
- Review the logs in Supabase Dashboard → Logs

## What Happens Next
Once the migration is complete:
1. ✅ Your database will have all the required tables
2. ✅ Authentication will work with Supabase Auth
3. ✅ Your custom user profiles and business logic will be preserved
4. ✅ You can start the backend server: `npm run dev`

---
**Status**: 🔧 Database migration required to complete setup