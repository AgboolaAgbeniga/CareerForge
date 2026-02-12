import { AppShell } from '@/components/AppShell'
import type { Metadata } from 'next'
import Link from 'next/link'
import { BarChart3, TrendingUp, Users, Target, Globe, PieChart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Market Analysis | CareerForge Documentation',
  description: 'Comprehensive market analysis for CareerForge: market size (TAM/SAM/SOM), competitive analysis, market trends, and target segments in the recruitment software industry.',
  openGraph: {
    title: 'CareerForge Market Analysis',
    description: 'Market size, competitive analysis, and target segments',
    type: 'website',
  },
}

export default function MarketAnalysisPage() {
  return (
    <AppShell>
      <div className="py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Market Analysis
          </h1>
          <p className="text-xl text-muted-foreground">
            Comprehensive analysis of the recruitment software market and CareerForge's position
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>Executive Summary</h2>
          <p>
            The global recruitment software market is a $6.2B opportunity growing at 12.8% annually. 
            The market is fragmented with 47% held by smaller players, creating significant opportunity 
            for innovative solutions. CareerForge is positioned to capture market share through AI-first 
            innovation, superior user experience, and proven results.
          </p>

          {/* Market Size Analysis */}
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl p-8 my-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-primary/20 rounded-lg">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2 mt-0">Market Size (TAM/SAM/SOM)</h2>
                <p className="text-lg text-muted-foreground">
                  Understanding the total addressable, serviceable, and obtainable market
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Total Addressable Market (TAM)</h3>
                <div className="text-3xl font-bold text-primary mb-2">$6.2B</div>
                <p className="text-sm text-muted-foreground mb-4">
                  Global recruitment software market in 2024
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• All organizations globally</li>
                  <li>• All recruitment software solutions</li>
                  <li>• Includes job boards, ATS, matching</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Serviceable Addressable Market (SAM)</h3>
                <div className="text-3xl font-bold text-blue-500 mb-2">$2.7B</div>
                <p className="text-sm text-muted-foreground mb-4">
                  AI-powered recruitment solutions segment
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Organizations seeking AI solutions</li>
                  <li>• Modern technology stack users</li>
                  <li>• Mid-market and enterprise focus</li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Serviceable Obtainable Market (SOM)</h3>
                <div className="text-3xl font-bold text-green-500 mb-2">$150M</div>
                <p className="text-sm text-muted-foreground mb-4">
                  Target market share in 3 years (5.5% of SAM)
                </p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Realistic target based on resources</li>
                  <li>• Go-to-market strategy</li>
                  <li>• Competitive positioning</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Competitive Analysis */}
          <h2>Competitive Analysis</h2>
          <p>
            The recruitment software market is highly competitive but fragmented, with opportunities 
            for differentiation:
          </p>

          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <h3 className="text-lg font-semibold mb-4">Market Share Distribution</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Top 3 Players (LinkedIn, Workday, Greenhouse)</span>
                  <span className="text-sm font-semibold">~25%</span>
                </div>
                <div className="w-full bg-border rounded-full h-3">
                  <div className="bg-primary h-3 rounded-full" style={{ width: '25%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Established players with strong brand recognition
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Mid-Market Players (10-15 companies)</span>
                  <span className="text-sm font-semibold">~28%</span>
                </div>
                <div className="w-full bg-border rounded-full h-3">
                  <div className="bg-blue-500 h-3 rounded-full" style={{ width: '28%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Specialized solutions for specific segments
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Fragmented Market (100+ smaller players)</span>
                  <span className="text-sm font-semibold">~47%</span>
                </div>
                <div className="w-full bg-border rounded-full h-3">
                  <div className="bg-green-500 h-3 rounded-full" style={{ width: '47%' }}></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  <strong>Significant opportunity</strong> for innovative solutions
                </p>
              </div>
            </div>
          </div>

          <h3>Competitive Positioning</h3>
          <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold">Competitor</th>
                  <th className="text-left p-3 font-semibold">Strengths</th>
                  <th className="text-left p-3 font-semibold">Weaknesses</th>
                  <th className="text-left p-3 font-semibold">Our Advantage</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="p-3 font-medium">LinkedIn Talent Solutions</td>
                  <td className="p-3 text-sm text-muted-foreground">
                    Large network, brand recognition, integrated platform
                  </td>
                  <td className="p-3 text-sm text-muted-foreground">
                    Expensive, complex, limited AI matching
                  </td>
                  <td className="p-3 text-sm">
                    <span className="text-green-500">✓</span> Better AI matching, lower cost, simpler UX
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3 font-medium">Workday Recruiting</td>
                  <td className="p-3 text-sm text-muted-foreground">
                    Enterprise features, HRIS integration, strong brand
                  </td>
                  <td className="p-3 text-sm text-muted-foreground">
                    Very expensive, complex setup, slow innovation
                  </td>
                  <td className="p-3 text-sm">
                    <span className="text-green-500">✓</span> Modern AI-first approach, faster implementation
                  </td>
                </tr>
                <tr className="border-b border-border">
                  <td className="p-3 font-medium">Greenhouse</td>
                  <td className="p-3 text-sm text-muted-foreground">
                    Good UX, structured hiring, strong brand
                  </td>
                  <td className="p-3 text-sm text-muted-foreground">
                    Limited AI, expensive, focused on enterprise
                  </td>
                  <td className="p-3 text-sm">
                    <span className="text-green-500">✓</span> Superior AI matching, accessible pricing
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Legacy ATS Platforms</td>
                  <td className="p-3 text-sm text-muted-foreground">
                    Established, known brands, many integrations
                  </td>
                  <td className="p-3 text-sm text-muted-foreground">
                    Outdated UX, limited AI, poor mobile experience
                  </td>
                  <td className="p-3 text-sm">
                    <span className="text-green-500">✓</span> Modern platform, AI-first, mobile-optimized
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Market Trends */}
          <h2>Market Trends</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-card border-l-4 border-l-primary rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold mb-0">AI Adoption Accelerating</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                68% of HR leaders plan to increase AI investment. Early adopters seeing 3x ROI. 
                Market moving from "nice to have" to "must have."
              </p>
            </div>

            <div className="bg-card border-l-4 border-l-blue-500 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Users className="h-5 w-5 text-blue-500" />
                <h3 className="text-lg font-semibold mb-0">Talent Shortages</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                75% of companies report difficulty finding qualified candidates. Average 
                time-to-fill increased 20%. Companies investing more in recruitment tools.
              </p>
            </div>

            <div className="bg-card border-l-4 border-l-green-500 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="h-5 w-5 text-green-500" />
                <h3 className="text-lg font-semibold mb-0">Remote Work Expansion</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                40% of jobs now remote/hybrid. Companies hiring from global talent pools. 
                Need for better remote assessment and matching tools.
              </p>
            </div>

            <div className="bg-card border-l-4 border-l-purple-500 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-3">
                <Target className="h-5 w-5 text-purple-500" />
                <h3 className="text-lg font-semibold mb-0">Skills-Based Hiring</h3>
              </div>
              <p className="text-muted-foreground text-sm">
                Shift from credential-based to skills-based hiring. Companies prioritizing 
                skills over degrees. Opportunity for platforms excelling at skills assessment.
              </p>
            </div>
          </div>

          {/* Target Segments */}
          <h2>Target Segments</h2>
          <p>
            We focus on specific market segments where we can deliver the most value:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Tech Companies & Startups</h3>
              <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                <li>• Fast-growing, tech-savvy</li>
                <li>• Value AI and innovation</li>
                <li>• Willing to try new solutions</li>
                <li>• High hiring volume</li>
              </ul>
              <div className="pt-3 border-t border-border">
                <div className="text-xs text-muted-foreground mb-1">Market Size</div>
                <div className="text-lg font-bold">$800M</div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Mid-Market Companies</h3>
              <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                <li>• 100-1000 employees</li>
                <li>• Outgrowing basic tools</li>
                <li>• Need better solutions</li>
                <li>• Price-sensitive but value-focused</li>
              </ul>
              <div className="pt-3 border-t border-border">
                <div className="text-xs text-muted-foreground mb-1">Market Size</div>
                <div className="text-lg font-bold">$1.2B</div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Recruitment Agencies</h3>
              <ul className="text-sm text-muted-foreground space-y-2 mb-4">
                <li>• High-volume hiring</li>
                <li>• ROI-focused</li>
                <li>• Need efficiency tools</li>
                <li>• Transaction-based revenue</li>
              </ul>
              <div className="pt-3 border-t border-border">
                <div className="text-xs text-muted-foreground mb-1">Market Size</div>
                <div className="text-lg font-bold">$700M</div>
              </div>
            </div>
          </div>

          {/* Market Growth Projections */}
          <h2>Market Growth Projections</h2>
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <h3 className="text-lg font-semibold mb-4">5-Year Market Forecast</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">2024</span>
                <span className="text-2xl font-bold text-primary">$6.2B</span>
                <span className="text-sm text-muted-foreground">12.8% growth</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">2025</span>
                <span className="text-2xl font-bold text-blue-500">$7.0B</span>
                <span className="text-sm text-muted-foreground">12.9% growth</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">2026</span>
                <span className="text-2xl font-bold text-green-500">$7.9B</span>
                <span className="text-sm text-muted-foreground">12.9% growth</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">2027</span>
                <span className="text-2xl font-bold text-purple-500">$8.9B</span>
                <span className="text-sm text-muted-foreground">12.7% growth</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium">2028</span>
                <span className="text-2xl font-bold text-orange-500">$10.0B</span>
                <span className="text-sm text-muted-foreground">12.4% growth</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Source: Industry research and market analysis (2024)
            </p>
          </div>

          {/* Geographic Analysis */}
          <h2>Geographic Market Analysis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Primary Markets</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">North America</span>
                  <span className="font-semibold">38.7%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Europe</span>
                  <span className="font-semibold">29.0%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Asia Pacific</span>
                  <span className="font-semibold">25.8%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Other Regions</span>
                  <span className="font-semibold">6.5%</span>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Growth Rates by Region</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Asia Pacific</span>
                    <span className="font-semibold text-green-500">18.7%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">Europe</span>
                    <span className="font-semibold text-blue-500">13.5%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm">North America</span>
                    <span className="font-semibold text-primary">10.2%</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '55%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Market Opportunity Summary */}
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-8 my-8">
            <h2 className="text-2xl font-bold mb-4">Why This Market Opportunity?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Market Characteristics</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>✓ Large and growing market ($6.2B, 12.8% CAGR)</li>
                  <li>✓ Fragmented (47% held by smaller players)</li>
                  <li>✓ High switching costs create stickiness</li>
                  <li>✓ Recurring revenue model</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Our Advantages</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>✓ AI-first technology advantage</li>
                  <li>✓ Proven results (44% faster, 26% better quality)</li>
                  <li>✓ Modern, user-friendly platform</li>
                  <li>✓ Strong unit economics (10:1 LTV:CAC)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Related Documentation */}
          <h2>Related Documentation</h2>
          <p>Learn more about CareerForge's market position:</p>
          <ul>
            <li>
              <Link href="/docs/about/market-opportunity" className="text-primary hover:underline">
                Market Opportunity
              </Link>{' '}
              - TAM/SAM/SOM analysis
            </li>
            <li>
              <Link href="/docs/executive/competitive-analysis" className="text-primary hover:underline">
                Competitive Analysis
              </Link>{' '}
              - Detailed competitive landscape
            </li>
            <li>
              <Link href="/docs/business/model" className="text-primary hover:underline">
                Business Model
              </Link>{' '}
              - How we monetize the market
            </li>
            <li>
              <Link href="/docs/executive/market-intelligence" className="text-primary hover:underline">
                Market Intelligence
              </Link>{' '}
              - Comprehensive market data
            </li>
          </ul>
        </div>
      </div>
    </AppShell>
  )
}

