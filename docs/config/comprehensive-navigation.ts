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
        id: 'ai-services-introduction',
        title: 'AI Services Introduction',
        href: '/docs/ai-services/introduction',
        description: 'Overview of AI services including resume parsing, job matching, recommendation engines, and more',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 15,
        tags: ['ai', 'services', 'overview', 'introduction'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.BEGINNER,
          estimatedTime: 15,
          tags: ['ai', 'services', 'overview', 'introduction'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'resume-parsing',
        title: 'Resume Parsing',
        href: '/docs/ai-services/resume-parsing',
        description: 'AI-powered resume parsing with text extraction, entity recognition, and structured data generation',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 20,
        tags: ['resume', 'parsing', 'nlp', 'entity-recognition'],
        badge: BadgeType.STABLE,
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 20,
          tags: ['resume', 'parsing', 'nlp', 'entity-recognition'],
          lastUpdated: '2024-12-27',
          version: '2.4.0'
        }
      },
      {
        id: 'job-matching',
        title: 'Job Matching',
        href: '/docs/ai-services/job-matching',
        description: 'Intelligent job-candidate matching algorithms with semantic similarity and compatibility scoring',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 25,
        tags: ['job-matching', 'semantic-similarity', 'compatibility', 'scoring'],
        badge: BadgeType.STABLE,
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.ADVANCED,
          estimatedTime: 25,
          tags: ['job-matching', 'semantic-similarity', 'compatibility', 'scoring'],
          lastUpdated: '2024-12-27',
          version: '2.4.0'
        }
      },
      {
        id: 'recommendation-engine',
        title: 'Recommendation Engine',
        href: '/docs/ai-services/recommendation-engine',
        description: 'Personalized recommendation system using collaborative filtering and content-based matching',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 30,
        tags: ['recommendation', 'collaborative-filtering', 'personalization', 'matching'],
        badge: BadgeType.STABLE,
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.ADVANCED,
          estimatedTime: 30,
          tags: ['recommendation', 'collaborative-filtering', 'personalization', 'matching'],
          lastUpdated: '2024-12-27',
          version: '2.4.0'
        }
      },
      {
        id: 'chatbot-integration',
        title: 'Chatbot Integration',
        href: '/docs/ai-services/chatbot-integration',
        description: 'Conversational AI chatbot for career guidance, job search assistance, and personalized recommendations',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 20,
        tags: ['chatbot', 'conversational-ai', 'career-guidance', 'nlp'],
        badge: BadgeType.BETA,
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 20,
          tags: ['chatbot', 'conversational-ai', 'career-guidance', 'nlp'],
          lastUpdated: '2024-12-27',
          version: '1.0.0-beta'
        }
      },
      {
        id: 'sentiment-analysis',
        title: 'Sentiment Analysis',
        href: '/docs/ai-services/sentiment-analysis',
        description: 'AI-powered sentiment analysis for understanding candidate feedback and user interactions',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 15,
        tags: ['sentiment-analysis', 'nlp', 'feedback', 'emotion-detection'],
        badge: BadgeType.STABLE,
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 15,
          tags: ['sentiment-analysis', 'nlp', 'feedback', 'emotion-detection'],
          lastUpdated: '2024-12-27',
          version: '2.4.0'
        }
      },
      {
        id: 'skill-extraction',
        title: 'Skill Extraction',
        href: '/docs/ai-services/skill-extraction',
        description: 'Advanced AI for extracting and categorizing skills from resumes, job descriptions, and text content',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 18,
        tags: ['skill-extraction', 'nlp', 'taxonomy', 'competency-mapping'],
        badge: BadgeType.STABLE,
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 18,
          tags: ['skill-extraction', 'nlp', 'taxonomy', 'competency-mapping'],
          lastUpdated: '2024-12-27',
          version: '2.4.0'
        }
      },
      {
        id: 'predictive-analytics',
        title: 'Predictive Analytics',
        href: '/docs/ai-services/predictive-analytics',
        description: 'AI-powered predictive analytics for career success forecasting, market trends, and performance predictions',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 25,
        tags: ['predictive-analytics', 'forecasting', 'career-success', 'market-trends'],
        badge: BadgeType.BETA,
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.ADVANCED,
          estimatedTime: 25,
          tags: ['predictive-analytics', 'forecasting', 'career-success', 'market-trends'],
          lastUpdated: '2024-12-27',
          version: '1.0.0-beta'
        }
      },
      {
        id: 'model-training',
        title: 'AI Model Training',
        href: '/docs/ai-services/model-training',
        description: 'Comprehensive guide to AI model training processes, data pipelines, and deployment strategies',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.EXPERT,
        estimatedTime: 35,
        tags: ['model-training', 'machine-learning', 'data-pipelines', 'mlops'],
        badge: BadgeType.STABLE,
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.EXPERT,
          estimatedTime: 35,
          tags: ['model-training', 'machine-learning', 'data-pipelines', 'mlops'],
          lastUpdated: '2024-12-27',
          version: '2.4.0'
        }
      },
      {
        id: 'performance-monitoring',
        title: 'AI Performance Monitoring',
        href: '/docs/ai-services/performance-monitoring',
        description: 'Comprehensive monitoring and analytics for AI service performance, model accuracy, and system health',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 25,
        tags: ['performance-monitoring', 'analytics', 'model-monitoring', 'observability'],
        badge: BadgeType.STABLE,
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.ADVANCED,
          estimatedTime: 25,
          tags: ['performance-monitoring', 'analytics', 'model-monitoring', 'observability'],
          lastUpdated: '2024-12-27',
          version: '2.4.0'
        }
      }
    ]
  },

  // 5. Executive Documentation
  {
    id: 'executive',
    title: 'Executive',
    description: 'Business metrics, market analysis, and strategic insights for executives and investors',
    priority: 5,
    items: [
      {
        id: 'executive-summary',
        title: 'Executive Summary',
        href: '/docs/executive/executive-summary',
        description: 'Overview of CareerForge for investors and executives',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 15,
        tags: ['executive', 'summary', 'overview'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.BEGINNER,
          estimatedTime: 15,
          tags: ['executive', 'summary', 'overview'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'business-value',
        title: 'Business Value',
        href: '/docs/executive/business-value',
        description: 'ROI calculator and business value analysis',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 25,
        tags: ['business', 'value', 'roi'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 25,
          tags: ['business', 'value', 'roi'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'market-intelligence',
        title: 'Market Intelligence',
        href: '/docs/executive/market-intelligence',
        description: 'Market analysis and competitive intelligence',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 30,
        tags: ['market', 'intelligence', 'analysis'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 30,
          tags: ['market', 'intelligence', 'analysis'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'competitive-analysis',
        title: 'Competitive Analysis',
        href: '/docs/executive/competitive-analysis',
        description: 'Competitive landscape and positioning',
        contentType: ContentType.REFERENCE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 25,
        tags: ['competitive', 'analysis', 'positioning'],
        metadata: {
          contentType: ContentType.REFERENCE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 25,
          tags: ['competitive', 'analysis', 'positioning'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'revenue-projections',
        title: 'Revenue Projections',
        href: '/docs/executive/revenue-projections',
        description: 'Financial projections and revenue models',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 40,
        tags: ['revenue', 'projections', 'financial'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.ADVANCED,
          estimatedTime: 40,
          tags: ['revenue', 'projections', 'financial'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'growth-projections',
        title: 'Growth Projections',
        href: '/docs/executive/growth-projections',
        description: 'Growth forecasts and market expansion',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 35,
        tags: ['growth', 'projections', 'forecasts'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.ADVANCED,
          estimatedTime: 35,
          tags: ['growth', 'projections', 'forecasts'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'growth-strategy',
        title: 'Growth Strategy',
        href: '/docs/executive/growth-strategy',
        description: 'Strategic growth initiatives and roadmap',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 30,
        tags: ['growth', 'strategy', 'roadmap'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 30,
          tags: ['growth', 'strategy', 'roadmap'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'investment-highlights',
        title: 'Investment Highlights',
        href: '/docs/executive/investment-highlights',
        description: 'Key investment opportunities and highlights',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 25,
        tags: ['investment', 'highlights', 'opportunities'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 25,
          tags: ['investment', 'highlights', 'opportunities'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'technical-advantages',
        title: 'Technical Advantages',
        href: '/docs/executive/technical-advantages',
        description: 'Technical differentiators and competitive advantages',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 30,
        tags: ['technical', 'advantages', 'differentiators'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 30,
          tags: ['technical', 'advantages', 'differentiators'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'scalability-roadmap',
        title: 'Scalability Roadmap',
        href: '/docs/executive/scalability-roadmap',
        description: 'Scalability strategy and infrastructure roadmap',
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 35,
        tags: ['scalability', 'roadmap', 'infrastructure'],
        metadata: {
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.ADVANCED,
          estimatedTime: 35,
          tags: ['scalability', 'roadmap', 'infrastructure'],
          lastUpdated: '2024-12-27'
        }
      },
      {
        id: 'executive-dashboard',
        title: 'Executive Dashboard',
        href: '/docs/executive/dashboard',
        description: 'Executive dashboard with key metrics',
        contentType: ContentType.REFERENCE,
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 10,
        tags: ['executive', 'dashboard', 'metrics'],
        metadata: {
          contentType: ContentType.REFERENCE,
          difficulty: DifficultyLevel.BEGINNER,
          estimatedTime: 10,
          tags: ['executive', 'dashboard', 'metrics'],
          lastUpdated: '2024-12-27'
        }
      }
    ]
  },

  // 6. Business & Strategy Documentation
  {
    id: 'business-strategy',
    title: 'Business & Strategy',
    description: 'Market analysis, business model, growth strategy, and executive insights',
    priority: 7,
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

  // 7. Developer Resources
  {
    id: 'developer-resources',
    title: 'Developer Resources',
    description: 'Setup, integration guides, deployment, and troubleshooting',
    priority: 8,
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

  // 8. Security & Compliance
  {
    id: 'security-compliance',
    title: 'Security & Compliance',
    description: 'Security architecture, privacy, compliance, and best practices',
    priority: 9,
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

  // 9. Support & Resources
  {
    id: 'support-resources',
    title: 'Support & Resources',
    description: 'Getting help, training, changelog, and community',
    priority: 10,
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