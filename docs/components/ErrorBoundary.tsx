'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
  level?: 'page' | 'component' | 'section'
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: ErrorInfo
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    
    this.setState({
      error,
      errorInfo
    })

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // In production, you would send this to your error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { contexts: { react: { componentStack: errorInfo.componentStack } } })
    }
  }

  private handleRetry = () => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined
    })
  }

  private handleGoHome = () => {
    window.location.href = '/'
  }

  public render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      // Default error UI based on level
      const { level = 'component' } = this.props

      const getErrorContent = () => {
        switch (level) {
          case 'page':
            return (
              <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="max-w-md w-full mx-auto p-6">
                  <div className="text-center">
                    <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                      <AlertTriangle className="w-8 h-8 text-red-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-foreground mb-2">
                      Something went wrong
                    </h1>
                    <p className="text-muted-foreground mb-6">
                      We encountered an unexpected error while loading this page.
                    </p>
                    <div className="space-y-3">
                      <button
                        onClick={this.handleRetry}
                        className="w-full flex items-center justify-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Try Again
                      </button>
                      <button
                        onClick={this.handleGoHome}
                        className="w-full flex items-center justify-center px-4 py-2 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <Home className="w-4 h-4 mr-2" />
                        Go Home
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )

          case 'component':
            return (
              <div className="p-6 border border-red-200 rounded-lg bg-red-50/50">
                <div className="flex items-center space-x-3 mb-4">
                  <Bug className="w-5 h-5 text-red-600" />
                  <h3 className="text-lg font-semibold text-red-900">
                    Component Error
                  </h3>
                </div>
                <p className="text-red-800 mb-4">
                  This component encountered an error and couldn't load properly.
                </p>
                <div className="flex space-x-3">
                  <button
                    onClick={this.handleRetry}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
                  >
                    Retry
                  </button>
                  <button
                    onClick={this.handleGoHome}
                    className="px-3 py-1 border border-red-600 text-red-600 rounded hover:bg-red-50 transition-colors text-sm"
                  >
                    Go Home
                  </button>
                </div>
              </div>
            )

          case 'section':
          default:
            return (
              <div className="p-4 border border-yellow-200 rounded-lg bg-yellow-50/50">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800">
                    Section temporarily unavailable
                  </span>
                </div>
                <p className="text-yellow-700 text-sm mb-3">
                  This section couldn't load. You can try refreshing or continue browsing other parts of the site.
                </p>
                <button
                  onClick={this.handleRetry}
                  className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors text-xs"
                >
                  Refresh Section
                </button>
              </div>
            )
        }
      }

      return (
        <div className="error-boundary" role="alert" aria-live="polite">
          {getErrorContent()}
          
          {/* Development-only error details */}
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-4 p-4 bg-muted rounded-lg">
              <summary className="cursor-pointer text-sm font-medium mb-2">
                Error Details (Development Only)
              </summary>
              <div className="text-xs space-y-2">
                <div>
                  <strong>Error:</strong>
                  <pre className="mt-1 p-2 bg-background rounded overflow-x-auto">
                    {this.state.error.toString()}
                  </pre>
                </div>
                {this.state.errorInfo && (
                  <div>
                    <strong>Component Stack:</strong>
                    <pre className="mt-1 p-2 bg-background rounded overflow-x-auto whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </div>
                )}
              </div>
            </details>
          )}
        </div>
      )
    }

    return this.props.children
  }
}

// Higher-order component for easier usage
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  )

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`

  return WrappedComponent
}

// Hook for manual error handling
export function useErrorHandler() {
  return (error: Error, errorInfo?: { componentStack: string }) => {
    console.error('Manual error reported:', error, errorInfo)
    
    // In production, send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Example: Sentry.captureException(error, { contexts: { react: errorInfo } })
    }
  }
}