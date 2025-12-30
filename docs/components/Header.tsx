'use client'

import { useState, useEffect } from 'react'
import { Menu, Github, Sun, Moon, Sparkles } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { ErrorBoundary } from './ErrorBoundary'
import Search from './Search'
import { cn } from '@/lib/utils'

interface HeaderProps {
  onMenuToggle?: () => void
  isMenuOpen?: boolean
}

export function Header({ onMenuToggle, isMenuOpen = false }: HeaderProps) {
  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape to close sidebar
      if (e.key === 'Escape') {
        // Handle escape logic if needed
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is handled by the Search component
  }

  return (
    <>
      <header className="fixed top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md" role="banner">
        <div className="flex h-14 items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <button
              onClick={onMenuToggle}
              className="lg:hidden text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMenuOpen ? (
                <Menu className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            {/* Logo/Brand */}
            <a href="/" className="flex items-center gap-2 group">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary-600 text-white shadow-glow">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <span className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white group-hover:opacity-80 transition-opacity">
                CareerForge
              </span>
              <span className="hidden sm:inline-block rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-500 border border-slate-200 dark:border-slate-700">
                v2.4.0
              </span>
            </a>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <ErrorBoundary level="component">
              <Search />
            </ErrorBoundary>

            <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>

            {/* Contact Sales */}
            <a
              href="#"
              className="hidden sm:block text-xs font-medium text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400 transition-colors"
              aria-label="Contact sales team"
            >
              Contact Sales
            </a>
            
            {/* Theme toggle */}
            <ErrorBoundary level="component">
              <ThemeToggle />
            </ErrorBoundary>
            
            {/* GitHub link */}
            <a
              href="https://github.com/careerforge/careerforge"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
              aria-label="View CareerForge on GitHub (opens in new tab)"
            >
              <Github className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>
      </header>
    </>
  )
}