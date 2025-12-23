# CareerForge System Architecture

## Overview

CareerForge is a comprehensive job matching platform that leverages AI to connect job seekers with recruiters. The system is built as a microservices architecture with separate services for the frontend, backend API, and AI processing capabilities.

## System Architecture

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   AI Services   │
│   (Next.js)     │◄──►│   (Node.js)     │◄──►│   (Python)      │
│                 │    │                 │    │                 │
│ • User Interface│    │ • REST API      │    │ • Resume Parser │
│ • Authentication │    │ • WebSocket     │    │ • Matching     │
│ • Real-time     │    │ • Database       │    │ • Career Coach │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌─────────────────┐
                    │   Database      │
                    │   (PostgreSQL)  │
                    └─────────────────┘
```

### Component Breakdown

#### 1. Frontend Service
- **Technology**: Next.js 14, TypeScript, Tailwind CSS
- **Purpose**: User interface and client-side logic
- **Key Features**:
  - Responsive web application
  - Real-time messaging via WebSocket
  - Role-based UI (Job Seeker vs Recruiter)
  - PWA capabilities

#### 2. Backend API Service
- **Technology**: Node.js, Express, TypeScript, PostgreSQL
- **Purpose**: Business logic, API endpoints, data management
- **Key Features**:
  - RESTful API with OpenAPI documentation
  - JWT authentication and authorization
  - Real-time communication via Socket.io
  - Comprehensive error handling and logging

#### 3. AI Services (Microservices)
- **Technology**: Python, FastAPI, Hugging Face Transformers
- **Components**:
  - **Resume Parser**: Extracts structured data from resumes
  - **Matching Engine**: Calculates job-candidate compatibility
  - **Career Coach**: Provides personalized career guidance
- **Purpose**: AI-powered processing and recommendations

#### 4. Database
- **Technology**: PostgreSQL
- **Purpose**: Persistent data storage
- **Key Features**:
  - ACID compliance
  - JSON support for flexible data
  - Full-text search capabilities
  - Optimized for OLTP workloads

## Data Flow

### User Registration & Authentication

```
1. User submits registration form
2. Frontend → Backend API (POST /api/auth/register)
3. Backend validates input and creates user
4. Backend → Database (INSERT user)
5. Backend sends verification email
6. User verifies email
7. Backend updates user verification status
```

### Job Application Process

```
1. Job Seeker uploads resume
2. Frontend → Backend API (POST /api/resume/upload)
3. Backend → AI Service (POST /parse)
4. AI Service processes resume and returns structured data
5. Backend stores parsed data
6. Job Seeker applies to job
7. Backend → AI Service (POST /match)
8. AI Service calculates match score
9. Backend creates application record
10. Recruiter receives notification
```

### Real-time Messaging

```
1. User sends message
2. Frontend → Backend API (WebSocket emit)
3. Backend validates and stores message
4. Backend broadcasts to recipient (WebSocket emit)
5. Recipient frontend receives message
```

## Database Schema

### Core Entities

#### Users
- **Purpose**: Authentication and basic user information
- **Key Fields**: id, email, password_hash, role, first_name, last_name
- **Relationships**: One-to-one with job_seekers/recruiters

#### Job Seekers
- **Purpose**: Job seeker profiles and preferences
- **Key Fields**: id, title, experience_years, skills, education
- **Relationships**: One-to-one with users, many-to-many with jobs (applications)

#### Recruiters
- **Purpose**: Recruiter profiles and company information
- **Key Fields**: id, company_name, industry, title, experience_years
- **Relationships**: One-to-one with users, one-to-many with jobs

#### Jobs
- **Purpose**: Job postings and requirements
- **Key Fields**: id, recruiter_id, title, description, requirements, skills_required
- **Relationships**: Many-to-one with recruiters, many-to-many with job_seekers (applications)

#### Applications
- **Purpose**: Job applications and status tracking
- **Key Fields**: id, job_seeker_id, job_id, status, applied_at, match_score
- **Relationships**: Many-to-one with job_seekers and jobs

#### Messages
- **Purpose**: Communication between users
- **Key Fields**: id, sender_id, recipient_id, subject, content, message_type
- **Relationships**: Many-to-one with users (sender and recipient)

## API Design

### RESTful Endpoints

#### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Token refresh
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

#### Jobs
- `GET /api/jobs` - List jobs with filtering
- `POST /api/jobs` - Create job (recruiters)
- `GET /api/jobs/:id` - Get job details
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

#### Applications
- `POST /api/applications` - Submit application
- `GET /api/applications` - List user applications
- `PUT /api/applications/:id` - Update application status

#### AI Services Integration
- `POST /api/ai/parse-resume` - Parse resume
- `POST /api/ai/match` - Calculate match score
- `POST /api/ai/coach` - Get career advice

### WebSocket Events

#### Client to Server
- `join` - Join user room for messaging
- `sendMessage` - Send message to another user
- `typing` - Indicate typing status

#### Server to Client
- `newMessage` - Receive new message
- `userJoined` - User joined room
- `userLeft` - User left room

## AI Integration Architecture

### Resume Parser Service

```
Input: Resume text/PDF
├── Text Extraction (PDF → Text)
├── Named Entity Recognition (NER)
├── Skill Extraction (Semantic Similarity)
├── Experience Parsing (Regex + NLP)
├── Education Parsing
└── Output: Structured JSON
```

### Matching Engine Service

```
Input: Job Seeker Profile + Job Posting
├── Text Representation Generation
├── Semantic Embedding (Sentence Transformers)
├── Skill Matching (Direct + Semantic)
├── Experience Scoring
├── Weighted Score Calculation
└── Output: Match Score + Reasoning
```

### Career Coach Service

```
Input: User Profile + Context
├── Situation Analysis
├── Advice Generation (Hugging Face)
├── Action Item Creation
├── Resource Recommendation
└── Output: Personalized Advice
```

## Security Architecture

### Authentication & Authorization

- **JWT Tokens**: Stateless authentication
- **Role-Based Access**: job_seeker, recruiter roles
- **Password Security**: bcrypt hashing
- **Session Management**: Refresh token rotation

### Data Protection

- **Input Validation**: Zod schemas for all inputs
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Input sanitization
- **CSRF Protection**: SameSite cookies

### Network Security

- **HTTPS**: SSL/TLS encryption
- **CORS**: Configured origins
- **Rate Limiting**: Request throttling
- **Helmet**: Security headers

## Scalability Considerations

### Horizontal Scaling

- **Stateless Services**: All services can be horizontally scaled
- **Load Balancing**: Nginx or cloud load balancers
- **Database Sharding**: For high-volume deployments
- **CDN**: Static asset delivery

### Performance Optimization

- **Caching**: Redis for session and API response caching
- **Database Indexing**: Optimized queries with proper indexes
- **CDN**: Static asset delivery
- **Compression**: Gzip compression for responses

### Monitoring & Observability

- **Application Metrics**: Response times, error rates
- **Infrastructure Monitoring**: CPU, memory, disk usage
- **Logging**: Structured logging with correlation IDs
- **Alerting**: Automated alerts for critical issues

## Deployment Architecture

### Development Environment

```
Local Machine
├── Frontend: http://localhost:3000
├── Backend: http://localhost:5000
├── AI Services: http://localhost:8000-8002
└── Database: localhost:5432
```

### Production Environment

```
Cloud Infrastructure (AWS/GCP/Azure)
├── Load Balancer (Nginx/ALB)
├── Frontend (CDN + Serverless)
├── Backend (Containerized)
├── AI Services (Containerized)
├── Database (Managed PostgreSQL)
└── Redis (Caching)
```

### Containerization

- **Docker**: All services containerized
- **Docker Compose**: Local development orchestration
- **Kubernetes**: Production orchestration (future)

## Technology Choices Rationale

### Frontend: Next.js
- **SSR/SSG**: Better SEO and performance
- **TypeScript**: Type safety and developer experience
- **App Router**: Modern React patterns
- **Vercel Integration**: Easy deployment

### Backend: Node.js + Express
- **JavaScript Ecosystem**: Unified language stack
- **Performance**: Non-blocking I/O
- **NPM Packages**: Rich ecosystem
- **Microservices Ready**: Easy to split services

### AI Services: Python + FastAPI
- **ML Libraries**: Rich Python ML ecosystem
- **Hugging Face**: Best NLP model repository
- **FastAPI**: High-performance async API
- **Type Hints**: Better code maintainability

### Database: PostgreSQL
- **ACID Compliance**: Data integrity
- **JSON Support**: Flexible schema
- **Full-Text Search**: Advanced search capabilities
- **Extensions**: Rich feature set

## Future Enhancements

### Short Term
- [ ] GraphQL API for flexible queries
- [ ] Advanced caching layer (Redis)
- [ ] Real-time notifications
- [ ] Mobile app development

### Long Term
- [ ] Multi-region deployment
- [ ] Advanced AI features (video analysis)
- [ ] Machine learning model training pipeline
- [ ] Advanced analytics and reporting

## Conclusion

CareerForge's architecture provides a scalable, maintainable, and extensible foundation for AI-powered job matching. The microservices approach allows for independent scaling and deployment of components, while the comprehensive AI integration provides unique value in the job matching space.

The system is designed to handle growth from startup to enterprise scale, with clear separation of concerns and robust error handling throughout.