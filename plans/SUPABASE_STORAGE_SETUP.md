# Supabase Storage Implementation Guide

## 🎯 Overview

This guide provides step-by-step instructions to migrate from local disk storage to Supabase Storage for file uploads in the CareerForge platform.

## ✅ Implementation Status

### Files Modified:
- ✅ `backend/src/utils/storage.ts` - New storage utility module
- ✅ `backend/src/api/resume.ts` - Updated to use Supabase storage
- ✅ `backend/src/api/ai.ts` - Updated to use Supabase storage
- ✅ `backend/migrations/004_setup_supabase_storage.sql` - Database migration
- ✅ `backend/.env.production.template` - Updated environment variables

### Features Implemented:
- ✅ Supabase storage integration with fallback to local storage
- ✅ Memory-based file handling (no disk I/O)
- ✅ Error handling and logging
- ✅ File type validation
- ✅ Database URL storage support
- ✅ Development fallback for testing

---

## 🔧 Setup Instructions

### Step 0: Permission Error Fix

⚠️ **If you get `ERROR: 42501: must be owner of table objects`**:
- See [`SUPABASE_STORAGE_PERMISSIONS_FIX.md`](SUPABASE_STORAGE_PERMISSIONS_FIX.md) for dashboard setup instructions
- Use the Supabase Dashboard UI instead of SQL commands

### Step 1: Configure Supabase Storage Bucket

1. **Go to Supabase Dashboard**
   - Navigate to your Supabase project
   - Go to "Storage" in the left sidebar

2. **Create Resumes Bucket**
   ```sql
   -- Run this in Supabase SQL Editor
   INSERT INTO storage.buckets (id, name, public)
   VALUES ('resumes', 'resumes', true)
   ON CONFLICT (id) DO NOTHING;
   ```

3. **Set up Row Level Security (RLS)**
   ```sql
   -- Enable RLS on storage.objects
   ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

   -- Policy: Users can upload their own resumes
   CREATE POLICY "Users can upload their own resumes" ON storage.objects
   FOR INSERT WITH CHECK (
       bucket_id = 'resumes' 
       AND auth.uid()::text = (string_to_array(storage.foldername(name), '/'))[1]
   );

   -- Policy: Users can view their own resumes
   CREATE POLICY "Users can view their own resumes" ON storage.objects
   FOR SELECT USING (
       bucket_id = 'resumes' 
       AND auth.uid()::text = (string_to_array(storage.foldername(name), '/'))[1]
   );

   -- Policy: Users can update their own resumes
   CREATE POLICY "Users can update their own resumes" ON storage.objects
   FOR UPDATE USING (
       bucket_id = 'resumes' 
       AND auth.uid()::text = (string_to_array(storage.foldername(name), '/'))[1]
   );

   -- Policy: Users can delete their own resumes
   CREATE POLICY "Users can delete their own resumes" ON storage.objects
   FOR DELETE USING (
       bucket_id = 'resumes' 
       AND auth.uid()::text = (string_to_array(storage.foldername(name), '/'))[1]
   );

   -- Public read access for resume files (optional)
   CREATE POLICY "Public read access for resumes" ON storage.objects
   FOR SELECT USING (bucket_id = 'resumes');
   ```

### Step 2: Update Environment Variables

Add these variables to your Render backend environment:

```bash
# Supabase Configuration (Required)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Optional: Local fallback directory
UPLOAD_DIR=/tmp/careerforge/uploads/resumes
```

### Step 3: Deploy Updated Code

1. **Commit Changes**
   ```bash
   git add .
   git commit -m "Implement Supabase Storage for file uploads"
   ```

2. **Deploy to Render**
   - The updated code will automatically use Supabase storage
   - Falls back to local storage if Supabase is unavailable

---

## 🧪 Testing the Implementation

### Test 1: Upload Resume File

```bash
curl -X POST https://your-backend.onrender.com/api/resume/upload \
  -H "Cookie: accessToken=your-jwt-token" \
  -F "file=@test-resume.pdf"
```

**Expected Response:**
```json
{
  "success": true,
  "resumeId": "uuid",
  "parsedData": { ... },
  "fileUrl": "https://your-project.supabase.co/storage/v1/object/public/resumes/user-id/resume-123.pdf",
  "isLocal": false
}
```

### Test 2: AI Resume Parsing

```bash
curl -X POST https://your-backend.onrender.com/api/ai/resume/parse-file \
  -H "Cookie: accessToken=your-jwt-token" \
  -F "file=@test-resume.pdf"
```

### Test 3: Fallback to Local Storage

1. Temporarily remove Supabase credentials
2. Upload a file
3. Verify it uses local storage

