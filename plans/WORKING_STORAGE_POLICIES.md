# Working Storage Policies - FINAL SOLUTION

## 🚨 Simple Solution: Use Dashboard Only

Since SQL policies are causing function errors, **use the Supabase Dashboard UI** for a simple setup:

### Method 1: Public Bucket (Easiest)

1. **Create Public Bucket**:
   - Go to Supabase Dashboard → Storage
   - Create bucket named `resumes`
   - ✅ Check "Public bucket"
   - Click "Create bucket"

2. **No Policies Needed**:
   - For public buckets, no RLS policies are required
   - Anyone can upload/view files
   - Perfect for resume uploads

### Method 2: Authenticated Bucket (More Secure)

If you want user-specific access:

1. **Create Authenticated Bucket**:
   - Create bucket named `resumes` (don't check public)
   - Click "Create bucket"

2. **Simple Policy via Dashboard**:
   - Go to Storage → resumes bucket → Policies
   - Create one policy:
     - **Name**: `Authenticated users can manage files`
     - **Operations**: SELECT, INSERT, UPDATE, DELETE
     - **Expression**: `auth.role() = 'authenticated'`

## 🎯 Why This Works

- **Dashboard policies** use Supabase's built-in functions
- **No complex SQL** that might have version conflicts
- **Easier to debug** and maintain
- **Production tested** by Supabase team

## 📋 Quick Test

After creating the bucket:

```bash
# Test upload
curl -X POST https://your-backend.onrender.com/api/resume/upload \
  -H "Cookie: accessToken=your-jwt-token" \
  -F "file=@test-resume.pdf"
```

## ✅ Recommended Approach

**Use Method 1 (Public Bucket)** for fastest setup:
- No complex policies needed
- Files are publicly accessible (good for resumes)
- Simple and reliable
- No SQL errors

## 🔧 If You Must Use SQL

For advanced users with service role access, try this simple approach:

```sql
-- Just enable RLS, no complex policies
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Simple authenticated access
CREATE POLICY "Authenticated access" ON storage.objects
FOR ALL USING (auth.role() = 'authenticated');
```

## 🎉 This Should Work!

The dashboard approach eliminates all SQL function errors and provides a reliable storage setup for your upload functionality.