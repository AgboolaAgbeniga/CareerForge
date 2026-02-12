import { AppShell } from '@/components/AppShell'
import type { Metadata } from 'next'
import Link from 'next/link'
import { 
  Code,
  ExternalLink,
  Copy,
  CheckCircle,
  Book,
  Key,
  Shield,
  Zap,
  Database,
  Users,
  Settings,
  Globe,
  AlertTriangle,
  Info,
  ArrowRight
} from 'lucide-react'
import { useState } from 'react'

export const metadata: Metadata = {
  title: 'API Reference | CareerForge Documentation',
  description: 'Complete CareerForge API documentation with authentication, endpoints, examples, and integration guides.',
  openGraph: {
    title: 'CareerForge API Reference',
    description: 'Complete API documentation for CareerForge recruitment platform',
    type: 'website',
  },
}

const apiSections = [
  {
    title: 'Authentication',
    icon: <Key className="h-5 w-5" />,
    description: 'Secure API access with OAuth 2.0 and API keys',
    endpoints: [
      {
        method: 'POST',
        path: '/v2/auth/token',
        description: 'Obtain access token',
        example: {
          request: `curl -X POST "https://api.careerforge.ai/v2/auth/token" \\
  -H "Content-Type: application/json" \\
  -d '{
    "grant_type": "client_credentials",
    "client_id": "your_client_id",
    "client_secret": "your_client_secret"
  }'`,
          response: `{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "expires_in": 3600,
  "refresh_token": "rt_1234567890abcdef"
}`
        }
      },
      {
        method: 'POST',
        path: '/v2/auth/refresh',
        description: 'Refresh access token',
        example: {
          request: `curl -X POST "https://api.careerforge.ai/v2/auth/refresh" \\
  -H "Content-Type: application/json" \\
  -d '{
    "refresh_token": "rt_1234567890abcdef"
  }'`,
          response: `{
  "access_token": "new_access_token_here",
  "token_type": "Bearer",
  "expires_in": 3600
}`
        }
      }
    ]
  },
  {
    title: 'Jobs',
    icon: <Globe className="h-5 w-5" />,
    description: 'Manage job postings and requirements',
    endpoints: [
      {
        method: 'GET',
        path: '/v2/jobs',
        description: 'List all jobs with filtering and pagination',
        example: {
          request: `curl -X GET "https://api.careerforge.ai/v2/jobs?status=active&limit=10&offset=0" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"`,
          response: `{
  "jobs": [
    {
      "id": "job_1234567890",
      "title": "Senior Software Engineer",
      "department": "Engineering",
      "location": "San Francisco, CA",
      "type": "full-time",
      "status": "active",
      "created_at": "2025-12-26T10:00:00Z",
      "updated_at": "2025-12-26T15:30:00Z"
    }
  ],
  "pagination": {
    "total": 45,
    "limit": 10,
    "offset": 0,
    "has_more": true
  }
}`
        }
      },
      {
        method: 'POST',
        path: '/v2/jobs',
        description: 'Create a new job posting',
        example: {
          request: `curl -X POST "https://api.careerforge.ai/v2/jobs" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Senior Software Engineer",
    "department": "Engineering",
    "location": "San Francisco, CA",
    "type": "full-time",
    "description": "We are looking for...",
    "requirements": ["5+ years experience", "JavaScript"],
    "salary_range": {"min": 120000, "max": 180000}
  }'`,
          response: `{
  "job": {
    "id": "job_1234567890",
    "title": "Senior Software Engineer",
    "status": "draft",
    "created_at": "2025-12-26T16:00:00Z"
  }
}`
        }
      }
    ]
  },
  {
    title: 'Candidates',
    icon: <Users className="h-5 w-5" />,
    description: 'Manage candidate profiles and data',
    endpoints: [
      {
        method: 'GET',
        path: '/v2/candidates',
        description: 'List candidates with search and filtering',
        example: {
          request: `curl -X GET "https://api.careerforge.ai/v2/candidates?status=active&skills=javascript&location=ca" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"`,
          response: `{
  "candidates": [
    {
      "id": "cand_1234567890",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1-555-0123",
      "location": "San Francisco, CA",
      "skills": ["JavaScript", "React", "Node.js"],
      "experience_years": 5,
      "status": "active",
      "created_at": "2025-12-20T09:00:00Z"
    }
  ],
  "pagination": {
    "total": 123,
    "limit": 10,
    "offset": 0
  }
}`
        }
      },
      {
        method: 'POST',
        path: '/v2/candidates',
        description: 'Create or update candidate profile',
        example: {
          request: `curl -X POST "https://api.careerforge.ai/v2/candidates" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "+1-555-0124",
    "location": "Los Angeles, CA",
    "skills": ["Python", "Django", "PostgreSQL"],
    "experience_years": 3,
    "resume_url": "https://example.com/resume.pdf"
  }'`,
          response: `{
  "candidate": {
    "id": "cand_0987654321",
    "name": "Jane Smith",
    "status": "active",
    "created_at": "2025-12-26T16:15:00Z"
  }
}`
        }
      }
    ]
  },
  {
    title: 'Matching',
    icon: <Zap className="h-5 w-5" />,
    description: 'AI-powered candidate-job matching',
    endpoints: [
      {
        method: 'POST',
        path: '/v2/matching/find',
        description: 'Find best candidate matches for a job',
        example: {
          request: `curl -X POST "https://api.careerforge.ai/v2/matching/find" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "job_id": "job_1234567890",
    "criteria": {
      "skills_match_weight": 0.4,
      "experience_match_weight": 0.3,
      "location_preference": 0.2,
      "salary_alignment": 0.1
    },
    "min_match_score": 0.7,
    "limit": 10
  }'`,
          response: `{
  "matches": [
    {
      "candidate_id": "cand_1234567890",
      "match_score": 0.92,
      "skill_match": 95,
      "experience_match": 88,
      "location_match": 100,
      "salary_alignment": 85,
      "rank": 1
    }
  ],
  "total_matches": 15,
  "processing_time_ms": 245
}`
        }
      }
    ]
  },
  {
    title: 'Analytics',
    icon: <Database className="h-5 w-5" />,
    description: 'Recruitment metrics and reporting',
    endpoints: [
      {
        method: 'GET',
        path: '/v2/analytics/dashboard',
        description: 'Get recruitment analytics dashboard data',
        example: {
          request: `curl -X GET "https://api.careerforge.ai/v2/analytics/dashboard?time_range=last_30_days" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"`,
          response: `{
  "metrics": {
    "applications_received": 145,
    "candidates_screened": 89,
    "interviews_scheduled": 34,
    "offers_made": 12,
    "hires_completed": 8,
    "conversion_rate": 5.5,
    "average_time_to_hire": 18,
    "cost_per_hire": 4200
  },
  "trends": {
    "application_volume": "+12%",
    "hiring_velocity": "+8%",
    "candidate_quality": "+15%"
  }
}`
        }
      }
    ]
  },
  {
    title: 'Applications',
    icon: <Settings className="h-5 w-5" />,
    description: 'Manage job applications and status updates',
    endpoints: [
      {
        method: 'POST',
        path: '/v2/applications',
        description: 'Create new application or update existing',
        example: {
          request: `curl -X POST "https://api.careerforge.ai/v2/applications" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "job_id": "job_1234567890",
    "candidate_id": "cand_1234567890",
    "status": "submitted",
    "source": "website",
    "notes": "Applied via career page"
  }'`,
          response: `{
  "application": {
    "id": "app_1234567890",
    "job_id": "job_1234567890",
    "candidate_id": "cand_1234567890",
    "status": "submitted",
    "created_at": "2025-12-26T16:30:00Z",
    "updated_at": "2025-12-26T16:30:00Z"
  }
}`
        }
      },
      {
        method: 'PATCH',
        path: '/v2/applications/{id}',
        description: 'Update application status or details',
        example: {
          request: `curl -X PATCH "https://api.careerforge.ai/v2/applications/app_1234567890" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "status": "interview_scheduled",
    "notes": "Phone screening completed, technical interview scheduled"
  }'`,
          response: `{
  "application": {
    "id": "app_1234567890",
    "status": "interview_scheduled",
    "updated_at": "2025-12-26T17:00:00Z",
    "timeline": [
      {"status": "submitted", "timestamp": "2025-12-26T16:30:00Z"},
      {"status": "screening", "timestamp": "2025-12-26T16:45:00Z"},
      {"status": "interview_scheduled", "timestamp": "2025-12-26T17:00:00Z"}
    ]
  }
}`
        }
      }
    ]
  }
];

