// Backend API Job Management Content
import { PageContent } from '@/lib/content-types'

export const backendApiJobManagementContent: PageContent = {
  metadata: {
    title: "Job Management API",
    description: "Complete guide to job posting, editing, management, and lifecycle operations",
    version: "1.0.0",
    lastUpdated: "2025-12-28",
    authors: ["Backend Engineering Team"],
    tags: ["api", "jobs", "posting", "management", "crud"],
    difficulty: "intermediate",
    estimatedTime: 20
  },
  tableOfContents: [
    { id: "job-overview", title: "Job Management Overview", level: 1 },
    { id: "job-model", title: "Job Data Model", level: 1 },
    { id: "job-creation", title: "Job Creation & Posting", level: 1 },
    { id: "job-updates", title: "Job Updates & Editing", level: 1 },
    { id: "job-lifecycle", title: "Job Lifecycle Management", level: 1 },
    { id: "job-search", title: "Job Search & Discovery", level: 1 },
    { id: "job-analytics", title: "Job Analytics", level: 1 },
    { id: "bulk-operations", title: "Bulk Operations", level: 1 },
    { id: "job-endpoints", title: "Job Management Endpoints", level: 1 }
  ],
  introduction: {
    id: "introduction",
    title: "Job Management API",
    content: `The Job Management API provides comprehensive functionality for creating, managing, and optimizing job postings. From initial creation to analytics and lifecycle management, this API handles all aspects of job management for employers while providing powerful search capabilities for job seekers.`
  },
  sections: [
    {
      id: "job-overview",
      title: "Job Management Overview",
      content: `CareerForge's job management system is designed to handle the complete lifecycle of job postings, from creation to fulfillment. The API supports various job types, complex filtering, analytics, and bulk operations.

### Key Features

- **Multi-format Job Postings**: Support for different job types and formats
- **Advanced Search**: Powerful filtering and search capabilities
- **Lifecycle Management**: Complete job posting lifecycle
- **Analytics Integration**: Detailed job performance metrics
- **Bulk Operations**: Efficient management of multiple jobs
- **SEO Optimization**: Search engine friendly job descriptions

### Job Types Supported

- **Full-time**: Traditional permanent positions
- **Part-time**: Flexible part-time roles
- **Contract**: Fixed-term contract positions
- **Freelance**: Project-based freelance work
- **Internship**: Entry-level training positions
- **Temporary**: Short-term temporary roles

### Job Status Lifecycle

\`\`\`mermaid
stateDiagram-v2
    [*] --> draft: Create Job
    draft --> review: Submit for Review
    review --> active: Approve
    review --> rejected: Reject
    active --> paused: Pause
    paused --> active: Resume
    active --> filled: Mark Filled
    active --> expired: Auto-expire
    filled --> [*]
    expired --> [*]
    rejected --> [*]
\`\`\``,
      calloutBoxes: [
        {
          type: "info",
          title: "Job Posting Limits",
          content: "Employers have posting limits based on their subscription tier. Premium tiers offer unlimited postings."
        }
      ]
    },
    {
      id: "job-model",
      title: "Job Data Model",
      content: `The job data model supports comprehensive job information with flexible structures for different job types and requirements.

### Core Job Fields

\`\`\`typescript
interface Job {
  id: string;                    // UUID primary key
  title: string;                 // Job title
  description: string;           // Full job description (HTML/markdown)
  shortDescription?: string;     // Brief description for listings
  companyId: string;             // Reference to company
  employerId: string;            // Reference to posting user
  jobType: JobType;              // full-time, part-time, contract, etc.
  workType: WorkType;            // remote, hybrid, on-site
  experienceLevel: ExperienceLevel; // entry, mid, senior, executive
  status: JobStatus;             // draft, active, paused, filled, expired

  // Location Information
  location: JobLocation;         // Location details
  isRemote: boolean;             // Remote work allowed

  // Compensation
  salary: SalaryInfo;            // Salary range and details

  // Requirements
  requirements: string[];        // Required skills/experience
  responsibilities: string[];    // Key responsibilities
  benefits: string[];            // Job benefits

  // Application Settings
  applicationDeadline?: Date;    // Application deadline
  applicationMethod: ApplicationMethod; // how to apply
  applicationUrl?: string;       // External application URL

  // Metadata
  department?: string;           // Company department
  industry: string;              // Industry classification
  tags: string[];                // Search tags
  featured: boolean;             // Featured job status

  // Timestamps
  createdAt: Date;               // Creation timestamp
  updatedAt: Date;               // Last update timestamp
  publishedAt?: Date;            // Publication timestamp
  expiresAt?: Date;              // Expiration date
}
\`\`\`

### Supporting Types

\`\`\`typescript
type JobType = 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship' | 'temporary';
type WorkType = 'remote' | 'hybrid' | 'on-site';
type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'executive';
type JobStatus = 'draft' | 'review' | 'active' | 'paused' | 'filled' | 'expired' | 'rejected';

interface JobLocation {
  city?: string;
  state?: string;
  country: string;
  postalCode?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

interface SalaryInfo {
  min?: number;
  max?: number;
  currency: string;
  period: 'hourly' | 'monthly' | 'yearly';
  negotiable: boolean;
  showSalary: boolean; // Whether to display salary publicly
}

type ApplicationMethod = 'platform' | 'external' | 'email';
\`\`\`

### Job Validation Rules

- **Title**: 5-100 characters
- **Description**: 50-10,000 characters
- **Requirements**: 1-20 items, each 10-500 characters
- **Benefits**: 0-20 items, each 5-200 characters
- **Tags**: 0-10 tags, each 2-50 characters
- **Salary**: Optional, but if provided must be reasonable ranges`,
      codeExamples: [
        {
          id: "job-creation-validation",
          title: "Job Creation with Validation",
          description: "Creating a job posting with comprehensive validation",
          language: "typescript",
          code: `const createJob = async (jobData: CreateJobRequest): Promise<Job> => {
  // Validate job data
  const validatedData = await validateJobData(jobData);

  // Check employer permissions
  const employer = await getEmployerById(jobData.employerId);
  if (!employer.canPostJobs) {
    throw new Error('Employer does not have permission to post jobs');
  }

  // Check posting limits
  const activeJobsCount = await getActiveJobsCount(employer.id);
  if (activeJobsCount >= employer.jobLimit) {
    throw new Error('Job posting limit exceeded');
  }

  // Create job record
  const job = await db.job.create({
    data: {
      title: validatedData.title,
      description: validatedData.description,
      companyId: validatedData.companyId,
      employerId: validatedData.employerId,
      jobType: validatedData.jobType,
      workType: validatedData.workType,
      experienceLevel: validatedData.experienceLevel,
      status: 'draft', // Start as draft
      location: validatedData.location,
      isRemote: validatedData.isRemote,
      salary: validatedData.salary,
      requirements: validatedData.requirements,
      responsibilities: validatedData.responsibilities,
      benefits: validatedData.benefits,
      applicationMethod: validatedData.applicationMethod,
      department: validatedData.department,
      industry: validatedData.industry,
      tags: validatedData.tags,
      expiresAt: calculateExpirationDate(validatedData.jobType)
    }
  });

  // Index for search
  await indexJobForSearch(job);

  // Send notifications
  await notifyTeamOfNewJob(job);

  return job;
};`
        }
      ]
    },
    {
      id: "job-creation",
      title: "Job Creation & Posting",
      content: `Step-by-step process for creating and publishing job postings with validation and optimization.

### Job Creation Process

1. **Draft Creation**: Initial job data entry
2. **Validation**: Comprehensive data validation
3. **SEO Optimization**: Automatic optimization suggestions
4. **Review Process**: Optional review for quality assurance
5. **Publication**: Make job visible to candidates
6. **Indexing**: Add to search indexes

### Job Creation API

#### Basic Job Creation
\`\`\`javascript
const createJob = async (jobData) => {
  const response = await fetch('/api/jobs', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: 'Senior Software Engineer',
      description: 'We are looking for a senior software engineer...',
      companyId: 'company-uuid',
      jobType: 'full-time',
      workType: 'hybrid',
      experienceLevel: 'senior',
      location: {
        city: 'San Francisco',
        state: 'CA',
        country: 'US'
      },
      salary: {
        min: 120000,
        max: 160000,
        currency: 'USD',
        period: 'yearly',
        negotiable: true
      },
      requirements: [
        '5+ years of software development experience',
        'Strong knowledge of React and Node.js',
        'Experience with cloud platforms (AWS/Azure/GCP)'
      ],
      benefits: [
        'Health insurance',
        '401k matching',
        'Flexible work hours'
      ],
      tags: ['react', 'nodejs', 'aws']
    })
  });

  return await response.json();
};
\`\`\`

### Advanced Job Creation

#### Job with Custom Application Process
\`\`\`javascript
const createJobWithCustomApplication = async (jobData) => {
  const response = await fetch('/api/jobs', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ...jobData,
      applicationMethod: 'external',
      applicationUrl: 'https://company.com/careers/apply/123',
      applicationDeadline: '2025-02-28T23:59:59Z'
    })
  });

  return await response.json();
};
\`\`\`

### Job Templates

Pre-built templates for common job types:

\`\`\`javascript
const createJobFromTemplate = async (templateId, customizations) => {
  const response = await fetch('/api/jobs/templates', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      templateId,
      customizations: {
        title: customizations.title,
        location: customizations.location,
        salary: customizations.salary
      }
    })
  });

  return await response.json();
};
\`\`\`

### Job Validation & Optimization

#### Automatic Validation
- Required field checks
- Data format validation
- Business rule enforcement
- Duplicate detection

#### SEO Optimization Suggestions
- Keyword analysis
- Description length optimization
- Title clarity improvements
- Tag recommendations`,
      calloutBoxes: [
        {
          type: "success",
          title: "Job Templates",
          content: "Using job templates can speed up posting by 60% and ensure consistent quality across postings."
        }
      ]
    },
    {
      id: "job-updates",
      title: "Job Updates & Editing",
      content: `Comprehensive job editing capabilities with change tracking and approval workflows.

### Job Update Types

#### Content Updates
- Title and description changes
- Requirements and responsibilities updates
- Salary adjustments
- Location changes

#### Status Updates
- Publishing draft jobs
- Pausing active jobs
- Marking jobs as filled
- Extending expiration dates

#### Administrative Updates
- Featured job status
- Priority boosting
- Content moderation

### Update Validation

\`\`\`javascript
const updateJob = async (jobId, updates) => {
  // Validate update permissions
  const job = await getJobById(jobId);
  const canEdit = await checkEditPermissions(job, currentUser);

  if (!canEdit) {
    throw new Error('Insufficient permissions to edit job');
  }

  // Validate update data
  const validatedUpdates = validateJobUpdates(updates, job);

  // Check for significant changes that require re-approval
  const requiresReApproval = checkIfRequiresReApproval(job, validatedUpdates);

  // Apply updates
  const updatedJob = await db.job.update({
    where: { id: jobId },
    data: {
      ...validatedUpdates,
      status: requiresReApproval ? 'review' : job.status,
      updatedAt: new Date()
    }
  });

  // Re-index if content changed
  if (hasContentChanges(validatedUpdates)) {
    await reindexJob(updatedJob);
  }

  // Notify relevant parties
  await notifyJobUpdate(updatedJob, updates);

  return updatedJob;
};
\`\`\`

### Partial Updates

Update specific fields without replacing entire job:

\`\`\`javascript
const updateJobField = async (jobId, field, value) => {
  const response = await fetch(\`/api/jobs/\${jobId}\`, {
    method: 'PATCH',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      [field]: value
    })
  });

  return await response.json();
};

// Example: Update salary
await updateJobField('job-uuid', 'salary', {
  min: 130000,
  max: 170000,
  currency: 'USD'
});
\`\`\`

### Change History

Track all job changes for audit and rollback:

\`\`\`javascript
const getJobChangeHistory = async (jobId) => {
  const response = await fetch(\`/api/jobs/\${jobId}/history\`, {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });

  return await response.json();
};
\`\`\`

### Update Restrictions

- **Active Jobs**: Limited changes to prevent candidate confusion
- **Filled Jobs**: No content changes allowed
- **Expired Jobs**: Can only be republished with updates
- **Under Review**: Updates move back to draft status`,
      lists: [
        {
          type: "unordered",
          items: [
            "Job updates are tracked for audit purposes",
            "Significant changes may require re-approval",
            "Active job updates notify existing applicants",
            "Salary increases are highlighted to candidates"
          ]
        }
      ]
    },
    {
      id: "job-lifecycle",
      title: "Job Lifecycle Management",
      content: `Complete job lifecycle management from creation to completion with automated processes and notifications.

### Job Status Transitions

#### Draft → Review
\`\`\`javascript
const submitForReview = async (jobId) => {
  const response = await fetch(\`/api/jobs/\${jobId}/submit\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });

  return await response.json();
};
\`\`\`

#### Review → Active
\`\`\`javascript
const publishJob = async (jobId) => {
  const response = await fetch(\`/api/jobs/\${jobId}/publish\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });

  return await response.json();
};
\`\`\`

#### Active → Paused
\`\`\`javascript
const pauseJob = async (jobId, reason) => {
  const response = await fetch(\`/api/jobs/\${jobId}/pause\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ reason })
  });

  return await response.json();
};
\`\`\`

#### Active → Filled
\`\`\`javascript
const markJobFilled = async (jobId, hiredCandidateId) => {
  const response = await fetch(\`/api/jobs/\${jobId}/fill\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      hiredCandidateId,
      filledAt: new Date().toISOString()
    })
  });

  return await response.json();
};
\`\`\`

### Automated Lifecycle Events

#### Expiration Handling
\`\`\`javascript
const handleJobExpiration = async (jobId) => {
  const job = await getJobById(jobId);

  // Update status
  await db.job.update({
    where: { id: jobId },
    data: { status: 'expired' }
  });

  // Notify employer
  await sendJobExpiredNotification(job);

  // Archive applications
  await archiveJobApplications(jobId);
};
\`\`\`

#### Auto-renewal
\`\`\`javascript
const autoRenewJob = async (jobId) => {
  const job = await getJobById(jobId);

  if (job.autoRenew && job.employer.subscriptionAllowsAutoRenew) {
    const newExpirationDate = new Date();
    newExpirationDate.setDate(newExpirationDate.getDate() + 30);

    await db.job.update({
      where: { id: jobId },
      data: {
        expiresAt: newExpirationDate,
        renewedAt: new Date()
      }
    });

    await sendJobRenewedNotification(job);
  }
};
\`\`\`

### Lifecycle Notifications

- **Job Published**: Notify team and trigger social sharing
- **Applications Received**: Daily/weekly application summaries
- **Expiration Warning**: 7 days, 3 days, 1 day notices
- **Auto-renewal**: Confirmation of renewal
- **Filled**: Congratulatory messages and next steps`,
      codeExamples: [
        {
          id: "lifecycle-automation",
          title: "Job Lifecycle Automation",
          description: "Automated job lifecycle management",
          language: "typescript",
          code: `class JobLifecycleManager {
  async processJobExpiration(jobId: string) {
    const job = await this.getJob(jobId);

    // Update status
    await this.updateJobStatus(jobId, 'expired');

    // Notify stakeholders
    await this.notifyEmployer(job, 'expired');
    await this.notifyApplicants(job, 'expired');

    // Archive data
    await this.archiveJobData(jobId);

    // Update analytics
    await this.updateJobAnalytics(jobId, { expired: true });
  }

  async processAutoRenewal(jobId: string) {
    const job = await this.getJob(jobId);

    if (this.shouldAutoRenew(job)) {
      const newExpiry = this.calculateNewExpiry(job);

      await this.updateJobExpiry(jobId, newExpiry);
      await this.notifyEmployer(job, 'renewed');
      await this.logRenewalEvent(jobId);
    }
  }

  private shouldAutoRenew(job: Job): boolean {
    return job.autoRenew &&
           job.employer.subscriptionTier === 'premium' &&
           job.status === 'active';
  }

  private calculateNewExpiry(job: Job): Date {
    const renewalPeriod = job.renewalPeriod || 30; // days
    return new Date(Date.now() + renewalPeriod * 24 * 60 * 60 * 1000);
  }
}`
        }
      ]
    },
    {
      id: "job-search",
      title: "Job Search & Discovery",
      content: `Powerful job search and discovery capabilities with advanced filtering, sorting, and relevance ranking.

### Search Parameters

#### Basic Search
\`\`\`javascript
const searchJobs = async (query, filters = {}) => {
  const searchParams = new URLSearchParams({
    q: query,
    location: filters.location || '',
    jobType: filters.jobType || '',
    experienceLevel: filters.experienceLevel || '',
    salaryMin: filters.salaryMin || '',
    salaryMax: filters.salaryMax || '',
    remote: filters.remote || '',
    page: filters.page || 1,
    limit: filters.limit || 20,
    sort: filters.sort || 'relevance'
  });

  const response = await fetch(\`/api/jobs/search?\${searchParams}\`);
  return await response.json();
};

// Example usage
const jobs = await searchJobs('software engineer', {
  location: 'San Francisco',
  jobType: 'full-time',
  experienceLevel: 'senior',
  remote: true,
  sort: 'date'
});
\`\`\`

#### Advanced Filtering
\`\`\`javascript
const advancedSearch = async (criteria) => {
  const response = await fetch('/api/jobs/search/advanced', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: criteria.query,
      filters: {
        location: {
          city: criteria.city,
          state: criteria.state,
          country: criteria.country,
          radius: criteria.radius // km
        },
        salary: {
          min: criteria.salaryMin,
          max: criteria.salaryMax,
          currency: criteria.currency
        },
        company: criteria.companyIds,
        industry: criteria.industries,
        benefits: criteria.requiredBenefits,
        skills: criteria.requiredSkills
      },
      sort: {
        field: criteria.sortField || 'relevance',
        order: criteria.sortOrder || 'desc'
      },
      pagination: {
        page: criteria.page || 1,
        limit: criteria.limit || 20
      }
    })
  });

  return await response.json();
};
\`\`\`

### Search Results

#### Response Structure
\`\`\`json
{
  "success": true,
  "data": {
    "jobs": [
      {
        "id": "job-uuid",
        "title": "Senior Software Engineer",
        "company": {
          "name": "Tech Corp",
          "logo": "https://..."
        },
        "location": "San Francisco, CA",
        "salary": "$120k - $160k",
        "postedAt": "2025-01-15T10:00:00Z",
        "isRemote": true,
        "tags": ["react", "nodejs"],
        "relevanceScore": 0.95
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    },
    "facets": {
      "jobTypes": [
        { "value": "full-time", "count": 120 },
        { "value": "contract", "count": 30 }
      ],
      "locations": [
        { "value": "San Francisco", "count": 45 },
        { "value": "New York", "count": 32 }
      ]
    }
  }
}
\`\`\`

### Search Features

#### Relevance Ranking
- Text match quality
- Recency of posting
- Company reputation
- Salary competitiveness
- User preferences

#### Faceted Search
- Job type distribution
- Location breakdown
- Salary ranges
- Company sizes
- Industry categories

#### Saved Searches
\`\`\`javascript
const saveSearch = async (name, criteria) => {
  const response = await fetch('/api/searches', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name,
      criteria,
      notifications: true
    })
  });

  return await response.json();
};
\`\`\`

#### Search Alerts
\`\`\`javascript
const createSearchAlert = async (searchId, frequency) => {
  const response = await fetch(\`/api/searches/\${searchId}/alerts\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      frequency: 'daily', // daily, weekly, instant
      enabled: true
    })
  });

  return await response.json();
};
\`\`\``,
      calloutBoxes: [
        {
          type: "info",
          title: "Search Performance",
          content: "Job search queries are optimized for sub-100ms response times with advanced caching and indexing."
        }
      ]
    },
    {
      id: "job-analytics",
      title: "Job Analytics",
      content: `Comprehensive analytics for job performance tracking and optimization.

### Job Performance Metrics

#### View Analytics
\`\`\`javascript
const getJobAnalytics = async (jobId, dateRange) => {
  const response = await fetch(\`/api/jobs/\${jobId}/analytics\`, {
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

// Response includes:
{
  "views": {
    "total": 1250,
    "unique": 980,
    "trend": "increasing"
  },
  "applications": {
    "total": 45,
    "conversionRate": 3.6,
    "qualityScore": 8.2
  },
  "demographics": {
    "locations": ["SF: 40%", "NY: 25%", "LA: 15%"],
    "experienceLevels": ["senior: 60%", "mid: 30%", "entry: 10%"],
    "sources": ["organic: 70%", "referral: 20%", "paid: 10%"]
  }
}
\`\`\`

#### Application Analytics
\`\`\`javascript
const getApplicationAnalytics = async (jobId) => {
  const response = await fetch(\`/api/jobs/\${jobId}/applications/analytics\`, {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });

  return await response.json();
};
\`\`\`

### Conversion Funnel

Track candidate journey from view to hire:

\`\`\`javascript
const getConversionFunnel = async (jobId) => {
  // Views → Clicks → Applications → Interviews → Offers → Hires
  const funnel = {
    views: 1250,
    clicks: 380,        // 30.4% click-through rate
    applications: 45,   // 11.8% application rate
    interviews: 12,     // 26.7% interview rate
    offers: 3,          // 25% offer rate
    hires: 2            // 66.7% acceptance rate
  };

  return funnel;
};
\`\`\`

### A/B Testing

Test different job descriptions and see what performs better:

\`\`\`javascript
const createJobVariant = async (jobId, variantData) => {
  const response = await fetch(\`/api/jobs/\${jobId}/variants\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: variantData.title,
      description: variantData.description,
      trafficPercentage: 25 // 25% of traffic to this variant
    })
  });

  return await response.json();
};
\`\`\`

### Performance Insights

AI-powered recommendations for job optimization:

\`\`\`javascript
const getJobInsights = async (jobId) => {
  const response = await fetch(\`/api/jobs/\${jobId}/insights\`, {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });

  return await response.json();
};

// Insights include:
// - Optimal posting time
// - Salary competitiveness
// - Description improvements
// - Target audience suggestions
\`\`\``,
      lists: [
        {
          type: "ordered",
          items: [
            "Analytics data is updated in real-time",
            "Historical data is retained for trend analysis",
            "Privacy-compliant tracking without personal data collection",
            "Benchmarking against industry averages"
          ]
        }
      ]
    },
    {
      id: "bulk-operations",
      title: "Bulk Operations",
      content: `Efficient management of multiple jobs through bulk operations.

### Bulk Job Creation

\`\`\`javascript
const createBulkJobs = async (jobsData) => {
  const response = await fetch('/api/jobs/bulk', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jobs: jobsData,
      options: {
        validateOnly: false,
        continueOnError: true,
        sendNotifications: true
      }
    })
  });

  return await response.json();
};
\`\`\`

### Bulk Updates

\`\`\`javascript
const updateBulkJobs = async (jobIds, updates) => {
  const response = await fetch('/api/jobs/bulk/update', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jobIds,
      updates: {
        status: 'paused',
        reason: 'Company hiring freeze'
      }
    })
  });

  return await response.json();
};
\`\`\`

### Bulk Status Changes

\`\`\`javascript
const bulkChangeStatus = async (jobIds, newStatus, reason) => {
  const response = await fetch('/api/jobs/bulk/status', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jobIds,
      status: newStatus,
      reason
    })
  });

  return await response.json();
};
\`\`\`

### Bulk Export

\`\`\`javascript
const exportJobs = async (filters) => {
  const response = await fetch('/api/jobs/export', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      filters,
      format: 'csv', // csv, json, xlsx
      includeAnalytics: true
    })
  });

  if (response.ok) {
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jobs-export.csv';
    a.click();
  }
};
\`\`\`

### Bulk Import

\`\`\`javascript
const importJobs = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('format', 'csv');
  formData.append('options', JSON.stringify({
    validateData: true,
    createDrafts: true,
    skipDuplicates: true
  }));

  const response = await fetch('/api/jobs/import', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`
    },
    body: formData
  });

  return await response.json();
};
\`\`\`

### Operation Tracking

All bulk operations return tracking information:

\`\`\`json
{
  "operationId": "bulk-op-uuid",
  "status": "processing",
  "progress": {
    "total": 100,
    "completed": 45,
    "failed": 2
  },
  "results": [...],
  "errors": [...]
}
\`\`\`

Monitor operation progress:

\`\`\`javascript
const checkBulkOperationStatus = async (operationId) => {
  const response = await fetch(\`/api/bulk-operations/\${operationId}\`, {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });

  return await response.json();
};
\`\`\``,
      calloutBoxes: [
        {
          type: "warning",
          title: "Bulk Operation Limits",
          content: "Bulk operations are limited to 1000 items per request. For larger operations, use pagination or contact support."
        }
      ]
    },
    {
      id: "job-endpoints",
      title: "Job Management Endpoints",
      content: `Complete API reference for job management operations.

### Job CRUD Operations

#### POST /jobs
Create a new job posting.

#### GET /jobs/{id}
Get job details by ID.

#### PUT /jobs/{id}
Update job posting.

#### DELETE /jobs/{id}
Delete job posting.

#### GET /jobs
List jobs with filtering and pagination.

### Job Lifecycle

#### POST /jobs/{id}/publish
Publish a draft job.

#### POST /jobs/{id}/pause
Pause an active job.

#### POST /jobs/{id}/resume
Resume a paused job.

#### POST /jobs/{id}/fill
Mark job as filled.

#### POST /jobs/{id}/expire
Manually expire a job.

### Job Search

#### GET /jobs/search
Search jobs with filters.

#### POST /jobs/search/advanced
Advanced search with complex criteria.

#### GET /jobs/{id}/similar
Find similar jobs.

### Analytics

#### GET /jobs/{id}/analytics
Get job performance analytics.

#### GET /jobs/{id}/applications/analytics
Get application analytics.

#### GET /jobs/{id}/insights
Get AI-powered optimization insights.

### Bulk Operations

#### POST /jobs/bulk
Create multiple jobs.

#### POST /jobs/bulk/update
Update multiple jobs.

#### POST /jobs/bulk/status
Change status of multiple jobs.

#### POST /jobs/import
Import jobs from file.

#### GET /jobs/export
Export jobs to file.

### Administrative

#### GET /admin/jobs
Admin job search and management.

#### POST /admin/jobs/{id}/feature
Feature a job posting.

#### POST /admin/jobs/{id}/moderate
Moderate job content.

### Response Examples

#### Job Creation Response
\`\`\`json
{
  "success": true,
  "data": {
    "id": "job-uuid",
    "title": "Senior Software Engineer",
    "status": "draft",
    "createdAt": "2025-01-15T10:00:00Z",
    "expiresAt": "2025-02-15T10:00:00Z"
  }
}
\`\`\`

#### Job Search Response
\`\`\`json
{
  "success": true,
  "data": {
    "jobs": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150
    },
    "facets": {...}
  }
}
\`\`\`

#### Error Response
\`\`\`json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Job validation failed",
    "details": {
      "title": "Title must be between 5 and 100 characters"
    }
  }
}
\`\`\``,
      lists: [
        {
          type: "unordered",
          items: [
            "All job endpoints require authentication",
            "Employer endpoints require employer role",
            "Admin endpoints require admin role",
            "Bulk operations support async processing",
            "Search endpoints are publicly accessible"
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
        text: "Search & Filtering API",
        href: "/docs/backend-api/search-filtering",
        description: "Advanced search capabilities and filtering options"
      },
      {
        text: "Analytics API",
        href: "/docs/backend-api/analytics",
        description: "Comprehensive analytics and reporting"
      }
    ]
  },
  relatedResources: [
    {
      text: "Company Management API",
      href: "/docs/backend-api/company-management",
      description: "Company profile and management operations"
    },
    {
      text: "Authentication Guide",
      href: "/docs/backend-api/authentication",
      description: "Secure access to job management endpoints"
    },
    {
      text: "Rate Limiting",
      href: "/docs/backend-api/rate-limiting",
      description: "API usage limits and best practices"
    }
  ]
}