// Backend API Company Management Content
import { PageContent } from '@/lib/content-types'

export const backendApiCompanyManagementContent: PageContent = {
  metadata: {
    title: "Company Management API",
    description: "Complete guide to company profile creation, management, verification, and employer operations",
    version: "1.0.0",
    lastUpdated: "2025-12-28",
    authors: ["Backend Engineering Team"],
    tags: ["api", "companies", "employers", "profiles", "verification"],
    difficulty: "intermediate",
    estimatedTime: 15
  },
  tableOfContents: [
    { id: "company-overview", title: "Company Management Overview", level: 1 },
    { id: "company-model", title: "Company Data Model", level: 1 },
    { id: "company-creation", title: "Company Creation & Setup", level: 1 },
    { id: "profile-management", title: "Company Profile Management", level: 1 },
    { id: "verification-process", title: "Company Verification", level: 1 },
    { id: "team-management", title: "Team & User Management", level: 1 },
    { id: "subscription-billing", title: "Subscription & Billing", level: 1 },
    { id: "company-endpoints", title: "Company Management Endpoints", level: 1 }
  ],
  introduction: {
    id: "introduction",
    title: "Company Management API",
    content: `The Company Management API provides comprehensive functionality for employers to create and manage their company profiles, handle team members, manage subscriptions, and maintain their presence on the CareerForge platform. This API supports everything from initial company setup to advanced team management and billing operations.`
  },
  sections: [
    {
      id: "company-overview",
      title: "Company Management Overview",
      content: `CareerForge's company management system enables employers to establish and maintain professional company profiles that serve as the foundation for job postings, team collaboration, and candidate interactions.

### Key Features

- **Company Profiles**: Comprehensive company information and branding
- **Team Management**: Multi-user access with role-based permissions
- **Verification System**: Company legitimacy and credibility validation
- **Subscription Management**: Flexible billing and feature access control
- **Analytics Dashboard**: Company performance and engagement metrics
- **Integration APIs**: Third-party HR system connectivity

### Company Types Supported

#### Startup
- Early-stage companies with growth focus
- Flexible team structures
- Innovation-driven culture
- Limited initial resources

#### Small/Medium Business
- Established operations with steady growth
- Structured team hierarchies
- Balanced resource allocation
- Local market focus

#### Enterprise
- Large-scale organizations
- Complex organizational structures
- Global operations
- Advanced HR systems integration

### Company Lifecycle

\`\`\`mermaid
stateDiagram-v2
    [*] --> setup: Company Setup
    setup --> verification: Submit Verification
    verification --> active: Verified & Active
    active --> suspended: Policy Violation
    suspended --> active: Resolved
    active --> [*]: Company Deletion
\`\`\``,
      calloutBoxes: [
        {
          type: "info",
          title: "Company Verification",
          content: "Verified companies receive priority placement and enhanced visibility in job search results."
        }
      ]
    },
    {
      id: "company-model",
      title: "Company Data Model",
      content: `The company data model supports comprehensive organizational information with flexible structures for different company types and sizes.

### Core Company Fields

\`\`\`typescript
interface Company {
  id: string;                    // UUID primary key
  name: string;                  // Official company name
  slug: string;                  // URL-friendly identifier
  description: string;           // Company description
  website?: string;              // Company website URL
  industry: string;              // Primary industry
  companySize: CompanySize;      // Employee count range
  foundedYear?: number;          // Year founded
  headquarters: Location;        // Headquarters location
  logo?: string;                 // Company logo URL
  banner?: string;               // Company banner image URL

  // Contact Information
  email: string;                 // Primary contact email
  phone?: string;                // Contact phone number

  // Social Media
  linkedinUrl?: string;          // LinkedIn company page
  twitterUrl?: string;           // Twitter handle
  facebookUrl?: string;          // Facebook page

  // Verification & Status
  verificationStatus: VerificationStatus; // verification status
  isVerified: boolean;           // Verification badge eligibility
  subscriptionTier: SubscriptionTier; // Current subscription level

  // Metadata
  createdAt: Date;               // Creation timestamp
  updatedAt: Date;               // Last update timestamp
  createdBy: string;             // User who created the company
}
\`\`\`

### Extended Company Data

\`\`\`typescript
interface CompanyProfile {
  // Detailed Information
  mission?: string;              // Company mission statement
  vision?: string;               // Company vision
  values: string[];              // Company values
  culture: string;               // Company culture description

  // Business Information
  revenueRange?: string;         // Annual revenue range
  fundingStage?: string;         // For startups: seed, series A, etc.
  investors?: string[];          // Notable investors

  // Benefits & Perks
  benefits: CompanyBenefit[];    // Employee benefits
  perks: string[];               // Additional perks

  // Work Environment
  remotePolicy: RemotePolicy;    // Remote work policy
  officeLocations: Location[];   // Office locations
  workCulture: WorkCulture[];    // Work culture attributes

  // Diversity & Inclusion
  diversityInitiatives?: string[]; // DEI initiatives
  equalOpportunity: boolean;     // EEO statement
}
\`\`\`

### Supporting Types

\`\`\`typescript
type CompanySize = '1-10' | '11-50' | '51-200' | '201-1000' | '1000+';
type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected';
type SubscriptionTier = 'free' | 'starter' | 'professional' | 'enterprise';
type RemotePolicy = 'on-site' | 'hybrid' | 'remote' | 'flexible';

interface CompanyBenefit {
  category: string;              // health, financial, professional, etc.
  name: string;                  // Benefit name
  description?: string;          // Benefit details
}

type WorkCulture = 'innovative' | 'collaborative' | 'fast-paced' | 'structured' |
                   'flexible' | 'learning-focused' | 'work-life-balance' | 'inclusive';
\`\`\`

### Company Validation Rules

- **Name**: 2-100 characters, unique across platform
- **Slug**: URL-safe, 3-50 characters, unique
- **Description**: 50-2000 characters
- **Website**: Valid URL format if provided
- **Industry**: Must match predefined industry taxonomy
- **Email**: Valid company email domain`,
      codeExamples: [
        {
          id: "company-creation-validation",
          title: "Company Creation with Validation",
          description: "Creating a company with comprehensive validation and setup",
          language: "typescript",
          code: `const createCompany = async (companyData: CreateCompanyRequest): Promise<Company> => {
  // Validate company data
  const validatedData = await validateCompanyData(companyData);

  // Check for duplicate company names
  const existingCompany = await db.company.findFirst({
    where: { name: validatedData.name }
  });

  if (existingCompany) {
    throw new Error('Company name already exists');
  }

  // Generate unique slug
  const slug = await generateUniqueSlug(validatedData.name);

  // Create company record
  const company = await db.company.create({
    data: {
      name: validatedData.name,
      slug,
      description: validatedData.description,
      website: validatedData.website,
      industry: validatedData.industry,
      companySize: validatedData.companySize,
      foundedYear: validatedData.foundedYear,
      headquarters: validatedData.headquarters,
      email: validatedData.email,
      phone: validatedData.phone,
      verificationStatus: 'unverified',
      subscriptionTier: 'free',
      createdBy: validatedData.createdBy
    }
  });

  // Create initial company profile
  await db.companyProfile.create({
    data: {
      companyId: company.id,
      remotePolicy: 'on-site',
      benefits: [],
      perks: [],
      workCulture: []
    }
  });

  // Add creator as company admin
  await addCompanyMember(company.id, validatedData.createdBy, 'admin');

  // Send verification email
  await sendCompanyVerificationEmail(company);

  return company;
};`
        }
      ]
    },
    {
      id: "company-creation",
      title: "Company Creation & Setup",
      content: `Step-by-step process for creating and setting up company profiles with verification and initial configuration.

### Company Creation Process

1. **Basic Information**: Company name, description, industry
2. **Contact Details**: Email, phone, website
3. **Location Setup**: Headquarters and office locations
4. **Team Setup**: Initial team member invitations
5. **Verification**: Document submission for verification
6. **Subscription**: Billing and feature selection

### Company Creation API

#### Basic Company Creation
\`\`\`javascript
const createCompany = async (companyData) => {
  const response = await fetch('/api/companies', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: 'TechCorp Inc.',
      description: 'Leading technology company focused on AI solutions...',
      website: 'https://techcorp.com',
      industry: 'Technology',
      companySize: '51-200',
      foundedYear: 2018,
      headquarters: {
        city: 'San Francisco',
        state: 'CA',
        country: 'US'
      },
      email: 'hr@techcorp.com',
      phone: '+1-555-0123'
    })
  });

  return await response.json();
};
\`\`\`

### Company Setup Wizard

\`\`\`javascript
const completeCompanySetup = async (companyId, setupData) => {
  const response = await fetch(\`/api/companies/\${companyId}/setup\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      profile: {
        mission: setupData.mission,
        vision: setupData.vision,
        values: setupData.values,
        culture: setupData.culture
      },
      benefits: setupData.benefits,
      remotePolicy: setupData.remotePolicy,
      officeLocations: setupData.officeLocations
    })
  });

  return await response.json();
};
\`\`\`

### Team Invitation

\`\`\`javascript
const inviteTeamMembers = async (companyId, invitations) => {
  const response = await fetch(\`/api/companies/\${companyId}/invitations\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      invitations: [
        {
          email: 'manager@techcorp.com',
          role: 'manager',
          permissions: ['jobs:write', 'applications:read']
        },
        {
          email: 'recruiter@techcorp.com',
          role: 'recruiter',
          permissions: ['jobs:write', 'applications:read', 'applications:write']
        }
      ]
    })
  });

  return await response.json();
};
\`\`\`

### Initial Configuration

#### Default Settings
\`\`\`javascript
const configureCompanyDefaults = async (companyId) => {
  const response = await fetch(\`/api/companies/\${companyId}/defaults\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jobDefaults: {
        applicationMethod: 'platform',
        autoPublish: false,
        requireApproval: true
      },
      notificationSettings: {
        newApplications: true,
        jobExpirations: true,
        weeklyReports: true
      },
      branding: {
        primaryColor: '#0066CC',
        logo: null
      }
    })
  });

  return await response.json();
};
\`\`\``,
      calloutBoxes: [
        {
          type: "success",
          title: "Setup Completion",
          content: "Completing company setup unlocks full platform features and job posting capabilities."
        }
      ]
    },
    {
      id: "profile-management",
      title: "Company Profile Management",
      content: `Comprehensive company profile management with branding, content updates, and public presentation controls.

### Profile Updates

#### Update Basic Information
\`\`\`javascript
const updateCompanyProfile = async (companyId, updates) => {
  const response = await fetch(\`/api/companies/\${companyId}\`, {
    method: 'PUT',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      description: updates.description,
      website: updates.website,
      industry: updates.industry,
      companySize: updates.companySize
    })
  });

  return await response.json();
};
\`\`\`

#### Update Extended Profile
\`\`\`javascript
const updateCompanyDetails = async (companyId, profileData) => {
  const response = await fetch(\`/api/companies/\${companyId}/profile\`, {
    method: 'PUT',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      mission: profileData.mission,
      vision: profileData.vision,
      values: profileData.values,
      culture: profileData.culture,
      benefits: profileData.benefits,
      remotePolicy: profileData.remotePolicy
    })
  });

  return await response.json();
};
\`\`\`

### Media Management

#### Logo Upload
\`\`\`javascript
const uploadCompanyLogo = async (companyId, logoFile) => {
  const formData = new FormData();
  formData.append('logo', logoFile);

  const response = await fetch(\`/api/companies/\${companyId}/logo\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`
    },
    body: formData
  });

  return await response.json();
};
\`\`\`

#### Banner Upload
\`\`\`javascript
const uploadCompanyBanner = async (companyId, bannerFile) => {
  const formData = new FormData();
  formData.append('banner', bannerFile);

  const response = await fetch(\`/api/companies/\${companyId}/banner\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`
    },
    body: formData
  });

  return await response.json();
};
\`\`\`

### Social Media Integration

\`\`\`javascript
const updateSocialMedia = async (companyId, socialLinks) => {
  const response = await fetch(\`/api/companies/\${companyId}/social\`, {
    method: 'PUT',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      linkedinUrl: socialLinks.linkedin,
      twitterUrl: socialLinks.twitter,
      facebookUrl: socialLinks.facebook
    })
  });

  return await response.json();
};
\`\`\`

### Profile Visibility

\`\`\`javascript
const updateProfileVisibility = async (companyId, visibility) => {
  const response = await fetch(\`/api/companies/\${companyId}/visibility\`, {
    method: 'PUT',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      showSalary: visibility.showSalary,
      showBenefits: visibility.showBenefits,
      showCulture: visibility.showCulture,
      allowAnonymousReviews: visibility.allowAnonymousReviews
    })
  });

  return await response.json();
};
\`\`\`

### Profile Analytics

\`\`\`javascript
const getProfileAnalytics = async (companyId, dateRange) => {
  const response = await fetch(\`/api/companies/\${companyId}/analytics\`, {
    headers: {
      'Authorization': \`Bearer \${token}\`
    },
    params: {
      startDate: dateRange.start,
      endDate: dateRange.end
    }
  });

  return await response.json();
};

// Returns:
// - Profile views
// - Job view conversions
// - Application rates
// - Candidate engagement metrics
\`\`\``,
      lists: [
        {
          type: "unordered",
          items: [
            "Profile updates are versioned for audit purposes",
            "Media files are automatically optimized for web delivery",
            "Social media links are validated for authenticity",
            "Profile changes may require re-verification for certain fields"
          ]
        }
      ]
    },
    {
      id: "verification-process",
      title: "Company Verification",
      content: `Multi-tier verification process to establish company legitimacy and enhance credibility on the platform.

### Verification Tiers

#### Basic Verification
- Email domain validation
- Website ownership verification
- Basic company information check

#### Standard Verification
- Business registration documents
- Tax ID verification
- LinkedIn company page validation
- Employee count confirmation

#### Premium Verification
- Legal document verification
- Background checks
- Reference validations
- Industry certifications

### Verification Process

\`\`\`mermaid
sequenceDiagram
    participant Company
    participant CareerForge
    participant Verifier

    Company->>CareerForge: Submit Verification Request
    CareerForge->>Company: Document Requirements
    Company->>CareerForge: Upload Documents
    CareerForge->>Verifier: Manual Review
    Verifier->>CareerForge: Verification Result
    CareerForge->>Company: Verification Status
\`\`\`

### Document Requirements

#### Legal Documents
- Business registration certificate
- Tax identification documents
- Articles of incorporation
- Operating licenses

#### Proof of Operations
- Recent bank statements
- Utility bills
- Lease agreements
- Insurance documents

#### Identity Verification
- Government-issued ID of authorized representative
- Company letterhead authorization
- Professional references

### Verification API

#### Submit Verification Request
\`\`\`javascript
const submitVerification = async (companyId, verificationData) => {
  const formData = new FormData();

  // Add documents
  formData.append('businessRegistration', verificationData.businessRegistration);
  formData.append('taxId', verificationData.taxId);
  formData.append('representativeId', verificationData.representativeId);

  // Add metadata
  formData.append('data', JSON.stringify({
    companySize: verificationData.companySize,
    industry: verificationData.industry,
    contactPerson: verificationData.contactPerson
  }));

  const response = await fetch(\`/api/companies/\${companyId}/verification\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`
    },
    body: formData
  });

  return await response.json();
};
\`\`\`

#### Check Verification Status
\`\`\`javascript
const getVerificationStatus = async (companyId) => {
  const response = await fetch(\`/api/companies/\${companyId}/verification\`, {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });

  return await response.json();
};
\`\`\`

### Verification Benefits

#### For Verified Companies
- Priority placement in job searches
- Enhanced company profile badge
- Increased candidate application rates
- Access to premium features
- Trust indicators in communications

#### Verification Timeline
- **Basic**: 24-48 hours
- **Standard**: 3-5 business days
- **Premium**: 1-2 weeks

### Re-verification

Companies must re-verify annually or when:
- Significant company changes occur
- Legal structure changes
- Ownership changes
- Policy violations`,
      calloutBoxes: [
        {
          type: "warning",
          title: "Verification Requirements",
          content: "Unverified companies have limited features and reduced visibility in search results."
        }
      ]
    },
    {
      id: "team-management",
      title: "Team & User Management",
      content: `Comprehensive team management with role-based access control, permissions, and collaboration features.

### Team Roles

#### Admin
- Full company access and management
- User invitation and removal
- Billing and subscription management
- Company settings configuration

#### Manager
- Job posting and management
- Team member oversight
- Application review and management
- Reporting access

#### Recruiter
- Job posting and editing
- Application management
- Candidate communication
- Interview coordination

#### Viewer
- Read-only access to company data
- Job and application viewing
- Basic reporting access

### Team Management API

#### Invite Team Member
\`\`\`javascript
const inviteTeamMember = async (companyId, invitation) => {
  const response = await fetch(\`/api/companies/\${companyId}/members\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: invitation.email,
      role: invitation.role,
      permissions: invitation.permissions,
      message: invitation.message
    })
  });

  return await response.json();
};
\`\`\`

#### Update Member Role
\`\`\`javascript
const updateMemberRole = async (companyId, memberId, newRole) => {
  const response = await fetch(\`/api/companies/\${companyId}/members/\${memberId}\`, {
    method: 'PUT',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      role: newRole.role,
      permissions: newRole.permissions
    })
  });

  return await response.json();
};
\`\`\`

#### Remove Team Member
\`\`\`javascript
const removeTeamMember = async (companyId, memberId) => {
  const response = await fetch(\`/api/companies/\${companyId}/members/\${memberId}\`, {
    method: 'DELETE',
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });

  return await response.json();
};
\`\`\`

### Bulk Team Operations

\`\`\`javascript
const bulkInviteMembers = async (companyId, invitations) => {
  const response = await fetch(\`/api/companies/\${companyId}/members/bulk\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      invitations: invitations,
      sendWelcomeEmails: true
    })
  });

  return await response.json();
};
\`\`\`

### Team Permissions

\`\`\`typescript
const teamPermissions = {
  admin: [
    'company:write',
    'jobs:write',
    'applications:write',
    'team:write',
    'billing:write',
    'analytics:read'
  ],
  manager: [
    'jobs:write',
    'applications:write',
    'team:read',
    'analytics:read'
  ],
  recruiter: [
    'jobs:write',
    'applications:write',
    'team:read'
  ],
  viewer: [
    'jobs:read',
    'applications:read',
    'team:read'
  ]
};
\`\`\`

### Team Activity Tracking

\`\`\`javascript
const getTeamActivity = async (companyId, filters) => {
  const response = await fetch(\`/api/companies/\${companyId}/activity\`, {
    headers: {
      'Authorization': \`Bearer \${token}\`
    },
    params: {
      userId: filters.userId,
      action: filters.action,
      startDate: filters.startDate,
      endDate: filters.endDate
    }
  });

  return await response.json();
};
\`\`\``,
      codeExamples: [
        {
          id: "team-management-workflow",
          title: "Team Management Workflow",
          description: "Complete workflow for managing team members",
          language: "typescript",
          code: `class TeamManager {
  async addTeamMember(companyId: string, memberData: TeamMemberRequest) {
    // Validate permissions
    await this.validateAdminAccess(companyId);

    // Check team size limits
    await this.checkTeamSizeLimit(companyId);

    // Create invitation
    const invitation = await this.createInvitation(companyId, memberData);

    // Send invitation email
    await this.sendInvitationEmail(invitation);

    // Log activity
    await this.logTeamActivity(companyId, 'member_invited', {
      invitedEmail: memberData.email,
      invitedRole: memberData.role
    });

    return invitation;
  }

  async updateMemberPermissions(companyId: string, memberId: string, permissions: string[]) {
    // Validate permissions
    await this.validateAdminAccess(companyId);

    // Update member permissions
    const updatedMember = await db.companyMember.update({
      where: { id: memberId },
      data: { permissions }
    });

    // Log permission change
    await this.logTeamActivity(companyId, 'permissions_updated', {
      memberId,
      newPermissions: permissions
    });

    return updatedMember;
  }

  private async validateAdminAccess(companyId: string) {
    const member = await this.getCurrentMember(companyId);
    if (member.role !== 'admin') {
      throw new Error('Admin access required');
    }
  }
}`
        }
      ]
    },
    {
      id: "subscription-billing",
      title: "Subscription & Billing",
      content: `Comprehensive subscription management with flexible billing, feature access control, and usage tracking.

### Subscription Tiers

#### Free Tier
- Up to 3 active job postings
- Basic company profile
- Standard support
- Limited analytics

#### Starter Tier ($29/month)
- Up to 10 active job postings
- Enhanced company profile
- Email support
- Basic analytics
- Company verification

#### Professional Tier ($99/month)
- Up to 50 active job postings
- Premium company profile
- Priority support
- Advanced analytics
- Featured job postings
- API access

#### Enterprise Tier (Custom)
- Unlimited job postings
- White-label solution
- Dedicated support
- Custom integrations
- Advanced analytics
- Bulk operations

### Billing Management

#### Subscription Management
\`\`\`javascript
const updateSubscription = async (companyId, newTier) => {
  const response = await fetch(\`/api/companies/\${companyId}/subscription\`, {
    method: 'PUT',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tier: newTier.tier,
      billingCycle: newTier.billingCycle, // monthly, yearly
      paymentMethod: newTier.paymentMethod
    })
  });

  return await response.json();
};
\`\`\`

#### Billing Information
\`\`\`javascript
const updateBillingInfo = async (companyId, billingData) => {
  const response = await fetch(\`/api/companies/\${companyId}/billing\`, {
    method: 'PUT',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      address: billingData.address,
      taxId: billingData.taxId,
      paymentMethod: {
        type: 'card',
        cardToken: billingData.cardToken
      }
    })
  });

  return await response.json();
};
\`\`\`

### Usage Tracking

\`\`\`javascript
const getUsageStats = async (companyId, period) => {
  const response = await fetch(\`/api/companies/\${companyId}/usage\`, {
    headers: {
      'Authorization': \`Bearer \${token}\`
    },
    params: {
      period: period // current, last_month, last_quarter
    }
  });

  return await response.json();
};

// Returns:
// - Active jobs count
// - Total applications received
// - Profile views
// - API calls made
// - Storage used
\`\`\`

### Billing History

\`\`\`javascript
const getBillingHistory = async (companyId, filters) => {
  const response = await fetch(\`/api/companies/\${companyId}/billing/history\`, {
    headers: {
      'Authorization': \`Bearer \${token}\`
    },
    params: {
      startDate: filters.startDate,
      endDate: filters.endDate,
      status: filters.status // paid, pending, failed
    }
  });

  return await response.json();
};
\`\`\`

### Subscription Features

#### Feature Access Control
\`\`\`javascript
const checkFeatureAccess = async (companyId, feature) => {
  const subscription = await getCompanySubscription(companyId);

  const featureLimits = {
    'job_posting': {
      free: 3,
      starter: 10,
      professional: 50,
      enterprise: -1 // unlimited
    },
    'analytics': {
      free: 'basic',
      starter: 'basic',
      professional: 'advanced',
      enterprise: 'enterprise'
    }
  };

  return subscription.tier >= featureLimits[feature][subscription.tier];
};
\`\`\`

#### Upgrade/Downgrade
\`\`\`javascript
const changeSubscriptionTier = async (companyId, newTier, effectiveDate) => {
  const response = await fetch(\`/api/companies/\${companyId}/subscription/change\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      newTier,
      effectiveDate,
      proration: true
    })
  });

  return await response.json();
};
\`\`\`

### Billing Webhooks

Handle billing events for automation:

\`\`\`javascript
// Webhook handler for billing events
app.post('/webhooks/billing', (req, res) => {
  const event = req.body;

  switch (event.type) {
    case 'invoice.payment_succeeded':
      handlePaymentSuccess(event.data);
      break;
    case 'invoice.payment_failed':
      handlePaymentFailure(event.data);
      break;
    case 'subscription.updated':
      handleSubscriptionUpdate(event.data);
      break;
    case 'subscription.canceled':
      handleSubscriptionCancel(event.data);
      break;
  }

  res.status(200).send('OK');
});
\`\`\``,
      lists: [
        {
          type: "ordered",
          items: [
            "Subscriptions auto-renew unless canceled",
            "Proration applies for mid-cycle changes",
            "Failed payments trigger grace periods",
            "Enterprise contracts require manual processing"
          ]
        }
      ]
    },
    {
      id: "company-endpoints",
      title: "Company Management Endpoints",
      content: `Complete API reference for company management operations.

### Company CRUD Operations

#### POST /companies
Create a new company.

#### GET /companies/{id}
Get company details.

#### PUT /companies/{id}
Update company information.

#### DELETE /companies/{id}
Delete company (Admin only).

#### GET /companies
List companies with filtering.

### Profile Management

#### GET /companies/{id}/profile
Get company profile.

#### PUT /companies/{id}/profile
Update company profile.

#### POST /companies/{id}/logo
Upload company logo.

#### POST /companies/{id}/banner
Upload company banner.

### Verification

#### POST /companies/{id}/verification
Submit verification request.

#### GET /companies/{id}/verification
Get verification status.

#### GET /companies/verification/requirements
Get verification requirements.

### Team Management

#### GET /companies/{id}/members
List company members.

#### POST /companies/{id}/members
Invite team member.

#### PUT /companies/{id}/members/{memberId}
Update member role/permissions.

#### DELETE /companies/{id}/members/{memberId}
Remove team member.

#### POST /companies/{id}/members/bulk
Bulk team operations.

### Subscription & Billing

#### GET /companies/{id}/subscription
Get subscription details.

#### PUT /companies/{id}/subscription
Update subscription.

#### GET /companies/{id}/billing
Get billing information.

#### PUT /companies/{id}/billing
Update billing information.

#### GET /companies/{id}/billing/history
Get billing history.

#### GET /companies/{id}/usage
Get usage statistics.

### Analytics

#### GET /companies/{id}/analytics
Get company analytics.

#### GET /companies/{id}/activity
Get team activity logs.

### Administrative

#### GET /admin/companies
Admin company search.

#### POST /admin/companies/{id}/verify
Manually verify company.

#### POST /admin/companies/{id}/suspend
Suspend company account.

### Response Examples

#### Company Creation Response
\`\`\`json
{
  "success": true,
  "data": {
    "id": "company-uuid",
    "name": "TechCorp Inc.",
    "slug": "techcorp-inc",
    "verificationStatus": "unverified",
    "subscriptionTier": "free",
    "createdAt": "2025-01-15T10:00:00Z"
  }
}
\`\`\`

#### Team Member Invitation Response
\`\`\`json
{
  "success": true,
  "data": {
    "invitationId": "invitation-uuid",
    "email": "user@company.com",
    "role": "recruiter",
    "status": "pending",
    "expiresAt": "2025-01-22T10:00:00Z"
  }
}
\`\`\`

#### Error Response
\`\`\`json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Company validation failed",
    "details": {
      "name": "Company name already exists"
    }
  }
}
\`\`\``,
      lists: [
        {
          type: "unordered",
          items: [
            "Company creation requires employer role",
            "Administrative endpoints require admin role",
            "File uploads use multipart/form-data",
            "Bulk operations limited to 100 items per request"
          ]
        }
      ]
    }
  ],
  nextSteps: {
    title: "Next Steps",
    links: [
      {
        text: "Application Management API",
        href: "/docs/backend-api/application-management",
        description: "Learn about job application handling and candidate management"
      },
      {
        text: "Job Management API",
        href: "/docs/backend-api/job-management",
        description: "Create and manage job postings"
      },
      {
        text: "Analytics API",
        href: "/docs/backend-api/analytics",
        description: "Track company performance and engagement"
      }
    ]
  },
  relatedResources: [
    {
      text: "Authentication Guide",
      href: "/docs/backend-api/authentication",
      description: "Secure access to company management endpoints"
    },
    {
      text: "Subscription Plans",
      href: "/docs/business/subscription-plans",
      description: "Detailed subscription tier information"
    },
    {
      text: "Verification Process",
      href: "/docs/legal/verification",
      description: "Company verification requirements and process"
    }
  ]
}