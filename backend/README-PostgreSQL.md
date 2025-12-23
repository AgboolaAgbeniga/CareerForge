# Local PostgreSQL Setup for CareerForge Backend

This guide explains how to set up and use a local PostgreSQL database for CareerForge.

## Prerequisites

1. **PostgreSQL Installation**: Install PostgreSQL on your local machine
   - Download from [postgresql.org](https://www.postgresql.org/download/)
   - Or use package managers like Homebrew (macOS), apt (Ubuntu), or chocolatey (Windows)
2. **Database Server Running**: Ensure PostgreSQL service is running

## Setup Steps

### 1. Create Database

Create a new database named 'careerforge':

```bash
createdb careerforge
```

Or using psql:

```bash
psql -U postgres -c "CREATE DATABASE careerforge;"
```

### 2. Configure Environment Variables

Update `backend/.env`:

```env
# Database (Local PostgreSQL)
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/careerforge

# Keep other variables...
```

**Replace:**
- `your_password`: Your PostgreSQL postgres user password

### 3. Set Up Database Schema

Run the initial schema migration:

```bash
psql -U postgres -d careerforge -f backend/migrations/001_initial_schema.sql
```

### 4. Install Dependencies

```bash
cd backend
npm install
```

### 5. Test Connection

```bash
# Start the backend
npm run dev

# Test health endpoint
curl http://localhost:5000/health

# Test database connection (if endpoint exists)
curl http://localhost:5000/api/auth/test-db
```

## PostgreSQL Features Used

### Database
- **PostgreSQL**: Full SQL database with extensions
- **Drizzle ORM**: Type-safe database operations
- **Standard SQL**: All operations use standard PostgreSQL syntax

## File Structure

```
backend/
├── src/
│   ├── utils/
│   │   └── database.ts      # Drizzle ORM connection
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

## Security Considerations

1. **Environment Variables**: Never commit database passwords to version control
2. **Local Access**: Database is only accessible locally
3. **Backup**: Regularly backup your local database

## Troubleshooting

### Connection Issues

```bash
# Test database connection
psql -U postgres -d careerforge -c "SELECT version();"

# Check if PostgreSQL is running
pg_isready
```

### Common Errors
- **Connection refused**: Ensure PostgreSQL service is running
- **Authentication failed**: Verify password in .env
- **Database does not exist**: Create the database first
- **Table not found**: Run the migration script

## Migration from Supabase

If migrating from Supabase:

1. Export data from Supabase: Use pg_dump or Supabase dashboard
2. Import to local PostgreSQL: `psql -U postgres -d careerforge < backup.sql`
3. Update connection strings in code
4. Remove Supabase-specific code
5. Test all endpoints

## Next Steps

1. **Set up authentication** using custom JWT implementation
2. **Configure local storage** for file uploads
3. **Set up backups** for data safety
4. **Monitor performance** and optimize queries

---

**Status**: ✅ Local PostgreSQL setup configured and ready for use!