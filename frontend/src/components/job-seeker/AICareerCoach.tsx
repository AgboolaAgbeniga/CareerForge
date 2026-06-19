'use client';

import React from 'react';
import { Sparkles, Bot, ChevronRight, UploadCloud, User } from 'lucide-react';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import Link from 'next/link';

interface AICareerCoachProps {
  currentRole: string;
  targetRole: string;
  topMatch: { title: string; company: string; matchScore: number } | null;
  hasResume: boolean;
  loading?: boolean;
}

interface QuickAction {
  label: string;
  href: string;
  external?: boolean;
}

function getCoachInsight(
  currentRole: string,
  targetRole: string,
  topMatch: AICareerCoachProps['topMatch'],
  hasResume: boolean
): string {
  if (!hasResume) {
    return 'Upload your resume to unlock your first AI career insight tailored to your background.';
  }
  if (!targetRole && !currentRole) {
    return 'Set your current role and target role in your profile to receive personalised coaching.';
  }
  if (topMatch && topMatch.matchScore >= 70) {
    return `You're targeting ${targetRole || currentRole} roles. Your top match is ${topMatch.company} with a ${topMatch.matchScore}% fit — strong signal you're competitive in this space.`;
  }
  if (targetRole) {
    return `You're targeting ${targetRole} roles. Strengthen your profile by adding metric-driven results to your experience section to improve match scores.`;
  }
  return `Great start as a ${currentRole}. Add a target role to your profile to unlock a tailored coaching roadmap.`;
}

function getQuickActions(
  currentRole: string,
  targetRole: string,
  topMatch: AICareerCoachProps['topMatch'],
  hasResume: boolean
): QuickAction[] {
  if (!hasResume) {
    return [
      { label: 'Upload Resume', href: '#upload' },
      { label: 'Complete Profile', href: '/job-seeker/full-profile' },
    ];
  }
  const company = topMatch?.company || 'top match';
  const role = targetRole || currentRole || 'target role';
  return [
    { label: `Optimize for ${role}`, href: '/job-seeker/full-profile' },
    {
      label: `Draft Cover Letter for ${company}`,
      href: `https://chatgpt.com/?q=${encodeURIComponent(`Write a cover letter for ${role} at ${company}`)}`,
      external: true,
    },
    { label: 'Optimize LinkedIn Headline', href: '/job-seeker/full-profile' },
  ];
}

export function AICareerCoach({
  currentRole,
  targetRole,
  topMatch,
  hasResume,
  loading = false,
}: AICareerCoachProps) {
  const insight = getCoachInsight(currentRole, targetRole, topMatch, hasResume);
  const actions = getQuickActions(currentRole, targetRole, topMatch, hasResume);

  if (loading) return <SkeletonCard height="h-56" lines={4} />;

  return (
    <div className="cf-card p-5 relative flex flex-col h-full border border-hairline group hover:border-ink transition-colors">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 rounded-sm bg-ink text-on-primary">
          <Sparkles className="w-4 h-4" />
        </div>
        <h2 className="type-display-md text-ink">AI Career Coach</h2>
      </div>

      {/* Insight bubble */}
      <div className="bg-surface-dark rounded-sm p-4 border border-hairline mb-4">
        <div className="flex gap-3">
          <div className="w-8 h-8 rounded-full bg-canvas border border-hairline flex items-center justify-center flex-shrink-0">
            <Bot className="w-4 h-4 text-ink" />
          </div>
          <div className="space-y-3">
            <p className="type-body-md text-ink leading-relaxed">{insight}</p>
            {hasResume && (
              <Link
                href="/job-seeker/full-profile"
                className="inline-block type-mono-button text-[12px] text-ink bg-canvas border border-hairline px-3 py-1.5 rounded-sm hover:bg-hairline transition-colors"
              >
                View Profile →
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="space-y-1 mt-auto">
        {actions.map((action) =>
          action.external ? (
            <a
              key={action.label}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-left p-3 rounded-sm hover:bg-surface-dark border border-transparent hover:border-hairline transition-colors group/btn flex justify-between items-center"
            >
              <span className="type-mono-caption text-ink">{action.label}</span>
              <ChevronRight className="w-4 h-4 text-body group-hover/btn:text-ink transition-colors" />
            </a>
          ) : (
            <Link
              key={action.label}
              href={action.href}
              className="w-full text-left p-3 rounded-sm hover:bg-surface-dark border border-transparent hover:border-hairline transition-colors group/btn flex justify-between items-center"
            >
              <span className="type-mono-caption text-ink">{action.label}</span>
              <ChevronRight className="w-4 h-4 text-body group-hover/btn:text-ink transition-colors" />
            </Link>
          )
        )}
      </div>
    </div>
  );
}