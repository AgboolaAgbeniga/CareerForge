export const performanceOptimizationContent = {
  meta: {
    title: "Performance Optimization",
    description: "Comprehensive guide to optimizing frontend performance, including bundle optimization, lazy loading, caching strategies, and monitoring techniques.",
    keywords: ["performance", "optimization", "bundle", "lazy loading", "caching", "monitoring"]
  },
  
  sections: [
    {
      id: "overview",
      title: "Performance Optimization Overview",
      content: `
        <p>Performance optimization is crucial for delivering exceptional user experiences and improving business metrics. This guide covers comprehensive strategies for optimizing frontend performance in CareerForge.</p>
        
        <div class="performance-summary">
          <h3>Key Performance Metrics</h3>
          <ul>
            <li><strong>First Contentful Paint (FCP):</strong> < 1.8s</li>
            <li><strong>Largest Contentful Paint (LCP):</strong> < 2.5s</li>
            <li><strong>First Input Delay (FID):</strong> < 100ms</li>
            <li><strong>Cumulative Layout Shift (CLS):</strong> < 0.1</li>
            <li><strong>Time to Interactive (TTI):</strong> < 3.8s</li>
          </ul>
        </div>
      `
    },
    
    {
      id: "bundle-optimization",
      title: "Bundle Optimization",
      content: `
        <h3>Code Splitting and Dynamic Imports</h3>
        <p>Implement strategic code splitting to reduce initial bundle size and improve load times.</p>
        
        <div class="code-example">
          <h4>Dynamic Route-based Splitting</h4>
          <pre><code class="language-typescript">
// app/dashboard/page.tsx
import { lazy, Suspense } from 'react';

const ChartComponent = lazy(() => import('@/components/Chart'));
const Analytics = lazy(() => import('@/components/Analytics'));

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<ChartSkeleton />}>
        <ChartComponent />
      </Suspense>
      <Suspense fallback={<AnalyticsSkeleton />}>
        <Analytics />
      </Suspense>
    </div>
  );
}</code></pre>
        </div>
        
        <div class="code-example">
          <h4>Component-level Splitting</h4>
          <pre><code class="language-typescript">
// components/LazyComponents.tsx
import { lazy } from 'react';

// Heavy components loaded on demand
export const LazyJobBoard = lazy(() => import('./JobBoard'));
export const LazyProfileEditor = lazy(() => import('./ProfileEditor'));
export const LazyAnalytics = lazy(() => import('./Analytics'));
export const LazySettings = lazy(() => import('./Settings'));

// Usage with error boundaries
<ErrorBoundary>
  <Suspense fallback={<LoadingSpinner />}>
    <LazyJobBoard />
  </Suspense>
</ErrorBoundary></code></pre>
        </div>
        
        <div class="best-practice">
          <h4>Best Practices for Bundle Optimization</h4>
          <ul>
            <li>Split routes based on user navigation patterns</li>
            <li>Load heavy components (charts, editors) only when needed</li>
            <li>Use dynamic imports for third-party libraries</li>
            <li>Implement progressive loading for large datasets</li>
            <li>Monitor bundle sizes with webpack-bundle-analyzer</li>
          </ul>
        </div>
      `
    },
    
    {
      id: "lazy-loading",
      title: "Lazy Loading Strategies",
      content: `
        <h3>Intersection Observer-based Lazy Loading</h3>
        <p>Implement efficient lazy loading for images, components, and data.</p>
        
        <div class="code-example">
          <h4>Image Lazy Loading Component</h4>
          <pre><code class="language-typescript">
// components/LazyImage.tsx
import { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
}

export function LazyImage({ 
  src, 
  alt, 
  className = '', 
  placeholder = '/placeholder.jpg' 
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={\`lazy-image-container \${className}\`}>
      {isInView ? (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={\`lazy-image \${isLoaded ? 'loaded' : 'loading'}\`}
          loading="lazy"
        />
      ) : (
        <img
          src={placeholder}
          alt=""
          className="placeholder"
        />
      )}
    </div>
  );
}</code></pre>
        </div>
        
        <div class="code-example">
          <h4>Virtual Scrolling for Large Lists</h4>
          <pre><code class="language-typescript">
// components/VirtualList.tsx
import { useState, useEffect, useRef, useMemo } from 'react';

interface VirtualListProps<T> {
  items: T[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export function VirtualList<T>({ 
  items, 
  itemHeight, 
  containerHeight, 
  renderItem 
}: VirtualListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const visibleItems = useMemo(() => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(
      startIndex + Math.ceil(containerHeight / itemHeight) + 1,
      items.length
    );

    return items.slice(startIndex, endIndex).map((item, index) => ({
      item,
      index: startIndex + index,
      top: (startIndex + index) * itemHeight
    }));
  }, [items, itemHeight, containerHeight, scrollTop]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  };

  return (
    <div
      ref={containerRef}
      className="virtual-list-container"
      style={{ height: containerHeight, overflow: 'auto' }}
      onScroll={handleScroll}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        {visibleItems.map(({ item, index, top }) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top,
              left: 0,
              right: 0,
              height: itemHeight
            }}
          >
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}</code></pre>
        </div>
        
        <div class="code-example">
          <h4>Data Pagination with Infinite Scroll</h4>
          <pre><code class="language-typescript">
// hooks/useInfiniteScroll.ts
import { useState, useEffect, useCallback } from 'react';

interface UseInfiniteScrollProps<T> {
  fetchMore: (page: number) => Promise<T[]>;
  hasMore: boolean;
  threshold?: number;
}

export function useInfiniteScroll<T>({ 
  fetchMore, 
  hasMore, 
  threshold = 100 
}: UseInfiniteScrollProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const newItems = await fetchMore(page);
      setData(prev => [...prev, ...newItems]);
      setPage(prev => prev + 1);
    } catch (error) {
      console.error('Error loading more data:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchMore, hasMore, loading, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - threshold
      ) {
        loadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadMore, threshold]);

  return { data, loading, loadMore };
}</code></pre>
        </div>
      `
    },
    
    {
      id: "caching-strategies",
      title: "Caching Strategies",
      content: `
        <h3>Multi-level Caching Implementation</h3>
        <p>Implement comprehensive caching strategies to minimize network requests and improve response times.</p>
        
        <div class="code-example">
          <h4>Service Worker Caching</h4>
          <pre><code class="language-typescript">
// public/sw.js
const CACHE_NAME = 'careerforge-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/api/user/profile',
  '/api/jobs/featured'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});</code></pre>
        </div>
        
        <div class="code-example">
          <h4>React Query for Server State</h4>
          <pre><code class="language-typescript">
// lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

// hooks/useJobs.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';

export function useJobs(filters?: JobFilters) {
  return useQuery({
    queryKey: ['jobs', filters],
    queryFn: () => apiClient.getJobs(filters),
    // Cache jobs for 5 minutes
    staleTime: 5 * 60 * 1000,
  });
}

export function useJob(id: string) {
  return useQuery({
    queryKey: ['job', id],
    queryFn: () => apiClient.getJob(id),
    // Individual jobs cached longer
    staleTime: 30 * 60 * 1000,
  });
}</code></pre>
        </div>
        
        <div class="code-example">
          <h4>Local Storage Caching</h4>
          <pre><code class="language-typescript">
// utils/cache.ts
interface CacheItem<T> {
  data: T;
  timestamp: number;
  expiry: number;
}

class LocalCache {
  private prefix = 'careerforge_';

  set<T>(key: string, data: T, expiryMinutes = 30): void {
    const item: CacheItem<T> = {
      data,
      timestamp: Date.now(),
      expiry: expiryMinutes * 60 * 1000
    };
    
    try {
      localStorage.setItem(this.prefix + key, JSON.stringify(item));
    } catch (error) {
      console.warn('Cache storage failed:', error);
    }
  }

  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(this.prefix + key);
      if (!item) return null;

      const parsed: CacheItem<T> = JSON.parse(item);
      
      if (Date.now() - parsed.timestamp > parsed.expiry) {
        this.delete(key);
        return null;
      }

      return parsed.data;
    } catch (error) {
      console.warn('Cache retrieval failed:', error);
      return null;
    }
  }

  delete(key: string): void {
    localStorage.removeItem(this.prefix + key);
  }

  clear(): void {
    Object.keys(localStorage)
      .filter(key => key.startsWith(this.prefix))
      .forEach(key => localStorage.removeItem(key));
  }
}

export const cache = new LocalCache();</code></pre>
        </div>
        
        <div class="code-example">
          <h4>Cache Invalidation Strategies</h4>
          <pre><code class="language-typescript">
// hooks/useCacheInvalidation.ts
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export function useCacheInvalidation() {
  const queryClient = useQueryClient();

  const invalidateUserCache = () => {
    queryClient.invalidateQueries({ queryKey: ['user'] });
    queryClient.invalidateQueries({ queryKey: ['profile'] });
  };

  const invalidateJobCache = (jobId?: string) => {
    if (jobId) {
      queryClient.invalidateQueries({ queryKey: ['job', jobId] });
    }
    queryClient.invalidateQueries({ queryKey: ['jobs'] });
    queryClient.invalidateQueries({ queryKey: ['job-search'] });
  };

  const invalidateApplicationCache = () => {
    queryClient.invalidateQueries({ queryKey: ['applications'] });
    queryClient.invalidateQueries({ queryKey: ['application', 'pending'] });
  };

  return {
    invalidateUserCache,
    invalidateJobCache,
    invalidateApplicationCache
  };
}</code></pre>
        </div>
      `
    },
    
    {
      id: "monitoring",
      title: "Performance Monitoring",
      content: `
        <h3>Real-time Performance Tracking</h3>
        <p>Implement comprehensive monitoring to track and optimize performance metrics.</p>
        
        <div class="code-example">
          <h4>Core Web Vitals Tracking</h4>
          <pre><code class="language-typescript">
// lib/performance.ts
interface PerformanceMetrics {
  fcp: number; // First Contentful Paint
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  ttfb: number; // Time to First Byte
}

class PerformanceMonitor {
  private metrics: Partial<PerformanceMetrics> = {};

  constructor() {
    this.initObserver();
  }

  private initObserver() {
    // Web Vitals observer
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.processEntry(entry);
        }
      });

      observer.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'first-input'] });
      observer.observe({ entryTypes: ['layout-shift'], buffered: true });
    }
  }

  private processEntry(entry: PerformanceEntry) {
    switch (entry.entryType) {
      case 'paint':
        if (entry.name === 'first-contentful-paint') {
          this.metrics.fcp = entry.startTime;
        }
        break;
      case 'largest-contentful-paint':
        this.metrics.lcp = entry.startTime;
        break;
      case 'first-input':
        this.metrics.fid = entry.processingStart - entry.startTime;
        break;
      case 'layout-shift':
        if (!entry.hadRecentInput) {
          this.metrics.cls = (this.metrics.cls || 0) + entry.value;
        }
        break;
    }
  }

  getMetrics(): Partial<PerformanceMetrics> {
    return { ...this.metrics };
  }

  sendMetrics(endpoint = '/api/analytics/performance') {
    if (Object.keys(this.metrics).length === 0) return;

    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...this.metrics,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: Date.now()
      })
    }).catch(console.error);
  }
}

export const performanceMonitor = new PerformanceMonitor();</code></pre>
        </div>
        
        <div class="code-example">
          <h4>Bundle Size Monitoring</h4>
          <pre><code class="language-typescript">
// scripts/analyze-bundle.js
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

function analyzeBundle() {
  const config = require('../webpack.config.js');
  
  webpack(config, (err, stats) => {
    if (err) {
      console.error('Bundle analysis failed:', err);
      return;
    }

    const info = stats.toJson();
    
    console.log('\\n📊 Bundle Analysis Results:');
    console.log('========================');
    
    info.chunks.forEach((chunk, index) => {
      const size = chunk.size;
      const sizeKB = (size / 1024).toFixed(2);
      
      console.log(`Chunk ${index + 1}: ${sizeKB} KB`);
      console.log('Modules:', chunk.modules.length);
      
      // Identify large modules
      chunk.modules
        .filter(module => module.size > 10000) // > 10KB
        .forEach(module => {
          console.log(`  🚨 Large module: ${module.name} (${(module.size / 1024).toFixed(2)} KB)`);
        });
    });

    // Save analysis report
    const report = {
      timestamp: new Date().toISOString(),
      totalChunks: info.chunks.length,
      totalSize: info.chunks.reduce((sum, chunk) => sum + chunk.size, 0),
      chunks: info.chunks.map((chunk, index) => ({
        name: `chunk-${index + 1}`,
        size: chunk.size,
        modules: chunk.modules.length
      }))
    };

    fs.writeFileSync(
      path.join(__dirname, '../bundle-analysis.json'),
      JSON.stringify(report, null, 2)
    );
  });
}

analyzeBundle();</code></pre>
        </div>
        
        <div class="code-example">
          <h4>Custom Performance Hooks</h4>
          <pre><code class="language-typescript">
// hooks/usePerformance.ts
import { useEffect, useRef } from 'react';

export function useRenderTime(componentName: string) {
  const renderStart = useRef<number>();

  useEffect(() => {
    renderStart.current = performance.now();
    
    return () => {
      if (renderStart.current) {
        const renderTime = performance.now() - renderStart.current;
        console.log(`Component ${componentName} render time: ${renderTime.toFixed(2)}ms`);
        
        // Send to analytics
        fetch('/api/analytics/render-time', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            component: componentName,
            renderTime,
            timestamp: Date.now()
          })
        }).catch(console.error);
      }
    };
  }, [componentName]);
}

export function useAsyncOperation(operationName: string) {
  const startTime = useRef<number>();

  const startOperation = () => {
    startTime.current = performance.now();
  };

  const endOperation = () => {
    if (startTime.current) {
      const duration = performance.now() - startTime.current;
      console.log(`Operation ${operationName} took: ${duration.toFixed(2)}ms`);
      
      // Performance threshold check
      if (duration > 1000) {
        console.warn(`⚠️ Slow operation detected: ${operationName} (${duration.toFixed(2)}ms)`);
      }
    }
  };

  return { startOperation, endOperation };
}</code></pre>
        </div>
      `
    },
    
    {
      id: "optimization-techniques",
      title: "Advanced Optimization Techniques",
      content: `
        <h3>Memory Management and Garbage Collection</h3>
        <p>Implement memory-efficient patterns to prevent memory leaks and optimize performance.</p>
        
        <div class="code-example">
          <h4>Memory-efficient Event Listeners</h4>
          <pre><code class="language-typescript">
// hooks/useEventListener.ts
import { useEffect, useRef } from 'react';

interface EventListenerOptions {
  target?: EventTarget;
  type: string;
  listener: EventListener;
  options?: AddEventListenerOptions;
}

export function useEventListener({
  target = window,
  type,
  listener,
  options
}: EventListenerOptions) {
  const listenerRef = useRef(listener);
  const targetRef = useRef(target);

  useEffect(() => {
    const currentTarget = targetRef.current;
    const currentListener = listenerRef.current;
    
    currentTarget.addEventListener(type, currentListener, options);
    
    return () => {
      currentTarget.removeEventListener(type, currentListener, options);
    };
  }, [type, options]);
}

// Usage in component
function ScrollHandler() {
  const handleScroll = useCallback((event: Event) => {
    // Handle scroll logic
    const target = event.target as HTMLElement;
    console.log('Scroll position:', target.scrollTop);
  }, []);

  useEventListener({
    type: 'scroll',
    listener: handleScroll,
    options: { passive: true }
  });
  
  return <div>Scroll Handler Component</div>;
}</code></pre>
        </div>
        
        <div class="code-example">
          <h4>Object Pooling for Frequent Operations</h4>
          <pre><code class="language-typescript">
// utils/objectPool.ts
class ObjectPool<T> {
  private pool: T[] = [];
  private createFn: () => T;
  private resetFn: (obj: T) => void;
  private maxSize: number;

  constructor(
    createFn: () => T,
    resetFn: (obj: T) => void,
    maxSize = 10
  ) {
    this.createFn = createFn;
    this.resetFn = resetFn;
    this.maxSize = maxSize;
  }

  acquire(): T {
    if (this.pool.length > 0) {
      return this.pool.pop()!;
    }
    return this.createFn();
  }

  release(obj: T): void {
    if (this.pool.length < this.maxSize) {
      this.resetFn(obj);
      this.pool.push(obj);
    }
  }

  clear(): void {
    this.pool.length = 0;
  }
}

// Pool for DOM elements
const elementPool = new ObjectPool<HTMLElement>(
  () => document.createElement('div'),
  (element) => {
    element.textContent = '';
    element.className = '';
    element.style.cssText = '';
  }
);

// Usage
function createReusableElement(): HTMLElement {
  const element = elementPool.acquire();
  
  // Use element
  element.className = 'reusable-element';
  element.textContent = 'Dynamic content';
  
  // Clean up when done
  setTimeout(() => {
    elementPool.release(element);
  }, 1000);
  
  return element;
}</code></pre>
        </div>
        
        <div class="code-example">
          <h4>Debounced and Throttled Operations</h4>
          <pre><code class="language-typescript">
// hooks/useDebounce.ts
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// hooks/useThrottle.ts
import { useRef } from 'react';

export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastCallTime = useRef<number>(0);

  return ((...args: any[]) => {
    const now = Date.now();
    
    if (now - lastCallTime.current >= delay) {
      lastCallTime.current = now;
      return callback(...args);
    }
  }) as T;
}

// Usage in search component
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);
  
  const throttledScrollHandler = useThrottle(() => {
    // Handle scroll event
    console.log('Scroll event throttled');
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', throttledScrollHandler);
    return () => window.removeEventListener('scroll', throttledScrollHandler);
  }, [throttledScrollHandler]);

  useEffect(() => {
    if (debouncedSearch) {
      // Perform search with debounced value
      performSearch(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="Search..."
    />
  );
}</code></pre>
        </div>
        
        <div class="code-example">
          <h4>Optimized Re-rendering</h4>
          <pre><code class="language-typescript">
// components/OptimizedList.tsx
import { memo, useMemo, useCallback } from 'react';

interface ListItemProps {
  id: string;
  title: string;
  onItemClick: (id: string) => void;
  isSelected: boolean;
}

// Memoized list item to prevent unnecessary re-renders
const ListItem = memo(function ListItem({ 
  id, 
  title, 
  onItemClick, 
  isSelected 
}: ListItemProps) {
  const handleClick = useCallback(() => {
    onItemClick(id);
  }, [id, onItemClick]);

  return (
    <div
      className={\`list-item \${isSelected ? 'selected' : ''}\`}
      onClick={handleClick}
    >
      {title}
    </div>
  );
});

interface OptimizedListProps {
  items: Array<{ id: string; title: string }>;
  selectedId?: string;
  onItemSelect: (id: string) => void;
}

export function OptimizedList({ items, selectedId, onItemSelect }: OptimizedListProps) {
  const handleItemClick = useCallback((id: string) => {
    onItemSelect(id);
  }, [onItemSelect]);

  const memoizedItems = useMemo(() => items.map(item => ({
    ...item,
    isSelected: item.id === selectedId
  })), [items, selectedId]);

  return (
    <div className="optimized-list">
      {memoizedItems.map(item => (
        <ListItem
          key={item.id}
          id={item.id}
          title={item.title}
          onItemClick={handleItemClick}
          isSelected={item.isSelected}
        />
      ))}
    </div>
  );
}</code></pre>
        </div>
      `
    },
    
    {
      id: "best-practices",
      title: "Performance Best Practices",
      content: `
        <h3>Development Guidelines</h3>
        
        <div class="best-practices-grid">
          <div class="practice-card">
            <h4>🚀 Loading Optimization</h4>
            <ul>
              <li>Implement progressive loading for large datasets</li>
              <li>Use skeleton screens during content loading</li>
              <li>Preload critical resources</li>
              <li>Optimize images with modern formats (WebP, AVIF)</li>
              <li>Use responsive images with srcset</li>
            </ul>
          </div>
          
          <div class="practice-card">
            <h4>💾 Memory Management</li>
            <ul>
              <li>Clean up event listeners in useEffect cleanup</li>
              <li>Use object pooling for frequently created objects</li>
              <li>Implement proper cleanup in custom hooks</li>
              <li>Avoid memory leaks in closures</li>
              <li>Use WeakMap for caching with automatic cleanup</li>
            </ul>
          </div>
          
          <div class="practice-card">
            <h4>🎨 Rendering Optimization</li>
            <ul>
              <li>Memoize expensive calculations with useMemo</li>
              <li>Use React.memo for pure components</li>
              <li>Implement proper key props for lists</li>
              <li>Avoid inline objects and functions in JSX</li>
              <li>Use useCallback for event handlers</li>
            </ul>
          </div>
          
          <div class="practice-card">
            <h4>📊 Monitoring & Analytics</li>
            <ul>
              <li>Track Core Web Vitals continuously</li>
              <li>Monitor bundle sizes with automated checks</li>
              <li>Set up performance budgets in CI/CD</li>
              <li>Implement custom performance metrics</li>
              <li>Use browser dev tools regularly</li>
            </ul>
          </div>
        </div>
        
        <h3>Performance Budgets</h3>
        <div class="budget-table">
          <table>
            <thead>
              <tr>
                <th>Metric</th>
                <th>Target</th>
                <th>Warning</th>
                <th>Critical</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>JavaScript Bundle Size</td>
                <td>< 250KB gzipped</td>
                <td>300KB</td>
                <td>500KB</td>
              </tr>
              <tr>
                <td>CSS Bundle Size</td>
                <td>< 50KB gzipped</td>
                <td>75KB</td>
                <td>100KB</td>
              </tr>
              <tr>
                <td>First Contentful Paint</td>
                <td>< 1.8s</td>
                <td>2.5s</td>
                <td>3.0s</td>
              </tr>
              <tr>
                <td>Largest Contentful Paint</td>
                <td>< 2.5s</td>
                <td>3.0s</td>
                <td>4.0s</td>
              </tr>
              <tr>
                <td>First Input Delay</td>
                <td>< 100ms</td>
                <td>200ms</td>
                <td>300ms</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <h3>Tooling Recommendations</h3>
        <div class="tools-grid">
          <div class="tool-category">
            <h4>Analysis Tools</h4>
            <ul>
              <li><strong>Lighthouse:</strong> Comprehensive performance auditing</li>
              <li><strong>Bundle Analyzer:</strong> Visualize bundle composition</li>
              <li><strong>React DevTools:</strong> Performance profiling for React apps</li>
              <li><strong>Chrome DevTools:</strong> Performance, Memory, and Network analysis</li>
            </ul>
          </div>
          
          <div class="tool-category">
            <h4>Monitoring Solutions</h4>
            <ul>
              <li><strong>Sentry:</strong> Error tracking with performance monitoring</li>
              <li><strong>New Relic:</strong> Full-stack performance monitoring</li>
              <li><strong>Datadog:</strong> Infrastructure and application monitoring</li>
              <li><strong>Web Vitals Chrome Extension:</strong> Real-time metrics</li>
            </ul>
          </div>
        </div>
      `
    }
  ]
};