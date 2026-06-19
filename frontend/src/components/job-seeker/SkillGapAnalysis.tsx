'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Database, ExternalLink, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import type { SkillGap } from '@/hooks/useDashboardProfile';

interface SkillGapAnalysisProps {
  userSkills: string[];
  skillGaps: SkillGap[];
  targetRole: string;
  loading?: boolean;
}

const SEVERITY_CONFIG = {
  critical: { label: 'Critical Gap', barColor: 'bg-ink', textColor: 'text-ink' },
  gap: { label: 'Gap', barColor: 'bg-ink opacity-70', textColor: 'text-ink' },
  'nice-to-have': { label: 'Recommended', barColor: 'bg-hairline', textColor: 'text-body' },
} as const;

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function SkillGapRow({ gap, visible }: { gap: SkillGap; visible: boolean }) {
  const cfg = SEVERITY_CONFIG[gap.severity];

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between type-mono-eyebrow mb-1">
        <span className={`text-ink capitalize`}>{capitalize(gap.skill)}</span>
        <span className={cfg.textColor}>{cfg.label}</span>
      </div>
      <p className="type-mono-caption text-body">
        Required by {gap.frequency}% of your target roles.
      </p>

      {/* Animated frequency bar */}
      <div className="h-1.5 w-full bg-hairline rounded-sm overflow-hidden">
        <div
          className={`h-full rounded-sm transition-all duration-700 ease-out ${cfg.barColor}`}
          style={{ width: visible ? `${gap.frequency}%` : '0%' }}
        />
      </div>

      {/* Course CTA */}
      <a
        href={gap.courseUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 p-2.5 bg-surface-dark rounded-sm border border-hairline hover:border-ink transition-colors group/course mt-2"
      >
        <div className="w-7 h-7 rounded-sm bg-canvas border border-hairline flex items-center justify-center flex-shrink-0">
          <BookOpen className="w-3.5 h-3.5 text-ink" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="type-body-md text-ink font-medium truncate capitalize">{gap.skill}</p>
          <p className="type-mono-caption text-body">Coursera • Search courses</p>
        </div>
        <ExternalLink className="w-3.5 h-3.5 text-body group-hover/course:text-ink transition-colors flex-shrink-0" />
      </a>
    </div>
  );
}

export function SkillGapAnalysis({
  userSkills,
  skillGaps,
  targetRole,
  loading = false,
}: SkillGapAnalysisProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (loading) return <SkeletonCard height="h-56" lines={4} />;

  const visibleGaps = showAll ? skillGaps : skillGaps.slice(0, 3);
  const hasSkills = userSkills.length > 0;
  const hasGaps = skillGaps.length > 0;

  return (
    <div ref={containerRef} className="cf-card p-5 border border-hairline">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="type-display-md text-ink">Skill Gap Analysis</h3>
        <span className="type-mono-caption text-body">
          {targetRole ? `For ${targetRole} roles` : 'Based on job matches'}
        </span>
      </div>

      {/* No skills state */}
      {!hasSkills && (
        <div className="flex flex-col items-center justify-center py-6 gap-3">
          <Database className="w-8 h-8 text-hairline" />
          <p className="type-mono-eyebrow text-body text-center">
            Add your skills to see
            <br />
            personalized gap analysis
          </p>
          <Link
            href="/job-seeker/full-profile"
            className="type-mono-eyebrow text-ink border border-hairline px-3 py-1.5 rounded-sm hover:bg-surface-dark transition-colors"
          >
            Update Profile →
          </Link>
        </div>
      )}

      {/* Has skills but no gaps (user is well-matched) */}
      {hasSkills && !hasGaps && (
        <div className="flex flex-col items-center justify-center py-6 gap-2">
          <div className="w-8 h-8 rounded-sm bg-ink text-on-primary flex items-center justify-center">
            <Database className="w-4 h-4" />
          </div>
          <p className="type-mono-eyebrow text-body text-center">
            Your skills match well with current job listings!
          </p>
          <p className="type-mono-caption text-body text-center">
            Keep an eye on emerging skills as roles evolve.
          </p>
        </div>
      )}

      {/* Gaps list */}
      {hasGaps && (
        <div className="space-y-5">
          {visibleGaps.map((gap) => (
            <SkillGapRow key={gap.skill} gap={gap} visible={visible} />
          ))}

          {skillGaps.length > 3 && (
            <button
              onClick={() => setShowAll((s) => !s)}
              className="w-full type-mono-eyebrow text-body hover:text-ink transition-colors py-2 border-t border-hairline"
            >
              {showAll ? '↑ Show Less' : `↓ View ${skillGaps.length - 3} More`}
            </button>
          )}
        </div>
      )}
    </div>
  );
}