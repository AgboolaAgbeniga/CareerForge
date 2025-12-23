# CareerForge Backend Service

A comprehensive backend API for the CareerForge job matching platform, built with Node.js, Express, TypeScript, and PostgreSQL.

## 🚀 Features

- **Authentication & Authorization**: JWT-based auth with role-based access control
- **User Management**: Complete user lifecycle management for job seekers and recruiters
- **Job Matching**: AI-powered candidate-job matching algorithms
- **Resume Processing**: Automated resume parsing and optimization
- **Real-time Messaging**: WebSocket-based communication system
- **Analytics**: Comprehensive event tracking and analytics
- **AI Integration**: Seamless integration with AI microservices
- **Database**: PostgreSQL with Drizzle ORM for type-safe operations

## 🛠 Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **Authentication**: JWT with bcrypt
- **Validation**: Zod schemas
- **Logging**: Winston-style console logging
- **Real-time**: Socket.io
- **Documentation**: Swagger/OpenAPI

## 📁 Project Structure

```
backend/
├── src/
│   ├── api/                 # API route handlers
│   │   ├── auth.ts         # Authentication endpoints
│   │   ├── resume.ts       # Resume management
│   │   ├── matching.ts     # Job matching
│   │   ├── messages.ts     # Messaging system
│   │   ├── notifications.ts # Notification system
│   │   ├── analytics.ts    # Analytics endpoints
│   │   ├── experiments.ts  # A/B testing
│   │   └── ai.ts          # AI service integration
│   ├── middleware/         # Express middleware
│   │   ├── auth.ts        # Authentication middleware
│   │   └── ...            # Other middleware
│   ├── models/            # Database schemas
│   │   └── schema.ts      # Drizzle schema definitions
│   ├── services/          # Business logic services
│   │   └── aiService.ts   # AI service client
│   ├── utils/             # Utility functions
│   │   ├── database.ts    # Database connection
│   │   ├── logger.ts      # Logging utilities
│   │   └── ...           # Other utilities
│   └── index.ts           # Application entry point
├── migrations/            # Database migrations
│   ├── 001_initial_schema.sql
│   └── 002_seed_data.sql
├── uploads/               # File upload directory
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 13+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd careerforge/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

   Configure the following variables in `.env`:
   ```env
   # Database
   DATABASE_URL=postgresql://postgres:your_password@localhost:5432/careerforge

   # JWT
   JWT_SECRET=your_jwt_secret
   JWT_REFRESH_SECRET=your_refresh_secret

   # Email (for notifications)
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password

   # AI Services
   RESUME_PARSER_URL=http://localhost:8000
   MATCHING_ENGINE_URL=http://localhost:8001
   CAREER_COACH_URL=http://localhost:8002

   # Frontend
   FRONTEND_URL=http://localhost:3000

   # Server
   PORT=5000
   NODE_ENV=development
   ```

4. **Set up the database**
   ```bash
   # Create database
   createdb careerforge

   # Run migrations
   psql -U postgres -d careerforge -f migrations/001_initial_schema.sql

   # Seed data (optional)
   psql -U postgres -d careerforge -f migrations/002_seed_data.sql
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The server will start on `http://localhost:5000`

## 📚 API Documentation

### Authentication Endpoints

#### POST /api/auth/register
Register a new user account.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "job_seeker",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### POST /api/auth/login
Authenticate user and return tokens.

#### GET /api/auth/profile
Get current user profile.

#### PUT /api/auth/profile
Update user profile.

### Job Management Endpoints

#### POST /api/jobs
Create a new job posting (recruiters only).

#### GET /api/jobs
List available jobs with filtering.

#### GET /api/jobs/:id
Get job details.

### Matching Endpoints

#### POST /api/matching/match
Find job matches for a candidate.

#### GET /api/matching/suggestions
Get AI-powered job suggestions.

### Resume Endpoints

#### POST /api/resume/upload
Upload and parse resume.

#### GET /api/resume/:id
Get parsed resume data.

### Messaging Endpoints

#### POST /api/messages
Send a message.

#### GET /api/messages
Get user messages.

#### WebSocket Events
- `join`: Join user room
- `sendMessage`: Send real-time message
- `newMessage`: Receive new message

## 🔧 Development

### Available Scripts

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Run tests
npm test

# Lint code
npm run lint

# Type checking
npm run type-check
```

### Code Quality

- **ESLint**: Code linting and formatting
- **TypeScript**: Static type checking
- **Prettier**: Code formatting
- **Husky**: Git hooks for quality checks

### Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run integration tests
npm run test:integration
```

## 🗄 Database Schema

### Core Tables

- **users**: User accounts and authentication
- **job_seekers**: Job seeker profiles
- **recruiters**: Recruiter profiles
- **companies**: Company information
- **jobs**: Job postings
- **applications**: Job applications
- **resumes**: Resume storage and parsing
- **messages**: Communication system
- **notifications**: User notifications
- **analytics_events**: Event tracking

### Relationships

- Users have one profile (job_seeker or recruiter)
- Recruiters belong to companies
- Jobs belong to recruiters and companies
- Applications link job_seekers to jobs
- Messages are between users, optionally linked to applications

## 🔒 Security

- **JWT Authentication**: Stateless authentication with refresh tokens
- **Password Hashing**: bcrypt with salt rounds
- **Input Validation**: Zod schemas for all inputs
- **Rate Limiting**: Request rate limiting
- **CORS**: Configured for frontend origin
- **Helmet**: Security headers
- **SQL Injection Prevention**: Parameterized queries via Drizzle ORM

## 📊 Monitoring & Logging

- **Request Logging**: All requests logged with timing
- **Error Tracking**: Comprehensive error logging
- **Health Checks**: `/health` endpoint for monitoring
- **Metrics**: Response times and error rates

## 🚀 Deployment

### Environment Variables

See `.env.example` for all required environment variables.

### Docker Deployment

```bash
# Build image
docker build -t careerforge-backend .

# Run container
docker run -p 5000:5000 --env-file .env careerforge-backend
```

### Production Checklist

- [ ] Set `NODE_ENV=production`
- [ ] Configure production database
- [ ] Set secure JWT secrets
- [ ] Configure email service
- [ ] Set up monitoring
- [ ] Configure reverse proxy
- [ ] Set up SSL certificates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

### Code Standards

- Use TypeScript for all new code
- Follow ESLint configuration
- Write comprehensive tests
- Update documentation
- Use conventional commits

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, please contact the development team or create an issue in the repository.

## 📈 Roadmap

- [ ] GraphQL API support
- [ ] Advanced analytics dashboard
- [ ] Mobile app API
- [ ] Multi-language support
- [ ] Advanced AI features

---

**Status**: ✅ Backend service fully implemented and documented