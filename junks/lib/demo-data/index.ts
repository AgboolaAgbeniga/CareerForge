import mockCandidates from './mockCandidates.json';
import mockJobs from './mockJobs.json';
import mockCompanies from './mockCompanies.json';
import mockUserProfiles from './mockUserProfiles.json';
import mockApplications from './mockApplications.json';
import mockResumeData from './mockResumeData.json';
import mockMessages from './mockMessages.json';

export {
  mockCandidates,
  mockJobs,
  mockCompanies,
  mockUserProfiles,
  mockApplications,
  mockResumeData,
  mockMessages,
};

// Type definitions for better TypeScript support
export interface Candidate {
  id: number;
  name: string;
  title: string;
  skills: string[];
  experience: string;
  company: string;
  location: string;
  matchScore: number;
  avatar: string;
  status: string;
  email: string;
  phone: string;
  summary: string;
  education: string;
  certifications: string[];
  portfolio: string;
  lastActive: string;
}

export interface Job {
  id: string;
  title: string;
  location: string;
  postedDays: number;
  matches: number;
  views: number;
  status: string;
  salary: string;
  type: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  headquarters: string;
  size: string;
  description: string;
}

export interface UserProfile {
  jobSeeker: {
    id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    title: string;
    experience: string;
    skills: string[];
    education: string;
    portfolio: string;
    linkedin: string;
  };
  recruiter: {
    id: string;
    name: string;
    email: string;
    phone: string;
    location: string;
    title: string;
    company: string;
    industry: string;
    experience: string;
    specialization: string;
  };
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  status: string;
  appliedDate: string;
  lastUpdate: string;
  nextStep: string;
  matchScore: number;
}

export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
  };
  summary: string;
  experience: Array<{
    company: string;
    position: string;
    duration: string;
    location: string;
    description: string;
  }>;
  skills: string[];
  education: string;
  certifications: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
  }>;
}

export interface Message {
  id: string;
  sender: string;
  senderRole: string;
  company?: string;
  subject: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: string;
}