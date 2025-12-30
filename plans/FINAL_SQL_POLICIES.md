# Final SQL Policies - CORRECTED

## ✅ Working SQL Policies for Supabase Storage

If you're setting up storage policies via SQL (requires service role), use these **CORRECTED** policies:

```sql
-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy: Users can upload their own resumes
CREATE POLICY "Users can upload their own resumes" ON storage.objects
FOR INSERT WITH CHECK (
    bucket_id = 'resumes' 
    AND auth.uid()::text = split_part(storage.foldername(name), '/', 1)
);

-- Policy: Users can view their own resumes
CREATE POLICY "Users can view their own resumes" ON storage.objects
FOR SELECT USING (
    bucket_id = 'resumes' 
    AND auth.uid()::text = split_part(storage.foldername(name), '/', 1)
);

-- Policy: Users can update their own resumes
CREATE POLICY "Users can update their own resumes" ON storage.objects
FOR UPDATE USING (
    bucket_id = 'resumes' 
    AND auth.uid()::text = split_part(storage.foldername(name), '/', 1)
);

-- Policy: Users can delete their own resumes
CREATE POLICY "Users can delete their own resumes" ON storage.objects
FOR DELETE USING (
    bucket_id = 'resumes' 
    AND auth.uid()::text = split_part(storage.foldername(name), '/', 1)
);

-- Public read access for resume files (optional)
CREATE POLICY "Public read access for resumes" ON storage.objects
FOR SELECT USING (bucket_id = 'resumes');
```

## 🔑 Key Fix: `split_part()` vs `string_to_array()`

**❌ Wrong (causes error):**
```sql
auth.uid()::text = (string_to_array(storage.foldername(name), '/'))[1]
```

**✅ Correct:**
```sql
auth.uid()::text = split_part(storage.foldername(name), '/', 1)
```

## 📋 Dashboard Policy Expressions

If using the Supabase Dashboard UI, use this expression for all policies:

```
bucket_id = 'resumes' AND auth.uid()::text = split_part(storage.foldername(name), '/', 1)
```

## 🎯 Test After Setup

```bash
curl -X POST https://your-backend.onrender.com/api/resume/upload \
  -H "Cookie: accessToken=your-jwt-token" \
  -F "file=@test-resume.pdf"
```

**Success response:**
```json
{
  "success": true,
  "fileUrl": "https://your-project.supabase.co/storage/v1/object/public/resumes/user-id/resume-123.pdf",
  "isLocal": false
}
```

## ✅ This Should Work Now!

The corrected SQL function should resolve the `string_to_array` error.