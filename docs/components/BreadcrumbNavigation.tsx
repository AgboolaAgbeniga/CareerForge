// BreadcrumbNavigation.tsx - Enhanced breadcrumb navigation component
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'
import { 
  getNavigationByHref,
  NavigationItem
} from '@/config/comprehensive-navigation'
import { cn } from '@/lib/utils'

interface BreadcrumbItem {
  id: string
  title: string
  href: string
  isActive?: boolean
}

interface BreadcrumbNavigationProps {
  showHome?: boolean
  className?: string
  variant?: 'default' | 'minimal' | 'compact'
}

export function BreadcrumbNavigation({
  showHome = true,
  className,
  variant = 'default'
}: BreadcrumbNavigationProps) {
  const pathname = usePathname()
  const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>([])
  const [currentItem, setCurrentItem] = useState<NavigationItem | null>(null)

  // Generate breadcrumb items based on current path
  useEffect(() => {
    if (!pathname) return

    // Find current navigation item
    const currentNavItem = getNavigationByHref(pathname)
    setCurrentItem(currentNavItem || null)

    if (!currentNavItem) {
      // If no exact match, try to find parent items
      const segments = pathname.split('/').filter(Boolean)
      const breadcrumbItems: BreadcrumbItem[] = []

      // Add home if requested
      if (showHome) {
        breadcrumbItems.push({
          id: 'home',
          title: 'Documentation',
          href: '/docs'
        })
      }

      // Build breadcrumb from path segments
      let currentPath = ''
      segments.forEach((segment, index) => {
        currentPath += `/${segment}`
        const segmentTitle = segment
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')

        breadcrumbItems.push({
          id: `segment-${index}`,
          title: segmentTitle,
          href: currentPath,
          isActive: index === segments.length - 1
        })
      })

      setBreadcrumbItems(breadcrumbItems)
      return
    }

    // Build breadcrumb from current navigation item
    const items: BreadcrumbItem[] = []

    // Add home
    if (showHome) {
      items.push({
        id: 'home',
        title: 'Documentation',
        href: '/docs'
      })
    }

    // Add current item
    items.push({
      id: currentNavItem.id,
      title: currentNavItem.title,
      href: currentNavItem.href,
      isActive: true
    })

    setBreadcrumbItems(items)
  }, [pathname, showHome])

  if (breadcrumbItems.length === 0) {
    return null
  }

  // Minimal variant - just current page title
  if (variant === 'minimal') {
    return (
      <nav className={cn('py-2', className)} aria-label="Breadcrumb">
        <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
          {breadcrumbItems.slice(-1)[0]?.title && (
            <span className="font-medium text-slate-900 dark:text-slate-100">
              {breadcrumbItems.slice(-1)[0].title}
            </span>
          )}
        </div>
      </nav>
    )
  }

  // Compact variant - reduced spacing
  if (variant === 'compact') {
    return (
      <nav className={cn('py-1', className)} aria-label="Breadcrumb">
        <ol className="flex items-center space-x-1 text-xs">
          {breadcrumbItems.map((item, index) => (
            <li key={item.id} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="h-3 w-3 text-slate-400 mx-1" />
              )}
              {item.isActive ? (
                <span className="font-medium text-slate-900 dark:text-slate-100 truncate max-w-32">
                  {item.title}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors truncate max-w-32"
                >
                  {item.title}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    )
  }

  // Default variant - full breadcrumb with icons and styling
  return (
    <nav className={cn('py-4', className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbItems.map((item, index) => (
          <li key={item.id} className="flex items-center">
            {/* Separator */}
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-slate-400 mx-2" />
            )}

            {/* Breadcrumb item */}
            <div className="flex items-center">
              {/* Icon */}
              {index === 0 && showHome && (
                <Home className="h-4 w-4 text-slate-400 mr-2" />
              )}

              {/* Link or current page */}
              {item.isActive ? (
                <span className="font-medium text-slate-900 dark:text-slate-100">
                  {item.title}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                >
                  {item.title}
                </Link>
              )}
            </div>
          </li>
        ))}
      </ol>

      {/* Additional context information */}
      {currentItem && (
        <div className="mt-3 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
          {/* Estimated read time */}
          {currentItem.estimatedTime && (
            <div className="flex items-center gap-1">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{currentItem.estimatedTime} min read</span>
            </div>
          )}

          {/* Last updated */}
          <div className="flex items-center gap-1">
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Updated {currentItem.metadata.lastUpdated}</span>
          </div>
        </div>
      )}
    </nav>
  )
}

// Accessibility helper component for screen readers
export function BreadcrumbAnnouncer({ 
  currentPath
}: { 
  currentPath: string
}) {
  const [announcement, setAnnouncement] = useState('')
  
  useEffect(() => {
    const segments = currentPath.split('/').filter(Boolean)
    const pathDescription = segments.map(segment => 
      segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    ).join(', ')
    
    setAnnouncement(`Navigated to ${pathDescription} documentation`)
  }, [currentPath])
  
  return (
    <div 
      className="sr-only" 
      aria-live="polite" 
      aria-atomic="true"
    >
      {announcement}
    </div>
  )
}