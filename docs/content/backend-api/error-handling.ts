// Backend API Error Handling Content
import { PageContent } from '@/lib/content-types'

export const backendApiErrorHandlingContent: PageContent = {
  metadata: {
    title: "Error Handling & Responses",
    description: "Comprehensive guide to error handling patterns, response formats, and troubleshooting in the CareerForge backend API",
    version: "1.0.0",
    lastUpdated: "2025-12-28",
    authors: ["Backend Engineering Team"],
    tags: ["api", "error-handling", "responses", "troubleshooting"],
    difficulty: "intermediate",
    estimatedTime: 12
  },
  tableOfContents: [
    { id: "error-overview", title: "Error Handling Overview", level: 1 },
    { id: "response-format", title: "Error Response Format", level: 1 },
    { id: "error-codes", title: "Error Codes & Categories", level: 1 },
    { id: "client-errors", title: "Client Error Handling", level: 1 },
    { id: "server-errors", title: "Server Error Handling", level: 1 },
    { id: "retry-strategies", title: "Retry Strategies & Backoff", level: 1 },
    { id: "logging-monitoring", title: "Logging & Monitoring", level: 1 },
    { id: "best-practices", title: "Best Practices", level: 1 }
  ],
  introduction: {
    id: "introduction",
    title: "Error Handling in CareerForge API",
    content: `Robust error handling is crucial for building reliable applications. The CareerForge Backend API implements comprehensive error handling patterns that provide clear, actionable feedback to developers and users. This guide covers our error response formats, common error scenarios, and best practices for handling failures gracefully.`
  },
  sections: [
    {
      id: "error-overview",
      title: "Error Handling Overview",
      content: `Our API follows RESTful conventions for error handling with consistent response formats and meaningful error codes. All errors are categorized and include detailed information to help developers diagnose and resolve issues quickly.

### Key Principles

- **Consistency**: All errors follow the same JSON structure
- **Clarity**: Error messages are descriptive and actionable
- **Categorization**: Errors are grouped by type and severity
- **Context**: Additional context provided where helpful
- **Security**: Sensitive information never exposed in errors

### Error Flow

1. **Request Validation**: Input validated before processing
2. **Business Logic**: Domain rules enforced with specific errors
3. **Data Access**: Database errors translated to API errors
4. **External Services**: Third-party service failures handled gracefully
5. **System Errors**: Unexpected errors caught and logged

### Error Categories

- **Client Errors (4xx)**: Issues with the request
- **Server Errors (5xx)**: Issues with the server
- **Business Logic Errors**: Domain-specific validation failures
- **Authentication Errors**: Access and permission issues
- **Rate Limiting Errors**: Usage limit violations`,
      calloutBoxes: [
        {
          type: "info",
          title: "Error Transparency",
          content: "We balance security with developer experience by providing detailed errors in development while sanitizing production errors."
        }
      ]
    },
    {
      id: "response-format",
      title: "Error Response Format",
      content: `All error responses follow a consistent JSON structure that provides comprehensive information about what went wrong and how to fix it.

### Standard Error Response

\`\`\`json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "One or more validation errors occurred",
    "details": {
      "field": "email",
      "reason": "Invalid email format",
      "provided": "user@",
      "expected": "user@domain.com"
    },
    "suggestion": "Please provide a valid email address",
    "traceId": "abc-123-def-456",
    "timestamp": "2025-12-28T14:13:27.532Z"
  },
  "request": {
    "method": "POST",
    "url": "/api/v1/users",
    "userAgent": "CareerForge-Web/1.0.0"
  }
}
\`\`\`

### Field Descriptions

- **success**: Always \`false\` for error responses
- **error.code**: Machine-readable error code (see Error Codes section)
- **error.message**: Human-readable error description
- **error.details**: Additional context about the error (optional)
- **error.suggestion**: Recommended action to resolve the error (optional)
- **error.traceId**: Unique identifier for tracking the error
- **request**: Information about the request that caused the error

### HTTP Status Codes

Error responses use appropriate HTTP status codes:

- **400 Bad Request**: Validation or syntax errors
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource doesn't exist
- **409 Conflict**: Resource state conflict
- **422 Unprocessable Entity**: Business logic violations
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Unexpected server errors
- **502 Bad Gateway**: Upstream service errors
- **503 Service Unavailable**: Service temporarily unavailable`,
      codeExamples: [
        {
          id: "error-response-typescript",
          title: "Error Response TypeScript Interface",
          description: "Type definition for error responses",
          language: "typescript",
          code: `interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, any>;
    suggestion?: string;
    traceId: string;
    timestamp: string;
  };
  request?: {
    method: string;
    url: string;
    userAgent?: string;
  };
}

interface ValidationError extends ApiError {
  error: ApiError['error'] & {
    code: 'VALIDATION_ERROR';
    details: {
      field: string;
      reason: string;
      provided?: any;
      expected?: any;
    };
  };
}`
        }
      ]
    },
    {
      id: "error-codes",
      title: "Error Codes & Categories",
      content: `We use structured error codes that follow a consistent naming convention. Each code provides specific information about the type of error and its cause.

### Client Errors (4xx)

#### Authentication & Authorization
- \`AUTHENTICATION_REQUIRED\` (401): No valid authentication provided
- \`INVALID_CREDENTIALS\` (401): Username/password incorrect
- \`TOKEN_EXPIRED\` (401): JWT token has expired
- \`TOKEN_INVALID\` (401): JWT token malformed or invalid
- \`INSUFFICIENT_PERMISSIONS\` (403): User lacks required permissions
- \`ACCOUNT_SUSPENDED\` (403): User account is suspended
- \`ACCOUNT_UNVERIFIED\` (403): Email verification required

#### Validation & Input Errors
- \`VALIDATION_ERROR\` (400): Input data doesn't meet requirements
- \`MISSING_REQUIRED_FIELD\` (400): Required field is missing
- \`INVALID_FORMAT\` (400): Data format is incorrect
- \`INVALID_VALUE\` (400): Value outside acceptable range
- \`DUPLICATE_ENTRY\` (409): Resource already exists
- \`RESOURCE_NOT_FOUND\` (404): Requested resource doesn't exist

#### Business Logic Errors
- \`BUSINESS_RULE_VIOLATION\` (422): Business rule prevents operation
- \`INVALID_STATE_TRANSITION\` (422): Operation not allowed in current state
- \`QUOTA_EXCEEDED\` (422): Usage limit exceeded
- \`DEPENDENCY_ERROR\` (422): Required dependency missing or invalid

### Server Errors (5xx)

#### System Errors
- \`INTERNAL_SERVER_ERROR\` (500): Unexpected server error
- \`DATABASE_ERROR\` (500): Database operation failed
- \`CACHE_ERROR\` (500): Caching system error
- \`EXTERNAL_SERVICE_ERROR\` (502): Third-party service failure
- \`SERVICE_UNAVAILABLE\` (503): Service temporarily down
- \`MAINTENANCE_MODE\` (503): System under maintenance

#### Rate Limiting
- \`RATE_LIMIT_EXCEEDED\` (429): Too many requests
- \`BURST_LIMIT_EXCEEDED\` (429): Request burst limit exceeded

### Custom Error Codes

Some endpoints define custom error codes for specific scenarios:

\`\`\`typescript
// Job posting errors
JOB_TITLE_TOO_LONG: "Job title exceeds 100 characters"
JOB_DESCRIPTION_TOO_SHORT: "Job description must be at least 50 characters"
INVALID_SALARY_RANGE: "Salary maximum must be greater than minimum"

// Application errors
APPLICATION_ALREADY_EXISTS: "User has already applied for this job"
JOB_APPLICATION_CLOSED: "Job is no longer accepting applications"
MISSING_RESUME: "Resume is required for this application"
\`\`\``,
      lists: [
        {
          type: "unordered",
          items: [
            "Error codes are stable and won't change without API versioning",
            "All error codes include HTTP status codes for proper client handling",
            "Custom error codes are documented in endpoint-specific sections",
            "Error codes support internationalization for user-facing messages"
          ]
        }
      ]
    },
    {
      id: "client-errors",
      title: "Client Error Handling",
      content: `Client applications must handle various error scenarios gracefully. Here's how to implement robust error handling in your client code.

### Authentication Errors

\`\`\`typescript
async function handleApiCall(url: string, options: RequestInit = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': \`Bearer \${getAuthToken()}\`,
        ...options.headers
      }
    });

    if (!response.ok) {
      const errorData = await response.json();

      switch (response.status) {
        case 401:
          // Token expired or invalid - refresh or redirect to login
          if (errorData.error.code === 'TOKEN_EXPIRED') {
            await refreshToken();
            return handleApiCall(url, options); // Retry with new token
          } else {
            redirectToLogin();
          }
          break;

        case 403:
          // Permission denied - show appropriate message
          showErrorMessage('You do not have permission to perform this action');
          break;

        case 429:
          // Rate limited - implement backoff
          const retryAfter = response.headers.get('Retry-After');
          await delay(parseInt(retryAfter) * 1000);
          return handleApiCall(url, options);
          break;

        default:
          throw new ApiError(errorData);
      }
    }

    return response.json();
  } catch (error) {
    // Network errors, parsing errors, etc.
    console.error('API call failed:', error);
    throw error;
  }
}
\`\`\`

### Validation Error Handling

\`\`\`typescript
interface ValidationError {
  field: string;
  reason: string;
  provided?: any;
  expected?: any;
}

function handleValidationError(error: ApiError) {
  const details = error.error.details as ValidationError;

  // Highlight the problematic field in the UI
  highlightField(details.field, 'error');

  // Show specific error message
  showFieldError(details.field, details.reason);

  // Provide helpful suggestion if available
  if (error.error.suggestion) {
    showSuggestion(details.field, error.error.suggestion);
  }
}
\`\`\`

### Network Error Handling

\`\`\`typescript
class ApiClient {
  private retryAttempts = 3;
  private baseDelay = 1000; // 1 second

  async request(url: string, options: RequestInit = {}): Promise<any> {
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        const response = await fetch(url, options);

        if (response.status === 429) {
          // Rate limited - wait and retry
          const retryAfter = response.headers.get('Retry-After');
          const delay = retryAfter ? parseInt(retryAfter) * 1000 : this.calculateDelay(attempt);
          await this.delay(delay);
          continue;
        }

        if (!response.ok) {
          throw new ApiError(await response.json());
        }

        return response.json();

      } catch (error) {
        if (error instanceof ApiError) {
          throw error; // Don't retry business logic errors
        }

        // Network error - retry if attempts remaining
        if (attempt === this.retryAttempts) {
          throw new NetworkError('Failed to connect to server');
        }

        await this.delay(this.calculateDelay(attempt));
      }
    }
  }

  private calculateDelay(attempt: number): number {
    // Exponential backoff with jitter
    return this.baseDelay * Math.pow(2, attempt - 1) + Math.random() * 1000;
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
\`\`\``,
      codeExamples: [
        {
          id: "error-boundary",
          title: "React Error Boundary for API Errors",
          description: "Catching and handling API errors in React components",
          language: "typescript",
          code: `import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: ApiError;
}

class ApiErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    if (error instanceof ApiError) {
      return { hasError: true, error };
    }
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('API Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-container">
          <h3>Something went wrong</h3>
          {this.state.error && (
            <div className="error-details">
              <p>{this.state.error.error.message}</p>
              {this.state.error.error.suggestion && (
                <p className="suggestion">{this.state.error.error.suggestion}</p>
              )}
            </div>
          )}
          <button onClick={() => this.setState({ hasError: false })}>
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}`
        }
      ]
    },
    {
      id: "server-errors",
      title: "Server Error Handling",
      content: `Server-side error handling ensures that unexpected failures are caught, logged, and communicated appropriately to clients without exposing sensitive information.

### Error Middleware Implementation

\`\`\`typescript
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../types/api';

export class ErrorHandler {
  static handle(
    error: Error | ApiError,
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    // Generate unique trace ID for tracking
    const traceId = this.generateTraceId();

    // Log error with context
    this.logError(error, req, traceId);

    // Determine if this is a known API error or unexpected error
    if (this.isApiError(error)) {
      const apiError = error as ApiError;
      res.status(this.getHttpStatus(apiError)).json({
        success: false,
        error: {
          code: apiError.code,
          message: apiError.message,
          details: apiError.details,
          suggestion: apiError.suggestion,
          traceId,
          timestamp: new Date().toISOString()
        },
        request: {
          method: req.method,
          url: req.url,
          userAgent: req.get('User-Agent')
        }
      });
    } else {
      // Unexpected error - sanitize response
      const isDevelopment = process.env.NODE_ENV === 'development';

      res.status(500).json({
        success: false,
        error: {
          code: 'INTERNAL_SERVER_ERROR',
          message: isDevelopment ? error.message : 'An unexpected error occurred',
          details: isDevelopment ? error.stack : undefined,
          suggestion: 'Please try again later or contact support',
          traceId,
          timestamp: new Date().toISOString()
        }
      });
    }
  }

  private static isApiError(error: Error | ApiError): error is ApiError {
    return 'code' in error && 'message' in error;
  }

  private static getHttpStatus(error: ApiError): number {
    // Map error codes to HTTP status codes
    const statusMap: Record<string, number> = {
      'VALIDATION_ERROR': 400,
      'AUTHENTICATION_REQUIRED': 401,
      'INVALID_CREDENTIALS': 401,
      'INSUFFICIENT_PERMISSIONS': 403,
      'RESOURCE_NOT_FOUND': 404,
      'DUPLICATE_ENTRY': 409,
      'BUSINESS_RULE_VIOLATION': 422,
      'RATE_LIMIT_EXCEEDED': 429,
      'INTERNAL_SERVER_ERROR': 500,
      'SERVICE_UNAVAILABLE': 503
    };

    return statusMap[error.code] || 500;
  }

  private static generateTraceId(): string {
    return \`trace-\${Date.now()}-\${Math.random().toString(36).substr(2, 9)}\`;
  }

  private static logError(error: Error | ApiError, req: Request, traceId: string): void {
    const logData = {
      traceId,
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url,
      userId: req.user?.id,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
        code: 'code' in error ? error.code : undefined
      }
    };

    // Log to structured logging system (e.g., Winston, DataDog)
    console.error(JSON.stringify(logData, null, 2));
  }
}
\`\`\`

### Custom Error Classes

\`\`\`typescript
export class ApiError extends Error {
  public readonly code: string;
  public readonly details?: Record<string, any>;
  public readonly suggestion?: string;

  constructor(
    code: string,
    message: string,
    details?: Record<string, any>,
    suggestion?: string
  ) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.details = details;
    this.suggestion = suggestion;
  }
}

export class ValidationError extends ApiError {
  constructor(field: string, reason: string, provided?: any, expected?: any) {
    super(
      'VALIDATION_ERROR',
      \`Validation failed for field '\${field}'\`,
      { field, reason, provided, expected },
      \`Please provide a valid value for \${field}\`
    );
  }
}

export class NotFoundError extends ApiError {
  constructor(resource: string, id: string) {
    super(
      'RESOURCE_NOT_FOUND',
      \`\${resource} with ID \${id} not found\`,
      { resource, id },
      'Please check the ID and try again'
    );
  }
}

export class BusinessLogicError extends ApiError {
  constructor(message: string, details?: Record<string, any>) {
    super('BUSINESS_RULE_VIOLATION', message, details);
  }
}
\`\`\``,
      calloutBoxes: [
        {
          type: "warning",
          title: "Error Information Leakage",
          content: "Never expose stack traces, database errors, or sensitive information in production error responses."
        }
      ]
    },
    {
      id: "retry-strategies",
      title: "Retry Strategies & Backoff",
      content: `Implementing proper retry logic helps handle transient failures and improves application reliability.

### Retryable vs Non-Retryable Errors

**Retryable Errors:**
- Network timeouts (408, 504)
- Temporary server errors (502, 503, 504)
- Rate limiting (429)
- Database connection issues

**Non-Retryable Errors:**
- Authentication failures (401, 403)
- Validation errors (400, 422)
- Not found errors (404)
- Business logic violations

### Exponential Backoff Implementation

\`\`\`typescript
interface RetryOptions {
  maxAttempts: number;
  baseDelay: number;
  maxDelay: number;
  backoffFactor: number;
  jitter: boolean;
}

class RetryHandler {
  private defaultOptions: RetryOptions = {
    maxAttempts: 3,
    baseDelay: 1000, // 1 second
    maxDelay: 30000, // 30 seconds
    backoffFactor: 2,
    jitter: true
  };

  async executeWithRetry<T>(
    operation: () => Promise<T>,
    options: Partial<RetryOptions> = {}
  ): Promise<T> {
    const config = { ...this.defaultOptions, ...options };

    for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        if (!this.isRetryableError(error) || attempt === config.maxAttempts) {
          throw error;
        }

        const delay = this.calculateDelay(attempt, config);
        await this.delay(delay);
      }
    }

    throw new Error('Max retry attempts exceeded');
  }

  private isRetryableError(error: any): boolean {
    if (error instanceof ApiError) {
      // Retry on server errors and rate limiting
      return ['INTERNAL_SERVER_ERROR', 'SERVICE_UNAVAILABLE', 'RATE_LIMIT_EXCEEDED'].includes(error.code);
    }

    // Retry on network errors
    return error.name === 'NetworkError' || error.name === 'TimeoutError';
  }

  private calculateDelay(attempt: number, config: RetryOptions): number {
    let delay = config.baseDelay * Math.pow(config.backoffFactor, attempt - 1);

    // Apply maximum delay cap
    delay = Math.min(delay, config.maxDelay);

    // Add jitter to prevent thundering herd
    if (config.jitter) {
      delay = delay * (0.5 + Math.random() * 0.5);
    }

    return Math.floor(delay);
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
\`\`\`

### Circuit Breaker Pattern

\`\`\`typescript
enum CircuitState {
  CLOSED = 'closed',
  OPEN = 'open',
  HALF_OPEN = 'half_open'
}

class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED;
  private failureCount = 0;
  private lastFailureTime = 0;

  constructor(
    private failureThreshold: number = 5,
    private recoveryTimeout: number = 60000, // 1 minute
    private monitoringPeriod: number = 10000 // 10 seconds
  ) {}

  async execute<T>(operation: () => Promise<T>): Promise<T> {
    if (this.state === CircuitState.OPEN) {
      if (Date.now() - this.lastFailureTime > this.recoveryTimeout) {
        this.state = CircuitState.HALF_OPEN;
      } else {
        throw new Error('Circuit breaker is OPEN');
      }
    }

    try {
      const result = await operation();
      this.onSuccess();
      return result;
    } catch (error) {
      this.onFailure();
      throw error;
    }
  }

  private onSuccess(): void {
    this.failureCount = 0;
    this.state = CircuitState.CLOSED;
  }

  private onFailure(): void {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.failureCount >= this.failureThreshold) {
      this.state = CircuitState.OPEN;
    }
  }
}
\`\`\``,
      lists: [
        {
          type: "ordered",
          items: [
            "Always check if an error is retryable before attempting retry",
            "Implement exponential backoff to avoid overwhelming the server",
            "Add jitter to prevent synchronized retry attempts",
            "Set reasonable maximum retry attempts and delays",
            "Use circuit breakers for external service calls"
          ]
        }
      ]
    },
    {
      id: "logging-monitoring",
      title: "Logging & Monitoring",
      content: `Comprehensive logging and monitoring are essential for maintaining API reliability and diagnosing issues.

### Structured Logging

\`\`\`typescript
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'careerforge-api' },
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

// Error logging middleware
export const errorLoggingMiddleware = (
  error: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const logData = {
    traceId: res.locals.traceId,
    method: req.method,
    url: req.url,
    userId: req.user?.id,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    error: {
      name: error.name,
      message: error.message,
      code: 'code' in error ? error.code : undefined,
      stack: error.stack
    }
  };

  logger.error('API Error occurred', logData);
  next(error);
};
\`\`\`

### Error Metrics & Monitoring

\`\`\`typescript
import { collectDefaultMetrics, register, Gauge, Counter } from 'prom-client';

collectDefaultMetrics();

const errorCounter = new Counter({
  name: 'api_errors_total',
  help: 'Total number of API errors',
  labelNames: ['code', 'method', 'endpoint']
});

const errorRateGauge = new Gauge({
  name: 'api_error_rate',
  help: 'Current API error rate (errors per minute)',
  labelNames: ['endpoint']
});

export class ErrorMetrics {
  static recordError(error: ApiError, req: Request): void {
    errorCounter
      .labels(error.code, req.method, req.route?.path || req.url)
      .inc();
  }

  static updateErrorRate(endpoint: string, rate: number): void {
    errorRateGauge.labels(endpoint).set(rate);
  }

  static getMetrics(): Promise<string> {
    return register.metrics();
  }
}

// Middleware to record error metrics
export const errorMetricsMiddleware = (
  error: Error | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ApiError) {
    ErrorMetrics.recordError(error, req);
  }
  next(error);
};
\`\`\`

### Alerting Configuration

\`\`\`yaml
# Alert rules for error monitoring
groups:
  - name: api_errors
    rules:
      - alert: HighErrorRate
        expr: rate(api_errors_total[5m]) > 0.1
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High API error rate detected"
          description: "API error rate is {{ $value }} errors per second"

      - alert: CriticalErrors
        expr: increase(api_errors_total{code=~"INTERNAL_SERVER_ERROR|SERVICE_UNAVAILABLE"}[5m]) > 10
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "Critical server errors detected"
          description: "Critical errors increased by {{ $value }} in 5 minutes"
\`\`\``,
      calloutBoxes: [
        {
          type: "success",
          title: "Monitoring Best Practices",
          content: "Monitor error rates, latency, and throughput. Set up alerts for unusual patterns and track error trends over time."
        }
      ]
    },
    {
      id: "best-practices",
      title: "Best Practices",
      content: `Follow these best practices to ensure robust error handling across your applications.

### Client-Side Best Practices

1. **Graceful Degradation**: Always provide fallback UI states
2. **User-Friendly Messages**: Translate technical errors to user-friendly language
3. **Progressive Enhancement**: Start with basic functionality, enhance with error recovery
4. **Offline Support**: Handle network failures with cached data or offline modes

### Server-Side Best Practices

1. **Fail Fast**: Validate input early and reject invalid requests immediately
2. **Consistent Responses**: Use the same error format across all endpoints
3. **Security**: Never expose sensitive information in error messages
4. **Monitoring**: Log all errors with sufficient context for debugging

### Error Handling Patterns

#### Result Pattern
\`\`\`typescript
type Result<T, E = Error> = { success: true; data: T } | { success: false; error: E };

async function safeApiCall<T>(url: string): Promise<Result<T, ApiError>> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return { success: false, error: await response.json() };
    }
    return { success: true, data: await response.json() };
  } catch (error) {
    return { success: false, error: error as ApiError };
  }
}

// Usage
const result = await safeApiCall<User>('/api/users/profile');
if (result.success) {
  console.log('User:', result.data);
} else {
  console.error('Error:', result.error.message);
}
\`\`\`

#### Either Pattern (Functional Approach)
\`\`\`typescript
type Either<L, R> = { kind: 'left'; value: L } | { kind: 'right'; value: R };

async function apiCallEither<T>(url: string): Promise<Either<ApiError, T>> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return { kind: 'left', value: await response.json() };
    }
    return { kind: 'right', value: await response.json() };
  } catch (error) {
    return { kind: 'left', value: error as ApiError };
  }
}

// Usage with pattern matching
const result = await apiCallEither<User>('/api/users/profile');
switch (result.kind) {
  case 'right':
    console.log('Success:', result.value);
    break;
  case 'left':
    console.error('Error:', result.value.message);
    break;
}
\`\`\`

### Testing Error Scenarios

\`\`\`typescript
describe('API Error Handling', () => {
  it('should handle validation errors', async () => {
    const response = await request(app)
      .post('/api/jobs')
      .send({ title: '', description: 'Valid description' })
      .expect(400);

    expect(response.body.success).toBe(false);
    expect(response.body.error.code).toBe('VALIDATION_ERROR');
    expect(response.body.error.details.field).toBe('title');
  });

  it('should handle authentication errors', async () => {
    const response = await request(app)
      .get('/api/users/profile')
      .expect(401);

    expect(response.body.error.code).toBe('AUTHENTICATION_REQUIRED');
  });

  it('should handle not found errors', async () => {
    const response = await request(app)
      .get('/api/jobs/non-existent-id')
      .expect(404);

    expect(response.body.error.code).toBe('RESOURCE_NOT_FOUND');
  });
});
\`\`\``,
      lists: [
        {
          type: "unordered",
          items: [
            "Always test error scenarios in your integration tests",
            "Implement proper error boundaries in frontend applications",
            "Use typed errors to ensure type safety",
            "Document expected error responses for each endpoint",
            "Monitor error rates and set up alerts for anomalies"
          ]
        }
      ]
    }
  ],
  nextSteps: {
    title: "Next Steps",
    links: [
      {
        text: "Rate Limiting Guide",
        href: "/docs/backend-api/rate-limiting",
        description: "Understanding rate limiting policies and implementation"
      },
      {
        text: "API Versioning",
        href: "/docs/backend-api/versioning",
        description: "API versioning strategies and migration guides"
      },
      {
        text: "SDK Error Handling",
        href: "/docs/backend-api/sdk-errors",
        description: "Error handling patterns in our official SDKs"
      }
    ]
  },
  relatedResources: [
    {
      text: "Authentication Guide",
      href: "/docs/backend-api/authentication",
      description: "Authentication mechanisms and error scenarios"
    },
    {
      text: "API Reference",
      href: "/docs/backend-api/reference",
      description: "Complete endpoint documentation with error examples"
    },
    {
      text: "Monitoring & Observability",
      href: "/docs/architecture/monitoring",
      description: "System monitoring and alerting strategies"
    }
  ]
}