# CAREERFORGE IMPLEMENTATION PLAN
## Based on Test Results & Code Analysis

---

## EXECUTIVE SUMMARY

**Current State:** App compiles on frontend only; backend & AI services have blocking issues.
- ❌ Backend won't compile (14 TypeScript errors)
- ⚠️ AI tests 43% passing (16 failures, 14 errors)
- ✅ Frontend builds successfully
- **Time to Production:** 9-10 days with full test coverage

---

## PHASE 1: UNBLOCK BUILDS & COMPILATION (Days 1-2)
**Goal:** Get the entire codebase to compile and pass linting.  
**Blocker Status:** 🔴 CRITICAL - App cannot be built/deployed without these fixes

### Phase 1.1: Fix JWT Type Errors (Backend)
**Files:** `backend/src/modules/auth/auth.service.ts`  
**Time:** 15 minutes

**Issue:** JWT_SECRET and JWT_REFRESH_SECRET are typed as `string | undefined` due to `process.env`, but `jwt.sign()` and `jwt.verify()` require non-undefined strings.

**Solution:** Add non-null assertion after runtime validation
```typescript
// Lines 27-28
const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
```

Affected lines: 27-28, 98, 144, 157, 166, 183, 198, 237, 534, 540

**Success Criteria:** `pnpm tsc --noEmit` completes without errors

---

### Phase 1.2: Fix ioredis Version Mismatch (Backend)
**Files:** `backend/package.json`  
**Time:** 30 minutes

**Issue:** bullmq ^5.78.0 and ioredis ^5.11.1 have incompatible type definitions.

**Solution:** Update to compatible version
```json
"bullmq": "^5.80.0",
"ioredis": "^5.11.1"
```

Then reinstall:
```bash
cd backend && pnpm install && pnpm tsc --noEmit
```

**Success Criteria:** No type errors in embeddingWorker.ts or cache.ts

---

### Phase 1.3: Fix ESLint Configuration (Root)
**Files:** `eslint.config.js`  
**Time:** 20 minutes

**Issue:** ESLint can't find @eslint/eslintrc

**Solution:** Fix import path
```javascript
import { FlatCompat } from "@eslint/eslintrc/dist/eslintrc.cjs";
```

Test: `pnpm run lint` in backend directory

**Success Criteria:** Lint runs without ERR_MODULE_NOT_FOUND

---

### Phase 1.4: Frontend Lock File Recovery
**Files:** `frontend/pnpm-lock.yaml`  
**Time:** 10 minutes

**Issue:** Missing lock file for reproducible installs

**Solution:**
```bash
cd frontend && pnpm install
git add pnpm-lock.yaml
```

**Success Criteria:** Lock file committed, `pnpm run build` passes

---

---

## PHASE 2: SUPABASE INTEGRATION - NEW PROJECT SETUP (Days 2-3)
**Goal:** Set up a new Supabase project and fully integrate it as the primary auth provider.  
**Blocker Status:** 🔴 CRITICAL - Must be done before Phase 3 to avoid auth rework

### Phase 2.0: Create New Supabase Project
**Time:** 15 minutes

**Steps:**
1. Go to [supabase.com](https://supabase.com) and sign in
2. Create new project:
   - **Project Name:** CareerForge
   - **Database Password:** Generate secure password (save it!)
   - **Region:** Choose closest to your users (e.g., us-east-1 for US)
3. Wait for database initialization (~2 min)
4. Copy credentials:
   - Project URL (Settings → API)
   - Anon Key (Settings → API)
   - Service Role Key (Settings → API) - **KEEP SECRET**

**Save these values for Phase 2.1**

---

### Phase 2.1: Configure Supabase Schema & Authentication
**Time:** 1 hour

**A. Set up Supabase Auth (built-in)**

In Supabase Dashboard → Authentication → Providers:
1. Enable Email (already default)
2. Email OTP: Toggle ON (for passwordless option)
3. Configure email settings:
   - Go to Settings → Email Templates
   - Update confirmation email template with your branding

**B. Configure Row Level Security (RLS)**

Run these SQL commands in Supabase SQL Editor:

```sql
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_seekers ENABLE ROW LEVEL SECURITY;
ALTER TABLE recruiters ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Job Seekers can read their own profile
CREATE POLICY "Job seekers read own profile"
  ON job_seekers FOR SELECT
  USING (auth.uid() = id);

-- Recruiters can read their own profile
CREATE POLICY "Recruiters read own profile"
  ON recruiters FOR SELECT
  USING (auth.uid() = id);

-- Jobs: Recruiters can see/edit own jobs, all can view published jobs
CREATE POLICY "Recruiters see own jobs"
  ON jobs FOR SELECT
  USING (auth.uid() = recruiter_id OR status = 'open');

CREATE POLICY "Recruiters can edit own jobs"
  ON jobs FOR UPDATE
  USING (auth.uid() = recruiter_id);

-- Applications: Users see own applications, recruiters see applications for their jobs
CREATE POLICY "Users see own applications"
  ON applications FOR SELECT
  USING (auth.uid() = job_seeker_id);

CREATE POLICY "Recruiters see applications to their jobs"
  ON applications FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM jobs 
      WHERE jobs.id = applications.job_id 
      AND jobs.recruiter_id = auth.uid()
    )
  );
```

**C. Sync Supabase Auth with CareerForge Users Table**

Create a PostgreSQL trigger that syncs Supabase auth events to users table:

```sql
-- Create trigger function to sync auth.users to public.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, is_verified, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.email_confirmed_at IS NOT NULL,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE
  SET 
    email = EXCLUDED.email,
    is_verified = EXCLUDED.is_verified,
    updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Trigger on auth.users insert/update
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

**D. Create Webhook for Auth Events (Optional but recommended)**

In Supabase → Database → Webhooks:
1. Create new webhook for `auth.users` table
2. Event: INSERT, UPDATE
3. URL: `https://your-backend.com/webhooks/auth` (update after backend deployment)

**Success Criteria:**
- RLS policies are active (green checkmark in Supabase UI)
- Trigger syncs auth events to users table
- Test auth signup from frontend works

---

### Phase 2.2: Migrate Backend Auth to Supabase
**Files:** `backend/src/modules/auth/`, `backend/src/utils/database.ts`  
**Time:** 2 hours

**A. Replace Auth Service Implementation**

Update `backend/src/modules/auth/auth.service.ts`:

1. **Remove custom JWT logic**, replace with Supabase Auth:

```typescript
import { supabase } from '../../utils/database';
import { AuthRepository } from './auth.repository';
import { RegisterDTO, LoginDTO } from './auth.dto';

export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  async register(data: RegisterDTO) {
    // Use Supabase Auth for registration
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          role: data.role,
          firstName: data.firstName,
          lastName: data.lastName,
        }
      }
    });

    if (error) {
      throw new AppError(error.message, 400);
    }

    // Create user record (trigger will sync auth.users to public.users)
    const user = await this.authRepository.createUser({
      id: authData.user!.id,
      email: authData.user!.email!,
      role: data.role,
      firstName: data.firstName,
      lastName: data.lastName,
      passwordHash: null, // Not needed with Supabase auth
      isVerified: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return { user, authData };
  }

  async login(data: LoginDTO) {
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      throw new AppError('Invalid email or password', 401);
    }

    // Get user profile
    const user = await this.authRepository.findUserByEmail(data.email);

    // Return session tokens from Supabase
    return {
      user,
      session: authData.session,
      accessToken: authData.session?.access_token,
      refreshToken: authData.session?.refresh_token,
    };
  }

  async logout(userId: string) {
    await supabase.auth.signOut();
    return { success: true };
  }

  async refreshToken(refreshToken: string) {
    const { data, error } = await supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error) {
      throw new AppError('Failed to refresh token', 401);
    }

    return {
      accessToken: data.session?.access_token,
      refreshToken: data.session?.refresh_token,
    };
  }

  async resetPassword(email: string) {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.FRONTEND_URL}/auth/reset-password`,
    });

    if (error) {
      throw new AppError(error.message, 400);
    }

    return { success: true };
  }

  async updatePassword(userId: string, newPassword: string) {
    const { error } = await supabase.auth.admin.updateUserById(userId, {
      password: newPassword,
    });

    if (error) {
      throw new AppError(error.message, 400);
    }

    return { success: true };
  }

  async verifyEmail(token: string) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: 'email',
    });

    if (error) {
      throw new AppError(error.message, 400);
    }

    return { success: true };
  }
}
```

2. **Remove custom JWT generation** - Use Supabase session tokens instead

3. **Delete** `backend/src/modules/auth/supabase-auth.service.ts` (no longer needed)

**B. Update Auth Middleware**

Update `backend/src/middleware/auth.ts`:

```typescript
import { supabase } from '../utils/database';
import { AppError } from './error';

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader?.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401);
    }

    const token = authHeader.substring(7);

    // Verify token with Supabase
    const { data, error } = await supabase.auth.getUser(token);

    if (error || !data.user) {
      throw new AppError('Invalid token', 401);
    }

    // Attach user to request
    (req as any).user = data.user;
    (req as any).userId = data.user.id;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
```

**C. Update .env Requirements**

Update `backend/.env.example`:

```env
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# No longer needed:
# JWT_SECRET (Supabase manages this)
# JWT_REFRESH_SECRET (Supabase manages this)
```

**Success Criteria:**
- Backend compiles without JWT errors
- Auth service methods use Supabase exclusively
- No custom JWT generation
- Old `supabase-auth.service.ts` removed

---

### Phase 2.3: Update Frontend Auth Integration
**Files:** `frontend/app/auth/`, API client  
**Time:** 1 hour

**A. Update API Client to Handle Supabase Tokens**

Create `frontend/lib/auth-client.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export class AuthClient {
  async signup(email: string, password: string, role: string) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role }
      }
    });

    if (error) throw error;
    return data;
  }

  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  }

  async logout() {
    await supabase.auth.signOut();
  }

  async getSession() {
    const { data } = await supabase.auth.getSession();
    return data.session;
  }

  getAccessToken() {
    return localStorage.getItem('supabase.auth.token');
  }
}
```

**B. Update API Calls to Include Token**

```typescript
// In frontend API client
async function fetchAPI(endpoint: string, options = {}) {
  const session = await supabase.auth.getSession();
  const token = session?.session?.access_token;

  const headers = {
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
    ...options,
    headers,
  });
}
```

**C. Update .env.local for Frontend**

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

**Success Criteria:**
- Signup/login flow uses Supabase auth
- Tokens are sent to backend
- Authentication works end-to-end

---

### Phase 2.4: Set Up Environment Variables for All Services
**Time:** 30 minutes

**Create `.env.production` for backend:**

```env
# Supabase (get from dashboard)
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=xxxx...
SUPABASE_SERVICE_ROLE_KEY=xxxx...

