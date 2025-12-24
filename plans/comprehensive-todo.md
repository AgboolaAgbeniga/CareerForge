# CareerForge: Critical Remediation Plan

> **Status**: 🔴 NOT PRODUCTION READY  
> **Last Updated**: December 24, 2024  
> **Estimated Time to Production**: 4-6 weeks

---

## 🎯 IMMEDIATE PRIORITIES (Week 1)

### 🔴 Critical Blockers - Must Fix Before ANY Launch

- [ ] **1. Implement Job Application Flow** (Priority: CRITICAL)
  - [ ] Create `backend/src/api/applications.ts`
  - [ ] Add route: `POST /api/applications/apply`
  - [ ] Add route: `GET /api/applications/user/:userId`
  - [ ] Add route: `PUT /api/applications/:id/status`
  - [ ] Add unique constraint: `(jobSeekerId, jobId)` to prevent duplicate applications
  - [ ] Register route in `index.ts`: `app.use('/api/applications', applicationsRoutes)`
  - [ ] Test application submission flow end-to-end
  - **Impact**: Job seekers currently CANNOT apply to jobs

- [ ] **2. Implement Job Posting Flow** (Priority: CRITICAL)
  - [ ] Create `backend/src/api/jobs.ts`
  - [ ] Add route: `POST /api/jobs/create`
  - [ ] Add route: `GET /api/jobs` (list all jobs)
  - [ ] Add route: `GET /api/jobs/:id` (job details)
  - [ ] Add route: `PUT /api/jobs/:id` (update job)
  - [ ] Add route: `DELETE /api/jobs/:id` (close/delete job)
  - [ ] Link jobs to companies table
  - [ ] Register route in `index.ts`
  - [ ] Test job creation flow end-to-end
  - **Impact**: Recruiters currently CANNOT post jobs

- [ ] **3. Fix Socket.io Authentication** (Priority: CRITICAL - SECURITY)
  - [ ] Add JWT verification middleware for Socket.io connections
  - [ ] Validate userId on `join` event matches JWT claim
  - [ ] Validate senderId matches authenticated user on message send
  - [ ] Add rate limiting for Socket.io events (10 messages/min)
  - [ ] Persist messages to database before emitting
  - [ ] Add error handling for all Socket.io events
  - **Impact**: Current implementation allows message spoofing and impersonation

- [ ] **4. Replace Random Match Scores** (Priority: CRITICAL)
  - [ ] Remove `Math.random()` from `dashboard.ts`
  - [ ] Join with companies table to get real company names
  - [ ] Implement basic skill-based matching algorithm:
    - [ ] Calculate skill overlap percentage
    - [ ] Weight by experience level match
    - [ ] Consider location preferences
  - [ ] Add index on jobs table: `(status, postedAt)`
  - [ ] Filter out expired jobs: `WHERE expiresAt > NOW() OR expiresAt IS NULL`
  - **Impact**: Users currently get meaningless match scores

- [ ] **5. Add Token Refresh Interceptor** (Priority: CRITICAL)
  - [ ] Add 401 response interceptor in `authContext.tsx`
  - [ ] Call `POST /api/auth/refresh` on 401 error
  - [ ] Retry original request after successful refresh
  - [ ] Handle refresh failure (redirect to login)
  - [ ] Add refresh token expiry handling
  - **Impact**: Users get logged out after 15 minutes unexpectedly

---

## 🟠 HIGH PRIORITY (Week 2)

### Security & Data Integrity

- [ ] **6. Fix AI Service Type Contracts** (Priority: HIGH)
  - [ ] Audit all Python AI service APIs
  - [ ] Update `aiService.ts` method signatures to match
  - [ ] Remove stub methods that don't exist in Python
  - [ ] Add proper error handling with user-facing messages
  - [ ] Test all AI endpoints with actual Python services
  - **Files**: `backend/src/services/aiService.ts`, `backend/src/api/ai.ts`

- [ ] **7. Implement Onboarding Flow** (Priority: HIGH)
  - [ ] Create onboarding wizard component
  - [ ] Set `onboardingCompleted = true` after profile completion
  - [ ] Gate job applications behind onboarding check
  - [ ] Add middleware to verify onboarding completion
  - [ ] Add onboarding progress indicator
  - **Impact**: Currently users can access features with incomplete profiles

