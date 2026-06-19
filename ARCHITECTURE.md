# CareerForge: Complete Architecture with Supabase & NVIDIA

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND (Next.js)                              │
│  ┌────────────────┬────────────────┬────────────────┬──────────────────┐   │
│  │ Auth Pages     │ Job Seeker     │ Recruiter      │ Dashboard        │   │
│  │ (Supabase)     │ Dashboard      │ Dashboard      │ (Real-time)      │   │
│  └────────────────┴────────────────┴────────────────┴──────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────┘
                                      ↓
┌─────────────────────────────────────────────────────────────────────────────┐
│                    BACKEND API (Express.js + TypeScript)                     │
│                                                                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────┐    │
│  │ Authentication   │  │ Core Endpoints   │  │ Real-time Features   │    │
│  ├──────────────────┤  ├──────────────────┤  ├──────────────────────┤    │
│  │ • Supabase Auth  │  │ • Jobs API       │  │ • Socket.io (Chat)   │    │
│  │ • JWT tokens     │  │ • Applications   │  │ • Career Coach       │    │
│  │ • Session mgmt   │  │ • Users          │  │ • Notifications      │    │
│  │ • 2FA           │  │ • Analytics      │  │ • Streaming updates  │    │
│  └──────────────────┘  └──────────────────┘  └──────────────────────┘    │
│                                                                              │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────────┐    │
│  │ AI Integration   │  │ Vector Matching  │  │ Rate Limiting        │    │
│  ├──────────────────┤  ├──────────────────┤  ├──────────────────────┤    │
│  │ • Resume parser  │  │ • pgvector       │  │ • NVIDIA API limits  │    │
│  │ • Job parser     │  │ • Similarity     │  │ • Request queuing    │    │
│  │ • Embeddings     │  │ • Top matches    │  │ • Circuit breaker    │    │
│  │ • Career coach   │  │ • Ranking        │  │ • Cache warming      │    │
│  └──────────────────┘  └──────────────────┘  └──────────────────────┘    │
└─────────────────────────────────────────────────────────────────────────────┘
       ↓                        ↓                        ↓
       │                        │                        │
       │                        │              ┌─────────┴──────────┐
       │                        │              ↓                    ↓
       ↓                        ↓         ┌──────────┐      ┌──────────────┐
    ┌──────────────┐    ┌──────────────┐  │  Redis   │      │    NVIDIA    │
    │  Supabase    │    │  PostgreSQL  │  │  Cache   │      │   NIM API    │
    │   (Auth)     │    │  + pgvector  │  │          │      │              │
    └──────────────┘    └──────────────┘  └──────────┘      │ ┌──────────┐ │
         │                    │                              │ │Llama 2   │ │
         │                    │                              │ │70B Chat  │ │
         │              ┌─────┴──────────┐                   │ └──────────┘ │
         │              │                │                  │              │
         ↓              ↓                ↓                   │ ┌──────────┐ │
    ┌─────────────────────────┐  ┌──────────┐              │ │E5 Vector │ │
    │    Supabase Database    │  │Job Seek. │              │ │Embeddings│ │
    │ ┌─────────────────────┐ │  │Embeddings│              │ └──────────┘ │
    │ │ auth.users         │ │  │          │              │              │
    │ ├─────────────────────┤ │  └──────────┘              └──────────────┘
    │ │ public.users       │ │
    │ │ (synced via RLS)   │ │
    │ ├─────────────────────┤ │
    │ │ job_seekers        │ │
    │ │ recruiters         │ │
    │ │ companies          │ │
    │ │ jobs               │ │
    │ │ applications       │ │
    │ │ messages           │ │
    │ │ notifications      │ │
    │ └─────────────────────┘ │
    └─────────────────────────┘
```

## Data Flow Examples

### 1. Resume Upload → AI Parsing → Job Matching

```
User uploads resume
    ↓
Frontend sends to Backend (multipart/form-data + token)
    ↓
Backend stores in S3/storage (file hash: abc123)
    ↓
Emit job: "parse_resume" to BullMQ queue
    ↓
Worker processes:
    • Extract text (pytesseract/python-docx)
    • Call NVIDIA Llama 2: "Parse this resume, return JSON"
    • Response: {skills: ["Python", "React"], experience: {...}}
    ↓
