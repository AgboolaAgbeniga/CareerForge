// Comprehensive Navigation Configuration for CareerForge Documentation
// This file provides a complete navigation structure without user personas

export enum ContentType {
  GUIDE = 'guide',
  REFERENCE = 'reference',
  TUTORIAL = 'tutorial',
  API = 'api',
  EXAMPLE = 'example',
  ARCHITECTURE = 'architecture',
  DEPLOYMENT = 'deployment',
  TROUBLESHOOTING = 'troubleshooting'
}

export enum DifficultyLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
}

export enum BadgeType {
  BETA = 'beta',
  STABLE = 'stable',
  DEPRECATED = 'deprecated',
  NEW = 'new'
}

export interface ContentMetadata {
  contentType: ContentType
  difficulty: DifficultyLevel
  estimatedTime?: number // minutes
  prerequisites?: string[]
  tags: string[]
  lastUpdated: string
  version?: string
}

export interface NavigationItem {
  id: string
  title: string
  href: string
  description?: string
  contentType: ContentType
  difficulty: DifficultyLevel
  estimatedTime?: number
  prerequisites?: string[]
  tags: string[]
  badge?: BadgeType
  external?: boolean
  children?: NavigationItem[]
  metadata: ContentMetadata
}

export interface NavigationSection {
  id: string
  title: string
  description?: string
  items: NavigationItem[]
  collapsible?: boolean
  defaultOpen?: boolean
  priority: number
  icon?: React.ComponentType<{ className?: string }>
  badge?: BadgeType
}