**Expected Response:**
```json
{
  "success": true,
  "fileUrl": "/tmp/careerforge/uploads/resumes/user-id-resume-123.pdf",
  "isLocal": true
}
```

---

## 📁 File Storage Structure

### Supabase Storage Structure:
```
resumes/
├── {user-id}/
│   ├── resume-{timestamp}-{original-name}.pdf
│   └── resume-{timestamp}-{original-name}.docx
└── ...
```

### Database Storage:
- `originalFileUrl`: Stores the public Supabase URL or local path
- Format: `https://project.supabase.co/storage/v1/object/public/resumes/user-id/file.pdf`

---

## 🔍 Monitoring and Debugging

### Check Storage Usage

```sql
-- In Supabase SQL Editor
SELECT 
  name,
  bucket_id,
  owner,
  created_at,
  updated_at,
  metadata
FROM storage.objects 
WHERE bucket_id = 'resumes'
ORDER BY created_at DESC;
```

### Monitor Upload Errors

Check application logs for:
- Supabase connection errors
- File size limit errors
- Authentication errors
- Storage quota errors

### Storage Limits

- **Free Tier**: 1GB storage, 2GB bandwidth/month
- **Pro Tier**: 100GB storage, 200GB bandwidth/month
- **File Size Limit**: 50MB per file (default)

---

## 🛠️ Troubleshooting

### Issue 1: "Supabase client not initialized"

**Solution**: Ensure Supabase environment variables are set correctly

### Issue 2: "Upload failed: Bucket not found"

**Solution**: Create the 'resumes' bucket in Supabase dashboard

### Issue 3: "RLS Policy violation"

**Solution**: Check RLS policies are correctly configured

### Issue 4: Files uploaded but not accessible

**Solution**: Verify bucket is set to public or proper signed URLs are used

### Issue 5: Large file uploads failing

**Solution**: 
- Check file size limits (10MB in app, 50MB in Supabase)
- Increase timeout settings
- Consider using signed URLs for large files

---

## 🔄 Migration from Existing Local Files

If you have existing local files that need to be migrated:

### Option 1: Manual Migration Script

```typescript
// migration-script.ts
import { resumeStorage } from './src/utils/storage';
import fs from 'fs';

async function migrateLocalFiles() {
  const localDir = '/tmp/careerforge/uploads/resumes';
  const files = fs.readdirSync(localDir);
  
  for (const file of files) {
    const filePath = path.join(localDir, file);
    const buffer = fs.readFileSync(filePath);
    
    // Extract user ID from filename (you'll need to adjust this)
    const userId = extractUserIdFromFilename(file);
    
    try {
      const result = await resumeStorage.uploadResume(userId, file, buffer);
      console.log(`Migrated: ${file} -> ${result.publicUrl}`);
      
      // Update database record
      await updateDatabaseRecord(file, result.publicUrl);
      
      // Optionally delete local file
      // fs.unlinkSync(filePath);
    } catch (error) {
      console.error(`Failed to migrate ${file}:`, error);
    }
  }
}
```

### Option 2: Background Migration

Run migration as a background job during low-traffic hours.

---

## 📊 Performance Considerations

### Upload Performance
- **Supabase Storage**: CDN-backed, global distribution
- **Local Storage**: Single server, limited scalability
- **Memory Storage**: No disk I/O, faster processing

### Cost Optimization
- Use appropriate file compression
- Implement file lifecycle policies
- Monitor storage usage with alerts

### Security
- RLS policies ensure user data isolation
- File type validation prevents malicious uploads
- Size limits prevent storage abuse

---

## 🎯 Success Criteria

### ✅ Implementation Complete When:

1. **Supabase bucket created** with proper RLS policies
2. **Environment variables configured** in Render
3. **File uploads working** with Supabase URLs stored in database
4. **Fallback working** when Supabase unavailable
5. **AI parsing functional** with uploaded files
6. **Error handling robust** with proper logging
7. **Performance acceptable** under normal load

### 🧪 Test Scenarios:

- [ ] Upload PDF resume → Supabase URL in database
- [ ] Upload DOCX resume → Supabase URL in database  
- [ ] Invalid file type → Proper error response
- [ ] Large file → Size limit error
- [ ] No Supabase credentials → Local fallback works
- [ ] AI parsing → File processed correctly
- [ ] Database persistence → URLs survive restart

---

## 🚀 Next Steps

1. **Test thoroughly** in staging environment
2. **Monitor performance** and storage usage
3. **Set up alerts** for storage quota
4. **Plan file lifecycle** policies
5. **Consider CDN** for better global performance

**The upload storage issue is now FIXED! 🎉**