Store in PostgreSQL:
    • resumes table: {parsed_data: {...}, ai_optimized_data: {...}}
    • Update job_seekers profile_completion_percentage
    ↓
Generate embedding:
    • Call NVIDIA E5: "Senior Python Developer with React..."
    • Response: [0.123, -0.456, ..., 0.789] (1024 dims)
    ↓
Store in pgvector:
    • candidate_embeddings: {user_id, embedding, model_id, created_at}
    ↓
Find matches:
    • SELECT job_embeddings ORDER BY (embedding <=> candidate_embedding)
    • Return top 10 similar jobs
    ↓
Frontend receives matches + match scores
```

### 2. Career Coach Real-time Chat

```
User asks: "How do I advance to senior level?"
    ↓
Frontend emits Socket.io event: career:advice
    ↓
Backend receives, validates Supabase token
    ↓
Check Redis cache:
    • Key: "coach:advice:{user_id}:{question_hash}"
    • If exists → stream cached response
    ↓
Cache miss → Call NVIDIA Llama 2:
    • Stream flag: true
    • System: "You are a career coach"
    • User prompt includes: {skills, experience, target_role}
    ↓
NVIDIA sends tokens one-by-one:
    • "To advance to senior..."
    • "You should focus on..."
    • "Consider learning..."
    ↓
Backend streams each token to client via Socket.io
    ↓
Frontend renders real-time in UI
    ↓
Store response in Redis (24h TTL)
    ↓
Log to analytics: {user_id, question, duration, tokens_used}
```

### 3. Recruiter Dashboard → AI Ranking

```
Recruiter views applications for "Senior Developer" job
    ↓
Backend retrieves:
    • Job embedding (from pgvector)
    • Candidate embeddings (from pgvector)
    ↓
Calculate similarities (cosine distance):
    • Candidate A: 0.87
    • Candidate B: 0.92  ← Top match
    • Candidate C: 0.71
    ↓
Optional: Re-rank with skill gap analysis:
    • Call NVIDIA Llama: "Required: {list}. Candidate has: {list}. Missing?"
    • Get missing skills score
    ↓
Return ranked list with:
    • Match score (0-1)
    • Missing skills
    • Recommended next steps
    ↓
Recruiter clicks to view profile → Resume summary from NVIDIA parse
```

## Authentication Flow (Supabase)

```
Frontend
    │
    ├─ signup(email, password, role)
    │  └─→ supabase.auth.signUp()
    │      └─→ NVIDIA Auth event
    │          └─→ PostgreSQL trigger: sync auth.users → public.users
    │              └─→ Set role, firstName, etc.
    │
    ├─ login(email, password)
    │  └─→ supabase.auth.signInWithPassword()
    │      └─→ Get session token (JWT from Supabase)
    │          └─→ Return {accessToken, refreshToken}
    │
    └─ makeRequest(endpoint, token)
       └─→ Include: Authorization: Bearer {token}
           └─→ Backend validates with supabase.auth.getUser(token)
               └─→ Attach user to req.user
                   └─→ Proceed if RLS allows
```

## Environment Variables by Service

### Backend (.env)
```env
# Supabase
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx  # SECRET!

# Database
DATABASE_URL=postgresql://postgres:password@db.supabase.co:5432/postgres

# NVIDIA
NVIDIA_API_KEY=nvapi-xxxxx
NVIDIA_API_BASE=https://integrate.api.nvidia.com/v1
NVIDIA_EMBEDDING_MODEL=nvidia/nv-embedqa-e5-v5
NVIDIA_LLM_MODEL=meta/llama-2-70b-chat

# Security
JWT_SECRET=xxxxx  # For refresh tokens (NVIDIA handles main auth)
ENCRYPTION_KEY=xxxxx  # 64 hex chars for data encryption