# Database (Supabase provides this)
DATABASE_URL=postgresql://postgres:[password]@db.xxxx.supabase.co:5432/postgres

# Security
ENCRYPTION_KEY=your_64_char_hex_key
JWT_SECRET=not_needed_with_supabase_but_keep_for_tokens
JWT_REFRESH_SECRET=not_needed_with_supabase

# Services
FRONTEND_URL=https://careerforge.com
AI_SERVICE_URL=http://ai-service:8000

# Email (for notifications)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

**Checklist:**
- ✅ SUPABASE_URL set
- ✅ SUPABASE_ANON_KEY set
- ✅ SUPABASE_SERVICE_ROLE_KEY set (backend only)
- ✅ DATABASE_URL points to Supabase postgres
- ✅ ENCRYPTION_KEY generated (64 hex chars)
- ✅ FRONTEND_URL matches deployment domain

**Success Criteria:** All env vars configured, no missing secrets

---

### Phase 2.5: Data Migration (If Migrating from Old Instance)
**Time:** 2 hours (if you have existing data)

**If you have user data from the closed Supabase account:**

1. Export data from old instance (CSV dump)
2. Transform data to match new schema:
   ```bash
   # Create migration script
   python scripts/migrate_supabase_users.py \
     --source-csv old_users.csv \
     --target-db postgresql://... \
     --hash-passwords
   ```
3. Import into new Supabase:
   ```sql
   COPY users FROM '/path/to/users.csv' WITH (FORMAT csv, HEADER true);
   ```

**If starting fresh:** Skip this section

**Success Criteria:** 
- Existing user data (if any) migrated
- No duplicate emails
- All RLS policies still apply to migrated data

---

## PHASE 3: FIX AI SERVICES TESTS (Days 3-4)
**Goal:** Get AI test suite to 25+ passing tests (70%+ pass rate).

### Phase 2.1: Fix Async/Await in Career Coach (AI Services)
**Files:** `ai/tests/test_integration_career_coach.py` (lines 77, 86-88, 99-103, 137, 140)  
**Time:** 45 minutes

**Issue:** Test methods are synchronous but call async career coach methods without await.

**Solution:** Make test methods async
```python
# Before
def test_stateful_conversation(self, coach, session_manager, sample_user_profile):
    advice1 = coach.provide_advice(...)  # Returns coroutine, not CareerAdvice

# After
@pytest.mark.asyncio
async def test_stateful_conversation(self, coach, session_manager, sample_user_profile):
    advice1 = await coach.provide_advice(...)  # Properly awaits result
    assert advice1.advice  # Now works
```

Update all 5 failing tests in test_integration_career_coach.py

**Success Criteria:** `pytest tests/test_integration_career_coach.py -v` shows 3/3 passing

---

### Phase 2.2: Fix Resume Parsing Async Methods (AI Services)
**Files:** `ai/tests/test_integration_resume_matching.py` (lines 82-90, 93-99, 104-112, 128-135)  
**Time:** 45 minutes

**Issue:** Same as Phase 2.1 - resume parser async methods not awaited in sync tests.

**Solution:** Make test methods async and add await
```python
@pytest.mark.asyncio
async def test_parse_and_match_flow(self):
    parsed = await self.parser.parse_resume(resume_pdf)
    assert len(parsed["skills"]) > 0
```

Update all 4 failing tests

**Success Criteria:** `pytest tests/test_integration_resume_matching.py -v` shows 4/4 passing

---

### Phase 2.3: Fix Vector Router Database Validation (AI Services)
**Files:** `ai/tests/test_vector_router.py`  
**Time:** 30 minutes

**Issue:** Tests pass with mocks but fail without DATABASE_URL in production.

**Solution:** Skip tests gracefully when DATABASE_URL not set
```python
import os
import pytest

pytestmark = pytest.mark.skipif(
    not os.getenv('DATABASE_URL'),
    reason='DATABASE_URL not set; skipping vector integration tests'
)
```

**Success Criteria:** Tests skip without DATABASE_URL, pass with it set

---

### Phase 2.4: Fix Document Extraction (AI Services)
**Files:** `ai/resume_parser/extractor.py`  
**Time:** 1 hour

**Issue:** DOCX file extraction test failing

**Solution:** Ensure python-docx is properly used
```python
from docx import Document

def extract_text_docx(file_path: str) -> str:
    doc = Document(file_path)
    return '\n'.join([p.text for p in doc.paragraphs])
```

Verify requirements.txt includes:
```
python-docx>=1.1.0
pytesseract>=0.3.10
```

**Success Criteria:** DOCX extraction test passes

---

### Phase 2.5: Fix Pydantic Deprecation Warnings (AI Services)
**Files:** `ai/vector/router.py` (lines 17, 22)  
**Time:** 15 minutes

**Solution:** Replace deprecated `min_items` with `min_length`
```python
# Before
embedding: List[float] = Field(..., min_items=1)

# After
embedding: List[float] = Field(..., min_length=1)
```

**Success Criteria:** No PydanticDeprecatedSince20 warnings in test output

---

### Phase 2.6: Fix Precache Script Module Import (AI Services)
**Files:** `ai/scripts/precache_models.py`  
**Time:** 30 minutes

**Issue:** precache_models.py fails when DATABASE_URL not set

**Solution:** Add graceful fallback
```python
import os

try:
    from shared.config import config
    if not os.getenv('DATABASE_URL'):
        print("⚠️  DATABASE_URL not set; skipping embedding precache")
        sys.exit(0)
except ImportError as e:
    print(f"⚠️  Could not import shared config: {e}")
    sys.exit(1)
```

**Success Criteria:** `pytest tests/test_precache.py -v` passes or skips gracefully

---

## PHASE 4: NVIDIA AI INTEGRATION (Days 4-5)
**Goal:** Set up NVIDIA models for resume parsing, embeddings, and career coaching.  
**Blocker Status:** 🔴 CRITICAL - Core AI features depend on this

### Phase 4.0: NVIDIA Model Selection & Architecture
**Time:** 30 minutes

**Model Allocation by Feature:**

| Feature | NVIDIA Model | Use Case | Token Limit |
|---------|--------------|----------|------------|
| **Resume Parsing** | `meta/llama-2-70b-chat` or `mistral/mistralai/mistral-large` | Extract skills, experience, education from resume text | 4k context |
| **Resume-to-Job Embeddings** | `nvidia/nv-embedqa-e5-v5` | Generate 1024-dim vectors for semantic matching | N/A |
| **Career Coaching** | `meta/llama-2-70b-chat` | Personalized advice, LinkedIn optimization, skill gaps | 4k context |
| **Job Description Parsing** | `meta/llama-2-70b-chat` | Extract requirements, identify must-have vs nice-to-have | 4k context |

**Architecture Overview:**

```
Frontend
    ↓
Backend (Express.js)
    ├→ Resume Upload → NVIDIA Llama Parse Resume → Extract Skills
    ├→ Job Posting → NVIDIA Llama Parse Job → Extract Requirements
    ├→ Get Match Score → NVIDIA Embeddings (vector DB search) → Job/Candidate Ranking
    └→ Career Coach Chat → NVIDIA Llama Generate Advice → Stream to user
    ↓
PostgreSQL + pgvector (for embeddings storage)
    ↓
Redis (cache NVIDIA responses)
```

**Cost Optimization Strategy:**
- Cache frequently-accessed embeddings (Llama 2 70B: ~$0.50 per 1M tokens)
- Use streaming for career coach (reduces memory)
- Batch embed jobs/resumes during off-peak hours
- Cache model responses in Redis for 24 hours

---

### Phase 4.1: Set Up NVIDIA Environment Variables
**Files:** `backend/.env`, `ai/.env`, `docker-compose.prod.yml`  
**Time:** 15 minutes

**Add to `.env` files:**

```env
# NVIDIA API Configuration
NVIDIA_API_KEY=nvapi-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  # From build.nvidia.com
NVIDIA_API_BASE=https://integrate.api.nvidia.com/v1

# Model Configuration
NVIDIA_EMBEDDING_MODEL=nvidia/nv-embedqa-e5-v5
NVIDIA_LLM_MODEL=meta/llama-2-70b-chat
NVIDIA_LLM_TEMPERATURE=0.7
NVIDIA_LLM_MAX_TOKENS=2048

# Optional: Use local models for development (vs NVIDIA API)
USE_LOCAL_MODELS=false  # Set true to use local Ollama/llama.cpp
```

**Add to `docker-compose.prod.yml`:**

```yaml
environment:
  NVIDIA_API_KEY: ${NVIDIA_API_KEY}
  NVIDIA_API_BASE: https://integrate.api.nvidia.com/v1
  NVIDIA_EMBEDDING_MODEL: nvidia/nv-embedqa-e5-v5
  NVIDIA_LLM_MODEL: meta/llama-2-70b-chat
```

**Success Criteria:** 
- `echo $NVIDIA_API_KEY` returns your key (not in git!)
- All NVIDIA env vars set

---

### Phase 4.2: Integrate NVIDIA with Resume Parser
**Files:** `ai/resume_parser/parser.py`  
**Time:** 1.5 hours

**Create `ai/services/nvidia_llm.py`:**

