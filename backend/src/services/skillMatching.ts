import { db } from '../utils/database';
import { sql } from 'drizzle-orm';
import { skillNormalization } from './skillNormalization';

interface SkillMatch {
  skillName: string;
  matchType: 'exact' | 'related' | 'partial';
  matchScore: number;
  evidence?: string;
}

interface JobMatchResult {
  jobId: string;
  matchScore: number;
  matchedSkills: number;
  requiredSkills: number;
  missingSkills: SkillMatch[];
  partialMatches: SkillMatch[];
  overallFit: 'excellent' | 'good' | 'moderate' | 'poor';
}

export class SkillMatchingService {
  /**
   * Calculate match score between candidate skills and job requirements
   */
  async matchCandidateToJob(
    userId: string,
    jobId: string
  ): Promise<JobMatchResult> {
    // Get candidate skills
    const candidateSkills = await db.execute(
      sql`
        SELECT se.skill_id, s.name, se.proficiency_level
        FROM skill_endorsements se
        JOIN skills s ON s.id = se.skill_id
        WHERE se.user_id = ${userId}
        ORDER BY se.proficiency_level DESC
      `
    );

    // Get job requirements
    const jobRequirements = await db.execute(
      sql`
        SELECT rsr.skill_id, s.name, rsr.proficiency_required, rsr.importance
        FROM role_skill_requirements rsr
        JOIN skills s ON s.id = rsr.skill_id
        WHERE rsr.role_name = 'Full-Stack Engineer'
      `
    );

    const candidateSkillMap = new Map(
      candidateSkills.map((s: any) => [s.name, s])
    );
    let matchedCount = 0;
    const missingSkills: SkillMatch[] = [];
    const partialMatches: SkillMatch[] = [];

    for (const req of jobRequirements as any[]) {
      const candidateSkill = candidateSkillMap.get(req.name as string);

      if (candidateSkill) {
        if (candidateSkill.proficiency_level >= (req.proficiency_required as number)) {
          matchedCount++;
        } else {
          partialMatches.push({
            skillName: req.name as string,
            matchType: 'partial',
            matchScore: candidateSkill.proficiency_level / (req.proficiency_required as number),
          });
        }
      } else {
        missingSkills.push({
          skillName: req.name as string,
          matchType: 'exact',
          matchScore: 0,
        });
      }
    }

    const matchScore =
      (matchedCount + partialMatches.length * 0.5) / (jobRequirements.length || 1);
    const overallFit =
      matchScore >= 0.8
        ? 'excellent'
        : matchScore >= 0.6
        ? 'good'
        : matchScore >= 0.4
        ? 'moderate'
        : 'poor';

    return {
      jobId,
      matchScore,
      matchedSkills: matchedCount,
      requiredSkills: jobRequirements.length,
      missingSkills,
      partialMatches,
      overallFit,
    };
  }

  /**
   * Find top candidates for a job
   */
  async findTopCandidatesForJob(
    jobId: string,
    limit: number = 50
  ): Promise<Array<{ userId: string; matchScore: number; matchDetails: JobMatchResult }>> {
    const candidates = await db.execute(
      sql`
        SELECT DISTINCT se.user_id
        FROM skill_endorsements se
        LIMIT 1000
      `
    );

    const results: Array<{ userId: string; matchScore: number; matchDetails: JobMatchResult }> = [];

    for (const item of candidates as any[]) {
      const userId = item.user_id as string;
      const match = await this.matchCandidateToJob(userId, jobId);
      results.push({
        userId,
        matchScore: match.matchScore,
        matchDetails: match,
      });
    }

    return results.sort((a, b) => b.matchScore - a.matchScore).slice(0, limit);
  }

  /**
   * Calculate skill gaps for career advancement
   */
  async getSkillGapsForRole(userId: string, targetRole: string) {
    const currentSkills = await db.execute(
      sql`
        SELECT s.name, se.proficiency_level
        FROM skill_endorsements se
        JOIN skills s ON s.id = se.skill_id
        WHERE se.user_id = ${userId}
      `
    );

    const roleRequirements = await db.execute(
      sql`
        SELECT s.name, rsr.proficiency_required, rsr.importance
        FROM role_skill_requirements rsr
        JOIN skills s ON s.id = rsr.skill_id
        WHERE rsr.role_name = ${targetRole}
        ORDER BY rsr.importance ASC
      `
    );

    const skillMap = new Map(
      currentSkills.map((s: any) => [s.name, s.proficiency_level])
    );
    const gaps = [];

    for (const req of roleRequirements as any[]) {
      const currentLevel = skillMap.get(req.name as string) || 0;
      const requiredLevel = req.proficiency_required as number;

      if (currentLevel < requiredLevel) {
        gaps.push({
          skill: req.name,
          currentLevel,
          requiredLevel,
          gap: requiredLevel - currentLevel,
          importance: req.importance,
        });
      }
    }

    return gaps.sort((a: any, b: any) => {
      if (a.importance !== b.importance) {
        return a.importance - b.importance;
      }
      return b.gap - a.gap;
    });
  }
}

export const skillMatching = new SkillMatchingService();
