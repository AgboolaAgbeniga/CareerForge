// Backend API Authentication Content
import { PageContent } from '@/lib/content-types'

export const backendApiAuthenticationContent: PageContent = {
  metadata: {
    title: "Authentication & Security",
    description: "Comprehensive guide to CareerForge API authentication mechanisms, security protocols, and access control",
    version: "1.0.0",
    lastUpdated: "2024-12-28",
    authors: ["Security Team", "Backend Engineering Team"],
    tags: ["authentication", "security", "jwt", "oauth", "api-keys"],
    difficulty: "intermediate",
    estimatedTime: 20
  },
  tableOfContents: [
    { id: "auth-overview", title: "Authentication Overview", level: 1 },
    { id: "jwt-auth", title: "JWT Bearer Token Authentication", level: 1 },
    { id: "api-keys", title: "API Key Authentication", level: 1 },
    { id: "oauth-integration", title: "OAuth 2.0 Integration", level: 1 },
    { id: "role-based-access", title: "Role-Based Access Control", level: 1 },
    { id: "security-measures", title: "Security Measures", level: 1 },
    { id: "auth-endpoints", title: "Authentication Endpoints", level: 1 },
    { id: "implementation-guide", title: "Implementation Guide", level: 1 }
  ],
  introduction: {
    id: "introduction",
    title: "Authentication & Security",
    content: `Secure access to the CareerForge API requires proper authentication and authorization mechanisms. Our multi-layered security approach ensures that only authorized users and applications can access sensitive data and perform operations.

This guide covers all authentication methods, security protocols, and best practices for integrating with our API securely.`
  },
  sections: [
    {
      id: "auth-overview",
      title: "Authentication Overview",
      content: `CareerForge supports multiple authentication methods to accommodate different integration scenarios:

### Supported Authentication Methods

1. **JWT Bearer Tokens**: Primary authentication method for user sessions
2. **API Keys**: For server-to-server communication and service accounts
3. **OAuth 2.0**: Third-party integrations and social login
4. **Supabase Auth**: Integrated authentication service for enhanced security

### Authentication Flow

\`\`\`mermaid
sequenceDiagram
    participant Client
    participant API
    participant Auth Service

    Client->>API: Request with credentials
    API->>Auth Service: Validate credentials
    Auth Service-->>API: Return tokens/permissions
    API-->>Client: Authenticated response
\`\`\`

### Security Principles

- **Defense in Depth**: Multiple security layers protect against various threats
- **Zero Trust**: Every request is validated regardless of origin
- **Least Privilege**: Users only receive minimum required permissions
- **Audit Logging**: All authentication events are logged and monitored`,
      calloutBoxes: [
        {
          type: "warning",
          title: "Security First",
          content: "Never expose authentication credentials in client-side code or public repositories."
        }
      ]
    },
    {
      id: "jwt-auth",
      title: "JWT Bearer Token Authentication",
      content: `JWT (JSON Web Tokens) provide stateless authentication with built-in expiration and claims:

### Token Structure

\`\`\`json
{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "user-123",
    "email": "user@example.com",
    "role": "job_seeker",
    "iat": 1640995200,
    "exp": 1641081600
  },
  "signature": "base64-encoded-signature"
}
\`\`\`

### Token Claims

- **sub**: User ID (subject)
- **email**: User email address
- **role**: User role (job_seeker, employer, admin)
- **iat**: Issued at timestamp
- **exp**: Expiration timestamp
- **permissions**: Array of granted permissions

### Token Lifecycle

1. **Login**: User provides credentials, receives access and refresh tokens
2. **Access**: Include Bearer token in Authorization header
3. **Refresh**: Use refresh token to obtain new access token before expiration
4. **Logout**: Invalidate tokens server-side

### Token Expiration

- **Access Tokens**: 15 minutes (short-lived for security)
- **Refresh Tokens**: 7 days (long-lived for convenience)`,
      codeExamples: [
        {
          id: "jwt-usage",
          title: "JWT Authentication Example",
          description: "Making authenticated API requests with JWT tokens",
          language: "javascript",
          code: `// Login to get tokens
const loginResponse = await fetch('/api/v1/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'secure-password'
  })
});

const { accessToken, refreshToken } = await loginResponse.json();

// Use access token for API calls
const jobsResponse = await fetch('/api/v1/jobs', {
  headers: {
    'Authorization': \`Bearer \${accessToken}\`,
    'Content-Type': 'application/json'
  }
});

// Refresh token when needed
const refreshResponse = await fetch('/api/v1/auth/refresh', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ refreshToken })
});`
        }
      ]
    },
    {
      id: "api-keys",
      title: "API Key Authentication",
      content: `API keys provide authentication for server-to-server communication and automated processes:

### Key Types

- **Service Keys**: For backend services and integrations
- **Personal Keys**: For individual developers and testing
- **Organization Keys**: For enterprise integrations

### Key Format

\`\`\`
cf_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
cf_test_yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
\`\`\`

### Key Management

- **Generation**: Keys are generated server-side with high entropy
- **Storage**: Keys should be stored securely (environment variables, key vaults)
- **Rotation**: Regular key rotation for security maintenance
- **Revocation**: Immediate key invalidation when compromised

### Usage

\`\`\`bash
curl -H "Authorization: Bearer cf_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" \\
     -H "Content-Type: application/json" \\
     https://api.careerforge.com/v1/jobs
\`\`\`

### Rate Limiting

API keys have separate rate limits from user authentication:
- Service keys: 1000 requests per minute
- Personal keys: 100 requests per minute
- Organization keys: Custom limits based on contract`,
      calloutBoxes: [
        {
          type: "error",
          title: "Key Security",
          content: "Treat API keys like passwords. Never commit them to version control or expose in logs."
        }
      ]
    },
    {
      id: "oauth-integration",
      title: "OAuth 2.0 Integration",
      content: `OAuth 2.0 enables third-party applications to access CareerForge on behalf of users:

### Supported Providers

- **Google**: Gmail integration and social login
- **LinkedIn**: Professional profile data and networking
- **GitHub**: Developer portfolio and project data
- **Microsoft**: Office 365 integration

### OAuth Flow

\`\`\`mermaid
sequenceDiagram
    participant User
    participant Client
    participant CareerForge
    participant OAuth Provider

    User->>Client: Initiate OAuth login
    Client->>CareerForge: Request authorization URL
    CareerForge-->>Client: Authorization URL
    Client->>User: Redirect to provider
    User->>OAuth Provider: Grant permissions
    OAuth Provider-->>CareerForge: Authorization code
    CareerForge->>OAuth Provider: Exchange code for tokens
    CareerForge-->>Client: Access tokens
\`\`\`

### Scopes

Available OAuth scopes for different access levels:

\`\`\`json
{
  "profile": "Basic user profile information",
  "email": "User email address",
  "jobs:read": "Read job postings and applications",
  "jobs:write": "Create and manage job postings",
  "company:admin": "Company administration",
  "analytics:read": "Access analytics data"
}
\`\`\`

### Token Management

OAuth tokens follow the same lifecycle as JWT tokens but include provider-specific metadata.`,
      codeExamples: [
        {
          id: "oauth-implementation",
          title: "OAuth Integration Example",
          description: "Implementing OAuth login flow",
          language: "typescript",
          code: `interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  scopes: string[];
}

class OAuthService {
  async initiateLogin(provider: 'google' | 'linkedin' | 'github') {
    const config = this.getProviderConfig(provider);

    const authUrl = \`https://api.careerforge.com/v1/auth/oauth/\${provider}?\` +
      new URLSearchParams({
        client_id: config.clientId,
        redirect_uri: config.redirectUri,
        scope: config.scopes.join(' '),
        response_type: 'code',
        state: this.generateState()
      });

    return { authUrl, state: this.state };
  }

  async handleCallback(code: string, state: string) {
    // Verify state parameter
    if (state !== this.expectedState) {
      throw new Error('Invalid state parameter');
    }

    // Exchange code for tokens
    const tokenResponse = await fetch('/api/v1/auth/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        grant_type: 'authorization_code',
        redirect_uri: this.config.redirectUri
      })
    });

    return await tokenResponse.json();
  }
}`
        }
      ]
    },
    {
      id: "role-based-access",
      title: "Role-Based Access Control",
      content: `RBAC ensures users only access resources appropriate to their role and permissions:

### User Roles

#### Job Seeker
\`\`\`json
{
  "role": "job_seeker",
  "permissions": [
    "jobs:read",
    "jobs:search",
    "applications:create",
    "applications:read",
    "profile:read",
    "profile:write",
    "messages:read",
    "messages:write"
  ]
}
\`\`\`

#### Employer
\`\`\`json
{
  "role": "employer",
  "permissions": [
    "jobs:create",
    "jobs:read",
    "jobs:write",
    "jobs:delete",
    "company:read",
    "company:write",
    "applications:read",
    "applications:write",
    "analytics:read",
    "messages:read",
    "messages:write"
  ]
}
\`\`\`

#### Admin
\`\`\`json
{
  "role": "admin",
  "permissions": [
    "admin:users",
    "admin:companies",
    "admin:jobs",
    "admin:analytics",
    "admin:system",
    "admin:security"
  ]
}
\`\`\`

### Permission Checking

All API endpoints perform permission validation:

\`\`\`typescript
const requirePermission = (permission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userPermissions = req.user?.permissions || [];

    if (!userPermissions.includes(permission)) {
      return res.status(403).json({
        success: false,
        error: {
          code: 'FORBIDDEN',
          message: 'Insufficient permissions'
        }
      });
    }

    next();
  };
};

// Usage in routes
router.get('/jobs', requirePermission('jobs:read'), getJobs);
router.post('/jobs', requirePermission('jobs:create'), createJob);
\`\`\`

### Dynamic Permissions

Some permissions are context-dependent:
- \`jobs:write\` only for jobs owned by the user's company
- \`applications:write\` only for applications to company's jobs
- \`messages:write\` only between connected users`,
      lists: [
        {
          type: "unordered",
          items: [
            "Permissions are checked on every request",
            "Role changes take effect immediately",
            "Audit logs track permission usage",
            "Fine-grained permissions prevent over-permissive access"
          ]
        }
      ]
    },
    {
      id: "security-measures",
      title: "Security Measures",
      content: `Multiple security layers protect the API and user data:

### Transport Security

- **HTTPS Only**: All traffic encrypted with TLS 1.3
- **HSTS**: Strict Transport Security headers
- **Certificate Pinning**: Recommended for mobile applications

### Input Validation

- **Schema Validation**: All inputs validated against JSON schemas
- **Sanitization**: XSS and injection prevention
- **Type Checking**: Runtime type validation with TypeScript

### Session Security

- **Secure Cookies**: HttpOnly, Secure, SameSite flags
- **CSRF Protection**: Token-based CSRF prevention
- **Session Management**: Automatic session cleanup and monitoring

### Monitoring & Alerting

- **Security Logs**: All authentication events logged
- **Anomaly Detection**: Machine learning detects suspicious patterns
- **Automated Alerts**: Security team notified of threats
- **Compliance**: SOC 2 Type II and GDPR compliant

### Data Protection

- **Encryption at Rest**: AES-256 encryption for sensitive data
- **Field-Level Encryption**: Individual field encryption where needed
- **Data Masking**: Sensitive data masked in logs
- **Retention Policies**: Automatic data cleanup per compliance requirements`,
      calloutBoxes: [
        {
          type: "success",
          title: "Security Compliance",
          content: "CareerForge maintains SOC 2 Type II certification and GDPR compliance for enterprise security."
        }
      ]
    },
    {
      id: "auth-endpoints",
      title: "Authentication Endpoints",
      content: `Complete reference for all authentication-related API endpoints:

### User Authentication

#### POST /auth/login
Authenticate user with email and password.

**Request:**
\`\`\`json
{
  "email": "user@example.com",
  "password": "secure-password",
  "rememberMe": false
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "user": {
      "id": "user-123",
      "email": "user@example.com",
      "role": "job_seeker"
    },
    "expiresIn": 900
  }
}
\`\`\`

#### POST /auth/register
Register new user account.

#### POST /auth/refresh
Refresh access token using refresh token.

#### POST /auth/logout
Invalidate user session.

### OAuth Endpoints

#### GET /auth/oauth/{provider}
Initiate OAuth flow for specified provider.

#### POST /auth/oauth/token
Exchange authorization code for tokens.

#### GET /auth/oauth/callback
OAuth provider callback endpoint.

### API Key Management

#### POST /auth/keys
Generate new API key.

#### GET /auth/keys
List user's API keys.

#### DELETE /auth/keys/{keyId}
Revoke API key.

### Password Management

#### POST /auth/forgot-password
Initiate password reset.

#### POST /auth/reset-password
Reset password with token.

#### PUT /auth/change-password
Change authenticated user's password.`,
      codeExamples: [
        {
          id: "auth-endpoint-usage",
          title: "Authentication Endpoint Usage",
          description: "Complete authentication flow implementation",
          language: "typescript",
          code: `class AuthService {
  private baseUrl = 'https://api.careerforge.com/v1';

  async login(email: string, password: string) {
    const response = await fetch(\`\${this.baseUrl}/auth/login\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    this.storeTokens(data.data);
    return data.data.user;
  }

  async refreshToken() {
    const refreshToken = this.getStoredRefreshToken();

    const response = await fetch(\`\${this.baseUrl}/auth/refresh\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });

    if (!response.ok) {
      this.logout();
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    this.storeTokens(data.data);
    return data.data.accessToken;
  }

  private storeTokens(tokens: any) {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  }

  private getStoredRefreshToken() {
    return localStorage.getItem('refreshToken');
  }
}`
        }
      ]
    },
    {
      id: "implementation-guide",
      title: "Implementation Guide",
      content: `Step-by-step guide for implementing authentication in your application:

### 1. Choose Authentication Method

Select the appropriate authentication method based on your use case:

- **Web Applications**: JWT Bearer tokens with refresh flow
- **Mobile Apps**: JWT tokens with secure storage
- **Server Integrations**: API keys for service accounts
- **Third-party Apps**: OAuth 2.0 for delegated access

### 2. Implement Token Management

Create a robust token management system:

\`\`\`typescript
class TokenManager {
  private refreshPromise: Promise<string> | null = null;

  async getValidToken(): Promise<string> {
    const token = this.getStoredAccessToken();

    if (this.isTokenExpired(token)) {
      return await this.refreshAccessToken();
    }

    return token;
  }

  private async refreshAccessToken(): Promise<string> {
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.performTokenRefresh();
    const newToken = await this.refreshPromise;
    this.refreshPromise = null;

    return newToken;
  }
}
\`\`\`

### 3. Handle Authentication Errors

Implement proper error handling for authentication failures:

\`\`\`typescript
const handleAuthError = (error: any) => {
  switch (error.code) {
    case 'TOKEN_EXPIRED':
      // Attempt token refresh
      return refreshToken().then(() => retryRequest());

    case 'INVALID_TOKEN':
      // Redirect to login
      redirectToLogin();
      break;

    case 'INSUFFICIENT_PERMISSIONS':
      // Show permission error
      showError('Insufficient permissions');
      break;

    default:
      showError('Authentication error');
  }
};
\`\`\`

### 4. Secure Token Storage

Use appropriate storage mechanisms for different platforms:

- **Web**: HttpOnly cookies for refresh tokens, memory for access tokens
- **Mobile**: Secure keychain/key store for tokens
- **Desktop**: Encrypted credential storage

### 5. Implement Logout

Proper logout invalidates tokens on both client and server:

\`\`\`typescript
async logout() {
  try {
    // Server-side logout
    await fetch('/api/v1/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': \`Bearer \${this.accessToken}\`
      }
    });
  } finally {
    // Client-side cleanup
    this.clearStoredTokens();
    this.clearUserData();
    redirectToLogin();
  }
}
\`\`\`

### 6. Monitor Authentication

Track authentication metrics and security events:

- Login success/failure rates
- Token refresh frequency
- Permission denied attempts
- Suspicious activity patterns`,
      lists: [
        {
          type: "ordered",
          items: [
            "Implement automatic token refresh before expiration",
            "Handle network errors gracefully during authentication",
            "Validate tokens on every request",
            "Log authentication events for security monitoring",
            "Implement proper logout flows",
            "Use secure storage for sensitive authentication data"
          ]
        }
      ]
    }
  ],
  nextSteps: {
    title: "Next Steps",
    links: [
      {
        text: "User Management API",
        href: "/docs/backend-api/user-management",
        description: "User CRUD operations and profile management"
      },
      {
        text: "Rate Limiting Guide",
        href: "/docs/backend-api/rate-limiting",
        description: "Understanding and working with API rate limits"
      },
      {
        text: "Security Best Practices",
        href: "/docs/architecture/security-posture",
        description: "Additional security considerations and compliance"
      }
    ]
  },
  relatedResources: [
    {
      text: "API Overview",
      href: "/docs/backend-api/introduction",
      description: "General API information and getting started"
    },
    {
      text: "Error Handling",
      href: "/docs/backend-api/error-handling",
      description: "How to handle authentication and other API errors"
    },
    {
      text: "Frontend Authentication",
      href: "/docs/frontend/authentication-pages",
      description: "Frontend implementation of authentication flows"
    }
  ]
}