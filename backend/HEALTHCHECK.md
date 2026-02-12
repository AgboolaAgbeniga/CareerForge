# Supabase Health Check (CI)

This folder contains a lightweight API-only Supabase health check used by a scheduled GitHub Action.

Files:
- `api-supabase-check.js` — Node script that checks table access and performs an auth signup test. It exits non-zero when a check fails so CI will report failure.
- `.github/workflows/supabase-health.yml` — GitHub Actions workflow that runs the script on a 6-hour schedule and on manual dispatch.

Secrets (set in GitHub repository Settings → Secrets → Actions):
- `SUPABASE_URL` — your Supabase project URL (e.g., https://yourproject.supabase.co)
- `SUPABASE_ANON_KEY` — anon/public API key
- `DATABASE_URL` (optional) — used for direct DB checks if you extend the workflow
- `JWT_SECRET` (optional) — not required for the script, but useful for extended checks

Notes:
- The script creates a temporary test user during the auth check; this is intentional for verifying auth works.
- If your project disallows signups or blocks `example.com` addresses, update the script or configure auth settings accordingly.
- Intermittent DNS failures to the Postgres host may cause direct DB checks to fail; the API-only check is more reliable for scheduled monitoring.

How to test locally:
1. Set env vars (example using `.env` in `backend/`)
2. Run:
   ```bash
   cd backend
   node api-supabase-check.js
   ```

If the script exits with status 1, check the output to see which step failed and follow the debug steps in the project's Supabase documentation.