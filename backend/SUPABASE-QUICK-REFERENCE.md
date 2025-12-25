# Supabase Quick Reference Guide

## When to Use Each Approach

### 🗄️ **Database Operations** → Drizzle ORM + PostgreSQL

```typescript
import { db } from '../utils/database';
import { users, jobs, applications } from '../models/schema';
import { eq, and } from 'drizzle-orm';

// ✅ User profiles, job listings, applications
const userJobs = await db.select()
  .from(jobs)
  .where(eq(jobs.recruiterId, userId));

// ✅ Complex queries with joins
const jobApplications = await db.select({
  job: jobs,
  application: applications,
  applicant: users
})
.from(applications)
.leftJoin(jobs, eq(applications.jobId, jobs.id))
.leftJoin(users, eq(applications.jobSeekerId, users.id))
.where(eq(jobs.recruiterId, userId));

// ✅ Aggregations and analytics
const stats = await db.select({
  totalJobs: count(jobs.id),
  activeJobs: count(jobs.id).filterWhere(eq(jobs.status, 'open')),
  totalApplications: count(applications.id)
})
.from(jobs)
.leftJoin(applications, eq(jobs.id, applications.jobId))
.where(eq(jobs.recruiterId, userId));
```

### 🔐 **Authentication** → Supabase Auth

```typescript
import { supabase } from '../utils/database';

// ✅ User registration
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'SecurePassword123!',
  options: {
    data: { firstName: 'John', role: 'job_seeker' }
  }
});

// ✅ Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
});

// ✅ Password reset
const { error } = await supabase.auth.resetPasswordForEmail(
  'user@example.com',
  { redirectTo: `${process.env.FRONTEND_URL}/reset-password` }
);

// ✅ Session management
const { data: { session } } = await supabase.auth.getSession();
const { data: { user } } = await supabase.auth.getUser();
```

### 💾 **File Storage** → Supabase Storage

```typescript
import { supabase } from '../utils/database';

// ✅ Upload resume
const { data, error } = await supabase.storage
  .from('resumes')
  .upload(`${userId}/resume.pdf`, file, {
    cacheControl: '3600',
    upsert: false
  });

// ✅ Get file URL
const { data } = supabase.storage
  .from('resumes')
  .getPublicUrl(`${userId}/resume.pdf`);

// ✅ Delete file
const { error } = await supabase.storage
  .from('resumes')
  .remove([`${userId}/resume.pdf`]);
```

### 🔄 **Real-time Updates** → Supabase Realtime

```typescript
import { supabase } from '../utils/database';

// ✅ Listen for new applications
const subscription = supabase
  .channel('applications')
  .on('postgres_changes', 
    { 
      event: 'INSERT', 
      schema: 'public', 
      table: 'applications',
      filter: `job_seeker_id=eq.${userId}`
    },
    (payload) => {
      console.log('New application received!', payload.new);
    }
  )
  .subscribe();

// ✅ Listen for messages
const messageSubscription = supabase
  .channel('messages')
  .on('postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `recipient_id=eq.${userId}`
    },
    (payload) => {
      // Handle new message
    }
  )
  .subscribe();
```

## Quick Decision Tree

```
Need to...?
│
├── Access user data (profiles, jobs, applications)
│   └── Use Drizzle ORM + PostgreSQL
│
├── Authenticate users (login, register, reset)
│   └── Use Supabase Auth
│
├── Store files (resumes, company logos)
│   └── Use Supabase Storage
│
├── Get real-time updates
│   └── Use Supabase Realtime
│
└── Complex data analysis
    └── Use Drizzle ORM + PostgreSQL
```

## Import Statements

```typescript
// For database operations (Drizzle)
import { db } from '../utils/database';
import { users, jobs } from '../models/schema';
import { eq, desc, count } from 'drizzle-orm';

// For Supabase services
import { supabase } from '../utils/database';
```

## Common Patterns

### Pattern 1: Auth + Database
```typescript
// Get authenticated user profile
const { data: { user } } = await supabase.auth.getUser();
if (user) {
  const userProfile = await db.select()
    .from(users)
    .where(eq(users.id, user.id))
    .limit(1);
}
```

### Pattern 2: File Upload + Database Record
```typescript
// Upload resume and update profile
const { data: uploadData } = await supabase.storage
  .from('resumes')
  .upload(`${userId}/resume.pdf`, file);

await db.update(users)
  .set({ resumeFileUrl: uploadData.path })
  .where(eq(users.id, userId));
```

### Pattern 3: Real-time + Database
```typescript
// Listen for updates and refresh data
supabase
  .channel('job_updates')
  .on('postgres_changes', 
    { event: 'UPDATE', schema: 'public', table: 'jobs' },
    async () => {
      // Refresh job listings
      const updatedJobs = await db.select().from(jobs);
    }
  )
  .subscribe();
```

## Environment Variables

```env
# Database (Drizzle ORM)
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.jplxlgsrjxcksantcgnp.supabase.co:5432/postgres

# Supabase Services
SUPABASE_URL=https://jplxlgsrjxcksantcgnp.supabase.co
SUPABASE_ANON_KEY=sb_publishable_VWYoTD0tPhKaoIoatt8RoQ_kox82itZ
```

## Performance Tips

- **Use Drizzle** for complex queries and data manipulation
- **Use Supabase** for authentication state and file operations  
- **Combine both** when needed (authenticate user, then query their data)
- **Cache** frequently accessed data from database operations
- **Use real-time** only when users need live updates

---
**Summary**: Database = Drizzle, Services = Supabase Client 🚀