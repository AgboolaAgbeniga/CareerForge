'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Compass, 
  Layers, 
  Terminal, 
  Puzzle, 
  ArrowRight,
  FileText,
  Cpu,
  Shield,
  Database,
  GitMerge,
  BarChart2,
  Users
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface NavItem {
  title: string
  href: string
  icon?: React.ComponentType<{ className?: string }>
  active?: boolean
}

interface Section {
  title: string
  icon: React.ComponentType<{ className?: string }>
  items: NavItem[]
}

const navigationData: Section[] = [
  {
    title: 'Getting Started',
    icon: Compass,
    items: [
      { title: 'Documentation Home', href: '/docs', icon: FileText, active: true },
      { title: 'Quick Start', href: '/docs/quickstart', icon: BarChart2 },
      { title: 'Philosophy', href: '/docs/philosophy', icon: Users },
    ]
  },
  {
    title: 'Architecture',
    icon: Layers,
    items: [
      { title: 'System Design', href: '/docs/architecture', icon: Layers },
      { title: 'AI Matching Engine', href: '/docs/architecture/ai-engine', icon: Cpu },
      { title: 'Security & Compliance', href: '/docs/architecture/security', icon: Shield },
    ]
  },
  {
    title: 'API Reference',
    icon: Terminal,
    items: [
      { title: 'Authentication', href: '/docs/api/auth', icon: Shield },
      { title: 'Candidates', href: '/docs/api/candidates', icon: Users },
      { title: 'Jobs', href: '/docs/api/jobs', icon: FileText },
      { title: 'Webhooks', href: '/docs/api/webhooks', icon: GitMerge },
    ]
  },
  {
    title: 'Integrations',
    icon: Puzzle,
    items: [
      { title: 'ATS Connectors', href: '/docs/integrations/ats', icon: Database },
      { title: 'Slack App', href: '/docs/integrations/slack', icon: Puzzle },
    ]
  }
]

export function SidebarNav() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <nav className="p-4 lg:p-6 space-y-8">
      {navigationData.map((section) => {
        const Icon = section.icon
        return (
          <div key={section.title}>
            <h5 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-slate-100">
              <Icon className="h-3.5 w-3.5 text-primary-500" />
              {section.title}
            </h5>
            <ul className="space-y-1 border-l border-slate-100 dark:border-slate-800 ml-1.5 pl-3">
              {section.items.map((item) => {
                const ItemIcon = item.icon
                const active = isActive(item.href)
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'block py-1 text-sm transition-colors',
                        active
                          ? 'font-medium text-primary-600 dark:text-primary-400 border-l-2 border-primary-600 -ml-[14px] pl-3'
                          : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
                      )}
                    >
                      {item.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        )
      })}

      {/* Banner for feedback */}
      <div className="mt-8 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4">
        <p className="mb-2 text-xs font-medium text-slate-900 dark:text-slate-100">Need help?</p>
        <p className="mb-3 text-xs text-slate-500">Join our Slack community for real-time support.</p>
        <a 
          href="#" 
          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
        >
          Join Community 
          <ArrowRight className="h-3 w-3" />
        </a>
      </div>
    </nav>
  )
}