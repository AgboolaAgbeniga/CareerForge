'use client'

import { useState, useEffect } from 'react'
import { Header } from './Header'
import { ComprehensiveSidebar } from './ComprehensiveSidebar'
import { PageTOC } from './PageTOC'
import { BreadcrumbNavigation } from './BreadcrumbNavigation'
import SkipLink from './SkipLink'
import { ErrorBoundary } from './ErrorBoundary'
import { SectionLoading, ContentLoader } from './LoadingStates'
import { cn } from '@/lib/utils'

interface AppShellProps {
  children: React.ReactNode
  className?: string
}

export function AppShell({ children, className }: AppShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <SkipLink />
      
      <div className="flex h-screen pt-14 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-50">
      {/* Sidebar Overlay (Mobile) */}
      <div 
        className={`fixed inset-0 z-30 bg-slate-900/20 backdrop-blur-sm lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Sidebar Navigation */}
      <aside 
        className={cn(
          'fixed bottom-0 left-0 top-14 z-40 w-72 -translate-x-full border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 transition-transform lg:static lg:translate-x-0 overflow-y-auto no-scrollbar',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        role="navigation"
        aria-label="Documentation navigation"
      >
        <ComprehensiveSidebar 
          collapsible={true}
          showTimeEstimates={true}
          showBadges={true}
          compact={false}
        />
      </aside>

      {/* Content Area */}
      <main id="main-content" className="flex-1 overflow-y-auto bg-white dark:bg-slate-950 relative" role="main" aria-label="Documentation content">
        {/* Background grid pattern */}
        <div className="bg-grid absolute inset-0 h-[500px] pointer-events-none opacity-60"></div>
        
        <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8 py-10 lg:py-16 grid grid-cols-1 xl:grid-cols-[1fr_250px] gap-12">
          
          {/* Main Documentation Content */}
          <div className="min-w-0 max-w-3xl">
            {/* Breadcrumb Navigation */}
            <ErrorBoundary level="section">
              <BreadcrumbNavigation 
                showHome={true}
              />
            </ErrorBoundary>
            
            <ErrorBoundary level="component">
              <article className={cn('prose prose-slate dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-code:text-primary-600 dark:prose-code:text-primary-400 prose-code:bg-primary-50 dark:prose-code:bg-primary-900/20 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none', className)}>
                <ContentLoader
                  isLoading={false}
                  skeleton={<SectionLoading message="Loading documentation content..." minHeight="400px" />}
                >
                  {children}
                </ContentLoader>
              </article>
            </ErrorBoundary>
          </div>

          {/* Right Sidebar (Table of Contents) */}
          <div className="hidden xl:block">
            <div className="fixed w-[250px]">
              <ErrorBoundary level="section">
                <PageTOC items={[]} />
              </ErrorBoundary>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <ErrorBoundary level="section">
          <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 py-12" role="contentinfo">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-900 dark:text-white">CareerForge</span>
                <span className="text-slate-400 text-sm">© 2023 Inc.</span>
              </div>
              <div className="flex gap-6 text-sm text-slate-500">
                <a href="#" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:rounded" aria-label="Privacy Policy">Privacy</a>
                <a href="#" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:rounded" aria-label="Terms of Service">Terms</a>
                <a href="#" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:rounded" aria-label="Service Status">Status</a>
                <a href="#" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:rounded" aria-label="Security Information">Security</a>
              </div>
              <div className="flex gap-4 text-slate-400">
                <a href="#" className="hover:text-slate-600 dark:hover:text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:rounded" aria-label="Follow CareerForge on Twitter (opens in new tab)" target="_blank" rel="noopener noreferrer">
                  <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="hover:text-slate-600 dark:hover:text-slate-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:rounded" aria-label="Connect with CareerForge on LinkedIn (opens in new tab)" target="_blank" rel="noopener noreferrer">
                  <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </footer>
        </ErrorBoundary>
      </main>

      {/* Header */}
      <Header 
        onMenuToggle={handleMenuToggle} 
        isMenuOpen={isMobileMenuOpen}
      />
      </div>
    </>
  )
}