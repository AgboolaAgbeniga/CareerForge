// EnhancedSearch.tsx - Intelligent search with stakeholder filtering
'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Search, Clock, Star, Filter, X, ChevronDown, ExternalLink } from 'lucide-react'
import { 
  UserPersona, 
  ContentType, 
  DifficultyLevel,
  searchNavigation,
  EnhancedNavigationItem,
  getStakeholderColor,
  getStakeholderName,
  personaConfigs
} from '@/config/enhanced-navigation'
import { cn } from '@/lib/utils'

interface SearchResult {
  item: EnhancedNavigationItem
  relevanceScore: number
  matchedFields: string[]
  contextHints: string[]
}

interface SearchFilters {
  contentTypes: ContentType[]
  difficulties: DifficultyLevel[]
  timeRange: [number, number] | null
  includeExternal: boolean
}

interface EnhancedSearchProps {
  currentPersona: UserPersona
  onResultSelect: (result: SearchResult) => void
  placeholder?: string
  className?: string
  showFilters?: boolean
  variant?: 'header' | 'modal' | 'sidebar'
}

export function EnhancedSearch({
  currentPersona,
  onResultSelect,
  placeholder = "Search documentation...",
  className,
  showFilters = true,
  variant = 'header'
}: EnhancedSearchProps) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [filters, setFilters] = useState<SearchFilters>({
    contentTypes: [],
    difficulties: [],
    timeRange: null,
    includeExternal: false
  })
  const [showFilterPanel, setShowFilterPanel] = useState(false)
  
  const searchInputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<NodeJS.Timeout>()

  // Calculate relevance score for search results
  const calculateRelevanceScore = useCallback((query: string, item: EnhancedNavigationItem): number => {
    const queryLower = query.toLowerCase()
    let score = 0

    // Title match (highest weight)
    if (item.title.toLowerCase().includes(queryLower)) {
      score += item.title.toLowerCase() === queryLower ? 100 : 50
    }

    // Description match
    if (item.description?.toLowerCase().includes(queryLower)) {
      score += 30
    }

    // Tags match
    const tagMatches = item.tags.filter(tag => tag.toLowerCase().includes(queryLower))
    score += tagMatches.length * 20

    // Stakeholder relevance
    if (item.stakeholders.includes(currentPersona)) {
      score += 25
    }

    // Content type relevance
    const contentTypeRelevance = {
      [ContentType.GUIDE]: 15,
      [ContentType.TUTORIAL]: 15,
      [ContentType.API]: 20,
      [ContentType.REFERENCE]: 10,
      [ContentType.EXAMPLE]: 15,
      [ContentType.ARCHITECTURE]: 20,
      [ContentType.DEPLOYMENT]: 15,
      [ContentType.TROUBLESHOOTING]: 10
    }
    score += contentTypeRelevance[item.contentType] || 0

    return score
  }, [currentPersona])

  // Debounced search function
  const debouncedSearch = useCallback((searchQuery: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      if (searchQuery.trim().length < 2) {
        setResults([])
        return
      }

      setIsLoading(true)

      // Simulate async search (replace with actual search implementation)
      setTimeout(() => {
        const searchResults = searchNavigation(searchQuery, currentPersona, {
          contentType: filters.contentTypes.length > 0 ? filters.contentTypes : undefined,
          difficulty: filters.difficulties.length > 0 ? filters.difficulties : undefined,
          estimatedTime: filters.timeRange || undefined
        })

        const enrichedResults: SearchResult[] = searchResults.map(item => ({
          item,
          relevanceScore: calculateRelevanceScore(searchQuery, item),
          matchedFields: getMatchedFields(searchQuery, item),
          contextHints: getContextHints(item)
        })).sort((a, b) => b.relevanceScore - a.relevanceScore)

        setResults(enrichedResults.slice(0, 8)) // Limit to 8 results
        setIsLoading(false)
        setSelectedIndex(-1)
      }, 150)
    }, 300)
  }, [currentPersona, filters, calculateRelevanceScore])

  // Get matched fields for highlighting
  const getMatchedFields = (query: string, item: EnhancedNavigationItem): string[] => {
    const matchedFields: string[] = []
    const queryLower = query.toLowerCase()
    
    if (item.title.toLowerCase().includes(queryLower)) matchedFields.push('title')
    if (item.description?.toLowerCase().includes(queryLower)) matchedFields.push('description')
    
    const matchingTags = item.tags.filter(tag => tag.toLowerCase().includes(queryLower))
    if (matchingTags.length > 0) matchedFields.push('tags')
    
    return matchedFields
  }

  // Get context hints for better user understanding
  const getContextHints = (item: EnhancedNavigationItem): string[] => {
    const hints: string[] = []

    if (item.stakeholders.length === 1) {
      hints.push(`For ${getStakeholderName(item.stakeholders[0])}`)
    } else if (item.stakeholders.length < 5) {
      const stakeholderNames = item.stakeholders.map(getStakeholderName).join(', ')
      hints.push(`For ${stakeholderNames}`)
    }

    if (item.estimatedTime) {
      hints.push(`${item.estimatedTime} min read`)
    }

    hints.push(item.contentType.charAt(0).toUpperCase() + item.contentType.slice(1))

    return hints
  }

  const handleResultSelect = useCallback((result: SearchResult) => {
    onResultSelect(result)
    setIsOpen(false)
    setQuery('')
    setResults([])
  }, [onResultSelect])

  // Handle keyboard navigation
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (!isOpen) return

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault()
          setSelectedIndex(prev =>
            prev < results.length - 1 ? prev + 1 : prev
          )
          break
        case 'ArrowUp':
          event.preventDefault()
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
          break
        case 'Enter':
          event.preventDefault()
          if (selectedIndex >= 0 && results[selectedIndex]) {
            handleResultSelect(results[selectedIndex])
          }
          break
        case 'Escape':
          setIsOpen(false)
          setQuery('')
          setResults([])
          break
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, results, selectedIndex, handleResultSelect])

  // Handle search input changes
  useEffect(() => {
    debouncedSearch(query)
  }, [query, debouncedSearch])

  // Focus input when search is opened
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  const highlightText = (text: string, query: string): JSX.Element => {
    if (!query.trim()) return <>{text}</>
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    const parts = text.split(regex)
    
    return (
      <>
        {parts.map((part, index) => 
          regex.test(part) ? (
            <mark key={index} className="bg-yellow-200 dark:bg-yellow-800 px-0.5 rounded">
              {part}
            </mark>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </>
    )
  }

  const getContentTypeIcon = (contentType: ContentType) => {
    const icons = {
      [ContentType.GUIDE]: '📖',
      [ContentType.TUTORIAL]: '🎓',
      [ContentType.API]: '⚡',
      [ContentType.REFERENCE]: '📚',
      [ContentType.EXAMPLE]: '💻',
      [ContentType.ARCHITECTURE]: '🏗️',
      [ContentType.DEPLOYMENT]: '🚀',
      [ContentType.TROUBLESHOOTING]: '🔧'
    }
    return icons[contentType] || '📄'
  }

  // Header variant
  if (variant === 'header') {
    return (
      <div className={cn('relative', className)}>
        <button
          onClick={() => setIsOpen(true)}
          className={cn(
            'hidden md:flex group h-8 w-64 items-center gap-2 rounded-md border border-slate-200 dark:border-slate-800',
            'bg-slate-50 dark:bg-slate-900 px-3 transition-colors hover:border-slate-300 dark:hover:border-slate-700'
          )}
          aria-label="Search documentation"
        >
          <Search className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-xs text-slate-500">{placeholder}</span>
          <span className="ml-auto flex items-center gap-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400 font-sans">
            ⌘K
          </span>
        </button>

        {/* Search Modal */}
        {isOpen && (
          <div 
            className="fixed inset-0 z-[100] bg-slate-900/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <div className="mx-auto mt-20 max-w-3xl transform overflow-hidden rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
              {/* Search Input */}
              <div className="relative flex items-center border-b border-slate-200 dark:border-slate-800 px-4 py-3">
                <Search className="h-5 w-5 text-slate-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder={placeholder}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent px-3 py-1 text-sm text-slate-900 dark:text-slate-50 placeholder-slate-500 focus:outline-none"
                  autoComplete="off"
                />
                {showFilters && (
                  <button
                    onClick={() => setShowFilterPanel(!showFilterPanel)}
                    className={cn(
                      'p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800',
                      showFilterPanel && 'bg-slate-100 dark:bg-slate-800'
                    )}
                    aria-label="Toggle filters"
                  >
                    <Filter className="h-4 w-4 text-slate-400" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800"
                  aria-label="Close search"
                >
                  <X className="h-4 w-4 text-slate-400" />
                </button>
              </div>

              {/* Filters Panel */}
              {showFilterPanel && (
                <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Content Type Filter */}
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Content Type
                      </label>
                      <div className="space-y-1">
                        {Object.values(ContentType).map(type => (
                          <label key={type} className="flex items-center gap-2 text-xs">
                            <input
                              type="checkbox"
                              checked={filters.contentTypes.includes(type)}
                              onChange={(e) => {
                                setFilters(prev => ({
                                  ...prev,
                                  contentTypes: e.target.checked 
                                    ? [...prev.contentTypes, type]
                                    : prev.contentTypes.filter(t => t !== type)
                                }))
                              }}
                              className="rounded border-slate-300"
                            />
                            <span className="capitalize">{type.replace('-', ' ')}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Difficulty Filter */}
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Difficulty
                      </label>
                      <div className="space-y-1">
                        {Object.values(DifficultyLevel).map(level => (
                          <label key={level} className="flex items-center gap-2 text-xs">
                            <input
                              type="checkbox"
                              checked={filters.difficulties.includes(level)}
                              onChange={(e) => {
                                setFilters(prev => ({
                                  ...prev,
                                  difficulties: e.target.checked 
                                    ? [...prev.difficulties, level]
                                    : prev.difficulties.filter(l => l !== level)
                                }))
                              }}
                              className="rounded border-slate-300"
                            />
                            <span className="capitalize">{level}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Time Range Filter */}
                    <div>
                      <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
                        Read Time
                      </label>
                      <div className="space-y-2">
                        <input
                          type="range"
                          min="0"
                          max="60"
                          step="5"
                          value={filters.timeRange?.[1] || 60}
                          onChange={(e) => {
                            const max = parseInt(e.target.value)
                            setFilters(prev => ({
                              ...prev,
                              timeRange: [0, max]
                            }))
                          }}
                          className="w-full"
                        />
                        <div className="text-xs text-slate-500">
                          0 - {filters.timeRange?.[1] || 60} minutes
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Search Results */}
              <div ref={resultsRef} className="max-h-96 overflow-y-auto">
                {isLoading ? (
                  <div className="p-4 text-center text-slate-500 dark:text-slate-400">
                    <div className="animate-spin h-4 w-4 border-2 border-primary-600 border-t-transparent rounded-full mx-auto mb-2"></div>
                    Searching...
                  </div>
                ) : results.length > 0 ? (
                  <div className="py-2">
                    {results.map((result, index) => (
                      <button
                        key={result.item.id}
                        onClick={() => handleResultSelect(result)}
                        className={cn(
                          'w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800',
                          index === selectedIndex && 'bg-slate-100 dark:bg-slate-800'
                        )}
                      >
                        <div className="text-lg mt-0.5">
                          {getContentTypeIcon(result.item.contentType)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-slate-900 dark:text-slate-100">
                            {highlightText(result.item.title, query)}
                          </div>
                          {result.item.description && (
                            <div className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                              {highlightText(result.item.description, query)}
                            </div>
                          )}
                          <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                            <span className="capitalize">{result.item.contentType}</span>
                            <span>•</span>
                            <span className="capitalize">{result.item.difficulty}</span>
                            {result.item.estimatedTime && (
                              <>
                                <span>•</span>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{result.item.estimatedTime}m</span>
                                </div>
                              </>
                            )}
                          </div>
                          {result.contextHints.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {result.contextHints.map((hint, i) => (
                                <span
                                  key={i}
                                  className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                                >
                                  {hint}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        {result.item.external && (
                          <ExternalLink className="h-4 w-4 text-slate-400 mt-1" />
                        )}
                      </button>
                    ))}
                  </div>
                ) : query.trim().length > 0 ? (
                  <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                    <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No results found for "{query}"</p>
                    <p className="text-xs mt-1">Try different keywords or adjust your filters</p>
                  </div>
                ) : (
                  <div className="p-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Recent searches</p>
                    {/* Recent searches would go here */}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850 px-4 py-2.5 flex justify-between items-center">
                <span className="text-xs text-slate-500">Search powered by AI</span>
                <div className="flex gap-2 text-xs text-slate-400">
                  <span className="flex items-center">
                    <span className="mr-1">↑</span>
                    <span>↓</span>
                    <span className="ml-1">to navigate</span>
                  </span>
                  <span className="flex items-center">
                    <span className="mr-1">↵</span>
                    <span>to select</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // Sidebar variant
  if (variant === 'sidebar') {
    return (
      <div className={cn('p-4 border-b border-slate-200 dark:border-slate-800', className)}>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 dark:border-slate-700 rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        
        {/* Simple results list for sidebar */}
        {results.length > 0 && (
          <div className="mt-3 space-y-2 max-h-64 overflow-y-auto">
            {results.map((result) => (
              <button
                key={result.item.id}
                onClick={() => handleResultSelect(result)}
                className="w-full text-left p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="font-medium text-sm text-slate-900 dark:text-slate-100">
                  {highlightText(result.item.title, query)}
                </div>
                {result.item.description && (
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                    {highlightText(result.item.description, query)}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Modal variant
  return (
    <div className={cn('fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4', className)}>
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-xl shadow-2xl">
        {/* Search content would go here - similar to header variant but full screen */}
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-4">Search Documentation</h2>
          {/* Implement similar search interface as header variant */}
        </div>
      </div>
    </div>
  )
}

// Hook for managing search state
export function useEnhancedSearch(initialPersona: UserPersona) {
  const [currentPersona, setCurrentPersona] = useState<UserPersona>(initialPersona)
  const [searchHistory, setSearchHistory] = useState<string[]>([])
  const [recentResults, setRecentResults] = useState<SearchResult[]>([])
  
  // Load search history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('careerforge-docs-search-history')
    if (saved) {
      try {
        setSearchHistory(JSON.parse(saved))
      } catch (error) {
        console.warn('Failed to parse search history:', error)
      }
    }
  }, [])
  
  // Save search to history
  const addToSearchHistory = (query: string) => {
    const newHistory = [query, ...searchHistory.filter(q => q !== query)].slice(0, 10)
    setSearchHistory(newHistory)
    localStorage.setItem('careerforge-docs-search-history', JSON.stringify(newHistory))
  }
  
  return {
    currentPersona,
    setCurrentPersona,
    searchHistory,
    recentResults,
    addToSearchHistory
  }
}