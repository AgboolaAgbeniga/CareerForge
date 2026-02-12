# Technical Implementation Plan: Bridging the "Maturity Gap"

**Date:** December 30, 2024
**Version:** 1.0
**Status:** Draft

## Executive Summary
This document outlines the technical strategy to align the CareerForge codebase with its documentation and architectural vision. The primary focus is upgrading the AI microservices from a "Hello World" state to a robust MVP capable of handling real file inputs and providing meaningful insights, while also polishing the frontend to match the premium design system.

## 1. AI Services Overhaul

### A. Resume Parser Service (`ai/resume_parser`)
**Current State:** Fails on binary files (PDF/DOCX). Uses simple regex/transformers.
**Target State:** Robust multi-format parsing with structured JSON output.

#### Implementation Steps:
1.  **File Ingestion Layer**:
    *   Replace simple `file.read().decode()` with format-specific handlers.
    *   **PDF**: Integrate `pypdf` or `pdfminder` for text extraction.
    *   **DOCX**: Integrate `python-docx` for Word documents.
    *   **Validation**: Add strict MIME-type checking (using `python-magic`).
2.  **NLP Pipeline Upgrade**:
    *   Integrate `spaCy` (`en_core_web_trf`) as the primary NLP engine for better entity recognition (replacing pure HuggingFace pipeline for speed/accuracy balance on standard entities).
    *   Implement **Section Segmentation**: Use regex/heuristics to split text into "Experience", "Education", "Skills" *before* NER processing to improve context.
3.  **Skill Extraction**:
    *   Enhance `parser.py` to use a larger, loaded taxonomy (JSON file) rather than a small hardcoded list.
    *   Use **FlashText** or Aho-Corasick algorithm for high-performance keyword matching against the taxonomy, falling back to Semantic Similarity (`sentence-transformers`) only for unmatched terms.

### B. Job Matching Engine (`ai/matching_engine`)
**Current State:** Basic weighted average of mock scores.
**Target State:** Vector-based semantic search + Scored properties.

#### Implementation Steps:
1.  **Vector Database Integration**:
    *   Although a full Vector DB (Pinecone/Weaviate) is documented, for the MVP we will implement a local **FAISS** index or **pgvector** (if Postgres is available) to store and retrieve job embeddings.
2.  **Scoring Algorithm Refinement**:
    *   **Semantic Score (40%)**: Cosine similarity of (Job Description Vector, Resume Vector).
    *   **Skill Overlap (30%)**: Jaccard index of extracted skills.
    *   **Experience Match (20%)**: Logic-based comparison of "Years Required" vs "Years Extracted".
    *   **Cultural/Soft (10%)**: Heuristic analysis of keywords (e.g., "collaborative", "remote") in the resume summary.

### C. Career Coach Chatbot (`ai/career_coach`)
**Current State:** Stateless REST API.
**Target State:** Session-aware conversational agent.

#### Implementation Steps:
1.  **Session Management**:
    *   Add a simple **Redis** or In-Memory store to hold conversation history (`session_id` -> `[messages]`).
    *   Pass context window to the LLM (Flan-T5) for multi-turn coherence.
2.  **WebSocket Layer** (Optional for Phase 1, strictly required for Phase 2):
    *   Implement `FastAPI` WebSockets for real-time typing indicators and streaming responses.

## 2. Frontend Engineering

### A. Component Architecture
1.  **Standardization**:
    *   Enforce the "Glassmorphism" design system using the newly created `KPICard` pattern across all dashboards.
    *   Refactor `ApplicationsTracker.tsx` to ensure `viewMode` toggles actually change the layout structure (Grid vs List).
2.  **Data Integration**:
    *   Connect the `AICareerCoach` component to the real Backend API (`/api/chat`) instead of mock responses.
    *   Implement the File Upload UI in `ProfileCompletionCard` to actually hit the `POST /resume/parse-file` endpoint.

## 3. Backend & Infrastructure

### A. API Gateway
1.  **Proxy Configuration**:
    *   Ensure the Node.js / Express backend correctly proxies requests to the Python AI microservices (running on ports 8000, 8001, 8002).
    *   Add timeouts and circuit breakers for AI service calls.

### B. Database Schema
1.  **Migrations**:
    *   Update `schema.ts` (Drizzle) to include fields for `match_score`, `parsed_skills` (JSONB), and `resume_embedding` (vector) to persist AI results.

## 4. Phased Roadmap

| Phase | Name | Focus | Duration (Est.) |
| :--- | :--- | :--- | :--- |
| **I** | **Foundation Fixes** | Binary file parsing, essential API connections, Database schema updates. | 1 Week |
| **II** | **Intelligence Upgrade** | NLP improvements, Vector matching logic, Session memory. | 2 Weeks |
| **III** | **Experience Polish** | Frontend animations, Loading states, Error handling, WebSockets. | 1 Week |
