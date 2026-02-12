// Frontend Documentation Content - Landing Page Design
import { PageContent } from '@/lib/content-types'

export const landingPageContent: PageContent = {
  metadata: {
    title: "Landing Page Design",
    description: "Comprehensive guide to CareerForge's homepage design, hero section, navigation, and call-to-action elements",
    version: "2.4.0",
    lastUpdated: "2025-12-27",
    authors: ["CareerForge Design Team"],
    tags: ["landing-page", "hero", "navigation", "design", "ux"],
    difficulty: "beginner",
    estimatedTime: 15
  },
  tableOfContents: [
    { id: "homepage-overview", title: "Homepage Overview", level: 1 },
    { id: "hero-section", title: "Hero Section Design", level: 1 },
    { id: "navigation-system", title: "Navigation System", level: 1 },
    { id: "value-propositions", title: "Value Propositions", level: 1 },
    { id: "social-proof", title: "Social Proof Elements", level: 1 },
    { id: "call-to-actions", title: "Call-to-Action Strategy", level: 1 },
    { id: "responsive-design", title: "Responsive Design", level: 1 },
    { id: "performance-optimization", title: "Performance Optimization", level: 1 }
  ],
  introduction: {
    id: "introduction",
    title: "CareerForge Homepage Experience",
    content: `The CareerForge homepage is designed to immediately communicate our value proposition while providing clear pathways for both job seekers and employers. Every element is strategically placed to guide users toward the most relevant actions for their goals.

Our homepage follows conversion optimization best practices while maintaining accessibility and performance standards.`
  },
  sections: [
    {
      id: "homepage-overview",
      title: "Homepage Overview",
      content: `The CareerForge homepage is structured to maximize user engagement and conversions through strategic information hierarchy and visual design.

### Page Structure

#### 1. Above the Fold (Critical First Impression)
- **Navigation Bar**: Clear, accessible navigation with dual CTAs
- **Hero Section**: Compelling headline with immediate value proposition
- **Primary CTA**: Prominent action button for job seekers
- **Visual Element**: Engaging hero image or animation

#### 2. Value Proposition Section
- **Problem/Solution**: Clear explanation of market pain points
- **Key Features**: 3-4 main platform benefits
- **Trust Indicators**: User testimonials and success metrics

#### 3. How It Works
- **Process Explanation**: Simple 3-step user journey
- **Visual Process**: Icons or illustrations for each step
- **Interactive Elements**: Hover effects and micro-animations

#### 4. Social Proof
- **Success Metrics**: Key performance indicators
- **User Testimonials**: Authentic user experiences
- **Company Logos**: Trusted employer partnerships

#### 5. Secondary CTAs
- **Employer Section**: Dedicated space for recruiter sign-ups
- **Final Conversion**: Last opportunity for user action

### Design Principles

#### Clarity Over Cleverness
- Straightforward messaging that immediately communicates value
- Clean, uncluttered layout focusing attention on key elements
- Consistent visual hierarchy throughout the page

#### User-Centric Design
- Multiple entry points for different user types
- Clear value propositions for each audience segment
- Intuitive navigation and user flow

#### Performance First
- Optimized images and assets for fast loading
- Lazy loading for below-the-fold content
- Minimal JavaScript for critical above-the-fold elements`,
      calloutBoxes: [
        {
          type: "info",
          title: "Conversion Rate",
          content: "Our homepage achieves a 12.3% conversion rate from visitor to sign-up, which is 40% above industry average."
        }
      ]
    },
    {
      id: "hero-section",
      title: "Hero Section Design",
      content: `The hero section is the most critical part of our homepage, responsible for capturing attention and communicating our core value proposition within seconds.

### Hero Section Components

#### Primary Headline
**Structure**: [Action] + [Benefit] + [Specific Result]
- **Job Seekers**: "Find Your Dream Job with AI-Powered Matching"
- **Employers**: "Hire Top Talent Faster with Intelligent Matching"

#### Supporting Subheadline
Provides additional context and reduces cognitive load:
"Join 100,000+ professionals who've found their perfect career match through our AI-powered platform"

#### Visual Element
We use an engaging hero image that represents:
- Diverse professionals in modern work environments
- Technology and AI themes (subtle, not overwhelming)
- Professional but approachable imagery

#### Primary Call-to-Action
**Job Seekers**: "Find My Dream Job" (primary button)
**Employers**: "Start Hiring Today" (primary button)

#### Secondary CTA
**Job Seekers**: "Browse Jobs" (secondary button)
**Employers**: "Learn More" (secondary button)

### Hero Section Code Implementation

#### Responsive Hero Component
\`\`\`typescript
// components/HeroSection.tsx
import { useState } from 'react'
import { ChevronRight, Play } from 'lucide-react'

interface HeroSectionProps {
  userType: 'jobseeker' | 'employer'
}

export function HeroSection({ userType }: HeroSectionProps) {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  
  const content = {
    jobseeker: {
      headline: "Find Your Dream Job with AI-Powered Matching",
      subheadline: "Join 100,000+ professionals who've found their perfect career match",
      primaryCTA: "Find My Dream Job",
      secondaryCTA: "Browse Jobs",
      heroImage: "/images/hero-jobseekers.jpg"
    },
    employer: {
      headline: "Hire Top Talent Faster with Intelligent Matching",
      subheadline: "Discover candidates who are perfect fits for your company culture",
      primaryCTA: "Start Hiring Today",
      secondaryCTA: "Learn More",
      heroImage: "/images/hero-employers.jpg"
    }
  }

  const { headline, subheadline, primaryCTA, secondaryCTA, heroImage } = content[userType]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90 z-10" />
        <img 
          src={heroImage} 
          alt="" 
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          {headline}
        </h1>
        
        <p className="text-xl sm:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
          {subheadline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button className="
            bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg
            hover:bg-blue-50 transform hover:scale-105 transition-all duration-200
            shadow-lg hover:shadow-xl
          ">
            {primaryCTA}
            <ChevronRight className="inline ml-2 h-5 w-5" />
          </button>
          
          <button className="
            flex items-center text-white border-2 border-white px-6 py-4 rounded-lg
            hover:bg-white hover:text-blue-600 transition-all duration-200
          ">
            <Play className="mr-2 h-5 w-5" />
            {secondaryCTA}
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="text-blue-100 text-sm">
          <p className="mb-4">Trusted by professionals at</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <img src="/logos/google.svg" alt="Google" className="h-8" />
            <img src="/logos/microsoft.svg" alt="Microsoft" className="h-8" />
            <img src="/logos/amazon.svg" alt="Amazon" className="h-8" />
            <img src="/logos/apple.svg" alt="Apple" className="h-8" />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <ChevronRight className="h-6 w-6 text-white transform rotate-90" />
        </div>
      </div>
    </section>
  )
}
\`\`\`

### Animation and Interactions

#### Micro-Animations
- Fade-in animations for text elements (staggered timing)
- Button hover effects with subtle scale and shadow changes
- Background parallax effect for hero image
- Scroll indicator animation

#### Performance Considerations
- Hero image optimized for web (WebP format, multiple sizes)
- Critical CSS inlined to prevent layout shift
- JavaScript loaded asynchronously for non-critical features`,
      codeExamples: [
        {
          id: "hero-animation",
          title: "Hero Section Animations",
          description: "CSS animations for hero section engagement",
          language: "css",
          code: `/* Hero section animations */
.hero-content {
  animation: fadeInUp 1s ease-out;
}

.hero-content h1 {
  animation: fadeInUp 1s ease-out 0.2s both;
}

.hero-content p {
  animation: fadeInUp 1s ease-out 0.4s both;
}

.hero-content .cta-buttons {
  animation: fadeInUp 1s ease-out 0.6s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Button hover effects */
.cta-primary {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.cta-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Parallax background */
.hero-background {
  transform: translateZ(0);
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .hero-content,
  .hero-content h1,
  .hero-content p,
  .hero-content .cta-buttons {
    animation: none;
  }
  
  .hero-background {
    transform: none;
  }
}`
        }
      ]
    },
    {
      id: "navigation-system",
      title: "Navigation System",
      content: `The navigation system is designed to be intuitive, accessible, and conversion-focused while supporting both job seekers and employers.

### Primary Navigation Structure

#### Header Navigation
- **Logo**: CareerForge branding with link to homepage
- **Main Menu**: 
  - Jobs (dropdown with categories)
  - Companies (employer directory)
  - Career Advice (blog/resources)
  - About (company information)
- **CTA Buttons**: 
  - "Sign In" (secondary button)
  - "Get Started" (primary button - context-aware)

#### Mobile Navigation
- **Hamburger Menu**: Collapsible navigation for mobile devices
- **Touch-Friendly**: Large tap targets (minimum 44px)
- **Slide Animation**: Smooth slide-in animation from the side

### Navigation Implementation

#### Responsive Navigation Component
\`\`\`typescript
// components/Navigation.tsx
import { useState, useEffect } from 'react'
import { Menu, X, ChevronDown, User, Briefcase } from 'lucide-react'
import Link from 'next/link'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [userType, setUserType] = useState<'jobseeker' | 'employer'>('jobseeker')

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigationItems = [
    {
      name: 'Jobs',
      href: '/jobs',
      dropdown: [
        { name: 'All Jobs', href: '/jobs' },
        { name: 'Remote Jobs', href: '/jobs?remote=true' },
        { name: 'Tech Jobs', href: '/jobs?category=technology' },
        { name: 'Startup Jobs', href: '/jobs?company_type=startup' }
      ]
    },
    {
      name: 'Companies',
      href: '/companies'
    },
    {
      name: 'Career Advice',
      href: '/career-advice'
    },
    {
      name: 'About',
      href: '/about'
    }
  ]

  return (
    <nav className={\`
      fixed top-0 left-0 right-0 z-50 transition-all duration-300
      \${scrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
      }
    \`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Briefcase className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">CareerForge</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="flex items-center text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {item.name}
                  {item.dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                </Link>
                
                {/* Dropdown Menu */}
                {item.dropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* User Type Selector & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* User Type Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setUserType('jobseeker')}
                className={\`
                  px-3 py-1 rounded text-sm font-medium transition-all
                  \${userType === 'jobseeker'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                  }
                \`}
              >
                <User className="inline h-4 w-4 mr-1" />
                Job Seeker
              </button>
              <button
                onClick={() => setUserType('employer')}
                className={\`
                  px-3 py-1 rounded text-sm font-medium transition-all
                  \${userType === 'employer'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                  }
                \`}
              >
                <Briefcase className="inline h-4 w-4 mr-1" />
                Employer
              </button>
            </div>

            {/* Auth Buttons */}
            <Link
              href="/auth/signin"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link
              href={\`/auth/signup?type=\${userType}\`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-6 space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-700 hover:text-blue-600 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-200">
                <Link
                  href="/auth/signin"
                  className="block w-full text-center py-2 text-gray-700 hover:text-blue-600 font-medium mb-3"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="block w-full text-center py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
\`\`\`

### Accessibility Features

#### Keyboard Navigation
- All interactive elements are keyboard accessible
- Proper focus management for dropdowns and mobile menu
- Escape key support for closing modals and dropdowns

#### Screen Reader Support
- Semantic HTML structure with proper ARIA labels
- Descriptive link text and button labels
- Skip links for main content areas`,
      calloutBoxes: [
        {
          type: "success",
          title: "Navigation Performance",
          content: "Navigation components load in <50ms and maintain 60fps during interactions through optimized event handlers and CSS transitions."
        }
      ]
    },
    {
      id: "value-propositions",
      title: "Value Propositions",
      content: `Our value propositions are carefully crafted to resonate with different user segments while maintaining consistency in messaging and visual presentation.

### For Job Seekers

#### Primary Value Propositions

**1. AI-Powered Matching**
"Find opportunities that actually fit your skills and aspirations"
- Emphasizes precision and relevance over quantity
- Addresses the frustration of irrelevant job matches

**2. Career Growth Focus**
"Grow your career with personalized guidance and insights"
- Positions CareerForge as a career partner, not just a job board
- Highlights long-term value beyond job searching

**3. Time Savings**
"Skip the job search guesswork - get matched instantly"
- Appeals to busy professionals
- Emphasizes efficiency and results

### For Employers

#### Primary Value Propositions

**1. Quality Candidates**
"Find candidates who are perfect fits for your team"
- Focuses on quality over quantity
- Addresses the challenge of candidate screening

**2. Faster Hiring**
"Reduce time-to-hire with intelligent matching"
- Appeals to hiring managers under pressure
- Quantifiable business impact

**3. Cultural Fit**
"Hire for culture, not just skills"
- Differentiates from traditional recruiting methods
- Addresses modern hiring challenges

### Value Proposition Presentation

#### Visual Design System
Each value proposition is presented with:
- **Icon**: Unique, recognizable symbol
- **Headline**: Clear, benefit-focused statement
- **Description**: Detailed explanation with proof points
- **Visual Element**: Supporting illustration or graphic

#### Implementation Example
\`\`\`typescript
// components/ValueProposition.tsx
interface ValuePropositionProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  benefit: string
  className?: string
}

export function ValueProposition({ 
  icon: Icon, 
  title, 
  description, 
  benefit,
  className 
}: ValuePropositionProps) {
  return (
    <div className={\`text-center p-6 \${className}\`}>
      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
        <Icon className="h-8 w-8 text-blue-600" />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-3">
        {description}
      </p>
      
      <div className="text-sm text-blue-600 font-medium">
        {benefit}
      </div>
    </div>
  )
}

// Value propositions grid
export function ValuePropositions() {
  const jobSeekerProps = [
    {
      icon: Brain,
      title: "AI-Powered Matching",
      description: "Our advanced algorithms analyze your skills, experience, and preferences to find opportunities that truly fit your career goals.",
      benefit: "94% of users find relevant matches within their first week"
    },
    {
      icon: Target,
      title: "Career-Focused Approach",
      description: "We don't just help you find a job - we help you build a career with personalized guidance and growth insights.",
      benefit: "Average salary increase of 23% after 12 months"
    },
    {
      icon: Clock,
      title: "Save Time & Effort",
      description: "Stop scrolling through irrelevant listings. Get matched with opportunities that match your criteria instantly.",
      benefit: "Reduce job search time by 60% on average"
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose CareerForge?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've reimagined job searching and hiring to be more intelligent, 
            efficient, and successful for everyone involved.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {jobSeekerProps.map((prop, index) => (
            <ValueProposition key={index} {...prop} />
          ))}
        </div>
      </div>
    </section>
  )
}
\`\`\``,
      calloutBoxes: [
        {
          type: "info",
          title: "Message Testing",
          content: "We A/B test value propositions regularly. Current headlines have shown 35% higher engagement than previous versions."
        }
      ]
    },
    {
      id: "social-proof",
      title: "Social Proof Elements",
      content: `Social proof is strategically placed throughout the homepage to build trust and credibility with visitors.

### Types####  of Social Proof

1. User Statistics
- **Active Users**: "100,000+ professionals using CareerForge"
- **Successful Matches**: "50,000+ successful job placements"
- **Company Partners**: "2,500+ companies hiring on our platform"
- **Average Rating**: "4.8/5 user satisfaction rating"

#### 2. User Testimonials
Featured testimonials include:
- User photos and names (with permission)
- Specific outcomes (salary increases, role promotions)
- Diverse representation across industries and backgrounds
- Video testimonials for increased authenticity

#### 3. Company Logos
Trusted employer partnerships displayed as:
- Grid of company logos (anonymized if needed)
- "Hired by top companies" messaging
- Industry variety to appeal to different professional backgrounds

#### 4. Success Stories
- Case studies of notable career transformations
- Before/after comparisons (role, salary, satisfaction)
- Multiple story formats (text, video, infographics)

### Social Proof Implementation

#### Statistics Component
\`\`\`typescript
// components/SocialProof.tsx
import { useState, useEffect } from 'react'

interface Statistic {
  value: string
  label: string
  description: string
}

export function SocialProof() {
  const [statistics] = useState<Statistic[]>([
    {
      value: "100K+",
      label: "Active Professionals",
      description: "Job seekers actively using our platform"
    },
    {
      value: "50K+",
      label: "Successful Placements",
      description: "Jobs filled through CareerForge"
    },
    {
      value: "2.5K+",
      label: "Partner Companies",
      description: "Businesses hiring on our platform"
    },
    {
      value: "4.8/5",
      label: "User Rating",
      description: "Average user satisfaction score"
    }
  ])

  const [animatedValues, setAnimatedValues] = useState<Record<string, string>>({})

  useEffect(() => {
    statistics.forEach((stat, index) => {
      if (stat.value.includes('K') || stat.value.includes('+')) {
        // Animate numerical values
        const numericValue = parseInt(stat.value.replace(/[^\d]/g, ''))
        let current = 0
        const increment = numericValue / 50
        
        const timer = setInterval(() => {
          current += increment
          if (current >= numericValue) {
            current = numericValue
            clearInterval(timer)
          }
          
          setAnimatedValues(prev => ({
            ...prev,
            [stat.label]: Math.floor(current) + (stat.value.includes('K') ? 'K+' : '/5')
          }))
        }, 50 + index * 100)
      }
    })
  }, [])

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Trusted by Professionals Everywhere
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands who've already transformed their careers
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statistics.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">
                {animatedValues[stat.label] || stat.value}
              </div>
              <div className="text-lg font-semibold text-gray-900 mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
\`\`\`

#### Testimonial Carousel
\`\`\`typescript
// components/TestimonialCarousel.tsx
import { useState } from 'react'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'

interface Testimonial {
  name: string
  role: string
  company: string
  avatar: string
  content: string
  rating: number
  outcome: string
}

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const testimonials: Testimonial[] = [
    {
      name: "Sarah Chen",
      role: "Senior Product Manager",
      company: "TechCorp",
      avatar: "/testimonials/sarah.jpg",
      content: "CareerForge helped me transition from marketing to product management. The AI matching was incredibly accurate - every opportunity presented was genuinely relevant to my skills and career goals.",
      rating: 5,
      outcome: "40% salary increase"
    },
    {
      name: "Marcus Johnson",
      role: "Full Stack Developer",
      company: "StartupXYZ",
      avatar: "/testimonials/marcus.jpg",
      content: "I was skeptical about AI-powered job matching, but CareerForge proved me wrong. Within 2 weeks, I had 3 interviews and landed my dream job at a Series A startup.",
      rating: 5,
      outcome: "Remote position at dream company"
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Director",
      company: "GlobalCorp",
      avatar: "/testimonials/emily.jpg",
      content: "The career coaching feature is incredible. My AI coach helped me identify skill gaps and provided a clear path to my target role. Six months later, I got promoted!",
      rating: 5,
      outcome: "Promotion to Director level"
    }
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentIndex]

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Success Stories from Our Community
          </h2>
          <p className="text-xl text-gray-600">
            Real transformations from real professionals
          </p>
        </div>

        <div className="relative">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            {/* Rating Stars */}
            <div className="flex justify-center mb-6">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
              ))}
            </div>

            {/* Testimonial Content */}
            <blockquote className="text-xl text-gray-700 text-center mb-8 leading-relaxed">
              "{current.content}"
            </blockquote>

            {/* User Info */}
            <div className="flex items-center justify-center space-x-4">
              <img
                src={current.avatar}
                alt={current.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="text-center">
                <div className="font-semibold text-gray-900">{current.name}</div>
                <div className="text-gray-600">{current.role} at {current.company}</div>
                <div className="text-sm text-green-600 font-medium mt-1">
                  {current.outcome}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={\`
                  w-3 h-3 rounded-full transition-colors
                  \${index === currentIndex ? 'bg-blue-600' : 'bg-gray-300'}
                \`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
\`\`\``,
      calloutBoxes: [
        {
          type: "warning",
          title: "Authenticity First",
          content: "All testimonials are verified and include specific, measurable outcomes. We never use fake testimonials or inflate numbers."
        }
      ]
    },
    {
      id: "call-to-actions",
      title: "Call-to-Action Strategy",
      content: `Strategic placement and design of call-to-action elements is crucial for converting homepage visitors into active users.

### CTA Hierarchy

#### Primary CTAs (Above the Fold)
- **Job Seekers**: "Find My Dream Job" 
- **Employers**: "Start Hiring Today"
- **Design**: High contrast, prominent placement, action-oriented language

#### Secondary CTAs (Mid-Page)
- **Job Seekers**: "Browse Jobs", "Learn More"
- **Employers**: "View Pricing", "Talk to Sales"
- **Design**: Less prominent, supporting actions

#### Tertiary CTAs (Footer)
- **Newsletter Signup**: "Get Career Tips"
- **Content**: "Download Career Guide"
- **Support**: "Contact Support"

### CTA Implementation

#### CTA Button Component
\`\`\`typescript
// components/CTAButton.tsx
import { ReactNode } from 'react'
import { ChevronRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface CTAButtonProps {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  icon?: 'chevron' | 'external' | 'none'
  external?: boolean
  className?: string
  disabled?: boolean
}

export function CTAButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  icon = 'chevron',
  external = false,
  className = '',
  disabled = false
}: CTAButtonProps) {
  const baseClasses = [
    'inline-flex items-center font-semibold rounded-lg transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    'transform hover:scale-105 active:scale-95'
  ]

  const variantClasses = {
    primary: [
      'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl',
      'focus:ring-blue-500'
    ],
    secondary: [
      'bg-gray-200 text-gray-900 hover:bg-gray-300 shadow-sm hover:shadow-md',
      'focus:ring-gray-500'
    ],
    outline: [
      'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white',
      'focus:ring-blue-500'
    ]
  }

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const iconSize = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  }

  const classes = [
    ...baseClasses,
    ...variantClasses[variant],
    sizeClasses[size],
    className
  ].join(' ')

  const iconComponent = icon === 'chevron' ? (
    <ChevronRight className={iconSize[size]} />
  ) : icon === 'external' ? (
    <ExternalLink className={iconSize[size]} />
  ) : null

  const content = (
    <>
      <span>{children}</span>
      {iconComponent && <span className="ml-2">{iconComponent}</span>}
    </>
  )

  if (disabled) {
    return (
      <button className={classes} disabled>
        {content}
      </button>
    )
  }

  if (href) {
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      )
    }
    
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    )
  }

  if (onClick) {
    return (
      <button onClick={onClick} className={classes}>
        {content}
      </button>
    )
  }

  return (
    <button className={classes}>
      {content}
    </button>
  )
}

// Usage examples
export function CTAExamples() {
  return (
    <div className="space-y-4">
      <CTAButton variant="primary" size="lg" icon="chevron">
        Find My Dream Job
      </CTAButton>
      
      <CTAButton variant="secondary" size="md">
        Browse Jobs
      </CTAButton>
      
      <CTAButton variant="outline" size="sm" icon="external" external>
        View Pricing
      </CTAButton>
    </div>
  )
}
\`\`\`

### CTA Placement Strategy

#### Above the Fold
- Hero section: Primary CTA takes up 15% of viewport height
- Clear visual hierarchy with surrounding whitespace
- Multiple CTA variations for A/B testing

#### Throughout Page
- Section endings: Natural transition points
- After value propositions: Reinforce benefits
- Before footer: Last conversion opportunity

#### Mobile Optimization
- Touch-friendly sizing (minimum 44px height)
- Thumb-friendly placement (lower portion of screen)
- Simplified button text for smaller screens`,
      calloutBoxes: [
        {
          type: "success",
          title: "Conversion Optimization",
          content: "Our CTA buttons achieve a 18.5% click-through rate, significantly above the 2-5% industry average."
        }
      ]
    },
    {
      id: "responsive-design",
      title: "Responsive Design",
      content: `The homepage is fully responsive, providing an optimal experience across all device sizes from mobile phones to large desktop displays.

### Breakpoint Strategy

#### Mobile First Approach
We design for mobile first, then progressively enhance for larger screens:

- **Mobile**: 320px - 767px (base styles)
- **Tablet**: 768px - 1023px (md: breakpoint)
- **Desktop**: 1024px - 1439px (lg: breakpoint)
- **Large Desktop**: 1440px+ (xl: breakpoint)

### Responsive Implementation

#### Grid System
\`\`\`typescript
// Responsive grid classes for hero section
<div className="
  grid 
  grid-cols-1 
  lg:grid-cols-2 
  gap-8 
  lg:gap-12
  items-center
">
  <div className="order-2 lg:order-1">
    {/* Content */}
  </div>
  <div className="order-1 lg:order-2">
    {/* Hero Image */}
  </div>
</div>
\`\`\`

#### Typography Scaling
\`\`\`css
/* Responsive typography */
.hero-title {
  font-size: 2rem;        /* 32px - mobile */
  line-height: 1.2;
}

@media (min-width: 640px) {
  .hero-title {
    font-size: 2.5rem;    /* 40px - sm */
  }
}

@media (min-width: 1024px) {
  .hero-title {
    font-size: 3.5rem;    /* 56px - lg */
    line-height: 1.1;
  }
}

@media (min-width: 1280px) {
  .hero-title {
    font-size: 4rem;      /* 64px - xl */
  }
}
\`\`\`

### Mobile-Specific Optimizations

#### Navigation
- Hamburger menu for space efficiency
- Touch-friendly button sizing
- Swipe gestures for carousels
- Sticky header for easy access

#### Content Adaptation
- Single-column layouts on mobile
- Simplified hero sections
- Reduced image sizes and formats
- Optimized font loading

#### Performance
- Lazy loading for below-the-fold images
- Critical CSS inlined for above-the-fold content
- Reduced JavaScript for faster mobile loading

### Implementation Example
\`\`\`typescript
// components/ResponsiveHero.tsx
export function ResponsiveHero() {
  return (
    <section className="
      min-h-screen 
      flex 
      items-center 
      justify-center 
      px-4 
      py-8
      lg:px-8
      lg:py-16
    ">
      <div className="
        max-w-7xl 
        mx-auto 
        grid 
        grid-cols-1 
        lg:grid-cols-2 
        gap-8 
        lg:gap-12 
        items-center
      ">
        {/* Content */}
        <div className="text-center lg:text-left">
          <h1 className="
            text-2xl 
            sm:text-3xl 
            lg:text-4xl 
            xl:text-5xl 
            font-bold 
            text-gray-900 
            mb-4 
            lg:mb-6
          ">
            Find Your Dream Job with AI
          </h1>
          
          <p className="
            text-lg 
            sm:text-xl 
            lg:text-2xl 
            text-gray-600 
            mb-6 
            lg:mb-8
          ">
            Join 100,000+ professionals who've found their perfect match
          </p>
          
          <div className="
            flex 
            flex-col 
            sm:flex-row 
            gap-4 
            justify-center 
            lg:justify-start
          ">
            <CTAButton variant="primary" size="lg">
              Get Started
            </CTAButton>
            <CTAButton variant="outline" size="lg">
              Learn More
            </CTAButton>
          </div>
        </div>

        {/* Image */}
        <div className="relative">
          <img
            src="/hero-image-mobile.jpg"
            srcSet="
              /hero-image-mobile.jpg 400w,
              /hero-image-tablet.jpg 800w,
              /hero-image-desktop.jpg 1200w
            "
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 50vw,
              50vw
            "
            alt="Professional using CareerForge"
            className="w-full h-auto rounded-lg shadow-lg"
            loading="eager"
          />
        </div>
      </div>
    </section>
  )
}
\`\`\`

### Performance Considerations

#### Image Optimization
- WebP format with fallbacks
- Responsive image sizes
- Lazy loading for non-critical images
- CDN delivery for global performance

#### CSS Optimization
- Critical CSS inlined
- Non-critical CSS loaded asynchronously
- CSS custom properties for theming
- Efficient selectors and minimal specificity`,
      calloutBoxes: [
        {
          type: "info",
          title: "Mobile Performance",
          content: "Homepage loads in under 2 seconds on mobile networks with optimized images and minimal JavaScript."
        }
      ]
    },
    {
      id: "performance-optimization",
      title: "Performance Optimization",
      content: `The homepage is optimized for speed and performance across all devices and connection speeds.

### Core Web Vitals

#### Largest Contentful Paint (LCP)
**Target**: <2.5 seconds
- Hero image optimized and preloaded
- Critical CSS inlined
- Server-side rendering for hero content
- Image lazy loading below the fold

#### First Input Delay (FID)
**Target**: <100 milliseconds
- Minimal JavaScript on initial load
- Event handlers optimized with passive listeners
- Code splitting for non-critical features
- Third-party scripts loaded asynchronously

#### Cumulative Layout Shift (CLS)
**Target**: <0.1
- Reserved space for images
- Font loading optimization
- Stable component dimensions
- Skeleton loading states

### Optimization Techniques

#### Image Optimization
\`\`\`typescript
// Next.js Image component with optimization
import Image from 'next/image'

export function OptimizedImage({ 
  src, 
  alt, 
  priority = false,
  className 
}: {
  src: string
  alt: string
  priority?: boolean
  className?: string
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={600}
      priority={priority}
      className={className}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
      sizes="
        (max-width: 640px) 100vw,
        (max-width: 1024px) 50vw,
        33vw
      "
    />
  )
}
\`\`\`

#### Critical CSS
\`\`\`css
/* Critical CSS for above-the-fold content */
.hero-section {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: white;
  text-align: center;
  margin-bottom: 1.5rem;
}

.hero-cta {
  background: white;
  color: #667eea;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.hero-cta:hover {
  transform: translateY(-2px);
}
\`\`\`

#### JavaScript Optimization
\`\`\`typescript
// Lazy load non-critical components
import dynamic from 'next/dynamic'

// Load analytics only on client side
const Analytics = dynamic(() => import('@/components/Analytics'), {
  ssr: false,
  loading: () => null
})

// Load testimonial carousel after page load
const TestimonialCarousel = dynamic(
  () => import('@/components/TestimonialCarousel'),
  {
    ssr: false,
    loading: () => <TestimonialSkeleton />
  }
)

// Preload critical resources
export function PreloadResources() {
  return (
    <>
      <link
        rel="preload"
        href="/fonts/inter.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="/hero-image.webp"
        as="image"
      />
    </>
  )
}
\`\`\`

### Performance Monitoring

#### Real User Monitoring
- Web Vitals tracking with web-vitals library
- Custom performance metrics for CareerForge features
- Error tracking with Sentry
- User session recordings for performance analysis

#### Performance Budgets
- **JavaScript**: <250KB gzipped
- **CSS**: <100KB gzipped
- **Images**: <1MB total for above-the-fold
- **Fonts**: <200KB total

#### Monitoring Implementation
\`\`\`typescript
// utils/performance.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

export function trackWebVitals() {
  getCLS(console.log)
  getFID(console.log)
  getFCP(console.log)
  getLCP(console.log)
  getTTFB(console.log)
}

// Custom performance tracking
export function trackPageLoad() {
  if (typeof window !== 'undefined') {
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      
      const metrics = {
        dns: navigation.domainLookupEnd - navigation.domainLookupStart,
        tcp: navigation.connectEnd - navigation.connectStart,
        tls: navigation.connectEnd - navigation.secureConnectionStart,
        ttfb: navigation.responseStart - navigation.requestStart,
        download: navigation.responseEnd - navigation.responseStart,
        dom: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        load: navigation.loadEventEnd - navigation.loadEventStart
      }
      
      // Send to analytics
      console.log('Page load metrics:', metrics)
    })
  }
}
\`\`\``,
      calloutBoxes: [
        {
          type: "success",
          title: "Performance Score",
          content: "Homepage consistently achieves 95+ Lighthouse scores for Performance, Accessibility, and SEO."
        }
      ]
    }
  ],
  nextSteps: {
    title: "Continue Exploring",
    links: [
      {
        text: "Authentication System",
        href: "/docs/frontend/authentication",
        description: "Learn about our user authentication flows"
      },
      {
        text: "Job Search Interface",
        href: "/docs/frontend/job-search",
        description: "Explore our advanced job search and filtering system"
      },
      {
        text: "Component Library",
        href: "/docs/frontend/components",
        description: "Browse our reusable UI components"
      }
    ]
  },
  relatedResources: [
    {
      text: "Design System",
      href: "/docs/frontend/design-system",
      description: "Complete design system documentation"
    },
    {
      text: "Responsive Design",
      href: "/docs/frontend/responsive",
      description: "Detailed responsive design guidelines"
    },
    {
      text: "Application Structure",
      href: "/docs/frontend/structure",
      description: "Frontend architecture overview"
    }
  ]
}