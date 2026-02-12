// Backend API User Management Content
import { PageContent } from '@/lib/content-types'

export const backendApiUserManagementContent: PageContent = {
  metadata: {
    title: "User Management API",
    description: "Complete guide to user CRUD operations, profile management, and user-related API endpoints",
    version: "1.0.0",
    lastUpdated: "2025-12-28",
    authors: ["Backend Engineering Team"],
    tags: ["api", "users", "profiles", "crud", "management"],
    difficulty: "intermediate",
    estimatedTime: 18
  },
  tableOfContents: [
    { id: "user-overview", title: "User Management Overview", level: 1 },
    { id: "user-model", title: "User Data Model", level: 1 },
    { id: "profile-operations", title: "Profile Operations", level: 1 },
    { id: "user-preferences", title: "User Preferences", level: 1 },
    { id: "resume-management", title: "Resume Management", level: 1 },
    { id: "user-verification", title: "User Verification", level: 1 },
    { id: "account-settings", title: "Account Settings", level: 1 },
    { id: "admin-operations", title: "Administrative Operations", level: 1 },
    { id: "user-endpoints", title: "User Management Endpoints", level: 1 }
  ],
  introduction: {
    id: "introduction",
    title: "User Management API",
    content: `The User Management API provides comprehensive functionality for creating, reading, updating, and managing user accounts and profiles. This API handles everything from basic user registration to advanced profile management, preferences, and administrative controls.`
  },
  sections: [
    {
      id: "user-overview",
      title: "User Management Overview",
      content: `CareerForge's user management system is designed to handle diverse user types including job seekers, employers, and administrators. The API provides secure, scalable operations for user lifecycle management.

### Key Features

- **Multi-Role Support**: Job seekers, employers, and administrators
- **Profile Management**: Comprehensive user profile operations
- **Resume Handling**: Secure resume upload and management
- **Preferences**: Personalized user settings and preferences
- **Verification**: Email and identity verification processes
- **Admin Controls**: Administrative user management operations

### User Types

#### Job Seeker
- Personal profile with career information
- Resume and portfolio management
- Job application tracking
- Career preferences and settings

#### Employer
- Company affiliation and role information
- Job posting permissions
- Team management capabilities
- Analytics access

#### Administrator
- System-wide user management
- Content moderation
- Platform configuration
- Audit and compliance tools`,
      calloutBoxes: [
        {
          type: "info",
          title: "GDPR Compliance",
          content: "All user operations comply with GDPR and other privacy regulations with proper data handling and user consent management."
        }
      ]
    },
    {
      id: "user-model",
      title: "User Data Model",
      content: `The user data model is structured to support comprehensive user information while maintaining security and performance.

### Core User Fields

\`\`\`typescript
interface User {
  id: string;                    // UUID primary key
  email: string;                 // Unique email address
  emailVerified: boolean;        // Email verification status
  firstName: string;             // User's first name
  lastName: string;              // User's last name
  role: UserRole;                // User role (job_seeker, employer, admin)
  avatar?: string;               // Profile picture URL
  phone?: string;                // Phone number
  location?: Location;           // Geographic location
  timezone: string;              // User's timezone
  language: string;              // Preferred language
  createdAt: Date;               // Account creation timestamp
  updatedAt: Date;               // Last update timestamp
  lastLoginAt?: Date;            // Last login timestamp
  isActive: boolean;             // Account active status
  onboardingCompleted: boolean;  // Onboarding completion status
}
\`\`\`

### Extended Profile Data

\`\`\`typescript
interface UserProfile {
  // Basic Information
  headline?: string;             // Professional headline
  bio?: string;                  // User biography
  website?: string;              // Personal website
  linkedinUrl?: string;          // LinkedIn profile URL
  githubUrl?: string;            // GitHub profile URL

  // Career Information
  currentPosition?: string;      // Current job title
  currentCompany?: string;       // Current company
  experience: Experience[];      // Work experience array
  education: Education[];        // Education history
  skills: Skill[];               // User skills
  certifications: Certification[]; // Professional certifications

  // Preferences
  jobPreferences: JobPreferences; // Job search preferences
  privacySettings: PrivacySettings; // Privacy and visibility settings
  notificationSettings: NotificationSettings; // Notification preferences
}
\`\`\`

### Supporting Types

\`\`\`typescript
type UserRole = 'job_seeker' | 'employer' | 'admin';

interface Location {
  city?: string;
  state?: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

interface Experience {
  id: string;
  title: string;
  company: string;
  location?: string;
  startDate: Date;
  endDate?: Date;
  current: boolean;
  description?: string;
  skills: string[];
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  gpa?: number;
  achievements?: string[];
}
\`\`\``,
      codeExamples: [
        {
          id: "user-creation",
          title: "User Creation Example",
          description: "Creating a new user with profile information",
          language: "typescript",
          code: `const createUser = async (userData: CreateUserRequest): Promise<User> => {
  // Validate input data
  const validatedData = validateUserData(userData);

  // Hash password
  const hashedPassword = await hashPassword(userData.password);

  // Create user record
  const user = await db.user.create({
    data: {
      email: validatedData.email,
      password: hashedPassword,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      role: validatedData.role || 'job_seeker',
      emailVerified: false,
      isActive: true,
      onboardingCompleted: false,
      timezone: validatedData.timezone || 'UTC',
      language: validatedData.language || 'en'
    }
  });

  // Create initial profile
  await db.userProfile.create({
    data: {
      userId: user.id,
      jobPreferences: {
        jobTypes: [],
        locations: [],
        salaryRange: null,
        remoteWork: false
      },
      privacySettings: {
        profileVisibility: 'public',
        showEmail: false,
        showPhone: false
      },
      notificationSettings: {
        emailNotifications: true,
        jobAlerts: true,
        applicationUpdates: true
      }
    }
  });

  // Send verification email
  await sendVerificationEmail(user.email, user.id);

  return user;
};`
        }
      ]
    },
    {
      id: "profile-operations",
      title: "Profile Operations",
      content: `Comprehensive profile management operations for viewing and updating user information.

### Profile Retrieval

#### Get Current User Profile
\`\`\`javascript
const getCurrentUser = async () => {
  const response = await fetch('/api/users/profile', {
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    const userData = await response.json();
    return userData.data;
  }

  throw new Error('Failed to fetch user profile');
};
\`\`\`

#### Get Public User Profile
\`\`\`javascript
const getPublicProfile = async (userId) => {
  const response = await fetch(\`/api/users/\${userId}/public\`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    return await response.json();
  }

  throw new Error('Profile not found or private');
};
\`\`\`

### Profile Updates

#### Update Basic Information
\`\`\`javascript
const updateProfile = async (profileData) => {
  const response = await fetch('/api/users/profile', {
    method: 'PUT',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      headline: profileData.headline,
      bio: profileData.bio,
      location: profileData.location
    })
  });

  return await response.json();
};
\`\`\`

#### Update Career Information
\`\`\`javascript
const updateCareerInfo = async (careerData) => {
  const response = await fetch('/api/users/profile/career', {
    method: 'PUT',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      currentPosition: careerData.currentPosition,
      currentCompany: careerData.currentCompany,
      experience: careerData.experience,
      education: careerData.education,
      skills: careerData.skills
    })
  });

  return await response.json();
};
\`\`\`

### Profile Validation

All profile updates go through comprehensive validation:

- **Email Format**: RFC compliant email validation
- **Phone Numbers**: International format support
- **URLs**: Valid URL format for website/social links
- **Dates**: Proper date format and logical ranges
- **Skills**: Predefined skill taxonomy
- **Location**: Geocoding validation for coordinates`,
      calloutBoxes: [
        {
          type: "warning",
          title: "Profile Privacy",
          content: "Users can control profile visibility settings. Respect privacy preferences when displaying user information."
        }
      ]
    },
    {
      id: "user-preferences",
      title: "User Preferences",
      content: `User preferences allow customization of the CareerForge experience across multiple dimensions.

### Job Search Preferences

\`\`\`typescript
interface JobPreferences {
  jobTypes: string[];           // ['full-time', 'part-time', 'contract']
  locations: string[];          // Preferred work locations
  salaryRange: {
    min?: number;
    max?: number;
    currency: string;
  };
  remoteWork: boolean;          // Open to remote work
  companySize: string[];        // ['startup', 'small', 'medium', 'large']
  industries: string[];         // Preferred industries
  experienceLevel: string;      // 'entry', 'mid', 'senior', 'executive'
  keywords: string[];           // Important keywords
}
\`\`\`

### Privacy Settings

\`\`\`typescript
interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'connections';
  showEmail: boolean;
  showPhone: boolean;
  showResume: boolean;
  allowMessaging: boolean;
  showActivity: boolean;
  dataSharing: boolean;
}
\`\`\`

### Notification Settings

\`\`\`typescript
interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;

  // Specific notification types
  jobAlerts: boolean;
  applicationUpdates: boolean;
  messageNotifications: boolean;
  companyUpdates: boolean;
  weeklyDigest: boolean;
  marketingEmails: boolean;
}
\`\`\`

### Updating Preferences

\`\`\`javascript
const updatePreferences = async (preferences) => {
  const response = await fetch('/api/users/preferences', {
    method: 'PUT',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(preferences)
  });

  return await response.json();
};
\`\`\``,
      lists: [
        {
          type: "unordered",
          items: [
            "Preferences are used to personalize job recommendations",
            "Privacy settings control data visibility and sharing",
            "Notification preferences can be updated at any time",
            "Changes to preferences may take up to 24 hours to fully propagate"
          ]
        }
      ]
    },
    {
      id: "resume-management",
      title: "Resume Management",
      content: `Secure resume upload, storage, and management capabilities.

### Resume Upload Process

1. **File Validation**: Check file type, size, and content
2. **Virus Scanning**: Automatic malware detection
3. **Content Extraction**: Parse resume content for indexing
4. **Secure Storage**: Encrypted storage with access controls
5. **CDN Delivery**: Fast, global content delivery

### Supported Formats

- PDF (recommended)
- Microsoft Word (.doc, .docx)
- Plain Text (.txt)
- Rich Text Format (.rtf)

### File Constraints

- **Maximum Size**: 10MB
- **Allowed Types**: PDF, DOC, DOCX, TXT, RTF
- **Pages**: Maximum 50 pages
- **Content**: Text-based content only

### Resume Operations

#### Upload Resume
\`\`\`javascript
const uploadResume = async (file) => {
  const formData = new FormData();
  formData.append('resume', file);

  const response = await fetch('/api/users/resume', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`
    },
    body: formData
  });

  return await response.json();
};
\`\`\`

#### Get Resume
\`\`\`javascript
const getResume = async () => {
  const response = await fetch('/api/users/resume', {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });

  if (response.ok) {
    const blob = await response.blob();
    return blob;
  }

  throw new Error('Resume not found');
};
\`\`\`

#### Delete Resume
\`\`\`javascript
const deleteResume = async () => {
  const response = await fetch('/api/users/resume', {
    method: 'DELETE',
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });

  return await response.json();
};
\`\`\`

### Resume Parsing

Uploaded resumes are automatically parsed to extract:

- Contact information
- Work experience
- Education history
- Skills and competencies
- Certifications
- Projects and achievements

Parsed data is used to enhance user profiles and improve job matching.`,
      codeExamples: [
        {
          id: "resume-upload",
          title: "Resume Upload with Progress",
          description: "Uploading resume with progress tracking",
          language: "javascript",
          code: `const uploadResumeWithProgress = (file, onProgress) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percentComplete = (event.loaded / event.total) * 100;
        onProgress(percentComplete);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error('Upload failed'));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Upload failed'));
    });

    const formData = new FormData();
    formData.append('resume', file);

    xhr.open('POST', '/api/users/resume');
    xhr.setRequestHeader('Authorization', \`Bearer \${token}\`);
    xhr.send(formData);
  });
};

// Usage
const fileInput = document.getElementById('resume-input');
fileInput.addEventListener('change', async (event) => {
  const file = event.target.files[0];

  try {
    const result = await uploadResumeWithProgress(file, (progress) => {
      console.log(\`Upload progress: \${progress}%\`);
    });

    console.log('Resume uploaded successfully:', result);
  } catch (error) {
    console.error('Upload failed:', error);
  }
});`
        }
      ]
    },
    {
      id: "user-verification",
      title: "User Verification",
      content: `Multi-step verification process to ensure account security and platform integrity.

### Email Verification

#### Verification Process
1. User registers with email address
2. System sends verification email with unique token
3. User clicks verification link or enters token
4. Account is marked as verified

#### Verification Email Content
\`\`\`html
Subject: Verify your CareerForge account

Dear [User Name],

Welcome to CareerForge! Please verify your email address to complete your registration.

Click here to verify: https://app.careerforge.com/verify?token=[verification-token]

Or enter this code: [verification-code]

This link will expire in 24 hours.

Best regards,
CareerForge Team
\`\`\`

### Identity Verification (Optional)

For premium features, users can undergo identity verification:

- **Document Upload**: Government ID verification
- **Facial Recognition**: Biometric verification
- **Address Verification**: Proof of address validation

### Account Recovery

#### Password Reset Process
1. User requests password reset
2. System sends reset email with secure token
3. User sets new password
4. Old sessions are invalidated

#### Security Measures
- Tokens expire after 1 hour
- One-time use tokens
- Rate limiting on reset requests
- Account lockout after failed attempts`,
      calloutBoxes: [
        {
          type: "success",
          title: "Verification Benefits",
          content: "Verified users get priority in job matching and access to premium features."
        }
      ]
    },
    {
      id: "account-settings",
      title: "Account Settings",
      content: `Comprehensive account management and settings control.

### Password Management

#### Change Password
\`\`\`javascript
const changePassword = async (currentPassword, newPassword) => {
  const response = await fetch('/api/users/change-password', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      currentPassword,
      newPassword
    })
  });

  return await response.json();
};
\`\`\`

#### Account Deletion

Users can request account deletion with data retention options:

\`\`\`javascript
const deleteAccount = async (reason, retainData = false) => {
  const response = await fetch('/api/users/delete-account', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${token}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      reason,
      retainData,
      confirmation: 'DELETE_MY_ACCOUNT'
    })
  });

  return await response.json();
};
\`\`\`

### Data Export

GDPR-compliant data export functionality:

\`\`\`javascript
const exportUserData = async () => {
  const response = await fetch('/api/users/export-data', {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });

  if (response.ok) {
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'user-data-export.zip';
    a.click();
  }
};
\`\`\`

### Session Management

View and manage active sessions:

\`\`\`javascript
const getActiveSessions = async () => {
  const response = await fetch('/api/users/sessions', {
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });

  return await response.json();
};

const revokeSession = async (sessionId) => {
  const response = await fetch(\`/api/users/sessions/\${sessionId}\`, {
    method: 'DELETE',
    headers: {
      'Authorization': \`Bearer \${token}\`
    }
  });

  return await response.json();
};
\`\`\``,
      lists: [
        {
          type: "ordered",
          items: [
            "Account deletion is irreversible and requires confirmation",
            "Data export includes all user-generated content",
            "Session management helps maintain account security",
            "Password changes invalidate all existing sessions"
          ]
        }
      ]
    },
    {
      id: "admin-operations",
      title: "Administrative Operations",
      content: `Administrative functions for user management and platform oversight.

### User Administration

#### User Search and Filtering
\`\`\`javascript
const searchUsers = async (filters) => {
  const queryParams = new URLSearchParams({
    email: filters.email || '',
    role: filters.role || '',
    status: filters.status || '',
    page: filters.page || 1,
    limit: filters.limit || 20
  });

  const response = await fetch(\`/api/admin/users?\${queryParams}\`, {
    headers: {
      'Authorization': \`Bearer \${adminToken}\`
    }
  });

  return await response.json();
};
\`\`\`

#### User Moderation
\`\`\`javascript
const moderateUser = async (userId, action, reason) => {
  const response = await fetch(\`/api/admin/users/\${userId}/moderate\`, {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${adminToken}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      action, // 'suspend', 'activate', 'delete'
      reason,
      duration: action === 'suspend' ? 30 : null // days
    })
  });

  return await response.json();
};
\`\`\`

### Bulk Operations

#### Bulk User Import
\`\`\`javascript
const importUsers = async (userData) => {
  const response = await fetch('/api/admin/users/import', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${adminToken}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      users: userData,
      sendWelcomeEmails: true,
      skipVerification: false
    })
  });

  return await response.json();
};
\`\`\`

#### Bulk Status Updates
\`\`\`javascript
const bulkUpdateUsers = async (userIds, updates) => {
  const response = await fetch('/api/admin/users/bulk-update', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${adminToken}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userIds,
      updates // { status: 'active', role: 'employer' }
    })
  });

  return await response.json();
};
\`\`\`

### Analytics and Reporting

#### User Statistics
\`\`\`javascript
const getUserStats = async (dateRange) => {
  const response = await fetch('/api/admin/analytics/users', {
    headers: {
      'Authorization': \`Bearer \${adminToken}\`
    },
    body: JSON.stringify(dateRange)
  });

  return await response.json();
};
\`\`\`

### Audit Logging

All administrative actions are logged for compliance:

- User creation/modification/deletion
- Permission changes
- Bulk operations
- Security events`,
      calloutBoxes: [
        {
          type: "warning",
          title: "Admin Responsibility",
          content: "Administrative actions should be performed carefully and are subject to audit logging."
        }
      ]
    },
    {
      id: "user-endpoints",
      title: "User Management Endpoints",
      content: `Complete API reference for user management operations.

### Profile Endpoints

#### GET /users/profile
Get current user's profile information.

#### PUT /users/profile
Update current user's profile.

#### GET /users/{id}/public
Get public profile information for any user.

### Resume Endpoints

#### POST /users/resume
Upload or update user resume.

#### GET /users/resume
Download current user's resume.

#### DELETE /users/resume
Delete current user's resume.

### Preferences Endpoints

#### GET /users/preferences
Get current user's preferences.

#### PUT /users/preferences
Update user preferences.

### Account Management

#### POST /users/change-password
Change user password.

#### POST /users/delete-account
Request account deletion.

#### GET /users/export-data
Export user data (GDPR compliance).

### Administrative Endpoints

#### GET /admin/users
Search and list users (Admin only).

#### GET /admin/users/{id}
Get detailed user information (Admin only).

#### PUT /admin/users/{id}
Update user information (Admin only).

#### DELETE /admin/users/{id}
Delete user account (Admin only).

#### POST /admin/users/{id}/moderate
Moderate user account (Admin only).

#### POST /admin/users/import
Bulk import users (Admin only).

### Response Examples

#### Profile Response
\`\`\`json
{
  "success": true,
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "job_seeker",
    "profile": {
      "headline": "Senior Software Engineer",
      "bio": "Passionate about building great software...",
      "location": {
        "city": "San Francisco",
        "country": "US"
      }
    },
    "preferences": {
      "jobTypes": ["full-time"],
      "remoteWork": true
    }
  }
}
\`\`\`

#### Error Response
\`\`\`json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid profile data",
    "details": {
      "field": "email",
      "reason": "Invalid email format"
    }
  }
}
\`\`\``,
      lists: [
        {
          type: "unordered",
          items: [
            "All endpoints require authentication except public profile access",
            "Administrative endpoints require admin role",
            "File uploads use multipart/form-data encoding",
            "Bulk operations are limited to 1000 users per request"
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
        description: "Learn about job posting and management operations"
      },
      {
        text: "Application Management API",
        href: "/docs/backend-api/application-management",
        description: "Handle job applications and candidate management"
      },
      {
        text: "Authentication Guide",
        href: "/docs/backend-api/authentication",
        description: "Secure access to user management endpoints"
      }
    ]
  },
  relatedResources: [
    {
      text: "Data Models",
      href: "/docs/backend-api/models",
      description: "Complete data model specifications"
    },
    {
      text: "Privacy Policy",
      href: "/docs/legal/privacy",
      description: "User data handling and privacy policies"
    },
    {
      text: "GDPR Compliance",
      href: "/docs/legal/gdpr",
      description: "Data protection and user rights"
    }
  ]
}