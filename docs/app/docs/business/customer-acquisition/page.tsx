import { AppShell } from '@/components/AppShell'
import type { Metadata } from 'next'
import Link from 'next/link'
import { TrendingUp, Users, Target, Zap, BarChart3, Gift } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Customer Acquisition | CareerForge Documentation',
  description: 'CareerForge customer acquisition strategy: acquisition funnel, conversion optimization, retention strategies, and referral program. Learn how we acquire and retain customers.',
  openGraph: {
    title: 'CareerForge Customer Acquisition',
    description: 'Acquisition funnel, conversion optimization, and retention strategies',
    type: 'website',
  },
}

export default function CustomerAcquisitionPage() {
  return (
    <AppShell>
      <div className="py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Customer Acquisition
          </h1>
          <p className="text-xl text-muted-foreground">
            How CareerForge acquires, converts, and retains customers
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>Overview</h2>
          <p>
            Our customer acquisition strategy focuses on efficient growth through multiple channels, 
            strong conversion optimization, and exceptional retention. We maintain a 10:1 LTV:CAC ratio 
            and 94% annual retention through a data-driven, customer-centric approach.
          </p>

          {/* Acquisition Funnel */}
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl p-8 my-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-primary/20 rounded-lg">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2 mt-0">Customer Acquisition Funnel</h2>
                <p className="text-lg text-muted-foreground">
                  From awareness to advocacy: our complete customer journey
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">1. Awareness (Top of Funnel)</h3>
                  <span className="text-sm font-semibold text-primary">100,000 visitors/month</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Prospects discover CareerForge through content, SEO, paid ads, referrals, 
                  or partnerships
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <div className="font-semibold">SEO/Organic</div>
                    <div className="text-muted-foreground">45%</div>
                  </div>
                  <div>
                    <div className="font-semibold">Paid Ads</div>
                    <div className="text-muted-foreground">25%</div>
                  </div>
                  <div>
                    <div className="font-semibold">Content</div>
                    <div className="text-muted-foreground">20%</div>
                  </div>
                  <div>
                    <div className="font-semibold">Referrals</div>
                    <div className="text-muted-foreground">10%</div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">2. Interest (Lead Generation)</h3>
                  <span className="text-sm font-semibold text-blue-500">12,000 leads/month</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Visitors engage by downloading content, signing up for trials, requesting demos, 
                  or attending webinars
                </p>
                <div className="text-xs text-muted-foreground">
                  <strong>Conversion Rate:</strong> 12% (visitor to lead)
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">3. Consideration (Qualification)</h3>
                  <span className="text-sm font-semibold text-green-500">2,400 qualified/month</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Sales team qualifies leads based on company size, budget, needs, and authority. 
                  BANT framework applied.
                </p>
                <div className="text-xs text-muted-foreground">
                  <strong>Qualification Rate:</strong> 20% (lead to qualified)
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">4. Evaluation (Trial/Demo)</h3>
                  <span className="text-sm font-semibold text-purple-500">1,200 trials/month</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Qualified leads start free trials, attend demos, or participate in pilot programs
                </p>
                <div className="text-xs text-muted-foreground">
                  <strong>Trial Conversion Rate:</strong> 50% (qualified to trial)
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">5. Purchase (Conversion)</h3>
                  <span className="text-sm font-semibold text-orange-500">144 customers/month</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Trial users convert to paying customers after experiencing value
                </p>
                <div className="text-xs text-muted-foreground">
                  <strong>Conversion Rate:</strong> 12% (trial to customer)<br/>
                  <strong>Overall Funnel Conversion:</strong> 0.14% (visitor to customer)
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">6. Retention & Expansion</h3>
                  <span className="text-sm font-semibold text-green-500">94% retention</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Customers stay, expand usage, and become advocates
                </p>
                <div className="text-xs text-muted-foreground">
                  <strong>Annual Retention:</strong> 94%<br/>
                  <strong>Net Revenue Retention:</strong> 110%<br/>
                  <strong>Referral Rate:</strong> 25% of customers refer others
                </div>
              </div>
            </div>
          </div>

          {/* Conversion Optimization */}
          <h2>Conversion Optimization</h2>
          <p>
            We continuously optimize our funnel to improve conversion rates and reduce CAC:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Website Optimization</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>✓ A/B testing landing pages</li>
                <li>✓ Clear value propositions</li>
                <li>✓ Social proof and testimonials</li>
                <li>✓ Fast page load times</li>
                <li>✓ Mobile-optimized experience</li>
                <li>✓ Clear CTAs and signup flows</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Trial Experience</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>✓ Quick setup and onboarding</li>
                <li>✓ Guided product tours</li>
                <li>✓ Value demonstration in first session</li>
                <li>✓ In-app help and support</li>
                <li>✓ Email nurture sequences</li>
                <li>✓ Success metrics tracking</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Sales Process</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>✓ Fast response times</li>
                <li>✓ Personalized demos</li>
                <li>✓ ROI calculators</li>
                <li>✓ Case studies and references</li>
                <li>✓ Clear pricing and packages</li>
                <li>✓ Easy contract process</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Content & Messaging</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>✓ Targeted messaging by segment</li>
                <li>✓ Clear benefits over features</li>
                <li>✓ Proof points and metrics</li>
                <li>✓ Competitive differentiation</li>
                <li>✓ Educational content</li>
                <li>✓ Trust-building elements</li>
              </ul>
            </div>
          </div>

          {/* Retention Strategies */}
          <h2>Retention Strategies</h2>
          <p>
            Retention is as important as acquisition. We maintain 94% annual retention through:
          </p>

          <div className="space-y-4 my-8">
            <div className="bg-card border-l-4 border-l-primary rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Onboarding Excellence</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Comprehensive onboarding ensures customers see value quickly and understand how 
                to use the platform effectively.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Dedicated customer success manager</li>
                <li>• Customized implementation plan</li>
                <li>• Training sessions and resources</li>
                <li>• Success metrics defined upfront</li>
                <li>• Regular check-ins in first 90 days</li>
              </ul>
            </div>

            <div className="bg-card border-l-4 border-l-blue-500 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Proactive Customer Success</h3>
              <p className="text-sm text-muted-foreground mb-3">
                We don't wait for customers to have problems—we proactively help them succeed.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Regular health checks and QBRs</li>
                <li>• Usage analytics and insights</li>
                <li>• Best practices sharing</li>
                <li>• Feature adoption campaigns</li>
                <li>• Early warning system for at-risk accounts</li>
              </ul>
            </div>

            <div className="bg-card border-l-4 border-l-green-500 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Product Value Delivery</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Customers stay when they see consistent value. We ensure the product delivers 
                on its promises.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Reliable platform performance</li>
                <li>• Continuous feature improvements</li>
                <li>• Measurable ROI and outcomes</li>
                <li>• Integration with existing tools</li>
                <li>• Responsive support and issue resolution</li>
              </ul>
            </div>

            <div className="bg-card border-l-4 border-l-purple-500 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Expansion Revenue</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Growing existing customers is more efficient than acquiring new ones. We focus 
                on expansion opportunities.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Usage-based upsells</li>
                <li>• Feature upgrades</li>
                <li>• Additional seats/licenses</li>
                <li>• Enterprise feature adoption</li>
                <li>• Multi-year contract incentives</li>
              </ul>
            </div>
          </div>

          {/* Referral Program */}
          <h2>Referral Program</h2>
          <div className="bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent border border-green-500/20 rounded-xl p-8 my-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Gift className="h-6 w-6 text-green-500" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2 mt-0">Customer Referral Program</h2>
                <p className="text-muted-foreground">
                  Our customers are our best advocates. We reward them for successful referrals.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">For Referrers</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>✓ $500 credit for each successful referral</li>
                  <li>✓ 1 month free for 3+ referrals</li>
                  <li>✓ Exclusive access to beta features</li>
                  <li>✓ Recognition in customer community</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">For Referrals</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>✓ 20% discount on first year</li>
                  <li>✓ Extended free trial (30 days)</li>
                  <li>✓ Priority onboarding</li>
                  <li>✓ Dedicated account manager</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-green-500/10 rounded-lg">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-500 mb-1">25%</div>
                  <div className="text-xs text-muted-foreground">Customers refer others</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-500 mb-1">15%</div>
                  <div className="text-xs text-muted-foreground">New customers from referrals</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-500 mb-1">$0</div>
                  <div className="text-xs text-muted-foreground">CAC for referral customers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <h2>Acquisition Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-8">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">$2,400</div>
              <div className="text-sm text-muted-foreground">Customer Acquisition Cost</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">12%</div>
              <div className="text-sm text-muted-foreground">Lead-to-Customer Rate</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">6</div>
              <div className="text-sm text-muted-foreground">Months CAC Payback</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-500 mb-2">94%</div>
              <div className="text-sm text-muted-foreground">Annual Retention</div>
            </div>
          </div>

          {/* Related Documentation */}
          <h2>Related Documentation</h2>
          <p>Learn more about CareerForge's customer strategy:</p>
          <ul>
            <li>
              <Link href="/docs/business/go-to-market" className="text-primary hover:underline">
                Go-to-Market Strategy
              </Link>{' '}
              - Channels, partnerships, and sales process
            </li>
            <li>
              <Link href="/docs/business/model" className="text-primary hover:underline">
                Business Model
              </Link>{' '}
              - Revenue streams and unit economics
            </li>
            <li>
              <Link href="/docs/about/value-proposition" className="text-primary hover:underline">
                Value Proposition
              </Link>{' '}
              - How we deliver value to customers
            </li>
            <li>
              <Link href="/docs/executive/growth-strategy" className="text-primary hover:underline">
                Growth Strategy
              </Link>{' '}
              - Strategic growth initiatives
            </li>
          </ul>
        </div>
      </div>
    </AppShell>
  )
}