export default function APIReferencePage() {
  const [activeSection, setActiveSection] = useState(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-100 text-green-800 border-green-200';
      case 'POST': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'PUT': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'PATCH': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'DELETE': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <AppShell>
      <div className="py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            API Reference
          </h1>
          <p className="text-xl text-muted-foreground">
            Complete CareerForge API documentation with authentication, endpoints, and examples
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <div className="bg-muted/50 border border-border rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4">API Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <Shield className="h-6 w-6 text-blue-600 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Authentication</h4>
                  <p className="text-sm text-muted-foreground">
                    OAuth 2.0 with client credentials flow
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Zap className="h-6 w-6 text-yellow-600 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Performance</h4>
                  <p className="text-sm text-muted-foreground">
                    Sub-200ms response times, 99.9% uptime
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Globe className="h-6 w-6 text-green-600 mt-1" />
                <div>
                  <h4 className="font-medium mb-1">Global Scale</h4>
                  <p className="text-sm text-muted-foreground">
                    CDN-powered with global availability
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground mb-3">
                  API Sections
                </h3>
                <nav className="space-y-1">
                  {apiSections.map((section, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSection(index)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                        activeSection === index
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      {section.icon}
                      <span>{section.title}</span>
                    </button>
                  ))}
                </nav>

                <div className="mt-8 space-y-4">
                  <div className="bg-card border border-border rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center">
                      <Book className="h-4 w-4 mr-2" />
                      Quick Start
                    </h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>• Get your API key</li>
                      <li>• Authenticate requests</li>
                      <li>• Make your first call</li>
                    </ul>
                    <Link href="/docs/quickstart" className="text-primary hover:underline text-sm mt-2 inline-block">
                      View Quick Start →
                    </Link>
                  </div>

                  <div className="bg-card border border-border rounded-lg p-4">
                    <h4 className="font-medium mb-2">Need Help?</h4>
                    <Link href="/docs/resources/support" className="text-primary hover:underline text-sm">
                      Contact Support →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {apiSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className={`${activeSection === sectionIndex ? 'block' : 'hidden'}`}>
                  <div className="mb-6">
                    <div className="flex items-center space-x-3 mb-4">
                      {section.icon}
                      <h2 className="text-2xl font-bold">{section.title}</h2>
                    </div>
                    <p className="text-muted-foreground">{section.description}</p>
                  </div>

                  <div className="space-y-8">
                    {section.endpoints.map((endpoint, endpointIndex) => (
                      <div key={endpointIndex} className="bg-card border border-border rounded-lg overflow-hidden">
                        <div className="p-6 border-b border-border">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded border ${getMethodColor(endpoint.method)}`}>
                              {endpoint.method}
                            </span>
                            <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                              {endpoint.path}
                            </code>
                          </div>
                          <p className="text-sm text-muted-foreground">{endpoint.description}</p>
                        </div>

                        <div className="p-6">
                          <h4 className="font-medium mb-3">Request Example</h4>
                          <div className="relative mb-6">
                            <pre className="bg-muted/50 p-4 rounded-lg text-sm overflow-x-auto">
                              <code>{endpoint.example.request}</code>
                            </pre>
                            <button
                              onClick={() => copyToClipboard(endpoint.example.request, `${sectionIndex}-${endpointIndex}-request`)}
                              className="absolute top-2 right-2 p-2 bg-background/80 hover:bg-background rounded-md transition-colors"
                              title="Copy request"
                            >
                              {copiedCode === `${sectionIndex}-${endpointIndex}-request` ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </button>
                          </div>

                          <h4 className="font-medium mb-3">Response Example</h4>
                          <div className="relative">
                            <pre className="bg-muted/50 p-4 rounded-lg text-sm overflow-x-auto">
                              <code>{endpoint.example.response}</code>
                            </pre>
                            <button
                              onClick={() => copyToClipboard(endpoint.example.response, `${sectionIndex}-${endpointIndex}-response`)}
                              className="absolute top-2 right-2 p-2 bg-background/80 hover:bg-background rounded-md transition-colors"
                              title="Copy response"
                            >
                              {copiedCode === `${sectionIndex}-${endpointIndex}-response` ? (
                                <CheckCircle className="h-4 w-4 text-green-600" />
                              ) : (
                                <Copy className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-muted/50 border border-border rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold mb-4">Additional Resources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <Code className="h-4 w-4 mr-2" />
                  SDKs & Libraries
                </h4>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• <a href="#" className="text-primary hover:underline">JavaScript/Node.js SDK</a></li>
                  <li>• <a href="#" className="text-primary hover:underline">Python SDK</a></li>
                  <li>• <a href="#" className="text-primary hover:underline">PHP SDK</a></li>
                  <li>• <a href="#" className="text-primary hover:underline">Ruby SDK</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2 flex items-center">
                  <Book className="h-4 w-4 mr-2" />
                  Guides & Tutorials
                </h4>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li>• <Link href="/docs/resources/examples" className="text-primary hover:underline">Integration Examples</Link></li>
                  <li>• <a href="#" className="text-primary hover:underline">Best Practices Guide</a></li>
                  <li>• <a href="#" className="text-primary hover:underline">Webhooks Documentation</a></li>
                  <li>• <a href="#" className="text-primary hover:underline">Rate Limiting Guide</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Info className="h-5 w-5 mr-2 text-blue-600" />
              API Status & Support
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-medium text-blue-900">API Status</div>
                <div className="text-blue-700">All systems operational</div>
              </div>
              <div>
                <div className="font-medium text-blue-900">Response Time</div>
                <div className="text-blue-700">Average: 145ms</div>
              </div>
              <div>
                <div className="font-medium text-blue-900">Support</div>
                <div className="text-blue-700">24/7 monitoring</div>
              </div>
            </div>
          </div>

          <div className="text-center py-8">
            <h3 className="text-lg font-semibold mb-4">Ready to Start Building?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/docs/quickstart"
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Get Started
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
              <a
                href="https://github.com/careerforge/careerforge-api-examples"
                className="inline-flex items-center px-6 py-3 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <Code className="h-4 w-4 mr-2" />
                View Examples
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}