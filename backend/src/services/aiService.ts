import axios from 'axios';
import FormData from 'form-data';

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

export class AIService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';
  }

  private async callAiService(endpoint: string, data: any, timeout: number = 10000) {
    if (!process.env.AI_SERVICE_URL) {
      console.warn(`⚠️ AI Service called but URL not set: ${endpoint}`);
      throw new Error('AI services are currently unavailable');
    }
    try {
      const response = await axios.post(`${this.baseUrl}/${endpoint}`, data, { timeout });
      return response.data;
    } catch (error) {
      console.error(`AI Service Error (${endpoint}):`, error);
      throw new Error('AI service failed to process request');
    }
  }

  /**
   * Parse resume PDF/DOCX and extract structured data
   */
  async parseResume(fileBuffer: Buffer, filename: string): Promise<ResumeData> {
    if (!process.env.AI_SERVICE_URL) {
      throw new Error('AI parsing service is currently unavailable');
    }
    try {
      const formData = new FormData();
      formData.append('file', fileBuffer, filename);

      const response = await axios.post<ResumeData>(
        `${this.baseUrl}/resume/parse`,
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
      return await this.callAiService('matching/jobs', {
        jobSeekerId,
        skills,
        preferences,
      });
    } catch (error) {
      console.error('Job matching error:', error);
      return [];
    }
  }

  /**
   * Find job matches for a job seeker (alias for matchJobs)
   */
  async findJobMatches(jobSeekerId: string): Promise<any[]> {
    return this.matchJobs(jobSeekerId, [], {});
  }

  /**
   * Match candidates for a job posting
   */
  async matchCandidates(jobId: string): Promise<any[]> {
    try {
      return await this.callAiService('matching/candidates', { jobId });
    } catch (error) {
      console.error('Candidate matching error:', error);
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
      const response = await this.callAiService('career-coach/advice', {
        query,
        context: userContext,
      }, 15000);
      return response.advice;
    } catch (error) {
      console.error('Career coach error:', error);
      return 'Sorry, I am currently unavailable. Please try again later.';
    }
  }

  /**
   * Optimize resume content for a specific job
   */
  async optimizeResume(resumeData: any, jobRequirements: string): Promise<any> {
    try {
      return await this.callAiService('resume/optimize', { resumeData, jobRequirements }, 20000);
    } catch (error) {
      console.error('Resume optimization error:', error);
      return { error: 'Service unavailable' };
    }
  }

  /**
   * Optimize LinkedIn profile
   */
  async optimizeLinkedInProfile(currentHeadline: string, targetRole: string): Promise<any> {
    try {
      return await this.callAiService('career-coach/linkedin', { currentHeadline, targetRole }, 15000);
    } catch (error) {
      console.error('LinkedIn optimization error:', error);
      return { error: 'Service unavailable' };
    }
  }

  /**
   * Generate cover letter
   */
  async generateCoverLetter(jobId: string, resumeId: string): Promise<any> {
    try {
      return await this.callAiService('resume/cover-letter', { jobId, resumeId }, 20000);
    } catch (error) {
      console.error('Cover letter generation error:', error);
      return { error: 'Service unavailable' };
    }
  }

  /**
   * Analyze skill gaps
   */
  async analyzeSkillGaps(userId: string, roles: string[]): Promise<any> {
    try {
      return await this.callAiService('career-coach/skill-gaps', { userId, roles }, 15000);
    } catch (error) {
      console.error('Skill gap analysis error:', error);
      return { error: 'Service unavailable' };
    }
  }

  /**
   * Get hiring suggestions for a job draft
   */
  async getHiringSuggestions(jobDraft: any): Promise<any> {
    try {
      return await this.callAiService('hiring/suggestions', jobDraft, 15000);
    } catch (error) {
      console.error('Hiring suggestions error:', error);
      return { error: 'Service unavailable' };
    }
  }

  /**
   * Analyze resume for recruiter
   */
  async analyzeResumeForRecruiter(candidateId: string, jobId: string): Promise<any> {
    try {
      return await this.callAiService('hiring/analyze-resume', { candidateId, jobId }, 15000);
    } catch (error) {
      console.error('Resume analysis error:', error);
      return { error: 'Service unavailable' };
    }
  }

  /**
   * Health check for AI services
   */
  async healthCheck(): Promise<boolean> {
    if (!process.env.AI_SERVICE_URL) return false;
    try {
      const response = await axios.get(`${this.baseUrl}/health`, {
        timeout: 5000,
      });
      return response.status === 200;
    } catch (error) {
      console.error('AI service health check failed:', error);
      return false;
    }
  }
}

export const aiService = new AIService();
export default aiService;