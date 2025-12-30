'use client'

import Link from 'next/link'
import { ArrowRight, Database, Cpu, BarChart2, Zap, Users, GitMerge, TrendingUp, Building2 } from 'lucide-react'
import { AppShell } from '@/components/AppShell'
import { useState, useEffect } from 'react'
import { usePerformanceMonitoring } from '@/hooks/usePerformanceMonitoring'

export default function EnhancedHomePage() {
  const [isVisible, setIsVisible] = useState(false)
  
  // Initialize performance monitoring
  usePerformanceMonitoring({
    enableConsoleLogging: process.env.NODE_ENV === 'development',
    enableAnalytics: process.env.NODE_ENV === 'production'
  })
  
  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <AppShell>
      {/* Enhanced Homepage Content with Semantic HTML5 Structure */}
      <main id="main-content" role="main" aria-label="CareerForge Homepage" className="min-h-screen">
        <article aria-labelledby="page-title" className="max-w-none">
          
          {/* Hero Section - Enhanced with Semantic Structure */}
          <section 
            id="hero" 
            aria-labelledby="hero-title" 
            tabIndex={-1}
            className="mb-16 relative scroll-mt-24"
          >
            <header className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 text-blue-600 dark:text-blue-400 text-xs font-medium mb-6 animate-fade-in-up">
                <span className="flex h-2 w-2 rounded-full bg-blue-500" aria-hidden="true"></span>
                <span>CareerForge Enterprise API 2.0 is live</span>
              </div>
              
              <h1 
                id="page-title" 
                className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-slate-900 dark:text-white mb-6"
              >
                Forging the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-cyan-400">Future of Work</span>
              </h1>
              
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-3xl">
                CareerForge is the intelligent infrastructure layer for modern hiring. Our platform unifies talent data, leverages causal AI for matching, and automates the recruitment lifecycle with enterprise-grade security.
              </p>
              
              <div className="flex flex-wrap gap-4" role="group" aria-label="Primary actions">
                <Link
                  href="/docs/platform/overview"
                  className="inline-flex items-center justify-center rounded-lg bg-primary-600  px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-primary-500/25 hover:bg-primary-500 hover:shadow-primary-500/40 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                  aria-describedby="primary-cta-description"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Link>
                <span id="primary-cta-description" className="sr-only">
                  Get Started - Navigate to platform overview
                </span>
                
                <Link
                  href="/docs/architecture"
                  className="inline-flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                  aria-describedby="secondary-cta-description"
                >
                  View Architecture
                </Link>
                <span id="secondary-cta-description" className="sr-only">
                  View Architecture - Navigate to architecture documentation
                </span>
              </div>
            </header>
          </section>

          {/* Enhanced Architecture Diagram - Semantic Structure */}
          <section 
            id="architecture" 
            aria-labelledby="architecture-title" 
            tabIndex={-1}
            className="mb-16 p-1 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-100 dark:from-slate-800 dark:to-slate-900 scroll-mt-24"
          >
            <div className="rounded-xl bg-white dark:bg-slate-950 p-6 sm:p-10 border border-slate-100 dark:border-slate-800 relative overflow-hidden">
              {/* Background accent */}
              <div className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64 rounded-full bg-primary-500/10 blur-3xl" aria-hidden="true"></div>
              
              <header className="text-center mb-8">
                <h2 id="architecture-title" className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
                  Data Flow Architecture
                </h2>
                <p className="sr-only">
                  Interactive diagram showing the flow of data from raw sources through the CareerForge engine to predictive insights
                </p>
              </header>
              
              {/* Diagram Nodes - Enhanced Accessibility */}
              <div className="flex flex-col md:flex-row justify-center items-center gap-8 relative z-10" role="list" aria-label="Architecture flow components">
                {/* Node 1 */}
                <div className="flex flex-col items-center group" role="listitem">
                  <div className="h-16 w-16 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center group-hover:border-primary-500 transition-colors" role="img" aria-label="Raw Data Sources component">
                    <Database className="h-6 w-6 text-slate-500 group-hover:text-primary-500 transition-colors" aria-hidden="true" />
                  </div>
                  <span className="mt-3 text-xs font-medium text-slate-500">Raw Data Sources</span>
                </div>
                
                {/* Arrow */}
                <div className="hidden md:flex h-px w-16 bg-gradient-to-r from-slate-200 via-primary-500 to-slate-200 dark:from-slate-800 dark:via-primary-500 dark:to-slate-800 relative" aria-hidden="true">
                  <div className="absolute -top-1 left-1/2 h-2 w-2 rounded-full bg-primary-500 animate-ping"></div>
                </div>
                <div className="md:hidden h-8 w-px bg-slate-200 dark:bg-slate-800" aria-hidden="true"></div>

                {/* Node 2 (Center) */}
                <div className="flex flex-col items-center relative" role="listitem">
                  <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-primary-400 to-cyan-400 opacity-20 blur-sm" aria-hidden="true"></div>
                  <div className="relative h-20 w-20 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-lg" role="img" aria-label="CareerForge Engine - central processing unit">
                    <Cpu className="h-8 w-8 animate-pulse" aria-hidden="true" />
                  </div>
                  <span className="mt-3 text-xs font-bold text-slate-900 dark:text-white">CareerForge Engine</span>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex h-px w-16 bg-gradient-to-r from-slate-200 via-cyan-400 to-slate-200 dark:from-slate-800 dark:via-cyan-400 dark:to-slate-800" aria-hidden="true"></div>
                <div className="md:hidden h-8 w-px bg-slate-200 dark:bg-slate-800" aria-hidden="true"></div>

                {/* Node 3 */}
                <div className="flex flex-col items-center group" role="listitem">
                  <div className="h-16 w-16 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center group-hover:border-cyan-400 transition-colors" role="img" aria-label="Predictive Insights component">
                    <BarChart2 className="h-6 w-6 text-slate-500 group-hover:text-cyan-400 transition-colors" aria-hidden="true" />
                  </div>
                  <span className="mt-3 text-xs font-medium text-slate-500">Predictive Insights</span>
                </div>
              </div>
            </div>
          </section>

          {/* Introduction Text - Enhanced Semantic Structure */}
          <section 
            id="introduction" 
            aria-labelledby="intro-title" 
            tabIndex={-1}
            className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-code:text-primary-600 dark:prose-code:text-primary-400 prose-code:bg-primary-50 dark:prose-code:bg-primary-900/20 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none scroll-mt-24"
          >
            <header className="mb-6">
              <h2 id="intro-title" className="text-2xl mb-4 font-semibold text-slate-900 dark:text-white">
                Why CareerForge?
              </h2>
            </header>
            
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Traditional hiring stacks are fragmented. CareerForge unifies the experience by providing a single API surface for sourcing, screening, and scheduling. Designed for scale, we handle millions of events per second with <span className="font-medium text-slate-900 dark:text-slate-200">99.99% uptime</span>.
            </p>
            
            {/* Enhanced Callout Component */}
            <div className="my-8 rounded-lg border-l-4 border-cyan-500 bg-cyan-50/50 dark:bg-cyan-900/10 p-4" role="complementary" aria-label="Performance highlight">
              <div className="flex items-start gap-3">
                <Zap className="mt-0.5 h-4.5 w-4.5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" aria-hidden="true" />
                <div>
                  <h3 className="text-sm font-semibold text-cyan-900 dark:text-cyan-200">Performance First</h3>
                  <p className="mt-1 text-sm text-cyan-800 dark:text-cyan-300/80">
                    Our matching algorithm runs on the edge, delivering candidate recommendations in under 50ms.
                  </p>
                </div>
              </div>
            </div>

            {/* Core Capabilities - Enhanced with Better Structure */}
            <header className="mt-12 mb-6">
              <h2 id="capabilities-title" className="text-2xl mb-4 font-semibold text-slate-900 dark:text-white">
                Core Capabilities
              </h2>
            </header>
            
            <div className="grid sm:grid-cols-2 gap-4 not-prose mb-12" role="list" aria-label="Core platform capabilities">
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-primary-500/50 transition-colors" role="listitem">
                <div className="h-8 w-8 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center mb-3" role="img" aria-label="Unified Profiles icon">
                  <Users className="h-4 w-4" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Unified Profiles</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Normalize data from LinkedIn, GitHub, and PDF resumes into a structured JSON schema.
                </p>
              </div>
              
              <div className="p-4 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-cyan-500/50 transition-colors" role="listitem">
                <div className="h-8 w-8 rounded bg-cyan-100 dark:bg-cyan-900/30 text-cyan-600 flex items-center justify-center mb-3" role="img" aria-label="Workflow Automation icon">
                  <GitMerge className="h-4 w-4" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Workflow Automation</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Trigger webhooks on status changes, email opens, or interview completions.
                </p>
              </div>
            </div>
          </section>

          {/* Enhanced Platform Overview Section */}
          <section 
            id="platform-overview" 
            aria-labelledby="platform-title" 
            tabIndex={-1}
            className="mb-16 scroll-mt-24"
          >
            <header className="text-center mb-12">
              <h2 id="platform-title" className="text-3xl font-semibold text-slate-900 dark:text-white mb-4">
                Intelligent Infrastructure for Modern Hiring
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                CareerForge unifies talent acquisition through AI-powered matching, 
                comprehensive data normalization, and enterprise-grade automation.
              </p>
            </header>
            
            <div className="grid md:grid-cols-3 gap-8" role="list" aria-label="Platform capabilities overview">
              <div className="text-center" role="listitem">
                <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-4" role="img" aria-label="Data Unification capability">
                  <Database className="h-6 w-6 text-blue-600" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Data Unification</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Normalize resumes, LinkedIn profiles, and structured data into a unified schema
                </p>
              </div>
              
              <div className="text-center" role="listitem">
                <div className="h-12 w-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center mx-auto mb-4" role="img" aria-label="AI Matching capability">
                  <Cpu className="h-6 w-6 text-cyan-600" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">AI Matching</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Causal AI algorithms for precise job-candidate compatibility scoring
                </p>
              </div>
              
              <div className="text-center" role="listitem">
                <div className="h-12 w-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-4" role="img" aria-label="Workflow Automation capability">
                  <Zap className="h-6 w-6 text-green-600" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Workflow Automation</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Automated screening, scheduling, and status tracking
                </p>
              </div>
            </div>
          </section>

          {/* Performance Metrics Section */}
          <section 
            id="performance" 
            aria-labelledby="performance-title" 
            tabIndex={-1}
            className="mb-16 scroll-mt-24"
          >
            <header className="text-center mb-12">
              <h2 id="performance-title" className="text-3xl font-semibold text-slate-900 dark:text-white mb-4">
                Enterprise-Grade Performance
              </h2>
            </header>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" role="list" aria-label="Performance metrics">
              <div className="text-center p-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800" role="listitem">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">99.99%</div>
                <div className="text-sm font-medium text-slate-900 dark:text-white">Uptime SLA</div>
                <div className="text-xs text-slate-500 mt-1">Guaranteed availability</div>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800" role="listitem">
                <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">&lt;50ms</div>
                <div className="text-sm font-medium text-slate-900 dark:text-white">Response Time</div>
                <div className="text-xs text-slate-500 mt-1">Edge-optimized matching</div>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800" role="listitem">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">1M+</div>
                <div className="text-sm font-medium text-slate-900 dark:text-white">Events/Second</div>
                <div className="text-xs text-slate-500 mt-1">Scalable processing</div>
              </div>
              
              <div className="text-center p-6 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800" role="listitem">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">SOC 2</div>
                <div className="text-sm font-medium text-slate-900 dark:text-white">Compliance</div>
                <div className="text-xs text-slate-500 mt-1">Enterprise security</div>
              </div>
            </div>
          </section>
          
          {/* Enhanced Feedback Section */}
          <section 
            id="feedback" 
            aria-labelledby="feedback-title" 
            className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800"
          >
            <header className="sr-only">
              <h2 id="feedback-title">Page Feedback</h2>
            </header>
            
            <div className="flex items-center justify-between" role="contentinfo" aria-label="Page information and feedback">
              <div className="text-sm text-slate-500">
                Last updated on Dec 27, 2024
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-500 font-medium">Was this page helpful?</span>
                <div className="flex gap-2" role="group" aria-label="Feedback options">
                  <button 
                    className="h-8 w-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                    aria-label="Mark page as helpful"
                    title="Helpful"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 01.964 1.5l-1.764 2.882a2 2 0 00.964 2.882h4.736m-7.464 0L9.88 16.382a2 2 0 01.964 1.5L18.38 19.882a2 2 0 001.964-2.882L14.5 4.118a2 2 0 00-1.964-1.5L9.88 1.118m-7.464 0L1.618 4.118A2 2 0 00-.346 6.618L5.882 10H18.5a2 2 0 001.964-1.5l1.764-2.882A2 2 0 0022.346 6.618L18.5 10.5a2 2 0 00-1.964-1.5L14.772 6.118A2 2 0 0012.808 4.618z" />
                    </svg>
                  </button>
                  <button 
                    className="h-8 w-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900"
                    aria-label="Mark page as not helpful"
                    title="Not helpful"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14H5.236a2 2 0 01-1.964-1.5l2.764-4.5 2.964 4.5m11.5 0L17.5 4.5M10 14v6.5a2 2 0 01-1.964 1.5L6.272 19.5a2 2 0 001.964 2.5L10 17.5m0 0l3 3m-3-3l3 3m-6-6l3 3m-3-3" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 text-right">
              <a 
                href="#" 
                className="text-xs text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 flex items-center justify-end gap-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 rounded"
                aria-label="Edit this page on GitHub (opens in new tab)"
                target="_blank" 
                rel="noopener noreferrer"
              >
                <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 20h9M16.5 3.5a2.121 2.121 0 113.163 3.163L9.5 16.5m-6-6l6 6" />
                </svg>
                Edit this page on GitHub
              </a>
            </div>
          </section>
        </article>
      </main>
    </AppShell>
  )
}