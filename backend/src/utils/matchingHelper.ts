/**
 * Utility to calculate bidirectional case-insensitive skill overlap between a job seeker and a job requirement.
 * Returns a score between 0 and 100, and a list of matched skills.
 */
export function calculateSkillOverlap(
  jobSeekerSkills: string[] | null | undefined,
  jobSkills: string[] | null | undefined
): { score: number; matchedSkills: string[] } {
  if (!jobSkills || jobSkills.length === 0) {
    return { score: 100, matchedSkills: [] };
  }
  if (!jobSeekerSkills || jobSeekerSkills.length === 0) {
    return { score: 0, matchedSkills: [] };
  }

  const lowerJobSkills = jobSkills.map(s => s.trim().toLowerCase()).filter(Boolean);
  const lowerUserSkills = jobSeekerSkills.map(s => s.trim().toLowerCase()).filter(Boolean);

  if (lowerJobSkills.length === 0) {
    return { score: 100, matchedSkills: [] };
  }

  // Bidirectional case-insensitive match
  // A skill is matched if:
  // - a user skill includes a job skill (e.g. user has "react.js", job requires "react")
  // - a job skill includes a user skill (e.g. user has "postgres", job requires "postgresql")
  const matchedSkills = jobSkills.filter((origJobSkill) => {
    const js = origJobSkill.trim().toLowerCase();
    if (!js) return false;
    return lowerUserSkills.some(us => us.includes(js) || js.includes(us));
  });

  const score = Math.round((matchedSkills.length / lowerJobSkills.length) * 100);

  return {
    score: Math.max(0, Math.min(100, score)),
    matchedSkills
  };
}
