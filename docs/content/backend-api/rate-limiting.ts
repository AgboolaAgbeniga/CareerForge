// Backend API Rate Limiting Content
import { PageContent } from '@/lib/content-types'

export const backendApiRateLimitingContent: PageContent = {
  metadata: {
    title: "Rate Limiting",
    description: "Comprehensive guide to rate limiting policies, implementation strategies, and client handling in the CareerForge backend API",
    version: "1.0.0",
    lastUpdated: "2025-12-28",
    authors: ["Backend Engineering Team"],
    tags: ["api", "rate-limiting", "throttling", "performance", "security"],
    difficulty: "intermediate",
    estimatedTime: 15
  },
  tableOfContents: [
    { id: "rate-limiting-overview", title: "Rate Limiting Overview", level: 1 },
    { id: "rate-limiting-strategies", title: "Rate Limiting Strategies", level: 1 },
    { id: "implementation-details", title: "Implementation Details", level: 1 },
    { id: "rate-limit-headers", title: "Rate Limit Headers", level: 1 },
    { id: "client-handling", title: "Client Handling", level: 1 },
    { id: "configuration", title: "Configuration & Tuning", level: 1 },
    { id: "monitoring", title: "Monitoring & Analytics", level: 1 },
    { id: "best-practices", title: "Best Practices", level: 1 }
  ],
  introduction: {
    id: "introduction",
    title: "Rate Limiting in CareerForge API",
    content: `Rate limiting is a crucial mechanism for protecting our API from abuse, ensuring fair resource allocation, and maintaining system stability. The CareerForge Backend API implements sophisticated rate limiting strategies that balance user experience with system protection. This guide covers our rate limiting policies, implementation details, and best practices for developers.`
  },
  sections: [
    {
      id: "rate-limiting-overview",
      title: "Rate Limiting Overview",
      content: `Rate limiting controls the number of requests a client can make to our API within a specified time window. This prevents abuse, ensures fair resource distribution, and protects against denial-of-service attacks.

### Why Rate Limiting Matters

- **System Protection**: Prevents server overload and maintains availability
- **Fair Usage**: Ensures all users get equitable access to resources
- **Cost Control**: Helps manage infrastructure costs by controlling usage patterns
- **Security**: Mitigates brute force attacks and abuse attempts
- **Quality of Service**: Maintains consistent performance for all users

### Rate Limiting in CareerForge

Our API uses multiple rate limiting tiers based on endpoint sensitivity and resource consumption:

- **Public Endpoints**: Generous limits for general API access
- **Authenticated Endpoints**: Moderate limits with user-specific tracking
- **Resource-Intensive Operations**: Stricter limits for computationally expensive operations
- **Administrative Endpoints**: Very restrictive limits for admin operations

### Rate Limit Categories

- **Per-User Limits**: Based on authenticated user identity
- **Per-IP Limits**: Fallback limits for unauthenticated requests
- **Per-Endpoint Limits**: Specific limits for high-value or expensive endpoints
- **Burst Limits**: Allow short-term traffic spikes while preventing sustained abuse`,
      calloutBoxes: [
        {
          type: "info",
          title: "Rate Limiting Philosophy",
          content: "We design rate limits to protect the system while allowing legitimate use cases. Limits are generous enough for normal application usage but restrictive enough to prevent abuse."
        }
      ]
    },
    {
      id: "rate-limiting-strategies",
      title: "Rate Limiting Strategies",
      content: `We employ multiple rate limiting algorithms depending on the use case and requirements. Each strategy has different characteristics for accuracy, memory usage, and performance.

### Fixed Window

The simplest approach - count requests within fixed time windows (e.g., 100 requests per minute).

**Pros:**
- Simple to implement and understand
- Low memory overhead
- Easy to configure

**Cons:**
- Allows burst traffic at window boundaries
- Not smooth for high-frequency requests

\`\`\`typescript
class FixedWindowLimiter {
  private requests = new Map<string, { count: number; resetTime: number }>();

  isAllowed(key: string, limit: number, windowMs: number): boolean {
    const now = Date.now();
    const windowKey = key;

    const current = this.requests.get(windowKey);
    if (!current || now > current.resetTime) {
      this.requests.set(windowKey, { count: 1, resetTime: now + windowMs });
      return true;
    }

    if (current.count >= limit) {
      return false;
    }

    current.count++;
    return true;
  }
}
\`\`\`

### Sliding Window

Tracks requests in a moving time window for smoother rate limiting.

**Pros:**
- Smoother rate limiting than fixed windows
- More accurate for burst control
- Better user experience

**Cons:**
- More complex implementation
- Higher memory usage

\`\`\`typescript
class SlidingWindowLimiter {
  private requests = new Map<string, number[]>();

  isAllowed(key: string, limit: number, windowMs: number): boolean {
    const now = Date.now();
    const windowStart = now - windowMs;

    const timestamps = this.requests.get(key) || [];
    const validTimestamps = timestamps.filter(ts => ts > windowStart);

    if (validTimestamps.length >= limit) {
      return false;
    }

    validTimestamps.push(now);
    this.requests.set(key, validTimestamps);
    return true;
  }
}
\`\`\`

### Token Bucket

Allows burst traffic while maintaining average rate limits.

**Pros:**
- Allows natural traffic patterns with bursts
- Smooth rate limiting
- Configurable burst capacity

**Cons:**
- More complex to tune
- Requires careful parameter selection

\`\`\`typescript
class TokenBucketLimiter {
  private buckets = new Map<string, { tokens: number; lastRefill: number }>();

  constructor(
    private capacity: number,
    private refillRate: number // tokens per millisecond
  ) {}

  isAllowed(key: string, tokensRequired: number = 1): boolean {
    const now = Date.now();
    const bucket = this.buckets.get(key);

    if (!bucket) {
      this.buckets.set(key, { tokens: this.capacity, lastRefill: now });
      return true;
    }

    // Refill tokens based on time passed
    const timePassed = now - bucket.lastRefill;
    const tokensToAdd = timePassed * this.refillRate;
    bucket.tokens = Math.min(this.capacity, bucket.tokens + tokensToAdd);
    bucket.lastRefill = now;

    if (bucket.tokens >= tokensRequired) {
      bucket.tokens -= tokensRequired;
      return true;
    }

    return false;
  }
}
\`\`\`

### Leaky Bucket

Smooths traffic by processing requests at a constant rate.

**Pros:**
- Very smooth output rate
- Good for resource-constrained systems
- Prevents resource exhaustion

**Cons:**
- Can cause request queuing
- May introduce latency`,
      codeExamples: [
        {
          id: "rate-limit-algorithms",
          title: "Rate Limiting Algorithm Comparison",
          description: "Comparison of different rate limiting approaches",
          language: "typescript",
          code: `interface RateLimitAlgorithm {
  isAllowed(key: string, limit: number, windowMs: number): boolean;
}

interface RateLimitConfig {
  algorithm: 'fixed' | 'sliding' | 'token-bucket';
  limit: number;
  windowMs: number;
  burstLimit?: number; // For token bucket
}

// Usage examples
const configs: Record<string, RateLimitConfig> = {
  // General API endpoints
  general: {
    algorithm: 'sliding',
    limit: 1000,
    windowMs: 60 * 1000 // 1 minute
  },

  // Authentication endpoints
  auth: {
    algorithm: 'fixed',
    limit: 5,
    windowMs: 15 * 60 * 1000 // 15 minutes
  },

  // Search endpoints
  search: {
    algorithm: 'token-bucket',
    limit: 100,
    windowMs: 60 * 1000,
    burstLimit: 20
  }
};`
        }
      ]
    },
    {
      id: "implementation-details",
      title: "Implementation Details",
      content: `Our rate limiting implementation uses Redis for distributed rate limiting across multiple server instances. We combine multiple strategies based on endpoint characteristics and user context.

### Distributed Rate Limiting

\`\`\`typescript
import Redis from 'ioredis';

class DistributedRateLimiter {
  constructor(private redis: Redis) {}

  async isAllowed(
    key: string,
    limit: number,
    windowMs: number,
    strategy: 'fixed' | 'sliding' = 'fixed'
  ): Promise<boolean> {
    const now = Date.now();
    const windowKey = \`\${key}:\${Math.floor(now / windowMs)}\`;

    if (strategy === 'sliding') {
      // Use sorted set for sliding window
      const member = \`\${now}:\${Math.random()}\`;

      // Add current request
      await this.redis.zadd(key, now, member);

      // Remove old requests outside window
      await this.redis.zremrangebyscore(key, 0, now - windowMs);

      // Count requests in current window
      const count = await this.redis.zcard(key);

      // Clean up old members periodically
      if (Math.random() < 0.01) { // 1% chance
        await this.redis.zremrangebyscore(key, 0, now - windowMs * 2);
      }

      return count <= limit;
    } else {
      // Fixed window with Redis
      const count = await this.redis.incr(windowKey);

      if (count === 1) {
        await this.redis.expire(windowKey, Math.ceil(windowMs / 1000));
      }

      return count <= limit;
    }
  }
}
\`\`\`

### Rate Limit Middleware

\`\`\`typescript
import { Request, Response, NextFunction } from 'express';

interface RateLimitOptions {
  keyGenerator?: (req: Request) => string;
  skipSuccessfulRequests?: boolean;
  skipFailedRequests?: boolean;
  handler?: (req: Request, res: Response) => void;
}

export class RateLimitMiddleware {
  constructor(
    private limiter: DistributedRateLimiter,
    private options: RateLimitOptions = {}
  ) {}

  middleware(limit: number, windowMs: number) {
    return async (req: Request, res: Response, next: NextFunction) => {
      const key = this.options.keyGenerator?.(req) ||
                  (req.user?.id ? \`user:\${req.user.id}\` : \`ip:\${req.ip}\`);

      const allowed = await this.limiter.isAllowed(key, limit, windowMs);

      if (!allowed) {
        res.set({
          'X-RateLimit-Limit': limit.toString(),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': (Date.now() + windowMs).toString(),
          'Retry-After': Math.ceil(windowMs / 1000).toString()
        });

        if (this.options.handler) {
          return this.options.handler(req, res);
        }

        return res.status(429).json({
          success: false,
          error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many requests. Please try again later.',
            details: {
              limit,
              windowMs,
              resetTime: new Date(Date.now() + windowMs).toISOString()
            },
            suggestion: \`Wait \${Math.ceil(windowMs / 1000)} seconds before retrying\`,
            traceId: req.headers['x-trace-id'] || 'unknown'
          }
        });
      }

      // Set rate limit headers for successful requests
      const remaining = Math.max(0, limit - 1); // Approximate
      res.set({
        'X-RateLimit-Limit': limit.toString(),
        'X-RateLimit-Remaining': remaining.toString(),
        'X-RateLimit-Reset': (Date.now() + windowMs).toString()
      });

      next();
    };
  }
}
\`\`\`

### Endpoint-Specific Limits

\`\`\`typescript
// Rate limiting configuration by endpoint
const rateLimitConfigs = {
  // Public endpoints
  'GET /api/jobs': { limit: 1000, windowMs: 60 * 1000 },
  'GET /api/companies': { limit: 500, windowMs: 60 * 1000 },

  // Authentication endpoints
  'POST /api/auth/login': { limit: 5, windowMs: 15 * 60 * 1000 },
  'POST /api/auth/register': { limit: 3, windowMs: 60 * 60 * 1000 },

  // Write operations
  'POST /api/jobs': { limit: 10, windowMs: 60 * 1000 },
  'PUT /api/jobs/:id': { limit: 20, windowMs: 60 * 1000 },
  'POST /api/applications': { limit: 5, windowMs: 60 * 1000 },

  // Search endpoints
  'GET /api/search': { limit: 100, windowMs: 60 * 1000 },

  // Admin endpoints
  'DELETE /api/*': { limit: 1, windowMs: 60 * 1000 }
};
\`\`\``,
      calloutBoxes: [
        {
          type: "warning",
          title: "Redis Dependency",
          content: "Rate limiting relies on Redis for distributed state. Ensure Redis is highly available and properly configured for production use."
        }
      ]
    },
    {
      id: "rate-limit-headers",
      title: "Rate Limit Headers",
      content: `We follow RFC 6585 and industry standards for rate limit headers to provide clients with clear information about their current usage and limits.

### Standard Headers

- **X-RateLimit-Limit**: Maximum number of requests allowed in the current window
- **X-RateLimit-Remaining**: Number of requests remaining in the current window
- **X-RateLimit-Reset**: Unix timestamp when the rate limit resets
- **Retry-After**: Seconds to wait before retrying (sent with 429 responses)

### Example Headers

\`\`\`http
HTTP/1.1 200 OK
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640995200
Content-Type: application/json

{
  "data": "..."
}
\`\`\`

### Rate Limit Exceeded Response

\`\`\`http
HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1640995200
Retry-After: 60
Content-Type: application/json

{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later.",
    "details": {
      "limit": 1000,
      "windowMs": 60000,
      "resetTime": "2025-12-28T14:15:00.000Z"
    },
    "suggestion": "Wait 60 seconds before retrying",
    "traceId": "abc-123-def-456"
  }
}
\`\`\`

### TypeScript Interface

\`\`\`typescript
interface RateLimitHeaders {
  'X-RateLimit-Limit': string;
  'X-RateLimit-Remaining': string;
  'X-RateLimit-Reset': string;
  'Retry-After'?: string;
}

interface RateLimitInfo {
  limit: number;
  remaining: number;
  resetTime: Date;
  retryAfter?: number;
}

function parseRateLimitHeaders(headers: Record<string, string>): RateLimitInfo {
  return {
    limit: parseInt(headers['X-RateLimit-Limit']),
    remaining: parseInt(headers['X-RateLimit-Remaining']),
    resetTime: new Date(parseInt(headers['X-RateLimit-Reset']) * 1000),
    retryAfter: headers['Retry-After'] ? parseInt(headers['Retry-After']) : undefined
  };
}
\`\`\``,
      codeExamples: [
        {
          id: "rate-limit-client",
          title: "Client-Side Rate Limit Handling",
          description: "How to handle rate limits in API clients",
          language: "typescript",
          code: `class ApiClient {
  private rateLimitInfo?: RateLimitInfo;

  async request(url: string, options: RequestInit = {}): Promise<any> {
    const response = await fetch(url, options);

    // Parse rate limit headers
    this.rateLimitInfo = parseRateLimitHeaders({
      'X-RateLimit-Limit': response.headers.get('X-RateLimit-Limit') || '',
      'X-RateLimit-Remaining': response.headers.get('X-RateLimit-Remaining') || '',
      'X-RateLimit-Reset': response.headers.get('X-RateLimit-Reset') || '',
      'Retry-After': response.headers.get('Retry-After') || ''
    });

    if (response.status === 429) {
      const error = await response.json();

      // Calculate wait time
      const waitTime = this.rateLimitInfo.retryAfter
        ? this.rateLimitInfo.retryAfter * 1000
        : this.rateLimitInfo.resetTime.getTime() - Date.now();

      throw new RateLimitError(
        error.error.message,
        waitTime,
        this.rateLimitInfo
      );
    }

    return response.json();
  }

  getRateLimitInfo(): RateLimitInfo | undefined {
    return this.rateLimitInfo;
  }
}

class RateLimitError extends Error {
  constructor(
    message: string,
    public waitTime: number,
    public rateLimitInfo: RateLimitInfo
  ) {
    super(message);
    this.name = 'RateLimitError';
  }
}`
        }
      ]
    },
    {
      id: "client-handling",
      title: "Client Handling",
      content: `Proper client-side rate limit handling is crucial for building resilient applications. Implement intelligent retry logic and respect rate limit headers.

### Exponential Backoff with Jitter

\`\`\`typescript
class RateLimitHandler {
  private baseDelay = 1000; // 1 second
  private maxDelay = 30000; // 30 seconds
  private maxRetries = 3;

  async executeWithBackoff<T>(
    operation: () => Promise<T>,
    rateLimitInfo?: RateLimitInfo
  ): Promise<T> {
    let attempt = 0;

    while (attempt < this.maxRetries) {
      try {
        return await operation();
      } catch (error) {
        if (!(error instanceof RateLimitError)) {
          throw error; // Not a rate limit error
        }

        attempt++;

        if (attempt >= this.maxRetries) {
          throw error; // Max retries exceeded
        }

        // Calculate delay
        let delay: number;

        if (rateLimitInfo?.retryAfter) {
          // Use server-provided retry time
          delay = rateLimitInfo.retryAfter * 1000;
        } else {
          // Exponential backoff with jitter
          const exponentialDelay = this.baseDelay * Math.pow(2, attempt - 1);
          const jitter = Math.random() * 1000; // Up to 1 second jitter
          delay = Math.min(exponentialDelay + jitter, this.maxDelay);
        }

        console.warn(\`Rate limited. Retrying in \${delay}ms (attempt \${attempt}/\${this.maxRetries})\`);

        await this.sleep(delay);
      }
    }

    throw new Error('Max retries exceeded');
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
\`\`\`

### Queue-Based Request Management

\`\`\`typescript
class RequestQueue {
  private queue: Array<{ request: () => Promise<any>; resolve: Function; reject: Function }> = [];
  private processing = false;
  private rateLimitInfo?: RateLimitInfo;

  async enqueue<T>(request: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push({ request, resolve, reject });
      this.processQueue();
    });
  }

  private async processQueue(): Promise<void> {
    if (this.processing || this.queue.length === 0) {
      return;
    }

    this.processing = true;

    while (this.queue.length > 0) {
      const { request, resolve, reject } = this.queue.shift()!;

      try {
        // Check if we need to wait due to rate limiting
        if (this.rateLimitInfo && this.rateLimitInfo.remaining === 0) {
          const waitTime = this.rateLimitInfo.resetTime.getTime() - Date.now();
          if (waitTime > 0) {
            await this.sleep(waitTime);
          }
        }

        const result = await request();
        resolve(result);
      } catch (error) {
        if (error instanceof RateLimitError) {
          // Re-queue the request with backoff
          this.rateLimitInfo = error.rateLimitInfo;
          setTimeout(() => {
            this.queue.unshift({ request, resolve, reject });
            this.processQueue();
          }, error.waitTime);
        } else {
          reject(error);
        }
      }
    }

    this.processing = false;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
\`\`\`

### React Hook for Rate Limiting

\`\`\`typescript
import { useState, useCallback } from 'react';

interface UseRateLimitReturn {
  execute: <T>(operation: () => Promise<T>) => Promise<T>;
  rateLimitInfo: RateLimitInfo | null;
  isRateLimited: boolean;
}

export function useRateLimit(): UseRateLimitReturn {
  const [rateLimitInfo, setRateLimitInfo] = useState<RateLimitInfo | null>(null);
  const [isRateLimited, setIsRateLimited] = useState(false);

  const execute = useCallback(async <T,>(operation: () => Promise<T>): Promise<T> => {
    try {
      setIsRateLimited(false);
      const result = await operation();
      return result;
    } catch (error) {
      if (error instanceof RateLimitError) {
        setRateLimitInfo(error.rateLimitInfo);
        setIsRateLimited(true);

        // Auto-retry after the specified time
        setTimeout(() => {
          setIsRateLimited(false);
        }, error.waitTime);

        throw error;
      }
      throw error;
    }
  }, []);

  return { execute, rateLimitInfo, isRateLimited };
}

// Usage in component
function JobSearchComponent() {
  const { execute, isRateLimited, rateLimitInfo } = useRateLimit();

  const searchJobs = async (query: string) => {
    return execute(() => api.searchJobs(query));
  };

  return (
    <div>
      {isRateLimited && (
        <div className="rate-limit-warning">
          Rate limited. Try again in {rateLimitInfo?.retryAfter} seconds.
        </div>
      )}
      <button onClick={() => searchJobs('developer')} disabled={isRateLimited}>
        Search Jobs
      </button>
    </div>
  );
}
\`\`\``,
      lists: [
        {
          type: "ordered",
          items: [
            "Always check rate limit headers in responses",
            "Implement exponential backoff for retries",
            "Use jitter to prevent thundering herd problems",
            "Queue requests when rate limited",
            "Provide user feedback about rate limiting status"
          ]
        }
      ]
    },
    {
      id: "configuration",
      title: "Configuration & Tuning",
      content: `Rate limiting configuration requires careful tuning based on traffic patterns, resource constraints, and business requirements.

### Configuration Structure

\`\`\`typescript
interface RateLimitTier {
  name: string;
  limit: number;
  windowMs: number;
  burstLimit?: number;
  strategy: 'fixed' | 'sliding' | 'token-bucket';
}

interface RateLimitConfig {
  global: RateLimitTier;
  endpoints: Record<string, RateLimitTier>;
  userTiers: Record<string, RateLimitTier>;
  ipFallback: RateLimitTier;
}

const rateLimitConfig: RateLimitConfig = {
  // Global defaults
  global: {
    name: 'global',
    limit: 1000,
    windowMs: 60 * 1000, // 1 minute
    strategy: 'sliding'
  },

  // Endpoint-specific overrides
  endpoints: {
    'POST /api/auth/login': {
      name: 'auth-login',
      limit: 5,
      windowMs: 15 * 60 * 1000, // 15 minutes
      strategy: 'fixed'
    },
    'GET /api/search': {
      name: 'search',
      limit: 100,
      windowMs: 60 * 1000,
      burstLimit: 20,
      strategy: 'token-bucket'
    }
  },

  // User tier overrides (based on subscription)
  userTiers: {
    free: {
      name: 'free-tier',
      limit: 500,
      windowMs: 60 * 1000,
      strategy: 'sliding'
    },
    premium: {
      name: 'premium-tier',
      limit: 5000,
      windowMs: 60 * 1000,
      strategy: 'sliding'
    }
  },

  // IP-based fallback for unauthenticated requests
  ipFallback: {
    name: 'ip-fallback',
    limit: 100,
    windowMs: 60 * 1000,
    strategy: 'fixed'
  }
};
\`\`\`

### Dynamic Configuration

\`\`\`typescript
class DynamicRateLimiter {
  constructor(private configService: ConfigService) {}

  async getRateLimitForRequest(req: Request): Promise<RateLimitTier> {
    // Check user-specific limits
    if (req.user?.tier) {
      const userTier = await this.configService.getUserTier(req.user.tier);
      if (userTier) return userTier;
    }

    // Check endpoint-specific limits
    const endpointKey = \`\${req.method} \${req.route?.path}\`;
    const endpointLimit = await this.configService.getEndpointLimit(endpointKey);
    if (endpointLimit) return endpointLimit;

    // Return global default
    return this.configService.getGlobalLimit();
  }

  // Update limits dynamically
  async updateLimit(tierName: string, newLimit: Partial<RateLimitTier>): Promise<void> {
    await this.configService.updateTier(tierName, newLimit);

    // Notify running instances (via Redis pub/sub or similar)
    await this.notifyInstances('rate-limit-updated', { tierName, newLimit });
  }
}
\`\`\`

### Load-Based Scaling

\`\`\`typescript
class AdaptiveRateLimiter {
  constructor(
    private baseLimit: number,
    private loadThreshold: number = 0.8,
    private adjustmentFactor: number = 0.9
  ) {}

  async getAdaptiveLimit(currentLoad: number): Promise<number> {
    if (currentLoad > this.loadThreshold) {
      // Reduce limits when system is under load
      const reductionFactor = Math.max(0.5, 1 - (currentLoad - this.loadThreshold));
      return Math.floor(this.baseLimit * reductionFactor);
    }

    return this.baseLimit;
  }

  async monitorAndAdjust(): Promise<void> {
    // Monitor system load every minute
    setInterval(async () => {
      const systemLoad = await this.getSystemLoad();
      const newLimit = await this.getAdaptiveLimit(systemLoad);

      if (newLimit !== this.currentLimit) {
        await this.updateRateLimit(newLimit);
        console.log(\`Adjusted rate limit to \${newLimit} due to load \${systemLoad}\`);
      }
    }, 60 * 1000);
  }

  private async getSystemLoad(): Promise<number> {
    // Implementation depends on your monitoring system
    // Could be CPU usage, response time, queue length, etc.
    return 0.75; // Example
  }
}
\`\`\``,
      calloutBoxes: [
        {
          type: "success",
          title: "Configuration Best Practices",
          content: "Start with generous limits and gradually tighten them based on usage patterns and system performance. Monitor the impact of changes carefully."
        }
      ]
    },
    {
      id: "monitoring",
      title: "Monitoring & Analytics",
      content: `Effective monitoring is essential for tuning rate limits and ensuring they provide the right balance of protection and usability.

### Rate Limiting Metrics

\`\`\`typescript
import { collectDefaultMetrics, Gauge, Counter, Histogram } from 'prom-client';

class RateLimitMetrics {
  private static rateLimitHits = new Counter({
    name: 'rate_limit_hits_total',
    help: 'Total number of rate limit hits',
    labelNames: ['endpoint', 'user_tier', 'strategy']
  });

  private static rateLimitExceeded = new Counter({
    name: 'rate_limit_exceeded_total',
    help: 'Total number of rate limit violations',
    labelNames: ['endpoint', 'user_tier', 'strategy']
  });

  private static currentRequests = new Gauge({
    name: 'rate_limit_current_requests',
    help: 'Current number of active requests per user/key',
    labelNames: ['key']
  });

  private static requestLatency = new Histogram({
    name: 'rate_limit_request_duration_seconds',
    help: 'Request duration affected by rate limiting',
    labelNames: ['endpoint', 'rate_limited'],
    buckets: [0.1, 0.5, 1, 2, 5, 10]
  });

  static recordHit(endpoint: string, userTier: string, strategy: string): void {
    this.rateLimitHits.labels(endpoint, userTier, strategy).inc();
  }

  static recordExceeded(endpoint: string, userTier: string, strategy: string): void {
    this.rateLimitExceeded.labels(endpoint, userTier, strategy).inc();
  }

  static setCurrentRequests(key: string, count: number): void {
    this.currentRequests.labels(key).set(count);
  }

  static recordLatency(endpoint: string, duration: number, rateLimited: boolean): void {
    this.requestLatency.labels(endpoint, rateLimited.toString()).observe(duration);
  }
}
\`\`\`

### Monitoring Dashboard

\`\`\`typescript
// Grafana dashboard configuration (simplified)
const rateLimitDashboard = {
  title: 'Rate Limiting Overview',
  panels: [
    {
      title: 'Rate Limit Hit Rate',
      type: 'graph',
      targets: [{
        expr: 'rate(rate_limit_hits_total[5m]) / rate(rate_limit_hits_total[5m]) + rate(rate_limit_exceeded_total[5m])'
      }]
    },
    {
      title: 'Rate Limit Violations by Endpoint',
      type: 'table',
      targets: [{
        expr: 'rate(rate_limit_exceeded_total[5m])',
        legendFormat: '{{endpoint}}'
      }]
    },
    {
      title: 'Top Rate Limited Users',
      type: 'table',
      targets: [{
        expr: 'topk(10, rate(rate_limit_exceeded_total[1h])) by (user_id)'
      }]
    }
  ]
};
\`\`\`

### Alerting Rules

\`\`\`yaml
# Prometheus alerting rules for rate limiting
groups:
  - name: rate_limiting
    rules:
      - alert: HighRateLimitViolationRate
        expr: rate(rate_limit_exceeded_total[5m]) / (rate(rate_limit_hits_total[5m]) + rate(rate_limit_exceeded_total[5m])) > 0.1
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High rate limit violation rate detected"
          description: "Rate limit violation rate is {{ $value | humanizePercentage }}"

      - alert: RateLimitStorm
        expr: increase(rate_limit_exceeded_total[1m]) > 100
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Rate limit storm detected"
          description: "Sudden spike in rate limit violations: {{ $value }} in 1 minute"

      - alert: UserRateLimitAbuse
        expr: rate(rate_limit_exceeded_total[5m]) > 10
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "Potential rate limit abuse by user"
          description: "User {{ $labels.user_id }} exceeded rate limits {{ $value }} times per minute"
\`\`\`

### Analytics & Reporting

\`\`\`typescript
class RateLimitAnalytics {
  async generateReport(timeRange: { start: Date; end: Date }): Promise<RateLimitReport> {
    const metrics = await this.fetchMetrics(timeRange);

    return {
      summary: {
        totalRequests: metrics.totalHits + metrics.totalExceeded,
        violationRate: metrics.totalExceeded / (metrics.totalHits + metrics.totalExceeded),
        topViolatedEndpoints: metrics.endpointViolations.slice(0, 10),
        peakUsageTimes: this.analyzePeakTimes(metrics)
      },
      recommendations: this.generateRecommendations(metrics),
      trends: this.analyzeTrends(metrics)
    };
  }

  private generateRecommendations(metrics: any): string[] {
    const recommendations = [];

    if (metrics.violationRate > 0.05) {
      recommendations.push('Consider increasing rate limits for high-traffic endpoints');
    }

    if (metrics.endpointViolations.length > 0) {
      recommendations.push('Review rate limits for frequently violated endpoints');
    }

    return recommendations;
  }
}
\`\`\``,
      lists: [
        {
          type: "unordered",
          items: [
            "Monitor rate limit hit rates and violation patterns",
            "Track performance impact of rate limiting",
            "Set up alerts for unusual rate limit activity",
            "Analyze usage patterns to optimize limits",
            "Generate regular reports on rate limiting effectiveness"
          ]
        }
      ]
    },
    {
      id: "best-practices",
      title: "Best Practices",
      content: `Follow these best practices to implement effective rate limiting that protects your system while providing a good user experience.

### Design Principles

1. **Start Generous**: Begin with higher limits and reduce based on actual usage patterns
2. **Layered Protection**: Combine multiple rate limiting strategies for comprehensive protection
3. **User Context**: Consider user tiers, history, and behavior when setting limits
4. **Transparent Communication**: Clearly communicate limits and provide helpful error messages
5. **Graceful Degradation**: Allow some burst traffic while preventing sustained abuse

### Implementation Best Practices

\`\`\`typescript
// Best practice: Use multiple keys for comprehensive limiting
class MultiKeyRateLimiter {
  private limiters: RateLimiter[] = [];

  constructor() {
    // User-based limiting
    this.limiters.push(new UserRateLimiter());

    // IP-based limiting as fallback
    this.limiters.push(new IPRateLimiter());

    // Endpoint-specific limiting
    this.limiters.push(new EndpointRateLimiter());
  }

  async isAllowed(req: Request): Promise<boolean> {
    // Check all limiters - fail if any block the request
    for (const limiter of this.limiters) {
      if (!(await limiter.isAllowed(req))) {
        return false;
      }
    }
    return true;
  }
}

// Best practice: Implement rate limit exemptions for critical operations
class RateLimitExemptionManager {
  private exemptions = new Set<string>();

  addExemption(key: string): void {
    this.exemptions.add(key);
  }

  isExempt(key: string): boolean {
    return this.exemptions.has(key);
  }

  // Example: Exempt admin operations during emergencies
  grantEmergencyAccess(adminId: string): void {
    const emergencyKey = \`emergency:\${adminId}\`;
    this.addExemption(emergencyKey);

    // Auto-expire after 1 hour
    setTimeout(() => {
      this.exemptions.delete(emergencyKey);
    }, 60 * 60 * 1000);
  }
}
\`\`\`

### Client-Side Best Practices

1. **Respect Headers**: Always check and respect rate limit headers
2. **Implement Backoff**: Use exponential backoff with jitter for retries
3. **Queue Requests**: Queue requests when rate limited instead of immediate retry
4. **User Feedback**: Inform users about rate limiting status and retry times
5. **Caching**: Use client-side caching to reduce API calls

### Monitoring Best Practices

1. **Comprehensive Metrics**: Track hits, violations, latency impact, and user experience
2. **Alert Thresholds**: Set appropriate alert thresholds based on your traffic patterns
3. **Regular Review**: Regularly review and adjust limits based on usage data
4. **A/B Testing**: Test rate limit changes with small user groups first
5. **Documentation**: Keep rate limiting policies well-documented and communicated

### Common Pitfalls to Avoid

- **Too Restrictive**: Don't set limits so low they break legitimate use cases
- **No Monitoring**: Implement monitoring before going to production
- **Static Limits**: Use dynamic limits that can adapt to traffic patterns
- **Poor Error Messages**: Provide clear, actionable error messages
- **No Exemptions**: Have mechanisms for legitimate high-volume use cases

### Testing Rate Limits

\`\`\`typescript
describe('Rate Limiting', () => {
  it('should allow requests within limits', async () => {
    for (let i = 0; i < 10; i++) {
      const response = await request(app)
        .get('/api/test')
        .expect(200);
    }
  });

  it('should block requests over limit', async () => {
    // Exhaust the limit
    for (let i = 0; i < 10; i++) {
      await request(app).get('/api/test').expect(200);
    }

    // Next request should be blocked
    await request(app)
      .get('/api/test')
      .expect(429)
      .expect('X-RateLimit-Remaining', '0');
  });

  it('should reset limits after window', async () => {
    // Use up the limit
    for (let i = 0; i < 10; i++) {
      await request(app).get('/api/test').expect(200);
    }

    // Wait for reset (mock time in tests)
    jest.advanceTimersByTime(60000);

    // Should allow requests again
    await request(app).get('/api/test').expect(200);
  });
});
\`\`\``,
      lists: [
        {
          type: "unordered",
          items: [
          "Start with generous limits and tune based on real usage",
          "Implement comprehensive monitoring and alerting",
          "Use multiple rate limiting strategies for layered protection",
          "Provide clear feedback to users about rate limiting",
          "Regularly review and adjust limits based on analytics",
          "Test rate limiting thoroughly in staging environments",
          "Have exemption mechanisms for legitimate high-volume use cases"
          ]
        }
      ]
    }
  ],
  nextSteps: {
    title: "Next Steps",
    links: [
      {
        text: "Error Handling Guide",
        href: "/docs/backend-api/error-handling",
        description: "Comprehensive error handling patterns and responses"
      },
      {
        text: "API Versioning",
        href: "/docs/backend-api/versioning",
        description: "API versioning strategies and migration guides"
      },
      {
        text: "SDK Documentation",
        href: "/docs/backend-api/sdk",
        description: "Official SDKs with built-in rate limit handling"
      }
    ]
  },
  relatedResources: [
    {
      text: "Authentication Guide",
      href: "/docs/backend-api/authentication",
      description: "Authentication mechanisms and rate limiting integration"
    },
    {
      text: "API Reference",
      href: "/docs/backend-api/reference",
      description: "Complete endpoint documentation with rate limits"
    },
    {
      text: "Monitoring & Observability",
      href: "/docs/architecture/monitoring",
      description: "System monitoring and rate limiting metrics"
    }
  ]
}