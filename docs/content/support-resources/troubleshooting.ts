import { PageContent } from '@/lib/content-types'

export const troubleshootingContent: PageContent = {
  metadata: {
    title: "Troubleshooting Guide",
    description: "Common issues and solutions for CareerForge platform, including login problems, account issues, and technical difficulties",
    version: "1.5.0",
    lastUpdated: "2025-12-27",
    authors: ["Support Team"],
    tags: ["troubleshooting", "support", "issues", "problems", "solutions", "fixes"],
    difficulty: "intermediate",
    estimatedTime: 15
  },
  tableOfContents: [
    { id: "login-issues", title: "Login & Account Issues", level: 1 },
    { id: "profile-resume", title: "Profile & Resume Issues", level: 1 },
    { id: "job-search", title: "Job Search & Applications", level: 1 },
    { id: "performance", title: "Performance & Technical Issues", level: 1 },
    { id: "billing-payment", title: "Billing & Payment Issues", level: 1 },
    { id: "getting-help", title: "Getting Additional Help", level: 1 }
  ],
  introduction: {
    id: "introduction",
    title: "Troubleshooting Guide",
    content: `Having trouble with CareerForge? This guide covers the most common issues and provides step-by-step solutions. If you can't find a solution here, our support team is ready to help.`
  },
  sections: [
    {
      id: "login-issues",
      title: "Login & Account Issues",
      content: `Resolve common login and account-related problems.`,
      lists: [
        {
          type: "ordered",
          title: "Can't Log In",
          items: [
            "Check your email and password for typos",
            "Ensure Caps Lock is not enabled",
            "Try resetting your password using 'Forgot Password'",
            "Clear your browser cache and cookies",
            "Try a different browser or incognito mode",
            "Check if your account is locked due to too many failed attempts"
          ]
        },
        {
          type: "ordered",
          title: "Account Locked",
          items: [
            "Wait 30 minutes for automatic unlock",
            "Use 'Forgot Password' to reset your password",
            "Contact support if the issue persists",
            "Verify your email address if not already done"
          ]
        },
        {
          type: "ordered",
          title: "Two-Factor Authentication Issues",
          items: [
            "Ensure your authenticator app is properly configured",
            "Check that your device time is synchronized",
            "Try using backup codes if available",
            "Reset 2FA from account settings if needed"
          ]
        },
        {
          type: "ordered",
          title: "Email Verification Problems",
          items: [
            "Check your spam/junk folder for the verification email",
            "Add careerforge.com to your email whitelist",
            "Request a new verification email from the login page",
            "Contact support if you haven't received any emails"
          ]
        }
      ]
    },
    {
      id: "profile-resume",
      title: "Profile & Resume Issues",
      content: `Fix problems with your profile and resume functionality.`,
      lists: [
        {
          type: "ordered",
          title: "Resume Upload Failed",
          items: [
            "Ensure your resume is in PDF, DOC, or DOCX format",
            "Check that the file size is under 10MB",
            "Verify the file is not password-protected",
            "Try uploading from a different browser",
            "Clear browser cache and try again"
          ]
        },
        {
          type: "ordered",
          title: "Resume Parsing Errors",
          items: [
            "Ensure text is clearly readable (not scanned images)",
            "Check that the resume has standard formatting",
            "Verify contact information is included",
            "Manually edit parsed information if needed",
            "Contact support for complex parsing issues"
          ]
        },
        {
          type: "ordered",
          title: "Profile Not Saving",
          items: [
            "Check your internet connection",
            "Ensure all required fields are filled",
            "Try saving in smaller sections",
            "Clear browser cache and cookies",
            "Try a different browser or device"
          ]
        },
        {
          type: "ordered",
          title: "Skills Not Appearing",
          items: [
            "Add skills manually to your profile",
            "Ensure skills are spelled correctly",
            "Use industry-standard skill names",
            "Update your resume with the skills",
            "Wait for AI processing to complete (up to 24 hours)"
          ]
        }
      ]
    },
    {
      id: "job-search",
      title: "Job Search & Applications",
      content: `Resolve issues with job searching and application processes.`,
      lists: [
        {
          type: "ordered",
          title: "No Job Results",
          items: [
            "Broaden your search criteria",
            "Check location and remote work preferences",
            "Verify your profile completeness (aim for 80%+)",
            "Update your skills and experience",
            "Try different keywords or job titles"
          ]
        },
        {
          type: "ordered",
          title: "Job Application Not Submitting",
          items: [
            "Ensure all required fields are completed",
            "Check file uploads meet size/format requirements",
            "Verify your internet connection",
            "Try submitting from a different browser",
            "Contact the employer if the issue persists"
          ]
        },
        {
          type: "ordered",
          title: "Saved Jobs Not Appearing",
          items: [
            "Check if you're logged into the correct account",
            "Look in the 'Saved Jobs' section of your dashboard",
            "Try refreshing the page",
            "Clear browser cache and reload",
            "Contact support if jobs are missing"
          ]
        },
        {
          type: "ordered",
          title: "Job Alerts Not Working",
          items: [
            "Verify your email address is confirmed",
            "Check spam/junk folders for alert emails",
            "Update your job search preferences",
            "Ensure job alerts are enabled in settings",
            "Wait 24 hours for new alerts to process"
          ]
        }
      ]
    },
    {
      id: "performance",
      title: "Performance & Technical Issues",
      content: `Fix technical performance and functionality problems.`,
      lists: [
        {
          type: "ordered",
          title: "Site Loading Slowly",
          items: [
            "Check your internet connection speed",
            "Clear browser cache and cookies",
            "Disable browser extensions temporarily",
            "Try a different browser (Chrome recommended)",
            "Close other browser tabs and applications"
          ]
        },
        {
          type: "ordered",
          title: "Page Not Loading",
          items: [
            "Refresh the page (Ctrl+F5 or Cmd+Shift+R)",
            "Clear browser cache and cookies",
            "Try incognito/private browsing mode",
            "Check if CareerForge is experiencing downtime",
            "Contact support with error details"
          ]
        },
        {
          type: "ordered",
          title: "Mobile App Issues",
          items: [
            "Ensure you have the latest app version",
            "Restart the app or your device",
            "Check your mobile data/WiFi connection",
            "Clear app cache in device settings",
            "Reinstall the app if problems persist"
          ]
        },
        {
          type: "ordered",
          title: "Browser Compatibility",
          items: [
            "Use a modern browser (Chrome, Firefox, Safari, Edge)",
            "Ensure your browser is updated to the latest version",
            "Disable browser extensions that may interfere",
            "Try disabling ad blockers temporarily",
            "Use incognito mode to test without extensions"
          ]
        }
      ]
    },
    {
      id: "billing-payment",
      title: "Billing & Payment Issues",
      content: `Resolve billing and payment-related problems.`,
      lists: [
        {
          type: "ordered",
          title: "Payment Failed",
          items: [
            "Verify your card details are correct",
            "Check that your card has sufficient funds",
            "Ensure your billing address matches the card",
            "Try a different payment method",
            "Contact your bank if the issue persists"
          ]
        },
        {
          type: "ordered",
          title: "Subscription Not Activating",
          items: [
            "Wait a few minutes for processing",
            "Refresh your account dashboard",
            "Check your email for confirmation",
            "Clear browser cache and reload",
            "Contact billing support if delayed"
          ]
        },
        {
          type: "ordered",
          title: "Unexpected Charges",
          items: [
            "Review your billing history in account settings",
            "Check for proration or plan changes",
            "Verify subscription details and billing cycle",
            "Contact billing support for clarification",
            "Dispute charges with your bank if fraudulent"
          ]
        },
        {
          type: "ordered",
          title: "Can't Cancel Subscription",
          items: [
            "Go to Account Settings > Billing & Payments",
            "Click 'Cancel Subscription' and follow prompts",
            "Confirm cancellation in follow-up email",
            "Check that cancellation took effect",
            "Contact support if you need immediate cancellation"
          ]
        }
      ]
    },
    {
      id: "getting-help",
      title: "Getting Additional Help",
      content: `When troubleshooting doesn't resolve your issue.`,
      lists: [
        {
          type: "unordered",
          title: "Before Contacting Support",
          items: [
            "Gather relevant information (error messages, browser, device)",
            "Take screenshots of the issue",
            "Note when the problem started",
            "Try the suggested solutions above",
            "Check the FAQ section first"
          ]
        },
        {
          type: "unordered",
          title: "Contacting Support",
          items: [
            "Use the in-app help button for immediate assistance",
            "Email support@careerforge.com with detailed information",
            "Include your account email and screenshots",
            "Specify your browser, device, and operating system",
            "Response time: within 24 hours for standard support"
          ]
        },
        {
          type: "unordered",
          title: "Emergency Issues",
          items: [
            "Security incidents: contact security@careerforge.com immediately",
            "Account compromise: change password and contact support",
            "Data breaches: report to privacy@careerforge.com",
            "System outages: check status page for updates"
          ]
        }
      ],
      calloutBoxes: [
        {
          type: "info",
          title: "System Status",
          content: "Check our system status page at status.careerforge.com for real-time updates on platform availability and known issues."
        }
      ]
    }
  ],
  nextSteps: {
    title: "Still Need Help?",
    links: [
      {
        text: "Contact Support",
        href: "/docs/support-resources/contact-support",
        description: "Get direct assistance from our support team"
      },
      {
        text: "FAQ",
        href: "/docs/support-resources/faq",
        description: "Browse frequently asked questions"
      },
      {
        text: "Community Forum",
        href: "/community",
        description: "Connect with other users for peer support"
      }
    ]
  },
  relatedResources: [
    {
      text: "System Status",
      href: "/status",
      description: "Real-time platform status and incident reports"
    },
    {
      text: "Release Notes",
      href: "/releases",
      description: "Latest updates and known issues"
    },
    {
      text: "User Guide",
      href: "/docs/getting-started",
      description: "Complete guide for using CareerForge"
    }
  ]
}