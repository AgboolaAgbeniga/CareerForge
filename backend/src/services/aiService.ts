/**
 * AI Service integration for CareerForge
 * Handles communication with Python AI microservices
 */
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { getLogger } from '../utils/logger';

const logger = getLogger('AIService');

interface ResumeParseResult {
  personal_info: Record<string, string>;
  skills: Array<{ skill: string; confidence: number }>;
  experience: Array<Record<string, string>>;
  education: Array<Record<string, string>>;
  contact: Record<string, string>;
  summary: string;
  confidence_score: number;
}

interface JobMatch {
  score: number;
  reasons: string[];
  semantic_similarity: number;
  skill_match: number;
  experience_match: number;
}

interface CareerAdvice {
  advice: string;
  action_items: string[];
  resources: string[];
}

export class AIService {
  private httpClient: AxiosInstance;
  private resumeParserUrl: string;
  private matchingEngineUrl: string;
  private careerCoachUrl: string;

  constructor() {
    this.resumeParserUrl = process.env.RESUME_PARSER_URL || 'http://localhost:8000';
    this.matchingEngineUrl = process.env.MATCHING_ENGINE_URL || 'http://localhost:8001';
    this.careerCoachUrl = process.env.CAREER_COACH_URL || 'http://localhost:8002';

    this.httpClient = axios.create({
      timeout: 30000, // 30 seconds
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add response interceptor for error handling
    this.httpClient.interceptors.response.use(
      (response) => response,
      (error) => {
        logger.error('AI Service Error:', {
          service: error.config?.url,
          status: error.response?.status,
          message: error.message,
        });
        throw error;
      }
    );
  }

  /**
   * Parse resume using AI service
   */
  async parseResume(text: string): Promise<ResumeParseResult> {
    try {
      logger.info('Parsing resume with AI service');

      const response: AxiosResponse<ResumeParseResult> = await this.httpClient.post(
        `${this.resumeParserUrl}/parse`,
        { text }
      );

      logger.info('Resume parsed successfully', {
        confidence: response.data.confidence_score,
        skills_found: response.data.skills.length
      });

      return response.data;
    } catch (error) {
      logger.error('Resume parsing failed', { error: error.message });
      throw new Error('Failed to parse resume with AI service');
    }
  }

  /**
   * Parse resume file using AI service
   */
  async parseResumeFile(fileBuffer: Buffer, filename: string): Promise<ResumeParseResult> {
    try {
      logger.info('Parsing resume file with AI service', { filename });

      // For now, convert buffer to text (would need proper PDF parsing)
      const text = fileBuffer.toString('utf-8', 0, 10000); // First 10KB

      return await this.parseResume(text);
    } catch (error) {
      logger.error('Resume file parsing failed', { error: error.message, filename });
      throw new Error('Failed to parse resume file with AI service');
    }
  }

  /**
   * Optimize resume for job application
   */
  async optimizeResume(resumeData: Record<string, any>, jobRequirements: Record<string, any>): Promise<any> {
    try {
      logger.info('Optimizing resume with AI service');

      const response = await this.httpClient.post(
        `${this.resumeParserUrl}/optimize`,
        { resume_data: resumeData, job_requirements: jobRequirements }
      );

      return response.data;
    } catch (error) {
      logger.error('Resume optimization failed', { error: error.message });
      throw new Error('Failed to optimize resume with AI service');
    }
  }

  /**
   * Find job matches for job seeker
   */
  async findJobMatches(jobSeekerId: number): Promise<JobMatch[]> {
    try {
      logger.info('Finding job matches', { jobSeekerId });

      const response = await this.httpClient.get(
        `${this.matchingEngineUrl}/matches/${jobSeekerId}`
      );

      return response.data.matches || [];
    } catch (error) {
      logger.error('Job matching failed', { error: error.message, jobSeekerId });
      // Return empty array as fallback
      return [];
    }
  }

  /**
   * Match candidates for job posting
   */
  async matchCandidates(jobId: number): Promise<any[]> {
    try {
      logger.info('Matching candidates for job', { jobId });

      const response = await this.httpClient.get(
        `${this.matchingEngineUrl}/candidates/${jobId}`
      );

      return response.data.candidates || [];
    } catch (error) {
      logger.error('Candidate matching failed', { error: error.message, jobId });
      return [];
    }
  }

  /**
   * Get career advice
   */
  async getCareerAdvice(userId: number, context: string): Promise<CareerAdvice> {
    try {
      logger.info('Getting career advice', { userId });

      const response: AxiosResponse<CareerAdvice> = await this.httpClient.post(
        `${this.careerCoachUrl}/advice`,
        { userId, context }
      );

      return response.data;
    } catch (error) {
      logger.error('Career advice failed', { error: error.message, userId });
      // Return fallback advice
      return {
        advice: "Focus on building relevant skills and networking in your industry.",
        action_items: ["Update your resume", "Connect with professionals on LinkedIn"],
        resources: ["LinkedIn Learning", "Industry conferences"]
      };
    }
  }

  /**
   * Optimize LinkedIn profile
   */
  async optimizeLinkedInProfile(currentHeadline: string, targetRole: string): Promise<any> {
    try {
      logger.info('Optimizing LinkedIn profile');

      const response = await this.httpClient.post(
        `${this.careerCoachUrl}/linkedin-optimize`,
        { current_headline: currentHeadline, target_role: targetRole }
      );

      return response.data;
    } catch (error) {
      logger.error('LinkedIn optimization failed', { error: error.message });
      throw new Error('Failed to optimize LinkedIn profile');
    }
  }

  /**
   * Generate cover letter
   */
  async generateCoverLetter(jobId: number, resumeId: number): Promise<any> {
    try {
      logger.info('Generating cover letter', { jobId, resumeId });

      const response = await this.httpClient.post(
        `${this.careerCoachUrl}/cover-letter`,
        { job_id: jobId, resume_id: resumeId }
      );

      return response.data;
    } catch (error) {
      logger.error('Cover letter generation failed', { error: error.message });
      throw new Error('Failed to generate cover letter');
    }
  }

  /**
   * Analyze skill gaps
   */
  async analyzeSkillGaps(jobSeekerId: number, targetRoles: string[]): Promise<any> {
    try {
      logger.info('Analyzing skill gaps', { jobSeekerId, targetRoles });

      const response = await this.httpClient.get(
        `${this.careerCoachUrl}/skill-gaps/${jobSeekerId}`,
        { params: { roles: targetRoles.join(',') } }
      );

      return response.data;
    } catch (error) {
      logger.error('Skill gap analysis failed', { error: error.message });
      throw new Error('Failed to analyze skill gaps');
    }
  }

  /**
   * Get hiring copilot suggestions
   */
  async getHiringSuggestions(jobDraft: Record<string, any>): Promise<any> {
    try {
      logger.info('Getting hiring suggestions');

      const response = await this.httpClient.post(
        `${this.matchingEngineUrl}/hiring-suggestions`,
        { job_draft: jobDraft }
      );

      return response.data;
    } catch (error) {
      logger.error('Hiring suggestions failed', { error: error.message });
      throw new Error('Failed to get hiring suggestions');
    }
  }

  /**
   * Analyze resume for recruiters
   */
  async analyzeResumeForRecruiter(candidateId: number, jobId?: number): Promise<any> {
    try {
      logger.info('Analyzing resume for recruiter', { candidateId, jobId });

      const response = await this.httpClient.get(
        `${this.resumeParserUrl}/analyze/${candidateId}`,
        { params: { job_id: jobId } }
      );

      return response.data;
    } catch (error) {
      logger.error('Resume analysis failed', { error: error.message });
      throw new Error('Failed to analyze resume');
    }
  }

  /**
   * Health check for AI services
   */
  async healthCheck(): Promise<Record<string, boolean>> {
    const services = [
      { name: 'resume-parser', url: `${this.resumeParserUrl}/health` },
      { name: 'matching-engine', url: `${this.matchingEngineUrl}/health` },
      { name: 'career-coach', url: `${this.careerCoachUrl}/health` },
    ];

    const results: Record<string, boolean> = {};

    for (const service of services) {
      try {
        await this.httpClient.get(service.url, { timeout: 5000 });
        results[service.name] = true;
      } catch (error) {
        logger.warn(`${service.name} health check failed`, { error: error.message });
        results[service.name] = false;
      }
    }

    return results;
  }
}

// Export singleton instance
export const aiService = new AIService();