# Services
FRONTEND_URL=https://careerforge.com
REDIS_URL=redis://redis:6379
PORT=5000
NODE_ENV=production
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
NEXT_PUBLIC_API_URL=https://api.careerforge.com
```

### AI Services (.env)
```env
NVIDIA_API_KEY=nvapi-xxxxx
DATABASE_URL=postgresql://postgres:password@db.supabase.co:5432/postgres
REDIS_URL=redis://redis:6379
PYTHONUNBUFFERED=1
```

## Scalability Considerations

### Current Capacity
- **Supabase:** Up to 500K MAU on free tier, scales to millions
- **PostgreSQL:** 8GB default, unlimited with upgrades
- **pgvector:** ~1M vectors at 1024 dimensions = ~4GB
- **Redis:** Default 25MB, can upgrade to 1GB+
- **NVIDIA API:** Pay-per-use, scales automatically

### When to Scale
| Metric | Threshold | Action |
|--------|-----------|--------|
| DB size | > 80% quota | Upgrade Supabase plan |
| Embeddings | > 1M vectors | Partition by date, archive old data |
| API calls | > 60/min | Add rate limiting, increase queue workers |
| Cache hit | < 70% | Increase Redis TTL, improve cache key strategy |

### Caching Strategy
```
L1 Cache: Redis (24h TTL)
├─ Embeddings: "embedding:{text_hash}"
├─ Career advice: "coach:advice:{user_id}:{question_hash}"
└─ Resume parses: "parse:{resume_id}"

L2 Cache: Browser (Session)
└─ User profile, job filters

L3 Cache: pgvector (Permanent)
└─ All embeddings for semantic search
```

## Security Checklist

- [ ] NVIDIA_API_KEY not in git or frontend
- [ ] SUPABASE_SERVICE_ROLE_KEY only in backend
- [ ] All .env files in .gitignore
- [ ] RLS policies enforced on all tables
- [ ] API rate limiting prevents abuse
- [ ] HTTPS only in production
- [ ] CORS restricted to frontend domain
- [ ] SQL injection prevented via parameterized queries
- [ ] Encryption for PII at rest
- [ ] Audit logs for sensitive operations
- [ ] Regular security audits

## Monitoring & Observability

### Key Metrics
```typescript
// Application Metrics
app.metrics({
  auth_signups: counter,
  auth_failures: counter,
  resume_uploads: counter,
  job_applications: counter,
  ai_api_calls: counter,
  ai_api_cost: gauge,
  embedding_cache_hit_rate: gauge,
  vector_search_latency: histogram
});

// Database Metrics
db.metrics({
  query_latency: histogram,
  slow_queries: counter,
  connection_pool_usage: gauge,
  vector_search_count: counter
});

// NVIDIA Metrics
nvidia.metrics({
  token_usage: gauge,
  api_latency: histogram,
  error_rate: gauge,
  cost_per_hour: gauge
});
```

### Dashboards
- **Grafana:** Query latency, error rates, cache hit rates
- **Supabase Dashboard:** Auth users, database usage, API requests
- **NVIDIA Console:** API usage, costs, token breakdown
- **Custom Dashboard:** Job matches per day, conversion rates

## Disaster Recovery

### RTO/RPO Targets
| Component | RTO | RPO | Strategy |
|-----------|-----|-----|----------|
| Supabase | 1h | 5m | Automated backups (free tier: 7 days) |
| PostgreSQL | 1h | 5m | WAL backups, point-in-time recovery |
| pgvector | 4h | 24h | Regenerate from resume PDFs if needed |
| Redis | 15m | 1h | Persistence enabled, AOF rewrite |

### Backup Strategy
```bash
# Daily backup of Supabase (automated)
# Weekly export to S3:
pg_dump postgresql://... | gzip > careerforge_$(date +%Y%m%d).sql.gz

# Redis persistence (enabled in docker-compose)
- appendonly yes
- appendfsync everysec
```

## Cost Estimate (Monthly)

| Service | Usage | Cost |
|---------|-------|------|
| Supabase | 100K MAU | $10-25 |
| PostgreSQL | 100GB | Included |
| pgvector | 1M embeddings | $5-10 |
| Redis | 1GB | $5-10 |
| NVIDIA Llama | 10M tokens | $5 |
| NVIDIA Embeddings | 100M tokens | $1 |
| Backend hosting | Always-on | $20-50 |
| Frontend CDN | 1TB/mo | $10-20 |
| **TOTAL** | | **$56-116** |

*Scales linearly with usage. At 10x users, estimate $300-500/month.*

## Development Workflow

```
1. Branch: feature/resume-ai-optimization
2. Develop locally with docker-compose
3. Push to feature branch
4. GitHub Actions runs:
   - TypeScript type check
   - Lint check
   - Unit tests
   - Integration tests with test DB
5. Create PR with test results
6. Code review (check NVIDIA integration safety)
7. Merge to main
8. Auto-deploy to staging
9. Smoke tests on staging
10. Manual approval → Prod deploy
```
