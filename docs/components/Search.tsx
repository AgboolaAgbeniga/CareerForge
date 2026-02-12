'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { Search as SearchIcon, X, FileText, ExternalLink } from 'lucide-react'
import { comprehensiveNavigationConfig } from '@/config/comprehensive-navigation'
import { ErrorBoundary } from './ErrorBoundary'
import { LoadingSpinner, useDebouncedLoading } from './LoadingStates'
import Fuse from 'fuse.js'

interface SearchResult {
  title: string
  description: string
  href: string
  section: string
}

const fuseOptions = {
  keys: [
    { name: 'title', weight: 0.4 },
    { name: 'description', weight: 0.3 },
    { name: 'section', weight: 0.2 },
    { name: 'content', weight: 0.1 }
  ],
  threshold: 0.3,
  includeScore: true,
  includeMatches: true,
}

export default function Search() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [error, setError] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  
  // Use debounced loading for better UX
  const { isLoading, startLoading, stopLoading } = useDebouncedLoading(false, 150)

  // Create searchable index
  const searchableData = useMemo((): SearchResult[] => {
    const data: SearchResult[] = []
    comprehensiveNavigationConfig.forEach(section => {
      section.items.forEach(item => {
        data.push({
          title: item.title,
          description: item.description || '',
          href: item.href,
          section: section.title
        })
      })
    })
    return data
  }, [])

  const fuse = useMemo(() => new Fuse(searchableData, fuseOptions), [searchableData])

  // Handle search
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      setError(null)
      return
    }

    startLoading()
    setError(null)
    
    try {
      const searchResults = fuse.search(query)
      const formattedResults = searchResults.map(result => result.item)
      setResults(formattedResults.slice(0, 8)) // Limit to 8 results
    } catch (err) {
      console.error('Search error:', err)
      setError('Failed to search. Please try again.')
      setResults([])
    } finally {
      stopLoading()
    }
    
    setSelectedIndex(0)
  }, [query, startLoading, stopLoading, fuse])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case 'Escape':
          setIsOpen(false)
          setQuery('')
          inputRef.current?.blur()
          break
        case 'ArrowDown':
          e.preventDefault()
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : prev
          )
          break
        case 'ArrowUp':
          e.preventDefault()
          setSelectedIndex(prev => prev > 0 ? prev - 1 : prev)
          break
        case 'Enter':
          e.preventDefault()
          if (results[selectedIndex]) {
            window.location.href = results[selectedIndex].href
            setIsOpen(false)
            setQuery('')
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex])

  // Handle global keyboard shortcut
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsOpen(true)
        setTimeout(() => inputRef.current?.focus(), 100)
      }
    }

    document.addEventListener('keydown', handleGlobalKeyDown)
    return () => document.removeEventListener('keydown', handleGlobalKeyDown)
  }, [])

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (resultsRef.current && !resultsRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text
    
    const regex = new RegExp(`(${query})`, 'gi')
    const parts = text.split(regex)
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-1 rounded">
          {part}
        </mark>
      ) : part
    )
  }

  return (
    <div className="relative" ref={resultsRef}>
      {/* Search Input */}
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search documentation... (⌘K)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setResults([])
              inputRef.current?.focus()
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Search Results */}
      {isOpen && (
        <ErrorBoundary level="section">
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center">
              <LoadingSpinner size="sm" text="Searching..." />
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-600">
              <div className="text-sm font-medium mb-1">Search Error</div>
              <div className="text-xs text-red-500">{error}</div>
              <button 
                onClick={() => {
                  setError(null)
                  setQuery('')
                }}
                className="mt-2 text-xs text-red-600 hover:text-red-800 underline"
              >
                Clear search
              </button>
            </div>
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((result, index) => (
                <a
                  key={result.href}
                  href={result.href}
                  onClick={() => {
                    setIsOpen(false)
                    setQuery('')
                  }}
                  className={`block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-l-4 transition-colors ${
                    index === selectedIndex 
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-500' 
                      : 'border-transparent'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <FileText className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                        {highlightMatch(result.title, query)}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {highlightMatch(result.description, query)}
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-500">
                        <span>{result.section}</span>
                        <span>•</span>
                        <span className="font-mono">{result.href}</span>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  </div>
                </a>
              ))}
            </div>
          ) : query.length >= 2 ? (
            <div className="p-4 text-center text-gray-500">
              <SearchIcon className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <div className="font-medium">No results found</div>
              <div className="text-sm">Try different keywords or check your spelling</div>
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">
              <SearchIcon className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <div className="font-medium">Start typing to search</div>
              <div className="text-sm">Find documentation pages, guides, and references</div>
            </div>
          )}
          </div>
        </ErrorBoundary>
      )}
    </div>
  )
}