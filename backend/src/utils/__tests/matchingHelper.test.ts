import { calculateSkillOverlap } from '../matchingHelper';

describe('calculateSkillOverlap', () => {
  it('should return score 100 and empty list when job requires no skills', () => {
    const result1 = calculateSkillOverlap(['Node.js', 'React'], []);
    const result2 = calculateSkillOverlap(['Node.js', 'React'], null);
    const result3 = calculateSkillOverlap(['Node.js', 'React'], undefined);

    expect(result1.score).toBe(100);
    expect(result1.matchedSkills).toEqual([]);
    expect(result2.score).toBe(100);
    expect(result3.score).toBe(100);
  });

  it('should return score 0 and empty list when candidate has no skills', () => {
    const result1 = calculateSkillOverlap([], ['React', 'Node.js']);
    const result2 = calculateSkillOverlap(null, ['React', 'Node.js']);
    const result3 = calculateSkillOverlap(undefined, ['React', 'Node.js']);

    expect(result1.score).toBe(0);
    expect(result1.matchedSkills).toEqual([]);
    expect(result2.score).toBe(0);
    expect(result3.score).toBe(0);
  });

  it('should match skills case-insensitively', () => {
    const result = calculateSkillOverlap(
      ['react', 'node.js', 'typescript'],
      ['React', 'NODE.JS']
    );

    expect(result.score).toBe(100);
    expect(result.matchedSkills).toEqual(['React', 'NODE.JS']);
  });

  it('should match sub-strings bidirectionally', () => {
    // Case 1: Job skill is substring of user skill ("React" is in "React.js")
    const result1 = calculateSkillOverlap(['React.js', 'Python'], ['React', 'Python']);
    expect(result1.score).toBe(100);
    expect(result1.matchedSkills).toEqual(['React', 'Python']);

    // Case 2: User skill is substring of job skill ("Postgres" is in "PostgreSQL")
    const result2 = calculateSkillOverlap(['Postgres', 'React'], ['PostgreSQL', 'React']);
    expect(result2.score).toBe(100);
    expect(result2.matchedSkills).toEqual(['PostgreSQL', 'React']);
  });

  it('should compute the correct overlap score percentage', () => {
    // 2 out of 4 skills match -> 50%
    const result = calculateSkillOverlap(
      ['React', 'TypeScript', 'Docker', 'AWS'],
      ['React', 'Node.js', 'TypeScript', 'Kubernetes']
    );

    expect(result.score).toBe(50);
    expect(result.matchedSkills).toEqual(['React', 'TypeScript']);
  });

  it('should handle whitespaces and empty values gracefully', () => {
    const result = calculateSkillOverlap(
      [' React ', ' ', 'TypeScript'],
      ['react', 'typescript', '']
    );

    expect(result.score).toBe(100);
    expect(result.matchedSkills).toEqual(['react', 'typescript']);
  });
});