- [ ] **8. Implement Companies Management** (Priority: HIGH)
  - [ ] Create company creation form for recruiters
  - [ ] Link recruiter profiles to companies table
  - [ ] Update job creation to reference company
  - [ ] Display company logos and info on job listings
  - [ ] Add company profile pages
  - **Impact**: Currently all jobs show hardcoded "Company"

- [ ] **9. Persist Socket.io Messages** (Priority: HIGH)
  - [ ] Create messages table schema migration
  - [ ] Save all messages to database in Socket.io handler
  - [ ] Add message history endpoint: `GET /api/messages/history/:conversationId`
  - [ ] Implement message pagination
  - [ ] Add read receipts
  - **Impact**: Messages currently lost on server restart

---

## 🟡 MEDIUM PRIORITY (Week 3)

### Security Hardening

- [ ] **10. Strengthen Password Requirements** (Priority: MEDIUM)
  - [ ] Update Zod schema to require:
    - [ ] Minimum 12 characters
    - [ ] At least one uppercase letter
    - [ ] At least one lowercase letter
    - [ ] At least one number
    - [ ] At least one special character
  - [ ] Add password strength meter on frontend
  - [ ] Reject common passwords (implement password blacklist)
  - **File**: `backend/src/modules/auth/auth.dto.ts`

- [ ] **11. Implement Email Verification** (Priority: MEDIUM)
  - [ ] Set `isVerified: false` on registration
  - [ ] Generate verification token (JWT, 24hr expiry)
  - [ ] Send verification email with link
  - [ ] Create `POST /api/auth/verify-email` endpoint
  - [ ] Restrict features until email verified
  - [ ] Add resend verification email option
  - **Impact**: Currently anyone can register with any email

- [ ] **12. Fix File Upload Storage** (Priority: MEDIUM)
  - [ ] Configure multer.diskStorage instead of memory storage
  - [ ] Add filename sanitization
  - [ ] Implement file virus scanning (ClamAV)
  - [ ] Add file type validation on server side
  - [ ] Set up CDN/S3 for file storage
  - [ ] Add cleanup job for orphaned files
  - **File**: `backend/src/api/ai.ts`

- [ ] **13. Add Input Sanitization** (Priority: MEDIUM)
  - [ ] Install DOMPurify
  - [ ] Sanitize all user inputs before storage:
    - [ ] firstName, lastName
    - [ ] Job descriptions
    - [ ] Resume content
    - [ ] Messages
  - [ ] Escape HTML in all outputs
  - [ ] Add content security policy headers
  - **Impact**: Currently vulnerable to stored XSS

- [ ] **14. Fix Environment Validation** (Priority: MEDIUM)
  - [ ] Make `AI_SERVICE_URL` truly optional
  - [ ] Add default values for optional vars
  - [ ] Change `process.exit(1)` to log warning for optional vars
  - [ ] Allow server to start without AI services
  - [ ] Add graceful degradation for missing services
  - **File**: `backend/src/config/env.ts`

---

## 🟢 POLISH & OPTIMIZATION (Week 4)

### Developer Experience & UX

- [ ] **15. Implement Pagination** (Priority: LOW)
  - [ ] Add cursor-based pagination to jobs endpoint
  - [ ] Add pagination to applications endpoint
  - [ ] Add pagination to notifications endpoint
  - [ ] Implement infinite scroll on frontend
  - [ ] Add page size limits (max 50 items per request)

- [ ] **16. Standardize Error Responses** (Priority: LOW)
  - [ ] Create error response interface:
    ```typescript
    {
      status: 'error',
      code: string,
      message: string,
      details?: any
    }
    ```
  - [ ] Update all endpoints to use standard format
  - [ ] Create error code constants
  - [ ] Update frontend to handle standard format

- [ ] **17. Complete API Documentation** (Priority: LOW)
  - [ ] Add @swagger comments to all auth routes
  - [ ] Add @swagger comments to new applications routes
  - [ ] Add @swagger comments to new jobs routes
  - [ ] Update Swagger schemas
  - [ ] Test all documented endpoints in Swagger UI

