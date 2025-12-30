import { AppShell } from '@/components/AppShell'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Target, Heart, Zap, Users, Globe, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Vision & Mission | CareerForge Documentation',
  description: 'CareerForge vision, mission, and core values. Learn about our purpose, what drives us, and the principles that guide everything we build.',
  openGraph: {
    title: 'CareerForge Vision & Mission',
    description: 'Our vision, mission, and core values that drive CareerForge',
    type: 'website',
  },
}

export default function VisionMissionPage() {
  return (
    <AppShell>
      <div className="py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            Vision & Mission
          </h1>
          <p className="text-xl text-muted-foreground">
            Our purpose, vision, and the values that guide everything we do
          </p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none">
          {/* Vision Section */}
          <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-xl p-8 my-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-primary/20 rounded-lg">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2 mt-0">Our Vision</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  To create a world where every person finds meaningful work and every organization 
                  discovers exceptional talent, powered by intelligent technology that understands 
                  the human side of hiring.
                </p>
              </div>
            </div>
          </div>

          <p className="text-lg">
            We envision a future where the job market is transparent, efficient, and fair. Where 
            AI augments human judgment rather than replacing it. Where skills matter more than 
            credentials, and where the right opportunity finds the right person at the right time.
          </p>

          {/* Mission Section */}
          <div className="bg-gradient-to-br from-blue-500/10 via-blue-500/5 to-transparent border border-blue-500/20 rounded-xl p-8 my-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Heart className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2 mt-0">Our Mission</h2>
                <p className="text-lg text-muted-foreground mb-4">
                  To build the most intelligent, fair, and user-centric job matching platform that 
                  transforms how people find careers and how companies discover talent, making 
                  hiring faster, smarter, and more human.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                For Job Seekers
              </h3>
              <p className="text-muted-foreground">
                We empower job seekers with AI-powered tools to discover opportunities that match 
                their skills, values, and career aspirations. We provide personalized career 
                guidance and help candidates present their best selves.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                For Recruiters
              </h3>
              <p className="text-muted-foreground">
                We help recruiters find the best candidates faster through intelligent matching, 
                automated screening, and actionable insights. We reduce time-to-hire while 
                improving quality-of-hire.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                For Society
              </h3>
              <p className="text-muted-foreground">
                We're building a more equitable job market by reducing bias, increasing transparency, 
                and making opportunities accessible to everyone, regardless of background or location.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                For Innovation
              </h3>
              <p className="text-muted-foreground">
                We push the boundaries of what's possible with AI in recruitment, continuously 
                innovating to solve real problems and create genuine value for our users.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <h2>Our Core Values</h2>
          <p>
            These values guide every decision we make, from product development to customer service 
            to how we work together as a team.
          </p>

          <div className="space-y-6 my-8">
            <div className="bg-card border-l-4 border-l-primary rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">1. User-Centricity</h3>
              <p className="text-muted-foreground mb-3">
                Users come first. Every feature, every decision, every line of code is evaluated 
                through the lens of user value. We build for real people solving real problems.
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>We listen actively to user feedback</li>
                <li>We prioritize user experience over technical elegance</li>
                <li>We measure success by user outcomes, not vanity metrics</li>
              </ul>
            </div>

            <div className="bg-card border-l-4 border-l-blue-500 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">2. Integrity & Transparency</h3>
              <p className="text-muted-foreground mb-3">
                We're honest about what our AI can and cannot do. We're transparent about our 
                algorithms, our data practices, and our limitations. Trust is earned, not assumed.
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>We explain how our matching algorithms work</li>
                <li>We're upfront about data usage and privacy</li>
                <li>We admit mistakes and learn from them</li>
              </ul>
            </div>

            <div className="bg-card border-l-4 border-l-green-500 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">3. Fairness & Equity</h3>
              <p className="text-muted-foreground mb-3">
                We're committed to building a fair hiring ecosystem. We actively work to reduce 
                bias, increase diversity, and create equal opportunities for all candidates.
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>We audit our algorithms for bias regularly</li>
                <li>We design features that promote diversity</li>
                <li>We believe skills matter more than credentials</li>
              </ul>
            </div>

            <div className="bg-card border-l-4 border-l-purple-500 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">4. Innovation & Excellence</h3>
              <p className="text-muted-foreground mb-3">
                We're not satisfied with "good enough." We continuously push boundaries, experiment 
                with new approaches, and strive for excellence in everything we build.
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>We embrace new technologies that solve real problems</li>
                <li>We iterate quickly and learn from failures</li>
                <li>We maintain high standards for code quality and user experience</li>
              </ul>
            </div>

            <div className="bg-card border-l-4 border-l-orange-500 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">5. Collaboration & Respect</h3>
              <p className="text-muted-foreground mb-3">
                We believe the best solutions come from diverse perspectives working together. 
                We respect each other, our users, and our community.
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>We value different viewpoints and experiences</li>
                <li>We communicate openly and constructively</li>
                <li>We support each other's growth and development</li>
              </ul>
            </div>

            <div className="bg-card border-l-4 border-l-red-500 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">6. Continuous Learning</h3>
              <p className="text-muted-foreground mb-3">
                The world of AI and recruitment is constantly evolving. We stay curious, keep 
                learning, and adapt to new insights and technologies.
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>We invest in our team's learning and development</li>
                <li>We stay current with industry best practices</li>
                <li>We learn from data, users, and our mistakes</li>
              </ul>
            </div>
          </div>

          {/* Company Philosophy */}
          <h2>Our Philosophy</h2>
          <p>
            Beyond our vision, mission, and values, we have a set of philosophical principles 
            that shape how we approach our work.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="bg-muted/50 border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">AI as Augmentation, Not Replacement</h3>
              <p className="text-muted-foreground">
                We believe AI should enhance human judgment, not replace it. Our algorithms 
                provide insights and recommendations, but humans make the final decisions. 
                This human-in-the-loop approach ensures better outcomes and maintains the 
                human touch in hiring.
              </p>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Skills Over Credentials</h3>
              <p className="text-muted-foreground">
                We focus on what candidates can do, not just where they went to school or 
                worked. Our matching algorithms prioritize skills, experience, and potential 
                over traditional credentials, opening opportunities to a more diverse talent pool.
              </p>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Transparency Builds Trust</h3>
              <p className="text-muted-foreground">
                We're open about how our systems work. We explain our matching algorithms, 
                show candidates why they matched, and provide recruiters with clear reasoning. 
                This transparency builds trust and helps users make better decisions.
              </p>
            </div>

            <div className="bg-muted/50 border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-3">Privacy by Design</h3>
              <p className="text-muted-foreground">
                User privacy isn't an afterthought—it's built into everything we do. We collect 
                only what's necessary, protect data rigorously, and give users control over 
                their information. Privacy and security are foundational, not features.
              </p>
            </div>
          </div>

          {/* Impact Statement */}
          <div className="bg-primary/10 border border-primary/20 rounded-xl p-8 my-8">
            <h2 className="text-2xl font-bold mb-4">The Impact We're Creating</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">44%</div>
                <div className="text-sm text-muted-foreground">Reduction in time-to-hire</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">26%</div>
                <div className="text-sm text-muted-foreground">Improvement in quality-of-hire</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">94%</div>
                <div className="text-sm text-muted-foreground">Customer retention rate</div>
              </div>
            </div>
            <p className="mt-6 text-center text-muted-foreground">
              These aren't just numbers—they represent thousands of successful placements, 
              faster career growth, and more efficient hiring processes. Every metric reflects 
              real value delivered to real people.
            </p>
          </div>

          {/* Call to Action */}
          <div className="bg-card border border-border rounded-lg p-6 my-8">
            <h2 className="text-xl font-semibold mb-3">Join Us on This Journey</h2>
            <p className="text-muted-foreground mb-4">
              Whether you're a job seeker looking for your next opportunity, a recruiter seeking 
              better tools, or a developer interested in our technology, we'd love to have you 
              be part of our mission.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/docs" 
                className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Learn More About CareerForge
              </Link>
              <Link 
                href="/docs/quickstart" 
                className="inline-flex items-center px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Related Documentation */}
          <h2>Related Documentation</h2>
          <p>Learn more about CareerForge:</p>
          <ul>
            <li>
              <Link href="/docs/about/value-proposition" className="text-primary hover:underline">
                Value Proposition
              </Link>{' '}
              - What makes CareerForge unique
            </li>
            <li>
              <Link href="/docs/philosophy" className="text-primary hover:underline">
                Design Philosophy
              </Link>{' '}
              - Our technical and design principles
            </li>
            <li>
              <Link href="/docs" className="text-primary hover:underline">
                Documentation Home
              </Link>{' '}
              - Comprehensive platform overview
            </li>
            <li>
              <Link href="/docs/executive/executive-summary" className="text-primary hover:underline">
                Executive Summary
              </Link>{' '}
              - Business overview for investors
            </li>
          </ul>
        </div>
      </div>
    </AppShell>
  )
}

