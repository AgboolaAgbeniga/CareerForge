import { PageContent } from '@/lib/content-types'

export const dataPrivacyContent: PageContent = {
  metadata: {
    title: "Data Privacy Policies",
    description: "Comprehensive data privacy policies and practices at CareerForge, including GDPR compliance, data collection, processing, and user rights",
    version: "1.3.0",
    lastUpdated: "2024-12-27",
    authors: ["Legal Team", "Privacy Team"],
    tags: ["privacy", "GDPR", "data protection", "user rights", "compliance", "data processing"],
    difficulty: "intermediate",
    estimatedTime: 20
  },
  tableOfContents: [
    { id: "privacy-overview", title: "Privacy Overview", level: 1 },
    { id: "data-collection", title: "Data Collection", level: 1 },
    { id: "data-processing", title: "Data Processing", level: 1 },
    { id: "user-rights", title: "User Rights", level: 1 },
    { id: "data-sharing", title: "Data Sharing", level: 1 },
    { id: "retention", title: "Data Retention", level: 1 }
  ],
  introduction: {
    id: "introduction",
    title: "Data Privacy at CareerForge",
    content: `CareerForge is committed to protecting user privacy and ensuring compliance with global data protection regulations. Our privacy-first approach guides all data handling practices, from collection to deletion, ensuring users have control over their personal information.`
  },
  sections: [
    {
      id: "privacy-overview",
      title: "Privacy Overview",
      content: `Our privacy framework is built on transparency, user control, and regulatory compliance.

### Privacy Principles

#### Lawfulness, Fairness, and Transparency
- **Transparent Practices**: Clear communication about data collection and use
- **User Consent**: Explicit consent for data processing activities
- **Privacy by Design**: Privacy considerations integrated into all systems

#### Purpose Limitation
- **Defined Purposes**: Data collected only for specific, legitimate purposes
- **Purpose Specification**: Clear documentation of data processing purposes
- **Secondary Use Restrictions**: Limited use of data beyond original purpose

#### Data Minimization
- **Minimal Collection**: Only collect data necessary for service provision
- **Data Reduction**: Regular review and minimization of stored data
- **Anonymization**: Data anonymization where possible

### Regulatory Compliance
- **GDPR**: Comprehensive compliance with EU General Data Protection Regulation
- **CCPA**: California Consumer Privacy Act compliance
- **PIPEDA**: Canadian Personal Information Protection and Electronic Documents Act
- **LGPD**: Brazilian General Data Protection Law`,
      calloutBoxes: [
        {
          type: "info",
          title: "Privacy First",
          content: "Privacy is not optional at CareerForge - it's a fundamental right that we protect and respect."
        }
      ]
    },
    {
      id: "data-collection",
      title: "Data Collection",
      content: `We collect data necessary to provide career services while respecting user privacy preferences.

### Account Data
- **Basic Information**: Name, email, phone number for account creation
- **Professional Profile**: Job titles, experience, education for career services
- **Communication Preferences**: Email and notification settings

### Usage Data
- **Platform Interaction**: Page views, feature usage, search queries
- **Application Activity**: Job applications, resume uploads, profile updates
- **Device Information**: Browser type, IP address, device characteristics

### Third-Party Data
- **Social Login**: Profile information from OAuth providers (Google, LinkedIn)
- **Resume Parsing**: Extracted information from uploaded resumes
- **Background Checks**: Verification data from authorized providers (with consent)

### Sensitive Data
- **Special Categories**: Racial/ethnic origin, religious beliefs (only with explicit consent)
- **Biometric Data**: Not collected or processed
- **Genetic Data**: Not collected or processed

### Cookies and Tracking
- **Essential Cookies**: Required for platform functionality
- **Analytics Cookies**: Usage tracking (with consent)
- **Marketing Cookies**: Targeted advertising (opt-in only)`,
      lists: [
        {
          type: "unordered",
          title: "Data Collection Best Practices",
          items: [
            "Clear privacy notices at data collection points",
            "Granular consent options for different data uses",
            "Easy opt-out mechanisms for all data collection",
            "Regular privacy impact assessments for new features"
          ]
        }
      ]
    },
    {
      id: "data-processing",
      title: "Data Processing",
      content: `All data processing activities are conducted with appropriate safeguards and legal bases.

### Legal Bases for Processing
- **Consent**: User explicitly agrees to data processing
- **Contract**: Processing necessary for service provision
- **Legitimate Interest**: Business needs balanced with user rights
- **Legal Obligation**: Compliance with legal requirements

### Processing Activities
#### Profile Enhancement
- **Resume Analysis**: AI-powered skill and experience extraction
- **Job Matching**: Algorithmic matching with job opportunities
- **Career Insights**: Analytics and recommendations

#### Communication
- **Email Notifications**: Job alerts, application updates
- **In-App Messages**: Platform communications and support
- **Marketing Communications**: Promotional content (with consent)

#### Analytics and Improvement
- **Usage Analytics**: Platform performance and user experience insights
- **A/B Testing**: Feature optimization and personalization
- **Security Monitoring**: Fraud detection and abuse prevention

### Data Security Measures
- **Encryption**: Data encrypted at rest and in transit
- **Access Controls**: Role-based access to sensitive data
- **Audit Logging**: Complete audit trail of data access
- **Regular Security Assessments**: Penetration testing and vulnerability scanning`,
      codeExamples: [
        {
          id: "consent-management",
          title: "Consent Management Implementation",
          description: "Managing user consent for data processing activities",
          language: "typescript",
          code: `interface ConsentRecord {
  userId: string;
  consentType: string;
  granted: boolean;
  grantedAt: Date;
  expiresAt?: Date;
  consentVersion: string;
}

class ConsentManager {
  async grantConsent(userId: string, consentType: string): Promise<void> {
    const consent: ConsentRecord = {
      userId,
      consentType,
      granted: true,
      grantedAt: new Date(),
      consentVersion: '1.0'
    };

    await this.storeConsent(consent);
    await this.logConsentActivity(userId, consentType, 'granted');
  }

  async revokeConsent(userId: string, consentType: string): Promise<void> {
    await this.updateConsent(userId, consentType, false);
    await this.logConsentActivity(userId, consentType, 'revoked');

    // Trigger data processing changes
    await this.handleConsentRevocation(userId, consentType);
  }

  async checkConsent(userId: string, consentType: string): Promise<boolean> {
    const consent = await this.getConsent(userId, consentType);
    return consent?.granted ?? false;
  }

  private async handleConsentRevocation(userId: string, consentType: string): Promise<void> {
    switch (consentType) {
      case 'marketing':
        await this.unsubscribeFromMarketing(userId);
        break;
      case 'analytics':
        await this.disableAnalytics(userId);
        break;
      case 'data_sharing':
        await this.removeDataSharing(userId);
        break;
    }
  }
}`
        }
      ]
    },
    {
      id: "user-rights",
      title: "User Rights",
      content: `Users have comprehensive rights over their personal data under applicable privacy laws.

### Access Rights
- **Data Access**: Right to obtain copy of personal data
- **Processing Information**: Details about how data is processed
- **Data Portability**: Receive data in structured, machine-readable format

### Rectification Rights
- **Data Correction**: Right to have inaccurate data corrected
- **Data Completion**: Right to have incomplete data completed
- **Update Requests**: Ability to update personal information

### Erasure Rights
- **Right to be Forgotten**: Request deletion of personal data
- **Data Minimization**: Removal of unnecessary data
- **Consent Withdrawal**: Data deletion upon consent revocation

### Objection Rights
- **Direct Marketing**: Opt-out of marketing communications
- **Profiling**: Object to automated decision-making
- **Legitimate Interest**: Object to processing based on legitimate interest

### Additional Rights
- **Processing Restriction**: Limit processing in certain circumstances
- **Breach Notification**: Information about data breaches
- **Legal Action**: Right to lodge complaints with supervisory authorities`,
      lists: [
        {
          type: "ordered",
          title: "Exercising Your Rights",
          items: [
            "Access your privacy dashboard in account settings",
            "Submit data requests through our privacy portal",
            "Contact our Data Protection Officer for assistance",
            "Response within 30 days for most requests",
            "Free of charge for reasonable requests"
          ]
        }
      ]
    },
    {
      id: "data-sharing",
      title: "Data Sharing",
      content: `We share data only when necessary and with appropriate safeguards.

### Service Providers
- **Hosting Providers**: Cloud infrastructure for data storage
- **Analytics Services**: Usage analytics and performance monitoring
- **Email Services**: Communication and notification delivery
- **Payment Processors**: Secure payment processing

### Business Partners
- **Employers**: Resume and profile data for job applications (with consent)
- **Background Check Providers**: Verification services (with explicit consent)
- **Integration Partners**: Third-party service integrations

### Legal Requirements
- **Law Enforcement**: Data disclosure in response to legal requests
- **Court Orders**: Compliance with judicial proceedings
- **Regulatory Authorities**: Information required by government agencies

### International Transfers
- **Adequacy Decisions**: Transfers to countries with adequate protection
- **Standard Contractual Clauses**: EU-approved transfer mechanisms
- **Binding Corporate Rules**: Internal data transfer policies
- **Consent**: User consent for international data transfers

### Data Sharing Controls
- **User Consent**: Explicit consent required for data sharing
- **Purpose Limitation**: Data shared only for intended purposes
- **Security Requirements**: Recipients must maintain adequate security
- **Audit Requirements**: Regular audits of data recipients`,
      calloutBoxes: [
        {
          type: "warning",
          title: "Data Sharing Notice",
          content: "We never sell personal data to third parties. Data sharing is limited to service provision and legal requirements."
        }
      ]
    },
    {
      id: "retention",
      title: "Data Retention",
      content: `Data is retained only as long as necessary for the purposes outlined in our privacy policy.

### Retention Periods
- **Account Data**: Retained while account is active, deleted upon account closure
- **Application Data**: Retained for 7 years for legal and tax purposes
- **Communication Data**: Retained for 3 years for support and dispute resolution
- **Analytics Data**: Aggregated and anonymized after 2 years

### Deletion Processes
- **Account Deletion**: Complete data deletion within 30 days
- **Partial Deletion**: Removal of specific data types upon request
- **Automated Deletion**: Scheduled cleanup of expired data

### Archival Requirements
- **Legal Holds**: Data preservation during legal proceedings
- **Regulatory Requirements**: Extended retention for compliance purposes
- **Backup Retention**: Secure backup storage with defined retention periods

### Data Minimization
- **Regular Reviews**: Annual review of data retention schedules
- **Purpose Testing**: Verification that data is still needed
- **Anonymization**: Conversion to anonymous data when possible
- **Deletion Confirmation**: Verification of complete data removal`,
      codeExamples: [
        {
          id: "data-retention",
          title: "Automated Data Retention Management",
          description: "Implementing automated data retention and deletion policies",
          language: "typescript",
          code: `interface RetentionPolicy {
  dataType: string;
  retentionPeriod: number; // days
  deletionMethod: 'hard_delete' | 'anonymize' | 'archive';
}

class DataRetentionManager {
  private policies: RetentionPolicy[] = [
    { dataType: 'user_profile', retentionPeriod: 2555, deletionMethod: 'hard_delete' },
    { dataType: 'application_data', retentionPeriod: 2555, deletionMethod: 'archive' },
    { dataType: 'analytics', retentionPeriod: 730, deletionMethod: 'anonymize' }
  ];

  async processRetentionCleanup(): Promise<void> {
    for (const policy of this.policies) {
      const expiredRecords = await this.findExpiredRecords(policy);

      for (const record of expiredRecords) {
        await this.applyDeletionMethod(record, policy.deletionMethod);
        await this.logDeletion(record.id, policy.dataType);
      }
    }
  }

  async handleAccountDeletion(userId: string): Promise<void> {
    // Immediate deletion for account closure
    await this.deleteUserData(userId);
    await this.notifyUserDeletion(userId);

    // Schedule verification
    await this.scheduleDeletionVerification(userId, 30);
  }

  private async applyDeletionMethod(record: any, method: string): Promise<void> {
    switch (method) {
      case 'hard_delete':
        await this.hardDelete(record.id);
        break;
      case 'anonymize':
        await this.anonymizeRecord(record.id);
        break;
      case 'archive':
        await this.archiveRecord(record.id);
        break;
    }
  }
}`
        }
      ]
    }
  ],
  nextSteps: {
    title: "Privacy Resources",
    links: [
      {
        text: "Security Measures",
        href: "/docs/security-compliance/security-measures",
        description: "Learn about our technical security measures"
      },
      {
        text: "Compliance Standards",
        href: "/docs/security-compliance/compliance-standards",
        description: "Understanding our compliance certifications"
      },
      {
        text: "Privacy Settings",
        href: "/account/privacy",
        description: "Manage your privacy preferences"
      }
    ]
  },
  relatedResources: [
    {
      text: "Privacy Policy",
      href: "/privacy-policy",
      description: "Complete privacy policy and terms of service"
    },
    {
      text: "Cookie Policy",
      href: "/cookie-policy",
      description: "Information about cookies and tracking technologies"
    },
    {
      text: "GDPR Information",
      href: "/gdpr",
      description: "Detailed GDPR compliance information"
    }
  ]
}