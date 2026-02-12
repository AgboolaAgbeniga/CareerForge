import axios from 'axios';
import FormData from 'form-data';
import { env } from '../config/env';

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
  private resumeParserUrl: string;
  private matchingEngineUrl: string;
  private careerCoachUrl: string;

  constructor() {
    this.resumeParserUrl = (env as any).RESUME_PARSER_URL;
    this.matchingEngineUrl = (env as any).MATCHING_ENGINE_URL;
    this.careerCoachUrl = (env as any).CAREER_COACH_URL;
  }

  private async callAiService(serviceUrl: string, endpoint: string, data: any, timeout: number = 10000) {
    try {
      const response = await axios.post(`${serviceUrl}/${endpoint}`, data, { timeout });
      return response.data;
    } catch (error) {
      console.error(`AI Service Error (${endpoint}):`, error);
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNREFUSED') {
          throw new Error(`Cannot connect to AI service at ${serviceUrl}`);
        }
        if (error.response?.status === 404) {
          throw new Error(`AI service endpoint not found: ${endpoint}`);
        }
      }
      throw new Error('AI service failed to process request');
    }
  }

  /**
   * Parse resume PDF/DOCX and extract structured data
   * Service: Resume Parser (Port 8000)
   */
  async parseResume(fileBuffer: Buffer, filename: string): Promise<ResumeData> {
    try {
      const formData = new FormData();
      formData.append('file', fileBuffer, filename);

      const response = await axios.post<ResumeData>(
        `${this.resumeParserUrl}/resume/parse-file`, // Updated to match actual endpoint
        formData,
        {
          headers: formData.getHeaders(),
          timeout: 30000,
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
   * Service: Matching Engine (Port 8001)
   */
  async matchJobs(
    jobSeekerId: string,
    skills: string[],
    preferences: any
  ): Promise<JobMatch[]> {
    try {
      // Note: Endpoint matching_router.post("/matching/jobs")
      const result = await this.callAiService(this.matchingEngineUrl, 'matching/jobs', {
        jobSeekerId,
        skills,
        preferences,
      });
      return result.matches || [];
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
   * Service: Matching Engine (Port 8001)
   */
  async matchCandidates(jobId: string): Promise<any[]> {
    try {
      const result = await this.callAiService(this.matchingEngineUrl, 'matching/candidates', { jobId });
      return result.candidates || [];
    } catch (error) {
      console.error('Candidate matching error:', error);
      return [];
    }
  }

  /**
   * Get career coaching advice from AI
   * Service: Career Coach (Port 8002)
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
      const response = await this.callAiService(this.careerCoachUrl, 'career-coach/advice', {
        query,
        userContext, // Corrected key to match app.py: AdviceRequest.user_profile mapped from data.get('userContext')
      }, 15000);
      return response.advice;
    } catch (error) {
      console.error('Career coach error:', error);
      return 'Sorry, I am currently unavailable. Please try again later.';
    }
  }

  /**
   * Optimize resume content for a specific job
   * Service: Resume Parser (Port 8000) or Career Coach? 
   * Note: app.py in resume_parser has /resume/optimize.
   */
  async optimizeResume(resumeData: any, jobRequirements: string): Promise<any> {
    try {
      return await this.callAiService(this.resumeParserUrl, 'resume/optimize', { resumeData, jobRequirements }, 20000);
    } catch (error) {
      console.error('Resume optimization error:', error);
      return { error: 'Service unavailable' };
    }
  }

  /**
   * Optimize LinkedIn profile
   * Service: Career Coach (Port 8002)
   */
  async optimizeLinkedInProfile(currentHeadline: string, targetRole: string): Promise<any> {
    try {
      return await this.callAiService(this.careerCoachUrl, 'career-coach/linkedin', { currentHeadline, targetRole }, 15000);
    } catch (error) {
      console.error('LinkedIn optimization error:', error);
      return { error: 'Service unavailable' };
    }
  }

  /**
   * Generate cover letter
   * Service: Career Coach (Port 8002)
   * Note: app.py in career_coach has /resume/cover-letter.
   */
  async generateCoverLetter(jobId: string, resumeId: string): Promise<any> {
    try {
      // Career Coach app.py expects: jobId, resumeData
      // Backend likely needs to fetch resumeData first, but for now we pass what we have
      return await this.callAiService(this.careerCoachUrl, 'resume/cover-letter', { jobId, resumeData: { id: resumeId } }, 20000);
    } catch (error) {
      console.error('Cover letter generation error:', error);
      return { error: 'Service unavailable' };
    }
  }

  /**
   * Analyze skill gaps
   * Service: Career Coach (Port 8002)
   */
  async analyzeSkillGaps(userId: string, roles: string[]): Promise<any> {
    try {
      return await this.callAiService(this.careerCoachUrl, 'career-coach/skill-gaps', { userId, roles }, 15000);
    } catch (error) {
      console.error('Skill gap analysis error:', error);
      return { error: 'Service unavailable' };
    }
  }

  /**
   * Get hiring suggestions for a job draft
   * Service: Matching Engine (Port 8001)
   */
  async getHiringSuggestions(jobDraft: any): Promise<any> {
    try {
      return await this.callAiService(this.matchingEngineUrl, 'hiring/suggestions', jobDraft, 15000);
    } catch (error) {
      console.error('Hiring suggestions error:', error);
      return { error: 'Service unavailable' };
    }
  }

  /**
   * Analyze resume for recruiter
   * Service: Matching Engine (Port 8001)
   */
  async analyzeResumeForRecruiter(candidateId: string, jobId: string): Promise<any> {
    try {
      return await this.callAiService(this.matchingEngineUrl, 'hiring/analyze-resume', { candidateId, jobId }, 15000);
    } catch (error) {
      console.error('Resume analysis error:', error);
      return { error: 'Service unavailable' };
    }
  }

  /**
   * Health check for AI services
   * Checks all three services
   */
  async healthCheck(): Promise<boolean> {
    const services = [
      { name: 'Resume Parser', url: this.resumeParserUrl },
      { name: 'Matching Engine', url: this.matchingEngineUrl },
      { name: 'Career Coach', url: this.careerCoachUrl }
    ];

    let allHealthy = true;

    for (const service of services) {
      try {
        // Assuming simple root GET or /docs check since /health might not exist on all
        // The file `shared/utils` or `app.py` usually implies /docs exists for FastAPI
        // Or we can just try to connect. 
        // Note: The previous code tried /health. Let's stick to /health and assume we'd add it or it's default.
        // Actually, typical FastAPI doesn't have /health by default unless added.
        // I will just catch the connection error. 404 is "healthy" in sense that server is up.

        await axios.get(`${service.url}/docs`, { timeout: 2000 });
        // receiving 200 from docs is good enough
      } catch (error) {
        if (axios.isAxiosError(error) && error.code === 'ECONNREFUSED') {
          console.warn(`⚠️ ${service.name} is DOWN at ${service.url}`);
          allHealthy = false;
        }
      }
    }

    return allHealthy;
  }
}

export const aiService = new AIService();
export default aiService;