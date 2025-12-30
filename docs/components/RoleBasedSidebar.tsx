// RoleBasedSidebar.tsx - Enhanced sidebar with role-based filtering
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
  ArrowRight,
  HelpCircle
} from 'lucide-react'
import { 
  UserPersona, 
  NavigationSection, 
  EnhancedNavigationItem,
  getNavigationByPersona,
  getStakeholderColor,
  getStakeholderName
} from '@/config/enhanced-navigation'
import { cn } from '@/lib/utils'

interface RoleBasedSidebarProps {
  currentPersona: UserPersona
  className?: string
  collapsible?: boolean
  showTimeEstimates?: boolean
  showBadges?: boolean
  compact?: boolean
}

interface CollapsibleSectionState {
  [sectionId: string]: boolean
}

export function RoleBasedSidebar({
  currentPersona,
  className,
  collapsible = true,
  showTimeEstimates = true,
  showBadges = true,
  compact = false
}: RoleBasedSidebarProps) {
  const pathname = usePathname()
  const [navigationSections, setNavigationSections] = useState<NavigationSection[]>([])
  const [collapsedSections, setCollapsedSections] = useState<CollapsibleSectionState>({})
  const [isLoading, setIsLoading] = useState(true)

  // Load navigation based on current persona
  useEffect(() => {
    setIsLoading(true)
    const sections = getNavigationByPersona(currentPersona)
    setNavigationSections(sections)
    
    // Initialize collapsed state for new sections
    const newCollapsedState: CollapsibleSectionState = {}
    sections.forEach(section => {
      newCollapsedState[section.id] = !section.defaultOpen
    })
    setCollapsedSections(newCollapsedState)
    setIsLoading(false)
  }, [currentPersona])

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

  if (isLoading) {
    return (
      <nav className={cn('p-4 lg:p-6 space-y-8', className)}>
        <div className="animate-pulse">
          <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-3 bg-slate-200 dark:bg-slate-800 rounded"></div>
            ))}
          </div>
        </div>
      </nav>
    )
  }

  return (
    <nav className={cn('p-4 lg:p-6 space-y-8', className)} role="navigation" aria-label="Documentation navigation">
      {/* Stakeholder indicator */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className={cn('h-2 w-2 rounded-full', getStakeholderColor(currentPersona))}></div>
          <span className="text-xs font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            {getStakeholderName(currentPersona)} View
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-500">
          Showing documentation relevant to your role
        </p>
      </div>

      {/* Navigation sections */}
      {navigationSections.map((section) => {
        const isCollapsed = collapsedSections[section.id]
        const SectionIcon = section.icon
        
        return (
          <div key={section.id} className="space-y-2">
            {/* Section header */}
            <div className="flex items-center justify-between">
              <h5 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
                {SectionIcon && <SectionIcon className="h-3.5 w-3.5 text-slate-500" />}
                {section.title}
              </h5>
              {collapsible && (
                <button
                  onClick={() => toggleSection(section.id)}
                  className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  aria-label={isCollapsed ? `Expand ${section.title}` : `Collapse ${section.title}`}
                >
                  {isCollapsed ? (
                    <ChevronRight className="h-3 w-3 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-3 w-3 text-slate-400" />
                  )}
                </button>
              )}
            </div>

            {/* Section items */}
            {!isCollapsed && (
              <ul className={cn(
                'space-y-1 border-l border-slate-100 dark:border-slate-800 ml-1.5 pl-3',
                compact && 'space-y-0.5'
              )}>
                {section.items.map((item) => {
                  const active = isActive(item.href)
                  const ItemIcon = item.icon
                  
                  return (
                    <li key={item.id} className="relative group">
                      <Link
                        href={item.href}
                        className={cn(
                          'block py-2 text-sm transition-all duration-200 rounded-md px-2 -mx-2',
                          active
                            ? 'font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 border-l-2 border-primary-600 -ml-[14px] pl-3'
                            : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        )}
                        aria-current={active ? 'page' : undefined}
                      >
                        <div className="flex items-start gap-2">
                          {ItemIcon && (
                            <ItemIcon className={cn(
                              'h-4 w-4 mt-0.5 flex-shrink-0',
                              active ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400'
                            )} />
                          )}
                          <div className="flex-1 min-w-0">
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
                                'h-1.5 w-1.5 rounded-full flex-shrink-0 mt-2',
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
                          </div>
                        </div>
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
              <p className="text-xs text-slate-500 dark:text-slate-500 mt-2 pl-2">
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
            <a 
              href="#" 
              className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
            >
              Join Community 
              <ArrowRight className="h-3 w-3" />
            </a>
          </div>

          {/* Change stakeholder */}
          <button
            onClick={() => {
              // This would trigger the stakeholder selector modal
              const event = new CustomEvent('openStakeholderSelector')
              window.dispatchEvent(event)
            }}
            className="w-full text-left p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <div className="text-xs font-medium text-slate-900 dark:text-slate-100">
              Switch Documentation View
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Change to a different stakeholder perspective
            </div>
          </button>
        </div>
      </div>
    </nav>
  )
}

// Hook for managing sidebar state
export function useRoleBasedSidebar(initialPersona: UserPersona) {
  const [currentPersona, setCurrentPersona] = useState<UserPersona>(initialPersona)
  const [collapsedSections, setCollapsedSections] = useState<CollapsibleSectionState>({})
  
  // Load collapsed sections from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`careerforge-docs-collapsed-${currentPersona}`)
    if (saved) {
      try {
        setCollapsedSections(JSON.parse(saved))
      } catch (error) {
        console.warn('Failed to parse saved collapsed sections:', error)
      }
    }
  }, [currentPersona])
  
  // Save collapsed sections to localStorage
  const toggleSection = (sectionId: string) => {
    const newState = {
      ...collapsedSections,
      [sectionId]: !collapsedSections[sectionId]
    }
    setCollapsedSections(newState)
    localStorage.setItem(`careerforge-docs-collapsed-${currentPersona}`, JSON.stringify(newState))
  }
  
  return {
    currentPersona,
    setCurrentPersona,
    collapsedSections,
    toggleSection
  }
}