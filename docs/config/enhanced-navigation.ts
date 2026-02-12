// Enhanced Navigation Configuration for Multi-Stakeholder Support
// This file provides role-based navigation filtering and hierarchical organization

export enum UserPersona {
  SENIOR_DEVELOPER = 'senior_developer',
  INVESTOR_EXECUTIVE = 'investor_executive', 
  PRODUCT_MANAGER = 'product_manager',
  END_USER = 'end_user',
  ENTERPRISE_CUSTOMER = 'enterprise_customer'
}

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
  stakeholders: UserPersona[]
  contentType: ContentType
  difficulty: DifficultyLevel
  estimatedTime?: number // minutes
  prerequisites?: string[]
  tags: string[]
  lastUpdated: string
  version?: string
}

export interface EnhancedNavigationItem {
  id: string
  title: string
  href: string
  description?: string
  stakeholders: UserPersona[]
  contentType: ContentType
  difficulty: DifficultyLevel
  estimatedTime?: number
  prerequisites?: string[]
  tags: string[]
  badge?: BadgeType
  external?: boolean
  children?: EnhancedNavigationItem[]
  metadata: ContentMetadata
  icon?: React.ComponentType<{ className?: string }>
}

export interface NavigationSection {
  id: string
  title: string
  description?: string
  stakeholders: UserPersona[]
  items: EnhancedNavigationItem[]
  collapsible?: boolean
  defaultOpen?: boolean
  priority: number // For stakeholder-specific ordering
  icon?: React.ComponentType<{ className?: string }>
  badge?: BadgeType
}

// Persona-specific configurations
export const personaConfigs = {
  [UserPersona.SENIOR_DEVELOPER]: {
    id: UserPersona.SENIOR_DEVELOPER,
    name: 'Senior Developers',
    description: 'Technical deep-dives and architecture documentation',
    color: 'bg-blue-600',
    icon: 'Code',
    defaultSections: ['architecture', 'core-apis', 'data-layer', 'deployment'],
    navigationStyle: 'technical'
  },
  [UserPersona.INVESTOR_EXECUTIVE]: {
    id: UserPersona.INVESTOR_EXECUTIVE,
    name: 'Investors & Executives',
    description: 'Market analysis, ROI, and business value documentation',
    color: 'bg-purple-600',
    icon: 'TrendingUp',
    defaultSections: ['executive-dashboard', 'market-analysis', 'business-metrics'],
    navigationStyle: 'executive'
  },
  [UserPersona.PRODUCT_MANAGER]: {
    id: UserPersona.PRODUCT_MANAGER,
    name: 'Product Managers',
    description: 'User journeys, feature specs, and roadmap documentation',
    color: 'bg-green-600',
    icon: 'Target',
    defaultSections: ['product-overview', 'user-journeys', 'feature-specs', 'analytics'],
    navigationStyle: 'product'
  },
  [UserPersona.END_USER]: {
    id: UserPersona.END_USER,
    name: 'End Users',
    description: 'Getting started guides and tutorials',
    color: 'bg-orange-600',
    icon: 'Users',
    defaultSections: ['getting-started', 'user-guides', 'tutorials', 'faq'],
    navigationStyle: 'user-friendly'
  },
  [UserPersona.ENTERPRISE_CUSTOMER]: {
    id: UserPersona.ENTERPRISE_CUSTOMER,
    name: 'Enterprise Customers',
    description: 'Integration guides and compliance documentation',
    color: 'bg-red-600',
    icon: 'Building2',
    defaultSections: ['enterprise-overview', 'integration-guides', 'security-compliance'],
    navigationStyle: 'enterprise'
  }
}

