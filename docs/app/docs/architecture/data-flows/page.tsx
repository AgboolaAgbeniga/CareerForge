import { AppShell } from '@/components/AppShell'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Data Flows | CareerForge Documentation',
  description: 'Comprehensive guide to CareerForge data flow patterns, request/response flows, and data processing pipelines for system reliability.',
  openGraph: {
    title: 'CareerForge Data Flows',
    description: 'Data flow patterns and request/response flows',
    type: 'website',
  },
}

export default function DataFlowsPage() {
  return (
    <AppShell>
      <div className="py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Data Flows
          </h1>
          <p className="text-xl text-muted-foreground">
            Understanding how data flows through the CareerForge system
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>Overview</h2>
          <p>
            CareerForge processes large volumes of structured and unstructured data through well-defined 
            flow patterns. This document outlines the key data flows, from user interactions to AI processing, 
            ensuring reliability, scalability, and performance.
          </p>

          <h2>Core Data Flow Patterns</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Request-Response Pattern</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Synchronous communication for immediate user interactions
              </p>
              <ul className="text-sm space-y-1">
                <li>• User authentication and login</li>
                <li>• Job search and filtering</li>
                <li>• Profile management</li>
                <li>• Real-time matching requests</li>
                <li>• Message sending and delivery</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Event-Driven Pattern</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Asynchronous processing for background operations
              </p>
              <ul className="text-sm space-y-1">
                <li>• Resume upload and parsing</li>
                <li>• Batch job-candidate matching</li>
                <li>• Analytics data collection</li>
                <li>• Notification delivery</li>
                <li>• Report generation</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Streaming Pattern</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Real-time data streams for live updates
              </p>
              <ul className="text-sm space-y-1">
                <li>• WebSocket messaging</li>
                <li>• Live match notifications</li>
                <li>• Real-time analytics</li>
                <li>• Activity feeds</li>
                <li>• System monitoring</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Batch Processing Pattern</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Scheduled processing for large-scale operations
              </p>
              <ul className="text-sm space-y-1">
                <li>• Daily matching algorithm runs</li>
                <li>• Weekly analytics aggregation</li>
                <li>• Monthly report generation</li>
                <li>• Data archival and cleanup</li>
                <li>• Model retraining</li>
              </ul>
            </div>
          </div>

          <h2>Key User Journey Data Flows</h2>

          <h3>1. Job Seeker Onboarding Flow</h3>
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-4">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                <div>
                  <h4 className="font-semibold">User Registration</h4>
                  <p className="text-sm text-muted-foreground">Authentication Service validates user data and creates account</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                <div>
                  <h4 className="font-semibold">Resume Upload</h4>
                  <p className="text-sm text-muted-foreground">File uploaded to Storage Service, queued for parsing</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                <div>
                  <h4 className="font-semibold">AI Resume Processing</h4>
                  <p className="text-sm text-muted-foreground">Resume Parser Service extracts skills, experience, education</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                <div>
                  <h4 className="font-semibold">Profile Creation</h4>
                  <p className="text-sm text-muted-foreground">User data stored in Database, embeddings created in Vector DB</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">5</div>
                <div>
                  <h4 className="font-semibold">Initial Matching</h4>
                  <p className="text-sm text-muted-foreground">Matching Engine finds compatible jobs based on profile</p>
                </div>
              </div>
            </div>
          </div>

          <h3>2. Job Posting Flow</h3>
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-4">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                <div>
                  <h4 className="font-semibold">Job Creation</h4>
                  <p className="text-sm text-muted-foreground">Recruiter creates job posting via Job Management Service</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                <div>
                  <h4 className="font-semibold">Requirements Analysis</h4>
                  <p className="text-sm text-muted-foreground">Job requirements extracted and structured</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                <div>
                  <h4 className="font-semibold">Vector Embedding</h4>
                  <p className="text-sm text-muted-foreground">Job description converted to vector for semantic matching</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                <div>
                  <h4 className="font-semibold">Candidate Matching</h4>
                  <p className="text-sm text-muted-foreground">Matching Engine finds relevant candidates</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">5</div>
                <div>
                  <h4 className="font-semibold">Notification Delivery</h4>
                  <p className="text-sm text-muted-foreground">Matching candidates notified via Notification Service</p>
                </div>
              </div>
            </div>
          </div>

          <h3>3. Real-time Messaging Flow</h3>
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-4">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                <div>
                  <h4 className="font-semibold">WebSocket Connection</h4>
                  <p className="text-sm text-muted-foreground">User establishes WebSocket connection with Messaging Service</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                <div>
                  <h4 className="font-semibold">Message Send</h4>
                  <p className="text-sm text-muted-foreground">User sends message via WebSocket, validated by Authentication</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                <div>
                  <h4 className="font-semibold">Message Storage</h4>
                  <p className="text-sm text-muted-foreground">Message stored in Database with encryption</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">4</div>
                <div>
                  <h4 className="font-semibold">Real-time Delivery</h4>
                  <p className="text-sm text-muted-foreground">Message delivered to recipient via WebSocket</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-xs font-bold">5</div>
                <div>
                  <h4 className="font-semibold">Read Receipt</h4>
                  <p className="text-sm text-muted-foreground">Delivery confirmation sent back to sender</p>
                </div>
              </div>
            </div>
          </div>

          <h2>Data Processing Pipelines</h2>

          <h3>Resume Processing Pipeline</h3>
          <div className="overflow-x-auto my-6">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Stage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Processing
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Output
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Upload</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Storage Service</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">File validation, virus scan</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Validated file</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Extract</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Resume Parser</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Text extraction from PDF/DOCX</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Raw text content</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Parse</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Resume Parser</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">AI-powered structure extraction</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Structured resume data</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Validate</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Resume Parser</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Data quality checks</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Clean, validated data</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Store</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Database</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Structured data persistence</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Profile record</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Embed</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Vector Service</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Semantic embedding generation</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Vector embeddings</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3>Matching Pipeline</h3>
          <div className="overflow-x-auto my-6">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Stage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Processing
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Output
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Input</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Matching Engine</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Job requirements or candidate profile</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Search query</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Search</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Vector Service</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Semantic similarity search</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Initial candidate pool</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Score</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Matching Engine</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Multi-factor scoring algorithm</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Match scores</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Filter</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Matching Engine</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Apply business rules and filters</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Filtered results</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Rank</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Matching Engine</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Sort by match score and relevance</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Ranked results</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Cache</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Redis Cache</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Store results for performance</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Cached match results</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Error Handling and Resilience</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="bg-muted/50 border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Circuit Breaker Pattern</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Prevents cascade failures by stopping requests to failing services
              </p>
              <ul className="text-sm space-y-1">
                <li>• Service health monitoring</li>
                <li>• Automatic failure detection</li>
                <li>• Graceful degradation</li>
                <li>• Automatic recovery</li>
              </ul>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Retry Logic</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Intelligent retry mechanisms for transient failures
              </p>
              <ul className="text-sm space-y-1">
                <li>• Exponential backoff</li>
                <li>• Maximum retry limits</li>
                <li>• Idempotent operations</li>
                <li>• Dead letter queues</li>
              </ul>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Data Validation</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Multi-layer validation ensures data quality
              </p>
              <ul className="text-sm space-y-1">
                <li>• Input validation at API level</li>
                <li>• Business rule validation</li>
                <li>• Data type validation</li>
                <li>• Schema validation</li>
              </ul>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Monitoring and Alerting</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Comprehensive monitoring for proactive issue detection
              </p>
              <ul className="text-sm space-y-1">
                <li>• Real-time performance metrics</li>
                <li>• Error rate monitoring</li>
                <li>• Data flow tracking</li>
                <li>• Automated alerting</li>
              </ul>
            </div>
          </div>

          <h2>Performance Optimization</h2>
          
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <h3 className="text-lg font-semibold mb-3">Caching Strategy</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div>
                <h4 className="font-medium mb-2">Application Cache</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• User sessions (Redis)</li>
                  <li>• Match results (Redis)</li>
                  <li>• Job search results (Redis)</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Database Cache</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Query result cache</li>
                  <li>• Computed aggregations</li>
                  <li>• Frequently accessed data</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">CDN Cache</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Static assets</li>
                  <li>• API responses</li>
                  <li>• Generated reports</li>
                </ul>
              </div>
            </div>
          </div>

          <h2>Next Steps</h2>
          <p>
            Now that you understand our data flows, explore our{' '}
            <Link href="/docs/architecture/service-boundaries" className="text-primary hover:underline">
              Service Boundaries
            </Link>{' '}
            to see how services communicate, or learn about our{' '}
            <Link href="/docs/architecture/security-posture" className="text-primary hover:underline">
              Security Architecture
            </Link>.
          </p>
        </div>
      </div>
    </AppShell>
  )
}
