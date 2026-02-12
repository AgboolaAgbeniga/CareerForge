# CareerForge Upload Storage Analysis

## 📋 Executive Summary

**Current Status: Files are NOT using Supabase Storage**

All file uploads in the CareerForge platform are currently using **local disk storage** via Multer, not Supabase Storage. This is a critical architectural decision that affects scalability, persistence, and deployment architecture.

---

## 🔍 Current Implementation Analysis

### 1. **Upload Endpoints Using Local Storage**

#### Backend Resume Upload (`backend/src/api/resume.ts`)
```typescript
// Uses local disk storage via Multer
const uploadDir = process.env.UPLOAD_DIR
  ? path.resolve(process.env.UPLOAD_DIR)
  : path.join(os.tmpdir(), 'careerforge', 'uploads', 'resumes');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Local disk storage
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + cleanName);
  }
});
```

#### AI Service File Upload (`backend/src/api/ai.ts`)
```typescript
// Same local storage implementation
const uploadDir = process.env.UPLOAD_DIR
  ? path.resolve(process.env.UPLOAD_DIR)
  : path.join(os.tmpdir(), 'careerforge', 'uploads', 'resumes');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Local disk storage
  },
});
```

### 2. **Database Schema - File URL Fields**

The database schema includes fields for file URLs but they're storing **local file paths**, not Supabase storage URLs:

```typescript
// backend/src/models/schema.ts
export const jobSeekers = pgTable('job_seekers', {
  // ...
  resumeFileUrl: varchar('resume_file_url', { length: 255 }), // Local path
  // ...
});

export const resumes = pgTable('resumes', {
  // ...
  originalFileUrl: varchar('original_file_url', { length: 255 }), // Local path
  // ...
});

export const applications = pgTable('applications', {
  // ...
  resumeVersionUrl: varchar('resume_version_url', { length: 255 }), // Local path
  // ...
});
```

### 3. **Current Storage Locations**

| Service | Upload Directory | Storage Type |
|---------|------------------|--------------|
| Backend API | `/tmp/careerforge/uploads/resumes` | Local Disk |
| AI Service | `/tmp/careerforge/uploads/resumes` | Local Disk |
| Database | Stores local file paths | PostgreSQL |

---

## ❌ Problems with Current Implementation

### 1. **Deployment Issues**
- **Render Ephemeral Storage**: Render's filesystem is ephemeral - files are lost on redeploy
- **No Persistence**: Uploaded files disappear when services restart
- **Scalability Problems**: Can't scale horizontally with local storage

### 2. **Production Incompatibility**
- **Temporary Directory**: Files stored in `/tmp` are not persistent
- **Service Restarts**: Files lost on service updates/restarts
- **Multiple Instances**: Can't share files between service instances

### 3. **Missing Supabase Integration**
- **Schema Has Storage Fields**: Database has `resumeFileUrl`, `originalFileUrl` fields
- **No Storage Implementation**: Code doesn't use Supabase storage
- **Documentation Mismatch**: Docs mention Supabase storage but code doesn't implement it

---

## ✅ Available Supabase Storage Infrastructure

### 1. **Dependencies Installed**
```json
{
  "@supabase/storage-js": "2.89.0"
}
```

### 2. **Database Fields Ready**
- `jobSeekers.resumeFileUrl` - Ready for Supabase storage URLs
- `resumes.originalFileUrl` - Ready for Supabase storage URLs  
- `applications.resumeVersionUrl` - Ready for Supabase storage URLs

### 3. **Documentation References**
- `SUPABASE-QUICK-REFERENCE.md` - Shows Supabase storage examples
- `README-Supabase-Hybrid.md` - References storage implementation

---

## 🔧 Recommended Solution: Migrate to Supabase Storage

### 1. **Create Supabase Storage Bucket**

```sql
-- Run in Supabase SQL editor
INSERT INTO storage.buckets (id, name, public) VALUES ('resumes', 'resumes', true);

-- Create RLS policies for resumes bucket
CREATE POLICY "Users can upload their own resumes" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'resumes' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can view their own resumes" ON storage.objects
FOR SELECT USING (bucket_id = 'resumes' AND auth.uid()::text = (storage.foldername(name))[1]);
```

