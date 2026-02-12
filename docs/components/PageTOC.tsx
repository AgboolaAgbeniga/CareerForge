import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/utils'
import { cn } from '@/lib/utils'

interface TOCItem {
  id: string
  title: string
  level: number
  children?: TOCItem[]
}

interface PageTOCProps {
  items: TOCItem[]
}

export function PageTOC({ items }: PageTOCProps) {
  const [activeId, setActiveId] = useState<string>('')
  const pathname = usePathname()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleHeadings = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        
        if (visibleHeadings.length > 0) {
          setActiveId(visibleHeadings[0].target.id)
        }
      },
      {
        rootMargin: '-24px 0px -70% 0px',
        threshold: 0,
      }
    )

    // Observe all headings
    const headings = items.flatMap((item) => [
      document.getElementById(item.id),
      ...(item.children?.map((child) => document.getElementById(child.id)) ?? []),
    ]).filter(Boolean)

    headings.forEach((heading) => {
      if (heading) {
        observer.observe(heading)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [items, pathname])

  const renderItem = (item: TOCItem, isActive = false) => {
    const isNested = item.level > 2
    
    return (
      <li key={item.id} className="relative">
        <a
          href={`#${item.id}`}
          className={cn(
            'block py-1.5 text-sm transition-colors border-l border-transparent',
            isNested ? 'pl-8' : 'pl-4',
            isActive
              ? 'text-primary-600 dark:text-primary-400 border-l-primary-500 bg-primary-50/50 dark:bg-primary-900/20'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'
          )}
        >
          {item.title}
        </a>
        {item.children && (
          <ul className="mt-1 space-y-1">
            {item.children.map((child) => renderItem(child, child.id === activeId))}
          </ul>
        )}
      </li>
    )
  }

  if (!items || items.length === 0) {
    return null
  }

  return (
    <div className="w-64 flex-shrink-0 hidden xl:block">
      <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto">
        <div className="px-4 pb-8">
          <h4 className="mb-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            On this page
          </h4>
          <nav className="space-y-0.5">
            <ul className="space-y-0.5">
              {items.map((item) => renderItem(item, item.id === activeId))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}