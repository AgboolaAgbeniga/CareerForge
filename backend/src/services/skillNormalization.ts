import { db } from '../utils/database';
import { sql } from 'drizzle-orm';
import logger from '../utils/logger';

interface ExtractedSkill {
  name: string;
  proficiency: number;
  years: number;
  evidence: string;
}

export class SkillNormalizationService {
  /**
   * Normalize skill name to canonical form
   */
  async normalizeSkillName(rawSkill: string): Promise<string | null> {
    const normalized = rawSkill.trim().toLowerCase();

    // Check if exact match exists
    const exactMatch = await db.execute(
      sql`SELECT name FROM skills WHERE LOWER(name) = ${normalized} LIMIT 1`
    );

    if (exactMatch.length > 0 && exactMatch[0]) {
      return exactMatch[0].name as string;
    }

    // Check synonyms table
    const synonym = await db.execute(
      sql`
        SELECT s.name
        FROM skill_synonyms ss
        JOIN skills s ON s.id = ss.canonical_skill_id
        WHERE LOWER(ss.synonym) = ${normalized}
        LIMIT 1
      `
    );

    if (synonym.length > 0 && synonym[0]) {
      return synonym[0].name as string;
    }

    return null;
  }

  /**
   * Normalize and deduplicate skills
   */
  async normalizeSkills(rawSkills: ExtractedSkill[]): Promise<ExtractedSkill[]> {
    const normalized: Map<string, ExtractedSkill> = new Map();

    for (const skill of rawSkills) {
      const canonicalName = await this.normalizeSkillName(skill.name);

      if (!canonicalName) {
        logger.warn(`Could not normalize skill: "${skill.name}"`);
        continue;
      }

      if (normalized.has(canonicalName)) {
        const existing = normalized.get(canonicalName);
        if (existing && (skill.proficiency > existing.proficiency || skill.years > existing.years)) {
          normalized.set(canonicalName, { ...skill, name: canonicalName });
        }
      } else {
        normalized.set(canonicalName, { ...skill, name: canonicalName });
      }
    }

    return Array.from(normalized.values());
  }

  /**
   * Validate skill exists in taxonomy
   */
  async validateSkill(skillName: string): Promise<boolean> {
    const result = await db.execute(
      sql`SELECT id FROM skills WHERE name = ${skillName} LIMIT 1`
    );
    return result.length > 0;
  }

  /**
   * Get skill details
   */
  async getSkillDetails(skillName: string) {
    const result = await db.execute(
      sql`
        SELECT
          s.id,
          s.name,
          s.marketplace_demand,
          s.growth_trend,
          sc.name as category,
          sd.name as domain
        FROM skills s
        LEFT JOIN skill_categories sc ON s.category_id = sc.id
        LEFT JOIN skill_domains sd ON s.domain_id = sd.id
        WHERE s.name = ${skillName}
        LIMIT 1
      `
    );

    return result.length > 0 ? result[0] : null;
  }

  /**
   * Get skill prerequisites
   */
  async getPrerequisites(skillName: string): Promise<Array<{ name: string; minLevel: number }>> {
    const result = await db.execute(
      sql`
        SELECT s.name, sp.min_proficiency as minLevel
        FROM skill_prerequisites sp
        JOIN skills s ON s.id = sp.skill_id
        JOIN skills pr ON pr.id = sp.prerequisite_skill_id
        WHERE s.name = ${skillName}
      `
    );

    return result.map((r: any) => ({
      name: r.name as string,
      minLevel: r.minLevel as number,
    }));
  }

  /**
   * Get related skills
   */
  async getRelatedSkills(skillName: string): Promise<string[]> {
    const result = await db.execute(
      sql`
        SELECT s2.name
        FROM skill_relations sr
        JOIN skills s1 ON s1.id = sr.skill_id
        JOIN skills s2 ON s2.id = sr.related_skill_id
        WHERE s1.name = ${skillName}
      `
    );

    return result.map((r: any) => r.name as string);
  }

  /**
   * Batch normalize and validate skills
   */
  async processExtractedSkills(rawSkills: ExtractedSkill[]): Promise<{
    valid: ExtractedSkill[];
    invalid: Array<{ name: string; reason: string }>;
  }> {
    const normalized = await this.normalizeSkills(rawSkills);
    const valid: ExtractedSkill[] = [];
    const invalid: Array<{ name: string; reason: string }> = [];

    for (const skill of normalized) {
      const isValid = await this.validateSkill(skill.name);

      if (isValid) {
        valid.push(skill);
      } else {
        invalid.push({
          name: skill.name,
          reason: 'Skill not in taxonomy',
        });
      }
    }

    return { valid, invalid };
  }
}

export const skillNormalization = new SkillNormalizationService();
