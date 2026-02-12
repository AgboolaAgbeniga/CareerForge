import { PageContent } from '@/lib/content-types';

export const jobSeekerDashboardContent: PageContent = {
  metadata: {
    title: "Job Seeker Dashboard",
    description: "Complete guide to the job seeker dashboard implementation, features, and architecture",
    version: "1.0.0",
    lastUpdated: "2025-12-27",
    authors: ["CareerForge Team"],
    tags: ["frontend", "dashboard", "job-seeker", "react", "nextjs"],
    difficulty: "intermediate" as const,
    estimatedTime: 18
  },
  tableOfContents: [
    { id: "overview", title: "Overview", level: 2 },
    { id: "architecture", title: "Architecture", level: 2 },
    { id: "components", title: "Components", level: 2 },
    { id: "dependencies", title: "Dependencies", level: 2 },
    { id: "routing", title: "Routing & Navigation", level: 2 },
    { id: "api-integration", title: "API Integration", level: 2 },
    { id: "styling", title: "Styling & Theming", level: 2 },
    { id: "performance", title: "Performance", level: 2 },
    { id: "testing", title: "Testing", level: 2 },
    { id: "deployment", title: "Deployment", level: 2 },
    { id: "troubleshooting", title: "Troubleshooting", level: 2 }
  ],
  introduction: {
    id: "introduction",
    title: "Job Seeker Dashboard",
    content: `
The job seeker dashboard is a comprehensive interface that provides users with an overview of their job search journey, application status, and AI-powered recommendations. Built with Next.js 14 App Router and modern React patterns, it offers real-time updates, responsive design, and seamless user experience.

## Key Features

- **Real-time Application Tracking**: Monitor application status with live updates
- **AI-Powered Job Matches**: Personalized job recommendations based on profile and preferences
- **Profile Completion Tracking**: Visual indicators for profile optimization
- **Activity Feed**: Recent activities, messages, and updates
- **KPI Metrics**: Key performance indicators for job search progress
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Dark/Light Theme**: System preference detection with manual toggle
- **Role-based Access**: Protected routes with authentication guards

## Technology Stack

The dashboard leverages modern web technologies including Next.js 14 with App Router, React 18, TypeScript for type safety, Tailwind CSS for styling, Framer Motion for animations, and a custom authentication system with automatic token refresh.

## User Experience

The dashboard provides a comprehensive view of the user's job search progress with intuitive navigation, real-time updates, and actionable insights. Users can quickly access their applications, view AI-generated job matches, track profile completion, and stay updated with recent activities.
    `
  },
  sections: [
    {
      id: "overview",
      title: "Overview",
      content: `
The job seeker dashboard serves as the central hub for users to monitor their job search progress, view AI-powered recommendations, and manage their applications. It integrates multiple data sources to provide a unified view of the user's job search journey.

### Dashboard Sections

1. **KPI Cards**: Key metrics display with animated counters
2. **Applications Tracker**: Real-time application status monitoring
3. **Job Matches**: AI-powered personalized job recommendations
4. **Activity Feed**: Recent activities and notifications
5. **Profile Completion**: Visual progress indicators
6. **Quick Actions**: Fast access to common tasks

### User Journey

Users land on the dashboard after successful authentication and are automatically routed based on their role (job_seeker vs recruiter). The dashboard loads essential data asynchronously and provides progressive enhancement for better user experience.
      `
    },
    {
      id: "architecture",
      title: "Architecture",
      content: `
The dashboard follows Next.js 14 App Router architecture with nested layouts, automatic code splitting, and optimized performance. The component hierarchy is designed for reusability and maintainability.

### File Structure

\`\`\`
app/job-seeker/
├── layout.tsx           # Job seeker layout with auth protection
├── loading.tsx          # Loading UI during data fetching
├── error.tsx           # Error boundary for this section
└── dashboard/
    ├── page.tsx        # Main dashboard page
    └── components/     # Dashboard-specific components

components/job-seeker/
├── ApplicationsTracker.tsx
├── ResumeHealthCard.tsx
├── ProfileCompletionCard.tsx
├── SkillGapAnalysis.tsx
├── CareerPathVisualization.tsx
├── AICareerCoach.tsx
└── JobMatches.tsx

components/dashboard/
├── KPICards.tsx
├── ActivityFeed.tsx
└── NotificationsPanel.tsx
\`\`\`

### Component Hierarchy

- **Layout Components**: Header, navigation, and shared UI
- **Page Components**: Route-specific content and data handling
- **Feature Components**: Business logic and data visualization
- **UI Components**: Reusable design system elements
- **Context Providers**: Global state and theme management

### Authentication Flow

The dashboard is protected by multiple layers of authentication:

1. **Route Protection**: Middleware checks authentication status
2. **Role Validation**: Ensures correct user role access
3. **Token Refresh**: Automatic token renewal for extended sessions
4. **Session Management**: Context-based user state management
      `
    },
    {
      id: "dependencies",
      title: "Dependencies",
      content: `
The dashboard uses a carefully selected set of dependencies optimized for performance, developer experience, and maintainability. All dependencies are listed in the frontend package.json with specific version ranges for stability.

### Runtime Dependencies

#### Core Framework
- **next**: ^14.0.0 - React framework with App Router
- **react**: ^18.2.0 - React library with hooks and concurrent features
- **typescript**: ^5.0.0 - TypeScript for type safety

#### UI & Styling
- **tailwindcss**: ^3.3.0 - Utility-first CSS framework
- **lucide-react**: ^0.294.0 - Icon library with consistent design
- **framer-motion**: ^12.23.25 - Animation library for smooth interactions

#### State Management
- **react**: Built-in state management with hooks
- **@iconify/react**: ^6.0.2 - Additional icon support

#### API & Networking
- **axios**: ^1.6.2 - HTTP client with interceptors
- **socket.io-client**: ^4.8.3 - Real-time communication

#### Authentication & Security
- **jwt-decode**: ^4.0.0 - JWT token parsing and validation

#### Performance
- **lenis**: ^1.3.15 - Smooth scrolling library
- **critters**: ^0.0.23 - CSS-in-JS optimization

### Development Dependencies

#### Testing
- **@types/jest**: ^29.5.8 - Jest type definitions
- **jest**: ^29.7.0 - Testing framework
- **cypress**: ^13.6.0 - End-to-end testing

#### Code Quality
- **@types/node**: ^20.0.0 - Node.js type definitions
- **@types/react**: ^18.2.0 - React type definitions
- **@types/react-dom**: ^18.2.0 - React DOM type definitions
- **eslint**: ^8.0.0 - Code linting
- **eslint-config-next**: ^14.0.0 - Next.js specific ESLint rules

#### Build Tools
- **autoprefixer**: ^10.4.0 - CSS vendor prefixes
- **postcss**: ^8.4.0 - CSS transformation
      `
    },
    {
      id: "components",
      title: "Components",
      content: `
The dashboard consists of modular components following atomic design principles. Each component is designed for reusability, testability, and maintainability.

### Core Components

#### Resume Health & Profile Completion
Visual indicators of profile strength and resume optimization, helping users improve their job search readiness.

#### Applications Tracker
Shows application status with filtering, sorting, and real-time updates.

#### Activity Feed
Displays recent activities with different types, timestamps, and infinite scroll.

#### Job Matches
AI-powered job recommendations with match scores and quick actions.

### Component Architecture

The component hierarchy follows these patterns:

1. **Container Components**: Handle data fetching and state management
2. **Presentational Components**: Focus on UI rendering and user interactions
3. **Hook Components**: Encapsulate reusable logic and side effects
4. **Context Providers**: Manage global state and dependencies

### Component Features

- **TypeScript Interfaces**: Strict typing for props and state
- **Error Boundaries**: Graceful error handling and recovery
- **Loading States**: Skeleton loaders and progress indicators
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Performance**: React.memo, useMemo, and useCallback optimizations
      `,
      codeExamples: [
        {
          id: "kpi-cards-implementation",
          title: "KPI Cards Implementation",
          description: "Complete KPI cards component with animations and theming",
          language: "tsx",
          code: `import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface KPICardProps {
  title: string;
  value: number;
  change?: number;
  icon: LucideIcon;
  color: 'indigo' | 'teal' | 'purple' | 'orange';
}

export const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  color 
}) => {
  return (
    <motion.div 
      className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {title}
          </p>
          <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            {value.toLocaleString()}
          </p>
          {change && (
            <p className="text-xs text-slate-500">
              {change > 0 ? '+' : ''}{change}% from last week
            </p>
          )}
        </div>
        <div className={cn(
          "w-12 h-12 rounded-lg flex items-center justify-center",
          color === 'indigo' && "bg-indigo-50 text-indigo-600",
          color === 'teal' && "bg-teal-50 text-teal-600"
        )}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  );
};`,
          fileName: "components/dashboard/KPICards.tsx"
        }
      ]
    },
    {
      id: "routing",
      title: "Routing & Navigation",
      content: `
The dashboard uses Next.js 14 App Router with nested layouts, automatic code splitting, and optimized navigation. The routing system supports role-based access, protected routes, and smooth transitions.

### Route Structure

\`\`\`
app/job-seeker/
├── layout.tsx           # Authenticated layout with navigation
├── loading.tsx          # Loading UI
├── error.tsx           # Error boundary
└── dashboard/
    ├── page.tsx        # Main dashboard
    ├── loading.tsx     # Dashboard-specific loading
    └── error.tsx       # Dashboard error boundary
\`\`\`

### Authentication Protection

Routes are protected at multiple levels:

1. **Middleware Protection**: Global authentication checks
2. **Layout Protection**: Role-based layout rendering
3. **Component Protection**: Conditional rendering based on auth state
4. **API Protection**: Backend endpoint authentication

### Navigation System

The header component provides role-specific navigation with adaptive behavior:

- **Public Routes**: Home, features, pricing, about
- **Auth Routes**: Login, signup, password reset
- **Job Seeker Routes**: Dashboard, resume builder, profile, messaging
- **Recruiter Routes**: Dashboard, post job, candidates, shortlists

### Mobile Navigation

Responsive navigation with:
- **Collapsible Sidebar**: Slide-in navigation for mobile
- **Touch Gestures**: Swipe to open/close navigation
- **Keyboard Support**: Full keyboard navigation accessibility
- **Focus Management**: Proper focus trapping and restoration
      `
    },
    {
      id: "api-integration",
      title: "API Integration",
      content: `
The dashboard integrates with multiple backend APIs through a robust client configuration with interceptors, automatic retries, and comprehensive error handling.

### API Client Configuration

#### Axios Setup
Custom axios instance with interceptors and default configuration:

The dashboard uses authentication-aware fetching with automatic token refresh, ensuring seamless user experience even when tokens expire during active use.

### Dashboard API Endpoints

#### Metrics and Overview
- **GET /api/dashboard/job-seeker**: Main dashboard data
- **GET /api/dashboard/metrics**: KPI metrics
- **GET /api/dashboard/activities**: Recent activities

#### Applications
- **GET /api/applications**: User applications
- **GET /api/applications/:id**: Specific application details
- **PATCH /api/applications/:id/status**: Update application status

#### Job Matches
- **GET /api/matches**: AI-powered job recommendations
- **GET /api/matches/:id**: Match details
- **POST /api/matches/:id/feedback**: User feedback on matches

### Error Handling Strategy

#### Network Errors
- Automatic retry with exponential backoff
- Offline detection and cached data display
- User-friendly error messages

#### Authentication Errors
- Automatic token refresh attempts
- Graceful degradation for expired sessions
- Redirect to login on authentication failure

#### API Errors
- Consistent error response format
- Error categorization and handling
- Fallback UI states for error conditions
      `
    },
    {
      id: "styling",
      title: "Styling & Theming",
      content: `
The dashboard uses Tailwind CSS with a custom design system, CSS custom properties for theming, and Framer Motion for animations. The styling approach emphasizes consistency, maintainability, and performance.

### Design System

#### Color Palette
The design system uses a carefully crafted color palette with semantic naming and dark mode support.

#### Typography
- **Primary Font**: Inter for body text and UI elements
- **Heading Font**: Rethink Sans for headings and display text
- **Font Sizes**: Consistent scale from text-xs to text-6xl
- **Line Heights**: Optimized for readability across all sizes

#### Spacing System
- **Base Unit**: 4px (0.25rem)
- **Scale**: 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px
- **Component Spacing**: Consistent margins and padding

### Dark Mode Implementation

Dark mode is implemented using CSS custom properties with system preference detection and manual toggle option.

### Responsive Design

Mobile-first responsive design with these breakpoints:

- **sm**: 640px+ (small tablets)
- **md**: 768px+ (tablets)
- **lg**: 1024px+ (desktops)
- **xl**: 1280px+ (large desktops)
- **2xl**: 1536px+ (extra large screens)

### Animation System

Framer Motion provides smooth animations:

- **Page Transitions**: Fade and slide animations
- **Component Animations**: Enter/exit animations
- **Micro-interactions**: Hover and focus effects
- **Loading States**: Skeleton and progress animations
- **Gesture Support**: Touch and drag interactions
      `
    },
    {
      id: "performance",
      title: "Performance Optimization",
      content: `
The dashboard implements comprehensive performance optimizations at multiple levels to ensure fast loading, smooth interactions, and efficient resource usage.

### Code Splitting

#### Route-based Code Splitting
Next.js automatically splits code by route, loading only the necessary JavaScript for each page.

#### Dynamic Imports
Heavy components are loaded dynamically to reduce initial bundle size.

### Bundle Optimization

#### Tree Shaking
Unused code elimination through:
- ES6 modules and tree shaking
- Dead code elimination in production builds
- Dynamic imports for code splitting

#### Asset Optimization
- **CSS**: PurgeCSS for unused styles
- **JavaScript**: Minification and compression
- **Images**: WebP format with fallbacks
- **Fonts**: Optimized font loading with display: swap

### Caching Strategy

#### HTTP Caching
- **Static Assets**: Long-term caching with content hashes
- **API Responses**: Appropriate cache headers for different data types
- **Service Worker**: Offline caching for core functionality

#### Application Caching
- **Memory Cache**: Component-level state
- **Local Storage**: User preferences and cached data
- **Session Storage**: Temporary data and form drafts

### Performance Monitoring

#### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s target
- **FID (First Input Delay)**: < 100ms target
- **CLS (Cumulative Layout Shift)**: < 0.1 target

#### Custom Metrics
- Dashboard load time
- API response times
- User interaction latency
- Real-time update latency
      `
    },
    {
      id: "testing",
      title: "Testing Strategy",
      content: `
The dashboard employs a comprehensive testing strategy using Jest for unit tests, React Testing Library for component tests, and Cypress for end-to-end testing.

### Testing Framework Setup

#### Jest Configuration
Jest is configured with jsdom environment, custom matchers, and coverage thresholds for comprehensive testing.

### Unit Testing

#### Component Testing
Test individual components in isolation with mocked dependencies:

- **Rendering Tests**: Verify correct component rendering
- **Interaction Tests**: Test user interactions and events
- **State Tests**: Verify state management and updates
- **Props Tests**: Validate prop handling and defaults

#### Hook Testing
Test custom hooks with renderHook utility:

- **State Management**: Test hook state updates
- **Side Effects**: Verify effect cleanup and dependencies
- **API Calls**: Mock network requests and responses
- **Error Handling**: Test error scenarios and recovery

### Integration Testing

#### Page Testing
Test complete pages with React Testing Library:

- **Route Testing**: Verify correct page loading
- **Data Fetching**: Test API integration and loading states
- **User Flows**: Test complete user journeys
- **Error Scenarios**: Test error boundaries and fallbacks

### End-to-End Testing

#### Cypress Configuration
Cypress is configured for E2E testing with:
- **Base URL**: Local development server
- **Viewport**: Desktop and mobile configurations
- **Screenshots**: Automatic failure screenshots
- **Videos**: Test execution recordings

#### Dashboard E2E Tests
- **Dashboard Loading**: Test initial page load and data display
- **Filter Interactions**: Test application filtering and sorting
- **Real-time Updates**: Test WebSocket and polling updates
- **Navigation**: Test route changes and breadcrumbs
- **Responsive Design**: Test mobile and desktop layouts

### Test Coverage

#### Coverage Goals
- **Statements**: 85%+
- **Branches**: 80%+
- **Functions**: 85%+
- **Lines**: 85%+

#### Critical Path Coverage
- Authentication flows
- Core user interactions
- Error handling scenarios
- Data fetching and caching
- Real-time features
      `
    },
    {
      id: "deployment",
      title: "Deployment",
      content: `
The dashboard is deployed using Next.js optimized build process with comprehensive environment configuration, CDN integration, and monitoring setup.

### Build Process

#### Production Build
\`\`\`bash
# Build the application
npm run build

# Start production server
npm start
\`\`\`

#### Build Output
The build process generates:
- **Static Assets**: Optimized CSS, JavaScript, and images
- **Server Components**: Pre-rendered HTML for better SEO
- **Bundle Analysis**: Size analysis for optimization
- **Source Maps**: For debugging production issues

### Environment Configuration

#### Environment Variables
\`\`\`env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.careerforge.com
NEXT_PUBLIC_SOCKET_URL=https://ws.careerforge.com

# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://app.careerforge.com

# Analytics & Monitoring
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_WEBSOCKETS=true
\`\`\`

### Deployment Platforms

#### Vercel Deployment
Recommended for Next.js applications with automatic deployments and edge functions.

#### Docker Deployment
Alternative deployment option with containerization for infrastructure control.

### CDN Configuration

#### Static Asset Optimization
- **Image CDN**: Next.js Image Optimization with automatic WebP conversion
- **Asset Compression**: Gzip/Brotli compression for all static assets
- **Cache Headers**: Long-term caching for versioned assets
- **HTTP/2 Push**: Critical resource preloading

### Security Headers

#### Content Security Policy
Implement comprehensive security headers including:
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options
- Referrer Policy

### Monitoring & Observability

#### Error Tracking
- **Sentry Integration**: Real-time error monitoring and performance tracking
- **Error Boundaries**: React error boundaries for graceful degradation
- **Logging**: Structured logging with correlation IDs

#### Performance Monitoring
- **Core Web Vitals**: Automatic monitoring of LCP, FID, CLS
- **Custom Metrics**: Business-specific performance indicators
- **Real User Monitoring**: Actual user experience tracking
      `
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      content: `
This section provides solutions to common issues encountered when developing or maintaining the job seeker dashboard.

### Common Issues

#### Dashboard Not Loading
**Symptoms**: Blank page, loading spinner, or error messages
**Causes**: 
- API endpoint unavailable
- Network connectivity issues
- Authentication token expired
- JavaScript errors preventing render

**Solutions**:
- Check API connectivity and environment variables
- Verify browser console for JavaScript errors
- Clear browser storage and re-authenticate
- Check network requests in DevTools

#### Authentication Redirect Loops
**Symptoms**: Infinite redirects between login and dashboard
**Causes**:
- Token validation failing
- Middleware configuration issues
- CORS problems
- Session storage corruption

**Solutions**:
- Clear browser storage (localStorage and sessionStorage)
- Verify middleware configuration
- Check token refresh logic in authContext
- Debug authentication flow with console logs

#### Real-time Updates Not Working
**Symptoms**: Stale data, no live updates
**Causes**:
- WebSocket connection issues
- Polling intervals too long
- Server-side update notifications failing
- Network connectivity problems

**Solutions**:
- Check WebSocket connection status
- Verify polling is working with console logs
- Ensure server is sending update notifications
- Check network policies and firewall settings

#### Performance Issues
**Symptoms**: Slow loading, poor user experience
**Causes**:
- Large bundle sizes
- Unnecessary re-renders
- Inefficient API calls
- Missing optimizations

**Solutions**:
- Analyze bundle size with @next/bundle-analyzer
- Use React DevTools Profiler for performance analysis
- Monitor network requests in DevTools
- Enable performance monitoring

### Debugging Tools

#### Browser DevTools
- **Network Tab**: Monitor API requests and responses
- **Console**: Check for JavaScript errors and warnings
- **Performance Tab**: Profile rendering performance
- **Application Tab**: Inspect storage and cookies

#### React DevTools
- **Component Inspector**: Examine component hierarchy
- **Profiler**: Identify performance bottlenecks
- **Hooks Inspector**: Debug custom hooks
- **State Inspector**: Monitor state changes

### Error Recovery

#### Graceful Degradation
Implement fallback behaviors for failure scenarios:

- Show cached data when API is unavailable
- Provide retry mechanisms for failed requests
- Display user-friendly error messages
- Implement offline functionality where possible

#### Support Channels
When reporting issues, include:
- Browser and version information
- Steps to reproduce the problem
- Expected vs actual behavior
- Error messages and console logs
- Screenshots or recordings
- Environment details (local, staging, production)
      `,
      calloutBoxes: [
        {
          type: "warning",
          title: "Common Pitfall",
          content: "Always check the browser console for JavaScript errors when debugging dashboard issues. Many problems are caused by unhandled exceptions or network failures."
        },
        {
          type: "info",
          title: "Performance Tip",
          content: "Use React DevTools Profiler to identify unnecessary re-renders. Components that re-render too frequently can significantly impact dashboard performance."
        }
      ]
    }
  ],
  bestPractices: [
    "Always implement proper TypeScript interfaces for component props and state",
    "Use React.memo for components that receive stable props to prevent unnecessary re-renders",
    "Implement comprehensive error boundaries at the page and component level",
    "Use semantic HTML and proper ARIA attributes for accessibility",
    "Optimize bundle size with code splitting and dynamic imports",
    "Implement proper loading states and skeleton UIs for better UX",
    "Use proper caching strategies for API responses and static assets",
    "Implement proper authentication flows with automatic token refresh",
    "Use proper error handling and logging throughout the application",
    "Write comprehensive tests including unit, integration, and E2E tests",
    "Monitor Core Web Vitals and optimize for performance",
    "Implement proper security headers and input validation",
    "Use proper SEO practices with meta tags and structured data",
    "Implement proper accessibility features for inclusive design"
  ],
  troubleshooting: [
    {
      title: "Common Dashboard Issues",
      problems: [
        {
          issue: "Dashboard shows loading spinner indefinitely",
          solution: "Check API connectivity, verify environment variables, and examine browser console for errors. Ensure authentication token is valid.",
          severity: "high"
        },
        {
          issue: "Real-time updates not working",
          solution: "Verify WebSocket connection, check polling intervals, and ensure server is sending update notifications.",
          severity: "medium"
        },
        {
          issue: "Performance degradation over time",
          solution: "Check for memory leaks, implement proper cleanup in useEffect, and optimize re-renders with React.memo.",
          severity: "medium"
        },
        {
          issue: "Authentication redirect loops",
          solution: "Clear browser storage, verify middleware configuration, and check token refresh logic.",
          severity: "high"
        }
      ]
    }
  ]
};