- [ ] **18. Add Comprehensive Logging** (Priority: LOW)
  - [ ] Install Winston
  - [ ] Add structured logging for:
    - [ ] User registrations
    - [ ] Logins (success & failure)
    - [ ] Password changes
    - [ ] Application submissions
    - [ ] Job postings
    - [ ] Account deletions
  - [ ] Add request ID tracking
  - [ ] Set up log rotation

- [ ] **19. Handle Edge Cases** (Priority: LOW)
  - [ ] Add unique constraint on applications table
  - [ ] Add timezone support (store user timezone preference)
  - [ ] Add rate limiting to AI endpoints (5 req/min)
  - [ ] Handle expired jobs in queries
  - [ ] Add concurrent update handling (optimistic locking)

- [ ] **20. Implement Testing** (Priority: LOW)
  - [ ] Set up Jest for unit tests
  - [ ] Write tests for auth service (target 80% coverage)
  - [ ] Write tests for job application flow
  - [ ] Set up Supertest for API integration tests
  - [ ] Set up Playwright for E2E tests
  - [ ] Add k6 for load testing
  - [ ] Add to CI/CD pipeline

---

## 📋 VERIFICATION CHECKLIST

After completing critical fixes, verify:

### Functionality Tests
- [ ] User can register and receive verification email
- [ ] User can log in and stay logged in for 15+ minutes
- [ ] Job seeker can view job matches with real match scores
- [ ] Job seeker can apply to jobs (no duplicates allowed)
- [ ] Recruiter can create job postings linked to companies
- [ ] Recruiter can view and update application statuses
- [ ] Real-time messaging works with authentication
- [ ] Messages persist across server restarts

### Security Tests
- [ ] Password meets complexity requirements
- [ ] Socket.io prevents impersonation attempts
- [ ] Token refresh works transparently
- [ ] Rate limiting prevents brute force
- [ ] Input sanitization prevents XSS
- [ ] File uploads are secure

### Performance Tests
- [ ] Dashboard loads in < 2 seconds
- [ ] Job matching completes in < 1 second
- [ ] Socket.io handles 100 concurrent connections
- [ ] Database queries use proper indexes
- [ ] No N+1 query problems

---

## 🚀 DEPLOYMENT READINESS

### Before Production Launch:
- [ ] All 🔴 CRITICAL items completed and tested
- [ ] All 🟠 HIGH PRIORITY items completed
- [ ] Security audit passed
- [ ] Load testing passed (target: 1000 concurrent users)
- [ ] Database backups configured
- [ ] Monitoring and alerting set up
- [ ] Error tracking (Sentry) configured
- [ ] SSL certificates installed
- [ ] Environment variables validated
- [ ] Docker images tested in staging
- [ ] Rollback plan documented

---

## 📊 PROGRESS TRACKING

### Week 1 (Critical Blockers)
- **Completed**: 0 / 5
- **Status**: 🔴 NOT STARTED
- **Blockers**: None yet

### Week 2 (High Priority)
- **Completed**: 0 / 4
- **Status**: ⏸️ BLOCKED (needs Week 1 completion)

### Week 3 (Medium Priority)
- **Completed**: 0 / 5
- **Status**: ⏸️ BLOCKED

### Week 4 (Polish)
- **Completed**: 0 / 6
- **Status**: ⏸️ BLOCKED

---

## 🎯 SPRINT PLANNING

### Sprint 1 (Days 1-3): Applications & Jobs
- Implement `/api/applications` routes
- Implement `/api/jobs` routes
- End-to-end testing

### Sprint 2 (Days 4-5): Security
- Fix Socket.io authentication
- Add token refresh interceptor

### Sprint 3 (Days 6-7): Matching
- Replace random match scores
- Join companies table
- Filter expired jobs

---

**ESTIMATED COMPLETION**: 4-6 weeks with dedicated full-time developer

**CURRENT BLOCKER**: Core features missing - cannot proceed to production without Week 1 completion.

**RECOMMENDATION**: Focus exclusively on Week 1 critical items. Do not add new features until blockers resolved.