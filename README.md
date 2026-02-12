# 🚀 CareerForge - AI-Powered Career Management Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![AI](https://img.shields.io/badge/AI-Hugging%20Face-orange?logo=huggingface&logoColor=white)](https://huggingface.co/)

**CareerForge** is a comprehensive, enterprise-grade career management platform that leverages cutting-edge AI technology to revolutionize how job seekers and recruiters connect. Built with a modern microservices architecture, it provides intelligent job matching, AI-powered resume analysis, and personalized career coaching.

## ✨ Key Features

### 🎯 For Job Seekers
- **AI Resume Analysis**: Advanced parsing and optimization using NLP models
- **Intelligent Job Matching**: Semantic matching powered by transformer models
- **AI Career Coach**: Personalized career guidance and interview preparation
- **Real-time Messaging**: Direct communication with recruiters via WebSocket
- **Application Tracking**: Monitor application status and interview progress
- **Skill Gap Analysis**: Identify and address skill deficiencies
- **Cover Letter Generation**: AI-assisted personalized cover letters
- **LinkedIn Optimization**: Profile enhancement recommendations

### 🏢 For Recruiters & Companies
- **AI-Powered Candidate Discovery**: Find the best candidates using semantic search
- **Automated Resume Screening**: Filter and rank candidates intelligently
- **Advanced Analytics**: Comprehensive hiring metrics and insights
- **Bulk Resume Processing**: Handle multiple applications simultaneously
- **Interview Management**: Schedule and track interviews
- **Hiring Pipeline**: Visual candidate journey tracking
- **Company Profile Management**: Showcase company culture and opportunities

### 🤖 AI-Powered Features
- **Resume Parsing**: Extract structured data from PDFs, DOCX, and TXT files
- **Semantic Matching**: Advanced job-candidate matching algorithms
- **Career Coaching**: Personalized advice using language models
- **Content Generation**: Automated cover letters and profile optimization
- **Skill Extraction**: Identify technical and soft skills from resumes
- **Experience Analysis**: Parse work history and achievements
- **Market Insights**: Industry-specific career guidance

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   AI Services   │
│   (Next.js)     │◄──►│   (Express)     │◄──►│   (FastAPI)     │
│                 │    │                 │    │                 │
│ • User Interface│    │ • REST APIs     │    │ • Resume Parser │
│ • Real-time UI  │    │ • Authentication│    │ • Job Matching  │
│ • State Mgmt    │    │ • Database ORM  │    │ • Career Coach  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   PostgreSQL    │
                    │   (with pgvector)│
                    │                 │
                    │ • User Data     │
                    │ • Job Postings  │
                    │ • AI Embeddings │
                    │ • Analytics     │
                    └─────────────────┘
