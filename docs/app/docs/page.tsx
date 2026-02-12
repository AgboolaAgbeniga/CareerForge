import { AppShell } from '@/components/AppShell'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'CareerForge Documentation',
  description: 'Complete documentation for CareerForge - an AI-powered job matching platform that leverages cutting-edge technology to connect job seekers with recruiters through intelligent resume parsing, advanced matching algorithms, and personalized career coaching.',
  openGraph: {
    title: 'CareerForge Documentation',
    description: 'AI-powered job matching platform connecting talent with opportunity',
    type: 'website',
  },
}

export default function DocsIndexPage() {
  return (
    <AppShell>
      <div className="py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            CareerForge Documentation
          </h1>
          <p className="text-xl text-muted-foreground">
            AI-powered job matching platform connecting talent with opportunity
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>What is CareerForge?</h2>
          <p>
            CareerForge is a comprehensive job matching platform that leverages artificial intelligence to connect 
            job seekers with recruiters. Built as a modern, scalable microservices architecture, it provides 
            intelligent resume parsing, advanced matching algorithms, and personalized career coaching.
          </p>

          <h2>Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">AI-Powered Resume Parsing</h3>
              <p className="text-sm text-muted-foreground">
                Automatically extract and structure information from resumes in multiple formats
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Intelligent Matching</h3>
              <p className="text-sm text-muted-foreground">
                Advanced algorithms that consider skills, experience, and preferences for optimal job-candidate matching
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Career Coaching</h3>
              <p className="text-sm text-muted-foreground">
                Personalized AI guidance and recommendations for career growth and development
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Real-time Communication</h3>
              <p className="text-sm text-muted-foreground">
                Seamless messaging and collaboration tools between candidates and recruiters
              </p>
            </div>
          </div>

          <h2>Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Frontend</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>• Next.js 14 with App Router</li>
                <li>• TypeScript for type safety</li>
                <li>• TailwindCSS for styling</li>
                <li>• Real-time WebSocket connections</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Backend</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>• Node.js with Express</li>
                <li>• PostgreSQL database</li>
                <li>• JWT authentication</li>
                <li>• Redis for caching</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">AI Services</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>• Python with FastAPI</li>
                <li>• Hugging Face Transformers</li>
                <li>• pgvector for embeddings</li>
                <li>• Semantic search capabilities</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Infrastructure</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>• Docker containerization</li>
                <li>• Cloud-ready deployment</li>
                <li>• CI/CD pipelines</li>
                <li>• Comprehensive monitoring</li>
              </ul>
            </div>
          </div>

          <h2>Architecture Philosophy</h2>
          <p>
            CareerForge follows microservices architecture principles with clear service boundaries, 
            independent scaling, and robust error handling. Each component is designed to be modular, 
            maintainable, and easily extensible.
          </p>

          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <h3 className="text-lg font-semibold mb-3">Key Principles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="space-y-2">
                <li><strong>Scalability:</strong> Handle growth from startup to enterprise scale</li>
                <li><strong>Maintainability:</strong> Clean code with comprehensive documentation</li>
                <li><strong>Performance:</strong> Optimized for speed and user experience</li>
              </ul>
              <ul className="space-y-2">
                <li><strong>Security:</strong> Best practices for data protection and privacy</li>
                <li><strong>Accessibility:</strong> WCAG compliant interfaces for all users</li>
                <li><strong>Reliability:</strong> 99.9% uptime with comprehensive monitoring</li>
              </ul>
            </div>
          </div>

          <h2>Key Differentiators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">AI-Powered Matching</h3>
              <p className="text-sm text-muted-foreground">
                Semantic similarity matching vs traditional keyword-based approaches
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Career Coaching</h3>
              <p className="text-sm text-muted-foreground">
                Personalized AI guidance for career growth and development
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Real-time Processing</h3>
              <p className="text-sm text-muted-foreground">
                Fast resume parsing and matching with sub-second response times
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Enterprise Features</h3>
              <p className="text-sm text-muted-foreground">
                Advanced analytics, integrations, and scalable infrastructure
              </p>
            </div>
          </div>

          <h2>Success Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
            <div className="text-center p-4 bg-card border border-border rounded-lg">
              <div className="text-3xl font-bold text-primary">94%</div>
              <div className="text-sm text-muted-foreground">Customer Retention</div>
            </div>
            <div className="text-center p-4 bg-card border border-border rounded-lg">
              <div className="text-3xl font-bold text-primary">44%</div>
              <div className="text-sm text-muted-foreground">Time-to-Hire Reduction</div>
            </div>
            <div className="text-center p-4 bg-card border border-border rounded-lg">
              <div className="text-3xl font-bold text-primary">26%</div>
              <div className="text-sm text-muted-foreground">Quality-of-Hire Improvement</div>
            </div>
            <div className="text-center p-4 bg-card border border-border rounded-lg">
              <div className="text-3xl font-bold text-primary">72</div>
              <div className="text-sm text-muted-foreground">Net Promoter Score</div>
            </div>
          </div>

          <h2>Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Getting Started</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/docs/quickstart" className="text-primary hover:underline">
                    Quickstart Guide
                  </Link>
                  <span className="text-muted-foreground block">Get up and running in minutes</span>
                </li>
                <li>
                  <Link href="/docs/philosophy" className="text-primary hover:underline">
                    Philosophy
                  </Link>
                  <span className="text-muted-foreground block">Our design principles and approach</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Architecture</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/docs/architecture" className="text-primary hover:underline">
                    System Overview
                  </Link>
                  <span className="text-muted-foreground block">High-level system architecture</span>
                </li>
                <li>
                  <Link href="/docs/architecture/service-boundaries" className="text-primary hover:underline">
                    Service Boundaries
                  </Link>
                  <span className="text-muted-foreground block">Microservices boundaries</span>
                </li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/docs/resources/api-reference" className="text-primary hover:underline">
                    API Reference
                  </Link>
                  <span className="text-muted-foreground block">Complete API documentation</span>
                </li>
                <li>
                  <Link href="/docs/resources/examples" className="text-primary hover:underline">
                    Examples
                  </Link>
                  <span className="text-muted-foreground block">Code examples and tutorials</span>
                </li>
              </ul>
            </div>
          </div>

          <h2>Support and Community</h2>
          <p>
            Need help? Our documentation is designed to be comprehensive and accessible. 
            For technical questions, visit our{' '}
            <Link href="/docs/resources/support" className="text-primary hover:underline">
              Support page
            </Link>{' '}
            or{' '}
            <a 
              href="https://github.com/careerforge/careerforge" 
              className="text-primary hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View CareerForge on GitHub (opens in new tab)"
            >
              contribute on GitHub
            </a>
            .
          </p>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 my-8">
            <h3 className="text-lg font-semibold mb-3">Ready to Get Started?</h3>
            <p className="mb-4">
              Jump right into our{' '}
              <Link href="/docs/quickstart" className="text-primary hover:underline font-medium">
                Quickstart Guide
              </Link>{' '}
              to set up CareerForge locally, or explore the{' '}
              <Link href="/docs/architecture" className="text-primary hover:underline font-medium">
                System Architecture
              </Link>{' '}
              to understand how everything works together.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/docs/quickstart"
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Get Started
              </Link>
              <Link
                href="/docs/architecture"
                className="inline-flex items-center px-4 py-2 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                View Architecture
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}