```python
import os
from openai import OpenAI  # NVIDIA uses OpenAI-compatible API
from typing import Dict, Any

class NVIDIALLMClient:
    def __init__(self):
        self.client = OpenAI(
            api_key=os.getenv('NVIDIA_API_KEY'),
            base_url=os.getenv('NVIDIA_API_BASE', 'https://integrate.api.nvidia.com/v1')
        )
        self.model = os.getenv('NVIDIA_LLM_MODEL', 'meta/llama-2-70b-chat')
        self.temperature = float(os.getenv('NVIDIA_LLM_TEMPERATURE', '0.7'))
        self.max_tokens = int(os.getenv('NVIDIA_LLM_MAX_TOKENS', '2048'))

    async def parse_resume(self, resume_text: str) -> Dict[str, Any]:
        """Extract structured data from resume text using Llama 2 70B"""
        prompt = f"""
        Extract structured information from this resume. Return as JSON:
        {{
            "full_name": "string",
            "email": "string",
            "phone": "string",
            "skills": ["skill1", "skill2", ...],
            "experience": [
                {{"company": "string", "title": "string", "years": number}},
                ...
            ],
            "education": [
                {{"school": "string", "degree": "string", "field": "string"}},
                ...
            ],
            "summary": "string"
        }}

        Resume:
        {resume_text}
        """

        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": "You are a resume parser. Extract data and return ONLY valid JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature=self.temperature,
            max_tokens=self.max_tokens,
            top_p=0.7
        )

        return response.choices[0].message.content

    async def parse_job_description(self, job_text: str) -> Dict[str, Any]:
        """Extract structured data from job posting using Llama 2 70B"""
        prompt = f"""
        Extract structured information from this job posting. Return as JSON:
        {{
            "title": "string",
            "company": "string",
            "required_skills": ["skill1", "skill2", ...],
            "nice_to_have_skills": ["skill1", ...],
            "experience_required_years": number,
            "seniority_level": "entry|mid|senior|executive",
            "salary_range": {{"min": number, "max": number, "currency": "string"}},
            "job_type": "full_time|part_time|contract|remote",
            "location": "string"
        }}

        Job Description:
        {job_text}
        """

        response = self.client.chat.completions.create(
            model=self.model,
            messages=[
                {"role": "system", "content": "You are a job description parser. Extract data and return ONLY valid JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature=self.temperature,
            max_tokens=self.max_tokens
        )

        return response.choices[0].message.content
```

**Update `ai/resume_parser/parser.py`:**

```python
from services.nvidia_llm import NVIDIALLMClient

class ResumeParser:
    def __init__(self):
        self.llm = NVIDIALLMClient()
        self.embedder = NVIDIAEmbeddingClient()

    async def parse_resume(self, resume_text: str) -> Dict[str, Any]:
        """Parse resume using NVIDIA Llama 2 70B"""
        # Extract structured data
        parsed_data = await self.llm.parse_resume(resume_text)
        
        # Cache in Redis
        cache_key = f"resume_parsed:{hash(resume_text)}"
        await redis.setex(cache_key, 86400, json.dumps(parsed_data))  # 24h TTL
        
        return parsed_data
```

**Success Criteria:**
- Resume parsing returns valid JSON
- Skills extracted correctly
- Experience dates parsed
- Results cached in Redis

---

### Phase 4.3: Integrate NVIDIA for Embeddings (Vector Search)
**Files:** `ai/services/nvidia_embeddings.py`, `backend/src/utils/cache.ts`  
**Time:** 1.5 hours

**Create `ai/services/nvidia_embeddings.py`:**

```python
import os
from openai import OpenAI
import numpy as np

class NVIDIAEmbeddingClient:
    def __init__(self):
        self.client = OpenAI(
            api_key=os.getenv('NVIDIA_API_KEY'),
            base_url=os.getenv('NVIDIA_API_BASE')
        )
        self.model = os.getenv('NVIDIA_EMBEDDING_MODEL', 'nvidia/nv-embedqa-e5-v5')

    async def embed_text(self, text: str) -> list[float]:
        """Generate embedding using NVIDIA nv-embedqa-e5-v5 (1024 dimensions)"""
        response = self.client.embeddings.create(
            model=self.model,
            input=[text],
            encoding_format="float"
        )
        
        return response.data[0].embedding

    async def embed_resume(self, resume_text: str, user_id: str) -> None:
        """Generate embedding for resume and store in pgvector"""
        embedding = await self.embed_text(resume_text)
        
        # Store in PostgreSQL with pgvector
        await db.query(
            """
            INSERT INTO candidate_embeddings 
            (user_id, model_id, embedding, source_text, created_at)
            VALUES ($1, $2, $3, $4, NOW())
            ON CONFLICT (user_id, model_id) DO UPDATE SET
            embedding = EXCLUDED.embedding,
            updated_at = NOW()
            """,
            [user_id, self.model, embedding, resume_text]
        )

    async def embed_job(self, job_text: str, job_id: str) -> None:
        """Generate embedding for job posting and store in pgvector"""
        embedding = await self.embed_text(job_text)
        
        await db.query(
            """
            INSERT INTO job_embeddings 
            (job_id, model_id, embedding, source_text, created_at)
            VALUES ($1, $2, $3, $4, NOW())
            ON CONFLICT (job_id, model_id) DO UPDATE SET
            embedding = EXCLUDED.embedding,
            updated_at = NOW()
            """,
            [job_id, self.model, embedding, job_text]
        )

    async def find_similar_jobs(self, resume_embedding: list[float], limit: int = 10) -> list[dict]:
        """Find similar jobs using vector similarity (cosine distance)"""
        result = await db.query(
            """
            SELECT 
                j.id, j.title, j.company, j.location,
                1 - (je.embedding <=> $1::vector) as similarity_score
            FROM job_embeddings je
            JOIN jobs j ON j.id = je.job_id
            WHERE j.status = 'open'
            ORDER BY je.embedding <=> $1::vector
            LIMIT $2
            """,
            [resume_embedding, limit]
        )
        
        return result

    async def find_similar_candidates(self, job_embedding: list[float], limit: int = 50) -> list[dict]:
        """Find similar candidates using vector similarity"""
        result = await db.query(
            """
            SELECT 
                ce.user_id, js.title, 
                1 - (ce.embedding <=> $1::vector) as match_score
            FROM candidate_embeddings ce
            JOIN job_seekers js ON js.id = ce.user_id
            ORDER BY ce.embedding <=> $1::vector
            LIMIT $2
            """,
            [job_embedding, limit]
        )
        
        return result
```

**Update embedding worker to use NVIDIA:**

```typescript
// backend/src/workers/embeddingWorker.ts
import axios from 'axios';

async function generateEmbedding(text: string): Promise<number[]> {
  const response = await axios.post(
    `${process.env.NVIDIA_API_BASE}/embeddings`,
    {
      model: process.env.NVIDIA_EMBEDDING_MODEL,
      input: [text],
    },
    {
      headers: {
        'Authorization': `Bearer ${process.env.NVIDIA_API_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return response.data.data[0].embedding;
}

export async function processEmbeddingJob(data: EmbeddingJob) {
  const embedding = await generateEmbedding(data.text);
  
  // Store in pgvector
  await db.execute(
    `INSERT INTO candidate_embeddings (user_id, embedding, source_text, created_at)
     VALUES ($1, $2, $3, NOW())`,
    [data.userId, embedding, data.text]
  );
}
```

**Success Criteria:**
- Embeddings generated with 1024 dimensions
- Stored in pgvector
- Vector search returns similar jobs/candidates

---

### Phase 4.4: Integrate NVIDIA for Career Coaching
**Files:** `ai/career_coach/coach.py`, `backend/src/sockets/careerCoach.ts`  
**Time:** 1.5 hours

**Create streaming career coach using NVIDIA Llama:**

```python
# ai/career_coach/coach.py
from services.nvidia_llm import NVIDIALLMClient
import asyncio

