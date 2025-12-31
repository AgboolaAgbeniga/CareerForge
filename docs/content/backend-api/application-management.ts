// Backend API Application Management Content
import { PageContent } from '@/lib/content-types'

export const backendApiApplicationManagementContent: PageContent = {
  metadata: {
    title: "Application Management API",
    description: "Complete guide to job application handling, candidate management, and application lifecycle operations",
    version: "1.0.0",
    lastUpdated: "2025-12-28",
    authors: ["Backend Engineering Team"],
    tags: ["api", "applications", "candidates", "hiring", "management"],
    difficulty: "intermediate",
    estimatedTime: 16
  },
  tableOfContents: [
    { id: "application-overview", title: "Application Management Overview", level: 1 },
    { id: "application-model", title: "Application Data Model", level: 1 },
    { id: "application-submission", title: "Application Submission", level: 1 },
    { id: "application-review", title: "Application Review Process", level: 1 },
    { id: "candidate-management", title: "Candidate Management", level: 1 },
    { id: "communication", title: "Application Communication", level: 1 },
    { id: "bulk-operations", title: "Bulk Application Operations", level: 1 },
    { id: "application-endpoints", title: "Application Management Endpoints", level: 1 }
  ],
  introduction: {
    id: "introduction",
    title: "Application Management API",
    content: `The Application Management API provides comprehensive functionality for handling job applications, managing candidates, and streamlining the hiring process. This API supports the complete application lifecycle from submission to final decision, with features for both job seekers and employers.`
  },
  sections: [
    {
      id: "application-overview",
      title: "Application Management Overview",
      content: `CareerForge's application management system bridges the gap between job seekers and employers, providing a streamlined, efficient process for handling job applications. The API supports multiple application methods, comprehensive candidate tracking, and powerful management tools.

### Key Features

- **Multi-Channel Applications**: Support for platform and external applications
- **Application Tracking**: Complete visibility into application status and progress
- **Candidate Management**: Comprehensive candidate profiles and communication
- **Review Workflows**: Structured application review and decision processes
- **Communication Tools**: Built-in messaging and interview coordination
- **Analytics Integration**: Application metrics and hiring funnel analytics

### Application Lifecycle

\`\`\`mermaid
stateDiagram-v2
    [*] --> submitted: Application Submitted
    submitted --> under_review: Under Review
    under_review --> shortlisted: Shortlisted
    under_review --> rejected: Rejected
    shortlisted --> interviewed: Interview Scheduled
    interviewed --> offered: Offer Extended
    interviewed --> rejected: Rejected
    offered --> accepted: Offer Accepted
    offered --> declined: Offer Declined
    accepted --> hired: Candidate Hired
    hired --> [*]
    declined --> [*]
    rejected --> [*]
\`\`\`

### Application Methods

#### Platform Applications
- Full CareerForge integration
- Resume parsing and candidate matching
- Real-time application tracking
- Built-in communication tools

#### External Applications
- Link to external application systems
- Manual status synchronization
- Limited tracking capabilities
- Email-based communication

### Security & Privacy

- **Data Protection**: GDPR and CCPA compliance
- **Access Control**: Role-based application access
- **Audit Logging**: Complete application activity tracking
- **Data Retention**: Configurable data retention policies`,
      calloutBoxes: [
        {
          type: "info",
          title: "Application Limits",
          content: "Job seekers can apply to up to 3 jobs per day. Employers receive unlimited applications based on their subscription."
        }
      ]
    },
    {
      id: "application-model",
      title: "Application Data Model",
      content: `The application data model supports comprehensive application tracking with flexible structures for different application types and hiring processes.

### Core Application Fields

\`\`\`typescript
interface Application {
  id: string;                    // UUID primary key
  jobId: string;                 // Reference to job posting
  candidateId: string;           // Reference to applicant user
  employerId: string;            // Reference to employer user
  companyId: string;             // Reference to company

  // Application Content
  coverLetter?: string;          // Applicant's cover letter
  resumeUrl?: string;            // Resume file URL
  portfolioUrl?: string;         // Portfolio/website URL
  linkedinUrl?: string;          // LinkedIn profile URL
  customAnswers: CustomAnswer[]; // Answers to custom questions

  // Status & Progress
  status: ApplicationStatus;     // Current application status
  statusHistory: StatusChange[]; // Status change history
  priority: ApplicationPriority; // Application priority level

  // Review Information
  reviewerId?: string;           // Current reviewer
  reviewNotes?: string;          // Internal review notes
  rating?: number;               // Application rating (1-5)
  tags: string[];                // Application tags

  // Communication
  lastMessageAt?: Date;          // Last communication timestamp
  interviewScheduled: boolean;   // Interview scheduling status

  // Metadata
  submittedAt: Date;             // Application submission timestamp
  updatedAt: Date;               // Last update timestamp
  source: ApplicationSource;     // How application was submitted
  ipAddress?: string;            // Submission IP for fraud detection
}
\`\`\`

### Supporting Types

\`\`\`typescript
type ApplicationStatus =
  | 'submitted' | 'under_review' | 'shortlisted'
  | 'interviewed' | 'offered' | 'accepted' | 'hired'
  | 'rejected' | 'withdrawn';

type ApplicationPriority = 'low' | 'medium' | 'high' | 'urgent';
type ApplicationSource = 'platform' | 'external' | 'referral' | 'agency';

interface CustomAnswer {
  questionId: string;
  question: string;
  answer: string;
  type: 'text' | 'multiple_choice' | 'file_upload';
}

interface StatusChange {
  fromStatus: ApplicationStatus;
  toStatus: ApplicationStatus;
  changedBy: string;
  changedAt: Date;
  reason?: string;
  notes?: string;
}
\`\`\`

### Application Validation Rules

- **Duplicate Prevention**: One application per job per candidate
- **File Size Limits**: Resume files limited to 10MB
- **Required Fields**: Cover letter and resume for most applications
- **Spam Prevention**: Rate limiting and content filtering
- **Data Integrity**: All required relationships must exist`,
      codeExamples: [
        {
          id: "application-creation-validation",
          title: "Application Creation with Validation",
          description: "Creating a job application with comprehensive validation",
          language: "typescript",
          code: `const createApplication = async (applicationData: CreateApplicationRequest): Promise<Application> => {
  // Validate job exists and is active
  const job = await getJobById(applicationData.jobId);
  if (!job || job.status !== 'active') {
    throw new Error('Job not available for applications');
  }

  // Check for duplicate applications
  const existingApplication = await db.application.findFirst({
    where: {
      jobId: applicationData.jobId,
      candidateId: applicationData.candidateId
    }
  });

  if (existingApplication) {
    throw new Error('You have already applied to this job');
  }

  // Check application rate limits
  const todayApplications = await getUserApplicationsToday(applicationData.candidateId);
  if (todayApplications >= 3) {
    throw new Error('Daily application limit exceeded');
  }

  // Validate resume if provided
  if (applicationData.resumeUrl) {
    await validateResumeFile(applicationData.resumeUrl);
  }

  // Create application record
  const application = await db.application.create({
    data: {
      jobId: applicationData.jobId,
      candidateId: applicationData.candidateId,
      employerId: job.employerId,
      companyId: job.companyId,
      coverLetter: applicationData.coverLetter,
      resumeUrl: applicationData.resumeUrl,
      portfolioUrl: applicationData.portfolioUrl,
      linkedinUrl: applicationData.linkedinUrl,
      customAnswers: applicationData.customAnswers || [],
      status: 'submitted',
      priority: 'medium',
      tags: [],
      submittedAt: new Date(),
      source: applicationData.source || 'platform'
    }
  });

  // Create initial status history
  await createStatusHistory(application.id, null, 'submitted', applicationData.candidateId);

  // Notify employer
  await notifyEmployerOfNewApplication(application);

  // Update job application count
  await incrementJobApplicationCount(job.id);

  return application;
};`
        }
      ]
    },
    {
      id: "application-submission",
      title: "Application Submission",
      content: `Streamlined application submission process with multiple options and comprehensive validation.

### Platform Application Submission

#### Basic Application
\`\`\`javascript
const submitApplication = async (jobId, applicationData) => {
  const response = await fetch('/api/applications', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jobId,
      coverLetter: applicationData.coverLetter,
      resumeUrl: applicationData.resumeUrl,
      portfolioUrl: applicationData.portfolioUrl,
      linkedinUrl: applicationData.linkedinUrl,
      customAnswers: applicationData.customAnswers
    })
  });

  return await response.json();
};
\`\`\`

#### Quick Apply
\`\`\`javascript
const quickApply = async (jobId) => {
  const response = await fetch('/api/applications/quick-apply', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jobId,
      useExistingResume: true,
      useExistingProfile: true
    })
  });

  return await response.json();
};
\`\`\`

### External Application Handling

\`\`\`javascript
const submitExternalApplication = async (jobId, externalData) => {
  const response = await fetch('/api/applications/external', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jobId,
      externalApplicationUrl: externalData.applicationUrl,
      externalApplicationId: externalData.applicationId,
      submittedAt: externalData.submittedAt
    })
  });

  return await response.json();
};
\`\`\`

### Application Validation

#### Pre-submission Validation
\`\`\`javascript
const validateApplication = async (jobId, applicationData) => {
  const response = await fetch('/api/applications/validate', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      jobId,
      ...applicationData
    })
  });

  return await response.json();
};
\`\`\`

### File Upload Handling

#### Resume Upload
\`\`\`javascript
const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);

  const response = await fetch('/api/applications/upload-resume', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`
    },
    body: formData
  });

  const result = await response.json();

  if (result.success) {
    // Resume parsed and stored
    return {
      url: result.data.url,
      parsedData: result.data.parsedData
    };
  }

  throw new Error('Resume upload failed');
};
\`\`\`

### Application Limits & Throttling

- **Daily Limit**: 3 applications per user per day
- **Job Limit**: 1 application per job per user
- **File Size**: 10MB maximum for resume files
- **Rate Limiting**: 10 validation requests per minute`,
      calloutBoxes: [
        {
          type: "warning",
          title: "Application Deadlines",
          content: "Applications submitted after the job deadline may not be considered. Check job posting for deadline information."
        }
      ]
    },
    {
      id: "application-review",
      title: "Application Review Process",
      content: `Structured application review process with collaborative tools and decision tracking.

### Review Workflow

1. **Initial Screening**: Automated and manual filtering
2. **Detailed Review**: Comprehensive candidate evaluation
3. **Shortlisting**: Selection of top candidates
4. **Interview Scheduling**: Coordination of interview process
5. **Decision Making**: Final hiring decisions

### Review Status Management

#### Update Application Status
\`\`\`javascript
const updateApplicationStatus = async (applicationId, newStatus, notes) => {
  const response = await fetch(\`/api/applications/\${applicationId}/status\`, {
    method: 'PUT',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status: newStatus,
      notes,
      notifyCandidate: true
    })
  });

  return await response.json();
};
\`\`\`

#### Bulk Status Updates
\`\`\`javascript
const bulkUpdateStatuses = async (applicationIds, newStatus, reason) => {
  const response = await fetch('/api/applications/bulk/status', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      applicationIds,
      status: newStatus,
      reason,
      sendNotifications: true
    })
  });

  return await response.json();
};
\`\`\`

### Review Notes & Rating

\`\`\`javascript
const addReviewNotes = async (applicationId, reviewData) => {
  const response = await fetch(\`/api/applications/\${applicationId}/review\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      rating: reviewData.rating, // 1-5 stars
      notes: reviewData.notes,
      strengths: reviewData.strengths,
      concerns: reviewData.concerns,
      recommendation: reviewData.recommendation // 'reject', 'consider', 'strong_candidate'
    })
  });

  return await response.json();
};
\`\`\`

### Collaborative Review

#### Share Application for Review
\`\`\`javascript
const shareApplication = async (applicationId, reviewerIds, permissions) => {
  const response = await fetch(\`/api/applications/\${applicationId}/share\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      reviewerIds,
      permissions: {
        canView: true,
        canComment: permissions.canComment,
        canUpdateStatus: permissions.canUpdateStatus
      },
      message: 'Please review this candidate application'
    })
  });

  return await response.json();
};
\`\`\`

### Review Analytics

\`\`\`javascript
const getReviewAnalytics = async (jobId, dateRange) => {
  const response = await fetch(\`/api/jobs/\${jobId}/applications/analytics\`, {
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
// - Average time to review
// - Review completion rates
// - Status distribution
// - Reviewer performance metrics
\`\`\`

### Quality Assurance

- **Review Guidelines**: Standardized evaluation criteria
- **Bias Training**: Anti-bias review protocols
- **Audit Trail**: Complete review activity logging
- **Quality Metrics**: Review quality scoring`,
      codeExamples: [
        {
          id: "review-workflow",
          title: "Application Review Workflow",
          description: "Structured application review process",
          language: "typescript",
          code: `class ApplicationReviewService {
  async startReview(applicationId: string, reviewerId: string) {
    const application = await this.getApplication(applicationId);

    // Assign reviewer
    await this.assignReviewer(applicationId, reviewerId);

    // Create review checklist
    await this.createReviewChecklist(applicationId, application.jobId);

    // Notify reviewer
    await this.notifyReviewer(reviewerId, application);

    // Log review start
    await this.logReviewActivity(applicationId, 'review_started', reviewerId);
  }

  async completeReview(applicationId: string, reviewData: ReviewData) {
    // Validate review completeness
    await this.validateReview(reviewData);

    // Save review data
    await this.saveReview(applicationId, reviewData);

    // Update application status if needed
    if (reviewData.recommendation === 'reject') {
      await this.updateApplicationStatus(applicationId, 'rejected', reviewData.reviewerId);
    } else if (reviewData.recommendation === 'strong_candidate') {
      await this.updateApplicationStatus(applicationId, 'shortlisted', reviewData.reviewerId);
    }

    // Notify next steps
    await this.notifyReviewCompletion(applicationId, reviewData);

    // Update review metrics
    await this.updateReviewMetrics(reviewData.reviewerId);
  }

  private async validateReview(reviewData: ReviewData): Promise<void> {
    if (!reviewData.rating || reviewData.rating < 1 || reviewData.rating > 5) {
      throw new Error('Rating must be between 1 and 5');
    }

    if (!reviewData.notes || reviewData.notes.trim().length < 10) {
      throw new Error('Review notes must be at least 10 characters');
    }

    if (!reviewData.recommendation) {
      throw new Error('Recommendation is required');
    }
  }
}`
        }
      ]
    },
    {
      id: "candidate-management",
      title: "Candidate Management",
      content: `Comprehensive candidate relationship management with communication tools and tracking.

### Candidate Profiles

#### View Candidate Profile
\`\`\`javascript
const getCandidateProfile = async (applicationId) => {
  const response = await fetch(\`/api/applications/\${applicationId}/candidate\`, {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });

  return await response.json();
};
\`\`\`

#### Update Candidate Information
\`\`\`javascript
const updateCandidateInfo = async (applicationId, updates) => {
  const response = await fetch(\`/api/applications/\${applicationId}/candidate\`, {
    method: 'PUT',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updates)
  });

  return await response.json();
};
\`\`\`

### Candidate Communication

#### Send Message to Candidate
\`\`\`javascript
const sendCandidateMessage = async (applicationId, messageData) => {
  const response = await fetch(\`/api/applications/\${applicationId}/messages\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      subject: messageData.subject,
      message: messageData.message,
      messageType: 'email', // email, in_app, sms
      urgent: messageData.urgent || false
    })
  });

  return await response.json();
};
\`\`\`

#### Schedule Interview
\`\`\`javascript
const scheduleInterview = async (applicationId, interviewData) => {
  const response = await fetch(\`/api/applications/\${applicationId}/interview\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      interviewType: interviewData.type, // phone, video, in_person
      scheduledAt: interviewData.dateTime,
      duration: interviewData.duration,
      interviewers: interviewData.interviewers,
      location: interviewData.location,
      meetingLink: interviewData.meetingLink,
      agenda: interviewData.agenda
    })
  });

  return await response.json();
};
\`\`\`

### Candidate Tracking

#### Add Candidate Tags
\`\`\`javascript
const tagCandidate = async (applicationId, tags) => {
  const response = await fetch(\`/api/applications/\${applicationId}/tags\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      tags,
      category: 'skill' // skill, experience, culture, etc.
    })
  });

  return await response.json();
};
\`\`\`

#### Track Candidate Progress
\`\`\`javascript
const updateCandidateProgress = async (applicationId, progressData) => {
  const response = await fetch(\`/api/applications/\${applicationId}/progress\`, {
    method: 'PUT',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      stage: progressData.stage,
      notes: progressData.notes,
      nextSteps: progressData.nextSteps,
      dueDate: progressData.dueDate
    })
  });

  return await response.json();
};
\`\`\`

### Candidate Pools

#### Create Candidate Pool
\`\`\`javascript
const createCandidatePool = async (poolData) => {
  const response = await fetch('/api/candidate-pools', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: poolData.name,
      description: poolData.description,
      criteria: poolData.criteria,
      isPublic: poolData.isPublic
    })
  });

  return await response.json();
};
\`\`\`

#### Add to Candidate Pool
\`\`\`javascript
const addToCandidatePool = async (poolId, applicationIds) => {
  const response = await fetch(\`/api/candidate-pools/\${poolId}/candidates\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      applicationIds
    })
  });

  return await response.json();
};
\`\`\`

### Candidate Analytics

\`\`\`javascript
const getCandidateAnalytics = async (candidateId) => {
  const response = await fetch(\`/api/candidates/\${candidateId}/analytics\`, {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });

  return await response.json();
};

// Returns:
// - Application success rate
// - Average response time
// - Interview conversion rate
// - Skills match scores
\`\`\``,
      lists: [
        {
          type: "unordered",
          items: [
            "Candidate communication is logged for compliance",
            "Interview scheduling includes automatic reminders",
            "Candidate pools enable efficient talent management",
            "Progress tracking helps manage hiring pipelines"
          ]
        }
      ]
    },
    {
      id: "communication",
      title: "Application Communication",
      content: `Integrated communication system for seamless interaction between candidates and employers.

### Message Types

- **Application Updates**: Status change notifications
- **Interview Invitations**: Scheduling and logistics
- **Feedback Requests**: Candidate input collection
- **Offer Letters**: Formal offer communications
- **Rejection Notices**: Professional decline communications

### Communication Channels

#### In-App Messaging
\`\`\`javascript
const sendInAppMessage = async (applicationId, messageData) => {
  const response = await fetch(\`/api/applications/\${applicationId}/messages\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'in_app',
      subject: messageData.subject,
      content: messageData.content,
      attachments: messageData.attachments,
      priority: messageData.priority || 'normal'
    })
  });

  return await response.json();
};
\`\`\`

#### Email Communication
\`\`\`javascript
const sendEmailMessage = async (applicationId, emailData) => {
  const response = await fetch(\`/api/applications/\${applicationId}/messages\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'email',
      subject: emailData.subject,
      content: emailData.content,
      template: emailData.template, // interview_invite, offer_letter, rejection
      attachments: emailData.attachments,
      sendAt: emailData.sendAt // scheduled sending
    })
  });

  return await response.json();
};
\`\`\`

### Communication Templates

#### Interview Invitation Template
\`\`\`javascript
const sendInterviewInvite = async (applicationId, interviewDetails) => {
  return await sendEmailMessage(applicationId, {
    template: 'interview_invite',
    subject: \`Interview Invitation for \${interviewDetails.position}\`,
    content: {
      interviewType: interviewDetails.type,
      dateTime: interviewDetails.dateTime,
      duration: interviewDetails.duration,
      interviewers: interviewDetails.interviewers,
      location: interviewDetails.location,
      meetingLink: interviewDetails.meetingLink,
      agenda: interviewDetails.agenda,
      preparation: interviewDetails.preparation
    }
  });
};
\`\`\`

#### Offer Letter Template
\`\`\`javascript
const sendOfferLetter = async (applicationId, offerDetails) => {
  return await sendEmailMessage(applicationId, {
    template: 'offer_letter',
    subject: \`Job Offer: \${offerDetails.position}\`,
    content: {
      position: offerDetails.position,
      salary: offerDetails.salary,
      benefits: offerDetails.benefits,
      startDate: offerDetails.startDate,
      expirationDate: offerDetails.expirationDate,
      contactPerson: offerDetails.contactPerson
    },
    attachments: [offerDetails.formalOfferDocument]
  });
};
\`\`\`

### Communication Tracking

\`\`\`javascript
const getCommunicationHistory = async (applicationId) => {
  const response = await fetch(\`/api/applications/\${applicationId}/communications\`, {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });

  return await response.json();
};

// Returns:
// - All messages sent/received
// - Delivery status
// - Response tracking
// - Scheduled communications
\`\`\`

### Automated Communications

#### Status Change Notifications
\`\`\`javascript
// Automatically triggered when application status changes
const statusChangeNotification = {
  submitted: {
    candidate: 'Application submitted successfully',
    employer: 'New application received'
  },
  under_review: {
    candidate: 'Your application is under review',
    employer: null
  },
  shortlisted: {
    candidate: 'Congratulations! You have been shortlisted',
    employer: null
  },
  rejected: {
    candidate: 'Application status update',
    employer: null
  }
};
\`\`\`

#### Reminder System
\`\`\`javascript
const scheduleReminder = async (applicationId, reminderData) => {
  const response = await fetch(\`/api/applications/\${applicationId}/reminders\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: reminderData.type, // interview_reminder, feedback_request
      scheduledFor: reminderData.dateTime,
      message: reminderData.message,
      recipient: reminderData.recipient // candidate, interviewer
    })
  });

  return await response.json();
};
\`\`\``,
      calloutBoxes: [
        {
          type: "success",
          title: "Communication Best Practices",
          content: "Maintain professional, timely communication throughout the application process to enhance candidate experience."
        }
      ]
    },
    {
      id: "bulk-operations",
      title: "Bulk Application Operations",
      content: `Efficient management of multiple applications through bulk operations and batch processing.

### Bulk Status Updates

\`\`\`javascript
const bulkUpdateApplicationStatus = async (applicationIds, newStatus, options) => {
  const response = await fetch('/api/applications/bulk/status', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      applicationIds,
      status: newStatus,
      reason: options.reason,
      notes: options.notes,
      notifyCandidates: options.notifyCandidates,
      sendCustomMessage: options.sendCustomMessage
    })
  });

  return await response.json();
};
\`\`\`

### Bulk Communication

\`\`\`javascript
const bulkSendMessages = async (applicationIds, messageData) => {
  const response = await fetch('/api/applications/bulk/messages', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      applicationIds,
      message: {
        subject: messageData.subject,
        content: messageData.content,
        type: messageData.type, // email, in_app
        template: messageData.template,
        attachments: messageData.attachments
      },
      schedule: messageData.schedule // immediate, scheduled
    })
  });

  return await response.json();
};
\`\`\`

### Bulk Export

\`\`\`javascript
const exportApplications = async (filters, format) => {
  const response = await fetch('/api/applications/export', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      filters: {
        jobId: filters.jobId,
        status: filters.status,
        dateRange: filters.dateRange,
        tags: filters.tags
      },
      format: format || 'csv', // csv, json, xlsx
      includeFields: filters.includeFields,
      anonymize: filters.anonymize
    })
  });

  if (response.ok) {
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = \`applications-export.\${format}\`;
    a.click();
  }
};
\`\`\`

### Bulk Import

\`\`\`javascript
const importApplications = async (file, jobId, options) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('jobId', jobId);
  formData.append('options', JSON.stringify({
    skipDuplicates: options.skipDuplicates,
    sendNotifications: options.sendNotifications,
    defaultStatus: options.defaultStatus || 'submitted'
  }));

  const response = await fetch('/api/applications/import', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`
    },
    body: formData
  });

  return await response.json();
};
\`\`\`

### Bulk Tagging

\`\`\`javascript
const bulkTagApplications = async (applicationIds, tags, action) => {
  const response = await fetch('/api/applications/bulk/tags', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      applicationIds,
      tags,
      action: action || 'add' // add, remove, replace
    })
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
    "total": 500,
    "completed": 245,
    "failed": 12,
    "skipped": 5
  },
  "results": {
    "successful": [...],
    "failed": [...],
    "skipped": [...]
  },
  "errors": [
    {
      "applicationId": "app-uuid",
      "error": "Validation failed",
      "details": "Invalid email format"
    }
  ]
}
\`\`\`

### Batch Processing Limits

- **Maximum Batch Size**: 1000 applications per operation
- **Concurrent Operations**: 5 simultaneous bulk operations per user
- **Processing Timeout**: 30 minutes for large batches
- **Rate Limiting**: 10 bulk operations per hour per user`,
      codeExamples: [
        {
          id: "bulk-operation-handler",
          title: "Bulk Operation Handler",
          description: "Handling bulk application operations with progress tracking",
          language: "typescript",
          code: `class BulkOperationHandler {
  async executeBulkOperation(operationType: string, data: any, onProgress?: (progress: any) => void) {
    const operation = await this.createBulkOperation(operationType, data);

    // Start processing
    const processingPromise = this.processBulkOperation(operation.id);

    // Track progress if callback provided
    if (onProgress) {
      this.trackProgress(operation.id, onProgress);
    }

    try {
      const result = await processingPromise;
      await this.completeOperation(operation.id, result);
      return result;
    } catch (error) {
      await this.failOperation(operation.id, error);
      throw error;
    }
  }

  private async trackProgress(operationId: string, onProgress: (progress: any) => void) {
    const interval = setInterval(async () => {
      const status = await this.getOperationStatus(operationId);

      onProgress(status.progress);

      if (status.status === 'completed' || status.status === 'failed') {
        clearInterval(interval);
      }
    }, 2000); // Update every 2 seconds
  }

  private async processBulkOperation(operationId: string) {
    const operation = await this.getOperation(operationId);
    const batchSize = 50; // Process in batches

    for (let i = 0; i < operation.items.length; i += batchSize) {
      const batch = operation.items.slice(i, i + batchSize);

      try {
        await this.processBatch(operation.type, batch);
        await this.updateProgress(operationId, i + batch.length);
      } catch (error) {
        await this.recordBatchError(operationId, batch, error);
      }

      // Small delay to prevent overwhelming the system
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }
}`
        }
      ]
    },
    {
      id: "application-endpoints",
      title: "Application Management Endpoints",
      content: `Complete API reference for application management operations.

### Application CRUD Operations

#### POST /applications
Submit a new job application.

#### GET /applications/{id}
Get application details.

#### PUT /applications/{id}
Update application information.

#### DELETE /applications/{id}
Withdraw application (candidate only).

#### GET /applications
List applications with filtering.

### Application Status

#### PUT /applications/{id}/status
Update application status.

#### GET /applications/{id}/status-history
Get application status change history.

### Review & Evaluation

#### POST /applications/{id}/review
Add review notes and rating.

#### GET /applications/{id}/reviews
Get all reviews for application.

#### POST /applications/{id}/share
Share application with other reviewers.

### Communication

#### POST /applications/{id}/messages
Send message to candidate/employer.

#### GET /applications/{id}/messages
Get communication history.

#### POST /applications/{id}/interview
Schedule interview.

#### GET /applications/{id}/interviews
Get interview history.

### Candidate Management

#### GET /applications/{id}/candidate
Get candidate profile.

#### PUT /applications/{id}/candidate
Update candidate information.

#### POST /applications/{id}/tags
Add tags to candidate.

### Bulk Operations

#### POST /applications/bulk/status
Update multiple application statuses.

#### POST /applications/bulk/messages
Send messages to multiple candidates.

#### POST /applications/export
Export applications data.

#### POST /applications/import
Import applications data.

### Analytics

#### GET /applications/analytics
Get application analytics.

#### GET /jobs/{id}/applications/analytics
Get job-specific application analytics.

#### GET /companies/{id}/applications/analytics
Get company-wide application analytics.

### Administrative

#### GET /admin/applications
Admin application search.

#### POST /admin/applications/{id}/moderate
Moderate application content.

#### DELETE /admin/applications/{id}
Force delete application.

### Response Examples

#### Application Submission Response
\`\`\`json
{
  "success": true,
  "data": {
    "id": "application-uuid",
    "jobId": "job-uuid",
    "status": "submitted",
    "submittedAt": "2025-01-15T10:00:00Z",
    "message": "Application submitted successfully"
  }
}
\`\`\`

#### Application List Response
\`\`\`json
{
  "success": true,
  "data": {
    "applications": [
      {
        "id": "app-uuid",
        "job": {
          "id": "job-uuid",
          "title": "Senior Developer"
        },
        "candidate": {
          "id": "user-uuid",
          "name": "John Doe"
        },
        "status": "under_review",
        "submittedAt": "2025-01-15T10:00:00Z",
        "lastUpdated": "2025-01-16T14:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 150,
      "totalPages": 8
    }
  }
}
\`\`\`

#### Error Response
\`\`\`json
{
  "success": false,
  "error": {
    "code": "DUPLICATE_APPLICATION",
    "message": "You have already applied to this job",
    "details": {
      "jobId": "job-uuid",
      "existingApplicationId": "app-uuid"
    }
  }
}
\`\`\``,
      lists: [
        {
          type: "unordered",
          items: [
            "All application endpoints require authentication",
            "Employer endpoints require employer role for the relevant job",
            "Candidate endpoints require candidate role for their applications",
            "Bulk operations are limited to 1000 items per request"
          ]
        }
      ]
    }
  ],
  nextSteps: {
    title: "Next Steps",
    links: [
      {
        text: "Job Management API",
        href: "/docs/backend-api/job-management",
        description: "Create and manage job postings"
      },
      {
        text: "User Management API",
        href: "/docs/backend-api/user-management",
        description: "Manage user profiles and authentication"
      },
      {
        text: "Analytics API",
        href: "/docs/backend-api/analytics",
        description: "Track application and hiring metrics"
      }
    ]
  },
  relatedResources: [
    {
      text: "Communication Guidelines",
      href: "/docs/legal/communication",
      description: "Best practices for candidate communication"
    },
    {
      text: "Data Privacy",
      href: "/docs/legal/privacy",
      description: "Application data handling and privacy"
    },
    {
      text: "Hiring Best Practices",
      href: "/docs/business/hiring-practices",
      description: "Guidelines for effective hiring processes"
    }
  ]
}