import { AppShell } from '@/components/AppShell'
import type { Metadata } from 'next'
import Link from 'next/link'
import { DollarSign, TrendingUp, Calculator, BarChart3, Target, PieChart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Financials | CareerForge Documentation',
  description: 'CareerForge financial model: unit economics (CAC, LTV, payback period), financial projections, revenue models, funding requirements, and exit strategy.',
  openGraph: {
    title: 'CareerForge Financials',
    description: 'Unit economics, financial projections, and funding requirements',
    type: 'website',
  },
}

export default function FinancialsPage() {
  return (
    <AppShell>
      <div className="py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Financials
          </h1>
          <p className="text-xl text-muted-foreground">
            Unit economics, financial projections, and funding strategy
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h2>Executive Summary</h2>
          <p>
            CareerForge demonstrates strong unit economics with a 10:1 LTV:CAC ratio, 94% 
            annual retention, and 85% gross margins. Our financial model shows a clear path 
            to profitability with revenue growing from $4.8M in Year 1 to $25.2M in Year 3.
          </p>

          {/* Unit Economics */}
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl p-8 my-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="p-3 bg-primary/20 rounded-lg">
                <Calculator className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2 mt-0">Unit Economics</h2>
                <p className="text-lg text-muted-foreground">
                  Strong unit economics are the foundation of a sustainable SaaS business
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Customer Acquisition</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Customer Acquisition Cost (CAC):</span>
                    <span className="text-lg font-bold text-primary">$2,400</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Sales Cycle:</span>
                    <span className="text-sm font-semibold">3-6 months</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Conversion Rate:</span>
                    <span className="text-sm font-semibold">12%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Payback Period:</span>
                    <span className="text-sm font-semibold text-green-500">6 months</span>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Customer Value</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Average Revenue Per User (ARPU):</span>
                    <span className="text-lg font-bold text-blue-500">$4,800/year</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Customer Lifetime Value (LTV):</span>
                    <span className="text-lg font-bold text-green-500">$24,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">LTV:CAC Ratio:</span>
                    <span className="text-lg font-bold text-green-500">10:1</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Gross Margin:</span>
                    <span className="text-sm font-semibold text-green-500">85%</span>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Retention Metrics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Monthly Churn Rate:</span>
                    <span className="text-lg font-bold text-green-500">0.5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Annual Retention:</span>
                    <span className="text-lg font-bold text-green-500">94%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Net Revenue Retention:</span>
                    <span className="text-lg font-bold text-green-500">110%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Average Customer Lifetime:</span>
                    <span className="text-sm font-semibold">5 years</span>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Growth Efficiency</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Rule of 40:</span>
                    <span className="text-lg font-bold text-green-500">45%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Magic Number:</span>
                    <span className="text-sm font-semibold">0.8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">CAC Payback:</span>
                    <span className="text-sm font-semibold text-green-500">6 months</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Growth Rate:</span>
                    <span className="text-sm font-semibold">156% YoY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Financial Projections */}
          <h2>Financial Projections</h2>
          <p>
            Our financial model shows strong growth with a clear path to profitability:
          </p>

          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <h3 className="text-lg font-semibold mb-4">3-Year Financial Forecast</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 font-semibold">Metric</th>
                    <th className="text-right p-3 font-semibold">Year 1</th>
                    <th className="text-right p-3 font-semibold">Year 2</th>
                    <th className="text-right p-3 font-semibold">Year 3</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">Revenue</td>
                    <td className="p-3 text-right font-bold text-primary">$4.8M</td>
                    <td className="p-3 text-right font-bold text-blue-500">$13.0M</td>
                    <td className="p-3 text-right font-bold text-green-500">$25.2M</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">Customers</td>
                    <td className="p-3 text-right">100</td>
                    <td className="p-3 text-right">250</td>
                    <td className="p-3 text-right">450</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">ARPU</td>
                    <td className="p-3 text-right">$4,800</td>
                    <td className="p-3 text-right">$5,200</td>
                    <td className="p-3 text-right">$5,600</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">Gross Margin</td>
                    <td className="p-3 text-right text-green-500">82%</td>
                    <td className="p-3 text-right text-green-500">85%</td>
                    <td className="p-3 text-right text-green-500">87%</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">EBITDA</td>
                    <td className="p-3 text-right">$0.3M</td>
                    <td className="p-3 text-right text-green-500">$4.8M</td>
                    <td className="p-3 text-right text-green-500">$9.1M</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-3 font-medium">EBITDA Margin</td>
                    <td className="p-3 text-right">6%</td>
                    <td className="p-3 text-right text-green-500">37%</td>
                    <td className="p-3 text-right text-green-500">36%</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">YoY Growth</td>
                    <td className="p-3 text-right text-primary">156%</td>
                    <td className="p-3 text-right text-blue-500">171%</td>
                    <td className="p-3 text-right text-green-500">94%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Revenue Breakdown */}
          <h2>Revenue Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Subscription Revenue</h3>
              <div className="text-3xl font-bold text-primary mb-2">70%</div>
              <p className="text-sm text-muted-foreground mb-4">
                Recurring monthly/annual subscriptions from recruiters and enterprises
              </p>
              <div className="text-xs text-muted-foreground">
                <div className="mb-1">Year 1: $3.4M</div>
                <div className="mb-1">Year 2: $9.1M</div>
                <div>Year 3: $17.6M</div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Transaction Fees</h3>
              <div className="text-3xl font-bold text-blue-500 mb-2">20%</div>
              <p className="text-sm text-muted-foreground mb-4">
                Fees from successful placements (15-20% of first-year salary)
              </p>
              <div className="text-xs text-muted-foreground">
                <div className="mb-1">Year 1: $0.96M</div>
                <div className="mb-1">Year 2: $2.6M</div>
                <div>Year 3: $5.0M</div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Enterprise Contracts</h3>
              <div className="text-3xl font-bold text-green-500 mb-2">10%</div>
              <p className="text-sm text-muted-foreground mb-4">
                Custom enterprise agreements with large organizations
              </p>
              <div className="text-xs text-muted-foreground">
                <div className="mb-1">Year 1: $0.48M</div>
                <div className="mb-1">Year 2: $1.3M</div>
                <div>Year 3: $2.5M</div>
              </div>
            </div>
          </div>

          {/* Cost Structure */}
          <h2>Cost Structure</h2>
          <div className="bg-muted/50 border border-border rounded-lg p-6 my-6">
            <h3 className="text-lg font-semibold mb-4">Annual Operating Expenses (Year 2)</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Engineering & Product (35%)</span>
                  <span className="font-semibold">$2.9M</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '35%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Sales & Marketing (40%)</span>
                  <span className="font-semibold">$3.3M</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Operations & Infrastructure (10%)</span>
                  <span className="font-semibold">$0.8M</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">General & Administrative (15%)</span>
                  <span className="font-semibold">$1.2M</span>
                </div>
                <div className="w-full bg-border rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Operating Expenses</span>
                <span className="text-xl font-bold">$8.2M</span>
              </div>
            </div>
          </div>

          {/* Funding Requirements */}
          <h2>Funding Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Current Funding</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Series A (Completed)</span>
                  <span className="text-lg font-bold text-primary">$15M</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  • Product development<br/>
                  • Team expansion<br/>
                  • Market expansion<br/>
                  • Customer acquisition
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Future Funding Needs</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Series B (Planned Q4 2025)</span>
                  <span className="text-lg font-bold text-blue-500">$30M</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  • Scale sales & marketing<br/>
                  • International expansion<br/>
                  • Enterprise sales team<br/>
                  • Product enhancements
                </div>
              </div>
            </div>
          </div>

          {/* Exit Strategy */}
          <h2>Exit Strategy</h2>
          <p>
            While we're focused on building a sustainable, long-term business, we recognize that 
            exit options are important for investors:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Strategic Acquisition</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Acquisition by larger HR tech companies (Workday, SAP, Oracle) or job platforms 
                (LinkedIn, Indeed) seeking AI capabilities.
              </p>
              <div className="text-xs text-muted-foreground">
                <strong>Timeline:</strong> 5-7 years<br/>
                <strong>Valuation Multiple:</strong> 8-12x revenue
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">IPO</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Public offering once we reach $100M+ ARR and demonstrate consistent profitability 
                and growth.
              </p>
              <div className="text-xs text-muted-foreground">
                <strong>Timeline:</strong> 7-10 years<br/>
                <strong>Valuation Multiple:</strong> 10-15x revenue
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Private Equity</h3>
              <p className="text-sm text-muted-foreground mb-3">
                PE buyout for growth capital or management buyout. Common for profitable SaaS 
                companies.
              </p>
              <div className="text-xs text-muted-foreground">
                <strong>Timeline:</strong> 5-8 years<br/>
                <strong>Valuation Multiple:</strong> 6-10x revenue
              </div>
            </div>
          </div>

          {/* Key Financial Metrics */}
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-8 my-8">
            <h2 className="text-2xl font-bold mb-4">Key Financial Highlights</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">10:1</div>
                <div className="text-sm text-muted-foreground">LTV:CAC Ratio</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">94%</div>
                <div className="text-sm text-muted-foreground">Annual Retention</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">85%</div>
                <div className="text-sm text-muted-foreground">Gross Margin</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500 mb-2">45%</div>
                <div className="text-sm text-muted-foreground">Rule of 40</div>
              </div>
            </div>
          </div>

          {/* Related Documentation */}
          <h2>Related Documentation</h2>
          <p>Learn more about CareerForge's financials:</p>
          <ul>
            <li>
              <Link href="/docs/executive/revenue-projections" className="text-primary hover:underline">
                Revenue Projections
              </Link>{' '}
              - Detailed revenue forecasts
            </li>
            <li>
              <Link href="/docs/business/model" className="text-primary hover:underline">
                Business Model
              </Link>{' '}
              - Revenue streams and pricing
            </li>
            <li>
              <Link href="/docs/executive/growth-projections" className="text-primary hover:underline">
                Growth Projections
              </Link>{' '}
              - Growth forecasts and scaling
            </li>
            <li>
              <Link href="/docs/executive/investment-highlights" className="text-primary hover:underline">
                Investment Highlights
              </Link>{' '}
              - Investment opportunity overview
            </li>
          </ul>
        </div>
      </div>
    </AppShell>
  )
}

