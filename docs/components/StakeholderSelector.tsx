// StakeholderSelector.tsx - Component for selecting user personas
'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Check, User, TrendingUp, Target, Users, Building2 } from 'lucide-react'
import { UserPersona, personaConfigs } from '@/config/enhanced-navigation'
import { cn } from '@/lib/utils'

interface StakeholderSelectorProps {
  currentPersona: UserPersona
  onPersonaChange: (persona: UserPersona) => void
  className?: string
  variant?: 'header' | 'sidebar' | 'floating'
}

const personaIcons = {
  [UserPersona.SENIOR_DEVELOPER]: User,
  [UserPersona.INVESTOR_EXECUTIVE]: TrendingUp,
  [UserPersona.PRODUCT_MANAGER]: Target,
  [UserPersona.END_USER]: Users,
  [UserPersona.ENTERPRISE_CUSTOMER]: Building2
}

export function StakeholderSelector({ 
  currentPersona, 
  onPersonaChange, 
  className,
  variant = 'header' 
}: StakeholderSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  
  const currentConfig = personaConfigs[currentPersona]
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  // Handle keyboard navigation
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isOpen) {
        const personas = Object.values(UserPersona)
        const currentIndex = personas.indexOf(currentPersona)
        
        switch (event.key) {
          case 'ArrowDown':
            event.preventDefault()
            const nextIndex = (currentIndex + 1) % personas.length
            onPersonaChange(personas[nextIndex])
            break
          case 'ArrowUp':
            event.preventDefault()
            const prevIndex = currentIndex === 0 ? personas.length - 1 : currentIndex - 1
            onPersonaChange(personas[prevIndex])
            break
          case 'Enter':
          case ' ':
            event.preventDefault()
            setIsOpen(false)
            break
          case 'Escape':
            setIsOpen(false)
            break
        }
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, currentPersona, onPersonaChange])

  const handlePersonaSelect = (persona: UserPersona) => {
    onPersonaChange(persona)
    setIsOpen(false)
  }

  // Header variant - compact dropdown
  if (variant === 'header') {
    return (
      <div className={cn('relative', className)} ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium',
            'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
            'hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors',
            'border border-slate-200 dark:border-slate-700',
            'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
            isOpen && 'ring-2 ring-primary-500 ring-offset-2'
          )}
          aria-label="Select documentation view"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          {(() => {
            const IconComponent = personaIcons[currentPersona]
            return <IconComponent className="h-4 w-4" />
          })()}
          <span className="hidden sm:inline">{currentConfig.name}</span>
          <ChevronDown className={cn(
            'h-4 w-4 transition-transform duration-200',
            isOpen && 'rotate-180'
          )} />
        </button>

        {isOpen && (
          <div className={cn(
            'absolute top-full right-0 mt-2 w-72 rounded-lg border border-slate-200 dark:border-slate-700',
            'bg-white dark:bg-slate-900 shadow-lg z-50 py-2',
            'focus:outline-none'
          )}>
            <div className="px-3 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Choose Your Perspective
            </div>
            {Object.values(UserPersona).map((persona) => {
              const config = personaConfigs[persona]
              const IconComponent = personaIcons[persona]
              const isSelected = persona === currentPersona
              
              return (
                <button
                  key={persona}
                  onClick={() => handlePersonaSelect(persona)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-3 text-left hover:bg-slate-50 dark:hover:bg-slate-800',
                    'focus:outline-none focus:bg-slate-50 dark:focus:bg-slate-800',
                    isSelected && 'bg-primary-50 dark:bg-primary-900/20'
                  )}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className={cn(
                    'flex h-8 w-8 items-center justify-center rounded-md text-white',
                    config.color
                  )}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-900 dark:text-slate-100">
                      {config.name}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 truncate">
                      {config.description}
                    </div>
                  </div>
                  {isSelected && (
                    <Check className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                  )}
                </button>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  // Sidebar variant - full list
  if (variant === 'sidebar') {
    return (
      <div className={cn('p-4', className)} ref={dropdownRef}>
        <div className="mb-3">
          <h3 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Documentation View
          </h3>
        </div>
        <div className="space-y-1">
          {Object.values(UserPersona).map((persona) => {
            const config = personaConfigs[persona]
            const IconComponent = personaIcons[persona]
            const isSelected = persona === currentPersona
            
            return (
              <button
                key={persona}
                onClick={() => handlePersonaSelect(persona)}
                className={cn(
                  'w-full flex items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors',
                  'hover:bg-slate-100 dark:hover:bg-slate-800',
                  isSelected && 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                )}
                role="option"
                aria-selected={isSelected}
              >
                <div className={cn(
                  'flex h-6 w-6 items-center justify-center rounded text-white text-xs',
                  config.color
                )}>
                  <IconComponent className="h-3 w-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{config.name}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 truncate">
                    {config.description}
                  </div>
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  // Floating variant - modal-like selector
  return (
    <div className={cn('fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4', className)}>
      <div className="w-full max-w-md rounded-xl bg-white dark:bg-slate-900 shadow-2xl">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
            Choose Your Documentation View
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Select your role to see relevant documentation tailored to your needs.
          </p>
          
          <div className="space-y-3">
            {Object.values(UserPersona).map((persona) => {
              const config = personaConfigs[persona]
              const IconComponent = personaIcons[persona]
              const isSelected = persona === currentPersona
              
              return (
                <button
                  key={persona}
                  onClick={() => handlePersonaSelect(persona)}
                  className={cn(
                    'w-full flex items-center gap-4 rounded-lg p-4 text-left transition-all',
                    'border-2 hover:border-slate-300 dark:hover:border-slate-600',
                    isSelected 
                      ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                      : 'border-slate-200 dark:border-slate-700'
                  )}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-lg text-white',
                    config.color
                  )}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-slate-900 dark:text-slate-100">
                      {config.name}
                    </div>
                    <div className="text-sm text-slate-600 dark:text-slate-400">
                      {config.description}
                    </div>
                  </div>
                  {isSelected && (
                    <Check className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                  )}
                </button>
              )
            })}
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hook for managing stakeholder selector state
export function useStakeholderSelector(initialPersona: UserPersona = UserPersona.SENIOR_DEVELOPER) {
  const [currentPersona, setCurrentPersona] = useState<UserPersona>(initialPersona)
  
  // Load persona from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('careerforge-docs-persona')
    if (saved && Object.values(UserPersona).includes(saved as UserPersona)) {
      setCurrentPersona(saved as UserPersona)
    }
  }, [])
  
  // Save persona to localStorage when it changes
  const handlePersonaChange = (persona: UserPersona) => {
    setCurrentPersona(persona)
    localStorage.setItem('careerforge-docs-persona', persona)
    
    // Track persona change for analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'stakeholder_view_change', {
        stakeholder: persona,
        previous_stakeholder: currentPersona
      })
    }
  }
  
  return {
    currentPersona,
    setCurrentPersona: handlePersonaChange,
    personaConfig: personaConfigs[currentPersona]
  }
}