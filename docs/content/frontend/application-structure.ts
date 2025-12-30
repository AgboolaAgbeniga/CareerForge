// Frontend Documentation Content - Application Structure
import { PageContent } from '@/lib/content-types'

export const applicationStructureContent: PageContent = {
  metadata: {
    title: "Application Structure",
    description: "Comprehensive guide to CareerForge's frontend architecture, project organization, routing system, and component architecture",
    version: "2.4.0",
    lastUpdated: "2024-12-27",
    authors: ["CareerForge Frontend Team"],
    tags: ["structure", "routing", "components", "architecture", "frontend"],
    difficulty: "intermediate",
    estimatedTime: 25
  },
  tableOfContents: [
    { id: "project-overview", title: "Project Overview", level: 1 },
    { id: "directory-structure", title: "Directory Structure", level: 1 },
    { id: "routing-system", title: "Routing System", level: 1 },
    { id: "component-architecture", title: "Component Architecture", level: 1 },
    { id: "state-management", title: "State Management", level: 1 },
    { id: "styling-approach", title: "Styling Approach", level: 1 },
    { id: "build-system", title: "Build System & Tooling", level: 1 },
    { id: "development-workflow", title: "Development Workflow", level: 1 }
  ],
  introduction: {
    id: "introduction",
    title: "CareerForge Frontend Architecture",
    content: `CareerForge's frontend is built using modern web technologies designed for scalability, maintainability, and exceptional user experience. Our application structure follows industry best practices while being optimized for our specific use cases in AI-powered job matching and career development.

The frontend is built on Next.js 14 with the App Router, providing server-side rendering, static generation, and optimal performance out of the box.`
  },
  sections: [
    {
      id: "project-overview",
      title: "Project Overview",
      content: `CareerForge's frontend is a sophisticated React application that handles complex user interactions, real-time data updates, and AI-powered features. The application is designed to be:

### Key Characteristics

#### Performance-First
- Server-side rendering (SSR) for fast initial page loads
- Static generation for content that doesn't change frequently
- Client-side rendering for interactive features
- Progressive Web App (PWA) capabilities for mobile experience

#### Scalable Architecture
- Modular component design following atomic design principles
- Efficient state management with Zustand and React Query
- Code splitting and lazy loading for optimal bundle sizes
- Service worker implementation for offline capabilities

#### Developer Experience
- TypeScript throughout for type safety
- Comprehensive testing setup with Jest and React Testing Library
- ESLint and Prettier for code quality and consistency
- Hot module replacement for fast development iterations`,
      calloutBoxes: [
        {
          type: "info",
          title: "Technology Stack",
          content: "Next.js 14, React 18, TypeScript, Tailwind CSS, Zustand, React Query, Framer Motion, and Lucide React icons."
        }
      ]
    },
    {
      id: "directory-structure",
      title: "Directory Structure",
      content: `Our project follows a well-organized directory structure that separates concerns and makes the codebase easy to navigate and maintain.

### Root Directory Structure

\`\`\`
careerforge-frontend/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth route group
│   ├── (dashboard)/              # Dashboard route group  
│   ├── api/                      # API routes
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # Reusable components
│   ├── ui/                       # Base UI components
│   ├── forms/                    # Form components
│   ├── layout/                   # Layout components
│   └── features/                 # Feature-specific components
├── lib/                          # Utilities and configurations
│   ├── utils.ts                  # Utility functions
│   ├── validations.ts            # Zod schemas
│   ├── api.ts                    # API client
│   └── constants.ts              # Application constants
├── hooks/                        # Custom React hooks
├── stores/                       # Zustand stores
├── types/                        # TypeScript type definitions
├── public/                       # Static assets
├── styles/                       # Additional styles
└── tests/                        # Test files
\`\`\`

### App Directory (Next.js 14 App Router)

The \`app/\` directory contains our route-based structure where each folder represents a route segment:

#### Route Groups
- \`(auth)\`: Authentication-related pages
- \`(dashboard)\`: Protected dashboard pages
- \`(marketing)\`: Public marketing pages

#### Dynamic Routes
- \`[id]\`: Dynamic route parameters
- \`[...slug]\`: Catch-all route segments
- \`[[...slug]]\`: Optional catch-all segments

### Components Organization

#### Atomic Design Pattern
We follow atomic design principles for component organization:

- **Atoms**: Basic building blocks (Button, Input, Badge)
- **Molecules**: Combinations of atoms (SearchBox, FormField)
- **Organisms**: Complex UI sections (Header, Sidebar, JobCard)
- **Templates**: Page layouts (DashboardLayout, AuthLayout)
- **Pages**: Complete page components`,
      codeExamples: [
        {
          id: "file-structure-example",
          title: "Directory Structure Example",
          description: "Real example of our component organization",
          language: "bash",
          code: `components/
├── ui/                          # Base UI components
│   ├── button.tsx
│   ├── input.tsx
│   ├── modal.tsx
│   └── index.ts                 # Barrel exports
├── forms/                       # Form components
│   ├── job-search-form.tsx
│   ├── profile-form.tsx
│   └── application-form.tsx
├── layout/                      # Layout components
│   ├── header.tsx
│   ├── sidebar.tsx
│   ├── footer.tsx
│   └── dashboard-layout.tsx
└── features/                    # Feature components
    ├── job-matching/
    │   ├── job-card.tsx
    │   ├── match-score.tsx
    │   └── skill-tags.tsx
    ├── messaging/
    │   ├── chat-window.tsx
    │   ├── message-bubble.tsx
    │   └── contact-list.tsx
    └── profile/
        ├── profile-header.tsx
        ├── skill-assessment.tsx
        └── experience-timeline.tsx`
        }
      ]
    },
    {
      id: "routing-system",
      title: "Routing System",
      content: `CareerForge uses Next.js 14's App Router for routing, providing powerful features for building complex navigation patterns.

### Route Configuration

#### Static Routes
\`\`\`typescript
// app/about/page.tsx → /about
// app/contact/page.tsx → /contact
// app/pricing/page.tsx → /pricing
\`\`\`

#### Dynamic Routes
\`\`\`typescript
// app/jobs/[id]/page.tsx → /jobs/123
// app/users/[userId]/page.tsx → /users/456
// app/companies/[companySlug]/page.tsx → /companies/techcorp
\`\`\`

#### Route Groups
Route groups allow us to organize routes without affecting the URL structure:

\`\`\`typescript
// app/(auth)/login/page.tsx → /login
// app/(auth)/register/page.tsx → /register
// app/(dashboard)/jobs/page.tsx → /jobs
// app/(dashboard)/profile/page.tsx → /profile
\`\`\`

### Navigation Components

#### Primary Navigation
Our main navigation system includes:
- **Header Navigation**: Primary site navigation
- **Breadcrumb Navigation**: Context-aware breadcrumbs
- **Sidebar Navigation**: Section-specific navigation
- **Mobile Navigation**: Collapsible mobile menu

#### Navigation State Management
We use Zustand to manage navigation state:
\`\`\`typescript
interface NavigationStore {
  currentPath: string
  breadcrumbs: BreadcrumbItem[]
  isMobileMenuOpen: boolean
  setCurrentPath: (path: string) => void
  setBreadcrumbs: (breadcrumbs: BreadcrumbItem[]) => void
  toggleMobileMenu: () => void
}
\`\`\``,
      calloutBoxes: [
        {
          type: "success",
          title: "Navigation Performance",
          content: "All navigation components use React.memo and useMemo for optimal performance, preventing unnecessary re-renders."
        }
      ]
    },
    {
      id: "component-architecture",
      title: "Component Architecture",
      content: `Our component architecture follows React best practices with a focus on reusability, maintainability, and performance.

### Component Design Principles

#### 1. Single Responsibility
Each component has one clear purpose and responsibility:
\`\`\`typescript
// ✅ Good: Focused component
function JobCard({ job }: JobCardProps) {
  return (
    <article className="job-card">
      <JobHeader job={job} />
      <JobDetails job={job} />
      <JobActions job={job} />
    </article>
  )
}

// ❌ Avoid: Component doing too much
function JobCardWithSidebarAndNavigation({ job, user, onApply }) {
  // This component should be split into smaller pieces
}
\`\`\`

#### 2. Prop Interface Design
We use TypeScript interfaces for all component props:
\`\`\`typescript
interface JobCardProps {
  job: Job
  variant?: 'default' | 'compact' | 'detailed'
  showActions?: boolean
  onApply?: (jobId: string) => void
  onSave?: (jobId: string) => void
  className?: string
}
\`\`\`

#### 3. Component Composition
We prefer composition over inheritance:
\`\`\`typescript
// ✅ Good: Composition pattern
function JobCard({ job, children, ...props }) {
  return (
    <article {...props}>
      <JobHeader job={job} />
      {children}
      <JobActions job={job} />
    </article>
  )
}

// Usage
<JobCard job={job}>
  <JobDescription job={job} />
  <JobRequirements job={job} />
</JobCard>
\`\`\`

### Custom Hooks Pattern

We extract complex logic into custom hooks:
\`\`\`typescript
// hooks/useJobMatching.ts
export function useJobMatching(userId: string) {
  const [matches, setMatches] = useState<JobMatch[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchMatches = useCallback(async () => {
    setLoading(true)
    try {
      const data = await jobMatchingAPI.getMatches(userId)
      setMatches(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [userId])

  return { matches, loading, error, fetchMatches }
}
\`\`\``,
      codeExamples: [
        {
          id: "component-patterns",
          title: "Component Patterns",
          description: "Common patterns we use in our components",
          language: "typescript",
          code: `// Higher-Order Component pattern
function withLoading<T>(Component: React.ComponentType<T>) {
  return function WithLoadingComponent(props: T & { loading: boolean }) {
    if (props.loading) {
      return <LoadingSpinner />
    }
    return <Component {...props} />
  }
}

// Render Props pattern
function DataFetcher({ children, url }) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(setData)
      .finally(() => setLoading(false))
  }, [url])

  return children({ data, loading })
}

// Usage
<DataFetcher url="/api/jobs">
  {({ data, loading }) => (
    loading ? <LoadingSpinner /> : <JobList jobs={data} />
  )}
</DataFetcher>

// Compound Components pattern
function JobCard({ job, children }) {
  return (
    <div className="job-card">
      {children}
    </div>
  )
}

JobCard.Header = function JobCardHeader({ job }) {
  return <h3>{job.title}</h3>
}

JobCard.Body = function JobCardBody({ children }) {
  return <div className="job-card-body">{children}</div>
}

JobCard.Actions = function JobCardActions({ job }) {
  return (
    <div className="job-card-actions">
      <button>Apply</button>
      <button>Save</button>
    </div>
  )
}`
        }
      ]
    },
    {
      id: "state-management",
      title: "State Management",
      content: `CareerForge uses a hybrid state management approach combining Zustand for global state and React Query for server state.

### Global State Management (Zustand)

We use Zustand for managing application-wide state:

#### User Authentication State
\`\`\`typescript
interface AuthStore {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  refreshToken: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  
  login: async (credentials) => {
    set({ isLoading: true })
    try {
      const user = await authAPI.login(credentials)
      set({ user, isAuthenticated: true })
    } finally {
      set({ isLoading: false })
    }
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false })
    authAPI.logout()
  }
}))
\`\`\`

#### UI State Management
\`\`\`typescript
interface UIStore {
  theme: 'light' | 'dark'
  sidebarOpen: boolean
  mobileMenuOpen: boolean
  notifications: Notification[]
  
  toggleTheme: () => void
  toggleSidebar: () => void
  toggleMobileMenu: () => void
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
}
\`\`\`

### Server State Management (React Query)

React Query handles all server-side state, caching, and synchronization:

#### Query Configuration
\`\`\`typescript
// hooks/useJobs.ts
export function useJobs(filters: JobFilters) {
  return useQuery({
    queryKey: ['jobs', filters],
    queryFn: () => jobAPI.getJobs(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
  })
}

// hooks/useJobMatch.ts
export function useJobMatch(jobId: string, userId: string) {
  return useQuery({
    queryKey: ['job-match', jobId, userId],
    queryFn: () => matchingAPI.getMatchScore(jobId, userId),
    enabled: !!jobId && !!userId,
  })
}
\`\`\`

#### Mutations
\`\`\`typescript
// hooks/useJobApplication.ts
export function useJobApplication() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: applicationAPI.applyToJob,
    onSuccess: (data, variables) => {
      // Invalidate and refetch related queries
      queryClient.invalidateQueries(['applications'])
      queryClient.invalidateQueries(['jobs', variables.jobId])
    },
    onError: (error) => {
      toast.error('Failed to submit application')
    }
  })
}
\`\`\`

### State Architecture Principles

1. **Local State**: Use useState for component-specific state
2. **Derived State**: Use useMemo for computed values
3. **Global State**: Use Zustand for app-wide state
4. **Server State**: Use React Query for API data`,
      calloutBoxes: [
        {
          type: "warning",
          title: "State Management Best Practices",
          content: "Always prefer local state over global state. Only promote state to global when multiple components need access to it."
        }
      ]
    },
    {
      id: "styling-approach",
      title: "Styling Approach",
      content: `CareerForge uses Tailwind CSS as the primary styling solution, supplemented with custom CSS for complex animations and layouts.

### Tailwind CSS Configuration

Our Tailwind configuration is customized for CareerForge's design system:

#### Custom Color Palette
\`\`\`javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        }
      }
    }
  }
}
\`\`\`

#### Component Classes
We create reusable component classes:
\`\`\`css
/* styles/components.css */
@layer components {
  .btn-primary {
    @apply bg-primary-600 text-white px-4 py-2 rounded-lg font-medium
           hover:bg-primary-700 focus:ring-2 focus:ring-primary-500
           transition-colors duration-200;
  }
  
  .btn-secondary {
    @apply bg-gray-200 text-gray-900 px-4 py-2 rounded-lg font-medium
           hover:bg-gray-300 focus:ring-2 focus:ring-gray-500
           transition-colors duration-200;
  }
  
  .job-card {
    @apply bg-white rounded-lg shadow-sm border border-gray-200 p-6
           hover:shadow-md transition-shadow duration-200;
  }
  
  .form-input {
    @apply w-full px-3 py-2 border border-gray-300 rounded-md
           focus:ring-2 focus:ring-primary-500 focus:border-primary-500
           transition-colors duration-200;
  }
}
\`\`\`

### CSS-in-JS for Dynamic Styles

For component-specific styles that need to be dynamic:
\`\`\`typescript
// components/DynamicCard.tsx
import { useState } from 'react'

const cardStyles = {
  default: 'bg-white text-gray-900',
  dark: 'bg-gray-900 text-white',
  gradient: 'bg-gradient-to-r from-primary-500 to-primary-700 text-white'
}

export function DynamicCard({ variant = 'default', children }) {
  return (
    <div className={\`card-base \${cardStyles[variant]}\`}>
      {children}
    </div>
  )
}
\`\`\`

### Responsive Design

We use Tailwind's responsive utilities:
\`\`\`typescript
// Responsive component example
function JobList({ jobs }) {
  return (
    <div className="
      grid 
      grid-cols-1 
      md:grid-cols-2 
      lg:grid-cols-3 
      gap-6
    ">
      {jobs.map(job => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  )
}
\`\`\``,
      codeExamples: [
        {
          id: "responsive-example",
          title: "Responsive Design Example",
          description: "How we handle responsive layouts",
          language: "typescript",
          code: `// Responsive navigation component
function Navigation() {
  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block">
        <ul className="flex space-x-8">
          <li><a href="/jobs">Jobs</a></li>
          <li><a href="/companies">Companies</a></li>
          <li><a href="/career-advice">Career Advice</a></li>
        </ul>
      </nav>
      
      {/* Mobile Navigation */}
      <nav className="md:hidden">
        <button 
          className="mobile-menu-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          Menu
        </button>
        
        {isOpen && (
          <div className="mobile-menu">
            <ul className="flex flex-col space-y-4">
              <li><a href="/jobs">Jobs</a></li>
              <li><a href="/companies">Companies</a></li>
              <li><a href="/career-advice">Career Advice</a></li>
            </ul>
          </div>
        )}
      </nav>
    </>
  )
}

// Responsive grid system
function JobGrid({ jobs }) {
  return (
    <div className="
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      lg:grid-cols-3 
      xl:grid-cols-4 
      gap-4 
      sm:gap-6
    ">
      {jobs.map(job => (
        <JobCard 
          key={job.id} 
          job={job}
          className="col-span-1" // Each card takes 1 column
        />
      ))}
    </div>
  )
}`
        }
      ]
    },
    {
      id: "build-system",
      title: "Build System & Tooling",
      content: `CareerForge's build system is optimized for development speed, production performance, and code quality.

### Build Configuration

#### Next.js Configuration
Our Next.js configuration includes:
\`\`\`javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['@prisma/client'],
  },
  images: {
    domains: ['images.unsplash.com', 'avatars.githubusercontent.com'],
    formats: ['image/webp', 'image/avif'],
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  async rewrites() {
    return [
      {
        source: '/api/jobs/:path*',
        destination: 'https://api.careerforge.com/jobs/:path*',
      },
    ]
  },
}

module.exports = nextConfig
\`\`\`

#### TypeScript Configuration
\`\`\`json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/hooks/*": ["./hooks/*"],
      "@/stores/*": ["./stores/*"],
      "@/types/*": ["./types/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
\`\`\`

### Development Tools

#### ESLint Configuration
\`\`\`json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "react-hooks/exhaustive-deps": "warn",
    "prefer-const": "error"
  }
}
\`\`\`

#### Package.json Scripts
\`\`\`json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "type-check": "tsc --noEmit",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  }
}
\`\`\`

### Performance Optimizations

#### Code Splitting
We implement code splitting at multiple levels:
- Route-based splitting (automatic with Next.js)
- Component-based splitting with dynamic imports
- Library-level splitting for large dependencies

#### Bundle Analysis
We use @next/bundle-analyzer to monitor bundle sizes:
\`\`\`javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)
\`\`\``,
      calloutBoxes: [
        {
          type: "info",
          title: "Performance Metrics",
          content: "Our build produces optimized bundles with an average JavaScript bundle size of <250KB gzipped for the initial page load."
        }
      ]
    },
    {
      id: "development-workflow",
      title: "Development Workflow",
      content: `Our development workflow is designed to maintain code quality, ensure consistency, and facilitate collaboration.

### Git Workflow

We follow a feature branch workflow:
1. **main**: Production-ready code
2. **develop**: Integration branch for features
3. **feature/**: Individual feature branches
4. **hotfix/**: Emergency fixes

### Code Review Process

#### Pull Request Guidelines
- All PRs require at least one review
- Automated checks must pass (linting, tests, build)
- Code coverage must not decrease
- Documentation must be updated

#### Review Checklist
- [ ] Code follows style guidelines
- [ ] Tests are included and passing
- [ ] No console.log statements in production code
- [ ] Proper error handling implemented
- [ ] Accessibility considerations addressed
- [ ] Performance impact assessed

### Testing Strategy

#### Unit Testing
We use Jest and React Testing Library:
\`\`\`typescript
// __tests__/components/JobCard.test.tsx
import { render, screen } from '@testing-library/react'
import { JobCard } from '@/components/JobCard'

const mockJob = {
  id: '1',
  title: 'Senior Developer',
  company: 'TechCorp',
  location: 'San Francisco, CA'
}

describe('JobCard', () => {
  it('renders job information correctly', () => {
    render(<JobCard job={mockJob} />)
    
    expect(screen.getByText('Senior Developer')).toBeInTheDocument()
    expect(screen.getByText('TechCorp')).toBeInTheDocument()
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument()
  })
  
  it('calls onApply when apply button is clicked', () => {
    const mockOnApply = jest.fn()
    render(<JobCard job={mockJob} onApply={mockOnApply} />)
    
    screen.getByText('Apply').click()
    expect(mockOnApply).toHaveBeenCalledWith('1')
  })
})
\`\`\`

#### Integration Testing
- API integration tests with MSW (Mock Service Worker)
- User workflow testing with Cypress
- Visual regression testing with Percy

### Development Commands

#### Daily Development
\`\`\`bash
# Start development server
npm run dev

# Run tests in watch mode
npm run test:watch

# Check code quality
npm run lint

# Type checking
npm run type-check
\`\`\`

#### Before Committing
\`\`\`bash
# Format code
npm run format

# Run all checks
npm run pre-commit

# Build project
npm run build
\`\`\`

### Deployment Pipeline

Our deployment includes:
1. **Build**: Compile and optimize code
2. **Test**: Run full test suite
3. **Security Scan**: Check for vulnerabilities
4. **Deploy**: Deploy to staging/production
5. **Smoke Test**: Verify deployment success`,
      calloutBoxes: [
        {
          type: "info",
          title: "Development Best Practices",
          content: "Always write tests, use meaningful commits, keep PRs focused, update documentation, monitor bundle sizes, and follow established patterns."
        }
      ]
    }
  ],
  nextSteps: {
    title: "Continue Learning",
    links: [
      {
        text: "Landing Page Design",
        href: "/docs/frontend/landing-page",
        description: "Learn about our homepage design and user experience"
      },
      {
        text: "Authentication System",
        href: "/docs/frontend/authentication",
        description: "Understand our auth flows and security implementation"
      },
      {
        text: "Component Library",
        href: "/docs/frontend/components",
        description: "Explore our reusable UI components and design system"
      }
    ]
  },
  relatedResources: [
    {
      text: "Platform Architecture",
      href: "/docs/platform/architecture",
      description: "Technical architecture overview"
    },
    {
      text: "Design System",
      href: "/docs/frontend/design-system",
      description: "Complete design system documentation"
    },
    {
      text: "API Integration",
      href: "/docs/developer/integration",
      description: "Frontend-Backend integration patterns"
    }
  ]
}