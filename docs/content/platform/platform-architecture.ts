// Platform Overview Content - Platform Architecture
import { PageContent } from '@/lib/content-types'

export const platformArchitectureContent: PageContent = {
  metadata: {
    title: "Platform Architecture",
    description: "Comprehensive overview of CareerForge's technical architecture, system design, and data flows",
    version: "2.4.0",
    lastUpdated: "2025-12-27",
    authors: ["CareerForge Engineering Team"],
    tags: ["architecture", "system-design", "data-flows", "technical-overview"],
    difficulty: "intermediate",
    estimatedTime: 30
  },
  tableOfContents: [
    { id: "overview", title: "Architecture Overview", level: 1 },
    { id: "microservices", title: "Microservices Architecture", level: 1 },
    { id: "data-layer", title: "Data Layer & Storage", level: 1 },
    { id: "ai-services", title: "AI Services Architecture", level: 1 },
    { id: "frontend-architecture", title: "Frontend Architecture", level: 1 },
    { id: "security-architecture", title: "Security Architecture", level: 1 },
    { id: "scalability-design", title: "Scalability & Performance", level: 1 }
  ],
  introduction: {
    id: "introduction",
    title: "CareerForge Technical Foundation",
    content: `CareerForge is built on a modern, scalable architecture designed to handle millions of users while providing real-time AI-powered career matching. Our platform combines microservices architecture with advanced AI services to deliver personalized career guidance at scale.

This technical overview provides insights into our system design decisions, data flows, and architectural patterns that enable CareerForge's core functionality.`
  },
  sections: [
    {
      id: "overview",
      title: "Architecture Overview",
      content: `CareerForge employs a cloud-native, microservices-based architecture built for scale, reliability, and performance. Our system processes over 10 million data points daily to generate intelligent career matches.

### Core Architectural Principles

#### 1. Microservices Design
Each major platform functionality is implemented as an independent, scalable service:
- **User Management Service**: Handles authentication, profiles, and user preferences
- **Job Matching Service**: AI-powered job-candidate matching engine
- **Resume Parser Service**: Advanced document processing and skill extraction
- **Career Coach Service**: Personalized career guidance and recommendations
- **Analytics Service**: Real-time metrics and business intelligence

#### 2. Event-Driven Architecture
Services communicate through an event-driven pattern:
- **Apache Kafka**: Primary event streaming platform
- **Redis**: Real-time caching and session management
- **WebSockets**: Real-time notifications and messaging

#### 3. Cloud-Native Infrastructure
- **Container Orchestration**: Kubernetes for service deployment and management
- **Auto-scaling**: Dynamic resource allocation based on demand
- **Multi-region Deployment**: Global availability with <100ms latency
- **Infrastructure as Code**: Terraform-based infrastructure management`,
      calloutBoxes: [
        {
          type: "info",
          title: "System Scale",
          content: "CareerForge handles 100K+ concurrent users and processes 1M+ API requests per hour during peak usage."
        }
      ]
    },
    {
      id: "microservices",
      title: "Microservices Architecture",
      content: `Our microservices architecture enables independent development, deployment, and scaling of platform components while maintaining service isolation and fault tolerance.

### Core Services

#### User Management Service
**Purpose**: Centralized user authentication, authorization, and profile management

**Key Features**:
- JWT-based authentication with refresh token rotation
- OAuth2 integration (Google, LinkedIn, GitHub)
- Role-based access control (RBAC)
- User profile versioning and audit trails

**Technology Stack**:
- Node.js with Express.js framework
- PostgreSQL for primary data storage
- Redis for session management
- AWS Cognito for enterprise authentication

#### Job Matching Service
**Purpose**: AI-powered job-candidate compatibility analysis

**Key Features**:
- Real-time similarity scoring (0-100 scale)
- Batch processing for bulk operations
- A/B testing framework for algorithm improvements
- Confidence interval calculations for match quality

**Technology Stack**:
- Python with FastAPI framework
- TensorFlow for machine learning models
- PostgreSQL with pgvector for vector similarity search
- Apache Spark for large-scale data processing

#### Resume Parser Service
**Purpose**: Intelligent document processing and skill extraction

**Key Features**:
- Multi-format support (PDF, DOCX, TXT)
- Named Entity Recognition (NER) for skills and experience
- Confidence scoring for extracted information
- Data validation and enrichment

**Technology Stack**:
- Python with spaCy for NLP
- Tesseract for OCR capabilities
- OpenAI GPT models for content understanding
- MongoDB for document storage

#### Career Coach Service
**Purpose**: Personalized career guidance and recommendations

**Key Features**:
- Natural language processing for user queries
- Dynamic recommendation generation
- Learning path optimization
- Market trend analysis integration

**Technology Stack**:
- Python with LangChain framework
- OpenAI GPT-4 for conversational AI
- Redis for conversation context
- Elasticsearch for knowledge base search`,
      codeExamples: [
        {
          id: "service-communication",
          title: "Inter-Service Communication",
          description: "Example of event-driven communication between services",
          language: "javascript",
          code: `// Event publishing example
const kafka = require('kafkajs')

const kafkaClient = new kafka.Kafka({
  clientId: 'careerforge-matching-service',
  brokers: ['kafka-1:9092', 'kafka-2:9092', 'kafka-3:9092']
})

const producer = kafkaClient.producer()

async function publishMatchFound(userId, jobId, matchScore) {
  await producer.send({
    topic: 'job-matches',
    messages: [{
      key: userId,
      value: JSON.stringify({
        eventType: 'MATCH_FOUND',
        userId,
        jobId,
        matchScore,
        timestamp: new Date().toISOString(),
        metadata: {
          algorithm_version: '2.4.0',
          confidence_interval: 0.95
        }
      })
    }]
  })
}

// Event consumption example
const consumer = kafkaClient.consumer({ groupId: 'notification-service' })

await consumer.subscribe({ topic: 'job-matches', fromBeginning: false })

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    const event = JSON.parse(message.value.toString())
    
    if (event.eventType === 'MATCH_FOUND' && event.matchScore >= 80) {
      await sendHighPriorityNotification(event.userId, event)
    }
  }
})`
        }
      ]
    },
    {
      id: "data-layer",
      title: "Data Layer & Storage",
      content: `CareerForge's data architecture is designed for high-performance querying, real-time analytics, and AI model training while maintaining data consistency and availability.

### Database Architecture

#### Primary Data Stores

**PostgreSQL Cluster**
- **Purpose**: Primary relational data storage
- **Configuration**: Master-replica setup with automatic failover
- **Key Tables**: Users, jobs, applications, companies, skills
- **Features**: ACID compliance, complex queries, data integrity

**MongoDB Document Store**
- **Purpose**: Unstructured data and document storage
- **Use Cases**: Resume documents, chat messages, user preferences
- **Features**: Flexible schema, horizontal scaling, document indexing

**Redis Cluster**
- **Purpose**: Caching and session management
- **Configuration**: Clustered Redis for high availability
- **Use Cases**: User sessions, frequently accessed data, rate limiting
- **Features**: Sub-millisecond access, data persistence, pub/sub messaging

#### Specialized Data Storage

**pgvector for AI/ML**
- **Purpose**: Vector similarity search for job matching
- **Configuration**: Optimized indexes for high-dimensional vectors
- **Use Cases**: Semantic job matching, skill similarity, experience matching
- **Performance**: 10,000+ queries per second with <10ms latency

**Amazon S3**
- **Purpose**: File storage and static assets
- **Configuration**: Multi-region replication
- **Use Cases**: Resume files, profile images, company logos
- **Features**: Lifecycle policies, encryption, CDN integration

### Data Flow Patterns

#### Real-time Data Processing
1. **Ingestion**: User actions captured via event streaming
2. **Processing**: Kafka streams processed by real-time analytics
3. **Storage**: Processed data written to appropriate data stores
4. **Caching**: Frequently accessed data cached in Redis
5. **Analytics**: Aggregated metrics sent to business intelligence tools

#### Batch Data Processing
1. **Extraction**: Daily data extraction from all sources
2. **Transformation**: Data cleaning and standardization
3. **Loading**: Bulk loading to analytics warehouse
4. **Analysis**: ML model training and business intelligence generation
5. **Distribution**: Insights distributed to relevant services`,
      tables: [
        {
          headers: ["Data Type", "Storage Solution", "Access Pattern", "Retention Policy"],
          rows: [
            ["User Profiles", "PostgreSQL", "Read-heavy, infrequent writes", "7 years"],
            ["Job Listings", "PostgreSQL + Elasticsearch", "Mixed read/write", "2 years"],
            ["Resume Documents", "MongoDB + S3", "Write-once, read-frequently", "10 years"],
            ["Match History", "ClickHouse", "Time-series analytics", "5 years"],
            ["User Sessions", "Redis", "High-frequency reads/writes", "24 hours"],
            ["AI Embeddings", "pgvector", "Read-heavy for similarity search", "Permanent"]
          ],
          caption: "Data storage solutions by data type and access patterns"
        }
      ]
    },
    {
      id: "ai-services",
      title: "AI Services Architecture",
      content: `CareerForge's AI services form the core intelligence of our platform, enabling sophisticated job matching, career guidance, and personalized recommendations.

### AI Model Architecture

#### Job Matching Engine
**Model Type**: Ensemble Learning with Neural Networks

**Components**:
- **Skills Vectorizer**: Converts skills to 768-dimensional embeddings
- **Experience Scorer**: Analyzes career progression patterns
- **Culture Fit Predictor**: Matches personality and work style preferences
- **Market Context Analyzer**: Considers current market conditions

**Training Data**:
- 10M+ successful job matches
- 50M+ skill assessments
- 5M+ user preference profiles
- Market trend data from 100+ job boards

#### Resume Parser & Skill Extractor
**Model Type**: Named Entity Recognition with Transformer Architecture

**Capabilities**:
- **Skill Extraction**: 95% accuracy on technical skills
- **Experience Parsing**: Automatic timeline generation
- **Education Verification**: Degree and certification validation
- **Achievement Quantification**: Impact measurement extraction

#### Career Coach AI
**Model Type**: Large Language Model with Retrieval-Augmented Generation

**Features**:
- **Personalized Advice**: Context-aware career guidance
- **Skill Gap Analysis**: Identification of training needs
- **Interview Preparation**: Role-specific practice questions
- **Salary Negotiation**: Market-based compensation guidance

### AI Infrastructure

#### Model Serving Platform
- **Framework**: TensorFlow Serving + custom Python APIs
- **Scaling**: Horizontal scaling with auto-scaling groups
- **Latency**: <100ms for most AI predictions
- **Availability**: 99.9% uptime with redundant deployments

#### Model Training Pipeline
- **Data Pipeline**: Automated ETL for training data preparation
- **Model Training**: Distributed training on GPU clusters
- **A/B Testing**: Continuous model evaluation and deployment
- **Model Registry**: Version control for all ML models`,
      calloutBoxes: [
        {
          type: "success",
          title: "AI Performance Metrics",
          content: "Our AI models achieve 94% accuracy in job matching and 89% user satisfaction in career recommendations."
        }
      ]
    },
    {
      id: "frontend-architecture",
      title: "Frontend Architecture",
      content: `CareerForge's frontend is built as a modern, responsive web application optimized for performance, accessibility, and user experience across all devices.

### Technology Stack

#### Core Framework
- **Framework**: Next.js 14 with React 18
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Zustand for global state, React Query for server state
- **Routing**: Next.js App Router with dynamic routing

#### Key Architectural Patterns

**Server-Side Rendering (SSR)**
- **Purpose**: Fast initial page loads and SEO optimization
- **Implementation**: Next.js getServerSideProps for critical pages
- **Caching**: Redis-based caching for SSR content

**Client-Side Rendering (CSR)**
- **Purpose**: Interactive features and real-time updates
- **Implementation**: React components with Suspense boundaries
- **Performance**: Code splitting and lazy loading

**Progressive Web App (PWA)**
- **Purpose**: Mobile-like experience with offline capabilities
- **Features**: Push notifications, background sync, offline mode
- **Service Workers**: Custom implementation for caching strategies

### Performance Optimizations

#### Core Web Vitals
- **Largest Contentful Paint (LCP)**: <2.5s
- **First Input Delay (FID)**: <100ms
- **Cumulative Layout Shift (CLS)**: <0.1

#### Optimization Techniques
- **Image Optimization**: Next.js Image component with WebP format
- **Bundle Optimization**: Tree shaking and dynamic imports
- **Caching Strategy**: Multi-layer caching (CDN, browser, service worker)
- **Database Optimization**: Query optimization and connection pooling

### Component Architecture

#### Design System
- **Component Library**: Custom React component library
- **Atomic Design**: Atoms, molecules, organisms, templates, pages
- **Theme System**: CSS custom properties for theming
- **Accessibility**: WCAG 2.1 AA compliance`,
      codeExamples: [
        {
          id: "component-example",
          title: "Component Architecture Example",
          description: "Example of reusable component with TypeScript",
          language: "typescript",
          code: `// types/job.ts
export interface Job {
  id: string
  title: string
  company: {
    name: string
    logo: string
  }
  location: string
  matchScore: number
  skills: string[]
  salary: {
    min: number
    max: number
    currency: string
  }
}

// components/JobCard.tsx
import { Job } from '@/types/job'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

interface JobCardProps {
  job: Job
  onApply: (jobId: string) => void
  className?: string
}

export function JobCard({ job, onApply, className }: JobCardProps) {
  const matchColor = job.matchScore >= 80 ? 'green' : 
                    job.matchScore >= 60 ? 'yellow' : 'red'

  return (
    <article className={\`bg-white rounded-lg shadow-md p-6 \${className}\`}>
      <header className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-gray-600">{job.company.name}</p>
        </div>
        <Badge variant={matchColor}>
          {job.matchScore}% match
        </Badge>
      </header>
      
      <div className="mb-4">
        <p className="text-sm text-gray-500 mb-2">{job.location}</p>
        <div className="flex flex-wrap gap-1">
          {job.skills.slice(0, 3).map(skill => (
            <Badge key={skill} variant="outline">{skill}</Badge>
          ))}
        </div>
      </div>
      
      <footer className="flex justify-between items-center">
        <span className="text-lg font-bold">
          {\`\${job.salary.min.toLocaleString()} - \${job.salary.max.toLocaleString()}\`}
        </span>
        <Button onClick={() => onApply(job.id)}>
          Apply Now
        </Button>
      </footer>
    </article>
  )
}`
        }
      ]
    },
    {
      id: "security-architecture",
      title: "Security Architecture",
      content: `Security is foundational to CareerForge's architecture, with comprehensive measures protecting user data, ensuring platform integrity, and maintaining compliance with global privacy regulations.

### Security Layers

#### Authentication & Authorization
- **Multi-Factor Authentication**: TOTP and SMS-based 2FA
- **OAuth2/OIDC**: Integration with major identity providers
- **JWT Tokens**: Short-lived access tokens with refresh mechanism
- **Session Management**: Secure session handling with Redis
- **Role-Based Access Control**: Granular permissions system

#### Data Protection
- **Encryption at Rest**: AES-256 encryption for all stored data
- **Encryption in Transit**: TLS 1.3 for all communications
- **Key Management**: AWS KMS for encryption key management
- **Data Masking**: Sensitive data anonymization in non-production environments

#### Network Security
- **Web Application Firewall**: Cloudflare WAF with custom rules
- **DDoS Protection**: Multi-layer DDoS mitigation
- **VPN Access**: Private network access for administrative functions
- **IP Whitelisting**: Restrict access to sensitive endpoints

### Compliance Framework

#### Privacy Regulations
- **GDPR Compliance**: Full compliance with EU data protection regulations
- **CCPA Compliance**: California Consumer Privacy Act adherence
- **Data Processing Agreements**: DPAs with all third-party services
- **Privacy by Design**: Privacy considerations in all system designs

#### Security Certifications
- **SOC 2 Type II**: Annual security audits and compliance
- **ISO 27001**: Information security management system
- **Penetration Testing**: Quarterly security assessments
- **Vulnerability Scanning**: Continuous security monitoring`,
      calloutBoxes: [
        {
          type: "warning",
          title: "Security Incident Response",
          content: "CareerForge maintains a 24/7 security incident response team with <15 minute detection and <1 hour response time for critical issues."
        }
      ]
    },
    {
      id: "scalability-design",
      title: "Scalability & Performance",
      content: `CareerForge is architected to handle exponential growth in users, data volume, and computational requirements while maintaining optimal performance and user experience.

### Horizontal Scaling Strategy

#### Auto-scaling Configuration
- **CPU-based Scaling**: Scale up at 70% CPU utilization
- **Memory-based Scaling**: Scale up at 80% memory usage
- **Custom Metrics**: Queue length and request latency triggers
- **Predictive Scaling**: ML-based capacity planning

#### Load Balancing
- **Application Load Balancers**: Layer 7 routing with health checks
- **Geographic Distribution**: Multi-region load balancing
- **Session Affinity**: Sticky sessions for stateful operations
- **SSL Termination**: Centralized certificate management

### Performance Optimization

#### Caching Strategy
- **Multi-tier Caching**: Browser, CDN, application, and database caching
- **Cache Invalidation**: Event-driven cache invalidation
- **Cache Warming**: Proactive caching of frequently accessed data
- **Cache Analytics**: Performance monitoring and optimization

#### Database Optimization
- **Read Replicas**: Multiple read-only database instances
- **Connection Pooling**: Optimized database connection management
- **Query Optimization**: Automated query performance analysis
- **Database Sharding**: Horizontal partitioning for large datasets

### Monitoring & Observability

#### Metrics Collection
- **Application Performance Monitoring**: Custom metrics and traces
- **Infrastructure Monitoring**: Server, network, and storage metrics
- **Business Metrics**: User engagement and platform usage analytics
- **AI Model Performance**: Accuracy, latency, and drift monitoring

#### Alerting & Incident Management
- **Multi-channel Alerts**: PagerDuty integration for critical issues
- **Escalation Procedures**: Automated escalation based on severity
- **Incident Response**: Playbooks for common issue resolution
- **Post-incident Reviews**: Continuous improvement processes`,
      tables: [
        {
          headers: ["Service", "Current Capacity", "Scaling Threshold", "Max Capacity"],
          rows: [
            ["User Management", "10K concurrent users", "70% CPU", "100K users"],
            ["Job Matching", "1M matches/hour", "500ms latency", "10M matches/hour"],
            ["Resume Parser", "1000 docs/minute", "10s processing time", "10000 docs/minute"],
            ["Career Coach", "5K concurrent sessions", "2s response time", "50K sessions"],
            ["Database Cluster", "50K queries/second", "80% connection pool", "500K queries/second"]
          ],
          caption: "Current platform capacity and scaling thresholds"
        }
      ]
    }
  ],
  examples: [
    {
      title: "API Gateway Configuration",
      description: "Example of API gateway configuration for microservices",
      code: `// API Gateway routing configuration
{
  "routes": [
    {
      "path": "/api/v1/users/*",
      "service": "user-management-service",
      "loadBalancer": "round-robin",
      "healthCheck": "/health",
      "timeout": "30s",
      "circuitBreaker": {
        "failureThreshold": 5,
        "timeout": "60s"
      }
    },
    {
      "path": "/api/v1/matches/*",
      "service": "job-matching-service",
      "loadBalancer": "least-connections",
      "healthCheck": "/health",
      "timeout": "5s",
      "circuitBreaker": {
        "failureThreshold": 3,
        "timeout": "30s"
      }
    }
  ],
  "rateLimiting": {
    "requestsPerMinute": 1000,
    "burstSize": 100
  }
}`,
      language: "json"
    }
  ],
  nextSteps: {
    title: "Dive Deeper",
    links: [
      {
        text: "AI Services Overview",
        href: "/docs/ai/overview",
        description: "Explore the AI technology powering CareerForge"
      },
      {
        text: "Database Schema",
        href: "/docs/backend/database",
        description: "Understand our data model and relationships"
      },
      {
        text: "Deployment Guide",
        href: "/docs/developer/deployment",
        description: "Learn how we deploy and manage our infrastructure"
      }
    ]
  },
  relatedResources: [
    {
      text: "Security Architecture",
      href: "/docs/security/architecture",
      description: "Detailed security implementation and best practices"
    },
    {
      text: "Real-time Features",
      href: "/docs/backend/realtime",
      description: "How we handle real-time notifications and messaging"
    }
  ]
}