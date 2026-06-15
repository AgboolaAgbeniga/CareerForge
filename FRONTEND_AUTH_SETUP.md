# Frontend Supabase Integration Setup

## Step 1: Install Dependencies
cd frontend
pnpm install

## Step 2: Configure Environment Variables

Create rontend/.env.local with:

\\\env
# From your Supabase Dashboard (Settings → API)
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_REFERENCE.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE

# Backend API
NEXT_PUBLIC_API_URL=http://localhost:5000
\\\

## Step 3: What Changed

- **Auth Context**: Now uses Supabase Auth instead of custom JWT
- **Login Flow**: Authenticates with Supabase, then fetches user profile from backend
- **Token Management**: Automatically refreshes Supabase session tokens
- **Auth State**: Listens to Supabase auth changes in real-time

## Step 4: Testing

### Local Development
\\\ash
# Terminal 1: Start backend
cd backend
pnpm dev

# Terminal 2: Start frontend
cd frontend
pnpm dev
\\\

Then visit: http://localhost:3000

### Test Auth Flow
1. Go to http://localhost:3000/auth/login
2. Use credentials for a user registered in Supabase
3. Should redirect to dashboard after successful login
4. Token should be stored in Supabase session (browser storage)

## Step 5: Key Auth Methods

The \useAuth()\ hook now provides:
- \login(email, password)\ - Uses Supabase Auth
- \logout()\ - Signs out from Supabase
- \checkAuth()\ - Verifies current session
- \getAccessToken()\ - Gets current Supabase token
- \user\ - Current logged-in user
- \loading\ - Loading state during auth checks

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Missing Supabase environment variables" | Check .env.local has NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY |
| "Invalid credentials" | Verify user was created in Supabase and email is verified |
| "Token refresh failed" | Check backend is running and SUPABASE_SERVICE_ROLE_KEY is set |
| Cookies not persisting | Ensure credentials: 'include' is set in fetch calls |
