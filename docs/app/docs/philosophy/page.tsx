import { AppShell } from '@/components/AppShell'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Philosophy | CareerForge Documentation',
  description: 'CareerForge design principles, philosophy, and approach to AI-powered recruitment technology.',
  openGraph: {
    title: 'CareerForge Philosophy',
    description: 'Design principles and approach to recruitment technology',
    type: 'website',
  },
}

export default function PhilosophyPage() {
  return (
    <AppShell>
      <div className="py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Our Philosophy
          </h1>
          <p className="text-xl text-muted-foreground">
            The design principles and approach that guide CareerForge development
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>Core Principles</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">User-Centric Design</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Every feature and decision prioritizes the end-user experience
              </p>
              <ul className="text-sm space-y-1">
                <li>• Intuitive interfaces that require minimal training</li>
                <li>• Accessibility first - WCAG 2.1 AA compliance</li>
                <li>• Responsive design for all device types</li>
                <li>• Performance optimization for fast interactions</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">AI Ethics & Transparency</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Responsible AI development with clear explanations
              </p>
              <ul className="text-sm space-y-1">
                <li>• Explainable AI decisions and recommendations</li>
                <li>• Bias detection and mitigation strategies</li>
                <li>• Privacy by design principles</li>
                <li>• Human oversight and intervention capabilities</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Scalability & Reliability</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Architecture built for growth and enterprise demands
              </p>
              <ul className="text-sm space-y-1">
                <li>• Microservices architecture for modular scaling</li>
                <li>• 99.9% uptime SLA with redundancy</li>
                <li>• Horizontal scaling capabilities</li>
                <li>• Disaster recovery and business continuity</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Developer Experience</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Comprehensive APIs and documentation for developers
              </p>
              <ul className="text-sm space-y-1">
                <li>• RESTful APIs with comprehensive documentation</li>
                <li>• SDKs for popular programming languages</li>
                <li>• Interactive API explorer and testing tools</li>
                <li>• Developer-friendly error messages and debugging</li>
              </ul>
            </div>
          </div>

          <h2>Design Philosophy</h2>
          
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <h3 className="text-lg font-semibold mb-3">Simplicity Over Complexity</h3>
            <p className="text-muted-foreground mb-4">
              We believe that powerful functionality doesn't have to be complicated. Our interface design 
              follows the principle of progressive disclosure, showing users only what they need at each step.
            </p>
            <ul className="space-y-2">
              <li>• Clear visual hierarchy with consistent typography</li>
              <li>• Minimal cognitive load through thoughtful information architecture</li>
              <li>• Consistent interaction patterns across the platform</li>
              <li>• Contextual help and guidance where needed</li>
            </ul>
          </div>

          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <h3 className="text-lg font-semibold mb-3">Data Privacy & Security</h3>
            <p className="text-muted-foreground mb-4">
              User data privacy is not an afterthought—it's built into every decision we make. 
              We implement privacy by design principles and maintain the highest security standards.
            </p>
            <ul className="space-y-2">
              <li>• End-to-end encryption for sensitive data</li>
              <li>• Minimal data collection with clear consent</li>
              <li>• User control over their data and privacy settings</li>
              <li>• Regular security audits and penetration testing</li>
            </ul>
          </div>

          <h2>Technical Approach</h2>
          
          <h3>Modern Technology Stack</h3>
          <p>
            CareerForge leverages modern, proven technologies to ensure reliability, performance, and maintainability:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Frontend</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Next.js 14 for optimal performance</li>
                <li>• TypeScript for type safety</li>
                <li>• Tailwind CSS for consistent styling</li>
                <li>• React Server Components</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">Backend</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Node.js with TypeScript</li>
                <li>• PostgreSQL for relational data</li>
                <li>• Redis for caching and sessions</li>
                <li>• Docker containerization</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-semibold mb-2">AI & ML</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Python for AI services</li>
                <li>• Hugging Face Transformers</li>
                <li>• pgvector for semantic search</li>
                <li>• GPU acceleration when available</li>
              </ul>
            </div>
          </div>

          <h2>Quality Standards</h2>
          
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <h3 className="text-lg font-semibold mb-3">Code Quality</h3>
            <p className="text-muted-foreground mb-4">
              We maintain high code quality through rigorous standards and automated testing:
            </p>
            <ul className="space-y-2">
              <li>• Comprehensive test coverage (90%+ target)</li>
              <li>• Automated code quality checks and linting</li>
              <li>• Code review process for all changes</li>
              <li>• Documentation requirements for all features</li>
              <li>• Performance benchmarking and monitoring</li>
            </ul>
          </div>

          <h2>Future Vision</h2>
          
          <p>
            Our philosophy continues to evolve as we build the future of recruitment technology. 
            We remain committed to:
          </p>
          
          <ul className="my-6 space-y-2">
            <li>• <strong>Continuous Innovation:</strong> Staying at the forefront of AI and recruitment technology</li>
            <li>• <strong>User Feedback:</strong> Incorporating user insights into every decision</li>
            <li>• <strong>Industry Leadership:</strong> Setting standards for ethical AI in HR</li>
            <li>• <strong>Global Impact:</strong> Making quality recruitment accessible worldwide</li>
          </ul>

          <h2>Get Involved</h2>
          <p>
            We believe in open collaboration and welcome feedback from our community. 
            Learn how to{' '}
            <Link href="/docs/resources/support" className="text-primary hover:underline">
              contribute to CareerForge
            </Link>{' '}
            or{' '}
            <Link href="/docs/resources/examples" className="text-primary hover:underline">
              explore our examples
            </Link>{' '}
            to see our philosophy in action.
          </p>
        </div>
      </div>
    </AppShell>
  )
}