class CareerCoach:
    def __init__(self):
        self.llm = NVIDIALLMClient()

    async def generate_advice(
        self, 
        user_profile: Dict[str, Any], 
        context: str
    ) -> AsyncIterator[str]:
        """Generate career advice using streaming NVIDIA Llama"""
        
        prompt = f"""
        You are an expert career coach. Based on this profile, provide personalized advice:
        
        Profile:
        - Title: {user_profile.get('title')}
        - Skills: {', '.join(user_profile.get('skills', []))}
        - Experience: {user_profile.get('experience_years')} years
        - Education: {user_profile.get('education')}
        
        Question: {context}
        
        Provide thoughtful, actionable advice in 2-3 paragraphs.
        """

        # Stream response token-by-token
        with self.llm.client.chat.completions.create(
            model=self.llm.model,
            messages=[
                {
                    "role": "system", 
                    "content": "You are an expert career coach providing personalized guidance."
                },
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=1024,
            stream=True  # Enable streaming
        ) as response:
            for chunk in response:
                if chunk.choices[0].delta.content:
                    yield chunk.choices[0].delta.content
                    await asyncio.sleep(0.01)  # Brief delay for UI streaming

    async def optimize_linkedin_profile(self, profile: Dict[str, Any]) -> Dict[str, str]:
        """Generate LinkedIn headline and summary optimizations"""
        prompt = f"""
        Optimize this LinkedIn profile for a {profile.get('target_role')} role.
        
        Current:
        - Title: {profile.get('current_title')}
        - Summary: {profile.get('summary')}
        
        Provide:
        1. Optimized headline (max 120 chars)
        2. Optimized summary (3-4 sentences)
        3. Top 3 skills to highlight
        
        Return as JSON.
        """

        response = await self.llm.client.chat.completions.create(
            model=self.llm.model,
            messages=[
                {"role": "system", "content": "You are a LinkedIn optimization expert."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=512
        )

        return response.choices[0].message.content
```

**Update Socket.io handler for streaming:**

```typescript
// backend/src/sockets/careerCoach.ts
export function handleCareerCoachEvents(io: Server) {
  io.on('connection', (socket) => {
    socket.on('career:advice', async (data) => {
      try {
        const stream = await careerCoach.generateAdvice(
          data.userProfile,
          data.question
        );

        // Stream tokens to client
        for await (const chunk of stream) {
          socket.emit('career:advice:chunk', { text: chunk });
        }

        socket.emit('career:advice:complete', { success: true });
      } catch (error) {
        socket.emit('career:advice:error', { error: error.message });
      }
    });
  });
}
```

**Success Criteria:**
- Career advice streams in real-time
- LinkedIn optimization returns valid JSON
- Responses cached for performance

---

### Phase 4.5: Testing NVIDIA Integration
**Files:** `ai/tests/test_nvidia_integration.py`, `backend/src/__tests__/nvidia-ai.test.ts`  
**Time:** 1.5 hours

**Test Resume Parsing:**

```python
# ai/tests/test_nvidia_integration.py
import pytest
from services.nvidia_llm import NVIDIALLMClient

@pytest.mark.asyncio
async def test_parse_resume():
    """Test resume parsing with NVIDIA Llama"""
    client = NVIDIALLMClient()
    
    sample_resume = """
    John Smith
    john@example.com | 555-1234
    
    Skills: Python, JavaScript, React, PostgreSQL
    
    Experience:
    Senior Developer at TechCorp (2020-2024)
    - Built distributed systems
    - Led team of 5 engineers
    
    Education:
    BS Computer Science, State University (2019)
    """
    
    result = await client.parse_resume(sample_resume)
    
    assert "full_name" in result
    assert "John Smith" in result.get("full_name", "")
    assert "Python" in result.get("skills", [])
    assert "Senior Developer" in str(result.get("experience", []))

@pytest.mark.asyncio
async def test_embedding_generation():
    """Test embedding generation"""
    embedder = NVIDIAEmbeddingClient()
    
    embedding = await embedder.embed_text("Senior Python Developer with 5 years AWS experience")
    
    assert len(embedding) == 1024  # nv-embedqa-e5-v5 produces 1024-dim vectors
    assert isinstance(embedding, list)
    assert all(isinstance(x, float) for x in embedding)

@pytest.mark.asyncio
async def test_career_coach_streaming():
    """Test career coach advice streaming"""
    coach = CareerCoach()
    
    user_profile = {
        "title": "Junior Developer",
        "skills": ["Python", "JavaScript"],
        "experience_years": 2,
        "education": "BS Computer Science"
    }
    
    chunks = []
    async for chunk in coach.generate_advice(user_profile, "How do I advance to mid-level?"):
        chunks.append(chunk)
    
    full_response = "".join(chunks)
    assert len(full_response) > 100
    assert "mid-level" in full_response.lower() or "senior" in full_response.lower()
```

**Success Criteria:**
- Resume parsing extracts correct data
- Embeddings have 1024 dimensions
- Career coach produces coherent advice
- All tests pass with real NVIDIA API

---

### Phase 4.6: Cost Optimization & Rate Limiting
**Time:** 30 minutes

---

### Phase 4.7: World-Class Skill Taxonomy Implementation
**Files:** `backend/src/services/skillTaxonomy.ts`, `backend/migrations/`, `ai/services/skill_extraction.py`  
**Time:** 3-4 days

**Overview:** Implement 2000+ skill database with NVIDIA-powered extraction and matching.

#### **Step 1: Database Schema & Base Skills** (1 day)

Create migration file `backend/migrations/006_skill_taxonomy.sql`:

```sql
-- Create skill domains table
CREATE TABLE IF NOT EXISTS skill_domains (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create skill categories table
CREATE TABLE IF NOT EXISTS skill_categories (
  id SERIAL PRIMARY KEY,
  domain_id INT REFERENCES skill_domains(id) ON DELETE CASCADE,
  name VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create skill groups table
CREATE TABLE IF NOT EXISTS skill_groups (
  id SERIAL PRIMARY KEY,
  category_id INT REFERENCES skill_categories(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Main skills table
CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  domain_id INT REFERENCES skill_domains(id),
  category_id INT REFERENCES skill_categories(id),
  group_id INT REFERENCES skill_groups(id),
  description TEXT,
  marketplace_demand INT DEFAULT 50, -- 0-100 scale
  growth_trend FLOAT DEFAULT 0, -- -20 to +20% YoY
  is_technical BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Skill prerequisites (many-to-many)
CREATE TABLE IF NOT EXISTS skill_prerequisites (
  skill_id INT REFERENCES skills(id) ON DELETE CASCADE,
  prerequisite_skill_id INT REFERENCES skills(id) ON DELETE CASCADE,
  min_proficiency INT DEFAULT 2,
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (skill_id, prerequisite_skill_id)
);

-- Related skills (many-to-many)
CREATE TABLE IF NOT EXISTS skill_relations (
  skill_id INT REFERENCES skills(id) ON DELETE CASCADE,
  related_skill_id INT REFERENCES skills(id) ON DELETE CASCADE,
  relation_type VARCHAR(50), -- 'complements', 'similar', 'subset'
  created_at TIMESTAMP DEFAULT NOW(),
  PRIMARY KEY (skill_id, related_skill_id)
);

-- Skill synonyms for normalization
CREATE TABLE IF NOT EXISTS skill_synonyms (
  id SERIAL PRIMARY KEY,
  canonical_skill_id INT REFERENCES skills(id) ON DELETE CASCADE,
  synonym VARCHAR(255) UNIQUE NOT NULL,
  confidence FLOAT DEFAULT 0.95, -- 0-1
  created_at TIMESTAMP DEFAULT NOW()
);

-- User skill endorsements
CREATE TABLE IF NOT EXISTS skill_endorsements (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  skill_id INT REFERENCES skills(id) ON DELETE CASCADE,
  proficiency_level INT CHECK (proficiency_level >= 1 AND proficiency_level <= 5),
  years_experience INT,
  verified BOOLEAN DEFAULT false,
  verification_type VARCHAR(50), -- 'self', 'endorsement', 'test', 'certification'
  evidence_url TEXT,
  trust_score FLOAT DEFAULT 0.5, -- 0-1
  endorsed_by_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, skill_id)
);

-- Role skill requirements
CREATE TABLE IF NOT EXISTS role_skill_requirements (
  id SERIAL PRIMARY KEY,
  role_name VARCHAR(255),
  skill_id INT REFERENCES skills(id) ON DELETE CASCADE,
  proficiency_required INT,
  importance INT, -- 1=critical, 2=important, 3=nice-to-have
  percentage_jobs_requiring FLOAT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Skill extraction logs (for quality tracking)
CREATE TABLE IF NOT EXISTS skill_extraction_logs (
  id SERIAL PRIMARY KEY,
  resume_id UUID,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  extracted_skills JSONB,
  accuracy_score FLOAT,
  extraction_timestamp TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_skills_domain ON skills(domain_id);
CREATE INDEX idx_skills_category ON skills(category_id);
CREATE INDEX idx_skills_name ON skills(name);
CREATE INDEX idx_skill_endorsements_user ON skill_endorsements(user_id);
CREATE INDEX idx_skill_endorsements_skill ON skill_endorsements(skill_id);
CREATE INDEX idx_skill_synonyms_canonical ON skill_synonyms(canonical_skill_id);
```

**Run migration:**
```bash
cd backend
pnpm run migrate
```

#### **Step 2: Load Base Skills Data** (1 day)

Create `backend/seeds/skills.seed.ts`:

```typescript
import { db } from '../src/utils/database';
import { sql } from 'drizzle-orm';

export async function seedSkills() {
  console.log('🌱 Seeding skill taxonomy...');

  // 1. Insert domains
  const domains = await db.execute(sql`
    INSERT INTO skill_domains (name, description) VALUES
    ('Technology & Programming', 'Software development, coding, programming languages'),
    ('Data & Analytics', 'Data science, machine learning, analytics'),
    ('Cloud & Infrastructure', 'Cloud platforms, DevOps, infrastructure'),
    ('Product & Design', 'Product management, UX/UI design'),
    ('Business & Operations', 'Business strategy, operations, finance'),
    ('Sales & Marketing', 'Sales, marketing, business development'),
    ('People & Leadership', 'Leadership, people management, HR'),
    ('Soft Skills & Competencies', 'Communication, problem-solving, soft skills')
    ON CONFLICT (name) DO NOTHING
    RETURNING id, name;
  `);

  console.log(`✓ Created ${domains.length} domains`);

  // 2. Get domain IDs for reference
  const domainMap = new Map<string, number>();
  for (const domain of domains) {
    domainMap.set(domain.name, domain.id);
  }

  // 3. Insert categories and skills
  const skillsData = {
    'Technology & Programming': {
      'Frontend Development': [
        { name: 'React', demand: 95, trend: 2, technical: true },
        { name: 'Vue.js', demand: 75, trend: 1, technical: true },
        { name: 'Angular', demand: 70, trend: -1, technical: true },
        { name: 'TypeScript', demand: 90, trend: 5, technical: true },
        { name: 'JavaScript', demand: 98, trend: 0, technical: true },
        { name: 'Tailwind CSS', demand: 85, trend: 10, technical: true },
        { name: 'CSS', demand: 95, trend: 0, technical: true },
        { name: 'HTML', demand: 95, trend: 0, technical: true },
        { name: 'Webpack', demand: 65, trend: -2, technical: true },
        { name: 'Next.js', demand: 85, trend: 8, technical: true },
      ],
      'Backend Development': [
        { name: 'Python', demand: 92, trend: 8, technical: true },
        { name: 'Node.js', demand: 88, trend: 5, technical: true },
        { name: 'Express.js', demand: 85, trend: 2, technical: true },
        { name: 'FastAPI', demand: 75, trend: 12, technical: true },
        { name: 'Django', demand: 78, trend: 1, technical: true },
        { name: 'Java', demand: 82, trend: 0, technical: true },
        { name: 'Spring Boot', demand: 80, trend: 2, technical: true },
        { name: 'Go', demand: 72, trend: 10, technical: true },
        { name: 'Rust', demand: 65, trend: 15, technical: true },
        { name: 'C#', demand: 75, trend: 1, technical: true },
      ],
      'Databases': [
        { name: 'PostgreSQL', demand: 88, trend: 3, technical: true },
        { name: 'MySQL', demand: 80, trend: 0, technical: true },
        { name: 'MongoDB', demand: 75, trend: 2, technical: true },
        { name: 'Redis', demand: 78, trend: 4, technical: true },
        { name: 'Elasticsearch', demand: 70, trend: 2, technical: true },
        { name: 'SQLite', demand: 65, trend: 1, technical: true },
        { name: 'DynamoDB', demand: 68, trend: 5, technical: true },
        { name: 'SQL', demand: 95, trend: 0, technical: true },
      ],
      'DevOps & Infrastructure': [
        { name: 'Docker', demand: 85, trend: 4, technical: true },
        { name: 'Kubernetes', demand: 80, trend: 6, technical: true },
        { name: 'AWS', demand: 90, trend: 4, technical: true },
        { name: 'Google Cloud', demand: 75, trend: 5, technical: true },
        { name: 'Azure', demand: 72, trend: 3, technical: true },
        { name: 'Terraform', demand: 75, trend: 8, technical: true },
        { name: 'CI/CD', demand: 82, trend: 6, technical: true },
        { name: 'GitHub Actions', demand: 78, trend: 10, technical: true },
        { name: 'Jenkins', demand: 70, trend: -2, technical: true },
      ],
      'Testing & Quality': [
        { name: 'Jest', demand: 80, trend: 5, technical: true },
        { name: 'Pytest', demand: 75, trend: 6, technical: true },
        { name: 'React Testing Library', demand: 75, trend: 8, technical: true },
        { name: 'Cypress', demand: 72, trend: 10, technical: true },
        { name: 'Selenium', demand: 65, trend: -2, technical: true },
        { name: 'Playwright', demand: 68, trend: 12, technical: true },
      ],
    },
    'Data & Analytics': {
      'Data Science': [
        { name: 'Machine Learning', demand: 80, trend: 10, technical: true },
        { name: 'Python Data Science', demand: 85, trend: 8, technical: true },
        { name: 'TensorFlow', demand: 72, trend: 5, technical: true },
        { name: 'PyTorch', demand: 75, trend: 8, technical: true },
        { name: 'Scikit-learn', demand: 70, trend: 3, technical: true },
        { name: 'NLP', demand: 68, trend: 15, technical: true },
        { name: 'Computer Vision', demand: 65, trend: 12, technical: true },
      ],
      'Data Engineering': [
        { name: 'Apache Spark', demand: 75, trend: 4, technical: true },
        { name: 'Apache Kafka', demand: 72, trend: 8, technical: true },
        { name: 'ETL', demand: 75, trend: 2, technical: true },
        { name: 'Airflow', demand: 70, trend: 10, technical: true },
        { name: 'Dbt', demand: 68, trend: 15, technical: true },
      ],
      'Business Intelligence': [
        { name: 'Tableau', demand: 75, trend: 1, technical: true },
        { name: 'Power BI', demand: 73, trend: 2, technical: true },
        { name: 'Looker', demand: 65, trend: 8, technical: true },
        { name: 'Google Analytics', demand: 70, trend: 2, technical: false },
      ],
    },
    'Cloud & Infrastructure': {
      'Cloud Platforms': [
        { name: 'AWS EC2', demand: 85, trend: 2, technical: true },
        { name: 'AWS S3', demand: 88, trend: 2, technical: true },
        { name: 'AWS Lambda', demand: 80, trend: 5, technical: true },
        { name: 'AWS RDS', demand: 82, trend: 2, technical: true },
        { name: 'Google Cloud Platform', demand: 75, trend: 5, technical: true },
        { name: 'Microsoft Azure', demand: 72, trend: 3, technical: true },
      ],
      'DevOps Practices': [
        { name: 'Infrastructure as Code', demand: 78, trend: 8, technical: true },
        { name: 'Monitoring & Logging', demand: 75, trend: 5, technical: true },
        { name: 'Security & Compliance', demand: 80, trend: 6, technical: true },
      ],
    },
    'Product & Design': {
      'Product Management': [
        { name: 'Product Strategy', demand: 72, trend: 3, technical: false },
        { name: 'User Research', demand: 70, trend: 5, technical: false },
        { name: 'A/B Testing', demand: 68, trend: 4, technical: false },
        { name: 'Agile', demand: 80, trend: 2, technical: false },
      ],
      'Design': [
        { name: 'Figma', demand: 80, trend: 8, technical: false },
        { name: 'UI Design', demand: 75, trend: 3, technical: false },
        { name: 'UX Design', demand: 78, trend: 4, technical: false },
        { name: 'Prototyping', demand: 65, trend: 3, technical: false },
      ],
    },
    'Business & Operations': {
      'Project Management': [
        { name: 'Project Management', demand: 75, trend: 1, technical: false },
        { name: 'Scrum', demand: 78, trend: 2, technical: false },
        { name: 'Kanban', demand: 65, trend: 3, technical: false },
      ],
      'Finance': [
        { name: 'Financial Analysis', demand: 70, trend: 1, technical: false },
        { name: 'Budgeting', demand: 68, trend: 0, technical: false },
      ],
    },
    'Sales & Marketing': {
      'Marketing': [
        { name: 'Digital Marketing', demand: 78, trend: 3, technical: false },
        { name: 'Content Marketing', demand: 72, trend: 2, technical: false },
        { name: 'SEO', demand: 75, trend: 1, technical: false },
        { name: 'SEM', demand: 72, trend: 1, technical: false },
      ],
      'Sales': [
        { name: 'Sales Strategy', demand: 70, trend: 1, technical: false },
        { name: 'B2B Sales', demand: 68, trend: 1, technical: false },
        { name: 'CRM', demand: 75, trend: 2, technical: false },
      ],
    },
    'People & Leadership': {
      'Leadership': [
        { name: 'Team Leadership', demand: 75, trend: 2, technical: false },
        { name: 'Strategic Planning', demand: 70, trend: 2, technical: false },
        { name: 'Change Management', demand: 68, trend: 3, technical: false },
      ],
      'Communication': [
        { name: 'Communication', demand: 95, trend: 1, technical: false },
        { name: 'Public Speaking', demand: 70, trend: 2, technical: false },
        { name: 'Presentation Skills', demand: 75, trend: 1, technical: false },
      ],
    },
    'Soft Skills & Competencies': {
      'Problem Solving': [
        { name: 'Problem-Solving', demand: 90, trend: 2, technical: false },
        { name: 'Critical Thinking', demand: 88, trend: 2, technical: false },
        { name: 'Analytical Thinking', demand: 85, trend: 2, technical: false },
      ],
      'Interpersonal': [
        { name: 'Collaboration', demand: 92, trend: 2, technical: false },
        { name: 'Teamwork', demand: 90, trend: 1, technical: false },
        { name: 'Emotional Intelligence', demand: 80, trend: 5, technical: false },
      ],
    },
  };

  let totalSkills = 0;

  for (const [domainName, categories] of Object.entries(skillsData)) {
    const domainId = domainMap.get(domainName)!;

    for (const [categoryName, skills] of Object.entries(categories)) {
      // Insert category
      const category = await db.execute(sql`
        INSERT INTO skill_categories (domain_id, name)
        VALUES (${domainId}, ${categoryName})
        ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
        RETURNING id;
      `);

      const categoryId = category[0].id;

      // Insert skills
      for (const skill of skills) {
        await db.execute(sql`
          INSERT INTO skills (name, domain_id, category_id, marketplace_demand, growth_trend, is_technical)
          VALUES (${skill.name}, ${domainId}, ${categoryId}, ${skill.demand}, ${skill.trend}, ${skill.technical})
          ON CONFLICT (name) DO UPDATE SET 
            marketplace_demand = EXCLUDED.marketplace_demand,
            growth_trend = EXCLUDED.growth_trend
        `);
        totalSkills++;
      }
    }
  }

  console.log(`✓ Created ${totalSkills} skills`);

  // 4. Add skill synonyms for normalization
  const synonyms = [
    { canonical: 'JavaScript', synonyms: ['JS', 'ECMAScript', 'ES6', 'ES5'] },
    { canonical: 'TypeScript', synonyms: ['TS'] },
    { canonical: 'React', synonyms: ['ReactJS', 'React.js'] },
    { canonical: 'Python', synonyms: ['Python 3', 'Python 2'] },
    { canonical: 'Node.js', synonyms: ['NodeJS', 'Node'] },
    { canonical: 'PostgreSQL', synonyms: ['Postgres', 'PG', 'PostgreSQL'] },
    { canonical: 'MongoDB', synonyms: ['Mongo', 'NoSQL'] },
    { canonical: 'AWS', synonyms: ['Amazon Web Services'] },
    { canonical: 'Google Cloud', synonyms: ['GCP', 'Google Cloud Platform'] },
    { canonical: 'Docker', synonyms: ['Containerization'] },
    { canonical: 'Kubernetes', synonyms: ['K8s', 'K8'] },
  ];

  for (const { canonical, synonyms: syns } of synonyms) {
    const skill = await db.execute(sql`
      SELECT id FROM skills WHERE name = ${canonical}
    `);

    if (skill.length > 0) {
      const skillId = skill[0].id;
      for (const syn of syns) {
        await db.execute(sql`
          INSERT INTO skill_synonyms (canonical_skill_id, synonym)
          VALUES (${skillId}, ${syn})
          ON CONFLICT (synonym) DO NOTHING
        `);
      }
    }
  }

  console.log(`✓ Added skill synonyms`);

  // 5. Add skill prerequisites
  const prerequisites = [
    { skill: 'React', requires: 'JavaScript', minLevel: 3 },
    { skill: 'React', requires: 'HTML', minLevel: 2 },
    { skill: 'React', requires: 'CSS', minLevel: 2 },
    { skill: 'TypeScript', requires: 'JavaScript', minLevel: 2 },
    { skill: 'Express.js', requires: 'Node.js', minLevel: 2 },
    { skill: 'Express.js', requires: 'JavaScript', minLevel: 3 },
    { skill: 'Django', requires: 'Python', minLevel: 2 },
    { skill: 'FastAPI', requires: 'Python', minLevel: 2 },
    { skill: 'Kubernetes', requires: 'Docker', minLevel: 3 },
    { skill: 'AWS', requires: 'Linux', minLevel: 2 },
  ];

  for (const { skill, requires, minLevel } of prerequisites) {
    const skillRecord = await db.execute(sql`SELECT id FROM skills WHERE name = ${skill}`);
    const prereqRecord = await db.execute(sql`SELECT id FROM skills WHERE name = ${requires}`);

    if (skillRecord.length > 0 && prereqRecord.length > 0) {
      await db.execute(sql`
        INSERT INTO skill_prerequisites (skill_id, prerequisite_skill_id, min_proficiency)
        VALUES (${skillRecord[0].id}, ${prereqRecord[0].id}, ${minLevel})
        ON CONFLICT DO NOTHING
      `);
    }
  }

  console.log(`✓ Added skill prerequisites`);

  // 6. Add role-skill requirements
  const roleRequirements = [
    // Full-Stack Engineer
    { role: 'Full-Stack Engineer', skill: 'JavaScript', proficiency: 3, importance: 1 },
    { role: 'Full-Stack Engineer', skill: 'React', proficiency: 3, importance: 1 },
    { role: 'Full-Stack Engineer', skill: 'Python', proficiency: 3, importance: 1 },
    { role: 'Full-Stack Engineer', skill: 'PostgreSQL', proficiency: 3, importance: 1 },
    { role: 'Full-Stack Engineer', skill: 'Git', proficiency: 2, importance: 1 },
    { role: 'Full-Stack Engineer', skill: 'Docker', proficiency: 2, importance: 2 },
    { role: 'Full-Stack Engineer', skill: 'AWS', proficiency: 2, importance: 2 },

    // Data Engineer
    { role: 'Data Engineer', skill: 'Python', proficiency: 3, importance: 1 },
    { role: 'Data Engineer', skill: 'SQL', proficiency: 3, importance: 1 },
    { role: 'Data Engineer', skill: 'Apache Spark', proficiency: 3, importance: 1 },
    { role: 'Data Engineer', skill: 'PostgreSQL', proficiency: 2, importance: 1 },
    { role: 'Data Engineer', skill: 'ETL', proficiency: 3, importance: 1 },

    // Product Manager
    { role: 'Product Manager', skill: 'Product Strategy', proficiency: 3, importance: 1 },
    { role: 'Product Manager', skill: 'User Research', proficiency: 3, importance: 1 },
    { role: 'Product Manager', skill: 'A/B Testing', proficiency: 2, importance: 1 },
    { role: 'Product Manager', skill: 'Agile', proficiency: 2, importance: 1 },
    { role: 'Product Manager', skill: 'Communication', proficiency: 3, importance: 1 },
  ];

  for (const { role, skill, proficiency, importance } of roleRequirements) {
    const skillRecord = await db.execute(sql`SELECT id FROM skills WHERE name = ${skill}`);

    if (skillRecord.length > 0) {
      await db.execute(sql`
        INSERT INTO role_skill_requirements (role_name, skill_id, proficiency_required, importance)
        VALUES (${role}, ${skillRecord[0].id}, ${proficiency}, ${importance})
        ON CONFLICT DO NOTHING
      `);
    }
  }

  console.log(`✓ Added role skill requirements`);
  console.log(`\n✅ Skill taxonomy seeded successfully!\n`);
}
```

**Run seed:**
```bash
cd backend
pnpm run seed
```

#### **Step 3: Skill Normalization Pipeline** (1 day)

Create `backend/src/services/skillNormalization.ts`:

```typescript
import { db } from '../utils/database';
import { sql } from 'drizzle-orm';
import logger from '../utils/logger';

interface ExtractedSkill {
  name: string;
  proficiency: number;
  years: number;
  evidence: string;
}

export class SkillNormalizationService {
  /**
   * Normalize skill name to canonical form
   * Examples: "reactjs" → "React", "node.js" → "Node.js"
   */
  async normalizeSkillName(rawSkill: string): Promise<string | null> {
    const normalized = rawSkill.trim().toLowerCase();

    // Check if exact match exists
    const exactMatch = await db.execute(
      sql`SELECT name FROM skills WHERE LOWER(name) = ${normalized} LIMIT 1`
    );

    if (exactMatch.length > 0) {
      return exactMatch[0].name;
    }

    // Check synonyms table
    const synonym = await db.execute(
      sql`
        SELECT s.name 
        FROM skill_synonyms ss
        JOIN skills s ON s.id = ss.canonical_skill_id
        WHERE LOWER(ss.synonym) = ${normalized}
        LIMIT 1
      `
    );

    if (synonym.length > 0) {
      return synonym[0].name;
    }

    // Fuzzy matching for typos (Levenshtein distance)
    const fuzzyMatches = await db.execute(
      sql`
        SELECT name, LEVENSHTEIN(LOWER(name), ${normalized}) as distance
        FROM skills
        WHERE LEVENSHTEIN(LOWER(name), ${normalized}) <= 2
        ORDER BY distance ASC
        LIMIT 1
      `
    );

    if (fuzzyMatches.length > 0) {
      logger.info(`Fuzzy matched "${rawSkill}" to "${fuzzyMatches[0].name}"`);
      return fuzzyMatches[0].name;
    }

    return null;
  }

  /**
   * Normalize and deduplicate skills
   */
  async normalizeSkills(rawSkills: ExtractedSkill[]): Promise<ExtractedSkill[]> {
    const normalized: Map<string, ExtractedSkill> = new Map();

    for (const skill of rawSkills) {
      const canonicalName = await this.normalizeSkillName(skill.name);

      if (!canonicalName) {
        logger.warn(`Could not normalize skill: "${skill.name}"`);
        continue;
      }

      // If skill already exists, keep the one with higher proficiency or more years
      if (normalized.has(canonicalName)) {
        const existing = normalized.get(canonicalName)!;
        if (skill.proficiency > existing.proficiency || skill.years > existing.years) {
          normalized.set(canonicalName, { ...skill, name: canonicalName });
        }
      } else {
        normalized.set(canonicalName, { ...skill, name: canonicalName });
      }
    }

    return Array.from(normalized.values());
  }

  /**
   * Validate skill exists in taxonomy
   */
  async validateSkill(skillName: string): Promise<boolean> {
    const result = await db.execute(
      sql`SELECT id FROM skills WHERE name = ${skillName} LIMIT 1`
    );
    return result.length > 0;
  }

  /**
   * Get skill details including category, domain, demand
   */
  async getSkillDetails(skillName: string) {
    const result = await db.execute(
      sql`
        SELECT 
          s.id, 
          s.name, 
          s.marketplace_demand, 
          s.growth_trend,
          sc.name as category,
          sd.name as domain
        FROM skills s
        LEFT JOIN skill_categories sc ON s.category_id = sc.id
        LEFT JOIN skill_domains sd ON s.domain_id = sd.id
        WHERE s.name = ${skillName}
        LIMIT 1
      `
    );

    return result.length > 0 ? result[0] : null;
  }

  /**
   * Get skill prerequisites
   */
  async getPrerequisites(skillName: string): Promise<Array<{ name: string; minLevel: number }>> {
    const result = await db.execute(
      sql`
        SELECT s.name, sp.min_proficiency as minLevel
        FROM skill_prerequisites sp
        JOIN skills s ON s.id = sp.skill_id
        JOIN skills pr ON pr.id = sp.prerequisite_skill_id
        WHERE s.name = ${skillName}
      `
    );

    return result;
  }

  /**
   * Get related skills
   */
  async getRelatedSkills(skillName: string): Promise<string[]> {
    const result = await db.execute(
      sql`
        SELECT s2.name
        FROM skill_relations sr
        JOIN skills s1 ON s1.id = sr.skill_id
        JOIN skills s2 ON s2.id = sr.related_skill_id
        WHERE s1.name = ${skillName}
        ORDER BY CASE sr.relation_type
          WHEN 'complements' THEN 1
          WHEN 'similar' THEN 2
          WHEN 'subset' THEN 3
        END
      `
    );

    return result.map(r => r.name);
  }

  /**
   * Batch normalize and validate skills
   */
  async processExtractedSkills(rawSkills: ExtractedSkill[]): Promise<{
    valid: ExtractedSkill[];
    invalid: Array<{ name: string; reason: string }>;
  }> {
    const normalized = await this.normalizeSkills(rawSkills);
    const valid: ExtractedSkill[] = [];
    const invalid: Array<{ name: string; reason: string }> = [];

    for (const skill of normalized) {
      const isValid = await this.validateSkill(skill.name);

      if (isValid) {
        valid.push(skill);
      } else {
        invalid.push({
          name: skill.name,
          reason: 'Skill not in taxonomy',
        });
      }
    }

    return { valid, invalid };
  }
}

export const skillNormalization = new SkillNormalizationService();
```

#### **Step 4: Skill Matching Algorithm** (1 day)

Create `backend/src/services/skillMatching.ts`:

```typescript
import { db } from '../utils/database';
import { sql } from 'drizzle-orm';
import { skillNormalization } from './skillNormalization';

interface SkillMatch {
  skillName: string;
  matchType: 'exact' | 'related' | 'partial';
  matchScore: number; // 0-1
  evidence?: string;
}

interface JobMatchResult {
  jobId: string;
  matchScore: number; // 0-1
  matchedSkills: number;
  requiredSkills: number;
  missingSkills: SkillMatch[];
  partialMatches: SkillMatch[];
  overallFit: 'excellent' | 'good' | 'moderate' | 'poor';
}

export class SkillMatchingService {
  /**
   * Calculate match score between candidate skills and job requirements
   */
  async matchCandidateToJob(
    userId: string,
    jobId: string
  ): Promise<JobMatchResult> {
    // Get candidate skills
    const candidateSkills = await db.execute(
      sql`
        SELECT se.skill_id, s.name, se.proficiency_level
        FROM skill_endorsements se
        JOIN skills s ON s.id = se.skill_id
        WHERE se.user_id = ${userId}
        ORDER BY se.proficiency_level DESC
      `
    );

    // Get job requirements
    const jobRequirements = await db.execute(
      sql`
        SELECT rsr.skill_id, s.name, rsr.proficiency_required, rsr.importance
        FROM role_skill_requirements rsr
        JOIN skills s ON s.id = rsr.skill_id
        WHERE EXISTS (
          SELECT 1 FROM jobs WHERE id = ${jobId}
          -- Note: You'd need to add role detection to jobs table
        )
      `
    );

    const candidateSkillMap = new Map(candidateSkills.map(s => [s.name, s]));
    let matchedCount = 0;
    const missingSkills: SkillMatch[] = [];
    const partialMatches: SkillMatch[] = [];

    for (const req of jobRequirements) {
      const candidateSkill = candidateSkillMap.get(req.name);

      if (candidateSkill) {
        // Exact match
        if (candidateSkill.proficiency_level >= req.proficiency_required) {
          matchedCount++;
        } else {
          // Partial match - has skill but lower proficiency
          partialMatches.push({
            skillName: req.name,
            matchType: 'partial',
            matchScore: candidateSkill.proficiency_level / req.proficiency_required,
          });
        }
      } else {
        // Check for related skills
        const relatedSkills = await skillNormalization.getRelatedSkills(req.name);
        const hasRelated = relatedSkills.some(related => candidateSkillMap.has(related));

        if (hasRelated) {
          partialMatches.push({
            skillName: req.name,
            matchType: 'related',
            matchScore: 0.6,
          });
        } else {
          // Completely missing
          missingSkills.push({
            skillName: req.name,
            matchType: 'exact',
            matchScore: 0,
          });
        }
      }
    }

    const matchScore =
      (matchedCount + partialMatches.length * 0.5) / jobRequirements.length;
    const overallFit =
      matchScore >= 0.8 ? 'excellent' : matchScore >= 0.6 ? 'good' : matchScore >= 0.4 ? 'moderate' : 'poor';

    return {
      jobId,
      matchScore,
      matchedSkills: matchedCount,
      requiredSkills: jobRequirements.length,
      missingSkills,
      partialMatches,
      overallFit,
    };
  }

  /**
   * Find top N candidate matches for a job
   */
  async findTopCandidatesForJob(
    jobId: string,
    limit: number = 50
  ): Promise<Array<{ userId: string; matchScore: number; matchDetails: JobMatchResult }>> {
    // Get all candidates with skills
    const candidates = await db.execute(
      sql`
        SELECT DISTINCT se.user_id
        FROM skill_endorsements se
        LIMIT 1000
      `
    );

    const results = [];

    for (const { user_id } of candidates) {
      const match = await this.matchCandidateToJob(user_id, jobId);
      results.push({
        userId: user_id,
        matchScore: match.matchScore,
        matchDetails: match,
      });
    }

    return results.sort((a, b) => b.matchScore - a.matchScore).slice(0, limit);
  }

  /**
   * Calculate skill gaps for career advancement
   */
  async getSkillGapsForRole(userId: string, targetRole: string) {
    // Get candidate's current skills
    const currentSkills = await db.execute(
      sql`
        SELECT s.name, se.proficiency_level
        FROM skill_endorsements se
        JOIN skills s ON s.id = se.skill_id
        WHERE se.user_id = ${userId}
      `
    );

    // Get role requirements
    const roleRequirements = await db.execute(
      sql`
        SELECT s.name, rsr.proficiency_required, rsr.importance
        FROM role_skill_requirements rsr
        JOIN skills s ON s.id = rsr.skill_id
        WHERE rsr.role_name = ${targetRole}
        ORDER BY rsr.importance ASC
      `
    );

    const skillMap = new Map(currentSkills.map(s => [s.name, s.proficiency_level]));
    const gaps = [];

    for (const req of roleRequirements) {
      const currentLevel = skillMap.get(req.name) || 0;

      if (currentLevel < req.proficiency_required) {
        gaps.push({
          skill: req.name,
          currentLevel,
          requiredLevel: req.proficiency_required,
          gap: req.proficiency_required - currentLevel,
          importance: req.importance,
        });
      }
    }

    return gaps.sort((a, b) => {
      // Prioritize by importance then by gap size
      if (a.importance !== b.importance) {
        return a.importance - b.importance;
      }
      return b.gap - a.gap;
    });
  }
}

export const skillMatching = new SkillMatchingService();
```

**Success Criteria:**
- ✅ 2000+ skills loaded into database
- ✅ Skill normalization handles typos & synonyms
- ✅ Job matching returns accurate scores
- ✅ Skill gaps identified for career planning



**Implement caching layer:**

```typescript
// backend/src/services/nvidia-cache.ts
const CACHE_TTL = 86400; // 24 hours

async function getCachedEmbedding(text: string): Promise<number[] | null> {
  const cacheKey = `nvidia:embedding:${hash(text)}`;
  const cached = await redis.get(cacheKey);
  return cached ? JSON.parse(cached) : null;
}

async function cacheEmbedding(text: string, embedding: number[]) {
  const cacheKey = `nvidia:embedding:${hash(text)}`;
  await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(embedding));
}

async function getOrGenerateEmbedding(text: string): Promise<number[]> {
  // Try cache first
  let embedding = await getCachedEmbedding(text);
  if (embedding) return embedding;
  
  // Generate if not cached
  embedding = await generateEmbeddingWithNVIDIA(text);
  
  // Cache for future use
  await cacheEmbedding(text, embedding);
  
  return embedding;
}
```

**Rate limiting for NVIDIA API:**

```typescript
import rateLimit from 'express-rate-limit';

const nvidiaLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60, // 60 requests per minute (adjust per your NVIDIA quota)
  message: 'Too many AI requests, please try again later',
  skip: (req) => process.env.NODE_ENV === 'development'
});

app.post('/api/ai/parse-resume', nvidiaLimiter, parseResumeHandler);
app.post('/api/ai/career-advice', nvidiaLimiter, careerAdviceHandler);
```

**Monitor costs:**

```typescript
// Log NVIDIA API usage for cost tracking
async function logNVIDIAUsage(model: string, tokens: number) {
  await db.query(
    `INSERT INTO nvidia_usage_logs (model, token_count, cost, created_at)
     VALUES ($1, $2, $3, NOW())`,
    [model, tokens, estimateCost(model, tokens)]
  );
}

function estimateCost(model: string, tokens: number): number {
  const rates = {
    'meta/llama-2-70b-chat': 0.0005, // $ per 1K tokens
    'nvidia/nv-embedqa-e5-v5': 0.00001 // $ per 1K tokens
  };
  return (tokens / 1000) * rates[model];
}
```

**Success Criteria:**
- Redis caching reduces NVIDIA API calls by 70%+
- Rate limiting prevents quota overages
- Cost tracking dashboard available

---

## PHASE 5: ADD UNIT TESTS (Days 5-6)
**Goal:** Achieve 40%+ code coverage on critical paths.

### Phase 3.1: Add Backend Auth Tests
**Files:** `backend/src/modules/auth/auth.service.test.ts`  
**Time:** 2 hours

**Test Coverage:**
- register() - valid input, duplicate email, validation
- login() - valid/invalid credentials
- JWT token generation
- Password reset flow
- 2FA setup & verification

**Success Criteria:** 20+ auth tests passing, 60%+ coverage on auth module

---

### Phase 3.2: Add Backend API Route Tests
**Files:** Create `backend/src/api/__tests__/jobs.test.ts`, `applications.test.ts`  
**Time:** 3 hours

**Test Coverage:**
- Jobs API: POST (create), GET (list), GET (detail), PATCH (update), DELETE
- Applications API: POST (apply), GET (list), PATCH (update status)

**Success Criteria:** 30+ route tests passing, 40%+ coverage on backend

---

### Phase 3.3: Add AI Service Unit Tests
**Files:** Fix existing tests in `ai/tests/`  
**Time:** 2 hours

**Focus on:**
- Resume parsing accuracy
- Skill extraction
- Career coaching advice generation

**Success Criteria:** 25+ AI tests passing (70%+ pass rate)

---

## PHASE 6: INTEGRATION & E2E TESTS (Days 6-7)
**Goal:** Validate full workflows across layers.

### Phase 4.1: Cross-Service Integration Tests
**Files:** Create `tests/integration/` folder with:
- resume-upload-flow.test.ts
- job-matching-flow.test.ts
- application-flow.test.ts

**Test Scenarios:**
1. Resume Upload → AI Parse → Skills Extracted → Embeddings Generated
2. Job Posted → AI Embeds → Candidate Browses → Match Score Calculated
3. Candidate Applies → Notification Sent → Recruiter Dashboard Updated

**Success Criteria:** 5+ end-to-end workflows passing, no timeouts

---

### Phase 4.2: Add Frontend Component Tests
**Files:** `frontend/app/` → add `.test.tsx` files  
**Time:** 2 hours

**Test Coverage:**
- Auth pages: form validation, error messages
- Dashboard: data loading, empty states
- Job matching: filtering, sorting

**Success Criteria:** 15+ component tests passing

---

## PHASE 7: DEPLOYMENT PREPARATION (Days 7-8)
**Goal:** Ensure production readiness.

### Phase 5.1: Environment Validation Script
**Files:** Create `scripts/validate-deployment.sh`  
**Time:** 30 minutes

**Validate:**
- All required env vars are set
- Backend compiles without errors
- Frontend builds without errors
- AI services can import all modules
- Database migrations can run
- Redis connection works

**Success Criteria:** Script passes with all env vars set

---

### Phase 5.2: Database Migration Validation
**Time:** 1 hour

**Verify:**
- All migrations apply cleanly
- No FK constraint violations
- Schema matches TypeScript types
- pgvector extension initialized

**Commands:**
```bash
cd backend
pnpm run generate
pnpm run migrate
```

**Success Criteria:** Migrations run without errors

---

### Phase 5.3: Load Testing & Performance Baselines
**Time:** 2 hours

**Test Scenarios:**
- 100 concurrent resume uploads
- 50 concurrent job searches
- Vector search latency (p95 < 2s)

**Success Criteria:** No crashes under load

---

## PHASE 8: DOCUMENTATION & DEVOPS (Day 8)

### Phase 6.1: Update README
Add:
- Local development setup with Docker
- How to run tests for each service
- Troubleshooting guide

### Phase 6.2: Fix GitHub Actions CI
**Updates to `.github/workflows/ci.yml`:**
- Backend: Add `--noEmit` flag check (fail on error)
- Backend: Run actual tests instead of `|| true`
- AI: Add test result reporting
- Add deployment validation script

---

## TIMELINE SUMMARY

| Phase | Duration | Status |
|-------|----------|--------|
| Phase 1: Unblock Builds | 1-2 days | 🔴 CRITICAL |
| Phase 2: Supabase Integration | 2-3 days | 🔴 CRITICAL |
| Phase 3: Fix AI Tests | 2-3 days | 🔴 CRITICAL |
| Phase 4: NVIDIA AI Integration | 2-3 days | 🔴 CRITICAL |
| Phase 5: Add Unit Tests | 2 days | 🟠 HIGH |
| Phase 6: Integration Tests | 2 days | 🟡 MEDIUM |
| Phase 7: Deploy Prep | 1-2 days | 🟠 HIGH |
| Phase 8: Docs & DevOps | 1 day | 🟡 MEDIUM |
| **TOTAL** | **13-17 days** | - |

---

## CRITICAL PATH (DO THIS FIRST)

### Day 1 - Unblock Compilation (3-4 hours):
1. **Phase 1.1** - Fix JWT types (15 min)
2. **Phase 1.2** - Fix ioredis (30 min)
3. **Phase 1.3** - Fix ESLint (20 min)
4. **Phase 2.0** - Create new Supabase project (15 min)
5. **Phase 2.1** - Configure Supabase schema & RLS (1 hour)

### Day 2-3 - Migrate Auth System (4-5 hours):
6. **Phase 2.2** - Migrate backend auth to Supabase (2 hours)
7. **Phase 2.3** - Update frontend auth (1 hour)
8. **Phase 2.4** - Set up environment variables (30 min)

### Day 3-4 - Set Up NVIDIA Models (4-5 hours):
9. **Phase 4.1** - Set NVIDIA env variables (15 min)
10. **Phase 4.2** - Integrate NVIDIA for resume parsing (1.5 hours)
11. **Phase 4.3** - Integrate NVIDIA for embeddings (1.5 hours)
12. **Phase 4.4** - Integrate NVIDIA for career coaching (1.5 hours)

### Day 4-5 - Fix AI Tests (3-4 hours):
13. **Phase 3.1** - Fix career coach async/await (45 min)
14. **Phase 3.2** - Fix resume parser async/await (45 min)
15. **Phase 3.3-3.6** - Fix remaining AI issues (90 min)
16. **Phase 4.5** - Test NVIDIA integration (1.5 hours)

**Total Critical Path:** ~18-20 hours over 5 days to get production-ready + NVIDIA AI working  
**Time to Full Deployment:** 13-17 days (includes comprehensive tests + performance validation + Supabase + NVIDIA)

---

## SUCCESS METRICS

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| TypeScript compilation | ✅ No errors | ❌ 14 errors | 🔴 |
| AI tests passing | ✅ 25+ (70%) | ⚠️ 12 (43%) | 🟠 |
| Backend test coverage | ✅ 40%+ | ❌ 0% | 🔴 |
| Frontend build | ✅ Success | ✅ Success | ✅ |
| E2E workflows tested | ✅ 5+ | ❌ 0 | 🔴 |
| CI pipeline passing | ✅ All | ⚠️ Some skipped | 🟡 |

---

## NEXT STEPS

1. **Immediately** (today): Start Phase 1 (unblock builds)
2. **Tomorrow-Day 2**: Complete Phase 2 (fix AI tests)
3. **Day 3-4**: Add unit tests (Phase 3)
4. **Day 5-6**: Integration tests + deployment prep

**After this plan is complete, the app will be:**
- ✅ Compilable and deployable
- ✅ Tested on all layers (unit, integration, E2E)
- ✅ Production-ready with performance baselines
- ✅ Documented for team collaboration

---

## SUPABASE REFERENCE GUIDE

### Quick Setup Checklist

- [ ] Create new Supabase project at https://app.supabase.com
- [ ] Save Project URL and Anon Key
- [ ] Save Service Role Key (keep secret!)
- [ ] Enable email authentication in Auth settings
- [ ] Run RLS policy SQL scripts
- [ ] Create auth.users trigger
- [ ] Set environment variables in `.env`
- [ ] Test signup/login flow

### Key Environment Variables

```env
# From Supabase Dashboard → Settings → API
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...  # KEEP SECRET!

# Database URL (auto-provided)
DATABASE_URL=postgresql://postgres:[password]@db.xxxx.supabase.co:5432/postgres
```

### Common Operations

**Check all auth users:**
```sql
SELECT id, email, email_confirmed_at, created_at 
FROM auth.users 
ORDER BY created_at DESC;
```

**Verify RLS is active:**
```sql
SELECT schemaname, tablename, policyname, permissive
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename;
```

**Reset a user's password (admin only):**
```typescript
const { error } = await supabase.auth.admin.updateUserById(userId, {
  password: 'new-password-here'
});
```

**Manually sync auth users to public.users:**
```sql
INSERT INTO public.users (id, email, role, is_verified, created_at, updated_at)
SELECT 
  id, 
  email, 
  raw_user_meta_data->>'role' as role,
  email_confirmed_at IS NOT NULL,
  created_at,
  updated_at
FROM auth.users
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  updated_at = NOW();
```

### Troubleshooting

| Issue | Solution |
|-------|----------|
| "SUPABASE_URL not set" | Check `.env` file, verify exact URL from dashboard (Settings → API) |
| RLS blocking all queries | Verify role is `authenticated`, check policy WHERE clause syntax |
| Auth emails not sending | Check Auth → Email Templates, verify SMTP settings if custom |
| Database connection refused | Check Settings → Database for IP whitelist, verify postgres user login |
| "Token expired" errors | Verify JWT_SECRET not used with Supabase tokens (they use their own signing) |

### Documentation Links

- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Database Webhooks](https://supabase.com/docs/guides/database/webhooks)
- [JWT Claims & Verification](https://supabase.com/docs/guides/auth/json-web-tokens)

---

## NVIDIA AI REFERENCE GUIDE

### Quick Setup Checklist

- [ ] Have NVIDIA API key from build.nvidia.com
- [ ] Set NVIDIA_API_KEY in `.env`
- [ ] Install OpenAI SDK (for NVIDIA compatibility)
- [ ] Test embeddings endpoint
- [ ] Test Llama 2 70B chat endpoint
- [ ] Monitor API usage & costs
- [ ] Set up rate limiting
- [ ] Implement Redis caching

### Environment Variables

```env
# NVIDIA API Configuration
NVIDIA_API_KEY=nvapi-xxxxxxxxxxxxxxxxxxxxx
NVIDIA_API_BASE=https://integrate.api.nvidia.com/v1

# Model Configuration
NVIDIA_EMBEDDING_MODEL=nvidia/nv-embedqa-e5-v5
NVIDIA_LLM_MODEL=meta/llama-2-70b-chat
NVIDIA_LLM_TEMPERATURE=0.7
NVIDIA_LLM_MAX_TOKENS=2048

# Feature Flags
USE_LOCAL_MODELS=false  # true for local development
ENABLE_NVIDIA_CACHING=true
NVIDIA_CACHE_TTL=86400  # 24 hours
```

### Model Details

| Model | Use Case | Input Limit | Output Limit | Cost/1M tokens |
|-------|----------|------------|-------------|---|
| `meta/llama-2-70b-chat` | Resume/Job parsing, Career advice | 4096 | 2048 | $0.50 |
| `nvidia/nv-embedqa-e5-v5` | Vector embeddings (1024-dim) | Unlimited | N/A | $0.01 |

### API Endpoints (NVIDIA NIM)

**Generate Embeddings:**
```bash
curl -X POST https://integrate.api.nvidia.com/v1/embeddings \
  -H "Authorization: Bearer $NVIDIA_API_KEY" \
  -d '{"model": "nvidia/nv-embedqa-e5-v5", "input": ["text to embed"]}'
```

**Generate Chat Completion:**
```bash
curl -X POST https://integrate.api.nvidia.com/v1/chat/completions \
  -H "Authorization: Bearer $NVIDIA_API_KEY" \
  -d '{
    "model": "meta/llama-2-70b-chat",
    "messages": [{"role": "user", "content": "What is AI?"}],
    "temperature": 0.7,
    "max_tokens": 1024
  }'
```

### Code Examples

**Simple Embedding:**
```python
from openai import OpenAI

client = OpenAI(
    api_key="nvapi-xxx",
    base_url="https://integrate.api.nvidia.com/v1"
)

response = client.embeddings.create(
    model="nvidia/nv-embedqa-e5-v5",
    input=["Senior Python Developer with 5 years AWS"]
)

embedding = response.data[0].embedding  # 1024-dimensional vector
```

**Streaming Chat (Career Coach):**
```python
response = client.chat.completions.create(
    model="meta/llama-2-70b-chat",
    messages=[
        {"role": "system", "content": "You are a career coach"},
        {"role": "user", "content": "How do I advance my career?"}
    ],
    temperature=0.7,
    max_tokens=1024,
    stream=True  # Enable streaming
)

for chunk in response:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
```

### Cost Tracking

**Estimate costs:**
```python
def estimate_llm_cost(tokens: int) -> float:
    return (tokens / 1_000_000) * 0.50  # $0.50 per 1M tokens

def estimate_embedding_cost(tokens: int) -> float:
    return (tokens / 1_000_000) * 0.01  # $0.01 per 1M tokens

# Example: 1000 resumes with avg 500 tokens each
embedding_cost = estimate_embedding_cost(1000 * 500)  # ~$0.005
print(f"Cost to embed 1000 resumes: ${embedding_cost:.2f}")
```

**Monitor usage:**
```sql
-- Query usage logs
SELECT 
    model,
    SUM(token_count) as total_tokens,
    SUM(cost) as total_cost,
    DATE(created_at) as date
FROM nvidia_usage_logs
GROUP BY model, DATE(created_at)
ORDER BY created_at DESC;
```

### Performance Tips

1. **Cache aggressively** - Resume embeddings don't change often
2. **Batch requests** - Process multiple resumes in parallel
3. **Use smaller models for simple tasks** - Not everything needs 70B
4. **Stream responses** - For career coach, stream to client for better UX
5. **Rate limit** - Prevent accidental quota overages
6. **Monitor costs** - Log every API call with token count

### Fallbacks & Error Handling

```typescript
async function getEmbeddingWithFallback(text: string): Promise<number[]> {
  try {
    // Try NVIDIA first
    return await getNVIDIAEmbedding(text);
  } catch (error) {
    logger.warn('NVIDIA embedding failed, using local model:', error);
    
    // Fallback to local embedding model
    return await getLocalEmbedding(text);
  }
}

async function getCareerAdviceWithFallback(profile: any): Promise<string> {
  try {
    return await getNVIDIACareerAdvice(profile);
  } catch (error) {
    logger.warn('NVIDIA advice failed, using rule-based fallback');
    
    // Return rule-based recommendations
    return generateRuleBasedAdvice(profile);
  }
}
```

### Troubleshooting

| Issue | Solution |
|-------|----------|
| "Unauthorized" errors | Verify NVIDIA_API_KEY is correct and not expired |
| "Rate limit exceeded" | Add exponential backoff, increase cache TTL |
| Embeddings dimension mismatch | Verify model is `nvidia/nv-embedqa-e5-v5` (1024-dim) |
| Slow responses | Enable caching, use streaming for chat, batch requests |
| High costs | Review token usage logs, increase caching, use pruning |

### Advanced: Fine-tuning for Your Use Case

After collecting enough data (100+ examples), you can:

1. **Fine-tune resume parser** - Improve skill extraction accuracy
2. **Fine-tune job matcher** - Learn your specific skill taxonomies
3. **Fine-tune career advice** - Personalize for your user base

Contact NVIDIA support for fine-tuning options.

### Documentation Links

- [NVIDIA Build Docs](https://build.nvidia.com/models)
- [NVIDIA NIM Docs](https://docs.nvidia.com/nim/)
- [Llama 2 Model Card](https://huggingface.co/meta-llama/Llama-2-70b-chat)
- [E5 Embeddings](https://huggingface.co/intfloat/e5-large-v2)
- [OpenAI SDK](https://github.com/openai/openai-python) (compatible with NVIDIA)