### 2. **Update Upload Implementation**

```typescript
// New implementation using Supabase Storage
import { supabaseClient } from '../utils/database';

export const uploadResumeFile = async (userId: string, file: File) => {
  const fileName = `${userId}/${Date.now()}-${file.name}`;
  
  const { data, error } = await supabaseClient.storage
    .from('resumes')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) throw error;

  // Get public URL
  const { data: urlData } = supabaseClient.storage
    .from('resumes')
    .getPublicUrl(fileName);

  return {
    path: data.path,
    url: urlData.publicUrl
  };
};
```

### 3. **Update Database Schema Usage**

```typescript
// Instead of storing local paths
originalFileUrl: req.file.path // OLD - Local path

// Store Supabase storage URLs
originalFileUrl: supabaseUrl // NEW - Public storage URL
```

### 4. **Environment Variables Required**

```bash
# Add to backend environment
SUPABASE_URL=your-supabase-project-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## 📊 Migration Plan

### Phase 1: Setup Supabase Storage (1-2 hours)
1. Create `resumes` bucket in Supabase
2. Set up RLS policies
3. Test storage functionality

### Phase 2: Update Upload Code (2-3 hours)  
1. Replace Multer diskStorage with Supabase storage
2. Update all upload endpoints
3. Modify file URL handling

### Phase 3: Database Migration (1 hour)
1. Update existing records to use storage URLs
2. Test file retrieval
3. Update file deletion logic

### Phase 4: Testing & Deployment (2-3 hours)
1. Test all upload workflows
2. Verify file access and deletion
3. Deploy to production

---

## 🚀 Benefits of Supabase Storage Migration

### 1. **Production Ready**
- **Persistent Storage**: Files survive service restarts
- **CDN Distribution**: Fast file delivery globally
- **Scalability**: Works with multiple service instances

### 2. **Enhanced Security**
- **RLS Policies**: Row-level security for file access
- **Signed URLs**: Secure time-limited access
- **Access Control**: User-specific file permissions

### 3. **Better Developer Experience**
- **Public URLs**: Easy file sharing and access
- **Automatic Optimization**: Image resizing and optimization
- **Storage Analytics**: Usage monitoring and limits

### 4. **Cost Effective**
- **Free Tier**: 1GB storage, 2GB bandwidth/month
- **Predictable Pricing**: Clear usage-based costs
- **No Infrastructure Management**: Supabase handles scaling

---

## ⚠️ Immediate Action Required

### **Current Production Issue**
**Files uploaded to Render will be LOST on redeployment!** This is a critical data loss risk.

### **Quick Fix Options**

#### Option 1: Immediate Supabase Migration (Recommended)
- Migrate to Supabase storage now
- 4-6 hours implementation time
- Production-ready solution

#### Option 2: Temporary Local Storage Fix
- Configure persistent volume in Render
- Buy time for Supabase migration
- Still not scalable long-term

#### Option 3: Hybrid Approach  
- Keep local storage for development
- Use Supabase for production only
- More complex but flexible

---

## 📋 Implementation Checklist

### Pre-Migration
- [ ] Backup existing upload functionality
- [ ] Set up Supabase storage bucket
- [ ] Test storage API locally

### Migration
- [ ] Update upload endpoints
- [ ] Modify file URL handling
- [ ] Update database schema usage
- [ ] Test file deletion

### Post-Migration
- [ ] Verify all upload workflows
- [ ] Test file access and sharing
- [ ] Monitor storage usage
- [ ] Update documentation

### Deployment
- [ ] Deploy to staging environment
- [ ] Test with real file uploads
- [ ] Deploy to production
- [ ] Monitor for issues

---

## 🎯 Conclusion

**The CareerForge platform is currently NOT using Supabase Storage** and relies on local disk storage which is **unsuitable for production deployment** on Render. 

**Immediate action is required** to either:
1. **Migrate to Supabase Storage** (recommended) for production-ready file handling
2. **Implement persistent storage** as an interim solution

The infrastructure for Supabase storage is partially in place (dependencies, schema fields, documentation) but the actual implementation is missing. This represents a significant gap between the documented architecture and the running code.

**Priority: HIGH** - File uploads will fail in production without proper storage solution.