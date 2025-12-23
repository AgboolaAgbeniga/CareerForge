# CareerForge Comprehensive Remediation & Development Plan

**Status:** Draft
**Target:** Production Readiness
**Author:** Senior Engineering Lead

This document outlines the step-by-step roadmap to transform the current MVP into a secure, scalable, and production-ready platform. It prioritizes critical security flaws and architectural tech debt before new feature development.

---

## 🛑 Phase 1: Security & Stabilization (Immediate Blockers)

*Goal: Stop the bleeding. Fix vulnerabilities that make the app unsafe or unusable.*

### 1.1 Auth Architecture Overhaul (Critical)
- **[ ] Backend**: Remove `localStorage` reliance. Implement HTTP-only Cookie logic for JWT handling.
    - [ ] Create `setCookie` / `clearCookie` utilities in `auth.ts`.
    - [ ] Update `/login` and `/refresh` endpoints to set cookies instead of returning tokens in body.
- **[ ] Frontend**: Update `authContext.tsx` to stop reading/writing `localStorage`.
    - [ ] Switch to a "silent refresh" pattern on app initialization.
- **[ ] Middleware**: Fix `middleware.ts` to properly parse cookies for protected routes.
    - [ ] Ensure edge cases (expired token, missing cookie) redirect cleanly to `/login`.

### 1.2 Access Control & Routing
- **[ ] Frontend**: Fix the "Hardcoded Redirect" in `LoginPage`.
    - [ ] Implement `getDashboardPath(role)` utility.
    - [ ] Redirect `job_seeker` -> `/job-seeker/dashboard` and `recruiter` -> `/recruiter/dashboard`.
- **[ ] Frontend**: Create `ProtectedRoute` HOC (Higher Order Component).
    - [ ] Replace inline auth checks in dashboards with `<ProtectedRoute allowedRoles={['...']}>`.

### 1.3 Data Integrity & Security
- **[ ] Database**: Encrypt 2FA Secrets.
    - [ ] Write migration to encrypt existing secrets (if any).
    - [ ] Update `auth.ts` to encrypt on save and decrypt on verify.
- **[ ] Frontend**: Fix Name Parsing in Signup.
    - [ ] Add explicit `First Name` and `Last Name` fields to the UI.
    - [ ] Remove `fullName.split(' ')` logic.

### 1.4 DevOps / Infrastructure
- **[ ] Database**: Run missing migrations.
    - [ ] Verify `onboardingCompleted` column exists in production DB.

---

## 🏗️ Phase 2: Core Architecture Refactor (The Foundation)

*Goal: Make the codebase maintainable and testable. Stop "Copy-Paste" coding.*

### 2.1 Backend Layering
- **[ ] Refactor**: Split `api/auth.ts` into a proper 3-layer architecture.
    - [ ] `Auth.Controller`: Handle Request/Response, validation.
    - [ ] `Auth.Service`: Business logic (hash passwords, generate tokens).
    - [ ] `Auth.Repository` (optional for now): DB queries.
- **[ ] Error Handling**: Global Error Middleware.
    - [ ] Create `AppError` class (status, message, isOperational).
    - [ ]  Replace `try/catch` spam with an async wrapper (`express-async-errors` or similar utility).

### 2.2 Frontend Infrastructure
- **[ ] Networking**: Create Centralized `ApiClient`.
    - [ ] Setup `axios` or custom `fetch` wrapper.
    - [ ] Add **Request Interceptor**: Auto-attach headers (if not using cookies).
    - [ ] Add **Response Interceptor**: Global error handling (toast notifications on 500s) and Auto-Logout on 401.
- **[ ] Constants**: Externalize "Magic Strings".
    - [ ] Move `/api/...` paths to a `endpoints.ts` config.

---

## 🧠 Phase 3: Real Feature Integration (No More Mock Data)

*Goal: Connect the wires. Make the app actually work.*

### 3.1 Dashboard Reality Check
- **[ ] Backend**: Update `dashboard.ts`.
    - [ ] Remove hardcoded "Figma/Slack" matches.
    - [ ] Interface with `matching.ts` logic or the Python AI service.
- **[ ] Frontend**: SWR / React Query Implementation.
    - [ ] Replace `useEffect` data fetching with a robust library for caching and revalidation.
    - [ ] Add **Loading Skeletons** for dashboard states.

### 3.2 AI Service Integration
- **[ ] Inter-Service Comm**: Secure communication between Node.js backend and Python AI services.
    - [ ] Define internal API contract (REST or gRPC).
    - [ ] Authenticate internal requests (Shared Secret).
- **[ ] Feature**: Real Resume Parsing.
    - [ ] Connect File Upload -> Node -> Python Parser -> DB.

---

## 🚀 Phase 4: Production Readiness (Scale & Polish)

*Goal: Prepare for real users and traffic.*

### 4.1 Performance & Reliability
- **[ ] Validation**: Strict Input Validation.
    - [ ] Apply `zod` schemas to ALL `PUT/POST` endpoints (Profile updates specifically).
- **[ ] Async Jobs**: Message Queue for Emails.
    - [ ] Setup Redis + BullMQ (or similar).
    - [ ] Move Email Sending and "AI Training" triggers to background jobs.
- **[ ] Pagination**: API optimization.
    - [ ] Add `page` and `limit` params to `dashboard` and `jobs` endpoints.

### 4.2 Observability
- **[ ] Logging**: Structured Logging.
    - [ ] Replace `console.log` with `winston` or `pino`.
    - [ ] Ensure logs include Request ID, User ID, and Timestamp.
- **[ ] Monitoring**: Health Checks.
    - [ ] Add detailed `/health` endpoint checking DB and Redis connectivity.

---

## 📋 Implementation Checklist (Sprint 1)

1. [ ] **[Security]** Implement HttpOnly Cookies for Auth.
2. [ ] **[Fix]** Correct Login Redirection Logic.
3. [ ] **[Refactor]** Create `ApiClient` for frontend.
4. [ ] **[Backend]** Decouple Auth Controller from Service logic.
5. [ ] **[Fix]** Fix Signup Name Splitting bug.