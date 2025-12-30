import { PageContent } from '@/lib/content-types'

export const faqContent: PageContent = {
  metadata: {
    title: "Frequently Asked Questions",
    description: "Common questions and answers about CareerForge platform, features, pricing, support, and account management",
    version: "2.0.0",
    lastUpdated: "2024-12-27",
    authors: ["Support Team"],
    tags: ["faq", "support", "help", "questions", "answers", "troubleshooting"],
    difficulty: "beginner",
    estimatedTime: 10
  },
  tableOfContents: [
    { id: "getting-started", title: "Getting Started", level: 1 },
    { id: "account-management", title: "Account Management", level: 1 },
    { id: "platform-features", title: "Platform Features", level: 1 },
    { id: "pricing-billing", title: "Pricing & Billing", level: 1 },
    { id: "technical-support", title: "Technical Support", level: 1 },
    { id: "security-privacy", title: "Security & Privacy", level: 1 }
  ],
  introduction: {
    id: "introduction",
    title: "Frequently Asked Questions",
    content: `Find answers to the most common questions about CareerForge. If you can't find what you're looking for, our support team is here to help.`
  },
  sections: [
    {
      id: "getting-started",
      title: "Getting Started",
      content: `Everything you need to know to get started with CareerForge.`,
      lists: [
        {
          type: "unordered",
          title: "Getting Started FAQs",
          items: [
            "**How do I create an account?** Create an account by visiting careerforge.com and clicking 'Sign Up'. You can register using your email address or through social login options like Google or LinkedIn.",
            "**What types of accounts are available?** We offer three account types: Job Seeker (free), Recruiter (paid), and Enterprise (custom pricing). Each account type has different features and limitations.",
            "**How do I verify my email address?** After signing up, you'll receive a verification email. Click the link in the email to verify your account. Check your spam folder if you don't see it.",
            "**Can I change my account type later?** Yes, you can upgrade or downgrade your account at any time from your account settings. Changes take effect immediately for upgrades, or at the end of your billing cycle for downgrades.",
            "**Is there a free trial?** Yes, we offer a 14-day free trial for Recruiter accounts. No credit card required to start. You can cancel anytime during the trial period."
          ]
        }
      ]
    },
    {
      id: "account-management",
      title: "Account Management",
      content: `Manage your CareerForge account settings and preferences.`,
      lists: [
        {
          type: "unordered",
          title: "Account Management FAQs",
          items: [
            "**How do I reset my password?** Click 'Forgot Password' on the login page and enter your email address. You'll receive a password reset link. For security, this link expires in 24 hours.",
            "**Can I change my email address?** Yes, go to Account Settings > Profile and update your email address. You'll need to verify the new email address before the change takes effect.",
            "**How do I delete my account?** Account deletion can be requested from Account Settings > Privacy & Security > Delete Account. This action is irreversible and will permanently remove all your data.",
            "**What happens to my data if I delete my account?** All personal data, job applications, and profile information will be permanently deleted within 30 days, in compliance with GDPR requirements.",
            "**Can I export my data?** Yes, you can request a complete data export from Account Settings > Privacy & Security > Export Data. The export will be delivered to your email within 7 days.",
            "**How do I update my profile information?** Access your profile from the dashboard. You can update personal information, work experience, education, skills, and preferences at any time."
          ]
        }
      ]
    },
    {
      id: "platform-features",
      title: "Platform Features",
      content: `Learn about CareerForge's key features and how to use them.`,
      lists: [
        {
          type: "unordered",
          title: "Platform Features FAQs",
          items: [
            "**How does the AI job matching work?** Our AI analyzes your resume and preferences to match you with relevant job opportunities. The system considers skills, experience, location, and career goals to provide personalized recommendations.",
            "**Can I upload my resume?** Yes, you can upload your resume in PDF, DOC, or DOCX format. Our AI will automatically extract your information and populate your profile.",
            "**How do I apply for jobs?** Browse job listings, click 'Apply Now', and follow the application process. You can use your profile information or customize your application for each job.",
            "**What is the resume parser?** The resume parser uses AI to extract structured data from resumes, including skills, experience, education, and contact information, making it easier to match candidates with jobs.",
            "**How do I search for jobs?** Use the search bar with keywords, location, or company name. You can also filter by salary, job type, experience level, and more advanced criteria.",
            "**Can I save job searches?** Yes, create saved searches to receive email notifications when new jobs matching your criteria are posted.",
            "**What are skill assessments?** Skill assessments are optional tests that validate your proficiency in specific skills. They help employers verify your qualifications and can improve your job matching.",
            "**How does the recommendation engine work?** The recommendation engine analyzes your profile, job history, and preferences to suggest relevant jobs, courses, and career opportunities you might be interested in."
          ]
        }
      ]
    },
    {
      id: "pricing-billing",
      title: "Pricing & Billing",
      content: `Information about CareerForge's pricing plans and billing.`,
      lists: [
        {
          type: "unordered",
          title: "Pricing & Billing FAQs",
          items: [
            "**What are the pricing plans?** We offer: Free (Job Seeker), Recruiter ($29/month), and Enterprise (custom pricing). Each plan includes different features and usage limits.",
            "**Is there a setup fee?** No setup fees for any of our plans. You only pay the monthly subscription fee.",
            "**Can I cancel anytime?** Yes, you can cancel your subscription at any time. For monthly plans, you'll continue to have access until the end of your billing period.",
            "**Do you offer refunds?** We offer a 30-day money-back guarantee for new subscriptions. Contact support within 30 days of your first payment for a full refund.",
            "**How do I update my payment method?** Go to Account Settings > Billing & Payments to update your credit card information or add a new payment method.",
            "**What payment methods do you accept?** We accept major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for Enterprise accounts.",
            "**Are there any hidden fees?** No hidden fees. All pricing is transparent, and you'll see exactly what you're paying for in your billing dashboard.",
            "**Do you offer discounts for non-profits?** Yes, we offer special pricing for qualified non-profit organizations. Contact our sales team for more information."
          ]
        }
      ]
    },
    {
      id: "technical-support",
      title: "Technical Support",
      content: `Get help with technical issues and platform support.`,
      lists: [
        {
          type: "unordered",
          title: "Technical Support FAQs",
          items: [
            "**How do I contact support?** You can reach our support team through the help center, email (support@careerforge.com), or live chat during business hours.",
            "**What are your support hours?** Our support team is available Monday-Friday, 9 AM - 6 PM EST. Emergency technical issues are monitored 24/7.",
            "**Do you offer phone support?** Phone support is available for Enterprise customers. All other customers can use email, chat, or our comprehensive help center.",
            "**How quickly do you respond?** We aim to respond to all inquiries within 24 hours. Priority support for Enterprise customers with 4-hour response times.",
            "**Can I schedule a demo?** Yes, schedule a personalized demo through our website or by contacting our sales team. Demos typically last 30-45 minutes.",
            "**Do you offer training?** We provide comprehensive documentation, video tutorials, and webinars. Enterprise customers receive personalized training sessions.",
            "**What browsers do you support?** CareerForge works best with modern browsers: Chrome (recommended), Firefox, Safari, and Edge. We support the last two versions of each browser.",
            "**Why is the site running slow?** Clear your browser cache, try a different browser, or check your internet connection. If issues persist, contact support with your browser and device information."
          ]
        }
      ]
    },
    {
      id: "security-privacy",
      title: "Security & Privacy",
      content: `Learn about how we protect your data and privacy.`,
      lists: [
        {
          type: "unordered",
          title: "Security & Privacy FAQs",
          items: [
            "**Is my data secure?** Yes, we use industry-leading security measures including encryption, regular security audits, and compliance with SOC 2 and GDPR standards.",
            "**How do you protect my personal information?** All data is encrypted in transit and at rest. We use secure servers, regular backups, and access controls to protect your information.",
            "**Do you share my data with third parties?** We only share data with your explicit consent or as required by law. We never sell personal data to third parties.",
            "**What is your privacy policy?** Our privacy policy details how we collect, use, and protect your data. You can find it in your account settings or on our website.",
            "**Can I control what data you collect?** Yes, you can manage your privacy settings in Account Settings > Privacy & Security. You can opt out of certain data collection and processing activities.",
            "**How do I exercise my GDPR rights?** EU users can exercise their GDPR rights by contacting our Data Protection Officer or using the privacy dashboard in their account settings.",
            "**What happens if there's a data breach?** In the unlikely event of a breach, we will notify affected users within 72 hours and provide guidance on protecting yourself.",
            "**Do you use cookies?** Yes, we use essential cookies for platform functionality and optional cookies for analytics and personalization. You can control cookie preferences in your browser settings."
          ]
        }
      ]
    }
  ],
  nextSteps: {
    title: "Need More Help?",
    links: [
      {
        text: "Contact Support",
        href: "/docs/support-resources/contact-support",
        description: "Get in touch with our support team"
      },
      {
        text: "Troubleshooting Guide",
        href: "/docs/support-resources/troubleshooting",
        description: "Solve common technical issues"
      },
      {
        text: "Help Center",
        href: "/help",
        description: "Browse our comprehensive help articles"
      }
    ]
  },
  relatedResources: [
    {
      text: "User Guide",
      href: "/docs/getting-started",
      description: "Step-by-step guide for using CareerForge"
    },
    {
      text: "API Documentation",
      href: "/docs/backend-api/introduction",
      description: "Technical documentation for developers"
    },
    {
      text: "Community Forum",
      href: "/community",
      description: "Connect with other users and share experiences"
    }
  ]
}