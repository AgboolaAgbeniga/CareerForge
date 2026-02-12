export interface NavigationItem {
  title: string
  href: string
  description?: string
  badge?: 'beta' | 'stable' | 'deprecated'
  external?: boolean
}

export interface NavigationSection {
  title: string
  items: NavigationItem[]
  collapsible?: boolean
  defaultOpen?: boolean
}

export const navigationConfig: NavigationSection[] = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Quickstart",
        href: "/docs/quickstart",
        description: "Get up and running in minutes",
        badge: 'stable'
      },
      {
        title: "Philosophy",
        href: "/docs/philosophy",
        description: "Our design principles and approach"
      }
    ]
  },
  {
    title: "About",
    items: [
      {
        title: "Vision & Mission",
        href: "/docs/about/vision-mission",
        description: "Our purpose, vision, and core values"
      },
      {
        title: "Value Proposition",
        href: "/docs/about/value-proposition",
        description: "How we deliver value to job seekers, recruiters, and enterprises"
      },
      {
        title: "Market Opportunity",
        href: "/docs/about/market-opportunity",
        description: "TAM/SAM/SOM analysis and market positioning"
      }
    ]
  },
  {
    title: "Business",
    items: [
      {
        title: "Business Model",
        href: "/docs/business/model",
        description: "Revenue streams, pricing strategy, and unit economics"
      },
      {
        title: "Market Analysis",
        href: "/docs/business/market-analysis",
        description: "Market size, competitive analysis, and target segments"
      },
      {
        title: "Financials",
        href: "/docs/business/financials",
        description: "Unit economics, financial projections, and funding"
      },
      {
        title: "Go-to-Market",
        href: "/docs/business/go-to-market",
        description: "Channels, partnerships, marketing, and sales strategy"
      },
      {
        title: "Customer Acquisition",
        href: "/docs/business/customer-acquisition",
        description: "Acquisition funnel, conversion optimization, and retention"
      }
    ]
  },
  {
    title: "Architecture",
    items: [
      {
        title: "System Overview",
        href: "/docs/architecture",
        description: "High-level system architecture"
      },
      {
        title: "Service Boundaries",
        href: "/docs/architecture/service-boundaries",
        description: "Microservices boundaries and responsibilities"
      },
      {
        title: "Data Flows",
        href: "/docs/architecture/data-flows",
        description: "Data flow patterns and relationships"
      },
      {
        title: "Security Posture",
        href: "/docs/architecture/security-posture",
        description: "Security architecture and best practices"
      }
    ]
  },
  {
    title: "Executive",
    items: [
      {
        title: "Executive Summary",
        href: "/docs/executive/executive-summary",
        description: "Overview of CareerForge for investors and executives"
      },
      {
        title: "Business Value",
        href: "/docs/executive/business-value",
        description: "ROI analysis and business value proposition"
      },
      {
        title: "Market Intelligence",
        href: "/docs/executive/market-intelligence",
        description: "Market analysis and competitive intelligence"
      },
      {
        title: "Competitive Analysis",
        href: "/docs/executive/competitive-analysis",
        description: "Competitive landscape and positioning"
      },
      {
        title: "Revenue Projections",
        href: "/docs/executive/revenue-projections",
        description: "Financial projections and revenue models"
      },
      {
        title: "Growth Projections",
        href: "/docs/executive/growth-projections",
        description: "Growth forecasts and market expansion"
      },
      {
        title: "Growth Strategy",
        href: "/docs/executive/growth-strategy",
        description: "Strategic growth initiatives and roadmap"
      },
      {
        title: "Investment Highlights",
        href: "/docs/executive/investment-highlights",
        description: "Key investment opportunities and highlights"
      },
      {
        title: "Technical Advantages",
        href: "/docs/executive/technical-advantages",
        description: "Technical differentiators and competitive advantages"
      },
      {
        title: "Scalability Roadmap",
        href: "/docs/executive/scalability-roadmap",
        description: "Scalability strategy and infrastructure roadmap"
      },
      {
        title: "Dashboard",
        href: "/docs/executive/dashboard",
        description: "Executive dashboard with key metrics"
      }
    ]
  },
  {
    title: "Core APIs",
    items: [
      {
        title: "Matching Engine",
        href: "/docs/api/matching-engine",
        description: "Job-candidate matching algorithms",
        badge: 'beta'
      },
      {
        title: "Resume Parser",
        href: "/docs/api/resume-parser",
        description: "Resume extraction and processing"
      },
      {
        title: "Career Coach",
        href: "/docs/api/career-coach",
        description: "Personalized career guidance",
        badge: 'beta'
      },
      {
        title: "Analytics",
        href: "/docs/api/analytics",
        description: "Performance and business metrics"
      }
    ]
  },
  {
    title: "Data Layer",
    items: [
      {
        title: "Postgres/Drizzle",
        href: "/docs/data-layer/postgres-drizzle",
        description: "Database schema and ORM configuration"
      },
      {
        title: "Vector Embeddings",
        href: "/docs/data-layer/embeddings",
        description: "pgvector and semantic search"
      },
      {
        title: "Caching",
        href: "/docs/data-layer/caching",
        description: "Redis caching strategies"
      }
    ]
  },
  {
    title: "Deployment",
    items: [
      {
        title: "Environments",
        href: "/docs/deployment/environments",
        description: "Development, staging, and production"
      },
      {
        title: "CI/CD",
        href: "/docs/deployment/ci-cd",
        description: "Continuous integration and deployment"
      },
      {
        title: "Secrets",
        href: "/docs/deployment/secrets",
        description: "Environment variables and secret management"
      }
    ]
  },
  {
    title: "Resources",
    items: [
      {
        title: "Examples",
        href: "/docs/resources/examples",
        description: "Code examples and tutorials"
      },
      {
        title: "API Reference",
        href: "/docs/resources/api-reference",
        description: "Complete API documentation"
      },
      {
        title: "Changelog",
        href: "/docs/resources/changelog",
        description: "Version history and updates"
      },
      {
        title: "Support",
        href: "/docs/resources/support",
        description: "Get help and contribute"
      }
    ]
  }
]

export function getNavigationByHref(href: string): NavigationItem | undefined {
  for (const section of navigationConfig) {
    for (const item of section.items) {
      if (item.href === href) {
        return item
      }
    }
  }
  return undefined
}

export function getRelatedNavigation(currentHref: string): NavigationItem[] {
  const currentSection = navigationConfig.find(section =>
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