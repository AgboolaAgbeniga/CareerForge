import { AppShell } from '@/components/AppShell'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'System Architecture | CareerForge Documentation',
  description: 'Comprehensive overview of CareerForge system architecture, microservices design, component relationships, data flows, and technology stack.',
  openGraph: {
    title: 'CareerForge System Architecture',
    description: 'Comprehensive overview of the system architecture and component relationships',
    type: 'website',
  },
}

export default function ArchitecturePage() {
  return (
    <AppShell>
      <div className="py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            CareerForge System Architecture
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive overview of the system architecture and component relationships
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>Overview</h2>
          <p>
            CareerForge is a comprehensive job matching platform that leverages AI to connect job seekers with recruiters. 
            The system is built as a microservices architecture with separate services for the frontend, backend API, and AI processing capabilities.
          </p>

          <h2>System Architecture</h2>

          <h3>High-Level Architecture</h3>
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
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
                    └─────────────────┘`}</code>
            </pre>
          </div>

          <h3>Component Breakdown</h3>

          <h4>1. Frontend Service</h4>
          <ul>
            <li><strong>Technology:</strong> Next.js 14, TypeScript, Tailwind CSS</li>
            <li><strong>Purpose:</strong> User interface and client-side logic</li>
            <li><strong>Key Features:</strong>
              <ul>
                <li>Responsive web application</li>
                <li>Real-time messaging via WebSocket</li>
                <li>Role-based UI (Job Seeker vs Recruiter)</li>
                <li>PWA capabilities</li>
              </ul>
            </li>
          </ul>

          <h4>2. Backend API Service</h4>
          <ul>
            <li><strong>Technology:</strong> Node.js, Express, TypeScript, PostgreSQL</li>
            <li><strong>Purpose:</strong> Business logic, API endpoints, data management</li>
            <li><strong>Key Features:</strong>
              <ul>
                <li>RESTful API with OpenAPI documentation</li>
                <li>JWT authentication and authorization</li>
                <li>Real-time communication via Socket.io</li>
                <li>Comprehensive error handling and logging</li>
              </ul>
            </li>
          </ul>

          <h4>3. AI Services (Microservices)</h4>
          <ul>
            <li><strong>Technology:</strong> Python, FastAPI, Hugging Face Transformers</li>
            <li><strong>Components:</strong>
              <ul>
                <li><strong>Resume Parser:</strong> Extracts structured data from resumes</li>
                <li><strong>Matching Engine:</strong> Calculates job-candidate compatibility</li>
                <li><strong>Career Coach:</strong> Provides personalized career guidance</li>
              </ul>
            </li>
            <li><strong>Purpose:</strong> AI-powered processing and recommendations</li>
          </ul>

          <h4>4. Database</h4>
          <ul>
            <li><strong>Technology:</strong> PostgreSQL</li>
            <li><strong>Purpose:</strong> Persistent data storage</li>
            <li><strong>Key Features:</strong>
              <ul>
                <li>ACID compliance</li>
                <li>JSON support for flexible data</li>
                <li>Full-text search capabilities</li>
                <li>Optimized for OLTP workloads</li>
              </ul>
            </li>
          </ul>

          <h2>Data Flow</h2>

          <h3>User Registration & Authentication</h3>
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <ol>
              <li>User submits registration form</li>
              <li>Frontend → Backend API (POST /api/auth/register)</li>
              <li>Backend validates input and creates user</li>
              <li>Backend → Database (INSERT user)</li>
              <li>Backend sends verification email</li>
              <li>User verifies email</li>
              <li>Backend updates user verification status</li>
            </ol>
          </div>

          <h3>Job Application Process</h3>
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <ol>
              <li>Job Seeker uploads resume</li>
              <li>Frontend → Backend API (POST /api/resume/upload)</li>
              <li>Backend → AI Service (POST /parse)</li>
              <li>AI Service processes resume and returns structured data</li>
              <li>Backend stores parsed data</li>
              <li>Job Seeker applies to job</li>
              <li>Backend → AI Service (POST /match)</li>
              <li>AI Service calculates match score</li>
              <li>Backend creates application record</li>
              <li>Recruiter receives notification</li>
            </ol>
          </div>

          <h3>Real-time Messaging</h3>
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <ol>
              <li>User sends message</li>
              <li>Frontend → Backend API (WebSocket emit)</li>
              <li>Backend validates and stores message</li>
              <li>Backend broadcasts to recipient (WebSocket emit)</li>
              <li>Recipient frontend receives message</li>
            </ol>
          </div>

          <h2>Database Schema</h2>

          <h3>Core Entities</h3>

          <h4>Users</h4>
          <ul>
            <li><strong>Purpose:</strong> Authentication and basic user information</li>
            <li><strong>Key Fields:</strong> id, email, password_hash, role, first_name, last_name</li>
            <li><strong>Relationships:</strong> One-to-one with job_seekers/recruiters</li>
          </ul>

          <h4>Job Seekers</h4>
          <ul>
            <li><strong>Purpose:</strong> Job seeker profiles and preferences</li>
            <li><strong>Key Fields:</strong> id, title, experience_years, skills, education</li>
            <li><strong>Relationships:</strong> One-to-one with users, many-to-many with jobs (applications)</li>
          </ul>

          <h4>Recruiters</h4>
          <ul>
            <li><strong>Purpose:</strong> Recruiter profiles and company information</li>
            <li><strong>Key Fields:</strong> id, company_name, industry, title, experience_years</li>
            <li><strong>Relationships:</strong> One-to-one with users, one-to-many with jobs</li>
          </ul>

          <h4>Jobs</h4>
          <ul>
            <li><strong>Purpose:</strong> Job postings and requirements</li>
            <li><strong>Key Fields:</strong> id, recruiter_id, title, description, requirements, skills_required</li>
            <li><strong>Relationships:</strong> Many-to-one with recruiters, many-to-many with job_seekers (applications)</li>
          </ul>

          <h4>Applications</h4>
          <ul>
            <li><strong>Purpose:</strong> Job applications and status tracking</li>
            <li><strong>Key Fields:</strong> id, job_seeker_id, job_id, status, applied_at, match_score</li>
            <li><strong>Relationships:</strong> Many-to-one with job_seekers and jobs</li>
          </ul>

          <h4>Messages</h4>
          <ul>
            <li><strong>Purpose:</strong> Communication between users</li>
            <li><strong>Key Fields:</strong> id, sender_id, recipient_id, subject, content, message_type</li>
            <li><strong>Relationships:</strong> Many-to-one with users (sender and recipient)</li>
          </ul>

          <h2>API Design</h2>

          <h3>RESTful Endpoints</h3>

          <h4>Authentication</h4>
          <ul>
            <li>POST /api/auth/register - User registration</li>
            <li>POST /api/auth/login - User login</li>
            <li>POST /api/auth/refresh - Token refresh</li>
            <li>GET /api/auth/profile - Get user profile</li>
            <li>PUT /api/auth/profile - Update user profile</li>
          </ul>

          <h4>Jobs</h4>
          <ul>
            <li>GET /api/jobs - List jobs with filtering</li>
            <li>POST /api/jobs - Create job (recruiters)</li>
            <li>GET /api/jobs/:id - Get job details</li>
            <li>PUT /api/jobs/:id - Update job</li>
            <li>DELETE /api/jobs/:id - Delete job</li>
          </ul>

          <h4>Applications</h4>
          <ul>
            <li>POST /api/applications - Submit application</li>
            <li>GET /api/applications - List user applications</li>
            <li>PUT /api/applications/:id - Update application status</li>
          </ul>

          <h4>AI Services Integration</h4>
          <ul>
            <li>POST /api/ai/parse-resume - Parse resume</li>
            <li>POST /api/ai/match - Calculate match score</li>
            <li>POST /api/ai/coach - Get career advice</li>
          </ul>

          <h3>WebSocket Events</h3>

          <h4>Client to Server</h4>
          <ul>
            <li>join - Join user room for messaging</li>
            <li>sendMessage - Send message to another user</li>
            <li>typing - Indicate typing status</li>
          </ul>

          <h4>Server to Client</h4>
          <ul>
            <li>newMessage - Receive new message</li>
            <li>userJoined - User joined room</li>
            <li>userLeft - User left room</li>
          </ul>

          <h2>AI Integration Architecture</h2>

          <h3>Resume Parser Service</h3>
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`Input: Resume text/PDF
├── Text Extraction (PDF → Text)
├── Named Entity Recognition (NER)
├── Skill Extraction (Semantic Similarity)
├── Experience Parsing (Regex + NLP)
├── Education Parsing
└── Output: Structured JSON`}</code>
            </pre>
          </div>

          <h3>Matching Engine Service</h3>
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`Input: Job Seeker Profile + Job Posting
├── Text Representation Generation
├── Semantic Embedding (Sentence Transformers)
├── Skill Matching (Direct + Semantic)
├── Experience Scoring
├── Weighted Score Calculation
└── Output: Match Score + Reasoning`}</code>
            </pre>
          </div>

          <h3>Career Coach Service</h3>
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`Input: User Profile + Context
├── Situation Analysis
├── Advice Generation (Hugging Face)
├── Action Item Creation
├── Resource Recommendation
└── Output: Personalized Advice`}</code>
            </pre>
          </div>

          <h2>Security Architecture</h2>

          <h3>Authentication & Authorization</h3>
          <ul>
            <li><strong>JWT Tokens:</strong> Stateless authentication</li>
            <li><strong>Role-Based Access:</strong> job_seeker, recruiter roles</li>
            <li><strong>Password Security:</strong> bcrypt hashing</li>
            <li><strong>Session Management:</strong> Refresh token rotation</li>
          </ul>

          <h3>Data Protection</h3>
          <ul>
            <li><strong>Input Validation:</strong> Zod schemas for all inputs</li>
            <li><strong>SQL Injection Prevention:</strong> Parameterized queries</li>
            <li><strong>XSS Protection:</strong> Input sanitization</li>
            <li><strong>CSRF Protection:</strong> SameSite cookies</li>
          </ul>

          <h3>Network Security</h3>
          <ul>
            <li><strong>HTTPS:</strong> SSL/TLS encryption</li>
            <li><strong>CORS:</strong> Configured origins</li>
            <li><strong>Rate Limiting:</strong> Request throttling</li>
            <li><strong>Helmet:</strong> Security headers</li>
          </ul>

          <h2>Scalability Considerations</h2>

          <h3>Horizontal Scaling</h3>
          <ul>
            <li><strong>Stateless Services:</strong> All services can be horizontally scaled</li>
            <li><strong>Load Balancing:</strong> Nginx or cloud load balancers</li>
            <li><strong>Database Sharding:</strong> For high-volume deployments</li>
            <li><strong>CDN:</strong> Static asset delivery</li>
          </ul>

          <h3>Performance Optimization</h3>
          <ul>
            <li><strong>Caching:</strong> Redis for session and API response caching</li>
            <li><strong>Database Indexing:</strong> Optimized queries with proper indexes</li>
            <li><strong>CDN:</strong> Static asset delivery</li>
            <li><strong>Compression:</strong> Gzip compression for responses</li>
          </ul>

          <h3>Monitoring & Observability</h3>
          <ul>
            <li><strong>Application Metrics:</strong> Response times, error rates</li>
            <li><strong>Infrastructure Monitoring:</strong> CPU, memory, disk usage</li>
            <li><strong>Logging:</strong> Structured logging with correlation IDs</li>
            <li><strong>Alerting:</strong> Automated alerts for critical issues</li>
          </ul>

          <h2>Deployment Architecture</h2>

          <h3>Development Environment</h3>
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`Local Machine
├── Frontend: http://localhost:3000
├── Backend: http://localhost:5000
├── AI Services: http://localhost:8000-8002
└── Database: localhost:5432`}</code>
            </pre>
          </div>

          <h3>Production Environment</h3>
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <pre className="text-sm overflow-x-auto">
              <code>{`Cloud Infrastructure (AWS/GCP/Azure)
├── Load Balancer (Nginx/ALB)
├── Frontend (CDN + Serverless)
├── Backend (Containerized)
├── AI Services (Containerized)
├── Database (Managed PostgreSQL)
└── Redis (Caching)`}</code>
            </pre>
          </div>

          <h3>Containerization</h3>
          <ul>
            <li><strong>Docker:</strong> All services containerized</li>
            <li><strong>Docker Compose:</strong> Local development orchestration</li>
            <li><strong>Kubernetes:</strong> Production orchestration (future)</li>
          </ul>

          <h2>Technology Choices Rationale</h2>

          <h3>Frontend: Next.js</h3>
          <ul>
            <li><strong>SSR/SSG:</strong> Better SEO and performance</li>
            <li><strong>TypeScript:</strong> Type safety and developer experience</li>
            <li><strong>App Router:</strong> Modern React patterns</li>
            <li><strong>Vercel Integration:</strong> Easy deployment</li>
          </ul>

          <h3>Backend: Node.js + Express</h3>
          <ul>
            <li><strong>JavaScript Ecosystem:</strong> Unified language stack</li>
            <li><strong>Performance:</strong> Non-blocking I/O</li>
            <li><strong>NPM Packages:</strong> Rich ecosystem</li>
            <li><strong>Microservices Ready:</strong> Easy to split services</li>
          </ul>

          <h3>AI Services: Python + FastAPI</h3>
          <ul>
            <li><strong>ML Libraries:</strong> Rich Python ML ecosystem</li>
            <li><strong>Hugging Face:</strong> Best NLP model repository</li>
            <li><strong>FastAPI:</strong> High-performance async API</li>
            <li><strong>Type Hints:</strong> Better code maintainability</li>
          </ul>

          <h3>Database: PostgreSQL</h3>
          <ul>
            <li><strong>ACID Compliance:</strong> Data integrity</li>
            <li><strong>JSON Support:</strong> Flexible schema</li>
            <li><strong>Full-Text Search:</strong> Advanced search capabilities</li>
            <li><strong>Extensions:</strong> Rich feature set</li>
          </ul>

          <h2>Future Enhancements</h2>

          <h3>Short Term</h3>
          <ul>
            <li>GraphQL API for flexible queries</li>
            <li>Advanced caching layer (Redis)</li>
            <li>Real-time notifications</li>
            <li>Mobile app development</li>
          </ul>

          <h3>Long Term</h3>
          <ul>
            <li>Multi-region deployment</li>
            <li>Advanced AI features (video analysis)</li>
            <li>Machine learning model training pipeline</li>
            <li>Advanced analytics and reporting</li>
          </ul>

          <h2>Conclusion</h2>
          <p>
            CareerForge's architecture provides a scalable, maintainable, and extensible foundation for AI-powered job matching. 
            The microservices approach allows for independent scaling and deployment of components, while the comprehensive AI 
            integration provides unique value in the job matching space.
          </p>
          <p>
            The system is designed to handle growth from startup to enterprise scale, with clear separation of concerns and 
            robust error handling throughout.
          </p>
        </div>
      </div>
    </AppShell>
  )
}