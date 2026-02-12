import { PageContent } from '@/lib/content-types'

export const navigationSystemContent: PageContent = {
  metadata: {
    title: "Navigation System",
    description: "Comprehensive guide to the platform navigation architecture, responsive navigation patterns, and user flow management",
    version: "1.0.0",
    lastUpdated: "2025-01-15",
    authors: ["CareerForge Team"],
    tags: ["navigation", "frontend", "ux", "responsive"],
    difficulty: "intermediate",
    estimatedTime: 20
  },
  tableOfContents: [
    { id: 'overview', title: 'Navigation Architecture Overview', level: 1 },
    { id: 'main-navigation', title: 'Main Navigation Components', level: 1 },
    { id: 'breadcrumb-navigation', title: 'Breadcrumb Navigation System', level: 1 },
    { id: 'mobile-navigation', title: 'Mobile Navigation Strategy', level: 1 },
    { id: 'search-navigation', title: 'Search-Driven Navigation', level: 1 },
    { id: 'navigation-performance', title: 'Navigation Performance & Accessibility', level: 1 }
  ],
  introduction: {
    id: 'introduction',
    title: 'Navigation System Overview',
    content: 'This comprehensive guide covers CareerForge\'s navigation architecture, including responsive design patterns, user flow management, and accessibility considerations.'
  },

  sections: [
    {
      id: 'overview',
      title: 'Navigation Architecture Overview',
      content: `
The CareerForge platform implements a sophisticated, multi-layered navigation system designed to provide intuitive user experiences across different user roles and device types. Our navigation architecture balances accessibility with feature richness, ensuring users can efficiently access all platform capabilities.

### Navigation Design Principles

**Role-Based Navigation**: The navigation structure adapts based on user authentication status and role (job seeker, recruiter, admin), presenting only relevant options while maintaining consistent patterns.

**Contextual Awareness**: Navigation elements adapt to the current page context, showing relevant breadcrumbs, section navigation, and action shortcuts based on user location within the platform.

**Progressive Disclosure**: Complex navigation structures use progressive disclosure patterns, showing advanced features only when needed while maintaining access to core functionality.
      `
    },

    {
      id: 'main-navigation',
      title: 'Main Navigation Components',
      content: `
The primary navigation consists of several key components that work together to provide comprehensive platform access.

### Header Navigation Bar

The main header contains the primary navigation elements:

**Left Section**: Logo, platform branding, and main navigation links
- Logo: Links to home/dashboard based on authentication status
- Main nav: Platform, Jobs, Companies, Messages, Profile

**Center Section**: Global search functionality with autocomplete
- Job search with location and filter integration
- Company search with industry and size filters
- User search for networking features

**Right Section**: User authentication and account controls
- Authentication buttons (sign in, sign up) for non-authenticated users
- User avatar, notifications, and settings for authenticated users
- Mobile menu toggle for responsive design

### Responsive Navigation Patterns

**Desktop (1200px+)**: Full horizontal navigation bar with all elements visible
**Tablet (768px-1199px)**: Condensed navigation with dropdown menus for secondary items
**Mobile (320px-767px)**: Hamburger menu with slide-out navigation panel

### Sidebar Navigation

For authenticated users, a contextual sidebar provides quick access to role-specific features:

**Job Seeker Sidebar**:
- Dashboard overview
- Job applications status
- Saved jobs
- Profile & resume
- Messages & notifications
- Career resources

**Recruiter Sidebar**:
- Dashboard overview  
- Job postings management
- Candidate pipeline
- Company profile
- Analytics & reports
- Team collaboration
      `
    },

    {
      id: 'breadcrumb-navigation',
      title: 'Breadcrumb Navigation System',
      content: `
Breadcrumb navigation provides users with clear understanding of their current location within the platform hierarchy and offers quick navigation back to previous levels.

### Breadcrumb Structure

Breadcrumbs follow the pattern: Home > Section > Subsection > Current Page

**Example Job Seeker Flow**:
\`\`\`
Home > Jobs > Browse Jobs > Software Engineer > Application
\`\`\`

**Example Recruiter Flow**:
\`\`\`
Home > Company Dashboard > Job Postings > Senior Developer > Candidates
\`\`\`

### Breadcrumb Implementation

The breadcrumb component automatically generates navigation paths based on the current route and user role, providing contextually appropriate navigation options.

\`\`\`tsx
// Breadcrumb Navigation Component
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/outline'

export const BreadcrumbNavigation: React.FC = () => {
  const breadcrumbs = useBreadcrumbs()

  return (
    <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-sm">
      {breadcrumbs.map((crumb, index) => (
        <div key={index} className="flex items-center">
          {index === 0 && <HomeIcon className="h-4 w-4 mr-1" />}
          <Link 
            to={crumb.path}
            className="text-blue-600 hover:text-blue-800 hover:underline"
            aria-current={index === breadcrumbs.length - 1 ? 'page' : undefined}
          >
            {crumb.label}
          </Link>
          {index < breadcrumbs.length - 1 && (
            <ChevronRightIcon className="h-4 w-4 mx-2 text-gray-400" />
          )}
        </div>
      ))}
    </nav>
  )
}
\`\`\`

### Dynamic Breadcrumb Generation

Breadcrumbs are generated dynamically based on:
- Current route and parameters
- User authentication status and role
- Platform feature availability
- Previously visited pages for personalization
      `
    },

    {
      id: 'mobile-navigation',
      title: 'Mobile Navigation Strategy',
      content: `
Mobile navigation requires special consideration for touch interfaces and screen space limitations. Our mobile navigation strategy prioritizes the most frequently used features while maintaining access to all platform capabilities.

### Mobile Navigation Components

**Primary Mobile Menu**:
- Hamburger button in header (top-right corner)
- Slide-out panel with full navigation structure
- Touch-friendly sizing (44px minimum touch targets)
- Swipe gestures for navigation between sections

**Bottom Navigation Bar**:
- Persistent bottom tab bar for core functions
- Job seekers: Home, Search, Messages, Profile, Saved
- Recruiters: Home, Jobs, Candidates, Messages, Profile
- Icon-based navigation with optional labels

**Modal Navigation**:
- Full-screen modals for complex navigation tasks
- Search modals with advanced filtering
- Settings and profile management modals
- Deep navigation through nested menus

### Mobile Navigation Patterns

**Tab-Based Navigation**: Bottom tabs for primary functions
**Stack-Based Navigation**: Drill-down navigation for complex tasks
**Modal Navigation**: Overlay panels for secondary actions
**Gesture Navigation**: Swipe between related sections

\`\`\`tsx
// Mobile Bottom Navigation Component
import {
  HomeIcon,
  SearchIcon,
  ChatIcon,
  UserIcon,
  BookmarkIcon,
  BriefcaseIcon,
  UsersIcon
} from '@heroicons/react/outline'

interface MobileNavProps {
  userRole: 'jobseeker' | 'recruiter' | 'admin'
  currentPath: string
}

const jobSeekerTabs = [
  { icon: HomeIcon, label: 'Home', path: '/dashboard' },
  { icon: SearchIcon, label: 'Search', path: '/jobs' },
  { icon: ChatIcon, label: 'Messages', path: '/messages' },
  { icon: BookmarkIcon, label: 'Saved', path: '/saved' },
  { icon: UserIcon, label: 'Profile', path: '/profile' }
]

const recruiterTabs = [
  { icon: HomeIcon, label: 'Home', path: '/dashboard' },
  { icon: BriefcaseIcon, label: 'Jobs', path: '/jobs' },
  { icon: UsersIcon, label: 'Candidates', path: '/candidates' },
  { icon: ChatIcon, label: 'Messages', path: '/messages' },
  { icon: UserIcon, label: 'Profile', path: '/profile' }
]

export const MobileBottomNavigation: React.FC<MobileNavProps> = ({
  userRole,
  currentPath
}) => {
  const tabs = userRole === 'jobseeker' ? jobSeekerTabs : recruiterTabs

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            className={"flex flex-col items-center py-2 px-3 min-w-0 flex-1 " + (
              currentPath.startsWith(tab.path)
                ? 'text-blue-600'
                : 'text-gray-600 hover:text-gray-800'
            )}
          >
            <tab.icon className="h-6 w-6 mb-1" />
            <span className="text-xs truncate">{tab.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
\`\`\`
      `
    },

    {
      id: 'search-navigation',
      title: 'Search-Driven Navigation',
      content: `
Search functionality serves as a powerful navigation alternative, allowing users to quickly find and access content, jobs, companies, and other users through natural language queries.

### Global Search Architecture

**Search Index**: Comprehensive index including jobs, companies, users, and content
**Autocomplete**: Real-time suggestions as users type
**Search Filters**: Contextual filters based on search type and user permissions
**Search History**: Personal search history with recent and saved searches

### Search Result Navigation

**Result Categories**: Organized results by type (jobs, companies, people, content)
**Quick Actions**: Direct actions from search results (apply, view profile, follow)
**Refined Navigation**: Filter and sort options to narrow results
**Deep Links**: Direct navigation to specific sections within results

\`\`\`tsx
// Global Search Component
import { useSearch } from '@/hooks/useSearch'
import { useDebounce } from '@/hooks/useDebounce'

interface GlobalSearchProps {
  placeholder?: string
  onResultSelect: (result: SearchResult) => void
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({
  placeholder = "Search jobs, companies, or people...",
  onResultSelect
}) => {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const debouncedQuery = useDebounce(query, 300)
  
  const { results, loading } = useSearch(debouncedQuery, {
    includeJobs: true,
    includeCompanies: true,
    includeUsers: true,
    limit: 10
  })

  const handleResultSelect = (result: SearchResult) => {
    onResultSelect(result)
    setIsOpen(false)
    setQuery('')
  }

  return (
    <div className="relative w-full max-w-lg">
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {isOpen && (query.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500">
              <Spinner className="h-5 w-5 animate-spin mx-auto mb-2" />
              Searching...
            </div>
          ) : (
            <SearchResultsList 
              results={results} 
              onSelect={handleResultSelect}
            />
          )}
        </div>
      )}
    </div>
  )
}
\`\`\`

### Search Navigation Patterns

**Quick Actions**: Apply buttons for jobs, follow buttons for companies
**Contextual Navigation**: Jump to specific sections within company or profile pages
**Related Searches**: Suggest related searches based on current query
**Saved Searches**: Allow users to save and subscribe to search alerts
      `
    },

    {
      id: 'navigation-performance',
      title: 'Navigation Performance & Accessibility',
      content: `
Performance optimization and accessibility are crucial for navigation systems, ensuring fast loading times and inclusive access for all users.

### Performance Optimization Strategies

**Lazy Loading**: Navigation components load only when needed
**Code Splitting**: Separate bundles for different navigation sections
**Prefetching**: Preload likely next navigation targets
**Caching**: Cache navigation state and user preferences

### Accessibility Implementation

**Keyboard Navigation**: Full keyboard navigation support with focus management
**Screen Reader Support**: Proper ARIA labels and semantic markup
**High Contrast**: Support for high contrast modes and color blind users
**Voice Navigation**: Integration with voice navigation tools

\`\`\`tsx
// Accessible Navigation Component
export const AccessibleNavigation: React.FC = () => {
  const [focusIndex, setFocusIndex] = useState(0)
  const navigationItems = [
    { label: 'Home', path: '/', icon: HomeIcon },
    { label: 'Jobs', path: '/jobs', icon: BriefcaseIcon },
    { label: 'Companies', path: '/companies', icon: BuildingOfficeIcon },
    { label: 'Messages', path: '/messages', icon: ChatIcon },
    { label: 'Profile', path: '/profile', icon: UserIcon }
  ]

  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowRight':
        setFocusIndex((prev) => (prev + 1) % navigationItems.length)
        event.preventDefault()
        break
      case 'ArrowLeft':
        setFocusIndex((prev) => (prev - 1 + navigationItems.length) % navigationItems.length)
        event.preventDefault()
        break
      case 'Enter':
      case ' ':
        // Navigate to focused item
        navigate(navigationItems[focusIndex].path)
        event.preventDefault()
        break
    }
  }

  return (
    <nav 
      role="navigation"
      aria-label="Main navigation"
      onKeyDown={handleKeyDown}
      className="flex space-x-8"
    >
      {navigationItems.map((item, index) => (
        <a
          key={item.path}
          href={item.path}
          className={"flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors " + (
            index === focusIndex
              ? 'bg-blue-100 text-blue-700'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          )}
          aria-current={isActiveRoute(item.path) ? 'page' : undefined}
          tabIndex={index === focusIndex ? 0 : -1}
        >
          <item.icon className="h-5 w-5" aria-hidden="true" />
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  )
}
\`\`\`

### Navigation Analytics

**Usage Tracking**: Monitor navigation patterns and popular paths
**Performance Metrics**: Track navigation load times and user interactions
**User Journey Analysis**: Understand how users navigate through the platform
**Accessibility Metrics**: Monitor accessibility feature usage and effectiveness
      `
    }
  ],

  examples: [
    {
      id: 'navigation-hook',
      title: 'Navigation State Management Hook',
      language: 'tsx',
      code: `// Custom hook for navigation state management
import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

interface NavigationState {
  currentPath: string
  breadcrumbs: BreadcrumbItem[]
  canGoBack: boolean
  canGoForward: boolean
  previousPath: string | null
}

interface BreadcrumbItem {
  label: string
  path: string
  isActive: boolean
}

export const useNavigation = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [navigationHistory, setNavigationHistory] = useState<string[]>([])

  const generateBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
    const pathSegments = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [{ label: 'Home', path: '/', isActive: pathname === '/' }]
    
    let currentPath = ''
    pathSegments.forEach((segment, index) => {
      currentPath += "/" + segment
      const isLast = index === pathSegments.length - 1
      breadcrumbs.push({
        label: formatSegmentLabel(segment),
        path: currentPath,
        isActive: isLast
      })
    })
    
    return breadcrumbs
  }

  const formatSegmentLabel = (segment: string): string => {
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  const goBack = () => {
    if (navigationHistory.length > 1) {
      const previousPath = navigationHistory[navigationHistory.length - 2]
      navigate(previousPath)
    }
  }

  const goForward = () => {
    // Implementation depends on browser history management
    window.history.forward()
  }

  useEffect(() => {
    setNavigationHistory(prev => {
      const newHistory = [...prev, location.pathname]
      // Keep only last 10 navigation entries
      return newHistory.slice(-10)
    })
  }, [location.pathname])

  const navigationState: NavigationState = {
    currentPath: location.pathname,
    breadcrumbs: generateBreadcrumbs(location.pathname),
    canGoBack: navigationHistory.length > 1,
    canGoForward: window.history.length > 0,
    previousPath: navigationHistory.length > 1 ? navigationHistory[navigationHistory.length - 2] : null
  }

  return {
    ...navigationState,
    goBack,
    goForward,
    navigate
  }
}`
    },

    {
      id: 'responsive-nav',
      title: 'Responsive Navigation Component',
      language: 'tsx',
      code: `// Responsive Navigation with Mobile Optimization
import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Bars3Icon, 
  XMarkIcon, 
  ChevronDownIcon 
} from '@heroicons/react/24/outline'

interface NavigationItem {
  label: string
  path: string
  icon?: React.ComponentType<any>
  submenu?: NavigationItem[]
  requiresAuth?: boolean
}

const navigationItems: NavigationItem[] = [
  {
    label: 'Platform',
    path: '/platform',
    submenu: [
      { label: 'Getting Started', path: '/platform/getting-started' },
      { label: 'Architecture', path: '/platform/architecture' },
      { label: 'Features', path: '/platform/features' }
    ]
  },
  {
    label: 'Jobs',
    path: '/jobs',
    requiresAuth: true
  },
  {
    label: 'Companies',
    path: '/companies'
  },
  {
    label: 'Messages',
    path: '/messages',
    requiresAuth: true
  }
]

export const ResponsiveNavigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const location = useLocation()
  const [isAuthenticated] = useState(true) // Replace with actual auth state

  const filteredNavigationItems = navigationItems.filter(item => 
    !item.requiresAuth || isAuthenticated
  )

  const isActivePath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {filteredNavigationItems.map((item) => (
              <div key={item.path} className="relative group">
                <Link
                  to={item.path}
                  className={"flex items-center px-3 py-2 text-sm font-medium transition-colors " + (
                    isActivePath(item.path)
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-700 hover:text-blue-600 hover:border-b-2 hover:border-blue-300'
                  )}
                >
                  {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                  {item.label}
                  {item.submenu && <ChevronDownIcon className="h-4 w-4 ml-1" />}
                </Link>

                {/* Desktop Submenu */}
                {item.submenu && (
                  <div className="absolute top-full left-0 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={"block px-4 py-2 text-sm transition-colors " + (
                          isActivePath(subItem.path)
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                        )}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
            {filteredNavigationItems.map((item) => (
              <div key={item.path}>
                <Link
                  to={item.path}
                  className={"block px-3 py-2 text-base font-medium rounded-md transition-colors " + (
                    isActivePath(item.path)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    {item.icon && <item.icon className="h-5 w-5 mr-3" />}
                    {item.label}
                  </div>
                </Link>

                {/* Mobile Submenu */}
                {item.submenu && (
                  <div className="ml-4 mt-2 space-y-1">
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.path}
                        to={subItem.path}
                        className={"block px-3 py-2 text-sm font-medium rounded-md transition-colors " + (
                          isActivePath(subItem.path)
                            ? 'text-blue-600 bg-blue-50'
                            : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                        )}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}`
    }
  ],
  nextSteps: {
    title: "Continue Learning",
    links: [
      {
        text: "Application Structure",
        href: "/docs/frontend/application-structure",
        description: "Learn about the overall frontend architecture"
      },
      {
        text: "Component Library",
        href: "/docs/frontend/component-library",
        description: "Explore reusable UI components"
      }
    ]
  },
  relatedResources: [
    {
      text: "Responsive Design Guide",
      href: "/docs/frontend/responsive-design",
      description: "Mobile-first design principles"
    },
    {
      text: "User Experience Patterns",
      href: "/docs/frontend/ux-patterns",
      description: "Common UX patterns and best practices"
    }
  ]
}