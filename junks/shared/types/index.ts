export interface User {
  id: number;
  email: string;
  role: 'job_seeker' | 'recruiter';
  firstName: string;
  lastName: string;
  createdAt: Date;
}

export interface JobSeeker extends User {
  title?: string;
  experienceYears?: number;
  skills?: string[];
  education?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  resumeFileUrl?: string;
  profileCompletionPercentage: number;
  isProfileVisible: boolean;
}

export interface Recruiter extends User {
  companyName?: string;
  industry?: string;
  companySize?: string;
  title?: string;
  experienceYears?: number;
  specialization?: string;
  subscriptionPlan: string;
}

export interface Job {
  id: number;
  recruiterId: number;
  title: string;
  description: string;
  requirements: string;
  location: string;
  salaryMin?: number;
  salaryMax?: number;
  currency: string;
  jobType: 'full_time' | 'part_time' | 'contract' | 'remote';
  experienceLevel: 'entry' | 'mid' | 'senior' | 'executive';
  skillsRequired: string[];
  status: 'draft' | 'open' | 'closed' | 'paused';
  viewsCount: number;
  applicationsCount: number;
  postedAt: Date;
  expiresAt?: Date;
}

export interface Application {
  id: number;
  jobSeekerId: number;
  jobId: number;
  status: 'pending' | 'reviewing' | 'interview' | 'accepted' | 'rejected' | 'withdrawn';
  appliedAt: Date;
  lastUpdatedAt: Date;
  matchScore?: number;
  coverLetter?: string;
  resumeVersionUrl?: string;
  nextStep?: string;
  notes?: string;
}

export interface Resume {
  id: number;
  jobSeekerId: number;
  version: number;
  originalFileUrl: string;
  parsedData?: any;
  aiOptimizedData?: any;
  isActive: boolean;
  createdAt: Date;
}

export interface Message {
  id: number;
  senderId: number;
  recipientId: number;
  applicationId?: number;
  subject?: string;
  content: string;
  messageType: 'application' | 'interview' | 'update' | 'followup' | 'general';
  isRead: boolean;
  readAt?: Date;
  sentAt: Date;
  attachments?: any[];
}

export interface Notification {
  id: number;
  userId: number;
  type: 'application_update' | 'new_message' | 'job_match' | 'interview_invite' | 'system';
  title: string;
  content: string;
  data?: any;
  isRead: boolean;
  readAt?: Date;
  createdAt: Date;
  expiresAt?: Date;
}