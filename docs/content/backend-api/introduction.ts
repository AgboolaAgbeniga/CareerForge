// Backend API Documentation - Introduction
import { PageContent } from '@/lib/content-types'

export const backendApiIntroductionContent: PageContent = {
  metadata: {
    title: "Backend API Introduction",
    description: "Comprehensive overview of CareerForge's RESTful backend API architecture, authentication, endpoints, and integration patterns",
    version: "2.4.0",
    lastUpdated: "2024-12-27",
    authors: ["Backend Engineering Team"],
    tags: ["api", "backend", "rest", "documentation", "architecture"],
    difficulty: "intermediate",
    estimatedTime: 15
  },
  tableOfContents: [
    { id: "api-overview", title: "API Overview", level: 1 },
    { id: "architecture", title: "Architecture & Design", level: 1 },
    { id: "authentication", title: "Authentication & Security", level: 1 },
    { id: "endpoints", title: "API Endpoints", level: 1 },
    { id: "data-models", title: "Data Models & Schemas", level: 1 },
    { id: "error-handling", title: "Error Handling", level: 1 },
    { id: "rate-limiting", title: "Rate Limiting", level: 1 },
    { id: "getting-started", title: "Getting Started", level: 1 }
  ],
  introduction: {
    id: "introduction",
    title: "Backend API Overview",
    content: `The CareerForge Backend API provides a comprehensive RESTful interface for managing all platform operations. Built with Node.js, TypeScript, and Express, our API serves as the backbone for job matching, user management, company operations, and AI-powered career services.

This documentation covers everything you need to integrate with our API, from authentication and basic CRUD operations to advanced features like real-time notifications and analytics.`
  },
  sections: [
    {
      id: "api-overview",
      title: "API Overview",
      content: `The CareerForge API is designed with developer experience and scalability in mind. It follows RESTful conventions while incorporating modern API design patterns.

### Key Features

- **RESTful Design**: Standard HTTP methods with predictable URL patterns
- **JSON API**: Consistent JSON request/response format
- **Versioned Endpoints**: API versioning for backward compatibility
- **Comprehensive Documentation**: OpenAPI/Swagger specifications available
- **Real-time Capabilities**: WebSocket support for live updates
- **Rate Limiting**: Built-in protection against abuse
- **Comprehensive Logging**: Full request/response logging for debugging

### Base URL
\`\`\`
https://api.careerforge.com/v1
\`\`\`

### Response Format
All API responses follow a consistent JSON structure:

\`\`\`json
{
  "success": true,
  "data": { ... },
  "message": "Optional success message",
  "pagination": { ... }, // Only for paginated responses
  "timestamp": "2024-12-27T10:00:00.000Z"
}
\`\`\``,
      calloutBoxes: [
        {
          type: "info",
          title: "API Stability",
          content: "Our API maintains 99.9% uptime with backward compatibility guarantees for major versions."
        }
      ]
    },
    {
      id: "architecture",
      title: "Architecture & Design",
      content: `The backend architecture follows a modular, microservices-inspired design within a monolithic application structure.

### Core Components

#### API Layer
- **Express.js Framework**: Handles HTTP routing and middleware
- **TypeScript**: Full type safety for API contracts
- **Validation**: Request/response validation using Joi/Zod
- **Serialization**: Consistent data transformation

#### Service Layer
- **Business Logic**: Domain-specific operations
- **Data Access**: Repository pattern for database interactions
- **External Integrations**: AI services, email, notifications
- **Caching**: Redis-based caching for performance

#### Data Layer
- **PostgreSQL**: Primary relational database
- **Supabase**: Real-time capabilities and authentication
- **Redis**: Caching and session management
- **Vector Storage**: AI embeddings and similarity search

### Design Patterns

#### Repository Pattern
Data access is abstracted through repository interfaces:

\`\`\`typescript
interface UserRepository {
  findById(id: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  create(userData: CreateUserDTO): Promise<User>
  update(id: string, userData: UpdateUserDTO): Promise<User>
  delete(id: string): Promise<void>
}
\`\`\`

#### Service Layer Pattern
Business logic is encapsulated in service classes:

\`\`\`typescript
class UserService {
  constructor(private userRepo: UserRepository) {}

  async createUser(userData: CreateUserDTO): Promise<User> {
    // Validation, business rules, data transformation
    const user = await this.userRepo.create(userData)
    // Post-creation logic (notifications, etc.)
    return user
  }
}
\`\`\`

#### Middleware Chain
Request processing follows a clear middleware pipeline:

\`\`\`typescript
// Authentication → Authorization → Validation → Rate Limiting → Logging
app.use(authMiddleware)
app.use(authorizationMiddleware)
app.use(validationMiddleware)
app.use(rateLimitMiddleware)
app.use(loggingMiddleware)
\`\`\``,
      codeExamples: [
        {
          id: "middleware-example",
          title: "Middleware Pipeline Example",
          description: "How requests flow through our middleware chain",
          language: "typescript",
          code: `import { Request, Response, NextFunction } from 'express'
import { AuthService } from '../services/auth.service'

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      })
    }

    const user = await AuthService.verifyToken(token)
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid authentication token'
    })
  }
}`
        }
      ]
    },
    {
      id: "authentication",
      title: "Authentication & Security",
      content: `CareerForge implements multiple authentication strategies to support different use cases and integration patterns.

### Authentication Methods

#### JWT Bearer Tokens
Standard OAuth 2.0 bearer token authentication:

\`\`\`typescript
// Request with JWT token
const headers = {
  'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  'Content-Type': 'application/json'
}
\`\`\`

#### API Keys
For server-to-server integrations:

\`\`\`typescript
const headers = {
  'X-API-Key': 'cf_live_xxxxxxxxxxxxxxxxxxxxxxxxx',
  'Content-Type': 'application/json'
}
\`\`\`

#### Supabase Auth
Integration with Supabase authentication for real-time features.

### Security Features

#### Encryption
- **Data at Rest**: AES-256 encryption for sensitive data
- **Data in Transit**: TLS 1.3 for all communications
- **Password Hashing**: bcrypt with salt rounds

#### Authorization
- **Role-Based Access Control (RBAC)**: Granular permissions
- **Resource Ownership**: Users can only access their own data
- **API Scopes**: Limited permissions for third-party integrations

#### Protection Mechanisms
- **CORS**: Configured for allowed origins
- **Helmet**: Security headers for XSS/CSRF protection
- **Input Sanitization**: Automatic sanitization of user inputs
- **SQL Injection Prevention**: Parameterized queries only`,
      calloutBoxes: [
        {
          type: "warning",
          title: "Token Security",
          content: "JWT tokens expire after 24 hours. Use refresh tokens for long-lived sessions."
        }
      ]
    },
    {
      id: "endpoints",
      title: "API Endpoints",
      content: `The API is organized into logical resource groups, each handling specific domain operations.

### Resource Groups

#### Core Resources
- **/auth**: Authentication and authorization
- **/users**: User management and profiles
- **/companies**: Company profiles and management
- **/jobs**: Job postings and management
- **/applications**: Job applications and tracking

#### Supporting Resources
- **/notifications**: Push notifications and messaging
- **/analytics**: Reporting and insights
- **/ai**: AI-powered services and matching
- **/admin**: Administrative operations

### HTTP Methods
Standard RESTful HTTP methods are used:

- **GET**: Retrieve resources
- **POST**: Create new resources
- **PUT**: Update entire resources
- **PATCH**: Partial resource updates
- **DELETE**: Remove resources

### URL Patterns
Consistent URL structure across all endpoints:

\`\`\`
GET    /api/v1/users                    # List users
GET    /api/v1/users/:id                # Get specific user
POST   /api/v1/users                    # Create user
PUT    /api/v1/users/:id                # Update user
DELETE /api/v1/users/:id                # Delete user
GET    /api/v1/users/:id/jobs           # User's jobs
POST   /api/v1/jobs/:id/apply           # Apply to job
\`\`\`

### Query Parameters
Standard query parameters for filtering and pagination:

\`\`\`typescript
// Pagination
?page=1&limit=20

// Filtering
?status=active&created_after=2024-01-01

// Sorting
?sort=created_at&order=desc

// Searching
?q=software%20engineer&location=remote
\`\`\``,
      lists: [
        {
          type: "unordered",
          title: "Common Query Parameters",
          items: [
            "`page` - Page number for pagination (default: 1)",
            "`limit` - Number of items per page (default: 20, max: 100)",
            "`sort` - Field to sort by (e.g., created_at, updated_at)",
            "`order` - Sort order: asc or desc (default: desc)",
            "`q` - Search query for text-based filtering",
            "`status` - Filter by status (active, inactive, pending)",
            "`created_after` - Filter by creation date (ISO 8601)",
            "`updated_before` - Filter by last update date (ISO 8601)"
          ]
        }
      ]
    },
    {
      id: "data-models",
      title: "Data Models & Schemas",
      content: `All API responses follow strict TypeScript interfaces for type safety and consistency.

### Common Data Types

#### User Model
\`\`\`typescript
interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'job_seeker' | 'employer' | 'admin'
  profile: UserProfile
  preferences: UserPreferences
  createdAt: Date
  updatedAt: Date
  isVerified: boolean
  lastLoginAt?: Date
}

interface UserProfile {
  avatar?: string
  bio?: string
  location?: string
  website?: string
  linkedinUrl?: string
  skills: string[]
  experience: Experience[]
  education: Education[]
}
\`\`\`

#### Job Model
\`\`\`typescript
interface Job {
  id: string
  title: string
  description: string
  company: Company
  location: string
  type: 'full_time' | 'part_time' | 'contract' | 'internship'
  remote: boolean
  salary: SalaryRange
  requirements: string[]
  benefits: string[]
  skills: string[]
  status: 'draft' | 'published' | 'closed' | 'paused'
  createdAt: Date
  updatedAt: Date
  expiresAt?: Date
  applicationCount: number
}

interface SalaryRange {
  min?: number
  max?: number
  currency: string
  period: 'hourly' | 'monthly' | 'yearly'
}
\`\`\`

#### Application Model
\`\`\`typescript
interface Application {
  id: string
  job: Job
  applicant: User
  status: 'pending' | 'reviewing' | 'interviewing' | 'offered' | 'hired' | 'rejected'
  coverLetter?: string
  resume: Resume
  submittedAt: Date
  updatedAt: Date
  notes?: ApplicationNote[]
}
\`\`\`

### Validation Rules
All input data is validated using Zod schemas:

\`\`\`typescript
import { z } from 'zod'

export const CreateUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(128),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  role: z.enum(['job_seeker', 'employer'])
})

export const UpdateJobSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().min(10).max(5000).optional(),
  location: z.string().min(1).max(100).optional(),
  salary: z.object({
    min: z.number().min(0).optional(),
    max: z.number().min(0).optional(),
    currency: z.string().length(3),
    period: z.enum(['hourly', 'monthly', 'yearly'])
  }).optional()
})
\`\`\``,
      codeExamples: [
        {
          id: "validation-example",
          title: "Request Validation Example",
          description: "How we validate incoming requests",
          language: "typescript",
          code: `import { Request, Response, NextFunction } from 'express'
import { CreateJobSchema } from '../schemas/job.schema'

export const validateCreateJob = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validatedData = CreateJobSchema.parse(req.body)
    req.body = validatedData
    next()
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.errors
    })
  }
}`
        }
      ]
    },
    {
      id: "error-handling",
      title: "Error Handling",
      content: `Consistent error handling ensures predictable API behavior and helpful debugging information.

### Error Response Format
All errors follow a standardized JSON structure:

\`\`\`json
{
  "success": false,
  "message": "Human-readable error message",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": {
      "field": "email",
      "reason": "Invalid email format"
    }
  },
  "timestamp": "2024-12-27T10:00:00.000Z"
}
\`\`\`

### HTTP Status Codes

#### 2xx Success
- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **204 No Content**: Request successful, no content returned

#### 4xx Client Errors
- **400 Bad Request**: Invalid request data or validation error
- **401 Unauthorized**: Authentication required or invalid
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **409 Conflict**: Resource conflict (e.g., duplicate email)
- **422 Unprocessable Entity**: Validation failed
- **429 Too Many Requests**: Rate limit exceeded

#### 5xx Server Errors
- **500 Internal Server Error**: Unexpected server error
- **502 Bad Gateway**: External service error
- **503 Service Unavailable**: Service temporarily unavailable

### Error Codes
Structured error codes for programmatic handling:

\`\`\`typescript
enum ErrorCode {
  // Authentication
  INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  INSUFFICIENT_PERMISSIONS = 'INSUFFICIENT_PERMISSIONS',

  // Validation
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  REQUIRED_FIELD_MISSING = 'REQUIRED_FIELD_MISSING',
  INVALID_FORMAT = 'INVALID_FORMAT',

  // Resource
  RESOURCE_NOT_FOUND = 'RESOURCE_NOT_FOUND',
  RESOURCE_CONFLICT = 'RESOURCE_CONFLICT',
  RESOURCE_LIMIT_EXCEEDED = 'RESOURCE_LIMIT_EXCEEDED',

  // System
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR'
}
\`\`\``,
      calloutBoxes: [
        {
          type: "warning",
          title: "Error Logging",
          content: "All errors are logged with request context for debugging. Include request IDs in support tickets."
        }
      ]
    },
    {
      id: "rate-limiting",
      title: "Rate Limiting",
      content: `Rate limiting protects the API from abuse and ensures fair usage across all clients.

### Rate Limits

#### Per Endpoint
Different endpoints have different rate limits based on resource intensity:

\`\`\`typescript
const rateLimits = {
  // Authentication
  '/auth/login': '10 per minute',
  '/auth/register': '5 per hour',

  // Read operations
  'GET /users': '100 per minute',
  'GET /jobs': '200 per minute',

  // Write operations
  'POST /users': '20 per minute',
  'PUT /users/:id': '30 per minute',

  // Search operations
  'GET /jobs/search': '50 per minute',
  'GET /users/search': '30 per minute'
}
\`\`\`

#### Per User/IP
- **Authenticated Users**: Higher limits based on user tier
- **Anonymous Users**: Standard limits applied
- **IP-based Limiting**: Additional protection against abuse

### Rate Limit Headers
Response headers provide rate limit information:

\`\`\`http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200
X-RateLimit-Retry-After: 60
\`\`\`

### Rate Limit Response
When limits are exceeded:

\`\`\`json
{
  "success": false,
  "message": "Rate limit exceeded",
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "details": {
      "limit": 100,
      "remaining": 0,
      "reset": "2024-12-27T11:00:00.000Z",
      "retryAfter": 60
    }
  }
}
\`\`\`

### Best Practices
- **Implement Exponential Backoff**: Gradually increase retry delays
- **Cache Responses**: Reduce API calls through intelligent caching
- **Batch Requests**: Use bulk operations when available
- **Monitor Usage**: Track your API consumption patterns`,
      lists: [
        {
          type: "ordered",
          title: "Rate Limiting Best Practices",
          items: [
            "Monitor X-RateLimit-Remaining header",
            "Implement exponential backoff for retries",
            "Cache frequently accessed data",
            "Use webhooks for real-time updates instead of polling",
            "Batch multiple operations when possible",
            "Upgrade to higher tiers for increased limits"
          ]
        }
      ]
    },
    {
      id: "getting-started",
      title: "Getting Started",
      content: `Follow these steps to start integrating with the CareerForge API.

### 1. Get API Access
- **Register an Account**: Create a developer account at developer.careerforge.com
- **Generate API Keys**: Obtain your API key from the dashboard
- **Choose Authentication Method**: JWT tokens for user-specific operations, API keys for server-side

### 2. Set Up Your Environment
\`\`\`bash
# Install dependencies
npm install axios dotenv

# Set environment variables
echo "CAREERFORGE_API_KEY=your_api_key_here" > .env
echo "CAREERFORGE_BASE_URL=https://api.careerforge.com/v1" >> .env
\`\`\`

### 3. Make Your First Request
\`\`\`typescript
import axios from 'axios'

const client = axios.create({
  baseURL: process.env.CAREERFORGE_BASE_URL,
  headers: {
    'X-API-Key': process.env.CAREERFORGE_API_KEY,
    'Content-Type': 'application/json'
  }
})

// Test the connection
const response = await client.get('/health')
console.log('API Status:', response.data)
\`\`\`

### 4. Handle Authentication
For user-specific operations, implement JWT authentication:

\`\`\`typescript
// Login to get JWT token
const loginResponse = await client.post('/auth/login', {
  email: 'user@example.com',
  password: 'password'
})

const token = loginResponse.data.data.token

// Use token for authenticated requests
client.defaults.headers.common['Authorization'] = \`Bearer \${token}\`
\`\`\`

### 5. Explore the API
Start with these core endpoints:

- **GET /users/me**: Get current user profile
- **GET /jobs**: Browse available jobs
- **POST /applications**: Submit job applications
- **GET /companies**: Explore companies

### SDKs and Libraries
Official SDKs are available for popular languages:

- **JavaScript/TypeScript**: \`npm install @careerforge/sdk\`
- **Python**: \`pip install careerforge-sdk\`
- **Java**: Maven dependency available
- **Go**: \`go get github.com/careerforge/go-sdk\`

### Testing
Use our sandbox environment for testing:

\`\`\`typescript
const sandboxClient = axios.create({
  baseURL: 'https://api.sandbox.careerforge.com/v1',
  // ... same configuration
})
\`\`\`

### Support
- **Documentation**: Full OpenAPI specs at /docs
- **Developer Portal**: developer.careerforge.com
- **Community Forum**: forum.careerforge.com
- **Support**: support@careerforge.com`,
      calloutBoxes: [
        {
          type: "success",
          title: "Quick Start",
          content: "Our interactive API explorer lets you test endpoints directly in your browser."
        }
      ]
    }
  ],
  nextSteps: {
    title: "Next Steps",
    links: [
      {
        text: "Authentication Guide",
        href: "/docs/backend-api/authentication",
        description: "Learn about authentication methods and security"
      },
      {
        text: "User Management API",
        href: "/docs/backend-api/user-management",
        description: "Explore user CRUD operations and profiles"
      },
      {
        text: "API Reference",
        href: "/docs/api-reference",
        description: "Complete OpenAPI specification and examples"
      }
    ]
  },
  relatedResources: [
    {
      text: "Frontend Integration Guide",
      href: "/docs/frontend/api-integration",
      description: "How to integrate the API with frontend applications"
    },
    {
      text: "Webhooks Documentation",
      href: "/docs/backend-api/webhooks",
      description: "Real-time event notifications via webhooks"
    },
    {
      text: "SDK Downloads",
      href: "/docs/sdks",
      description: "Official SDKs for multiple programming languages"
    }
  ]
}