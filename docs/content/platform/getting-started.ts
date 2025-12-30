// Platform Overview Content - Getting Started Guide
import { PageContent } from '@/lib/content-types'

export const gettingStartedContent: PageContent = {
  metadata: {
    title: "Getting Started",
    description: "Complete guide to setting up your CareerForge account and beginning your career transformation journey",
    version: "2.4.0",
    lastUpdated: "2024-12-27",
    authors: ["CareerForge Team"],
    tags: ["quickstart", "setup", "getting-started", "onboarding"],
    difficulty: "beginner",
    estimatedTime: 20
  },
  tableOfContents: [
    { id: "account-setup", title: "Account Setup", level: 1 },
    { id: "profile-completion", title: "Profile Completion", level: 1 },
    { id: "preferences-configuration", title: "Preferences & Configuration", level: 1 },
    { id: "first-match", title: "Your First Match", level: 1 },
    { id: "navigation-tour", title: "Platform Navigation Tour", level: 1 },
    { id: "next-steps", title: "Next Steps", level: 1 }
  ],
  introduction: {
    id: "introduction",
    title: "Welcome to CareerForge",
    content: `Getting started with CareerForge is designed to be intuitive and comprehensive. In this guide, we'll walk you through setting up your account, completing your profile, and making the most of our AI-powered career platform.

Whether you're a job seeker looking for your next opportunity or a professional planning your career trajectory, CareerForge adapts to your unique needs and goals.`
  },
  sections: [
    {
      id: "account-setup",
      title: "Account Setup",
      content: `Creating your CareerForge account is the first step toward transforming your career. Our streamlined registration process ensures you can start exploring opportunities within minutes.

### Account Registration

1. **Visit CareerForge**: Navigate to our homepage and click "Get Started"
2. **Choose Your Role**: Select whether you're here as a job seeker or employer
3. **Basic Information**: Provide your email, create a strong password, and verify your email address
4. **Profile Type Selection**: Choose from:
   - **Job Seeker**: Looking for new opportunities
   - **Career Explorer**: Planning career moves or skill development
   - **Employer**: Hiring talent for your organization

### Email Verification

After registration, check your email for a verification link. Clicking this link activates your account and unlocks all platform features.

### Account Security

CareerForge takes security seriously:
- All passwords are encrypted using industry-standard bcrypt hashing
- Two-factor authentication is available and recommended
- Regular security audits ensure your data remains protected`,
      calloutBoxes: [
        {
          type: "info",
          title: "Account Types",
          content: "You can switch between job seeker and employer account types at any time through your settings."
        },
        {
          type: "warning",
          title: "Email Verification Required",
          content: "Unverified accounts have limited functionality. Complete verification to access all features."
        }
      ]
    },
    {
      id: "profile-completion",
      title: "Profile Completion",
      content: `Your CareerForge profile is the foundation of your experience on our platform. A complete, accurate profile enables our AI to provide the most relevant recommendations and opportunities.

### Essential Profile Sections

#### 1. Professional Summary
- **Current Role**: Your present position and responsibilities
- **Career Goals**: Short-term and long-term objectives
- **Key Achievements**: Notable accomplishments and impact

#### 2. Skills & Expertise
- **Technical Skills**: Programming languages, tools, platforms
- **Soft Skills**: Leadership, communication, problem-solving
- **Certifications**: Relevant professional certifications
- **Industry Knowledge**: Sector-specific expertise

#### 3. Experience History
- **Employment History**: Previous roles with achievements
- **Project Portfolio**: Significant projects and outcomes
- **Education**: Degrees, bootcamps, online courses
- **Volunteer Work**: Community involvement and leadership

#### 4. Personal Preferences
- **Work Style**: Remote, hybrid, or on-site preferences
- **Company Size**: Startup, mid-size, or enterprise preference
- **Industry Focus**: Preferred sectors and markets
- **Geographic Preferences**: Location flexibility and preferences

### Profile Completion Tips

1. **Be Specific**: Use concrete examples and quantified achievements
2. **Keep Updated**: Regularly refresh your profile with new skills and experiences
3. **Show Personality**: Include information that helps convey your unique value
4. **Proofread**: Ensure all information is accurate and well-written`
    },
    {
      id: "preferences-configuration",
      title: "Preferences & Configuration",
      content: `Customizing your CareerForge experience through thoughtful preference configuration ensures you receive the most relevant opportunities and insights.

### Notification Settings

Control how and when CareerForge communicates with you:

#### Job Recommendations
- **Real-time Alerts**: Instant notifications for high-match opportunities
- **Daily Digest**: Summary of new matches and insights
- **Weekly Report**: Comprehensive analysis of market trends and your profile strength

#### Career Insights
- **Skill Development Alerts**: Recommendations for training and development
- **Market Intelligence**: Industry trends affecting your career field
- **Salary Benchmarks**: Updates on compensation trends in your sector

### Privacy Controls

CareerForge provides granular privacy controls to manage your information visibility:

#### Profile Visibility
- **Public Profile**: Visible to employers and recruiters
- **Private Profile**: Visible only to you and trusted CareerForge partners
- **Selective Visibility**: Custom control over specific profile sections

#### Data Sharing
- **AI Training Opt-out**: Exclude your data from improving our algorithms
- **Third-party Sharing**: Control which partners can access your information
- **Analytics Participation**: Contribute to platform improvements anonymously`
    },
    {
      id: "first-match",
      title: "Your First Match",
      content: `One of the most exciting moments in your CareerForge journey is receiving your first AI-generated match. Here's what to expect and how to make the most of it.

### Understanding Your Match Score

Your match score represents the AI's confidence in the compatibility between you and an opportunity. Scores range from 0-100:

#### Score Ranges and Meanings
- **90-100**: Exceptional match - aligns perfectly with your skills and preferences
- **80-89**: Strong match - high likelihood of mutual benefit
- **70-79**: Good match - worth serious consideration
- **60-69**: Moderate match - may require additional skill development
- **Below 60**: Low match - proceed with caution

### What Makes a Match

Our AI considers multiple factors when generating matches:

#### Skills Alignment
- Direct skill matches with job requirements
- Transferable skills identification
- Learning curve assessment
- Growth potential evaluation

#### Experience Compatibility
- Relevant industry experience
- Role progression alignment
- Achievement pattern matching
- Leadership experience consideration

#### Cultural and Environmental Fit
- Work environment preferences
- Company culture alignment
- Team dynamics compatibility
- Management style preferences

### Interpreting Match Recommendations

Each match includes detailed insights:

#### Strengths Analysis
- **What You Bring**: Your key qualifications for this role
- **Competitive Advantages**: Unique value you offer
- **Alignment Areas**: Where your profile strongly matches requirements

#### Growth Opportunities
- **Skill Development**: Areas for improvement or expansion
- **Experience Gaps**: Missing qualifications to address
- **Learning Path**: Recommended steps for role preparation

#### Success Probability
- **Time to Productivity**: Expected ramp-up period
- **Retention Likelihood**: Long-term success probability
- **Growth Potential**: Advancement opportunities within the role`,
      calloutBoxes: [
        {
          type: "success",
          title: "High-Quality Matches",
          content: "Our AI prioritizes quality over quantity. You may receive fewer matches than traditional job boards, but each match will be highly relevant."
        }
      ]
    },
    {
      id: "navigation-tour",
      title: "Platform Navigation Tour",
      content: `Familiarizing yourself with CareerForge's interface ensures you can leverage all available features for your career advancement.

### Main Dashboard

Your dashboard serves as the central hub for your CareerForge experience:

#### Quick Actions Panel
- **Profile Completion**: Visual progress indicator with completion tips
- **Match Opportunities**: Immediate access to your highest-scoring matches
- **Skill Assessment**: Interactive tools for skill evaluation and gap identification
- **Career Insights**: Personalized recommendations and market intelligence

#### Activity Feed
- **New Opportunities**: Recently discovered matches and recommendations
- **Market Trends**: Industry insights relevant to your career field
- **Skill Recommendations**: Training and development suggestions
- **Success Stories**: Inspirational content from the CareerForge community

### Navigation Menu Structure

#### For Job Seekers
- **Discover**: Browse opportunities and get AI-powered recommendations
- **My Matches**: Manage and track your opportunity matches
- **Profile**: Update and optimize your professional profile
- **Insights**: Career guidance and market intelligence
- **Messages**: Communicate with employers and CareerForge coaches
- **Resources**: Access training materials and career development tools

#### For Employers
- **Talent Search**: Find and evaluate potential candidates
- **Job Postings**: Create and manage job listings
- **Applications**: Review and process candidate applications
- **Analytics**: Track hiring metrics and market insights
- **Team Management**: Collaborate with hiring team members

### Mobile Experience

CareerForge's mobile app provides full functionality on-the-go:

#### Key Mobile Features
- **Push Notifications**: Real-time match alerts and messages
- **Offline Profile Access**: View and edit your profile without internet
- **Quick Apply**: Fast application submission for high-match opportunities
- **Message Management**: Communicate with employers and coaches
- **Calendar Integration**: Schedule interviews and networking events`
    },
    {
      id: "next-steps",
      title: "Next Steps",
      content: `Congratulations on completing your CareerForge setup! Here's what to focus on as you begin your career transformation journey.

### Immediate Actions (Week 1)

1. **Complete Your Profile**: Ensure all sections are filled out with specific, quantified information
2. **Explore Your Matches**: Review your top 5-10 matches and understand the recommendations
3. **Set Up Preferences**: Configure notifications, privacy settings, and job alerts
4. **Connect Your Network**: Import contacts and expand your professional network

### Short-term Goals (Month 1)

1. **Active Engagement**: Log in daily to check new matches and insights
2. **Skill Development**: Begin recommended training programs based on match analysis
3. **Profile Optimization**: Refine your profile based on early match feedback
4. **Network Building**: Connect with industry professionals and join relevant groups

### Long-term Strategy (Months 2-6)

1. **Strategic Applications**: Apply to high-match opportunities with thoughtful, personalized approaches
2. **Skill Certification**: Complete recommended training and obtain relevant certifications
3. **Career Planning**: Use CareerForge insights to develop a 12-month career roadmap
4. **Thought Leadership**: Share insights and engage with the CareerForge community

### Success Metrics to Track

Monitor your progress using these key indicators:

#### Profile Strength
- **Completion Score**: Aim for 90%+ profile completion
- **Skill Coverage**: Ensure technical and soft skills are well-represented
- **Achievement Documentation**: Quantify impact with specific metrics

#### Match Quality
- **Average Match Score**: Track the quality of opportunities you're receiving
- **Response Rate**: Monitor employer responses to your applications
- **Interview Conversion**: Measure success in moving from application to interview

#### Career Advancement
- **Skill Development**: Track new skills acquired and certifications earned
- **Network Growth**: Monitor connections and professional relationships
- **Salary Progression**: Use market insights to benchmark your compensation`
      calloutBoxes: [
        {
          type: "info",
          title: "Best Practices",
          content: "Update your profile regularly, engage with AI coach, join industry groups, use analytics, take assessments, and connect with success coaches."
        }
      ]
    }
  ],
  nextSteps: {
    title: "Continue Your Journey",
    links: [
      {
        text: "Platform Architecture",
        href: "/docs/platform/architecture",
        description: "Understand the technical foundation powering CareerForge"
      },
      {
        text: "Profile Management",
        href: "/docs/frontend/profile-management",
        description: "Learn advanced profile optimization techniques"
      }
    ]
  },
  relatedResources: [
    {
      text: "API Integration Guide",
      href: "/docs/developer/integration",
      description: "For developers who want to integrate with CareerForge"
    },
    {
      text: "Best Practices for Job Seekers",
      href: "/docs/users/best-practices",
      description: "Tips and strategies for career success"
    }
  ]
}