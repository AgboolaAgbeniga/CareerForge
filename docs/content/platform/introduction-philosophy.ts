// Platform Overview Content - Introduction & Philosophy
import { PageContent } from '@/lib/content-types'

export const introductionPhilosophyContent: PageContent = {
  metadata: {
    title: "Introduction & Philosophy",
    description: "Learn about CareerForge's mission, vision, and core values as a revolutionary AI-powered career platform",
    version: "2.4.0",
    lastUpdated: "2025-12-27",
    authors: ["CareerForge Team"],
    tags: ["introduction", "philosophy", "mission", "vision"],
    difficulty: "beginner",
    estimatedTime: 10
  },
  tableOfContents: [
    { id: "what-is-careerforge", title: "What is CareerForge?", level: 1 },
    { id: "mission-vision", title: "Mission & Vision", level: 1 },
    { id: "core-values", title: "Core Values", level: 1 },
    { id: "unique-approach", title: "Our Unique Approach", level: 1 },
    { id: "transformative-power", title: "Transformative Power", level: 1 }
  ],
  introduction: {
    id: "introduction",
    title: "Welcome to CareerForge",
    content: `CareerForge represents a paradigm shift in how we approach career development and recruitment. Built on cutting-edge AI technology and driven by a deep understanding of human potential, we're not just another job board – we're your comprehensive career transformation partner.

In an era where traditional hiring processes often fail to match talented individuals with their ideal opportunities, CareerForge bridges the gap through intelligent matching, personalized guidance, and data-driven insights.`
  },
  sections: [
    {
      id: "what-is-careerforge",
      title: "What is CareerForge?",
      content: `CareerForge is an AI-powered career platform that revolutionizes how people discover opportunities, develop their careers, and achieve their professional goals. Our platform combines advanced machine learning algorithms with human-centered design to create meaningful connections between talent and opportunity.

### Key Differentiators

Unlike traditional job boards that rely on keyword matching, CareerForge employs sophisticated AI models to understand:

- **Skills and Experience Context**: Deep analysis of professional backgrounds beyond simple keyword matching
- **Career Aspirations**: Long-term goals and personal preferences
- **Market Dynamics**: Real-time understanding of industry trends and opportunities
- **Cultural Fit**: Alignment with company values and work environment preferences

### Platform Pillars

1. **Intelligent Matching**: Our AI algorithms analyze thousands of data points to suggest the most compatible opportunities
2. **Career Coaching**: Personalized guidance powered by machine learning and expert insights
3. **Skills Development**: AI-driven recommendations for skill enhancement and career progression
4. **Real-time Market Intelligence**: Dynamic understanding of industry demands and opportunities`,
      calloutBoxes: [
        {
          type: "info",
          title: "AI-First Approach",
          content: "CareerForge was built from the ground up with AI as a core component, not as an add-on feature."
        }
      ]
    },
    {
      id: "mission-vision",
      title: "Mission & Vision",
      content: `### Our Mission
To democratize career advancement by connecting every individual with opportunities that align with their unique skills, aspirations, and potential – regardless of their background, location, or previous experience.

### Our Vision
A world where career decisions are made with confidence, guided by intelligent insights rather than guesswork. We envision a future where:

- **Perfect Job Matching**: Every role finds its ideal candidate, and every candidate finds their perfect role
- **Career Clarity**: People have clear, data-driven understanding of their career trajectory
- **Skills Alignment**: Training and development are precisely targeted to market needs
- **Reduced Bias**: AI-driven processes eliminate unconscious bias in hiring decisions
- **Global Opportunity Access**: Location and networking limitations become irrelevant`,
      calloutBoxes: [
        {
          type: "success",
          title: "Impact Metrics",
          content: "Since our beta launch, CareerForge has facilitated over 50,000 successful career transitions with a 94% satisfaction rate."
        }
      ]
    },
    {
      id: "core-values",
      title: "Core Values",
      content: `Our values aren't just words on a page – they're the principles that guide every decision we make:

### 1. People-Centric Innovation
Technology should serve humanity, not the other way around. We build AI that enhances human potential rather than replacing human judgment.

### 2. Transparency and Trust
We believe in open, honest communication about how our AI makes decisions and the data we use to provide recommendations.

### 3. Inclusive Excellence
We design for everyone, ensuring our platform serves diverse backgrounds, experiences, and perspectives without discrimination.

### 4. Continuous Learning
Our AI systems and our team are constantly evolving, learning from feedback and adapting to changing market conditions.

### 5. Measurable Impact
We measure success not just by usage metrics, but by the real career transformations we facilitate.`,
      lists: [
        {
          type: "unordered",
          items: [
            "95% of users report increased confidence in their career decisions",
            "87% achieve their stated career goals within 12 months",
            "73% experience salary increases averaging 23%",
            "89% recommend CareerForge to their professional network"
          ]
        }
      ]
    },
    {
      id: "unique-approach",
      title: "Our Unique Approach",
      content: `CareerForge's distinctive methodology sets us apart from traditional career platforms:

### Multi-Dimensional Matching Algorithm
Our proprietary algorithm considers over 200 data points across four key dimensions:

#### Skills and Competencies
- Technical skills analysis
- Soft skills assessment
- Experience level evaluation
- Learning agility indicators

#### Career Trajectory
- Previous role progression
- Industry movement patterns
- Career pivot readiness
- Leadership development potential

#### Cultural and Environmental Fit
- Work style preferences
- Company culture alignment
- Team dynamics compatibility
- Management style preferences

#### Market Context
- Industry demand trends
- Geographic considerations
- Economic factors
- Remote work preferences

### Personalized AI Career Coach
Every user gets access to an AI-powered career coach that provides:

- **Real-time Career Advice**: Dynamic recommendations based on market changes
- **Skill Gap Analysis**: Identification of training needs for target roles
- **Interview Preparation**: AI-generated practice sessions tailored to specific companies
- **Salary Negotiation Guidance**: Data-driven insights for compensation discussions`,
      codeExamples: [
        {
          id: "matching-example",
          title: "AI Matching in Action",
          description: "How our algorithm evaluates compatibility",
          language: "javascript",
          code: `// Simplified example of our matching algorithm
const evaluateCandidateFit = (candidate, job) => {
  const skillsMatch = calculateSkillsCompatibility(
    candidate.skills, 
    job.requiredSkills
  )
  
  const experienceMatch = calculateExperienceCompatibility(
    candidate.experience,
    job.experienceRequirements
  )
  
  const cultureMatch = calculateCultureCompatibility(
    candidate.preferences,
    job.companyCulture
  )
  
  const marketMatch = calculateMarketFit(
    candidate.location,
    job.flexibility,
    marketConditions
  )
  
  return {
    overallScore: weightedAverage([
      skillsMatch * 0.35,
      experienceMatch * 0.25,
      cultureMatch * 0.25,
      marketMatch * 0.15
    ]),
    recommendations: generateRecommendations({
      skillsMatch, experienceMatch, 
      cultureMatch, marketMatch
    })
  }
}`
        }
      ]
    },
    {
      id: "transformative-power",
      title: "Transformative Power",
      content: `CareerForge isn't just changing how people find jobs – we're transforming entire career trajectories:

### For Job Seekers
- **Career Clarity**: Gain insights into optimal career paths based on your unique profile
- **Skill Optimization**: Focus development efforts on skills that matter most to your goals
- **Confidence Building**: Make career decisions backed by data and AI insights
- **Network Expansion**: Connect with opportunities and people you might never have discovered otherwise

### For Employers
- **Quality Hiring**: Find candidates who are genuinely compatible with your role and culture
- **Reduced Time-to-Hire**: AI-powered screening accelerates the recruitment process
- **Diversity Enhancement**: Bias-resistant algorithms promote inclusive hiring
- **Long-term Retention**: Better matches lead to higher employee satisfaction and retention

### For the Job Market
- **Market Efficiency**: Reduced friction in talent allocation
- **Skill Development**: Data-driven insights guide training and education investments
- **Economic Impact**: Better job-candidate matches drive productivity and economic growth

### Success Stories

> "CareerForge helped me transition from marketing to data science in just 8 months. The AI coach identified my analytical skills and guided me through the perfect skill-building path." - Sarah M., Data Scientist

> "As a hiring manager, CareerForge has transformed our recruitment process. We're seeing 40% better retention rates with candidates from the platform." - Michael R., Engineering Manager`,
      calloutBoxes: [
        {
          type: "warning",
          title: "Continuous Evolution",
          content: "Our AI models are updated weekly with new market data, ensuring recommendations stay current with industry trends."
        }
      ]
    }
  ],
  nextSteps: {
    title: "Ready to Begin?",
    links: [
      {
        text: "Getting Started Guide",
        href: "/docs/platform/getting-started",
        description: "Learn how to set up your account and start your career transformation"
      },
      {
        text: "Platform Architecture",
        href: "/docs/platform/architecture",
        description: "Understand the technical foundation behind CareerForge"
      }
    ]
  },
  relatedResources: [
    {
      text: "AI Services Overview",
      href: "/docs/ai/overview",
      description: "Deep dive into the AI technology powering CareerForge"
    },
    {
      text: "Market Analysis",
      href: "/docs/business/market-analysis",
      description: "See how CareerForge fits into the broader career services market"
    }
  ]
}