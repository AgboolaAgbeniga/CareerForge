export const bestPracticesContent = {
  meta: {
    title: "Development Best Practices",
    description: "Comprehensive guide to development best practices, coding standards, and development workflows for CareerForge.",
    keywords: ["best practices", "coding standards", "development", "guidelines", "workflow"]
  },

  sections: [
    {
      id: "overview",
      title: "Development Best Practices Overview",
      content: `
        <p>Following established best practices ensures code quality, maintainability, and scalability across the CareerForge platform. This guide covers essential development standards and workflows.</p>

        <div class="practices-overview">
          <h3>Core Principles</h3>
          <ul>
            <li><strong>Code Quality:</strong> Write clean, readable, and well-documented code</li>
            <li><strong>Consistency:</strong> Follow established patterns and conventions</li>
            <li><strong>Testing:</strong> Comprehensive test coverage for reliability</li>
            <li><strong>Security:</strong> Implement security best practices throughout</li>
            <li><strong>Performance:</strong> Optimize for speed and efficiency</li>
          </ul>
        </div>
      `
    },

    {
      id: "code-quality",
      title: "Code Quality Standards",
      content: `
        <h3>Coding Conventions</h3>
        <p>Maintain consistent code style and structure across all projects.</p>

        <div class="code-example">
          <h4>TypeScript/JavaScript Standards</h4>
          <pre><code class="language-typescript">
// ✅ Good: Clear naming and structure
interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  isActive: boolean;
}

class UserService {
  private readonly apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async getUserProfile(userId: string): Promise<UserProfile> {
    try {
      const response = await this.apiClient.get(\`/users/\${userId}\`);
      return this.mapToUserProfile(response.data);
    } catch (error) {
      throw new UserServiceError('Failed to fetch user profile', error);
    }
  }

  private mapToUserProfile(data: any): UserProfile {
    return {
      id: data.id,
      email: data.email,
      firstName: data.first_name,
      lastName: data.last_name,
      createdAt: new Date(data.created_at),
      isActive: data.is_active
    };
  }
}

// ❌ Bad: Poor naming and structure
interface usr {
  i: string;
  e: string;
  fn: string;
  ln: string;
  ca: Date;
  ia: boolean;
}

class usrSvc {
  private api: any;

  constructor(api: any) {
    this.api = api;
  }

  async get(u: string) {
    const r = await this.api.get(\`/users/\${u}\`);
    return r.data;
  }
}
</code></pre>
        </div>

        <div class="best-practice">
          <h4>Naming Conventions</h4>
          <ul>
            <li>Use PascalCase for classes, interfaces, and types</li>
            <li>Use camelCase for variables, functions, and methods</li>
            <li>Use UPPER_SNAKE_CASE for constants</li>
            <li>Use kebab-case for file names and URLs</li>
            <li>Prefix boolean variables with is/has/can/should</li>
            <li>Use descriptive names that explain purpose</li>
          </ul>
        </div>
      `
    },

    {
      id: "error-handling",
      title: "Error Handling Patterns",
      content: `
        <h3>Robust Error Management</h3>
        <p>Implement comprehensive error handling to ensure application stability.</p>

        <div class="code-example">
          <h4>Custom Error Classes</h4>
          <pre><code class="language-typescript">
// lib/errors.ts
export abstract class CareerForgeError extends Error {
  public readonly code: string;
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, code: string, statusCode = 500, isOperational = true) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends CareerForgeError {
  constructor(message: string, field?: string) {
    super(
      message,
      'VALIDATION_ERROR',
      400,
      true
    );
    this.field = field;
  }

  public readonly field?: string;
}

export class AuthenticationError extends CareerForgeError {
  constructor(message = 'Authentication required') {
    super(message, 'AUTHENTICATION_ERROR', 401, true);
  }
}

export class NotFoundError extends CareerForgeError {
  constructor(resource: string) {
    super(
      \`\${resource} not found\`,
      'NOT_FOUND_ERROR',
      404,
      true
    );
  }
}
</code></pre>
        </div>

        <div class="code-example">
          <h4>Error Handling in Async Operations</h4>
          <pre><code class="language-typescript">
// services/api.service.ts
export class ApiService {
  async request<T>(config: RequestConfig): Promise<T> {
    try {
      const response = await this.httpClient.request(config);
      return this.transformResponse<T>(response);
    } catch (error) {
      if (error instanceof CareerForgeError) {
        throw error;
      }

      if (axios.isAxiosError(error)) {
        throw this.handleAxiosError(error);
      }

      throw new CareerForgeError(
        'An unexpected error occurred',
        'INTERNAL_ERROR',
        500,
        false
      );
    }
  }

  private handleAxiosError(error: AxiosError): CareerForgeError {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          return new ValidationError(data?.message || 'Invalid request');
        case 401:
          return new AuthenticationError();
        case 404:
          return new NotFoundError('Resource');
        case 429:
          return new CareerForgeError(
            'Too many requests',
            'RATE_LIMIT_ERROR',
            429
          );
        default:
          return new CareerForgeError(
            data?.message || 'Request failed',
            'API_ERROR',
            status
          );
      }
    }

    if (error.request) {
      return new CareerForgeError(
        'Network error - please check your connection',
        'NETWORK_ERROR',
        0
      );
    }

    return new CareerForgeError(
      'Request configuration error',
      'CONFIG_ERROR',
      500
    );
  }
}
</code></pre>
        </div>

        <div class="best-practice">
          <h4>Error Handling Guidelines</h4>
          <ul>
            <li>Use custom error classes for different error types</li>
            <li>Include error codes and status codes for API responses</li>
            <li>Log errors appropriately (debug for development, warn/error for production)</li>
            <li>Don't expose sensitive information in error messages</li>
            <li>Implement proper error boundaries in React components</li>
            <li>Use try-catch blocks for async operations</li>
          </ul>
        </div>
      `
    },

    {
      id: "testing",
      title: "Testing Strategies",
      content: `
        <h3>Comprehensive Testing Approach</h3>
        <p>Ensure code reliability through multiple levels of testing.</p>

        <div class="code-example">
          <h4>Unit Testing with Jest</h4>
          <pre><code class="language-typescript">
// __tests__/user.service.test.ts
import { UserService } from '../services/user.service';
import { MockApiClient } from '../mocks/api-client.mock';

describe('UserService', () => {
  let userService: UserService;
  let mockApiClient: MockApiClient;

  beforeEach(() => {
    mockApiClient = new MockApiClient();
    userService = new UserService(mockApiClient);
  });

  describe('getUserProfile', () => {
    it('should return user profile for valid user ID', async () => {
      const mockUser = {
        id: '123',
        email: 'john@example.com',
        first_name: 'John',
        last_name: 'Doe',
        created_at: '2023-01-01T00:00:00Z',
        is_active: true
      };

      mockApiClient.get.mockResolvedValue({ data: mockUser });

      const result = await userService.getUserProfile('123');

      expect(result).toEqual({
        id: '123',
        email: 'john@example.com',
        firstName: 'John',
        lastName: 'Doe',
        createdAt: expect.any(Date),
        isActive: true
      });
      expect(mockApiClient.get).toHaveBeenCalledWith('/users/123');
    });

    it('should throw UserServiceError when API call fails', async () => {
      mockApiClient.get.mockRejectedValue(new Error('API Error'));

      await expect(userService.getUserProfile('123'))
        .rejects
        .toThrow('Failed to fetch user profile');
    });

    it('should handle malformed API response', async () => {
      const malformedData = { invalid: 'data' };
      mockApiClient.get.mockResolvedValue({ data: malformedData });

      await expect(userService.getUserProfile('123'))
        .rejects
        .toThrow();
    });
  });
});
</code></pre>
        </div>

        <div class="code-example">
          <h4>Integration Testing</h4>
          <pre><code class="language-typescript">
// __tests__/auth.integration.test.ts
import request from 'supertest';
import { app } from '../app';
import { createTestDatabase, closeTestDatabase } from '../test-utils';

describe('Authentication API', () => {
  beforeAll(async () => {
    await createTestDatabase();
  });

  afterAll(async () => {
    await closeTestDatabase();
  });

  describe('POST /auth/login', () => {
    it('should login user with valid credentials', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'validpassword'
        })
        .expect(200);

      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.email).toBe('test@example.com');
    });

    it('should return 401 for invalid credentials', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        })
        .expect(401);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error.code).toBe('AUTHENTICATION_ERROR');
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({})
        .expect(400);

      expect(response.body.error.code).toBe('VALIDATION_ERROR');
    });
  });
});
</code></pre>
        </div>

        <div class="code-example">
          <h4>Component Testing with React Testing Library</h4>
          <pre><code class="language-typescript">
// __tests__/LoginForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LoginForm } from '../components/LoginForm';

const mockOnLogin = jest.fn();

describe('LoginForm', () => {
  beforeEach(() => {
    mockOnLogin.mockClear();
  });

  it('renders login form correctly', () => {
    render(<LoginForm onLogin={mockOnLogin} />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('calls onLogin with form data when submitted', async () => {
    render(<LoginForm onLogin={mockOnLogin} />);

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockOnLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });

  it('shows validation errors for empty fields', async () => {
    render(<LoginForm onLogin={mockOnLogin} />);

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(screen.getByText(/email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    });
  });

  it('disables submit button during loading', () => {
    render(<LoginForm onLogin={mockOnLogin} loading={true} />);

    expect(screen.getByRole('button', { name: /logging in/i })).toBeDisabled();
  });
});
</code></pre>
        </div>

        <div class="best-practice">
          <h4>Testing Best Practices</h4>
          <ul>
            <li>Aim for >80% code coverage</li>
            <li>Test behavior, not implementation details</li>
            <li>Use descriptive test names (should/when/given)</li>
            <li>Mock external dependencies</li>
            <li>Test error scenarios and edge cases</li>
            <li>Use integration tests for API endpoints</li>
            <li>Run tests in CI/CD pipeline</li>
          </ul>
        </div>
      `
    },

    {
      id: "security",
      title: "Security Best Practices",
      content: `
        <h3>Security-First Development</h3>
        <p>Implement security measures throughout the development lifecycle.</p>

        <div class="code-example">
          <h4>Input Validation and Sanitization</h4>
          <pre><code class="language-typescript">
// utils/validation.ts
import DOMPurify from 'dompurify';
import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email().max(254),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number'),
  firstName: z.string().min(1).max(50).regex(/^[a-zA-Z\s'-]+$/),
  lastName: z.string().min(1).max(50).regex(/^[a-zA-Z\s'-]+$/),
});

export const jobSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().min(10).max(5000),
  salary: z.number().positive().optional(),
  location: z.string().min(1).max(100),
});

export function sanitizeHtml(html: string): string {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'a'],
    ALLOWED_ATTR: ['href', 'target'],
    ALLOW_DATA_ATTR: false
  });
}

export function validateAndSanitizeInput<T>(
  data: unknown,
  schema: z.ZodSchema<T>
): { success: true; data: T } | { success: false; errors: string[] } {
  try {
    const validData = schema.parse(data);
    return { success: true, data: validData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.errors.map(e => \`\${e.path.join('.')}: \${e.message}\`)
      };
    }
    return { success: false, errors: ['Invalid input'] };
  }
}
</code></pre>
        </div>

        <div class="code-example">
          <h4>Authentication & Authorization</h4>
          <pre><code class="language-typescript">
// middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserService } from '../services/user.service';

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

export function authenticateToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: { code: 'AUTHENTICATION_ERROR', message: 'Access token required' } });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
    req.user = {
      id: decoded.sub as string,
      email: decoded.email as string,
      role: decoded.role as string,
    };
    next();
  } catch (error) {
    res.status(403).json({ error: { code: 'AUTHENTICATION_ERROR', message: 'Invalid or expired token' } });
  }
}

export function authorizeRoles(...allowedRoles: string[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: { code: 'AUTHENTICATION_ERROR', message: 'Authentication required' } });
      return;
    }

    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({ error: { code: 'AUTHORIZATION_ERROR', message: 'Insufficient permissions' } });
      return;
    }

    next();
  };
}

// Usage in routes
app.get('/admin/users',
  authenticateToken,
  authorizeRoles('admin', 'super_admin'),
  async (req: AuthenticatedRequest, res) => {
    // Only admins can access this
  }
);
</code></pre>
        </div>

        <div class="code-example">
          <h4>SQL Injection Prevention</h4>
          <pre><code class="language-typescript">
// repositories/user.repository.ts
import { sql } from 'slonik';

export class UserRepository {
  async findByEmail(email: string) {
    // ✅ Safe: Using parameterized queries
    return await this.db.one(sql\`
      SELECT id, email, first_name, last_name, created_at
      FROM users
      WHERE email = \${email}
    \`);
  }

  async findByFilters(filters: { name?: string; location?: string; skills?: string[] }) {
    let query = sql\`SELECT * FROM users WHERE 1=1\`;
    const conditions = [];

    if (filters.name) {
      conditions.push(sql\`first_name ILIKE \${'%' + filters.name + '%'}\`);
    }

    if (filters.location) {
      conditions.push(sql\`location ILIKE \${'%' + filters.location + '%'}\`);
    }

    if (filters.skills && filters.skills.length > 0) {
      conditions.push(sql\`skills && \${sql.array(filters.skills, 'text')}\`);
    }

    if (conditions.length > 0) {
      query = sql\`\${query} AND \${sql.join(conditions, sql\` AND \`)}\`;
    }

    return await this.db.any(query);
  }

  // ❌ Unsafe: Direct string interpolation (NEVER DO THIS)
  // async unsafeFindByEmail(email: string) {
  //   return await this.db.one(\`SELECT * FROM users WHERE email = '\${email}'\`);
  // }
}
</code></pre>
        </div>

        <div class="best-practice">
          <h4>Security Guidelines</h4>
          <ul>
            <li>Always validate and sanitize user input</li>
            <li>Use parameterized queries to prevent SQL injection</li>
            <li>Implement proper authentication and authorization</li>
            <li>Store sensitive data encrypted</li>
            <li>Use HTTPS for all communications</li>
            <li>Implement rate limiting on API endpoints</li>
            <li>Regular security audits and dependency updates</li>
            <li>Never log sensitive information</li>
          </ul>
        </div>
      `
    },

    {
      id: "performance",
      title: "Performance Optimization",
      content: `
        <h3>Performance Best Practices</h3>
        <p>Optimize application performance for better user experience.</p>

        <div class="code-example">
          <h4>Database Query Optimization</h4>
          <pre><code class="language-typescript">
// repositories/job.repository.ts
export class JobRepository {
  async findJobsWithFilters(filters: JobFilters, pagination: PaginationOptions) {
    const { page = 1, limit = 20 } = pagination;
    const offset = (page - 1) * limit;

    // Use EXPLAIN ANALYZE to optimize this query
    const jobs = await this.db.any(sql\`
      SELECT
        j.id, j.title, j.description, j.salary, j.location,
        j.created_at, j.updated_at,
        c.name as company_name,
        COUNT(*) OVER() as total_count
      FROM jobs j
      JOIN companies c ON j.company_id = c.id
      WHERE
        (\${filters.title}::text IS NULL OR j.title ILIKE \${'%' + filters.title + '%'})
        AND (\${filters.location}::text IS NULL OR j.location ILIKE \${'%' + filters.location + '%'})
        AND (\${filters.salaryMin}::int IS NULL OR j.salary >= \${filters.salaryMin})
        AND (\${filters.salaryMax}::int IS NULL OR j.salary <= \${filters.salaryMax})
      ORDER BY j.created_at DESC
      LIMIT \${limit} OFFSET \${offset}
    \`);

    const totalCount = jobs[0]?.total_count || 0;

    return {
      jobs: jobs.map(({ total_count, ...job }) => job),
      pagination: {
        page,
        limit,
        total: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      }
    };
  }

  // Add database indexes for frequently queried columns
  async createIndexes() {
    await this.db.query(sql\`
      CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_jobs_title ON jobs USING gin(to_tsvector('english', title));
      CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_jobs_location ON jobs USING gin(to_tsvector('english', location));
      CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_jobs_salary ON jobs(salary);
      CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_jobs_created_at ON jobs(created_at DESC);
      CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_jobs_company_id ON jobs(company_id);
    \`);
  }
}
</code></pre>
        </div>

        <div class="code-example">
          <h4>Caching Strategies</h4>
          <pre><code class="language-typescript">
// services/cache.service.ts
import Redis from 'ioredis';

export class CacheService {
  private redis: Redis;

  constructor() {
    this.redis = new Redis(process.env.REDIS_URL);
  }

  async get<T>(key: string): Promise<T | null> {
    try {
      const data = await this.redis.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  async set(key: string, value: any, ttlSeconds?: number): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      if (ttlSeconds) {
        await this.redis.setex(key, ttlSeconds, serialized);
      } else {
        await this.redis.set(key, serialized);
      }
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  async invalidate(pattern: string): Promise<void> {
    try {
      const keys = await this.redis.keys(pattern);
      if (keys.length > 0) {
        await this.redis.del(...keys);
      }
    } catch (error) {
      console.error('Cache invalidate error:', error);
    }
  }

  // Cache user profiles for 5 minutes
  async getUserProfile(userId: string) {
    const cacheKey = \`user:\${userId}:profile\`;
    let profile = await this.get(cacheKey);

    if (!profile) {
      profile = await this.userService.getUserProfile(userId);
      await this.set(cacheKey, profile, 300); // 5 minutes
    }

    return profile;
  }

  // Invalidate user cache on profile update
  async invalidateUserCache(userId: string) {
    await this.invalidate(\`user:\${userId}:*\`);
  }
}
</code></pre>
        </div>

        <div class="best-practice">
          <h4>Performance Guidelines</h4>
          <ul>
            <li>Optimize database queries with proper indexing</li>
            <li>Implement caching for frequently accessed data</li>
            <li>Use pagination for large datasets</li>
            <li>Minimize database round trips</li>
            <li>Implement lazy loading for components</li>
            <li>Optimize images and assets</li>
            <li>Use CDN for static assets</li>
            <li>Monitor performance metrics regularly</li>
          </ul>
        </div>
      `
    },

    {
      id: "code-review",
      title: "Code Review Guidelines",
      content: `
        <h3>Effective Code Reviews</h3>
        <p>Conduct thorough and constructive code reviews to maintain code quality.</p>

        <div class="code-review-checklist">
          <h4>Code Review Checklist</h4>

          <h5>✅ Functionality</h5>
          <ul>
            <li>Does the code meet the requirements?</li>
            <li>Are there any bugs or edge cases not handled?</li>
            <li>Does it integrate properly with existing code?</li>
            <li>Are there appropriate tests?</li>
          </ul>

          <h5>✅ Code Quality</h5>
          <ul>
            <li>Is the code readable and well-structured?</li>
            <li>Does it follow established conventions?</li>
            <li>Are there any code smells or anti-patterns?</li>
            <li>Is the code properly documented?</li>
          </ul>

          <h5>✅ Security</h5>
          <ul>
            <li>Are there any security vulnerabilities?</li>
            <li>Is input validation and sanitization implemented?</li>
            <li>Are sensitive data handled properly?</li>
            <li>Does it follow security best practices?</li>
          </ul>

          <h5>✅ Performance</h5>
          <ul>
            <li>Are there any performance issues?</li>
            <li>Is the code optimized for the use case?</li>
            <li>Are database queries efficient?</li>
            <li>Does it handle large datasets appropriately?</li>
          </ul>

          <h5>✅ Testing</h5>
          <ul>
            <li>Are there sufficient unit tests?</li>
            <li>Do tests cover edge cases?</li>
            <li>Are integration tests included where needed?</li>
            <li>Do tests pass?</li>
          </ul>
        </div>

        <div class="best-practice">
          <h4>Code Review Best Practices</h4>
          <ul>
            <li>Review code in small, focused chunks</li>
            <li>Provide constructive feedback with suggestions</li>
            <li>Focus on code quality, not personal style preferences</li>
            <li>Use automated tools for basic checks (linting, formatting)</li>
            <li>Approve with confidence or request changes</li>
            <li>Learn from each review to improve coding skills</li>
          </ul>
        </div>
      `
    },

    {
      id: "documentation",
      title: "Documentation Standards",
      content: `
        <h3>Comprehensive Documentation</h3>
        <p>Maintain clear and useful documentation for all code and systems.</p>

        <div class="code-example">
          <h4>JSDoc Comments</h4>
          <pre><code class="language-typescript">
/**
 * Service for managing user authentication and authorization
 * Handles login, logout, token management, and user sessions
 */
export class AuthService {
  private jwtSecret: string;
  private tokenExpiry: number;

  /**
   * Creates an instance of AuthService
   * @param jwtSecret - Secret key for JWT token signing
   * @param tokenExpiry - Token expiry time in seconds (default: 3600)
   */
  constructor(jwtSecret: string, tokenExpiry = 3600) {
    this.jwtSecret = jwtSecret;
    this.tokenExpiry = tokenExpiry;
  }

  /**
   * Authenticates a user with email and password
   * @param email - User's email address
   * @param password - User's password
   * @returns Promise resolving to authentication result
   * @throws {AuthenticationError} When credentials are invalid
   * @throws {ValidationError} When input validation fails
   * @example
   * \`\`\`typescript
   * const result = await authService.login('user@example.com', 'password123');
   * if (result.success) {
   *   console.log('Login successful:', result.user);
   * }
   * \`\`\`
   */
  async login(email: string, password: string): Promise<LoginResult> {
    // Implementation...
  }

  /**
   * Validates a JWT token and returns user information
   * @param token - JWT token to validate
   * @returns User information if token is valid
   * @throws {AuthenticationError} When token is invalid or expired
   */
  validateToken(token: string): UserInfo {
    // Implementation...
  }
}
</code></pre>
        </div>

        <div class="code-example">
          <h4>README Documentation</h4>
          <pre><code class="language-markdown">
# CareerForge Auth Service

A microservice handling user authentication and authorization for the CareerForge platform.

## Features

- User registration and login
- JWT token-based authentication
- Password reset functionality
- Role-based access control
- Session management

## Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Redis (optional, for session storage)

### Installation

1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/careerforge/auth-service.git
   cd auth-service
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables:
   \`\`\`bash
   cp .env.example .env
   # Edit .env with your configuration
   \`\`\`

4. Run database migrations:
   \`\`\`bash
   npm run migrate
   \`\`\`

5. Start the service:
   \`\`\`bash
   npm start
   \`\`\`

## API Documentation

### Authentication Endpoints

#### POST /auth/login
Authenticates a user and returns a JWT token.

**Request Body:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "password123"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "123",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
\`\`\`

## Development

### Running Tests
\`\`\`bash
npm test
\`\`\`

### Code Quality
\`\`\`bash
# Lint code
npm run lint

# Format code
npm run format

# Type check
npm run type-check
\`\`\`

### Database Schema
See [database schema](./docs/schema.sql) for detailed table structure.

## Deployment

### Docker
\`\`\`bash
docker build -t careerforge/auth-service .
docker run -p 3000:3000 careerforge/auth-service
\`\`\`

### Environment Variables
- \`DATABASE_URL\` - PostgreSQL connection string
- \`JWT_SECRET\` - Secret key for JWT signing
- \`REDIS_URL\` - Redis connection string (optional)
- \`PORT\` - Server port (default: 3000)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

MIT License - see [LICENSE](./LICENSE) file for details.
</code></pre>
        </div>

        <div class="best-practice">
          <h4>Documentation Guidelines</h4>
          <ul>
            <li>Document all public APIs with JSDoc comments</li>
            <li>Include README files for all projects</li>
            <li>Document setup and deployment procedures</li>
            <li>Keep API documentation up to date</li>
            <li>Use examples in documentation</li>
            <li>Document known limitations and TODOs</li>
            <li>Include troubleshooting guides</li>
          </ul>
        </div>
      `
    }

  ]
};