// Comprehensive navigation configuration for CareerForge documentation
export const comprehensiveNavigationConfig: NavigationSection[] = [
  // 1. Platform Overview
  {
    id: 'platform-overview',
    title: 'Platform Overview',
    description: 'Introduction to CareerForge and its capabilities',
    priority: 1,
    items: [
      {
        id: 'introduction-philosophy',
        title: 'Introduction & Philosophy',
        href: '/docs/platform/introduction',
        description: 'What is CareerForge, mission, vision, and core values',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 10,
        tags: ['introduction', 'overview', 'philosophy'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.BEGINNER,
          estimatedTime: 10,
          tags: ['introduction', 'overview', 'philosophy'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'getting-started',
        title: 'Getting Started',
        href: '/docs/platform/getting-started',
        description: 'Quick start guide and installation steps',
        contentType: ContentType.TUTORIAL,
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 20,
        tags: ['quickstart', 'setup', 'installation'],
        badge: BadgeType.STABLE,
        metadata: {
          contentType: ContentType.TUTORIAL,
          difficulty: DifficultyLevel.BEGINNER,
          estimatedTime: 20,
          tags: ['quickstart', 'setup', 'installation'],
          lastUpdated: '2024-12-27',
          version: '2.4.0'
        }
      },
      {
        id: 'platform-architecture',
        title: 'Platform Architecture',
        href: '/docs/platform/architecture',
        description: 'System overview, high-level architecture, and data flows',
        contentType: ContentType.ARCHITECTURE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 30,
        tags: ['architecture', 'system-design', 'data-flows'],
        metadata: {
          contentType: ContentType.ARCHITECTURE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 30,
          tags: ['architecture', 'system-design', 'data-flows'],
          lastUpdated: '2024-12-27'
        }
      }
    ]
  },

  // 2. Frontend Documentation
  {
    id: 'frontend-documentation',
    title: 'Frontend Documentation',
    description: 'Complete frontend application documentation',
    priority: 2,
    items: [
      {
        id: 'application-structure',
        title: 'Application Structure',
        href: '/docs/frontend/structure',
        description: 'Project overview, file structure, routing, and component architecture',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 25,
        tags: ['structure', 'routing', 'components', 'architecture'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 25,
          tags: ['structure', 'routing', 'components', 'architecture'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'landing-page',
        title: 'Landing Page',
        href: '/docs/frontend/landing-page',
        description: 'Homepage design, hero section, navigation, and call-to-actions',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 15,
        tags: ['landing-page', 'hero', 'navigation', 'design'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.BEGINNER,
          estimatedTime: 15,
          tags: ['landing-page', 'hero', 'navigation', 'design'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'authentication-pages',
        title: 'Authentication Pages',
        href: '/docs/frontend/authentication',
        description: 'Login, registration, password reset, and email verification flows',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 20,
        tags: ['authentication', 'login', 'registration', 'security'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 20,
          tags: ['authentication', 'login', 'registration', 'security'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'job-seeker-dashboard',
        title: 'Job Seeker Dashboard',
        href: '/docs/frontend/job-seeker-dashboard',
        description: 'Dashboard layout, profile completion, job recommendations, and application tracking',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 25,
        tags: ['dashboard', 'job-seeker', 'profile', 'recommendations'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 25,
          tags: ['dashboard', 'job-seeker', 'profile', 'recommendations'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'recruiter-dashboard',
        title: 'Recruiter Dashboard',
        href: '/docs/frontend/recruiter-dashboard',
        description: 'Dashboard overview, job posting interface, candidate management, and analytics',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 25,
        tags: ['dashboard', 'recruiter', 'job-posting', 'analytics'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 25,
          tags: ['dashboard', 'recruiter', 'job-posting', 'analytics'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'job-search-browse',
        title: 'Job Search & Browse',
        href: '/docs/frontend/job-search',
        description: 'Search interface, filter system, job listings, and detail pages',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 20,
        tags: ['search', 'filter', 'job-listings', 'browse'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 20,
          tags: ['search', 'filter', 'job-listings', 'browse'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'application-process',
        title: 'Application Process',
        href: '/docs/frontend/application-process',
        description: 'Application forms, resume upload, cover letter generator, status tracking',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 20,
        tags: ['application', 'resume', 'cover-letter', 'tracking'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 20,
          tags: ['application', 'resume', 'cover-letter', 'tracking'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'messaging-system',
        title: 'Messaging System',
        href: '/docs/frontend/messaging',
        description: 'Chat interface, conversations, notifications, and real-time updates',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 20,
        tags: ['messaging', 'chat', 'notifications', 'real-time'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 20,
          tags: ['messaging', 'chat', 'notifications', 'real-time'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'profile-management',
        title: 'Profile Management',
        href: '/docs/frontend/profile-management',
        description: 'Profile creation, skills management, portfolio integration, privacy settings',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 15,
        tags: ['profile', 'skills', 'portfolio', 'privacy'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.BEGINNER,
          estimatedTime: 15,
          tags: ['profile', 'skills', 'portfolio', 'privacy'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'component-library',
        title: 'Component Library',
        href: '/docs/frontend/components',
        description: 'UI components, forms, navigation, data display, and interactive components',
        contentType: ContentType.REFERENCE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 30,
        tags: ['components', 'ui', 'forms', 'navigation'],
        metadata: {
          contentType: ContentType.REFERENCE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 30,
          tags: ['components', 'ui', 'forms', 'navigation'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'design-system',
        title: 'Design System',
        href: '/docs/frontend/design-system',
        description: 'Color palette, typography, spacing, buttons, forms, and icons',
        contentType: ContentType.REFERENCE,
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 20,
        tags: ['design-system', 'colors', 'typography', 'buttons'],
        metadata: {
          contentType: ContentType.REFERENCE,
          difficulty: DifficultyLevel.BEGINNER,
          estimatedTime: 20,
          tags: ['design-system', 'colors', 'typography', 'buttons'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'responsive-design',
        title: 'Responsive Design',
        href: '/docs/frontend/responsive',
        description: 'Mobile-first approach, breakpoints, touch interactions, accessibility',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 25,
        tags: ['responsive', 'mobile', 'accessibility', 'breakpoints'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 25,
          tags: ['responsive', 'mobile', 'accessibility', 'breakpoints'],
          lastUpdated: '2024-12-27'
        }
      }
    ]
  },

  // 3. Backend API Documentation
  {
    id: 'backend-api',
    title: 'Backend API',
    description: 'Complete backend API documentation and endpoints',
    priority: 3,
    items: [
      {
        id: 'api-overview',
        title: 'API Overview',
        href: '/docs/backend/overview',
        description: 'Authentication, request/response format, error handling, rate limiting',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 15,
        tags: ['api', 'overview', 'authentication', 'rate-limiting'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.BEGINNER,
          estimatedTime: 15,
          tags: ['api', 'overview', 'authentication', 'rate-limiting'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'authentication-api',
        title: 'Authentication API',
        href: '/docs/backend/authentication',
        description: 'Registration, login, logout, profile management, password reset',
        contentType: ContentType.API,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 30,
        tags: ['authentication', 'registration', 'login', 'password-reset'],
        badge: BadgeType.STABLE,
        metadata: {
          contentType: ContentType.API,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 30,
          tags: ['authentication', 'registration', 'login', 'password-reset'],
          lastUpdated: '2024-12-27',
          version: '1.0.0'
        }
      },
      {
        id: 'user-management-api',
        title: 'User Management API',
        href: '/docs/backend/user-management',
        description: 'Profile management, photo upload, account deletion',
        contentType: ContentType.API,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 20,
        tags: ['users', 'profile', 'management'],
        metadata: {
          contentType: ContentType.API,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 20,
          tags: ['users', 'profile', 'management'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'job-management-api',
        title: 'Job Management API',
        href: '/docs/backend/jobs',
        description: 'Job CRUD operations, search, recommendations, and filtering',
        contentType: ContentType.API,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 35,
        tags: ['jobs', 'search', 'recommendations', 'filtering'],
        badge: BadgeType.STABLE,
        metadata: {
          contentType: ContentType.API,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 35,
          tags: ['jobs', 'search', 'recommendations', 'filtering'],
          lastUpdated: '2024-12-27',
          version: '1.0.0'
        }
      },
      {
        id: 'application-management-api',
        title: 'Application Management API',
        href: '/docs/backend/applications',
        description: 'Job applications, status updates, and tracking',
        contentType: ContentType.API,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 25,
        tags: ['applications', 'status', 'tracking'],
        badge: BadgeType.STABLE,
        metadata: {
          contentType: ContentType.API,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 25,
          tags: ['applications', 'status', 'tracking'],
          lastUpdated: '2024-12-27',
          version: '1.0.0'
        }
      },
      {
        id: 'resume-management-api',
        title: 'Resume Management API',
        href: '/docs/backend/resume',
        description: 'Resume upload, parsing, optimization, and version control',
        contentType: ContentType.API,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 30,
        tags: ['resume', 'upload', 'parsing', 'optimization'],
        badge: BadgeType.BETA,
        metadata: {
          contentType: ContentType.API,
          difficulty: DifficultyLevel.ADVANCED,
          estimatedTime: 30,
          tags: ['resume', 'upload', 'parsing', 'optimization'],
          lastUpdated: '2024-12-27',
          version: '1.0.0-beta'
        }
      },
      {
        id: 'matching-api',
        title: 'Matching API',
        href: '/docs/backend/matching',
        description: 'Job-candidate matching, suggestions, and batch operations',
        contentType: ContentType.API,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 40,
        tags: ['matching', 'suggestions', 'batch', 'ai'],
        badge: BadgeType.BETA,
        metadata: {
          contentType: ContentType.API,
          difficulty: DifficultyLevel.ADVANCED,
          estimatedTime: 40,
          tags: ['matching', 'suggestions', 'batch', 'ai'],
          lastUpdated: '2024-12-27',
          version: '1.0.0-beta'
        }
      },
      {
        id: 'messaging-api',
        title: 'Messaging API',
        href: '/docs/backend/messaging',
        description: 'Real-time messaging, conversations, and notifications',
        contentType: ContentType.API,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 35,
        tags: ['messaging', 'real-time', 'conversations', 'websocket'],
        badge: BadgeType.BETA,
        metadata: {
          contentType: ContentType.API,
          difficulty: DifficultyLevel.ADVANCED,
          estimatedTime: 35,
          tags: ['messaging', 'real-time', 'conversations', 'websocket'],
          lastUpdated: '2024-12-27',
          version: '1.0.0-beta'
        }
      },
      {
        id: 'analytics-api',
        title: 'Analytics API',
        href: '/docs/backend/analytics',
        description: 'Dashboard metrics, job analytics, and user analytics',
        contentType: ContentType.API,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 25,
        tags: ['analytics', 'metrics', 'dashboard', 'reporting'],
        metadata: {
          contentType: ContentType.API,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 25,
          tags: ['analytics', 'metrics', 'dashboard', 'reporting'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'admin-api',
        title: 'Admin API',
        href: '/docs/backend/admin',
        description: 'User management, platform analytics, and system administration',
        contentType: ContentType.API,
        difficulty: DifficultyLevel.EXPERT,
        estimatedTime: 30,
        tags: ['admin', 'management', 'analytics', 'system'],
        metadata: {
          contentType: ContentType.API,
          difficulty: DifficultyLevel.EXPERT,
          estimatedTime: 30,
          tags: ['admin', 'management', 'analytics', 'system'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'database-schema',
        title: 'Database Schema',
        href: '/docs/backend/database',
        description: 'Complete database schema, tables, relationships, and migrations',
        contentType: ContentType.REFERENCE,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 45,
        tags: ['database', 'schema', 'tables', 'relationships', 'migrations'],
        metadata: {
          contentType: ContentType.REFERENCE,
          difficulty: DifficultyLevel.ADVANCED,
          estimatedTime: 45,
          tags: ['database', 'schema', 'tables', 'relationships', 'migrations'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'real-time-features',
        title: 'Real-time Features',
        href: '/docs/backend/realtime',
        description: 'WebSocket events, live messaging, notifications, and typing indicators',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 30,
        tags: ['realtime', 'websocket', 'messaging', 'notifications'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.ADVANCED,
          estimatedTime: 30,
          tags: ['realtime', 'websocket', 'messaging', 'notifications'],
          lastUpdated: '2024-12-27'
        }
      }
    ]
  },

  // 4. AI Services Documentation
  {
    id: 'ai-services',
    title: 'AI Services',
    description: 'Complete AI services documentation and model details',
    priority: 4,
    items: [
      {
        id: 'ai-services-overview',
        title: 'AI Services Overview',
        href: '/docs/ai/overview',
        description: 'Service architecture, model overview, performance metrics, integration guide',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 20,
        tags: ['ai', 'overview', 'architecture', 'performance'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 20,
          tags: ['ai', 'overview', 'architecture', 'performance'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'resume-parser-service',
        title: 'Resume Parser Service',
        href: '/docs/ai/resume-parser',
        description: 'Service details, NER models, skill extraction, experience parsing',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 40,
        tags: ['resume-parser', 'ner', 'skill-extraction', 'experience'],
        badge: BadgeType.STABLE,
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.ADVANCED,
          estimatedTime: 40,
          tags: ['resume-parser', 'ner', 'skill-extraction', 'experience'],
          lastUpdated: '2024-12-27',
          version: '1.0.0'
        }
      },
      {
        id: 'resume-parser-api',
        title: 'Resume Parser API',
        href: '/docs/ai/resume-parser-api',
        description: 'API endpoints, request/response format, file parsing, optimization',
        contentType: ContentType.API,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 30,
        tags: ['api', 'resume-parser', 'file-parsing', 'optimization'],
        badge: BadgeType.STABLE,
        metadata: {
          contentType: ContentType.API,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 30,
          tags: ['api', 'resume-parser', 'file-parsing', 'optimization'],
          lastUpdated: '2024-12-27',
          version: '1.0.0'
        }
      },
      {
        id: 'matching-engine-service',
        title: 'Matching Engine Service',
        href: '/docs/ai/matching-engine',
        description: 'Service details, semantic similarity, skill matching, experience scoring',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 45,
        tags: ['matching-engine', 'semantic-similarity', 'skill-matching', 'experience'],
        badge: BadgeType.BETA,
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.ADVANCED,
          estimatedTime: 45,
          tags: ['matching-engine', 'semantic-similarity', 'skill-matching', 'experience'],
          lastUpdated: '2024-12-27',
          version: '1.0.0-beta'
        }
      },
      {
        id: 'matching-engine-api',
        title: 'Matching Engine API',
        href: '/docs/ai/matching-engine-api',
        description: 'API endpoints, match calculations, suggestions, batch operations',
        contentType: ContentType.API,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 35,
        tags: ['api', 'matching', 'suggestions', 'batch-operations'],
        badge: BadgeType.BETA,
        metadata: {
          contentType: ContentType.API,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 35,
          tags: ['api', 'matching', 'suggestions', 'batch-operations'],
          lastUpdated: '2024-12-27',
          version: '1.0.0-beta'
        }
      },
      {
        id: 'career-coach-service',
        title: 'Career Coach Service',
        href: '/docs/ai/career-coach',
        description: 'Service details, advice generation, LinkedIn optimization, career paths',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 40,
        tags: ['career-coach', 'advice', 'linkedin', 'career-paths'],
        badge: BadgeType.BETA,
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.ADVANCED,
          estimatedTime: 40,
          tags: ['career-coach', 'advice', 'linkedin', 'career-paths'],
          lastUpdated: '2024-12-27',
          version: '1.0.0-beta'
        }
      },
      {
        id: 'career-coach-api',
        title: 'Career Coach API',
        href: '/docs/ai/career-coach-api',
        description: 'API endpoints, advice requests, cover letter generation, skill gap analysis',
        contentType: ContentType.API,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 30,
        tags: ['api', 'career-coach', 'cover-letter', 'skill-gap'],
        badge: BadgeType.BETA,
        metadata: {
          contentType: ContentType.API,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 30,
          tags: ['api', 'career-coach', 'cover-letter', 'skill-gap'],
          lastUpdated: '2024-12-27',
          version: '1.0.0-beta'
        }
      },
      {
        id: 'vector-search',
        title: 'Vector Search (pgvector)',
        href: '/docs/ai/vector-search',
        description: 'Vector embeddings, semantic search, similarity search, metadata filtering',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.EXPERT,
        estimatedTime: 50,
        tags: ['vector-search', 'embeddings', 'semantic-search', 'pgvector'],
        badge: BadgeType.NEW,
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.EXPERT,
          estimatedTime: 50,
          tags: ['vector-search', 'embeddings', 'semantic-search', 'pgvector'],
          lastUpdated: '2024-12-27',
          version: '2.4.0'
        }
      },
      {
        id: 'ai-models-reference',
        title: 'AI Models Reference',
        href: '/docs/ai/models',
        description: 'Complete reference of all AI models, architectures, and capabilities',
        contentType: ContentType.REFERENCE,
        difficulty: DifficultyLevel.EXPERT,
        estimatedTime: 60,
        tags: ['models', 'reference', 'architectures', 'capabilities'],
        metadata: {
          contentType: ContentType.REFERENCE,
          difficulty: DifficultyLevel.EXPERT,
          estimatedTime: 60,
          tags: ['models', 'reference', 'architectures', 'capabilities'],
          lastUpdated: '2024-12-27'
        }
      }
    ]
  },

  // 5. Business & Strategy Documentation
  {
    id: 'business-strategy',
    title: 'Business & Strategy',
    description: 'Market analysis, business model, growth strategy, and executive insights',
    priority: 5,
    items: [
      {
        id: 'market-analysis',
        title: 'Market Analysis',
        href: '/docs/business/market-analysis',
        description: 'Industry overview, competitive landscape, opportunities, demographics',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 30,
        tags: ['market', 'analysis', 'competitive', 'demographics'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 30,
          tags: ['market', 'analysis', 'competitive', 'demographics'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'business-model',
        title: 'Business Model',
        href: '/docs/business/model',
        description: 'Revenue streams, pricing strategy, customer segments, value proposition',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 25,
        tags: ['business-model', 'revenue', 'pricing', 'value-proposition'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 25,
          tags: ['business-model', 'revenue', 'pricing', 'value-proposition'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'growth-strategy',
        title: 'Growth Strategy',
        href: '/docs/business/growth-strategy',
        description: 'User acquisition, retention, expansion plans, partnerships',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 30,
        tags: ['growth', 'acquisition', 'retention', 'partnerships'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 30,
          tags: ['growth', 'acquisition', 'retention', 'partnerships'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'executive-dashboard',
        title: 'Executive Dashboard',
        href: '/docs/business/executive-dashboard',
        description: 'KPIs, financial metrics, user analytics, growth metrics',
        contentType: ContentType.REFERENCE,
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 15,
        tags: ['executive', 'dashboard', 'kpis', 'metrics'],
        metadata: {
          contentType: ContentType.REFERENCE,
          difficulty: DifficultyLevel.BEGINNER,
          estimatedTime: 15,
          tags: ['executive', 'dashboard', 'kpis', 'metrics'],
          lastUpdated: '2024-12-27'
        }
      }
    ]
  },

  // 6. Developer Resources
  {
    id: 'developer-resources',
    title: 'Developer Resources',
    description: 'Setup, integration guides, deployment, and troubleshooting',
    priority: 6,
    items: [
      {
        id: 'setup-installation',
        title: 'Setup & Installation',
        href: '/docs/developer/setup',
        description: 'Development environment, local setup, Docker, environment variables',
        contentType: ContentType.TUTORIAL,
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 30,
        tags: ['setup', 'installation', 'development', 'docker'],
        metadata: {
          contentType: ContentType.TUTORIAL,
          difficulty: DifficultyLevel.BEGINNER,
          estimatedTime: 30,
          tags: ['setup', 'installation', 'development', 'docker'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'api-integration',
        title: 'API Integration',
        href: '/docs/developer/integration',
        description: 'SDK documentation, code examples, integration guides, testing',
        contentType: ContentType.TUTORIAL,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 45,
        tags: ['integration', 'sdk', 'examples', 'testing'],
        badge: BadgeType.STABLE,
        metadata: {
          contentType: ContentType.TUTORIAL,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 45,
          tags: ['integration', 'sdk', 'examples', 'testing'],
          lastUpdated: '2024-12-27',
          version: '1.0.0'
        }
      },
      {
        id: 'database-management',
        title: 'Database Management',
        href: '/docs/developer/database',
        description: 'Schema migrations, data seeding, backup procedures, optimization',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 40,
        tags: ['database', 'migrations', 'seeding', 'backup'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.ADVANCED,
          estimatedTime: 40,
          tags: ['database', 'migrations', 'seeding', 'backup'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'deployment',
        title: 'Deployment',
        href: '/docs/developer/deployment',
        description: 'Production deployment, CI/CD pipeline, monitoring, scaling',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 50,
        tags: ['deployment', 'ci-cd', 'monitoring', 'scaling'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.ADVANCED,
          estimatedTime: 50,
          tags: ['deployment', 'ci-cd', 'monitoring', 'scaling'],
          lastUpdated: '2024-12-27'
        }
      }
    ]
  },

  // 7. Security & Compliance
  {
    id: 'security-compliance',
    title: 'Security & Compliance',
    description: 'Security architecture, privacy, compliance, and best practices',
    priority: 7,
    items: [
      {
        id: 'security-architecture',
        title: 'Security Architecture',
        href: '/docs/security/architecture',
        description: 'Authentication, authorization, encryption, API security',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 40,
        tags: ['security', 'architecture', 'authentication', 'encryption'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.ADVANCED,
          estimatedTime: 40,
          tags: ['security', 'architecture', 'authentication', 'encryption'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'privacy-compliance',
        title: 'Privacy & Compliance',
        href: '/docs/security/privacy',
        description: 'GDPR compliance, data protection, privacy policy, user rights',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 30,
        tags: ['privacy', 'gdpr', 'compliance', 'data-protection'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 30,
          tags: ['privacy', 'gdpr', 'compliance', 'data-protection'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'security-best-practices',
        title: 'Security Best Practices',
        href: '/docs/security/best-practices',
        description: 'Secure coding, vulnerability management, incident response, testing',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 35,
        tags: ['best-practices', 'secure-coding', 'vulnerability', 'incident-response'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.ADVANCED,
          estimatedTime: 35,
          tags: ['best-practices', 'secure-coding', 'vulnerability', 'incident-response'],
          lastUpdated: '2024-12-27'
        }
      }
    ]
  },

  // 8. Support & Resources
  {
    id: 'support-resources',
    title: 'Support & Resources',
    description: 'Getting help, training, changelog, and community',
    priority: 8,
    items: [
      {
        id: 'getting-help',
        title: 'Getting Help',
        href: '/docs/support/help',
        description: 'Support channels, community forums, feedback, bug reporting',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 10,
        tags: ['support', 'help', 'community', 'feedback'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.BEGINNER,
          estimatedTime: 10,
          tags: ['support', 'help', 'community', 'feedback'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'training-tutorials',
        title: 'Training & Tutorials',
        href: '/docs/support/training',
        description: 'Video tutorials, interactive guides, best practices, use cases',
        contentType: ContentType.TUTORIAL,
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 60,
        tags: ['training', 'tutorials', 'guides', 'use-cases'],
        metadata: {
          contentType: ContentType.TUTORIAL,
          difficulty: DifficultyLevel.BEGINNER,
          estimatedTime: 60,
          tags: ['training', 'tutorials', 'guides', 'use-cases'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'changelog-updates',
        title: 'Changelog & Updates',
        href: '/docs/support/changelog',
        description: 'Version history, feature releases, bug fixes, roadmap',
        contentType: ContentType.REFERENCE,
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 15,
        tags: ['changelog', 'version', 'updates', 'roadmap'],
        metadata: {
          contentType: ContentType.REFERENCE,
          difficulty: DifficultyLevel.BEGINNER,
          estimatedTime: 15,
          tags: ['changelog', 'version', 'updates', 'roadmap'],
          lastUpdated: '2024-12-27'
        }
      }
    ]
  }
]

// Helper functions for navigation management
export function getNavigationByHref(href: string): NavigationItem | undefined {
  for (const section of comprehensiveNavigationConfig) {
    for (const item of section.items) {
      if (item.href === href) {
        return item
      }
      // Check children
      if (item.children) {
        for (const child of item.children) {
          if (child.href === href) {
            return child
          }
        }
      }
    }
  }
  return undefined
}

export function getRelatedNavigation(currentHref: string): NavigationItem[] {
  const currentSection = comprehensiveNavigationConfig.find(section =>
    section.items.some(item => item.href === currentHref)
  )
  
  if (!currentSection) return []
  
  const currentIndex = currentSection.items.findIndex(item => item.href === currentHref)
  if (currentIndex === -1) return []
  
  const related: NavigationItem[] = []
  
  // Previous item
  if (currentIndex > 0) {
    related.push(currentSection.items[currentIndex - 1])
  }
  
  // Next item
  if (currentIndex < currentSection.items.length - 1) {
    related.push(currentSection.items[currentIndex + 1])
  }
  
  return related
}

export function searchNavigation(
  query: string,
  filters?: {
    contentType?: ContentType[]
    difficulty?: DifficultyLevel[]
    estimatedTime?: [number, number]
  }
): NavigationItem[] {
  const searchTerm = query.toLowerCase()
  
  let results = comprehensiveNavigationConfig.flatMap(section => section.items)
  
  // Apply additional filters
  if (filters) {
    if (filters.contentType?.length) {
      results = results.filter(item => filters.contentType!.includes(item.contentType))
    }
    if (filters.difficulty?.length) {
      results = results.filter(item => filters.difficulty!.includes(item.difficulty))
    }
    if (filters.estimatedTime) {
      const [min, max] = filters.estimatedTime
      results = results.filter(item => 
        item.estimatedTime && 
        item.estimatedTime >= min && 
        item.estimatedTime <= max
      )
    }
  }
  
  // Search in title, description, and tags
  return results.filter(item => 
    item.title.toLowerCase().includes(searchTerm) ||
    item.description?.toLowerCase().includes(searchTerm) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchTerm))
  )
}

export function getContentMetadata(href: string): ContentMetadata | undefined {
  const item = getNavigationByHref(href)
  return item?.metadata
}