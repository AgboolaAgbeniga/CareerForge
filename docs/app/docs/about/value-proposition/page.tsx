import { AppShell } from '@/components/AppShell'
import type { Metadata } from 'next'
import Link from 'next/link'
import { User, Building2, TrendingUp, Zap, Shield, Target, Clock, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Value Proposition | CareerForge Documentation',
  description: 'CareerForge value proposition for job seekers, recruiters, and enterprises. Discover how we deliver unique value through AI-powered job matching, intelligent resume parsing, and personalized career coaching.',
  openGraph: {
    title: 'CareerForge Value Proposition',
    description: 'Unique value delivered to job seekers, recruiters, and enterprises',
    type: 'website',
  },
}

export default function ValuePropositionPage() {
  return (
    <AppShell>
      <div className="py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Value Proposition
          </h1>
          <p className="text-xl text-muted-foreground">
            How CareerForge delivers unique value to job seekers, recruiters, and enterprises
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>Overview</h2>
          <p>
            CareerForge transforms the hiring process for everyone involved. We deliver measurable 
            value through intelligent automation, AI-powered insights, and a user-centric approach 
            that makes hiring faster, smarter, and more effective.
          </p>

          {/* Job Seeker Value Proposition */}
          <div className="bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border border-blue-500/20 rounded-xl p-8 my-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <User className="h-6 w-6 text-blue-500" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2 mt-0">For Job Seekers</h2>
                <p className="text-lg text-muted-foreground">
                  Find better opportunities faster with AI-powered matching and personalized career guidance
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold mb-0">Intelligent Job Matching</h3>
                </div>
                <p className="text-muted-foreground mb-3">
                  Our AI doesn't just match keywords—it understands skills, experience, and career 
                  goals to surface opportunities that truly fit.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ Semantic matching beyond keywords</li>
                  <li>✓ Personalized job recommendations</li>
                  <li>✓ Match score explanations</li>
                  <li>✓ Skills gap analysis</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold mb-0">Career Coaching</h3>
                </div>
                <p className="text-muted-foreground mb-3">
                  Get personalized career advice powered by AI that understands your background 
                  and career aspirations.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ Personalized career path recommendations</li>
                  <li>✓ Skills development suggestions</li>
                  <li>✓ Resume optimization tips</li>
                  <li>✓ Interview preparation guidance</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold mb-0">Time Savings</h3>
                </div>
                <p className="text-muted-foreground mb-3">
                  Spend less time searching and more time preparing. Our platform does the heavy 
                  lifting of finding relevant opportunities.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ Automated job discovery</li>
                  <li>✓ One-click applications</li>
                  <li>✓ Application tracking dashboard</li>
                  <li>✓ Real-time status updates</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold mb-0">Better Outcomes</h3>
                </div>
                <p className="text-muted-foreground mb-3">
                  Find roles that match your skills and values, leading to better job satisfaction 
                  and career growth.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ Higher quality job matches</li>
                  <li>✓ Access to hidden opportunities</li>
                  <li>✓ Skills-based matching (not just credentials)</li>
                  <li>✓ Transparent match reasoning</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-500/10 rounded-lg">
              <p className="text-sm font-medium mb-2">Key Metrics for Job Seekers:</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-500">3x</div>
                  <div className="text-xs text-muted-foreground">More relevant matches</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-500">50%</div>
                  <div className="text-xs text-muted-foreground">Less time searching</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-500">85%</div>
                  <div className="text-xs text-muted-foreground">Satisfaction rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Recruiter Value Proposition */}
          <div className="bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border border-green-500/20 rounded-xl p-8 my-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Building2 className="h-6 w-6 text-green-500" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2 mt-0">For Recruiters</h2>
                <p className="text-lg text-muted-foreground">
                  Hire faster, smarter, and more efficiently with AI-powered candidate discovery and screening
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold mb-0">Faster Time-to-Hire</h3>
                </div>
                <p className="text-muted-foreground mb-3">
                  Reduce time-to-hire by 44% through intelligent candidate matching and automated 
                  resume screening.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ Instant candidate matching</li>
                  <li>✓ Automated resume parsing</li>
                  <li>✓ AI-powered candidate ranking</li>
                  <li>✓ Real-time notifications</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Award className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold mb-0">Better Quality-of-Hire</h3>
                </div>
                <p className="text-muted-foreground mb-3">
                  Improve quality-of-hire by 26% with skills-based matching and comprehensive 
                  candidate insights.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ Skills-based candidate assessment</li>
                  <li>✓ Match score with reasoning</li>
                  <li>✓ Comprehensive candidate profiles</li>
                  <li>✓ Bias reduction in screening</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold mb-0">Cost Reduction</h3>
                </div>
                <p className="text-muted-foreground mb-3">
                  Reduce cost-per-hire by 35% through automation and efficiency gains.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ Automated screening reduces manual work</li>
                  <li>✓ Better matches reduce interview cycles</li>
                  <li>✓ Lower recruitment agency fees</li>
                  <li>✓ Reduced time investment per hire</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold mb-0">Reduced Bias</h3>
                </div>
                <p className="text-muted-foreground mb-3">
                  Our AI is designed to reduce unconscious bias and promote diversity in hiring.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ Skills-focused matching</li>
                  <li>✓ Bias detection and mitigation</li>
                  <li>✓ Diverse candidate pools</li>
                  <li>✓ Fairness audits</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-500/10 rounded-lg">
              <p className="text-sm font-medium mb-2">Key Metrics for Recruiters:</p>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-500">44%</div>
                  <div className="text-xs text-muted-foreground">Faster hiring</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-500">26%</div>
                  <div className="text-xs text-muted-foreground">Better quality</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-500">35%</div>
                  <div className="text-xs text-muted-foreground">Cost reduction</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-500">94%</div>
                  <div className="text-xs text-muted-foreground">Retention rate</div>
                </div>
              </div>
            </div>
          </div>

          {/* Enterprise Value Proposition */}
          <div className="bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent border border-purple-500/20 rounded-xl p-8 my-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Building2 className="h-6 w-6 text-purple-500" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2 mt-0">For Enterprises</h2>
                <p className="text-lg text-muted-foreground">
                  Scale your hiring operations with enterprise-grade features, integrations, and support
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="h-5 w-5 text-purple-500" />
                  <h3 className="text-lg font-semibold mb-0">Scalability</h3>
                </div>
                <p className="text-muted-foreground mb-3">
                  Handle high-volume hiring with enterprise-grade infrastructure and performance.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ Unlimited job postings</li>
                  <li>✓ Bulk candidate processing</li>
                  <li>✓ High-performance infrastructure</li>
                  <li>✓ 99.9% uptime SLA</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-5 w-5 text-purple-500" />
                  <h3 className="text-lg font-semibold mb-0">Security & Compliance</h3>
                </div>
                <p className="text-muted-foreground mb-3">
                  Enterprise-grade security, compliance, and data protection.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ SOC 2 Type II compliant</li>
                  <li>✓ GDPR and CCPA compliant</li>
                  <li>✓ SSO and advanced authentication</li>
                  <li>✓ Data encryption at rest and in transit</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="h-5 w-5 text-purple-500" />
                  <h3 className="text-lg font-semibold mb-0">Integrations</h3>
                </div>
                <p className="text-muted-foreground mb-3">
                  Seamlessly integrate with your existing HR tech stack.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ ATS integrations (Workday, Greenhouse, etc.)</li>
                  <li>✓ HRIS integrations</li>
                  <li>✓ API access for custom integrations</li>
                  <li>✓ Webhook support</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="h-5 w-5 text-purple-500" />
                  <h3 className="text-lg font-semibold mb-0">Analytics & Insights</h3>
                </div>
                <p className="text-muted-foreground mb-3">
                  Comprehensive analytics and reporting for data-driven hiring decisions.
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ Executive dashboards</li>
                  <li>✓ Hiring funnel analytics</li>
                  <li>✓ ROI tracking</li>
                  <li>✓ Custom reports</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-purple-500/10 rounded-lg">
              <p className="text-sm font-medium mb-2">Enterprise Benefits:</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-purple-500">$2.1M</div>
                  <div className="text-xs text-muted-foreground">Average annual savings</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-500">72</div>
                  <div className="text-xs text-muted-foreground">Net Promoter Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-500">99.9%</div>
                  <div className="text-xs text-muted-foreground">Uptime SLA</div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Differentiators */}
          <h2>What Makes CareerForge Different</h2>
          <p>
            While there are many job matching platforms, CareerForge stands out through unique 
            technology, approach, and outcomes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">AI-First Architecture</h3>
              <p className="text-muted-foreground">
                Built from the ground up with AI at the core, not bolted on as an afterthought. 
                Our semantic matching and AI services are purpose-built for recruitment.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Skills-Based Matching</h3>
              <p className="text-muted-foreground">
                We match on skills and potential, not just credentials. This opens opportunities 
                to a more diverse talent pool and finds hidden gems.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Transparency & Explainability</h3>
              <p className="text-muted-foreground">
                We explain why candidates match, show match reasoning, and provide insights. 
                No black boxes—just clear, actionable information.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Bias Reduction</h3>
              <p className="text-muted-foreground">
                Actively designed to reduce bias in hiring. We audit our algorithms, promote 
                diversity, and focus on skills over demographics.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Career Coaching</h3>
              <p className="text-muted-foreground">
                Unique AI-powered career coaching helps candidates grow, not just find jobs. 
                We're invested in long-term career success.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Proven Results</h3>
              <p className="text-muted-foreground">
                Measurable outcomes: 44% faster hiring, 26% better quality, 35% cost reduction. 
                We deliver real value, not just promises.
              </p>
            </div>
          </div>

          {/* ROI Calculator Teaser */}
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-8 my-8">
            <h2 className="text-2xl font-bold mb-4">Calculate Your ROI</h2>
            <p className="text-muted-foreground mb-4">
              See how CareerForge can impact your hiring metrics and bottom line. Use our ROI 
              calculator to estimate your potential savings and improvements.
            </p>
            <Link 
              href="/docs/executive/business-value" 
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              View ROI Calculator
            </Link>
          </div>

          {/* Related Documentation */}
          <h2>Related Documentation</h2>
          <p>Learn more about CareerForge:</p>
          <ul>
            <li>
              <Link href="/docs/about/vision-mission" className="text-primary hover:underline">
                Vision & Mission
              </Link>{' '}
              - Our purpose and values
            </li>
            <li>
              <Link href="/docs/about/market-opportunity" className="text-primary hover:underline">
                Market Opportunity
              </Link>{' '}
              - The market we're addressing
            </li>
            <li>
              <Link href="/docs/executive/business-value" className="text-primary hover:underline">
                Business Value
              </Link>{' '}
              - Detailed ROI analysis
            </li>
            <li>
              <Link href="/docs" className="text-primary hover:underline">
                Documentation Home
              </Link>{' '}
              - Platform overview
            </li>
          </ul>
        </div>
      </div>
    </AppShell>
  )
}

