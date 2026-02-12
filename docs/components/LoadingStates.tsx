'use client'

import React from 'react'
import { Loader2, AlertCircle } from 'lucide-react'

// Base loading spinner component
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  text?: string
}

export function LoadingSpinner({ size = 'md', className = '', text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex flex-col items-center space-y-2">
        <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
        {text && (
          <p className="text-sm text-muted-foreground">{text}</p>
        )}
      </div>
    </div>
  )
}

// Inline loading spinner for buttons and small areas
interface InlineSpinnerProps {
  className?: string
  size?: 'sm' | 'md'
}

export function InlineSpinner({ className = '', size = 'sm' }: InlineSpinnerProps) {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4'
  }

  return (
    <Loader2 className={`${sizeClasses[size]} animate-spin ${className}`} />
  )
}

// Skeleton loader components
interface SkeletonProps {
  className?: string
  count?: number
}

export function Skeleton({ className = '', count = 1 }: SkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`animate-pulse bg-muted rounded ${className}`}
    />
  ))

  return <>{skeletons}</>
}

// Text skeleton for paragraphs
export function TextSkeleton({ lines = 3, className = '' }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          className={`h-4 ${i === lines - 1 ? 'w-3/4' : 'w-full'} ${i > 0 ? 'mt-2' : ''}`}
        />
      ))}
    </div>
  )
}

// Card skeleton for content cards
export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-card border border-border rounded-lg p-6 ${className}`}>
      <div className="animate-pulse">
        <div className="flex items-center space-x-3 mb-4">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
        <TextSkeleton lines={2} />
        <div className="mt-4 flex space-x-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  )
}

// Code block skeleton
export function CodeSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-muted/50 rounded-lg p-4 ${className}`}>
      <div className="animate-pulse space-y-2">
        {Array.from({ length: 5 }, (_, i) => (
          <Skeleton
            key={i}
            className={`h-4 ${i === 4 ? 'w-1/2' : 'w-full'}`}
          />
        ))}
      </div>
    </div>
  )
}

// List skeleton for navigation and lists
export function ListSkeleton({ items = 3, className = '' }: { items?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: items }, (_, i) => (
        <div key={i} className="flex items-center space-x-3 p-2">
          <Skeleton className="w-5 h-5 rounded" />
          <Skeleton className="h-4 flex-1" />
        </div>
      ))}
    </div>
  )
}

// Progress indicator component
interface ProgressProps {
  value: number
  max?: number
  className?: string
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'success' | 'warning' | 'error'
}

export function Progress({ 
  value, 
  max = 100, 
  className = '', 
  showLabel = false, 
  size = 'md',
  color = 'primary'
}: ProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  }

  const colorClasses = {
    primary: 'bg-primary',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500'
  }

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm text-muted-foreground">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div className={`w-full bg-muted rounded-full ${sizeClasses[size]}`}>
        <div
          className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-300 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}

// Full page loading component
interface LoadingPageProps {
  message?: string
  showProgress?: boolean
  progress?: number
}

export function LoadingPage({ 
  message = 'Loading...', 
  showProgress = false, 
  progress = 0 
}: LoadingPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <LoadingSpinner size="xl" className="mb-4" />
        <p className="text-lg text-muted-foreground mb-4">{message}</p>
        {showProgress && (
          <div className="w-64">
            <Progress value={progress} showLabel />
          </div>
        )}
      </div>
    </div>
  )
}

// Section loading component
interface SectionLoadingProps {
  message?: string
  className?: string
  minHeight?: string
}

export function SectionLoading({ 
  message = 'Loading...', 
  className = '',
  minHeight = '200px'
}: SectionLoadingProps) {
  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{ minHeight }}
    >
      <LoadingSpinner text={message} />
    </div>
  )
}

// Content loading wrapper with skeleton
interface ContentLoaderProps {
  isLoading: boolean
  children: React.ReactNode
  skeleton?: React.ReactNode
  error?: React.ReactNode
  fallback?: React.ReactNode
}

export function ContentLoader({ 
  isLoading, 
  children, 
  skeleton, 
  error,
  fallback 
}: ContentLoaderProps) {
  if (error) {
    return <>{error}</>
  }

  if (isLoading) {
    return skeleton || <SectionLoading />
  }

  return <>{children || fallback}</>
}

// Async component wrapper with loading and error states
interface AsyncComponentProps<T> {
  data: T | null
  isLoading: boolean
  error: Error | null
  children: (data: T) => React.ReactNode
  loadingComponent?: React.ReactNode
  errorComponent?: React.ReactNode
  emptyComponent?: React.ReactNode
}

export function AsyncComponent<T>({
  data,
  isLoading,
  error,
  children,
  loadingComponent,
  errorComponent,
  emptyComponent
}: AsyncComponentProps<T>) {
  if (isLoading) {
    return <>{loadingComponent || <SectionLoading />}</>
  }

  if (error) {
    return (
      <>{errorComponent || (
        <div className="flex items-center justify-center p-6 text-center">
          <div className="text-red-600">
            <AlertCircle className="w-8 h-8 mx-auto mb-2" />
            <p className="text-sm">Failed to load content</p>
          </div>
        </div>
      )}</>
    )
  }

  if (!data) {
    return <>{emptyComponent || <TextSkeleton lines={3} />}</>
  }

  return <>{children(data)}</>
}

// Loading state hook
export function useLoadingState(initialState = false) {
  const [isLoading, setIsLoading] = React.useState(initialState)

  const startLoading = React.useCallback(() => setIsLoading(true), [])
  const stopLoading = React.useCallback(() => setIsLoading(false), [])
  const toggleLoading = React.useCallback(() => setIsLoading(prev => !prev), [])

  return {
    isLoading,
    startLoading,
    stopLoading,
    toggleLoading,
    setIsLoading
  }
}

// Debounced loading state for better UX
export function useDebouncedLoading(initialState = false, delay = 300) {
  const [isLoading, setIsLoading] = React.useState(initialState)
  const timeoutRef = React.useRef<NodeJS.Timeout>()

  const startLoading = React.useCallback(() => {
    setIsLoading(true)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  const stopLoading = React.useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false)
    }, delay)
  }, [delay])

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    isLoading,
    startLoading,
    stopLoading
  }
}