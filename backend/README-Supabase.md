# CareerForge Backend - Supabase Integration Guide

This guide explains how the CareerForge backend has been integrated with Supabase for authentication and database management.

## Overview

The CareerForge backend now uses a hybrid approach:
- **Supabase Auth** for user authentication (signup, login, password reset, etc.)
- **Custom User Profiles** managed through Drizzle ORM with your existing business logic
- **PostgreSQL Database** hosted on Supabase with your existing schema

## Architecture

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

## Supabase Configuration

### Environment Variables

Update your `.env` file with the following Supabase configuration:

```env
# Supabase Configuration
SUPABASE_URL=https://jplxlgsrjxcksantcgnp.supabase.co
SUPABASE_ANON_KEY=sb_publishable_VWYoTD0tPhKaoIoatt8RoQ_kox82itZ
# Get this from your Supabase project dashboard > Settings > API
SUPABASE_SERVICE_ROLE_KEY=[YOUR-SERVICE-ROLE-KEY]

# Database Configuration (PostgreSQL connection string)
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.jplxlgsrjxcksantcgnp.supabase.co:5432/postgres

# JWT Configuration (for custom tokens)
JWT_SECRET=your-jwt-secret-at-least-32-characters-long
JWT_REFRESH_SECRET=your-refresh-secret-at-least-32-characters-long
JWT_RESET_SECRET=your-reset-secret-at-least-32-characters-long

# Encryption Key (64 characters for 32-byte encryption)
ENCRYPTION_KEY=your-64-character-encryption-key-for-secure-data-encryption

# Application Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Getting Your Service Role Key

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the "service_role" key (not the "anon" key)
4. Add it to your environment variables as `SUPABASE_SERVICE_ROLE_KEY`

## Database Schema

Your existing database schema is preserved and works seamlessly with Supabase:

- **users** - Core user information
- **job_seekers** - Job seeker specific profiles
- **recruiters** - Recruiter specific profiles
- **jobs** - Job postings
- **companies** - Company information
- **applications** - Job applications
- **messages** - User messaging
- **notifications** - System notifications
- **analytics_events** - Analytics tracking
- **experiments** - A/B testing experiments

## Authentication Flow

### Registration Flow

1. **Frontend** sends user data to backend
2. **Backend** creates user in Supabase Auth
3. **Backend** creates user profile in custom users table
4. **Backend** creates role-specific profile (job_seeker/recruiter)
5. **Backend** sends verification email if needed
6. **Frontend** receives authentication tokens

### Login Flow

1. **Frontend** sends credentials to backend
2. **Backend** authenticates with Supabase Auth
3. **Backend** retrieves user profile from custom table
4. **Backend** checks email verification status
5. **Backend** updates last login timestamp
6. **Frontend** receives user data and tokens

### Password Reset Flow

1. **Frontend** requests password reset
2. **Backend** triggers Supabase password reset email
3. **User** clicks reset link
4. **Frontend** sends new password to backend
5. **Backend** updates password in Supabase Auth

## Using the Supabase Auth Service

### Import the Service

```typescript
import { SupabaseAuthService } from './modules/auth/supabase-auth.service';
```

### Usage Examples

```typescript
const authService = new SupabaseAuthService();

// Register a new user
const registerData = {
    email: 'user@example.com',
    password: 'SecurePassword123!',
    role: 'job_seeker',
    firstName: 'John',
    lastName: 'Doe'
};

const result = await authService.register(registerData);
console.log(result.user, result.accessToken, result.refreshToken);

// Login user
const loginData = {
    email: 'user@example.com',
    password: 'SecurePassword123!'
};

const loginResult = await authService.login(loginData);
console.log(loginResult.user, loginResult.tokens);

// Get user profile
const profile = await authService.getProfile(userId);
console.log(profile.user, profile.profile);
```

## Features Preserved

All existing features continue to work:

✅ **Custom User Profiles** - Job seeker and recruiter profiles
✅ **Two-Factor Authentication** - TOTP and backup codes
✅ **Profile Completeness Tracking** - Onboarding progress
✅ **Role-Based Access Control** - Job seeker vs recruiter permissions
✅ **Email Verification** - Account verification workflow
✅ **Password Policies** - Strong password requirements
✅ **User Data Sanitization** - XSS protection
✅ **Profile Management** - Update user information
✅ **Audit Logging** - Track user actions

## Migration from Custom Auth

If you're migrating from the custom JWT implementation:

1. **Install Dependencies**:
   ```bash
   npm install @supabase/supabase-js
   ```

2. **Update Environment Variables** with Supabase credentials

3. **Replace Auth Service** in your controllers:
   ```typescript
   // Old
   import { AuthService } from './auth.service';
   
   // New
   import { SupabaseAuthService } from './supabase-auth.service';
   
   // Update constructor
   this.authService = new SupabaseAuthService();
   ```

4. **Test Authentication Flows**:
   - Registration
   - Login
   - Password reset
   - Profile management
   - 2FA setup and verification

## API Endpoints

All existing API endpoints continue to work with Supabase Auth:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `POST /api/auth/verify-email` - Verify email
- `POST /api/auth/resend-verification` - Resend verification email
- `POST /api/auth/setup-2fa` - Setup 2FA
- `POST /api/auth/verify-2fa` - Verify 2FA
- `POST /api/auth/disable-2fa` - Disable 2FA
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

## Development Workflow

### Local Development

1. **Set up Supabase project** (already done)
2. **Configure environment variables**
3. **Run database migrations**:
   ```bash
   psql -d [your-database] -f backend/migrations/001_initial_schema.sql
   ```
4. **Start the backend**:
   ```bash
   cd backend
   npm run dev
   ```

### Testing

```bash
# Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePassword123!",
    "role": "job_seeker",
    "firstName": "Test",
    "lastName": "User"
  }'

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "SecurePassword123!"
  }'
```

## Security Considerations

1. **Service Role Key** - Keep this secret and never expose it to the frontend
2. **Row Level Security** - Enable RLS policies in Supabase for additional security
3. **API Rate Limiting** - Already implemented in your existing middleware
4. **Input Validation** - All inputs are validated using Zod schemas
5. **Password Policies** - Enforced through DTO validation
6. **CORS Configuration** - Configure properly for your frontend domain

## Troubleshooting

### Common Issues

1. **"Invalid credentials"** - Check email/password and Supabase configuration
2. **"User profile not found"** - Ensure user exists in both Supabase Auth and custom users table
3. **"Email not verified"** - Check Supabase email confirmation settings
4. **Database connection errors** - Verify DATABASE_URL and network connectivity

### Debug Steps

1. Check Supabase project status in dashboard
2. Verify environment variables are correctly set
3. Test Supabase connection directly:
   ```typescript
   import { supabase } from './utils/database';
   const { data, error } = await supabase.from('users').select('*').limit(1);
   console.log(data, error);
   ```
4. Check logs for detailed error messages

## Performance Optimization

1. **Connection Pooling** - Supabase handles this automatically
2. **Query Optimization** - Your existing Drizzle queries are optimized
3. **Caching** - Implement Redis caching for frequently accessed data
4. **CDN** - Use Supabase CDN for static assets

## Support

For issues related to:
- **Supabase**: Check [Supabase Documentation](https://supabase.com/docs)
- **Authentication**: Review this guide and the code comments
- **Database**: Check your existing schema and migrations

---

**Status**: ✅ Supabase integration configured and ready for use!