// Enhanced navigation configuration with multi-stakeholder support
export const enhancedNavigationConfig: NavigationSection[] = [
  // Universal sections (available to all stakeholders)
  {
    id: 'universal',
    title: 'Platform Overview',
    description: 'Introduction to CareerForge and its capabilities',
    stakeholders: Object.values(UserPersona),
    priority: 1,
    // icon: 'Compass',
    items: [
      {
        id: 'overview-introduction',
        title: 'Introduction',
        href: '/docs/overview',
        description: 'About CareerForge, philosophy, and roadmap',
        stakeholders: Object.values(UserPersona),
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 10,
        tags: ['introduction', 'overview', 'getting-started'],
        metadata: {
          stakeholders: Object.values(UserPersona),
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.BEGINNER,
          estimatedTime: 10,
          tags: ['introduction', 'overview', 'getting-started'],
          lastUpdated: '2024-12-26'
        }
      },
      {
        id: 'overview-vision',
        title: 'Platform Vision',
        href: '/docs/overview/vision',
        description: 'Our mission, vision, and strategic direction',
        stakeholders: [UserPersona.INVESTOR_EXECUTIVE, UserPersona.PRODUCT_MANAGER, UserPersona.END_USER],
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 15,
        tags: ['vision', 'mission', 'strategy'],
        metadata: {
          stakeholders: [UserPersona.INVESTOR_EXECUTIVE, UserPersona.PRODUCT_MANAGER, UserPersona.END_USER],
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.BEGINNER,
          estimatedTime: 15,
          tags: ['vision', 'mission', 'strategy'],
          lastUpdated: '2024-12-26'
        }
      },
      {
        id: 'overview-quickstart',
        title: 'Quick Start',
        href: '/docs/quickstart',
        description: 'Get up and running in minutes',
        stakeholders: Object.values(UserPersona),
        contentType: ContentType.TUTORIAL,
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 20,
        tags: ['quickstart', 'setup', 'getting-started'],
        badge: BadgeType.STABLE,
        metadata: {
          stakeholders: Object.values(UserPersona),
          contentType: ContentType.TUTORIAL,
          difficulty: DifficultyLevel.BEGINNER,
          estimatedTime: 20,
          tags: ['quickstart', 'setup', 'getting-started'],
          lastUpdated: '2024-12-26',
          version: '2.4.0'
        }
      }
    ]
  },

  // Developer-specific sections
  {
    id: 'architecture',
    title: 'Architecture',
    description: 'System design and technical architecture',
    stakeholders: [UserPersona.SENIOR_DEVELOPER, UserPersona.ENTERPRISE_CUSTOMER],
    priority: 2,
    // icon: 'Layers',
    items: [
      {
        id: 'arch-system-overview',
        title: 'System Overview',
        href: '/docs/architecture',
        description: 'High-level system architecture',
        stakeholders: [UserPersona.SENIOR_DEVELOPER, UserPersona.ENTERPRISE_CUSTOMER],
        contentType: ContentType.ARCHITECTURE,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 30,
        tags: ['architecture', 'system-design', 'microservices'],
        metadata: {
          stakeholders: [UserPersona.SENIOR_DEVELOPER, UserPersona.ENTERPRISE_CUSTOMER],
          contentType: ContentType.ARCHITECTURE,
          difficulty: DifficultyLevel.ADVANCED,
          estimatedTime: 30,
          tags: ['architecture', 'system-design', 'microservices'],
          lastUpdated: '2024-12-26'
        }
      },
      {
        id: 'arch-service-boundaries',
        title: 'Service Boundaries',
        href: '/docs/architecture/service-boundaries',
        description: 'Microservices boundaries and responsibilities',
        stakeholders: [UserPersona.SENIOR_DEVELOPER],
        contentType: ContentType.REFERENCE,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 25,
        tags: ['microservices', 'boundaries', 'responsibilities'],
        metadata: {
          stakeholders: [UserPersona.SENIOR_DEVELOPER],
          contentType: ContentType.REFERENCE,
          difficulty: DifficultyLevel.ADVANCED,
          estimatedTime: 25,
          tags: ['microservices', 'boundaries', 'responsibilities'],
          lastUpdated: '2024-12-26'
        }
      },
      {
        id: 'arch-data-flows',
        title: 'Data Flows',
        href: '/docs/architecture/data-flows',
        description: 'Data flow patterns and relationships',
        stakeholders: [UserPersona.SENIOR_DEVELOPER],
        contentType: ContentType.REFERENCE,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 20,
        tags: ['data-flows', 'patterns', 'relationships'],
        metadata: {
          stakeholders: [UserPersona.SENIOR_DEVELOPER],
          contentType: ContentType.REFERENCE,
          difficulty: DifficultyLevel.ADVANCED,
          estimatedTime: 20,
          tags: ['data-flows', 'patterns', 'relationships'],
          lastUpdated: '2024-12-26'
        }
      },
      {
        id: 'arch-security-posture',
        title: 'Security Posture',
        href: '/docs/architecture/security-posture',
        description: 'Security architecture and best practices',
        stakeholders: [UserPersona.SENIOR_DEVELOPER, UserPersona.ENTERPRISE_CUSTOMER],
        contentType: ContentType.REFERENCE,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 35,
        tags: ['security', 'architecture', 'best-practices'],
        metadata: {
          stakeholders: [UserPersona.SENIOR_DEVELOPER, UserPersona.ENTERPRISE_CUSTOMER],
          contentType: ContentType.REFERENCE,
          difficulty: DifficultyLevel.ADVANCED,
          estimatedTime: 35,
          tags: ['security', 'architecture', 'best-practices'],
          lastUpdated: '2024-12-26'
        }
      }
    ]
  },

  {
    id: 'core-apis',
    title: 'Core APIs',
    description: 'API documentation and integration guides',
    stakeholders: [UserPersona.SENIOR_DEVELOPER, UserPersona.ENTERPRISE_CUSTOMER],
    priority: 3,
    // icon: 'Terminal',
    items: [
      {
        id: 'api-matching-engine',
        title: 'Matching Engine',
        href: '/docs/api/matching-engine',
        description: 'Job-candidate matching algorithms',
        stakeholders: [UserPersona.SENIOR_DEVELOPER, UserPersona.ENTERPRISE_CUSTOMER],
        contentType: ContentType.API,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 45,
        tags: ['matching', 'algorithms', 'api'],
        badge: BadgeType.BETA,
        metadata: {
          stakeholders: [UserPersona.SENIOR_DEVELOPER, UserPersona.ENTERPRISE_CUSTOMER],
          contentType: ContentType.API,
          difficulty: DifficultyLevel.ADVANCED,
          estimatedTime: 45,
          tags: ['matching', 'algorithms', 'api'],
          lastUpdated: '2024-12-26',
          version: '2.4.0-beta'
        }
      },
      {
        id: 'api-resume-parser',
        title: 'Resume Parser',
        href: '/docs/api/resume-parser',
        description: 'Resume extraction and processing',
        stakeholders: [UserPersona.SENIOR_DEVELOPER, UserPersona.ENTERPRISE_CUSTOMER],
        contentType: ContentType.API,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 30,
        tags: ['resume', 'parsing', 'extraction'],
        metadata: {
          stakeholders: [UserPersona.SENIOR_DEVELOPER, UserPersona.ENTERPRISE_CUSTOMER],
          contentType: ContentType.API,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 30,
          tags: ['resume', 'parsing', 'extraction'],
          lastUpdated: '2024-12-26'
        }
      },
      {
        id: 'api-career-coach',
        title: 'Career Coach',
        href: '/docs/api/career-coach',
        description: 'Personalized career guidance',
        stakeholders: [UserPersona.SENIOR_DEVELOPER, UserPersona.ENTERPRISE_CUSTOMER],
        contentType: ContentType.API,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 25,
        tags: ['career', 'guidance', 'coaching'],
        badge: BadgeType.BETA,
        metadata: {
          stakeholders: [UserPersona.SENIOR_DEVELOPER, UserPersona.ENTERPRISE_CUSTOMER],
          contentType: ContentType.API,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 25,
          tags: ['career', 'guidance', 'coaching'],
          lastUpdated: '2024-12-26',
          version: '2.4.0-beta'
        }
      },
      {
        id: 'api-analytics',
        title: 'Analytics',
        href: '/docs/api/analytics',
        description: 'Performance and business metrics',
        stakeholders: [UserPersona.SENIOR_DEVELOPER, UserPersona.PRODUCT_MANAGER, UserPersona.ENTERPRISE_CUSTOMER],
        contentType: ContentType.API,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 35,
        tags: ['analytics', 'metrics', 'performance'],
        metadata: {
          stakeholders: [UserPersona.SENIOR_DEVELOPER, UserPersona.PRODUCT_MANAGER, UserPersona.ENTERPRISE_CUSTOMER],
          contentType: ContentType.API,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 35,
          tags: ['analytics', 'metrics', 'performance'],
          lastUpdated: '2024-12-26'
        }
      }
    ]
  },

  // Executive-specific sections
  {
    id: 'executive-dashboard',
    title: 'Executive Dashboard',
    description: 'Business metrics and strategic insights',
    stakeholders: [UserPersona.INVESTOR_EXECUTIVE, UserPersona.PRODUCT_MANAGER],
    priority: 1,
    icon: 'TrendingUp',
    items: [
      {
        id: 'exec-dashboard-overview',
        title: 'Dashboard Overview',
        href: '/docs/executive/dashboard',
        description: 'Executive dashboard with key metrics and insights',
        stakeholders: [UserPersona.INVESTOR_EXECUTIVE, UserPersona.PRODUCT_MANAGER],
        contentType: ContentType.REFERENCE,
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 10,
        tags: ['dashboard', 'metrics', 'overview'],
        metadata: {
          stakeholders: [UserPersona.INVESTOR_EXECUTIVE, UserPersona.PRODUCT_MANAGER],
          contentType: ContentType.REFERENCE,
          difficulty: DifficultyLevel.BEGINNER,
          estimatedTime: 10,
          tags: ['dashboard', 'metrics', 'overview'],
          lastUpdated: '2024-12-26'
        }
      },
      {
        id: 'exec-market-intelligence',
        title: 'Market Intelligence',
        href: '/docs/executive/market-intelligence',
        description: 'Global recruitment market analysis and opportunities',
        stakeholders: [UserPersona.INVESTOR_EXECUTIVE],
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 30,
        tags: ['market', 'intelligence', 'analysis'],
        metadata: {
          stakeholders: [UserPersona.INVESTOR_EXECUTIVE],
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 30,
          tags: ['market', 'intelligence', 'analysis'],
          lastUpdated: '2024-12-26'
        }
      },
      {
        id: 'exec-competitive-analysis',
        title: 'Competitive Analysis',
        href: '/docs/executive/competitive-analysis',
        description: 'Feature comparison and competitive positioning matrix',
        stakeholders: [UserPersona.INVESTOR_EXECUTIVE],
        contentType: ContentType.REFERENCE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 25,
        tags: ['competitive', 'analysis', 'positioning'],
        metadata: {
          stakeholders: [UserPersona.INVESTOR_EXECUTIVE],
          contentType: ContentType.REFERENCE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 25,
          tags: ['competitive', 'analysis', 'positioning'],
          lastUpdated: '2024-12-26'
        }
      },
      {
        id: 'exec-business-value',
        title: 'Business Value',
        href: '/docs/executive/business-value',
        description: 'ROI calculator and customer success stories',
        stakeholders: [UserPersona.INVESTOR_EXECUTIVE],
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 35,
        tags: ['roi', 'value', 'success'],
        metadata: {
          stakeholders: [UserPersona.INVESTOR_EXECUTIVE],
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 35,
          tags: ['roi', 'value', 'success'],
          lastUpdated: '2024-12-26'
        }
      },
      {
        id: 'exec-growth-projections',
        title: 'Growth Projections',
        href: '/docs/executive/growth-projections',
        description: '3-year financial forecasts and investment roadmap',
        stakeholders: [UserPersona.INVESTOR_EXECUTIVE],
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 40,
        tags: ['growth', 'projections', 'financial'],
        metadata: {
          stakeholders: [UserPersona.INVESTOR_EXECUTIVE],
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.ADVANCED,
          estimatedTime: 40,
          tags: ['growth', 'projections', 'financial'],
          lastUpdated: '2024-12-26'
        }
      },
      {
        id: 'exec-executive-summary',
        title: 'Executive Summary',
        href: '/docs/executive/executive-summary',
        description: 'Downloadable presentations and investor materials',
        stakeholders: [UserPersona.INVESTOR_EXECUTIVE],
        contentType: ContentType.REFERENCE,
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 15,
        tags: ['summary', 'presentations', 'investor'],
        metadata: {
          stakeholders: [UserPersona.INVESTOR_EXECUTIVE],
          contentType: ContentType.REFERENCE,
          difficulty: DifficultyLevel.BEGINNER,
          estimatedTime: 15,
          tags: ['summary', 'presentations', 'investor'],
          lastUpdated: '2024-12-26'
        }
      },
      {
        id: 'exec-investment-highlights',
        title: 'Investment Highlights',
        href: '/docs/executive/investment-highlights',
        description: 'Key investment thesis and value proposition',
        stakeholders: [UserPersona.INVESTOR_EXECUTIVE],
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 25,
        tags: ['investment', 'highlights', 'thesis'],
        metadata: {
          stakeholders: [UserPersona.INVESTOR_EXECUTIVE],
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 25,
          tags: ['investment', 'highlights', 'thesis'],
          lastUpdated: '2024-12-26'
        }
      },
      {
        id: 'exec-scalability-roadmap',
        title: 'Scalability Roadmap',
        href: '/docs/executive/scalability-roadmap',
        description: 'Technical scalability plan and infrastructure requirements',
        stakeholders: [UserPersona.INVESTOR_EXECUTIVE, UserPersona.SENIOR_DEVELOPER],
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 35,
        tags: ['scalability', 'roadmap', 'infrastructure'],
        metadata: {
          stakeholders: [UserPersona.INVESTOR_EXECUTIVE, UserPersona.SENIOR_DEVELOPER],
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.ADVANCED,
          estimatedTime: 35,
          tags: ['scalability', 'roadmap', 'infrastructure'],
          lastUpdated: '2024-12-26'
        }
      },
      {
        id: 'exec-revenue-projections',
        title: 'Revenue Projections',
        href: '/docs/executive/revenue-projections',
        description: 'Detailed revenue models by customer segment',
        stakeholders: [UserPersona.INVESTOR_EXECUTIVE],
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 40,
        tags: ['revenue', 'projections', 'segments'],
        metadata: {
          stakeholders: [UserPersona.INVESTOR_EXECUTIVE],
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.ADVANCED,
          estimatedTime: 40,
          tags: ['revenue', 'projections', 'segments'],
          lastUpdated: '2024-12-26'
        }
      },
      {
        id: 'exec-technical-advantages',
        title: 'Technical Advantages',
        href: '/docs/executive/technical-advantages',
        description: 'Competitive moats and intellectual property',
        stakeholders: [UserPersona.INVESTOR_EXECUTIVE, UserPersona.SENIOR_DEVELOPER],
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 30,
        tags: ['technical', 'advantages', 'competitive'],
        metadata: {
          stakeholders: [UserPersona.INVESTOR_EXECUTIVE, UserPersona.SENIOR_DEVELOPER],
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 30,
          tags: ['technical', 'advantages', 'competitive'],
          lastUpdated: '2024-12-26'
        }
      },
      {
        id: 'exec-risk-assessment',
        title: 'Risk Assessment',
        href: '/docs/executive/risk-assessment',
        description: 'Risk analysis and mitigation strategies',
        stakeholders: [UserPersona.INVESTOR_EXECUTIVE],
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 30,
        tags: ['risk', 'assessment', 'mitigation'],
        metadata: {
          stakeholders: [UserPersona.INVESTOR_EXECUTIVE],
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 30,
          tags: ['risk', 'assessment', 'mitigation'],
          lastUpdated: '2024-12-26'
        }
      },
      {
        id: 'exec-growth-strategy',
        title: 'Growth Strategy',
        href: '/docs/executive/growth-strategy',
        description: 'Expansion plans and market penetration strategies',
        stakeholders: [UserPersona.INVESTOR_EXECUTIVE],
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 35,
        tags: ['growth', 'strategy', 'expansion'],
        metadata: {
          stakeholders: [UserPersona.INVESTOR_EXECUTIVE],
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 35,
          tags: ['growth', 'strategy', 'expansion'],
          lastUpdated: '2024-12-26'
        }
      }
    ]
  },

  // Product Manager sections
  {
    id: 'product-overview',
    title: 'Product Overview',
    description: 'Product strategy and feature documentation',
    stakeholders: [UserPersona.PRODUCT_MANAGER, UserPersona.END_USER],
    priority: 2,
    icon: 'Target',
    items: [
      {
        id: 'product-roadmap',
        title: 'Product Roadmap',
        href: '/docs/product/roadmap',
        description: 'Future features and development timeline',
        stakeholders: [UserPersona.PRODUCT_MANAGER, UserPersona.INVESTOR_EXECUTIVE],
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 20,
        tags: ['roadmap', 'features', 'timeline'],
        metadata: {
          stakeholders: [UserPersona.PRODUCT_MANAGER, UserPersona.INVESTOR_EXECUTIVE],
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 20,
          tags: ['roadmap', 'features', 'timeline'],
          lastUpdated: '2024-12-26'
        }
      },
      {
        id: 'product-user-journeys',
        title: 'User Journeys',
        href: '/docs/product/user-journeys',
        description: 'User experience flows and interaction patterns',
        stakeholders: [UserPersona.PRODUCT_MANAGER, UserPersona.END_USER],
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 30,
        tags: ['user-journey', 'ux', 'flows'],
        metadata: {
          stakeholders: [UserPersona.PRODUCT_MANAGER, UserPersona.END_USER],
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 30,
          tags: ['user-journey', 'ux', 'flows'],
          lastUpdated: '2024-12-26'
        }
      },
      {
        id: 'product-feature-specs',
        title: 'Feature Specifications',
        href: '/docs/product/feature-specs',
        description: 'Detailed feature requirements and acceptance criteria',
        stakeholders: [UserPersona.PRODUCT_MANAGER],
        contentType: ContentType.REFERENCE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 25,
        tags: ['features', 'specifications', 'requirements'],
        metadata: {
          stakeholders: [UserPersona.PRODUCT_MANAGER],
          contentType: ContentType.REFERENCE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 25,
          tags: ['features', 'specifications', 'requirements'],
          lastUpdated: '2024-12-26'
        }
      }
    ]
  },

  // End User sections
  {
    id: 'user-guides',
    title: 'User Guides',
    description: 'Step-by-step guides for end users',
    stakeholders: [UserPersona.END_USER],
    priority: 1,
    // icon: 'BookOpen',
    items: [
      {
        id: 'user-job-seekers',
        title: 'For Job Seekers',
        href: '/docs/users/job-seekers',
        description: 'Complete guide for job seekers using CareerForge',
        stakeholders: [UserPersona.END_USER],
        contentType: ContentType.TUTORIAL,
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 30,
        tags: ['job-seekers', 'tutorial', 'getting-started'],
        metadata: {
          stakeholders: [UserPersona.END_USER],
          contentType: ContentType.TUTORIAL,
          difficulty: DifficultyLevel.BEGINNER,
          estimatedTime: 30,
          tags: ['job-seekers', 'tutorial', 'getting-started'],
          lastUpdated: '2024-12-26'
        }
      },
      {
        id: 'user-recruiters',
        title: 'For Recruiters',
        href: '/docs/users/recruiters',
        description: 'Complete guide for recruiters using CareerForge',
        stakeholders: [UserPersona.END_USER],
        contentType: ContentType.TUTORIAL,
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 35,
        tags: ['recruiters', 'tutorial', 'getting-started'],
        metadata: {
          stakeholders: [UserPersona.END_USER],
          contentType: ContentType.TUTORIAL,
          difficulty: DifficultyLevel.BEGINNER,
          estimatedTime: 35,
          tags: ['recruiters', 'tutorial', 'getting-started'],
          lastUpdated: '2024-12-26'
        }
      },
      {
        id: 'user-best-practices',
        title: 'Best Practices',
        href: '/docs/users/best-practices',
        description: 'Tips and best practices for success',
        stakeholders: [UserPersona.END_USER],
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 20,
        tags: ['best-practices', 'tips', 'success'],
        metadata: {
          stakeholders: [UserPersona.END_USER],
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.BEGINNER,
          estimatedTime: 20,
          tags: ['best-practices', 'tips', 'success'],
          lastUpdated: '2024-12-26'
        }
      }
    ]
  },

  // Enterprise Customer sections
  {
    id: 'enterprise-overview',
    title: 'Enterprise Overview',
    description: 'Enterprise features and capabilities',
    stakeholders: [UserPersona.ENTERPRISE_CUSTOMER, UserPersona.INVESTOR_EXECUTIVE],
    priority: 1,
    icon: 'Building2',
    items: [
      {
        id: 'enterprise-features',
        title: 'Enterprise Features',
        href: '/docs/enterprise/features',
        description: 'Advanced features for enterprise customers',
        stakeholders: [UserPersona.ENTERPRISE_CUSTOMER, UserPersona.INVESTOR_EXECUTIVE],
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 25,
        tags: ['enterprise', 'features', 'advanced'],
        metadata: {
          stakeholders: [UserPersona.ENTERPRISE_CUSTOMER, UserPersona.INVESTOR_EXECUTIVE],
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 25,
          tags: ['enterprise', 'features', 'advanced'],
          lastUpdated: '2024-12-26'
        }
      },
      {
        id: 'enterprise-sla',
        title: 'Service Level Agreement',
        href: '/docs/enterprise/sla',
        description: 'SLA terms and service commitments',
        stakeholders: [UserPersona.ENTERPRISE_CUSTOMER],
        contentType: ContentType.REFERENCE,
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 15,
        tags: ['sla', 'service', 'commitments'],
        metadata: {
          stakeholders: [UserPersona.ENTERPRISE_CUSTOMER],
          contentType: ContentType.REFERENCE,
          difficulty: DifficultyLevel.BEGINNER,
          estimatedTime: 15,
          tags: ['sla', 'service', 'commitments'],
          lastUpdated: '2024-12-26'
        }
      }
    ]
  },

  // Data Layer (Developer focused)
  {
    id: 'data-layer',
    title: 'Data Layer',
    description: 'Database and data management',
    stakeholders: [UserPersona.SENIOR_DEVELOPER],
    priority: 4,
    // icon: 'Database',
    items: [
      {
        id: 'data-postgres-drizzle',
        title: 'Postgres/Drizzle',
        href: '/docs/data-layer/postgres-drizzle',
        description: 'Database schema and ORM configuration',
        stakeholders: [UserPersona.SENIOR_DEVELOPER],
        contentType: ContentType.REFERENCE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 30,
        tags: ['postgres', 'drizzle', 'orm'],
        metadata: {
          stakeholders: [UserPersona.SENIOR_DEVELOPER],
          contentType: ContentType.REFERENCE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 30,
          tags: ['postgres', 'drizzle', 'orm'],
          lastUpdated: '2024-12-26'
        }
      },
      {
        id: 'data-embeddings',
        title: 'Vector Embeddings',
        href: '/docs/data-layer/embeddings',
        description: 'pgvector and semantic search',
        stakeholders: [UserPersona.SENIOR_DEVELOPER],
        contentType: ContentType.REFERENCE,
        difficulty: DifficultyLevel.ADVANCED,
        estimatedTime: 40,
        tags: ['vector', 'embeddings', 'pgvector'],
        metadata: {
          stakeholders: [UserPersona.SENIOR_DEVELOPER],
          contentType: ContentType.REFERENCE,
          difficulty: DifficultyLevel.ADVANCED,
          estimatedTime: 40,
          tags: ['vector', 'embeddings', 'pgvector'],
          lastUpdated: '2024-12-26'
        }
      },
      {
        id: 'data-caching',
        title: 'Caching',
        href: '/docs/data-layer/caching',
        description: 'Redis caching strategies',
        stakeholders: [UserPersona.SENIOR_DEVELOPER],
        contentType: ContentType.REFERENCE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 25,
        tags: ['caching', 'redis', 'performance'],
        metadata: {
          stakeholders: [UserPersona.SENIOR_DEVELOPER],
          contentType: ContentType.REFERENCE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 25,
          tags: ['caching', 'redis', 'performance'],
          lastUpdated: '2024-12-26'
        }
      }
    ]
  },

  // Resources (Universal)
  {
    id: 'resources',
    title: 'Resources',
    description: 'Additional resources and references',
    stakeholders: Object.values(UserPersona),
    priority: 5,
    // icon: 'FileText',
    items: [
      {
        id: 'resources-examples',
        title: 'Examples',
        href: '/docs/resources/examples',
        description: 'Code examples and tutorials',
        stakeholders: [UserPersona.SENIOR_DEVELOPER, UserPersona.ENTERPRISE_CUSTOMER],
        contentType: ContentType.EXAMPLE,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 45,
        tags: ['examples', 'code', 'tutorials'],
        metadata: {
          stakeholders: [UserPersona.SENIOR_DEVELOPER, UserPersona.ENTERPRISE_CUSTOMER],
          contentType: ContentType.EXAMPLE,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 45,
          tags: ['examples', 'code', 'tutorials'],
          lastUpdated: '2024-12-26'
        }
      },
      {
        id: 'resources-api-reference',
        title: 'API Reference',
        href: '/docs/resources/api-reference',
        description: 'Complete API documentation',
        stakeholders: [UserPersona.SENIOR_DEVELOPER, UserPersona.ENTERPRISE_CUSTOMER],
        contentType: ContentType.API,
        difficulty: DifficultyLevel.INTERMEDIATE,
        estimatedTime: 60,
        tags: ['api', 'reference', 'documentation'],
        metadata: {
          stakeholders: [UserPersona.SENIOR_DEVELOPER, UserPersona.ENTERPRISE_CUSTOMER],
          contentType: ContentType.API,
          difficulty: DifficultyLevel.INTERMEDIATE,
          estimatedTime: 60,
          tags: ['api', 'reference', 'documentation'],
          lastUpdated: '2024-12-26'
        }
      },
      {
        id: 'resources-changelog',
        title: 'Changelog',
        href: '/docs/resources/changelog',
        description: 'Version history and updates',
        stakeholders: Object.values(UserPersona),
        contentType: ContentType.REFERENCE,
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 10,
        tags: ['changelog', 'version', 'updates'],
        metadata: {
          stakeholders: Object.values(UserPersona),
          contentType: ContentType.REFERENCE,
          difficulty: DifficultyLevel.BEGINNER,
          estimatedTime: 10,
          tags: ['changelog', 'version', 'updates'],
          lastUpdated: '2024-12-26'
        }
      },
      {
        id: 'resources-support',
        title: 'Support',
        href: '/docs/resources/support',
        description: 'Get help and contribute',
        stakeholders: Object.values(UserPersona),
        contentType: ContentType.GUIDE,
        difficulty: DifficultyLevel.BEGINNER,
        estimatedTime: 5,
        tags: ['support', 'help', 'contribution'],
        metadata: {
          stakeholders: Object.values(UserPersona),
          contentType: ContentType.GUIDE,
          difficulty: DifficultyLevel.BEGINNER,
          estimatedTime: 5,
          tags: ['support', 'help', 'contribution'],
          lastUpdated: '2024-12-26'
        }
      }
    ]
  }
]

