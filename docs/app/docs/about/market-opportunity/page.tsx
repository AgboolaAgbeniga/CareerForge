import { AppShell } from '@/components/AppShell'
import type { Metadata } from 'next'
import Link from 'next/link'
import { TrendingUp, Globe, Users, DollarSign, BarChart3, Target } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Market Opportunity | CareerForge Documentation',
  description: 'CareerForge market opportunity analysis: TAM/SAM/SOM, market growth trends, competitive landscape, and market positioning in the global recruitment software market.',
  openGraph: {
    title: 'CareerForge Market Opportunity',
    description: 'Market size, growth trends, and competitive landscape analysis',
    type: 'website',
  },
}

export default function MarketOpportunityPage() {
  return (
    <AppShell>
      <div className="py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Market Opportunity
          </h1>
          <p className="text-xl text-muted-foreground">
            The massive and growing market for intelligent recruitment solutions
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>Executive Summary</h2>
          <p>
            The global recruitment software market represents a massive opportunity, driven by 
            digital transformation, talent shortages, and the need for more efficient hiring 
            processes. CareerForge is positioned to capture significant market share through 
            AI-first innovation and superior user experience.
          </p>

          {/* Market Size */}
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl p-8 my-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-primary/20 rounded-lg">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2 mt-0">Market Size</h2>
                <p className="text-lg text-muted-foreground">
                  The recruitment software market is large, growing, and ripe for disruption
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <DollarSign className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-primary mb-2">$6.2B</div>
                <div className="text-sm font-semibold mb-1">Total Addressable Market (TAM)</div>
                <div className="text-xs text-muted-foreground">
                  Global recruitment software market (2024)
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <Target className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                <div className="text-3xl font-bold text-blue-500 mb-2">$2.7B</div>
                <div className="text-sm font-semibold mb-1">Serviceable Addressable Market (SAM)</div>
                <div className="text-xs text-muted-foreground">
                  AI-powered recruitment solutions segment
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6 text-center">
                <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-3" />
                <div className="text-3xl font-bold text-green-500 mb-2">$150M</div>
                <div className="text-sm font-semibold mb-1">Serviceable Obtainable Market (SOM)</div>
                <div className="text-xs text-muted-foreground">
                  Target market share in 3 years (5.5% of SAM)
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <h3 className="font-semibold mb-3">Market Definition</h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>
                  <strong>TAM:</strong> All organizations globally that could benefit from 
                  recruitment software (enterprises, SMBs, agencies)
                </li>
                <li>
                  <strong>SAM:</strong> Organizations actively seeking AI-powered recruitment 
                  solutions with modern technology stacks
                </li>
                <li>
                  <strong>SOM:</strong> Our realistic target market based on go-to-market strategy, 
                  competitive positioning, and resource constraints
                </li>
              </ul>
            </div>
          </div>

          {/* Market Growth */}
          <h2>Market Growth Trends</h2>
          <p>
            Multiple factors are driving rapid growth in the recruitment software market:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold mb-0">12.8% CAGR</h3>
              </div>
              <p className="text-muted-foreground mb-3">
                The recruitment software market is growing at 12.8% annually, driven by digital 
                transformation and the need for more efficient hiring processes.
              </p>
              <div className="text-sm text-muted-foreground">
                <strong>Projected Market Size:</strong>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>2024: $6.2B</li>
                  <li>2025: $7.0B</li>
                  <li>2026: $7.9B</li>
                  <li>2027: $8.9B</li>
                </ul>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold mb-0">Talent Shortages</h3>
              </div>
              <p className="text-muted-foreground mb-3">
                Global talent shortages are forcing companies to invest in better recruitment 
                tools to find and attract top talent.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ 75% of companies report difficulty finding qualified candidates</li>
                <li>✓ Average time-to-fill increased 20% in 2023</li>
                <li>✓ Companies spending 30% more on recruitment</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold mb-0">Remote Work Expansion</h3>
              </div>
              <p className="text-muted-foreground mb-3">
                Remote and hybrid work models have expanded the talent pool, creating demand 
                for better matching and screening tools.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ 40% of jobs are now remote or hybrid</li>
                <li>✓ Companies hiring from global talent pools</li>
                <li>✓ Need for better remote candidate assessment</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold mb-0">AI Adoption</h3>
              </div>
              <p className="text-muted-foreground mb-3">
                Growing acceptance of AI in HR is driving adoption of AI-powered recruitment 
                solutions.
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✓ 68% of HR leaders plan to increase AI investment</li>
                <li>✓ AI recruitment tools showing 3x ROI</li>
                <li>✓ Early adopters seeing competitive advantages</li>
              </ul>
            </div>
          </div>

          {/* Competitive Landscape */}
          <h2>Competitive Landscape</h2>
          <p>
            The recruitment software market is fragmented, with significant opportunity for 
            innovative players:
          </p>

          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <h3 className="text-lg font-semibold mb-4">Market Fragmentation</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Top 3 Players</span>
                  <span className="text-sm text-muted-foreground">~25% market share</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Mid-Market Players</span>
                  <span className="text-sm text-muted-foreground">~28% market share</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Fragmented Market</span>
                  <span className="text-sm text-muted-foreground">~47% market share</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '47%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  This 47% represents significant opportunity for innovative solutions
                </p>
              </div>
            </div>
          </div>

          <h3>Market Segments</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="font-semibold mb-3">Enterprise (1000+ employees)</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• High-value contracts ($50K-$500K/year)</li>
                <li>• Complex requirements</li>
                <li>• Long sales cycles (6-12 months)</li>
                <li>• High switching costs</li>
                <li>• <strong>Market Size:</strong> $2.5B</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="font-semibold mb-3">Mid-Market (100-1000 employees)</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Medium-value contracts ($10K-$50K/year)</li>
                <li>• Moderate complexity</li>
                <li>• Medium sales cycles (3-6 months)</li>
                <li>• Moderate switching costs</li>
                <li>• <strong>Market Size:</strong> $2.2B</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="font-semibold mb-3">SMB (10-100 employees)</h4>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Lower-value contracts ($1K-$10K/year)</li>
                <li>• Simple requirements</li>
                <li>• Short sales cycles (1-3 months)</li>
                <li>• Low switching costs</li>
                <li>• <strong>Market Size:</strong> $1.5B</li>
              </ul>
            </div>
          </div>

          {/* Market Positioning */}
          <h2>CareerForge Market Positioning</h2>
          <p>
            We're positioning CareerForge as the modern, AI-first alternative to legacy 
            recruitment platforms:
          </p>

          <div className="bg-card border border-border rounded-lg p-6 my-6">
            <h3 className="text-lg font-semibold mb-4">Positioning Statement</h3>
            <p className="text-lg italic text-muted-foreground mb-4">
              "CareerForge is the AI-powered recruitment platform for forward-thinking companies 
              that want to hire faster, smarter, and more fairly—without the complexity and 
              cost of legacy solutions."
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Target Customers</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ Tech companies and startups</li>
                  <li>✓ Mid-market companies (100-1000 employees)</li>
                  <li>✓ Companies prioritizing diversity & inclusion</li>
                  <li>✓ Organizations frustrated with legacy ATS</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Key Differentiators</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>✓ AI-first architecture</li>
                  <li>✓ Modern, intuitive interface</li>
                  <li>✓ Transparent, explainable AI</li>
                  <li>✓ Lower total cost of ownership</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Market Trends */}
          <h2>Key Market Trends</h2>
          <div className="space-y-4 my-6">
            <div className="bg-card border-l-4 border-l-primary rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">1. AI & Machine Learning Adoption</h3>
              <p className="text-muted-foreground">
                HR departments are increasingly adopting AI tools. 68% of HR leaders plan to 
                increase AI investment in the next 2 years. Companies that adopt AI early are 
                seeing significant competitive advantages in hiring speed and quality.
              </p>
            </div>

            <div className="bg-card border-l-4 border-l-blue-500 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">2. Skills-Based Hiring</h3>
              <p className="text-muted-foreground">
                Shift from credential-based to skills-based hiring. Companies are prioritizing 
                skills and potential over traditional credentials, opening opportunities for 
                platforms that excel at skills assessment and matching.
              </p>
            </div>

            <div className="bg-card border-l-4 border-l-green-500 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">3. Diversity & Inclusion Focus</h3>
              <p className="text-muted-foreground">
                Companies are investing in tools that reduce bias and promote diversity. 
                Platforms that can demonstrate bias reduction and diversity outcomes have a 
                significant competitive advantage.
              </p>
            </div>

            <div className="bg-card border-l-4 border-l-purple-500 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">4. Candidate Experience</h3>
              <p className="text-muted-foreground">
                Poor candidate experience is costing companies top talent. Platforms that 
                provide excellent candidate experience (fast, transparent, helpful) are 
                gaining market share.
              </p>
            </div>

            <div className="bg-card border-l-4 border-l-orange-500 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">5. Integration & Ecosystem</h3>
              <p className="text-muted-foreground">
                Companies want recruitment tools that integrate seamlessly with their existing 
                HR tech stack. Platforms with robust APIs and integrations are preferred.
              </p>
            </div>
          </div>

          {/* Opportunity Summary */}
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-8 my-8">
            <h2 className="text-2xl font-bold mb-4">Why Now?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Market Timing</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>✓ AI technology is mature enough for production use</li>
                  <li>✓ Market is ready for AI-powered solutions</li>
                  <li>✓ Legacy platforms showing their age</li>
                  <li>✓ Talent shortages creating urgency</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Competitive Advantage</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>✓ First-mover in AI-first recruitment</li>
                  <li>✓ Modern technology stack</li>
                  <li>✓ Superior user experience</li>
                  <li>✓ Proven results and ROI</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Documentation */}
          <h2>Related Documentation</h2>
          <p>Learn more about CareerForge's market position:</p>
          <ul>
            <li>
              <Link href="/docs/executive/market-intelligence" className="text-primary hover:underline">
                Market Intelligence
              </Link>{' '}
              - Detailed market analysis
            </li>
            <li>
              <Link href="/docs/executive/competitive-analysis" className="text-primary hover:underline">
                Competitive Analysis
              </Link>{' '}
              - Competitive landscape deep dive
            </li>
            <li>
              <Link href="/docs/business/market-analysis" className="text-primary hover:underline">
                Business Market Analysis
              </Link>{' '}
              - Business-focused market analysis
            </li>
            <li>
              <Link href="/docs/about/value-proposition" className="text-primary hover:underline">
                Value Proposition
              </Link>{' '}
              - How we deliver value
            </li>
          </ul>
        </div>
      </div>
    </AppShell>
  )
}

