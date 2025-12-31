import { PageContent } from '@/lib/content-types'

export const contactSupportContent: PageContent = {
  metadata: {
    title: "Contact Support",
    description: "Get in touch with CareerForge support team through various channels including email, chat, phone, and community forums",
    version: "1.2.0",
    lastUpdated: "2025-12-27",
    authors: ["Support Team"],
    tags: ["support", "contact", "help", "customer service", "assistance"],
    difficulty: "beginner",
    estimatedTime: 5
  },
  tableOfContents: [
    { id: "support-channels", title: "Support Channels", level: 1 },
    { id: "response-times", title: "Response Times", level: 1 },
    { id: "before-contacting", title: "Before Contacting Support", level: 1 },
    { id: "escalation-process", title: "Escalation Process", level: 1 },
    { id: "support-hours", title: "Support Hours", level: 1 }
  ],
  introduction: {
    id: "introduction",
    title: "Contact Support",
    content: `Need help with CareerForge? Our support team is here to assist you. Choose the best contact method for your needs and we'll get back to you as quickly as possible.`
  },
  sections: [
    {
      id: "support-channels",
      title: "Support Channels",
      content: `Multiple ways to reach our support team based on your account type and urgency.`,
      lists: [
        {
          type: "unordered",
          title: "Available Support Channels",
          items: [
            "**Live Chat**: Instant support through the platform (available 9 AM - 6 PM EST)",
            "**Email Support**: support@careerforge.com (24/7 submission, response within 24 hours)",
            "**Phone Support**: +1 (555) 123-4567 (Enterprise customers only, 9 AM - 6 PM EST)",
            "**Community Forum**: peer-to-peer support and discussions",
            "**Help Center**: Self-service articles and guides",
            "**Priority Support**: Emergency line for critical issues (available 24/7)"
          ]
        }
      ],
      calloutBoxes: [
        {
          type: "info",
          title: "Best Channel for Your Issue",
          content: "Use live chat for quick questions, email for detailed issues, and phone for urgent Enterprise matters."
        }
      ]
    },
    {
      id: "response-times",
      title: "Response Times",
      content: `Expected response times vary by support channel and account type.`,
      lists: [
        {
          type: "unordered",
          title: "Standard Response Times",
          items: [
            "**Live Chat**: Immediate (during business hours)",
            "**Email Support**: Within 24 hours",
            "**Phone Support**: Immediate connection (during business hours)",
            "**Community Forum**: Within 24-48 hours for moderation",
            "**Priority Support**: Within 1 hour for critical issues"
          ]
        },
        {
          type: "unordered",
          title: "Enterprise Response Times",
          items: [
            "**Critical Issues**: Within 1 hour",
            "**High Priority**: Within 4 hours",
            "**Normal Priority**: Within 24 hours",
            "**Low Priority**: Within 48 hours"
          ]
        }
      ]
    },
    {
      id: "before-contacting",
      title: "Before Contacting Support",
      content: `Help us help you faster by preparing the necessary information.`,
      lists: [
        {
          type: "ordered",
          title: "Preparation Checklist",
          items: [
            "Check the FAQ section for common questions",
            "Review the troubleshooting guide for your issue",
            "Gather your account email address",
            "Note any error messages or screenshots",
            "Include your browser and device information",
            "Describe when the issue started and steps to reproduce"
          ]
        },
        {
          type: "unordered",
          title: "Required Information",
          items: [
            "Your full name and account email",
            "Description of the issue and when it occurs",
            "Steps you've already tried to resolve it",
            "Browser type and version",
            "Device type (desktop, mobile) and operating system",
            "Screenshots or error messages (if applicable)"
          ]
        }
      ]
    },
    {
      id: "escalation-process",
      title: "Escalation Process",
      content: `If your issue isn't resolved through standard support channels.`,
      lists: [
        {
          type: "ordered",
          title: "Escalation Steps",
          items: [
            "Contact initial support through preferred channel",
            "If unresolved after 48 hours, request escalation",
            "Provide case number from initial support interaction",
            "Escalated cases reviewed by senior support engineers",
            "Critical issues automatically escalated to engineering team"
          ]
        },
        {
          type: "unordered",
          title: "When to Escalate",
          items: [
            "Issue persists after following troubleshooting steps",
            "Business-critical functionality is affected",
            "Security or data privacy concerns",
            "Multiple users affected by the same issue",
            "Response time exceeds published SLAs"
          ]
        }
      ]
    },
    {
      id: "support-hours",
      title: "Support Hours",
      content: `Our support availability varies by channel and account type.`,
      lists: [
        {
          type: "unordered",
          title: "Standard Support Hours",
          items: [
            "**Live Chat**: Monday - Friday, 9:00 AM - 6:00 PM EST",
            "**Email Support**: 24/7 submission, responses during business hours",
            "**Phone Support**: Monday - Friday, 9:00 AM - 6:00 PM EST (Enterprise only)",
            "**Community Forum**: 24/7 with moderation during business hours"
          ]
        },
        {
          type: "unordered",
          title: "Extended Support",
          items: [
            "**Priority Support**: 24/7 for critical issues",
            "**Emergency Line**: Always available for security incidents",
            "**System Monitoring**: 24/7 automated monitoring and alerts"
          ]
        }
      ],
      calloutBoxes: [
        {
          type: "warning",
          title: "Holiday Support",
          content: "Support hours may vary during holidays. Check our status page for current availability."
        }
      ]
    }
  ],
  nextSteps: {
    title: "Ready to Contact Support?",
    links: [
      {
        text: "Start Live Chat",
        href: "/support/chat",
        description: "Chat with a support representative now"
      },
      {
        text: "Send Email",
        href: "mailto:support@careerforge.com",
        description: "Email our support team"
      },
      {
        text: "FAQ",
        href: "/docs/support-resources/faq",
        description: "Check frequently asked questions first"
      }
    ]
  },
  relatedResources: [
    {
      text: "System Status",
      href: "/status",
      description: "Check current system status and incidents"
    },
    {
      text: "Help Center",
      href: "/help",
      description: "Browse self-service support articles"
    },
    {
      text: "Community Forum",
      href: "/community",
      description: "Get help from other CareerForge users"
    }
  ]
}