# Supabase Integration for CareerForge Backend

This guide explains how to set up and use Supabase as the database for CareerForge.

## Prerequisites

1. **Supabase Account**: Create a free account at [supabase.com](https://supabase.com)
2. **Project Setup**: Create a new project in Supabase dashboard

## Setup Steps

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New project"
3. Fill in project details:
   - **Name**: `careerforge-db`
   - **Database Password**: Choose a strong password
   - **Region**: Select closest region (e.g., `West Europe` for Lagos)
4. Wait for project creation (2-3 minutes)

### 2. Get Connection Details

After project creation:

1. Go to **Settings → Database**
2. Copy the connection information:
   - **Host**: `db.xxxxxxx.supabase.co`
   - **Port**: `5432`
   - **Database**: `postgres`
   - **Username**: `postgres`
   - **Password**: Your chosen password

3. Go to **Settings → API**
4. Copy the API keys:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: For client-side operations
   - **service_role key**: For server-side operations (keep secret!)

### 3. Configure Environment Variables

Update `backend/.env`:

```env
# Database (Supabase)
DATABASE_URL=postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres
SUPABASE_URL=https://[PROJECT_REF].supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Keep other variables...
```

**Replace:**
- `[PROJECT_REF]`: Your project reference (from URL)
- `[PASSWORD]`: Your database password
- `[REGION]`: Your selected region

### 4. Set Up Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Copy and paste the contents of `backend/migrations/001_initial_schema.sql`
3. Click **Run** to create all tables and indexes

### 5. Install Dependencies

```bash
cd backend
npm install
```

### 6. Test Connection

```bash
# Start the backend
npm run dev

# Test health endpoint
curl http://localhost:5000/health

# Test database connection (should not error)
curl http://localhost:5000/api/auth/test-db
```

## Supabase Features Used

### Database
- **PostgreSQL**: Full SQL database with extensions
- **Row Level Security**: Multi-tenant data isolation
- **Real-time**: Live data synchronization

### Additional Features (Optional)
- **Authentication**: Built-in user management
- **Storage**: File upload/download
- **Edge Functions**: Serverless functions
- **Realtime**: WebSocket connections

## File Structure

```
backend/
├── src/
│   ├── utils/
│   │   ├── database.ts      # Drizzle ORM connection
│   │   └── supabase.ts      # Supabase client & helpers
│   └── models/
│       └── schema.ts        # Database schema definitions
├── migrations/
│   └── 001_initial_schema.sql  # Database setup script
└── .env                      # Environment variables
```

## Usage Examples

### Database Operations
```typescript
import { db } from '../utils/database';
import { users } from '../models/schema';

// Query users
const allUsers = await db.select().from(users);

// Insert user
await db.insert(users).values({
  email: 'user@example.com',
  role: 'job_seeker',
  // ... other fields
});
```

### Supabase Client
```typescript
import { supabase, SupabaseHelper } from '../utils/supabase';

// Authentication
const { data, error } = await SupabaseHelper.signUp('user@example.com', 'password');

// File upload
const fileUrl = await SupabaseHelper.uploadFile('resumes', 'resume.pdf', buffer, 'application/pdf');

// Real-time subscription
const subscription = SupabaseHelper.subscribeToTable('jobs', (payload) => {
  console.log('Job updated:', payload);
});
```

## Security Considerations

1. **Environment Variables**: Never commit API keys to version control
2. **Row Level Security**: Configure RLS policies in Supabase dashboard
3. **Service Role Key**: Only use for server-side operations
4. **Connection Pooling**: Supabase handles connection pooling automatically

## Troubleshooting

### Connection Issues
```bash
# Test database connection
psql "postgresql://postgres.[REF]:[PASS]@aws-0-[REGION].pooler.supabase.com:5432/postgres" -c "SELECT version();"
```

### Common Errors
- **Connection timeout**: Check firewall settings
- **Authentication failed**: Verify API keys
- **Table not found**: Run the migration script

### Supabase Dashboard
- **Logs**: Check API logs in Supabase dashboard
- **Metrics**: Monitor database performance
- **Backups**: Automatic daily backups included

## Migration from Local PostgreSQL

If migrating from local PostgreSQL:

1. Export data: `pg_dump local_db > backup.sql`
2. Import to Supabase: Use SQL Editor or `psql` with Supabase connection string
3. Update connection strings in code
4. Test all endpoints

## Next Steps

1. **Set up authentication** using Supabase Auth
2. **Configure storage** for file uploads
3. **Enable real-time** features for live updates
4. **Set up monitoring** and alerts

## Support

- **Supabase Docs**: https://supabase.com/docs
- **Community**: https://supabase.com/community
- **Status**: https://status.supabase.com

---

**Status**: ✅ Supabase integration configured and ready for use!