const versioningContent = {
  metadata: {
    title: 'API Versioning Strategy',
    description: 'Comprehensive guide to API versioning, backward compatibility, and migration strategies',
    keywords: ['API versioning', 'REST API', 'backward compatibility', 'migration', 'semantic versioning'],
    author: 'CareerForge Team',
    lastUpdated: '2025-12-28',
    version: '1.0.0'
  },
  toc: [
    { id: 'overview', title: 'Overview', level: 2 },
    { id: 'versioning-strategies', title: 'Versioning Strategies', level: 2 },
    { id: 'uri-versioning', title: 'URI Versioning', level: 3 },
    { id: 'header-versioning', title: 'Header Versioning', level: 3 },
    { id: 'content-negotiation', title: 'Content Negotiation', level: 3 },
    { id: 'semantic-versioning', title: 'Semantic Versioning', level: 2 },
    { id: 'backward-compatibility', title: 'Backward Compatibility', level: 2 },
    { id: 'breaking-changes', title: 'Breaking Changes', level: 3 },
    { id: 'deprecation-policy', title: 'Deprecation Policy', level: 3 },
    { id: 'migration-strategies', title: 'Migration Strategies', level: 2 },
    { id: 'version-discovery', title: 'Version Discovery', level: 2 },
    { id: 'implementation-guide', title: 'Implementation Guide', level: 2 },
    { id: 'best-practices', title: 'Best Practices', level: 2 }
  ],
  content: [
    {
      type: 'heading',
      level: 1,
      content: 'API Versioning Strategy'
    },
    {
      type: 'paragraph',
      content: 'This document outlines CareerForge\'s comprehensive API versioning strategy, ensuring backward compatibility, smooth migrations, and clear communication with API consumers.'
    },
    {
      type: 'heading',
      level: 2,
      content: 'Overview'
    },
    {
      type: 'paragraph',
      content: 'API versioning is crucial for maintaining stability while allowing evolution. Our strategy balances innovation with reliability, ensuring that existing integrations continue to work while new features are introduced.'
    },
    {
      type: 'code',
      language: 'typescript',
      content: `// Version information in API responses
interface ApiResponse<T> {
  data: T
  meta: {
    version: string
    timestamp: string
    requestId: string
  }
}`
    },
    {
      type: 'heading',
      level: 2,
      content: 'Versioning Strategies'
    },
    {
      type: 'paragraph',
      content: 'We employ multiple versioning strategies depending on the change type and impact. Each strategy has specific use cases and implementation guidelines.'
    },
    {
      type: 'heading',
      level: 3,
      content: 'URI Versioning'
    },
    {
      type: 'paragraph',
      content: 'URI versioning embeds the version number directly in the API endpoint path. This is our primary versioning strategy for major API changes.'
    },
    {
      type: 'code',
      language: 'http',
      content: `# Version 1 endpoints
GET /api/v1/users
POST /api/v1/jobs

# Version 2 endpoints (breaking changes)
GET /api/v2/users
POST /api/v2/jobs`
    },
    {
      type: 'list',
      items: [
        '**Pros**: Explicit versioning, easy to understand, cache-friendly',
        '**Cons**: Requires duplicate routes, URL changes for clients',
        '**Usage**: Major version changes, breaking API modifications'
      ]
    },
    {
      type: 'heading',
      level: 3,
      content: 'Header Versioning'
    },
    {
      type: 'paragraph',
      content: 'Header versioning uses HTTP headers to specify the desired API version. This allows for more granular versioning without changing URLs.'
    },
    {
      type: 'code',
      language: 'http',
      content: `# Accept-Version header
GET /api/users
Accept-Version: v1.2.3

# Custom header
GET /api/users
X-API-Version: 2025-01-15`
    },
    {
      type: 'list',
      items: [
        '**Pros**: Clean URLs, flexible versioning, backward compatible',
        '**Cons**: Less explicit, requires header management',
        '**Usage**: Minor updates, feature additions, experimental features'
      ]
    },
    {
      type: 'heading',
      level: 3,
      content: 'Content Negotiation'
    },
    {
      type: 'paragraph',
      content: 'Content negotiation uses standard HTTP headers to negotiate API versions based on media types.'
    },
    {
      type: 'code',
      language: 'http',
      content: `# Content-Type negotiation
GET /api/users
Accept: application/vnd.careerforge.v1+json

# Vendor media types
Accept: application/vnd.careerforge.user.v2+json`
    },
    {
      type: 'heading',
      level: 2,
      content: 'Semantic Versioning'
    },
    {
      type: 'paragraph',
      content: 'We follow semantic versioning (SemVer) principles for API versions: MAJOR.MINOR.PATCH'
    },
    {
      type: 'table',
      headers: ['Version Component', 'Description', 'Example Change'],
      rows: [
        ['MAJOR', 'Breaking changes', 'Remove or rename fields, change response structure'],
        ['MINOR', 'Backward compatible additions', 'Add new fields, new endpoints'],
        ['PATCH', 'Bug fixes, no API changes', 'Fix response formatting, improve performance']
      ]
    },
    {
      type: 'code',
      language: 'typescript',
      content: `// Version comparison utility
class Version {
  constructor(private version: string) {}

  compare(other: Version): number {
    const [major, minor, patch] = this.version.split('.').map(Number)
    const [otherMajor, otherMinor, otherPatch] = other.version.split('.').map(Number)

    if (major !== otherMajor) return major > otherMajor ? 1 : -1
    if (minor !== otherMinor) return minor > otherMinor ? 1 : -1
    return patch > otherPatch ? 1 : -1
  }

  isCompatible(other: Version): boolean {
    const [major] = this.version.split('.').map(Number)
    const [otherMajor] = other.version.split('.').map(Number)
    return major === otherMajor
  }
}`
    },
    {
      type: 'heading',
      level: 2,
      content: 'Backward Compatibility'
    },
    {
      type: 'paragraph',
      content: 'Maintaining backward compatibility is essential for API reliability. We ensure that existing clients continue to work with newer API versions.'
    },
    {
      type: 'heading',
      level: 3,
      content: 'Breaking Changes'
    },
    {
      type: 'paragraph',
      content: 'Breaking changes require careful planning and clear communication. They are only introduced in major version releases.'
    },
    {
      type: 'list',
      items: [
        '**Field removal or renaming**: Use deprecation warnings first',
        '**Response structure changes**: Provide migration guides',
        '**Authentication changes**: Notify all clients in advance',
        '**Rate limit modifications**: Gradual implementation with warnings'
      ]
    },
    {
      type: 'heading',
      level: 3,
      content: 'Deprecation Policy'
    },
    {
      type: 'paragraph',
      content: 'Deprecated features follow a clear timeline before removal.'
    },
    {
      type: 'table',
      headers: ['Phase', 'Duration', 'Actions'],
      rows: [
        ['Deprecation Notice', '30 days', 'Add deprecation headers, update documentation'],
        ['Grace Period', '90 days', 'Continue support with warnings'],
        ['Removal', 'Immediate', 'Remove feature, return appropriate error']
      ]
    },
    {
      type: 'code',
      language: 'http',
      content: `# Deprecation warning headers
HTTP/1.1 200 OK
X-API-Deprecated: This endpoint will be removed in v2.0.0
X-API-Sunset: Wed, 21 Oct 2025 07:28:00 GMT
Link: <https://api.careerforge.com/docs/migration>; rel="deprecation"`
    },
    {
      type: 'heading',
      level: 2,
      content: 'Migration Strategies'
    },
    {
      type: 'paragraph',
      content: 'We provide comprehensive migration support to help clients transition between API versions.'
    },
    {
      type: 'list',
      items: [
        '**Parallel support**: Run multiple versions simultaneously',
        '**Migration guides**: Detailed documentation for each version change',
        '**SDK updates**: Updated client libraries with migration helpers',
        '**Support channels**: Dedicated migration assistance'
      ]
    },
    {
      type: 'code',
      language: 'typescript',
      content: `// Migration helper utility
class ApiMigrationHelper {
  static migrateUserData(oldData: any, targetVersion: string): any {
    switch (targetVersion) {
      case 'v2.0.0':
        return {
          ...oldData,
          profile: {
            firstName: oldData.firstName,
            lastName: oldData.lastName,
            email: oldData.email,
            preferences: oldData.preferences || {}
          }
        }
      default:
        return oldData
    }
  }

  static validateMigration(data: any, version: string): boolean {
    // Validate data structure for target version
    const schema = this.getSchemaForVersion(version)
    return this.validateAgainstSchema(data, schema)
  }
}`
    },
    {
      type: 'heading',
      level: 2,
      content: 'Version Discovery'
    },
    {
      type: 'paragraph',
      content: 'Clients can discover available API versions and capabilities through dedicated endpoints.'
    },
    {
      type: 'code',
      language: 'http',
      content: `# Get API versions
GET /api/versions

# Response
{
  "versions": [
    {
      "version": "v1.0.0",
      "status": "stable",
      "sunset": null,
      "documentation": "https://api.careerforge.com/docs/v1"
    },
    {
      "version": "v2.0.0",
      "status": "beta",
      "sunset": "2025-12-31",
      "documentation": "https://api.careerforge.com/docs/v2"
    }
  ],
  "current": "v1.0.0",
  "latest": "v2.0.0"
}`
    },
    {
      type: 'heading',
      level: 2,
      content: 'Implementation Guide'
    },
    {
      type: 'paragraph',
      content: 'Guidelines for implementing versioning in your API endpoints.'
    },
    {
      type: 'code',
      language: 'typescript',
      content: `// Version-aware route handler
import express from 'express'

const router = express.Router()

// Version middleware
const versionMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const version = req.headers['accept-version'] || req.headers['x-api-version'] || 'v1.0.0'
  req.apiVersion = version
  next()
}

// Version-specific handlers
router.get('/users', versionMiddleware, (req, res) => {
  const { apiVersion } = req

  switch (apiVersion) {
    case 'v2.0.0':
      return res.json({ users: [], meta: { version: apiVersion } })
    default:
      return res.json({ data: [], version: apiVersion })
  }
})`
    },
    {
      type: 'heading',
      level: 2,
      content: 'Best Practices'
    },
    {
      type: 'list',
      items: [
        '**Plan versioning from the start**: Include versioning in initial API design',
        '**Document everything**: Keep comprehensive change logs and migration guides',
        '**Test thoroughly**: Validate backward compatibility with automated tests',
        '**Communicate clearly**: Notify clients of upcoming changes well in advance',
        '**Monitor usage**: Track API version usage to plan deprecations',
        '**Provide SDKs**: Offer client libraries that handle versioning automatically',
        '**Use feature flags**: Test new features without version changes',
        '**Version external APIs**: Consider versioning for third-party integrations'
      ]
    },
    {
      type: 'code',
      language: 'typescript',
      content: `// API versioning best practices implementation
interface ApiVersionConfig {
  current: string
  supported: string[]
  deprecated: string[]
  experimental: string[]
}

class ApiVersionManager {
  private config: ApiVersionConfig

  constructor(config: ApiVersionConfig) {
    this.config = config
  }

  isSupported(version: string): boolean {
    return this.config.supported.includes(version)
  }

  isDeprecated(version: string): boolean {
    return this.config.deprecated.includes(version)
  }

  getMigrationPath(from: string, to: string): string[] {
    // Return array of versions to migrate through
    return [from, to] // Simplified
  }

  addDeprecationHeaders(res: Response, version: string): void {
    if (this.isDeprecated(version)) {
      res.set('X-API-Deprecated', \`Version \${version} is deprecated\`)
      res.set('X-API-Sunset', 'Wed, 21 Oct 2025 07:28:00 GMT')
    }
  }
}`
    }
  ]
}

export default versioningContent