// Helper functions for navigation filtering and management
export function getNavigationByPersona(persona: UserPersona): NavigationSection[] {
  return enhancedNavigationConfig
    .filter(section => section.stakeholders.includes(persona))
    .sort((a, b) => a.priority - b.priority)
    .map(section => ({
      ...section,
      items: section.items.filter(item => item.stakeholders.includes(persona))
    }))
    .filter(section => section.items.length > 0)
}

export function getNavigationByHref(href: string): EnhancedNavigationItem | undefined {
  for (const section of enhancedNavigationConfig) {
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

export function getRelatedNavigation(currentHref: string, persona: UserPersona): EnhancedNavigationItem[] {
  const currentSection = enhancedNavigationConfig.find(section =>
    section.stakeholders.includes(persona) &&
    section.items.some(item => item.href === currentHref)
  )
  
  if (!currentSection) return []
  
  const currentIndex = currentSection.items.findIndex(item => item.href === currentHref)
  if (currentIndex === -1) return []
  
  const related: EnhancedNavigationItem[] = []
  
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
  persona?: UserPersona, 
  filters?: {
    contentType?: ContentType[]
    difficulty?: DifficultyLevel[]
    estimatedTime?: [number, number]
  }
): EnhancedNavigationItem[] {
  const searchTerm = query.toLowerCase()
  
  let results = enhancedNavigationConfig.flatMap(section => section.items)
  
  // Filter by persona if specified
  if (persona) {
    results = results.filter(item => item.stakeholders.includes(persona))
  }
  
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

export function getStakeholderColor(stakeholder: UserPersona): string {
  return personaConfigs[stakeholder].color
}

export function getStakeholderName(stakeholder: UserPersona): string {
  return personaConfigs[stakeholder].name
}