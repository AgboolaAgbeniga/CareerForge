import { useMemo } from 'react';
import { useUser } from './queries/useAuth';
import { useJobSeekerDashboard } from './queries/useDashboard';
import { useMyResumes } from './queries/useProfile';

export interface ChecklistItem {
  label: string;
  done: boolean;
  href: string;
}

export interface SkillGap {
  skill: string;
  /** Percentage of top matched jobs requiring this skill (0–100) */
  frequency: number;
  severity: 'critical' | 'gap' | 'nice-to-have';
  courseUrl: string;
}

export interface AtsScore {
  score: number;
  label: string;
  keywordMatchPct: number;
  improvements: string[];
  topKeywords: string[];
}

function normalizeSkill(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function userHasSkill(userSkills: string[], skill: string) {
  const target = normalizeSkill(skill);
  return userSkills.some((u) => {
    const n = normalizeSkill(u);
    return n === target || n.includes(target) || target.includes(n);
  });
}

function computeSkillGaps(
  userSkills: string[],
  jobMatches: any[]
): SkillGap[] {
  if (!jobMatches.length || !userSkills) return [];

  const skillFreq: Record<string, number> = {};
  const top = jobMatches.slice(0, 10);

  top.forEach((job) => {
    const skills: string[] = Array.isArray(job.skills) ? job.skills : [];
    skills.forEach((s) => {
      const key = s.toLowerCase();
      if (!userHasSkill(userSkills, s)) {
        skillFreq[key] = (skillFreq[key] || 0) + 1;
      }
    });
  });

  return Object.entries(skillFreq)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([skill, count], i) => {
      const frequency = Math.round((count / top.length) * 100);
      const severity: SkillGap['severity'] =
        i < 2 ? 'critical' : i < 5 ? 'gap' : 'nice-to-have';
      const query = encodeURIComponent(skill);
      return {
        skill,
        frequency,
        severity,
        courseUrl: `https://www.coursera.org/search?query=${query}`,
      };
    });
}

function inferNextRole(title: string): { oneYear: string; threeYear: string; fiveYear: string } {
  const t = title.toLowerCase();
  if (t.includes('director') || t.includes('vp') || t.includes('head')) {
    return { oneYear: 'VP / Head of Department', threeYear: 'C-Suite Executive', fiveYear: 'Industry Leader' };
  }
  if (t.includes('senior') || t.includes('lead')) {
    return { oneYear: 'Principal / Staff Level', threeYear: 'Director', fiveYear: 'VP' };
  }
  if (t.includes('manager')) {
    return { oneYear: 'Senior Manager', threeYear: 'Director', fiveYear: 'VP' };
  }
  // Generic step-up
  return { oneYear: `Senior ${title}`, threeYear: `Lead ${title}`, fiveYear: 'Director / Head of Function' };
}

export function useProfileStats() {
  const { data: user, isLoading: userLoading } = useUser();
  const { data: dashboardData, isLoading: dashboardLoading } = useJobSeekerDashboard();
  const { data: resumes, isLoading: resumesLoading } = useMyResumes();

  const isLoading = userLoading || dashboardLoading || resumesLoading;

  const profile = user?.profile as any;
  const jobMatches: any[] = dashboardData?.jobMatches || [];

  // ── Resume data ──────────────────────────────────────────────────────────────
  const activeResume = useMemo(() => {
    if (!resumes || !Array.isArray(resumes)) return null;
    return resumes.find((r: any) => r.isActive) ?? resumes[0] ?? null;
  }, [resumes]);

  const hasResume = !!activeResume;

  const resumeFileName = useMemo(() => {
    const url: string = profile?.resumeFileUrl || activeResume?.originalFileUrl || '';
    if (!url) return null;
    const parts = url.split('/');
    const raw = parts[parts.length - 1] ?? '';
    // Strip uuid prefix added during upload: "{userId}/{timestamp}-{filename}"
    const cleaned = raw.replace(/^\d+-/, '').replace(/_/g, ' ');
    return cleaned || 'Resume';
  }, [profile?.resumeFileUrl, activeResume]);

  // ── Completion ───────────────────────────────────────────────────────────────
  const profileCompletion: number = profile?.profileCompletionPercentage ?? 0;

  // ── Skills & gaps ────────────────────────────────────────────────────────────
  const skills: string[] = profile?.skills ?? [];
  const skillGaps = useMemo(
    () => computeSkillGaps(skills, jobMatchesData),
    [skills, jobMatchesData]
  );

  // ── Role info ────────────────────────────────────────────────────────────────
  const currentRole: string = profile?.title ?? '';
  const targetRole: string = profile?.preferences?.desiredRole ?? '';

  const careerPath = useMemo(() => {
    const base = targetRole || currentRole;
    if (!base) return null;
    return inferNextRole(base);
  }, [targetRole, currentRole]);

  // ── Checklist ────────────────────────────────────────────────────────────────
  const checklistItems: ChecklistItem[] = useMemo(() => [
    {
      label: 'Upload Resume',
      done: hasResume,
      href: '#upload',
    },
    {
      label: 'Add Work Experience',
      done: Array.isArray(profile?.experience) && profile.experience.length > 0,
      href: '/job-seeker/full-profile',
    },
    {
      label: 'Add Skills',
      done: skills.length > 0,
      href: '/job-seeker/full-profile',
    },
    {
      label: 'Add Education',
      done: Array.isArray(profile?.educationHistory) && profile.educationHistory.length > 0,
      href: '/job-seeker/full-profile',
    },
    {
      label: 'Add Certifications',
      done: Array.isArray(profile?.certifications) && profile.certifications.length > 0,
      href: '/job-seeker/full-profile',
    },
  ], [hasResume, profile, skills.length]);

  const extractData = (field: any, defaultVal: any) => {
    if (!field) return defaultVal;
    if (field.error) return defaultVal;
    return field;
  };

  const applicationsData = extractData(dashboardData?.applications, []);
  const jobMatchesData = extractData(dashboardData?.jobMatches, []);
  const notificationsData = extractData(dashboardData?.notifications, []);

  // ── Top job match ─────────────────────────────────────────────────────────────
  const topJobMatch = jobMatchesData[0] ?? null;

  // ── Completion label ──────────────────────────────────────────────────────────
  const completionLabel =
    profileCompletion >= 80 ? 'Expert' :
    profileCompletion >= 60 ? 'Advanced' :
    profileCompletion >= 40 ? 'Intermediate' : 'Beginner';

  return {
    isLoading,
    profileCompletion,
    completionLabel,
    hasResume,
    resumeFileName,
    activeResumeId: activeResume?.id ?? null,
    currentRole,
    targetRole,
    careerPath,
    skills,
    skillGaps,
    checklistItems,
    topJobMatch,
    user,
    profile,
    jobMatches: jobMatchesData,
    applications: applicationsData,
    activities: notificationsData,
    errors: {
      applications: dashboardData?.applications?.error ? dashboardData.applications.message : null,
      jobMatches: dashboardData?.jobMatches?.error ? dashboardData.jobMatches.message : null,
      activities: dashboardData?.notifications?.error ? dashboardData.notifications.message : null,
    }
  };
}
