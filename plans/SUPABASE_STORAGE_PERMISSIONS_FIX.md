# Supabase Storage Permissions Fix

## 🚨 Permission Error Solution

If you get the error `ERROR: 42501: must be owner of table objects`, this means you need to configure storage through the Supabase Dashboard UI instead of SQL commands.

## ✅ Solution: Use Supabase Dashboard (Recommended)

### Method 1: Create Bucket via Dashboard

1. **Go to Supabase Dashboard**
   - Navigate to your project
   - Click "Storage" in left sidebar

2. **Create Bucket**
   - Click "Create a new bucket"
   - Name: `resumes`
   - Check "Public bucket" ✅
   - Click "Create bucket"

### Method 2: Set up Policies via Dashboard

1. **Go to Storage Policies**
   - Click on your "resumes" bucket
   - Click "Policies" tab

2. **Create RLS Policies** (Use the UI to create these):

   **Policy 1: Allow users to upload their own files**
   - Policy name: `Users can upload their own resumes`
   - Check: `INSERT`
   - Using expression:
   ```sql
   bucket_id = 'resumes' AND auth.uid()::text = split_part(storage.foldername(name), '/', 1)
   ```

   **Policy 2: Allow users to view their own files**
   - Policy name: `Users can view their own resumes`
   - Check: `SELECT`
   - Using expression:
   ```sql
   bucket_id = 'resumes' AND auth.uid()::text = split_part(storage.foldername(name), '/', 1)
   ```

   **Policy 3: Allow users to update their own files**
   - Policy name: `Users can update their own resumes`
   - Check: `UPDATE`
   - Using expression:
   ```sql
   bucket_id = 'resumes' AND auth.uid()::text = split_part(storage.foldername(name), '/', 1)
   ```

   **Policy 4: Allow users to delete their own files**
   - Policy name: `Users can delete their own resumes`
   - Check: `DELETE`
   - Using expression:
   ```sql
   bucket_id = 'resumes' AND auth.uid()::text = split_part(storage.foldername(name), '/', 1)
   ```

   **Policy 5: Public read access (Optional)**
   - Policy name: `Public read access for resumes`
   - Check: `SELECT`
   - Using expression:
   ```sql
   bucket_id = 'resumes'
   ```

## 🔧 Alternative: Service Role Method (Advanced)

If you have service role access, you can run SQL commands:

```sql
-- Connect with service role key and run:
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true)
ON CONFLICT (id) DO NOTHING;

-- Then set up RLS policies
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create policies (same as above)
```

## ✅ Verification

After setting up via dashboard:

1. **Check bucket exists**:
   - Go to Storage in dashboard
   - You should see "resumes" bucket

2. **Test upload**:
   - Use the API endpoint
   - Files should upload successfully
   - Check file appears in storage dashboard

## 🎯 Quick Test Commands

Test the setup with these commands:

```bash
# Test upload (replace with your backend URL)
curl -X POST https://your-backend.onrender.com/api/resume/upload \
  -H "Cookie: accessToken=your-jwt-token" \
  -F "file=@test-resume.pdf"

# Check if file appears in Supabase dashboard
# Go to Storage → resumes bucket
```

## 🚀 No Changes Required to Code

The storage implementation code is already correct and will work with:
- ✅ Dashboard-created buckets
- ✅ Dashboard-configured policies
- ✅ Service role SQL setup

**Your upload functionality will work once the bucket and policies are set up in the Supabase dashboard!**