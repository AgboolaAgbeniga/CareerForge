// Core Web Vitals monitoring hook for homepage optimization
// This hook tracks and reports performance metrics for the enhanced homepage

'use client'

import { useEffect } from 'react'

// Performance metric interface
interface PerformanceMetric {
  name: string
  value: number
  id: string
  timestamp: number
}

interface PerformanceConfig {
  enableConsoleLogging?: boolean
  enableAnalytics?: boolean
}

// Core Web Vitals thresholds
const thresholds = {
  lcp: { good: 2500, poor: 4000 },
  fid: { good: 100, poor: 300 },
  cls: { good: 0.1, poor: 0.25 },
  fcp: { good: 1800, poor: 3000 },
  ttfb: { good: 800, poor: 1800 }
}

// Get rating based on metric value
function getRating(metricName: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = thresholds[metricName as keyof typeof thresholds]
  if (!threshold) return 'good'
  
  if (value <= threshold.good) return 'good'
  if (value <= threshold.poor) return 'needs-improvement'
  return 'poor'
}

// Send metric to analytics
function sendToAnalytics(metric: PerformanceMetric, config: PerformanceConfig) {
  const { enableConsoleLogging = true, enableAnalytics = false } = config
  
  if (enableConsoleLogging) {
    console.log('Performance Metric:', {
      name: metric.name,
      value: metric.value,
      rating: getRating(metric.name, metric.value),
      timestamp: new Date(metric.timestamp).toISOString()
    })
  }
  
  if (enableAnalytics && typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.value),
      custom_parameter_1: getRating(metric.name, metric.value)
    })
  }
}

// Get Largest Contentful Paint (LCP)
function measureLCP(callback: (metric: PerformanceMetric) => void) {
  let lcpValue = 0
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries()
    const lastEntry = entries[entries.length - 1] as any
    if (lastEntry && lastEntry.startTime) {
      lcpValue = lastEntry.startTime
    }
  })
  observer.observe({ type: 'largest-contentful-paint', buffered: true })
  
  // Report LCP when page is fully loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      callback({
        name: 'LCP',
        value: lcpValue,
        id: 'lcp-' + Date.now(),
        timestamp: Date.now()
      })
    }, 0)
  })
}

// Get First Contentful Paint (FCP)
function measureFCP(callback: (metric: PerformanceMetric) => void) {
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        callback({
          name: 'FCP',
          value: entry.startTime,
          id: 'fcp-' + Date.now(),
          timestamp: Date.now()
        })
      }
    }
  })
  observer.observe({ type: 'paint', buffered: true })
}

// Get Cumulative Layout Shift (CLS)
function measureCLS(callback: (metric: PerformanceMetric) => void) {
  let clsValue = 0
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      const layoutShift = entry as any
      if (!layoutShift.hadRecentInput) {
        clsValue += layoutShift.value || 0
      }
    }
  })
  observer.observe({ type: 'layout-shift', buffered: true })
  
  // Report CLS when page is fully loaded
  window.addEventListener('load', () => {
    setTimeout(() => {
      callback({
        name: 'CLS',
        value: clsValue,
        id: 'cls-' + Date.now(),
        timestamp: Date.now()
      })
    }, 0)
  })
}

// Get First Input Delay (FID) - simplified
function measureFID(callback: (metric: PerformanceMetric) => void) {
  const measureFirstInput = () => {
    const fid = performance.now()
    callback({
      name: 'FID',
      value: fid,
      id: 'fid-' + Date.now(),
      timestamp: Date.now()
    })
  }
  
  window.addEventListener('pageshow', measureFirstInput, { once: true })
}

// Get Time to First Byte (TTFB)
function measureTTFB(callback: (metric: PerformanceMetric) => void) {
  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
  if (navigation) {
    const ttfb = navigation.responseStart - navigation.requestStart
    callback({
      name: 'TTFB',
      value: ttfb,
      id: 'ttfb-' + Date.now(),
      timestamp: Date.now()
    })
  }
}

export function usePerformanceMonitoring(config: PerformanceConfig = {}) {
  const { enableConsoleLogging = true, enableAnalytics = false } = config

  useEffect(() => {
    if (typeof window === 'undefined') return

    const reportMetric = (metric: PerformanceMetric) => {
      sendToAnalytics(metric, config)
    }

    // Measure Core Web Vitals
    measureLCP(reportMetric)
    measureFCP(reportMetric)
    measureCLS(reportMetric)
    measureFID(reportMetric)
    measureTTFB(reportMetric)

    // Monitor custom metrics
    const monitorCustomMetrics = () => {
      // Hero section visibility
      const heroSection = document.getElementById('hero')
      if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const heroLoadTime = performance.now()
              reportMetric({
                name: 'hero-section-visible',
                value: heroLoadTime,
                id: 'hero-visible',
                timestamp: Date.now()
              })
              heroObserver.disconnect()
              break
            }
          }
        }, { threshold: 0.5 })
        
        heroObserver.observe(heroSection)
      }

      // Architecture diagram load time
      const architectureSection = document.getElementById('architecture')
      if (architectureSection) {
        const archObserver = new IntersectionObserver((entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const archLoadTime = performance.now()
              reportMetric({
                name: 'architecture-section-visible',
                value: archLoadTime,
                id: 'arch-visible',
                timestamp: Date.now()
              })
              archObserver.disconnect()
              break
            }
          }
        }, { threshold: 0.5 })
        
        archObserver.observe(architectureSection)
      }
    }

    monitorCustomMetrics()

  }, [enableConsoleLogging, enableAnalytics, config])

  // Utility functions
  const reportCustomMetric = (name: string, value: number, id?: string) => {
    const metric: PerformanceMetric = {
      name,
      value,
      id: id || name,
      timestamp: Date.now()
    }
    sendToAnalytics(metric, config)
  }

  const measureFunction = async <T>(name: string, fn: () => Promise<T> | T): Promise<T> => {
    const start = performance.now()
    const result = await fn()
    const duration = performance.now() - start
    
    reportCustomMetric(`${name}-duration`, duration, `${name}-exec`)
    
    return result
  }

  return {
    reportCustomMetric,
    measureFunction
  }
}