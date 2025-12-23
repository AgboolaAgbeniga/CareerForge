import axios from 'axios';
import FormData from 'form-data';

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

interface ResumeData {
  skills: string[];
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  contact: {
    email?: string;
    phone?: string;
    linkedin?: string;
  };
}

interface JobMatch {
  jobId: string;
  matchScore: number;
  explanation: string;
  matchedSkills: string[];
  missingSkills: string[];
}

class AIService {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  /**
   * Parse resume PDF/DOCX and extract structured data
   */
  async parseResume(fileBuffer: Buffer, filename: string): Promise<ResumeData> {
    try {
      const formData = new FormData();
      formData.append('file', fileBuffer, filename);

      const response = await axios.post<ResumeData>(
        `${this.baseURL}/resume/parse`,
        formData,
        {
          headers: formData.getHeaders(),
          timeout: 30000, // 30 seconds
        }
      );

      return response.data;
    } catch (error) {
      console.error('Resume parsing error:', error);
      throw new Error('Failed to parse resume');
    }
  }

  /**
   * Get AI-powered job matches for a job seeker
   */
  async matchJobs(
    jobSeekerId: string,
    skills: string[],
    preferences: any
  ): Promise<JobMatch[]> {
    try {
      const response = await axios.post<JobMatch[]>(
        `${this.baseURL}/matching/jobs`,
        {
          jobSeekerId,
          skills,
          preferences,
        },
        {
          timeout: 10000,
        }
      );

      return response.data;
    } catch (error) {
      console.error('Job matching error:', error);
      // Return empty array on failure (graceful degradation)
      return [];
    }
  }

  /**
   * Get career coaching advice from AI
   */
  async getCareerAdvice(
    query: string,
    userContext: {
      currentRole?: string;
      skills?: string[];
      experienceYears?: number;
    }
  ): Promise<string> {
    try {
      const response = await axios.post<{ advice: string }>(
        `${this.baseURL}/career-coach/advice`,
        {
          query,
          context: userContext,
        },
        {
          timeout: 15000,
        }
      );

      return response.data.advice;
    } catch (error) {
      console.error('Career coach error:', error);
      return 'Sorry, I am currently unavailable. Please try again later.';
    }
  }

  /**
   * Health check for AI services
   */
  async healthCheck(): Promise<boolean> {
    try {
      const response = await axios.get(`${this.baseURL}/health`, {
        timeout: 5000,
      });
      return response.status === 200;
    } catch (error) {
      console.error('AI service health check failed:', error);
      return false;
    }
  }
}

export const aiService = new AIService(AI_SERVICE_URL);
export default aiService;