```

## 🛠️ Technology Stack

### Frontend (User Interface)
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Socket.io Client](https://socket.io/)** - Real-time communication
- **[Axios](https://axios-http.com/)** - HTTP client with interceptors
- **[React Hook Form](https://react-hook-form.com/)** - Form management
- **[Zod](https://zod.dev/)** - Schema validation
- **[Lucide React](https://lucide.dev/)** - Icon library

### Backend (API & Business Logic)
- **[Node.js](https://nodejs.org/)** - JavaScript runtime (v20+)
- **[Express.js](https://expressjs.com/)** - Web application framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Drizzle ORM](https://orm.drizzle.team/)** - Type-safe database ORM
- **[PostgreSQL](https://www.postgresql.org/)** - Primary database
- **[Socket.io](https://socket.io/)** - WebSocket implementation
- **[JWT](https://jwt.io/)** - Authentication tokens
- **[bcrypt](https://www.npmjs.com/package/bcrypt)** - Password hashing
- **[Speakeasy](https://www.npmjs.com/package/speakeasy)** - 2FA implementation
- **[Winston](https://github.com/winstonjs/winston)** - Logging
- **[Swagger/OpenAPI](https://swagger.io/)** - API documentation

### AI Services (Microservices Architecture)
- **[Python 3.9+](https://www.python.org/)** - AI service runtime
- **[FastAPI](https://fastapi.tiangolo.com/)** - High-performance API framework
- **[Hugging Face Transformers](https://huggingface.co/transformers/)** - Pre-trained models
- **[sentence-transformers](https://www.sbert.net/)** - Semantic embeddings
- **[scikit-learn](https://scikit-learn.org/)** - Machine learning algorithms
- **[pgvector](https://github.com/pgvector/pgvector)** - Vector similarity search
- **[Layout Parser](https://layout-parser.github.io/)** - Document layout analysis

### Database & Storage
- **[PostgreSQL 15+](https://www.postgresql.org/)** - Primary database
- **[pgvector Extension](https://github.com/pgvector/pgvector)** - Vector operations
- **[Drizzle ORM](https://orm.drizzle.team/)** - Type-safe database access
- **[Supabase](https://supabase.com/)** - Cloud database alternative
- **[Redis](https://redis.io/)** - Caching and session storage

### Infrastructure & Deployment
- **[Vercel](https://vercel.com/)** - Frontend hosting and deployment
- **[Render](https://render.com/)** - Backend and AI services hosting
- **[Docker](https://www.docker.com/)** - Containerization
- **[GitHub Actions](https://github.com/features/actions)** - CI/CD pipelines
- **[Husky](https://typicode.github.io/husky/)** - Git hooks
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting

## 📁 Project Structure

```
careerforge/
├── 📁 frontend/                    # Next.js frontend application
│   ├── 📁 app/                     # App Router pages and layouts
│   │   ├── 📁 (auth)/             # Authentication pages
│   │   ├── 📁 (job-seeker)/       # Job seeker protected routes
│   │   ├── 📁 (recruiter)/        # Recruiter protected routes
│   │   ├── 📁 api/                # API routes (if needed)
│   │   ├── globals.css            # Global styles
│   │   ├── layout.tsx             # Root layout
│   │   ├── page.tsx               # Home page
│   │   └── error.tsx              # Error boundary
│   ├── 📁 components/             # Reusable React components
│   │   ├── 📁 ui/                 # Base UI components
│   │   ├── 📁 layout/             # Layout components
│   │   ├── 📁 job-seeker/         # Job seeker components
│   │   ├── 📁 recruiter/          # Recruiter components
│   │   └── 📁 shared/             # Shared components
│   ├── 📁 lib/                    # Utilities and configurations
│   │   ├── 📁 api/                # API client configuration
│   │   ├── 📁 auth/               # Authentication utilities
│   │   ├── 📁 hooks/              # Custom React hooks
│   │   └── 📁 utils/              # Helper functions
│   ├── 📁 public/                 # Static assets
│   ├── middleware.ts              # Next.js middleware
│   ├── next.config.js             # Next.js configuration
│   ├── tailwind.config.js         # Tailwind configuration
│   └── package.json               # Frontend dependencies
│
├── 📁 backend/                     # Express.js API server
│   ├── 📁 src/
│   │   ├── 📁 api/                # API route handlers
│   │   │   ├── auth.ts            # Authentication endpoints
│   │   │   ├── resume.ts          # Resume management
│   │   │   ├── matching.ts        # Job matching
│   │   │   ├── messages.ts        # Messaging system
│   │   │   ├── ai.ts              # AI service integration
│   │   │   └── ...                # Other API routes
│   │   ├── 📁 middleware/         # Express middleware
│   │   │   ├── auth.ts            # Authentication middleware
│   │   │   ├── error.ts           # Error handling
│   │   │   └── ...                # Other middleware
│   │   ├── 📁 models/             # Database schemas
│   │   │   └── schema.ts          # Drizzle schema definitions
│   │   ├── 📁 services/           # Business logic services
│   │   │   └── aiService.ts       # AI service client
│   │   ├── 📁 utils/              # Utility functions
│   │   │   ├── database.ts        # Database connection
│   │   │   ├── logger.ts          # Logging utilities
│   │   │   └── ...                # Other utilities
│   │   └── index.ts               # Application entry point
│   ├── 📁 migrations/             # Database migrations
│   ├── 📁 uploads/                # File upload directory
│   ├── package.json               # Backend dependencies
│   └── Dockerfile                 # Docker configuration
│
├── 📁 ai/                          # Python AI microservices
│   ├── 📁 shared/                 # Shared AI utilities
│   │   ├── config.py              # Global configuration
│   │   ├── utils.py               # Common utilities
│   │   └── ...                    # Other shared modules
│   ├── 📁 resume_parser/          # Resume parsing service
│   │   ├── app.py                 # FastAPI application
│   │   ├── parser.py              # Core parsing logic
│   │   ├── Dockerfile             # Container definition
│   │   └── requirements.txt       # Python dependencies
│   ├── 📁 matching_engine/        # Job matching service
│   │   ├── app.py                 # FastAPI application
│   │   ├── matcher.py             # Matching algorithms
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   ├── 📁 career_coach/           # Career coaching service
│   │   ├── app.py                 # FastAPI application
│   │   ├── coach.py               # Coaching logic
│   │   ├── Dockerfile
│   │   └── requirements.txt
│   ├── 📁 vector/                 # Vector operations
│   │   ├── pgvector.py            # pgvector integration
│   │   └── router.py              # Vector API routes
│   ├── 📁 migrations/             # Database migrations
│   │   └── 001_add_pgvector.sql   # pgvector setup
│   ├── 📁 scripts/                # Utility scripts
│   │   ├── backfill_embeddings.py # Embedding generation
│   │   └── precache_models.py     # Model preloading
│   ├── docker-compose.yml         # Multi-service orchestration
│   └── README.md                  # AI services documentation
│
├── 📁 docs/                       # Documentation
│   ├── architecture.md            # System architecture
│   ├── deployment-guide.md        # Deployment instructions
│   ├── integration-report.md      # Integration analysis
│   └── ...                        # Other documentation
│
├── 📁 .github/                    # GitHub workflows
├── 📁 .husky/                     # Git hooks
├── docker-compose.prod.yml        # Production Docker setup
├── .gitignore                     # Git ignore rules
├── .eslintrc.json                 # ESLint configuration
├── commitlint.config.js           # Commit linting rules
└── README.md                      # This file
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **[Node.js](https://nodejs.org/)** (v20 or higher)
- **[Python](https://www.python.org/downloads/)** (v3.9 or higher)
- **[PostgreSQL](https://www.postgresql.org/download/)** (v15 or higher)
- **[Git](https://git-scm.com/)** for version control
- **[Docker](https://www.docker.com/products/docker-desktop/)** (optional, for containerized development)

### External Services

You'll also need accounts and API keys for:

- **[Hugging Face](https://huggingface.co/)** - For AI model access
- **[Supabase](https://supabase.com/)** or **[Railway](https://railway.app/)** - For cloud database (optional)
- **[Email Service](https://nodemailer.com/)** - For notifications (Gmail, SendGrid, etc.)

### Quick Start (Development)

#### 1. Clone the Repository

```bash
git clone https://github.com/your-username/careerforge.git
cd careerforge
```

#### 2. Database Setup

```bash
# Create PostgreSQL database
createdb careerforge

# Enable pgvector extension (required for AI features)
psql careerforge -c "CREATE EXTENSION IF NOT EXISTS vector;"

# Run database migrations
cd backend
psql $DATABASE_URL -f migrations/001_initial_schema.sql
psql $DATABASE_URL -f migrations/002_seed_data.sql

# Set up pgvector for AI services
psql $DATABASE_URL -f ../ai/migrations/001_add_pgvector.sql
```

#### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.production.template .env

# Edit .env with your configuration:
# DATABASE_URL=postgresql://username:password@localhost:5432/careerforge
# JWT_SECRET=your-32-character-secret-minimum
# JWT_REFRESH_SECRET=your-32-character-refresh-secret-minimum
# ENCRYPTION_KEY=64-character-hex-key
# FRONTEND_URL=http://localhost:3000
# AI_SERVICE_URL=http://localhost:8000

# Start development server
npm run dev
```

The backend API will be available at `http://localhost:5000`

#### 4. AI Services Setup

```bash
cd ../ai

# Install Python dependencies for each service
cd resume_parser && pip install -r requirements.txt && cd ..
cd matching_engine && pip install -r requirements.txt && cd ..
cd career_coach && pip install -r requirements.txt && cd ..

# Set up environment variables
cp .env.production.template .env

# Edit .env with your configuration:
# DATABASE_URL=postgresql://username:password@localhost:5432/careerforge
# HF_API_KEY=your_huggingface_api_key
# MODEL_CACHE_DIR=./models

# Start all AI services (in separate terminals)
cd resume_parser && python app.py  # Port 8000
cd matching_engine && python app.py  # Port 8001
cd career_coach && python app.py  # Port 8002
```

#### 5. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local

# Edit .env.local with your configuration:
# NEXT_PUBLIC_API_URL=http://localhost:5000
# NEXT_PUBLIC_SOCKET_URL=http://localhost:5000

# Start development server
npm run dev
```

The frontend application will be available at `http://localhost:3000`

### Docker Setup (Alternative)

For a fully containerized development environment:

```bash
# Start all services with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📚 API Documentation

CareerForge provides comprehensive API documentation with interactive testing capabilities:

### Interactive Swagger Documentation

#### Development Environment
- **Swagger UI**: `http://localhost:5000/api-docs`
- **OpenAPI JSON**: `http://localhost:5000/api-docs-json`

#### Production Environment (Render)
- **Swagger UI**: `https://your-backend.onrender.com/api-docs`
- **OpenAPI JSON**: `https://your-backend.onrender.com/api-docs-json`

> **Key Features:**
> - ✨ **Interactive Testing**: Try out endpoints directly in the browser
> - 📋 **Schema Documentation**: Complete request/response schemas
> - 🔐 **Authentication Examples**: JWT token usage demonstrations
> - 🌐 **Auto Server Detection**: Displays appropriate server URL per environment
> - 📱 **Mobile Responsive**: Works great on all devices
> - 🛠️ **Code Generation**: Generate client code for 50+ languages

> **Smart Server Detection**: The Swagger UI automatically detects your deployment environment and displays the correct server URL. In development, it shows `localhost:5000`, and when deployed to Render, it displays your actual production URL.

### API Endpoint Categories

### Authentication Endpoints

#### POST `/api/auth/register`
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "role": "job_seeker",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### POST `/api/auth/login`
Authenticate user and return JWT tokens.

#### GET `/api/auth/profile`
Get current user profile (requires authentication).

#### PUT `/api/auth/profile`
Update user profile information.

#### POST `/api/auth/2fa/setup`
Set up two-factor authentication.

#### POST `/api/auth/2fa/verify`
Verify 2FA token during login.

### Job Management Endpoints

#### POST `/api/jobs`
Create a new job posting (recruiters only).

**Request Body:**
```json
{
  "title": "Senior Software Engineer",
  "company": "Tech Corp",
  "description": "We are looking for...",
  "requirements": ["JavaScript", "React", "Node.js"],
  "experience_level": "senior",
  "location": "Remote",
  "salary_range": {
    "min": 120000,
    "max": 150000,
    "currency": "USD"
  }
}
```

#### GET `/api/jobs`
List available jobs with filtering and pagination.

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `search`: Search query
- `location`: Location filter
- `experience_level`: Experience level filter
- `salary_min`: Minimum salary
- `salary_max`: Maximum salary

#### GET `/api/jobs/:id`
Get detailed job information.

### Matching Endpoints

#### POST `/api/matching/match`
Find job matches for a candidate.

**Request Body:**
```json
{
  "candidate_id": 123,
  "preferences": {
    "job_types": ["full_time", "contract"],
    "locations": ["Remote", "New York"],
    "salary_min": 100000
  },
  "skills": ["JavaScript", "Python", "React"],
  "experience_years": 5
}
```

**Response:**
```json
{
  "matches": [
    {
      "job_id": 456,
      "score": 0.92,
      "reasons": ["Strong JavaScript skills", "Remote work preference match"],
      "job": {
        "title": "Full Stack Developer",
        "company": "StartupCo",
        "location": "Remote",
        "salary": {
          "min": 110000,
          "max": 140000,
          "currency": "USD"
        }
      }
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 20
}
```

### 📚 Interactive API Documentation

CareerForge provides comprehensive interactive API documentation powered by Swagger/OpenAPI:

#### Development
- **Swagger UI**: `http://localhost:5000/api-docs`
- **OpenAPI JSON**: `http://localhost:5000/api-docs-json`

#### Production (Render)
- **Swagger UI**: `https://your-backend.onrender.com/api-docs`
- **OpenAPI JSON**: `https://your-backend.onrender.com/api-docs-json`

> **Features:**
> - Interactive endpoint testing
> - Request/response schema documentation
> - Authentication flow examples
> - Real-time server URL detection
> - Code generation for multiple languages

> **Server Detection:** The Swagger UI automatically detects your environment and displays the appropriate server URL. In development, it shows `localhost:5000`, and in production on Render, it displays the actual deployment URL.

#### GET `/api/matching/suggestions/:candidate_id`
Get AI-powered job suggestions for a candidate.

### Resume Endpoints

#### POST `/api/resume/upload`
Upload and parse resume.

**Request:** `multipart/form-data`
- `file`: Resume file (PDF, DOCX, or TXT)
- `user_id`: User ID for association

#### GET `/api/resume/:id`
Get parsed resume data.

**Response:**
```json
{
  "id": 789,
  "user_id": 123,
  "personal_info": {
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+1-555-0123",
    "location": "San Francisco, CA"
  },
  "skills": [
    {"name": "JavaScript", "level": "expert"},
    {"name": "React", "level": "advanced"},
    {"name": "Node.js", "level": "advanced"}
  ],
  "experience": [
    {
      "title": "Senior Developer",
      "company": "Tech Corp",
      "start_date": "2020-01-01",
      "end_date": "2023-12-01",
      "description": "Led frontend development...",
      "skills_used": ["React", "TypeScript", "GraphQL"]
    }
  ],
  "education": [
    {
      "degree": "Bachelor of Science",
      "field": "Computer Science",
      "institution": "University of Technology",
      "graduation_year": 2019
    }
  ],
  "summary": "Experienced full-stack developer...",
  "confidence_score": 0.94
}
```

### AI Service Endpoints

#### Resume Parser Service (`http://localhost:8000`)

##### POST `/parse`
Parse resume text.

**Request:**
```json
{
  "text": "Resume content here..."
}
```

##### POST `/parse-file`
Parse uploaded resume file.

##### POST `/optimize`
Optimize resume for specific job.

**Request:**
```json
{
  "resume_text": "Current resume content...",
  "job_description": "Job requirements and description..."
}
```

#### Matching Engine Service (`http://localhost:8001`)

##### POST `/match`
Calculate match score between candidate and job.

**Request:**
```json
{
  "job_seeker": {
    "id": 1,
    "skills": ["Python", "React"],
    "experience_years": 3,
    "preferences": {
      "remote": true,
      "salary_min": 80000
    }
  },
  "job": {
    "id": 1,
    "title": "Software Engineer",
    "requirements": ["Python", "JavaScript", "React"],
    "experience_level": "mid",
    "salary_range": {
      "min": 75000,
      "max": 120000
    }
  }
}
```

**Response:**
```json
{
  "score": 0.85,
  "semantic_similarity": 0.82,
  "skill_match": 0.90,
  "experience_match": 0.80,
  "salary_match": 0.95,
  "reasons": [
    "Strong Python skills match",
    "Good experience level alignment",
    "Salary expectations within range"
  ]
}
```

#### Career Coach Service (`http://localhost:8002`)

##### POST `/advice`
Get personalized career advice.

**Request:**
```json
{
  "user_profile": {
    "experience_years": 2,
    "skills": ["Python", "SQL", "Data Analysis"],
    "current_role": "Data Analyst",
    "career_goals": "Transition to Machine Learning Engineer"
  },
  "context": "I want to advance my career in data science and machine learning"
}
```

**Response:**
```json
{
  "advice": "Based on your background in data analysis and SQL skills, focus on building machine learning expertise...",
  "action_items": [
    "Complete Andrew Ng's Machine Learning course",
    "Build 3 portfolio projects using scikit-learn",
    "Learn Python libraries: pandas, numpy, matplotlib",
    "Consider getting AWS or Google Cloud certification"
  ],
  "resources": [
    {"name": "Coursera ML Course", "url": "https://coursera.org/ml"},
    {"name": "Kaggle Learn", "url": "https://kaggle.com/learn"},
    {"name": "Fast.ai", "url": "https://fast.ai"}
  ],
  "skill_gaps": [
    {"skill": "Machine Learning", "priority": "high"},
    {"skill": "Python", "priority": "medium"},
    {"skill": "Statistics", "priority": "medium"}
  ],
  "confidence_score": 0.88
}
```

### Messaging Endpoints

#### WebSocket Events
Connect to `ws://localhost:5000/socket.io/`

##### Client Events
- `join`: Join user-specific room
- `sendMessage`: Send a message to another user
- `typing`: Indicate typing status
- `read`: Mark message as read

##### Server Events
- `newMessage`: Receive new message
- `userOnline`: User came online
- `userOffline`: User went offline
- `typing`: User is typing

#### REST Endpoints
- `GET /api/messages` - Get user messages
- `POST /api/messages` - Send message
- `PUT /api/messages/:id/read` - Mark as read

### Analytics Endpoints

#### GET `/api/analytics/dashboard`
Get user dashboard analytics.

**Response:**
```json
{
  "job_seeker": {
    "total_applications": 25,
    "interviews_scheduled": 3,
    "profile_views": 150,
    "match_score_avg": 0.78,
    "recent_activity": [...]
  },
  "recruiter": {
    "active_job_postings": 12,
    "total_applications": 340,
    "candidates_viewed": 89,
    "hires_this_month": 2,
    "pipeline_metrics": [...]
  }
}
```

## 🔧 Development

### Available Scripts

#### Frontend
```bash
cd frontend

# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Run tests
npm run test

# Run E2E tests with Cypress
npm run test:e2e
```

#### Backend
```bash
cd backend

# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format

# Generate database migrations
npm run generate

# Apply database migrations
npm run migrate
```

#### AI Services
```bash
cd ai

# Start individual services
cd resume_parser && python app.py
cd matching_engine && python app.py
cd career_coach && python app.py

# Or start all services with Docker Compose
docker-compose up -d

# Test Hugging Face integration
python test_hf_api.py

# Pre-cache AI models
python scripts/precache_models.py
```

### Code Quality Standards

#### TypeScript Configuration
- **Strict mode enabled** for type safety
- **Path mapping** for clean imports
- **ESLint + Prettier** for code consistency
- **Husky git hooks** for pre-commit checks

#### Python Standards
- **Type hints** for all functions
- **PEP 8** compliance
- **Docstrings** for classes and methods
- **pytest** for testing
- **Black** for code formatting

#### Database
- **Drizzle ORM** for type-safe queries
- **Migrations** for schema changes
- **pgvector** for vector operations
- **Connection pooling** for performance

### Testing Strategy

#### Frontend Testing
```bash
# Unit tests with Jest
npm test

# Component testing
npm run test:components

# E2E testing with Cypress
npm run test:e2e

# Visual regression testing
npm run test:visual
```

#### Backend Testing
```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# API testing with Supertest
npm run test:api

# Load testing
npm run test:load
```

#### AI Services Testing
```bash
# Model testing
python -m pytest tests/test_models.py

# API endpoint testing
python -m pytest tests/test_api.py

# Performance testing
python -m pytest tests/test_performance.py
```

### Git Workflow

#### Commit Convention
We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Feature commits
git commit -m "feat: add job matching algorithm v2"

# Bug fixes
git commit -m "fix: resolve CORS issue in AI service"

# Documentation
git commit -m "docs: update API documentation"

# Tests
git commit -m "test: add integration tests for resume parser"

# Refactoring
git commit -m "refactor: improve error handling in backend"
```

#### Branch Strategy
- `main` - Production-ready code
- `develop` - Integration branch
- `feature/*` - New features
- `fix/*` - Bug fixes
- `hotfix/*` - Critical fixes

#### Pre-commit Hooks
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking
- **Unit tests** - Basic validation

## 🚀 Deployment

### Production Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Vercel        │    │   Render        │    │   Render        │
│   (Frontend)    │◄──►│   (Backend)     │◄──►│   (AI Services) │
│                 │    │                 │    │                 │
│ • Next.js App   │    │ • Express API   │    │ • FastAPI       │
│ • CDN           │    │ • PostgreSQL    │    │ • Models        │
│ • SSL           │    │ • WebSocket     │    │ • pgvector      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │
                    ┌─────────────────┐
                    │   Cloud DB      │
                    │   (Supabase/    │
                    │    Railway)     │
                    │                 │
                    │ • PostgreSQL    │
                    │ • pgvector      │
                    │ • Backups       │
                    └─────────────────┘
```

### Deployment Checklist

#### Pre-Deployment
- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] AI models pre-cached
- [ ] SSL certificates configured
- [ ] Domain names configured
- [ ] Health checks implemented
- [ ] Monitoring set up

#### Environment Variables

**Frontend (Vercel)**
```bash
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
NEXT_PUBLIC_SOCKET_URL=https://your-backend.onrender.com
```

**Backend (Render)**
```bash
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://username:password@host:port/database
JWT_SECRET=your-32-character-secret-minimum
JWT_REFRESH_SECRET=your-32-character-refresh-secret-minimum
JWT_RESET_SECRET=your-32-character-reset-secret-minimum
ENCRYPTION_KEY=64-character-hex-key
FRONTEND_URL=https://your-frontend.vercel.app
AI_SERVICE_URL=https://your-ai-services.onrender.com
```

**AI Services (Render)**
```bash
NODE_ENV=production
PORT=8000
DATABASE_URL=postgresql://username:password@host:port/database
HF_API_KEY=hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
MODEL_CACHE_DIR=/app/models
LOG_LEVEL=info
```

### Step-by-Step Deployment

#### 1. Database Setup
```bash
# Create production database (Supabase/Railway)
# Enable pgvector extension
psql $DATABASE_URL -c "CREATE EXTENSION IF NOT EXISTS vector;"

# Run migrations
psql $DATABASE_URL -f backend/migrations/001_initial_schema.sql
psql $DATABASE_URL -f backend/migrations/002_seed_data.sql
psql $DATABASE_URL -f ai/migrations/001_add_pgvector.sql
```

#### 2. Backend Deployment (Render)
1. Connect GitHub repository to Render
2. Configure build settings:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: 20
3. Set environment variables (see above)
4. Deploy and note the service URL

#### 3. AI Services Deployment (Render)
1. Create separate Render services for each AI service
2. Configure each service:
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python app.py`
3. Set environment variables (see above)
4. Deploy and note the service URLs

#### 4. Frontend Deployment (Vercel)
1. Connect GitHub repository to Vercel
2. Configure settings:
   - **Framework**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
3. Set environment variables (see above)
4. Deploy and note the service URL

#### 5. Final Integration
1. Update backend environment variable `AI_SERVICE_URL` with actual AI service URL
2. Update backend environment variable `FRONTEND_URL` with actual frontend URL
3. Update AI services CORS settings with actual frontend URL
4. Redeploy affected services

### Monitoring & Maintenance

#### Health Checks
- **Backend**: `https://your-backend.onrender.com/health`
- **AI Services**: `https://your-ai-service.onrender.com/health`
- **Frontend**: Available via Vercel dashboard

#### Logging
- **Application logs**: Render dashboard
- **Database logs**: Supabase/Railway dashboard
- **Frontend logs**: Vercel dashboard

#### Performance Monitoring
- **Response times**: Monitor API endpoint performance
- **Database performance**: Query execution times
- **AI service latency**: Model inference times
- **Error rates**: Track 4xx/5xx responses

## 🔒 Security

### Authentication & Authorization
- **JWT tokens** with short expiration times
- **Refresh tokens** for session management
- **Role-based access control** (job_seeker, recruiter, admin)
- **Two-factor authentication** support
- **Password strength requirements**

### Data Protection
- **bcrypt password hashing** with salt rounds
- **Input validation** with Zod schemas
- **SQL injection prevention** via parameterized queries
- **XSS protection** with DOMPurify
- **CORS configuration** for API security

### Infrastructure Security
- **Environment variables** for sensitive data
- **HTTPS enforcement** for all communications
- **Security headers** via Helmet.js
- **Rate limiting** to prevent abuse
- **File upload restrictions** and validation

### AI Service Security
- **API key authentication** for Hugging Face
- **Input sanitization** for AI prompts
- **Model version pinning** for consistency
- **Resource limits** to prevent abuse

## 📊 Performance

### Optimization Strategies
- **Database indexing** for query optimization
- **Connection pooling** for database efficiency
- **Redis caching** for frequently accessed data
- **CDN distribution** for static assets
- **Code splitting** for faster page loads
- **Image optimization** with Next.js Image component
- **Bundle analysis** to reduce JavaScript size

### Scaling Considerations
- **Horizontal scaling** of AI services
- **Database read replicas** for heavy read workloads
- **Load balancing** across multiple instances
- **Auto-scaling** based on traffic patterns
- **Caching strategies** for improved response times

## 🤝 Contributing

We welcome contributions to CareerForge! Please follow these guidelines:

### Getting Started
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following our coding standards
4. Add tests for your changes
5. Commit your changes: `git commit -m 'feat: add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Code Standards
- **Follow TypeScript strict mode** for frontend/backend
- **Use type hints** for all Python functions
- **Write comprehensive tests** for new features
- **Update documentation** for API changes
- **Follow conventional commits** for commit messages
- **Ensure ESLint and Prettier** pass without errors

### Pull Request Process
1. Ensure your code follows the established style guidelines
2. Add tests that cover your changes
3. Update documentation as needed
4. The PR must pass all CI/CD checks
5. At least one review approval required
6. Squash and merge when approved

### Issue Reporting
When reporting issues, please include:
- **Clear description** of the problem
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Environment details** (OS, Node.js version, etc.)
- **Screenshots** if applicable

## 📈 Roadmap

### Phase 1 (Current)
- [x] Core platform functionality
- [x] AI-powered matching
- [x] Resume parsing and optimization
- [x] Real-time messaging
- [x] Basic analytics

### Phase 2 (Next Quarter)
- [ ] Advanced search and filtering
- [ ] Video interview integration
- [ ] Mobile application
- [ ] Advanced analytics dashboard
- [ ] Multi-language support

### Phase 3 (Future)
- [ ] AI-powered interview coaching
- [ ] Salary prediction models
- [ ] Industry-specific matching
- [ ] Integration with job boards
- [ ] Advanced reporting and insights

### Long-term Vision
- [ ] Global job market integration
- [ ] VR/AR interview capabilities
- [ ] Blockchain-based credential verification
- [ ] Advanced AI career planning
- [ ] Enterprise features and SSO

## 📞 Support

### Documentation
- **[Architecture Guide](docs/architecture.md)** - System design and architecture
- **[Deployment Guide](DEPLOYMENT_GUIDE.md)** - Step-by-step deployment
- **[Integration Report](INTEGRATION_REPORT.md)** - Service integration analysis
- **[API Documentation](backend/README.md)** - Backend API reference

### Community
- **GitHub Issues** - Bug reports and feature requests
- **GitHub Discussions** - General questions and ideas
- **Wiki** - Extended documentation and tutorials

### Professional Support
For enterprise support, customization, or consulting services, please contact us through the GitHub repository.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[Hugging Face](https://huggingface.co/)** for providing state-of-the-art AI models
- **[Vercel](https://vercel.com/)** for excellent deployment platform
- **[Render](https://render.com/)** for reliable hosting services
- **[Supabase](https://supabase.com/)** for database infrastructure
- **Open source community** for the amazing tools and libraries

---

**Built with ❤️ by the CareerForge team**

*Transforming careers through intelligent matching and AI-powered insights.*

[![GitHub stars](https://img.shields.io/github/stars/your-username/careerforge?style=social)](https://github.com/your-username/careerforge)
[![GitHub forks](https://img.shields.io/github/forks/your-username/careerforge?style=social)](https://github.com/your-username/careerforge)
[![Twitter](https://img.shields.io/twitter/follow/your-handle?style=social)](https://twitter.com/your-handle)
