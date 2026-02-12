'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  ChevronRight,
  ChevronDown,
  Clock,
  Star,
  ExternalLink,
  LayoutGrid,
  Monitor,
  Server,
  Sparkles,
  TrendingUp,
  Code,
  ShieldCheck,
  BookOpen,
  HelpCircle,
  ArrowRight
} from 'lucide-react'
import { 
  NavigationSection, 
  NavigationItem,
  comprehensiveNavigationConfig,
  BadgeType,
  DifficultyLevel
} from '@/config/comprehensive-navigation'
import { cn } from '@/lib/utils'

interface ComprehensiveSidebarProps {
  className?: string
  collapsible?: boolean
  showTimeEstimates?: boolean
  showBadges?: boolean
  compact?: boolean
}

interface CollapsibleSectionState {
  [sectionId: string]: boolean
}

// Icon mapping for sections
const sectionIcons = {
  'platform-overview': LayoutGrid,
  'frontend-documentation': Monitor,
  'backend-api': Server,
  'ai-services': Sparkles,
  'business-strategy': TrendingUp,
  'developer-resources': Code,
  'security-compliance': ShieldCheck,
  'support-resources': BookOpen
}

export function ComprehensiveSidebar({
  className,
  collapsible = true,
  showTimeEstimates = true,
  showBadges = true,
  compact = false
}: ComprehensiveSidebarProps) {
  const pathname = usePathname()
  const [collapsedSections, setCollapsedSections] = useState<CollapsibleSectionState>({})
  const [isLoading, setIsLoading] = useState(false)

  // Initialize collapsed state
  useEffect(() => {
    const initialCollapsedState: CollapsibleSectionState = {}
    comprehensiveNavigationConfig.forEach(section => {
      initialCollapsedState[section.id] = !section.defaultOpen
    })
    setCollapsedSections(initialCollapsedState)
  }, [])

  // Check if current path matches navigation item
  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  // Toggle section collapse state
  const toggleSection = (sectionId: string) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }))
  }

  // Get badge styling
  const getBadgeStyle = (badge?: string) => {
    switch (badge) {
      case 'beta':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'stable':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'deprecated':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'new':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      default:
        return ''
    }
  }

  // Get difficulty indicator
  const getDifficultyIndicator = (difficulty: string) => {
    const colors = {
      beginner: 'bg-green-500',
      intermediate: 'bg-yellow-500',
      advanced: 'bg-orange-500',
      expert: 'bg-red-500'
    }
    return colors[difficulty as keyof typeof colors] || colors.beginner
  }

  // Get section icon
  const getSectionIcon = (sectionId: string) => {
    const IconComponent = sectionIcons[sectionId as keyof typeof sectionIcons]
    return IconComponent || LayoutGrid
  }

  return (
    <nav className={cn('p-4 space-y-1', className)} role="navigation" aria-label="Documentation navigation">
      {/* Navigation sections */}
      {comprehensiveNavigationConfig.map((section) => {
        const isCollapsed = collapsedSections[section.id]
        const SectionIcon = getSectionIcon(section.id)
        
        return (
          <div key={section.id} className="pt-2">
            {/* Section header */}
            {collapsible ? (
              <button
                onClick={() => toggleSection(section.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggleSection(section.id)
                  }
                }}
                className="w-full flex items-center justify-between rounded-lg px-2 py-1.5 text-left hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-slate-950"
                aria-label={isCollapsed ? `Expand ${section.title}` : `Collapse ${section.title}`}
                aria-expanded={!isCollapsed}
                aria-controls={`section-${section.id}`}
              >
                <h5 
                  id={`section-header-${section.id}`}
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100"
                >
                  <SectionIcon className="h-3.5 w-3.5 text-slate-500" />
                  {section.title}
                </h5>
                <span className={`text-slate-400 transition-transform ${isCollapsed ? '' : 'rotate-90'}`}>
                  <ChevronRight className="h-3 w-3" />
                </span>
              </button>
            ) : (
              <div className="flex items-center gap-2 px-2 py-1.5">
                <h5 
                  id={`section-header-${section.id}`}
                  className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100"
                >
                  <SectionIcon className="h-3.5 w-3.5 text-slate-500" />
                  {section.title}
                </h5>
              </div>
            )}

            {/* Section items */}
            {!isCollapsed && (
              <ul 
                id={`section-${section.id}`}
                className={cn(
                  'mt-1 space-y-0.5 px-2',
                  compact && 'space-y-0.5'
                )}
                role="region"
                aria-labelledby={`section-header-${section.id}`}
              >
                {section.items.map((item) => {
                  const active = isActive(item.href)
                  
                  return (
                    <li key={item.id} className="relative group">
                      <Link
                        href={item.href}
                        className={cn(
                          'block rounded-md text-xs font-medium transition-all duration-200',
                          active
                            ? 'bg-primary-50 dark:bg-primary-900/10 text-primary-600 dark:text-primary-400 border-l-2 border-primary-600 -ml-[1px] px-8 py-1.5'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 px-8 py-1.5'
                        )}
                        aria-current={active ? 'page' : undefined}
                      >
                        <div className="flex items-center gap-2">
                          <span className="truncate">{item.title}</span>
                          
                          {/* Badges */}
                          {showBadges && item.badge && (
                            <span className={cn(
                              'inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium',
                              getBadgeStyle(item.badge)
                            )}>
                              {item.badge}
                            </span>
                          )}
                          
                          {/* Difficulty indicator */}
                          <div className={cn(
                            'h-1.5 w-1.5 rounded-full flex-shrink-0',
                            getDifficultyIndicator(item.difficulty)
                          )} />
                        </div>
                        
                        {/* Description */}
                        {item.description && !compact && (
                          <p className="text-xs text-slate-500 dark:text-slate-500 mt-1 line-clamp-2">
                            {item.description}
                          </p>
                        )}
                        
                        {/* Metadata */}
                        {!compact && (
                          <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                            {showTimeEstimates && item.estimatedTime && (
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{item.estimatedTime}m</span>
                              </div>
                            )}
                            
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3" />
                              <span className="capitalize">{item.difficulty}</span>
                            </div>
                            
                            {item.external && (
                              <ExternalLink className="h-3 w-3" />
                            )}
                          </div>
                        )}
                      </Link>
                      
                      {/* Tooltip for compact mode */}
                      {compact && (
                        <div className="absolute left-full top-0 ml-2 w-64 p-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-sm rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                          <div className="font-medium">{item.title}</div>
                          {item.description && (
                            <div className="text-slate-300 dark:text-slate-600 mt-1">
                              {item.description}
                            </div>
                          )}
                          <div className="flex items-center gap-3 mt-2 text-xs text-slate-400 dark:text-slate-500">
                            {showTimeEstimates && item.estimatedTime && (
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{item.estimatedTime}m read</span>
                              </div>
                            )}
                            <div className="capitalize">{item.difficulty}</div>
                          </div>
                          {/* Tooltip arrow */}
                          <div className="absolute right-full top-4 w-0 h-0 border-l-4 border-l-slate-900 dark:border-l-slate-100 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
                        </div>
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
            
            {/* Section description */}
            {section.description && !compact && !isCollapsed && (
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-2 px-2">
                {section.description}
              </p>
            )}
          </div>
        )
      })}

      {/* Quick actions footer */}
      <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
        <div className="space-y-3">
          {/* Help section */}
          <div className="rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="h-4 w-4 text-slate-500" />
              <p className="text-xs font-medium text-slate-900 dark:text-slate-100">Need Help?</p>
            </div>
            <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
              Join our community for support and updates.
            </p>
            <Link 
              href="/docs/support/help"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
            >
              Get Support 
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Contact Sales */}
          <Link
            href="/contact"
            className="w-full text-left p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <div className="text-xs font-medium text-slate-900 dark:text-slate-100">
              Contact Sales
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Enterprise solutions and custom pricing
            </div>
          </Link>
        </div>
      </div>
    </nav>
  )
}

// Hook for managing sidebar state
export function useComprehensiveSidebar() {
  const [collapsedSections, setCollapsedSections] = useState<CollapsibleSectionState>({})
  
  // Load collapsed sections from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('careerforge-docs-collapsed-sections')
    if (saved) {
      try {
        setCollapsedSections(JSON.parse(saved))
      } catch (error) {
        console.warn('Failed to parse saved collapsed sections:', error)
      }
    }
  }, [])
  
  // Save collapsed sections to localStorage
  const toggleSection = (sectionId: string) => {
    const newState = {
      ...collapsedSections,
      [sectionId]: !collapsedSections[sectionId]
    }
    setCollapsedSections(newState)
    localStorage.setItem('careerforge-docs-collapsed-sections', JSON.stringify(newState))
  }
  
  return {
    collapsedSections,
    toggleSection
  }
}