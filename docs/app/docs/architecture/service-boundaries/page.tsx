import { AppShell } from '@/components/AppShell'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Service Boundaries | CareerForge Documentation',
  description: 'Understanding CareerForge microservices boundaries, responsibilities, and communication patterns for robust, scalable architecture.',
  openGraph: {
    title: 'CareerForge Service Boundaries',
    description: 'Microservices architecture boundaries and responsibilities',
    type: 'website',
  },
}

export default function ServiceBoundariesPage() {
  return (
    <AppShell>
      <div className="py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Service Boundaries
          </h1>
          <p className="text-xl text-muted-foreground">
            Understanding our microservices architecture boundaries and responsibilities
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>Architecture Overview</h2>
          <p>
            CareerForge follows a microservices architecture with clear service boundaries, 
            ensuring each service has a single responsibility and can be developed, deployed, 
            and scaled independently.
          </p>

          <h2>Core Services</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Authentication Service</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Handles user authentication, authorization, and session management
              </p>
              <ul className="text-sm space-y-1">
                <li>• User registration and login</li>
                <li>• JWT token generation and validation</li>
                <li>• OAuth integration</li>
                <li>• Session management</li>
                <li>• Password reset and recovery</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Job Management Service</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Manages job postings, requirements, and lifecycle
              </p>
              <ul className="text-sm space-y-1">
                <li>• Job creation and editing</li>
                <li>• Job status management</li>
                <li>• Requirements and qualifications</li>
                <li>• Location and compensation data</li>
                <li>• Application tracking</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Resume Parser Service</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Extracts and structures information from resumes using AI
              </p>
              <ul className="text-sm space-y-1">
                <li>• PDF and DOCX parsing</li>
                <li>• Skills extraction and categorization</li>
                <li>• Experience timeline parsing</li>
                <li>• Education and certification parsing</li>
                <li>• Data validation and cleaning</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Matching Engine Service</h3>
              <p className="text-sm text-muted-foreground mb-3">
                AI-powered job-candidate matching using semantic similarity
              </p>
              <ul className="text-sm space-y-1">
                <li>• Semantic similarity matching</li>
                <li>• Skills-based ranking</li>
                <li>• Experience level matching</li>
                <li>• Location preferences</li>
                <li>• Match score calculation</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Career Coach Service</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Provides personalized career guidance and recommendations
              </p>
              <ul className="text-sm space-y-1">
                <li>• Career path recommendations</li>
                <li>• Skills gap analysis</li>
                <li>• Resume optimization suggestions</li>
                <li>• Interview preparation</li>
                <li>• LinkedIn profile optimization</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Messaging Service</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Real-time communication between candidates and recruiters
              </p>
              <ul className="text-sm space-y-1">
                <li>• Real-time messaging via WebSocket</li>
                <li>• Message history and threading</li>
                <li>• File and media sharing</li>
                <li>• Notification delivery</li>
                <li>• Message encryption</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Analytics Service</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Tracks user behavior, system metrics, and business intelligence
              </p>
              <ul className="text-sm space-y-1">
                <li>• User engagement tracking</li>
                <li>• Performance metrics collection</li>
                <li>• Business intelligence dashboards</li>
                <li>• A/B testing framework</li>
                <li>• Reporting and insights</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Notification Service</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Manages email, SMS, and push notification delivery
              </p>
              <ul className="text-sm space-y-1">
                <li>• Email template management</li>
                <li>• SMS message delivery</li>
                <li>• Push notification service</li>
                <li>• Notification preferences</li>
                <li>• Delivery status tracking</li>
              </ul>
            </div>
          </div>

          <h2>Service Communication Patterns</h2>
          
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <h3 className="text-lg font-semibold mb-3">Synchronous Communication</h3>
            <p className="text-muted-foreground mb-4">
              Services communicate via REST APIs for immediate operations that require real-time responses.
            </p>
            <ul className="space-y-2">
              <li><strong>User Operations:</strong> Authentication, profile management</li>
              <li><strong>Job Operations:</strong> Create, update, search jobs</li>
              <li><strong>Real-time Matching:</strong> Instant job-candidate suggestions</li>
              <li><strong>Messaging:</strong> Immediate message delivery</li>
            </ul>
          </div>

          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <h3 className="text-lg font-semibold mb-3">Asynchronous Communication</h3>
            <p className="text-muted-foreground mb-4">
              Services use message queues for background processing and long-running operations.
            </p>
            <ul className="space-y-2">
              <li><strong>Resume Processing:</strong> AI parsing and skill extraction</li>
              <li><strong>Batch Matching:</strong> Overnight matching computations</li>
              <li><strong>Analytics:</strong> Data aggregation and reporting</li>
              <li><strong>Notifications:</strong> Bulk email and SMS delivery</li>
            </ul>
          </div>

          <h2>Data Ownership and Persistence</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">User Data</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Authentication Service</li>
                <li>• User profiles</li>
                <li>• Preferences and settings</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Job Data</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Job Management Service</li>
                <li>• Job postings and requirements</li>
                <li>• Application data</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Resume Data</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Resume Parser Service</li>
                <li>• Parsed resume content</li>
                <li>• Skills and experience data</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Matching Data</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Matching Engine Service</li>
                <li>• Match scores and results</li>
                <li>• Vector embeddings</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Communication Data</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Messaging Service</li>
                <li>• Messages and conversations</li>
                <li>• Notification history</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Analytics Data</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Analytics Service</li>
                <li>• User behavior events</li>
                <li>• System metrics</li>
              </ul>
            </div>
          </div>

          <h2>Service Dependencies</h2>
          
          <div className="overflow-x-auto my-6">
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Depends On
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Communication
                  </th>
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Authentication</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Database, Redis</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">REST API</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Job Management</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Authentication, Database</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">REST API, Queue</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Resume Parser</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Storage, AI Models</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Queue, REST API</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Matching Engine</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Resume Parser, Vector DB</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">REST API, Queue</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Career Coach</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">AI Models, Resume Parser</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">REST API</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Messaging</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">Authentication, WebSocket</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">WebSocket, REST API</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Security Boundaries</h2>
          
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <h3 className="text-lg font-semibold mb-3">Service Isolation</h3>
            <ul className="space-y-2">
              <li><strong>Network Isolation:</strong> Services run in isolated network segments</li>
              <li><strong>Authentication:</strong> All inter-service communication requires JWT tokens</li>
              <li><strong>Authorization:</strong> Services can only access data they own</li>
              <li><strong>Encryption:</strong> All communication encrypted in transit</li>
              <li><strong>Rate Limiting:</strong> API gateways enforce rate limits per service</li>
            </ul>
          </div>

          <h2>Next Steps</h2>
          <p>
            Now that you understand our service boundaries, explore the{' '}
            <Link href="/docs/architecture/data-flows" className="text-primary hover:underline">
              Data Flows
            </Link>{' '}
            to see how information moves through the system, or learn about our{' '}
            <Link href="/docs/architecture/security-posture" className="text-primary hover:underline">
              Security Architecture
            </Link>.
          </p>
        </div>
      </div>
    </AppShell>
  )
}
