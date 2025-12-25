# CareerForge - Supabase Hybrid Architecture

This document explains the optimal hybrid approach for using Supabase with CareerForge.

## Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │────│  Backend API     │────│   Supabase      │
│   (Next.js)     │    │  (Express + TS)  │    │   PostgreSQL    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌──────────────────┐
                       │   Drizzle ORM    │
                       │   (Custom Schema)│
                       └──────────────────┘
```

## Two-Pronged Approach

### 1. **Database Queries** → Direct PostgreSQL + Drizzle
- **Use Case**: All database operations, CRUD operations, complex queries
- **Connection**: Direct PostgreSQL URL via `DATABASE_URL`
- **ORM**: Drizzle with your existing schema
- **Benefits**: Full SQL power, complex queries, better performance

```typescript
// Example: Database queries with Drizzle
import { db } from '../utils/database';
import { users, jobSeekers } from '../models/schema';

const userProfile = await db.select()
  .from(users)
  .where(eq(users.id, userId));
```

### 2. **Supabase Services** → @supabase/supabase-js Client
- **Use Case**: Authentication, storage, realtime subscriptions, edge functions
- **Connection**: Supabase client via `SUPABASE_URL` + `SUPABASE_ANON_KEY`
- **Benefits**: Built-in auth, file storage, realtime features

```typescript
// Example: Supabase services
import { supabase } from '../utils/database';

const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password
});
```

## Current Implementation

### Database Layer (Drizzle ORM)
```typescript
// backend/src/utils/database.ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Direct PostgreSQL connection for Drizzle
const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema });
```

### Services Layer (Supabase Client)
```typescript
// Same file - supabase client for services
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);
```

## Environment Configuration

```env
# Database Connection (for Drizzle ORM)
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.jplxlgsrjxcksantcgnp.supabase.co:5432/postgres

# Supabase Services (for Auth, Storage, etc.)
SUPABASE_URL=https://jplxlgsrjxcksantcgnp.supabase.co
SUPABASE_ANON_KEY=sb_publishable_VWYoTD0tPhKaoIoatt8RoQ_kox82itZ
SUPABASE_SERVICE_ROLE_KEY=[YOUR-SERVICE-ROLE-KEY]
```

## Usage Examples

### Database Operations (Drizzle ORM)
```typescript
// Get user profile with job seeker details
const userWithProfile = await db.select({
  user: users,
  profile: jobSeekers
})
.from(users)
.leftJoin(jobSeekers, eq(users.id, jobSeekers.id))
.where(eq(users.id, userId));

// Create new job posting
const newJob = await db.insert(jobs).values({
  title: 'Senior Developer',
  description: 'Join our team...',
  recruiterId: userId
}).returning();
```

### Authentication (Supabase Auth)
```typescript
// User registration
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'SecurePassword123!',
  options: {
    data: {
      firstName: 'John',
      lastName: 'Doe',
      role: 'job_seeker'
    }
  }
});

// Login
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
});
```

### File Storage (Supabase Storage)
```typescript
// Upload resume
const { data, error } = await supabase.storage
  .from('resumes')
  .upload(`${userId}/resume.pdf`, file);
```

### Realtime (Supabase Realtime)
```typescript
// Listen for new messages
const subscription = supabase
  .channel('messages')
  .on('postgres_changes', 
    { event: 'INSERT', schema: 'public', table: 'messages' },
    (payload) => console.log('New message:', payload)
  )
  .subscribe();
```

## Benefits of This Approach

### ✅ **Best of Both Worlds**
- **Drizzle**: Full SQL power, complex queries, type safety
- **Supabase**: Built-in auth, storage, realtime, edge functions

### ✅ **Performance**
- Direct PostgreSQL connection for database operations
- No abstraction overhead for complex queries

### ✅ **Flexibility**
- Use Supabase services when they add value
- Use direct SQL when you need more control

### ✅ **Future-Proof**
- Easy to migrate away from Supabase if needed
- Not locked into Supabase-specific features for core data operations

## Migration Strategy

### Current Auth Service
The `SupabaseAuthService` already implements this hybrid approach:

```typescript
export class SupabaseAuthService {
  // Uses Supabase Auth for authentication
  async login(data: LoginDTO) {
    const { data: supabaseUser } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password
    });
    
    // Uses Drizzle for user profile data
    const user = await this.authRepository.findUserById(supabaseUser.user.id);
    
    return { user, tokens: supabaseUser.session };
  }
}
```

## When to Use Which

| Use Case | Recommended Approach |
|----------|---------------------|
| **User Authentication** | Supabase Auth (`supabase.auth.*`) |
| **Database CRUD Operations** | Drizzle ORM (`db.select/insert/update`) |
| **File Uploads** | Supabase Storage (`supabase.storage.*`) |
| **Complex Queries** | Drizzle ORM with raw SQL |
| **Real-time Updates** | Supabase Realtime (`supabase.channel.*`) |
| **User Profiles** | Drizzle ORM (custom business logic) |
| **Password Reset** | Supabase Auth (`supabase.auth.resetPasswordForEmail`) |
| **Analytics Queries** | Drizzle ORM (complex aggregations) |

## Testing

### Database Layer Test
```typescript
// Test Drizzle connection
import { db } from '../utils/database';
const users = await db.select().from(users).limit(1);
```

### Services Layer Test  
```typescript
// Test Supabase connection
import { supabase } from '../utils/database';
const { data } = await supabase.auth.getSession();
```

## Summary

This hybrid architecture gives you:
- **Performance** of direct PostgreSQL access
- **Convenience** of Supabase services
- **Flexibility** to choose the right tool for each job
- **Future-proofing** against vendor lock-in

**Result**: Your CareerForge backend gets the benefits of both worlds! 🚀