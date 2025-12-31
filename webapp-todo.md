# CareerForge Implementation Checklist

## 🚨 Critical Fixes (Phase 1)
- [ ] **Fix Resume Parser File Handling**
    - [x] Install `pdfplumber` or `PyMuPDF`, `python-docx`, and `beautifulsoup4` in `ai/resume_parser/requirements.txt`.
    - [x] Update `ai/resume_parser/app.py` to detect MIME types (`application/pdf`, `application/msword`, `text/html`, `text/plain`).
    - [x] Implement `extract_text_from_pdf` using `pdfplumber` or `PyMuPDF`.
    - [x] Implement `extract_text_from_docx` using `python-docx`.
    - [x] Implement `extract_text_from_html` using `BeautifulSoup`.
    - [x] Continue support for raw TXT files.
    - [x] Integrate OCR for scanned PDFs using `pytesseract` + `Pillow` (mark as beta if needed).
    - [ ] Verification: Test uploading real PDF, DOCX, HTML, and TXT resumes.
- [x] **Backend-AI Connection**
    - [x] Verify `backend/src/api` endpoints correctly forward requests to `localhost:8000/8001/8002`.
    - [x] Handle "Connection Refused" errors gracefully in the Node backend if AI services are down.
- [x] **Career Coach WebSocket Support**
    - [x] Add WebSocket protocol support (`Socket.IO` or FastAPI WebSockets).
    - [x] Refactor architecture to support stateful conversations (session tracking).
    - [x] Verification: Test interactive interview prep via WebSocket sessions.

---

## 🧠 AI Enhancements (Phase 2)
- [ ] **Improve Matching Logic (`ai/matching_engine`)**
    - [x] Replace weighted average formula with ML models:
        - [x] Integrate `XGBoost` placeholder structure (Pending trained model).
        - [x] Use Sentence Transformers (`all-MiniLM-L6-v2`) for semantic similarity.
    - [x] Implement Jaccard Similarity for skill sets.
    - [x] Implement "Experience Year" extraction and numeric comparison.
    - [ ] Create a persistent `SkillDatabase` (JSON/Dict) for broader matching.
    - [ ] Implement cultural fit scoring (survey data, values matching).
    - [ ] Optimize performance with batch processing (vectorized operations, multiprocessing).
- [ ] **Resume Parser NLP Enhancements**
    - [ ] Integrate `spaCy` transformer pipeline alongside Hugging Face NER.
    - [ ] Replace fixed skill list with taxonomy‑based skill extraction (BiLSTM‑CRF or transformer fine‑tuning).
    - [ ] Implement webhook support for resume parsing completion events.
- [x] **Career Coach State**
    - [x] Add in-memory session storage in `ai/career_coach/app.py` (Created `session_manager.py`).
    - [x] Update `/advice` endpoint to accept and utilize `session_id`.
    - [ ] Replace static interview templates with dynamic generation (fine‑tuned Hugging Face models).

---

## 🎨 Frontend Refactoring (Phase 3)
- [x] **Audit `ApplicationsTracker.tsx`**
    - [x] Ensure "Kanban" vs "List" view actually changes the rendering structure.
    - [x] Verify data props are mapped correctly to cards.
    - [x] Add real‑time updates via WebSockets.
- [x] **Job Seeker Dashboard Integration**
    - [x] Wire up "Upload Resume" button to `POST /api/resume/parse` (Added `/parse-file` endpoint and UI integration).
    - [x] Display real "Match Score" on Job Cards (fetched from `matching_engine` - Logic in place, mocked data ready).
- [ ] **Recruiter Dashboard**
    - [x] Refactor "Top AI Matches" list to use a dynamic component.
    - [x] Ensure `KPICards` in Recruiter Dashboard uses the new reusable component.
    - [x] Refactor `KPICards.tsx` into reusable `KPICard` component with props.
    - [x] Add animations using `framer-motion`.

---

## 🏗️ Infrastructure & Docs (Phase 4)
- [x] **Database Schema**
    - [x] Add `skills` (JSON) and `match_score` (Float) to `applications` table in `backend/src/models/schema.ts`.
    - [x] Run Drizzle migrations (Schema updated locally; SQL generated and verified locally by user).
- [x] **Documentation Cleanup**
    - [x] Update `docs/content/ai-services/*.ts` to reflect the "Phase 1" reality (or mark future features as "Coming Soon").
    - [x] Add `PDF Support` section to `audit_report.md` once fixed.
    - [x] Add “beta” tags to features not yet fully implemented (OCR, cultural fit, advanced ML).
    - [ ] Sync OpenAPI/Swagger docs with backend changes.

---

## 🧪 Testing & QA (Phase 5)
- [x] **Unit Tests**
    - [x] Write unit tests for file parsing (PDF, DOCX, HTML, TXT) - Added `ai/tests/test_extractor.py`.
    - [x] Write unit tests for Career Coach logic - Added `ai/tests/test_career_coach.py`.
    - [x] Write unit tests for resume parsing NLP pipeline - Added `ai/tests/test_nlp_pipeline.py`.
- [x] **Integration Tests**
    - [x] Test resume parsing + job matching end‑to‑end (Added `test_integration_resume_matching.py`).
    - [x] Test Career Coach WebSocket sessions (Added `test_integration_career_coach.py`).
- [ ] **Load Testing**
    - [ ] Benchmark job matching engine for batch >1000/sec.
- [ ] **Frontend Tests**
    - [ ] Verify KPICard animations and Application Tracker toggles.
    - [ ] Ensure WebSocket updates render correctly in dashboards.
