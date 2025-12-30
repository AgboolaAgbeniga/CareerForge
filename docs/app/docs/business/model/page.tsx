import { AppShell } from '@/components/AppShell'
import type { Metadata } from 'next'
import Link from 'next/link'
import { DollarSign, TrendingUp, Users, Building2, CreditCard, BarChart3 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Business Model | CareerForge Documentation',
  description: 'CareerForge business model: revenue streams, pricing strategy, monetization approach, and unit economics. Learn how CareerForge generates value and revenue.',
  openGraph: {
    title: 'CareerForge Business Model',
    description: 'Revenue streams, pricing strategy, and monetization approach',
    type: 'website',
  },
}

export default function BusinessModelPage() {
  return (
    <AppShell>
      <div className="py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Business Model
          </h1>
          <p className="text-xl text-muted-foreground">
            How CareerForge creates, delivers, and captures value
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>Overview</h2>
          <p>
            CareerForge operates on a Software-as-a-Service (SaaS) model with multiple revenue 
            streams. We generate value through subscription fees, transaction-based revenue, and 
            enterprise contracts, creating a sustainable and scalable business.
          </p>

          {/* Revenue Streams */}
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl p-8 my-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-primary/20 rounded-lg">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2 mt-0">Revenue Streams</h2>
                <p className="text-lg text-muted-foreground">
                  Multiple revenue sources create a diversified and resilient business model
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold mb-0">Subscription Revenue</h3>
                </div>
                <p className="text-muted-foreground mb-4 text-sm">
                  Recurring monthly/annual subscriptions from recruiters and enterprises. 
                  This is our primary revenue stream, providing predictable, recurring income.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Recruiter Plans:</span>
                    <span className="font-semibold">$99-$499/month</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Enterprise Plans:</span>
                    <span className="font-semibold">$5K-$50K/month</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="text-xs text-muted-foreground mb-1">Revenue Contribution</div>
                    <div className="text-lg font-bold text-primary">70%</div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-500" />
                  <h3 className="text-lg font-semibold mb-0">Transaction Fees</h3>
                </div>
                <p className="text-muted-foreground mb-4 text-sm">
                  Fees charged for successful placements. A percentage of the first-year salary 
                  or a fixed placement fee, creating alignment with customer success.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Placement Fee:</span>
                    <span className="font-semibold">15-20% of salary</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Or Fixed Fee:</span>
                    <span className="font-semibold">$2K-$10K</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="text-xs text-muted-foreground mb-1">Revenue Contribution</div>
                    <div className="text-lg font-bold text-blue-500">20%</div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="h-6 w-6 text-green-500" />
                  <h3 className="text-lg font-semibold mb-0">Enterprise Contracts</h3>
                </div>
                <p className="text-muted-foreground mb-4 text-sm">
                  Custom enterprise agreements with large organizations. Includes dedicated 
                  support, custom integrations, and volume discounts.
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Annual Contracts:</span>
                    <span className="font-semibold">$50K-$500K</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Multi-year:</span>
                    <span className="font-semibold">Up to $2M</span>
                  </div>
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="text-xs text-muted-foreground mb-1">Revenue Contribution</div>
                    <div className="text-lg font-bold text-green-500">10%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Strategy */}
          <h2>Pricing Strategy</h2>
          <p>
            Our pricing is designed to be accessible to small teams while scaling to enterprise 
            needs. We offer transparent, value-based pricing with no hidden fees.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 my-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Starter</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">$99</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                <li>✓ Up to 10 job postings</li>
                <li>✓ 100 candidate matches/month</li>
                <li>✓ Basic AI matching</li>
                <li>✓ Email support</li>
              </ul>
              <div className="text-xs text-muted-foreground">
                Perfect for small teams and individual recruiters
              </div>
            </div>

            <div className="bg-card border-2 border-primary rounded-lg p-6 relative">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-bl-lg">
                Most Popular
              </div>
              <h3 className="text-lg font-semibold mb-2">Professional</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">$299</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                <li>✓ Unlimited job postings</li>
                <li>✓ 1,000 candidate matches/month</li>
                <li>✓ Advanced AI matching</li>
                <li>✓ Career coaching features</li>
                <li>✓ Priority support</li>
              </ul>
              <div className="text-xs text-muted-foreground">
                Best for growing recruitment teams
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Business</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">$499</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                <li>✓ Everything in Professional</li>
                <li>✓ Unlimited matches</li>
                <li>✓ Advanced analytics</li>
                <li>✓ API access</li>
                <li>✓ Dedicated account manager</li>
              </ul>
              <div className="text-xs text-muted-foreground">
                For established recruitment agencies
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Enterprise</h3>
              <div className="mb-4">
                <span className="text-3xl font-bold">Custom</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                <li>✓ Everything in Business</li>
                <li>✓ Custom integrations</li>
                <li>✓ SSO & advanced security</li>
                <li>✓ SLA guarantees</li>
                <li>✓ Custom AI training</li>
              </ul>
              <div className="text-xs text-muted-foreground">
                Tailored for large organizations
              </div>
            </div>
          </div>

          {/* Monetization Approach */}
          <h2>Monetization Approach</h2>
          <p>
            Our monetization strategy focuses on value creation and customer success:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Value-Based Pricing</h3>
              <p className="text-muted-foreground mb-4">
                We price based on the value we deliver, not just features. Customers pay for 
                outcomes: faster hiring, better quality, and cost savings.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>✓ ROI-focused pricing model</li>
                <li>✓ Transparent pricing structure</li>
                <li>✓ No hidden fees or surprise charges</li>
                <li>✓ Pay for what you use</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Freemium Strategy</h3>
              <p className="text-muted-foreground mb-4">
                Free tier for job seekers to build our candidate pool and demonstrate value. 
                This creates a network effect and reduces customer acquisition costs.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>✓ Free for job seekers</li>
                <li>✓ Paid plans for recruiters</li>
                <li>✓ Network effects benefit all users</li>
                <li>✓ Low barrier to entry</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Usage-Based Scaling</h3>
              <p className="text-muted-foreground mb-4">
                Pricing scales with usage, ensuring customers only pay for what they need. 
                This aligns our success with customer growth.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>✓ Pay per match or per posting</li>
                <li>✓ Volume discounts for high usage</li>
                <li>✓ Predictable costs for customers</li>
                <li>✓ Revenue scales with customer success</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Enterprise Upsell</h3>
              <p className="text-muted-foreground mb-4">
                Strong upsell path from SMB to enterprise. As customers grow, they need more 
                features, support, and integrations.
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>✓ Natural upgrade path</li>
                <li>✓ Higher LTV from enterprise customers</li>
                <li>✓ Reduced churn (higher switching costs)</li>
                <li>✓ Strategic partnerships</li>
              </ul>
            </div>
          </div>

          {/* Unit Economics */}
          <h2>Unit Economics</h2>
          <p>
            Strong unit economics are the foundation of a sustainable business. Here's how our 
            numbers work:
          </p>

          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <h3 className="text-lg font-semibold mb-4">Key Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Customer Acquisition</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Customer Acquisition Cost (CAC):</span>
                    <span className="font-semibold">$2,400</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sales Cycle:</span>
                    <span className="font-semibold">3-6 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Conversion Rate:</span>
                    <span className="font-semibold">12%</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Customer Value</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Average Revenue Per User (ARPU):</span>
                    <span className="font-semibold">$4,800/year</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Customer Lifetime Value (LTV):</span>
                    <span className="font-semibold">$24,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">LTV:CAC Ratio:</span>
                    <span className="font-semibold text-green-500">10:1</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Retention</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Monthly Churn Rate:</span>
                    <span className="font-semibold">0.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Annual Retention:</span>
                    <span className="font-semibold">94%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payback Period:</span>
                    <span className="font-semibold">6 months</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Profitability</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Gross Margin:</span>
                    <span className="font-semibold">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Net Revenue Retention:</span>
                    <span className="font-semibold">110%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rule of 40:</span>
                    <span className="font-semibold text-green-500">45%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Business Model Canvas */}
          <h2>Business Model Canvas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Value Proposition</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• 44% faster time-to-hire</li>
                <li>• 26% better quality-of-hire</li>
                <li>• 35% cost reduction</li>
                <li>• AI-powered matching</li>
                <li>• Bias reduction</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Customer Segments</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Mid-market companies (100-1000 employees)</li>
                <li>• Recruitment agencies</li>
                <li>• Tech companies and startups</li>
                <li>• Enterprises (1000+ employees)</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Channels</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Direct sales (website, demos)</li>
                <li>• Partner channel (HR tech integrators)</li>
                <li>• Content marketing & SEO</li>
                <li>• Referral program</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Key Resources</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• AI/ML technology platform</li>
                <li>• Talent pool (candidate database)</li>
                <li>• Engineering team</li>
                <li>• Sales & customer success</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Key Activities</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Platform development & AI training</li>
                <li>• Customer acquisition & onboarding</li>
                <li>• Customer success & support</li>
                <li>• Market research & product development</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Key Partners</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• HR tech platforms (ATS, HRIS)</li>
                <li>• Job boards & aggregators</li>
                <li>• Recruitment agencies</li>
                <li>• Cloud infrastructure providers</li>
              </ul>
            </div>
          </div>

          {/* Competitive Advantages */}
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-8 my-8">
            <h2 className="text-2xl font-bold mb-4">Competitive Advantages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Technology Moat</h3>
                <p className="text-sm text-muted-foreground">
                  AI-first architecture, proprietary algorithms, and continuous model improvement 
                  create a defensible technology advantage.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Network Effects</h3>
                <p className="text-sm text-muted-foreground">
                  More candidates attract more recruiters, which attracts more candidates. 
                  This creates a self-reinforcing network effect.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Data Advantage</h3>
                <p className="text-sm text-muted-foreground">
                  More data improves matching accuracy, creating better outcomes and more data. 
                  This creates a data moat.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Brand & Trust</h3>
                <p className="text-sm text-muted-foreground">
                  Strong brand, proven results, and high customer satisfaction create trust 
                  and reduce switching.
                </p>
              </div>
            </div>
          </div>

          {/* Related Documentation */}
          <h2>Related Documentation</h2>
          <p>Learn more about CareerForge's business:</p>
          <ul>
            <li>
              <Link href="/docs/business/financials" className="text-primary hover:underline">
                Financials
              </Link>{' '}
              - Detailed financial projections and unit economics
            </li>
            <li>
              <Link href="/docs/business/market-analysis" className="text-primary hover:underline">
                Market Analysis
              </Link>{' '}
              - Market size and competitive analysis
            </li>
            <li>
              <Link href="/docs/executive/revenue-projections" className="text-primary hover:underline">
                Revenue Projections
              </Link>{' '}
              - Multi-year revenue forecasts
            </li>
            <li>
              <Link href="/docs/about/value-proposition" className="text-primary hover:underline">
                Value Proposition
              </Link>{' '}
              - How we deliver value to customers
            </li>
          </ul>
        </div>
      </div>
    </AppShell>
  )
}

