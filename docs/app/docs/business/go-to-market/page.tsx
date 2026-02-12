import { AppShell } from '@/components/AppShell'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Target, Users, TrendingUp, Globe, Handshake, Megaphone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Go-to-Market Strategy | CareerForge Documentation',
  description: 'CareerForge go-to-market strategy: channels, partnerships, marketing approach, and sales process. Learn how CareerForge reaches and converts customers.',
  openGraph: {
    title: 'CareerForge Go-to-Market Strategy',
    description: 'Channels, partnerships, marketing, and sales strategy',
    type: 'website',
  },
}

export default function GoToMarketPage() {
  return (
    <AppShell>
      <div className="py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Go-to-Market Strategy
          </h1>
          <p className="text-xl text-muted-foreground">
            How CareerForge reaches, engages, and converts customers
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>Overview</h2>
          <p>
            Our go-to-market strategy combines direct sales, content marketing, partnerships, 
            and product-led growth to efficiently acquire and retain customers. We focus on 
            demonstrating clear ROI and building trust through proven results.
          </p>

          {/* GTM Strategy Overview */}
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl p-8 my-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-primary/20 rounded-lg">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2 mt-0">Go-to-Market Approach</h2>
                <p className="text-lg text-muted-foreground">
                  Multi-channel strategy optimized for efficiency and scale
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold mb-0">Direct Sales</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Inbound and outbound sales targeting mid-market and enterprise customers
                </p>
                <div className="text-xs text-muted-foreground">
                  <strong>Contribution:</strong> 40% of new customers<br/>
                  <strong>Focus:</strong> High-value accounts
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Megaphone className="h-5 w-5 text-blue-500" />
                  <h3 className="text-lg font-semibold mb-0">Content Marketing</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  SEO, thought leadership, and educational content to attract organic leads
                </p>
                <div className="text-xs text-muted-foreground">
                  <strong>Contribution:</strong> 35% of new customers<br/>
                  <strong>Focus:</strong> Self-serve and SMB
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Handshake className="h-5 w-5 text-green-500" />
                  <h3 className="text-lg font-semibold mb-0">Partnerships</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Strategic partnerships with HR tech platforms and recruitment agencies
                </p>
                <div className="text-xs text-muted-foreground">
                  <strong>Contribution:</strong> 25% of new customers<br/>
                  <strong>Focus:</strong> Channel sales
                </div>
              </div>
            </div>
          </div>

          {/* Channels */}
          <h2>Sales Channels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Inbound Sales</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Leads generated through content marketing, SEO, and product signups
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>✓ Website demos and trials</li>
                <li>✓ Content download leads</li>
                <li>✓ Product signups</li>
                <li>✓ Webinar attendees</li>
                <li>✓ <strong>Conversion Rate:</strong> 12%</li>
                <li>✓ <strong>Sales Cycle:</strong> 3-4 months</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Outbound Sales</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Proactive outreach to target accounts in our ideal customer profile
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>✓ Account-based marketing</li>
                <li>✓ Cold outreach to ICP</li>
                <li>✓ Event follow-ups</li>
                <li>✓ Referral outreach</li>
                <li>✓ <strong>Conversion Rate:</strong> 8%</li>
                <li>✓ <strong>Sales Cycle:</strong> 4-6 months</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Self-Serve</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Product-led growth for SMB customers who sign up and purchase online
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>✓ Free trial signups</li>
                <li>✓ Credit card required</li>
                <li>✓ Automated onboarding</li>
                <li>✓ In-app upgrades</li>
                <li>✓ <strong>Conversion Rate:</strong> 15%</li>
                <li>✓ <strong>Sales Cycle:</strong> 1-2 weeks</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Partner Channel</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Sales through strategic partners and resellers
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>✓ HR tech platform integrations</li>
                <li>✓ Recruitment agency partnerships</li>
                <li>✓ Technology resellers</li>
                <li>✓ Referral partners</li>
                <li>✓ <strong>Conversion Rate:</strong> 20%</li>
                <li>✓ <strong>Sales Cycle:</strong> 2-3 months</li>
              </ul>
            </div>
          </div>

          {/* Marketing Approach */}
          <h2>Marketing Strategy</h2>
          <p>
            Our marketing focuses on demonstrating value, building trust, and educating the 
            market about AI-powered recruitment:
          </p>

          <div className="space-y-6 my-8">
            <div className="bg-card border-l-4 border-l-primary rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Content Marketing</h3>
              <p className="text-muted-foreground mb-3 text-sm">
                Educational content that demonstrates expertise and provides value
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Blog posts on recruitment trends, AI, and best practices</li>
                <li>• Case studies showcasing customer success</li>
                <li>• Whitepapers and research reports</li>
                <li>• Webinars and virtual events</li>
                <li>• Video tutorials and product demos</li>
              </ul>
            </div>

            <div className="bg-card border-l-4 border-l-blue-500 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">SEO & Organic Growth</h3>
              <p className="text-muted-foreground mb-3 text-sm">
                Optimize for search to attract organic traffic and leads
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Target keywords: "AI recruitment", "job matching software", "ATS"</li>
                <li>• Technical SEO optimization</li>
                <li>• Content marketing for long-tail keywords</li>
                <li>• Link building and PR</li>
                <li>• Local SEO for regional markets</li>
              </ul>
            </div>

            <div className="bg-card border-l-4 border-l-green-500 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Paid Advertising</h3>
              <p className="text-muted-foreground mb-3 text-sm">
                Targeted paid campaigns to accelerate growth
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Google Ads for high-intent keywords</li>
                <li>• LinkedIn Ads targeting HR professionals</li>
                <li>• Retargeting campaigns</li>
                <li>• Sponsored content and webinars</li>
                <li>• Performance-based campaigns (ROAS-focused)</li>
              </ul>
            </div>

            <div className="bg-card border-l-4 border-l-purple-500 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Community & Events</h3>
              <p className="text-muted-foreground mb-3 text-sm">
                Build community and engage with prospects at events
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• HR tech conferences and trade shows</li>
                <li>• Webinars and virtual events</li>
                <li>• User community and forums</li>
                <li>• Industry partnerships and sponsorships</li>
                <li>• Thought leadership speaking</li>
              </ul>
            </div>
          </div>

          {/* Partnerships */}
          <h2>Partnerships & Channels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">HR Tech Integrations</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Integrate with leading HR platforms to reach their customers
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Workday, Greenhouse, Lever integrations</li>
                <li>• Co-marketing opportunities</li>
                <li>• Referral programs</li>
                <li>• Joint go-to-market initiatives</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Recruitment Agencies</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Partner with recruitment agencies to provide tools and share revenue
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• White-label options</li>
                <li>• Revenue sharing agreements</li>
                <li>• Co-selling opportunities</li>
                <li>• Training and certification programs</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Technology Partners</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Strategic partnerships with complementary technology providers
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Cloud infrastructure partners</li>
                <li>• AI/ML technology providers</li>
                <li>• Data providers and aggregators</li>
                <li>• Security and compliance partners</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Reseller Program</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Enable resellers to sell CareerForge with attractive margins
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• 20-30% margin for resellers</li>
                <li>• Training and certification</li>
                <li>• Marketing support</li>
                <li>• Dedicated partner portal</li>
              </ul>
            </div>
          </div>

          {/* Sales Process */}
          <h2>Sales Process</h2>
          <p>
            Our sales process is designed to demonstrate value quickly and build trust:
          </p>

          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <h3 className="text-lg font-semibold mb-4">Sales Funnel Stages</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Awareness & Discovery</h4>
                  <p className="text-sm text-muted-foreground">
                    Prospects discover CareerForge through content, ads, or referrals. They 
                    visit website, download content, or sign up for trial.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Qualification</h4>
                  <p className="text-sm text-muted-foreground">
                    Sales team qualifies leads based on company size, budget, needs, and 
                    decision-making authority. BANT (Budget, Authority, Need, Timeline) framework.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Demo & Evaluation</h4>
                  <p className="text-sm text-muted-foreground">
                    Custom demo showing relevant use cases. Free trial or pilot program. 
                    ROI calculator and case studies. Address objections and concerns.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Proposal & Negotiation</h4>
                  <p className="text-sm text-muted-foreground">
                    Customized proposal with pricing, implementation plan, and success metrics. 
                    Negotiate terms, answer questions, provide references.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                  5
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold mb-1">Close & Onboarding</h4>
                  <p className="text-sm text-muted-foreground">
                    Contract signed, payment processed. Onboarding begins with dedicated 
                    customer success manager. Implementation and training.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <h2>Go-to-Market Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-8">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">12%</div>
              <div className="text-sm text-muted-foreground">Lead-to-Customer Conversion</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">4.5</div>
              <div className="text-sm text-muted-foreground">Months Average Sales Cycle</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">$2,400</div>
              <div className="text-sm text-muted-foreground">Customer Acquisition Cost</div>
            </div>
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <div className="text-3xl font-bold text-purple-500 mb-2">6</div>
              <div className="text-sm text-muted-foreground">Months CAC Payback</div>
            </div>
          </div>

          {/* Related Documentation */}
          <h2>Related Documentation</h2>
          <p>Learn more about CareerForge's go-to-market:</p>
          <ul>
            <li>
              <Link href="/docs/business/customer-acquisition" className="text-primary hover:underline">
                Customer Acquisition
              </Link>{' '}
              - Detailed acquisition funnel and strategies
            </li>
            <li>
              <Link href="/docs/business/model" className="text-primary hover:underline">
                Business Model
              </Link>{' '}
              - Revenue streams and pricing
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

