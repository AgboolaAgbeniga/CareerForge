'use client';

import React, { useRef } from 'react';
import { FileText, TrendingUp, UploadCloud, ArrowRight, AlertCircle } from 'lucide-react';
import Button from '@/components/ui/Button';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { useCountUp } from '@/hooks/useCountUp';

interface ResumeHealthCardProps {
  resumeScore: number | null;
  resumeFileName: string | null;
  keywordMatchPct?: number;
  label?: string;
  improvements?: string[];
  loading?: boolean;
  onUploadClick?: () => void;
}

const RING_CIRCUMFERENCE = 264; // 2π × r(42)

function getRingLabel(score: number) {
  if (score >= 80) return 'Strong';
  if (score >= 60) return 'Good';
  return 'Needs Work';
}

export function ResumeHealthCard({
  resumeScore,
  resumeFileName,
  keywordMatchPct = 0,
  improvements = [],
  loading = false,
  onUploadClick,
}: ResumeHealthCardProps) {
  const hasResume = resumeScore !== null;
  const animatedScore = useCountUp(hasResume ? resumeScore : 0, 900);
  const animatedKeyword = useCountUp(keywordMatchPct, 700);
  const scoreLabel = hasResume ? getRingLabel(resumeScore) : '';

  const strokeDashoffset = RING_CIRCUMFERENCE - (animatedScore / 100) * RING_CIRCUMFERENCE;
  const keywordWidth = `${animatedKeyword}%`;

  if (loading) return <SkeletonCard height="h-52" withCircle lines={2} />;

  // ── Empty state ───────────────────────────────────────────────────────────
  if (!hasResume) {
    return (
      <div className="cf-card p-6 flex flex-col justify-between gap-4 relative overflow-hidden group">
        <div>
          <h3 className="type-display-md text-ink flex items-center gap-2">
            Resume Health
          </h3>
          <p className="type-mono-eyebrow text-body mt-1">ATS Score</p>
        </div>

        <label
          className="flex flex-col items-center justify-center gap-3 border-2 border-dashed border-hairline rounded-sm p-6 cursor-pointer hover:border-ink hover:bg-surface-dark transition-all group/upload"
          onClick={onUploadClick}
        >
          <div className="w-10 h-10 rounded-sm bg-ink text-on-primary flex items-center justify-center group-hover/upload:scale-105 transition-transform">
            <UploadCloud className="w-5 h-5" />
          </div>
          <div className="text-center">
            <p className="type-mono-eyebrow text-ink">Upload your resume</p>
            <p className="type-mono-caption text-body mt-1">PDF or DOCX to get your ATS score</p>
          </div>
        </label>

        {improvements.length === 0 && (
          <div className="flex items-start gap-2 bg-surface-dark rounded-sm p-3 border border-hairline">
            <AlertCircle className="w-3.5 h-3.5 text-body mt-0.5 flex-shrink-0" />
            <p className="type-mono-caption text-body leading-snug">
              <span className="text-ink font-medium uppercase">ATS Tip:</span> Recruiters filter by
              keywords. Upload your resume to see how you score.
            </p>
          </div>
        )}
      </div>
    );
  }

  // ── Loaded state ─────────────────────────────────────────────────────────
  return (
    <div className="cf-card p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
        <FileText className="w-32 h-32 text-ink -rotate-12 transform translate-x-8 -translate-y-8" />
      </div>

      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <h3 className="type-display-md text-ink flex items-center gap-2">
            Resume Health
            <span className="bg-ink text-on-primary type-mono-eyebrow px-2 py-0.5 rounded-sm">
              {scoreLabel}
            </span>
          </h3>
          {resumeFileName && (
            <p className="type-mono-eyebrow text-body mt-2 truncate max-w-[180px]" title={resumeFileName}>
              {resumeFileName}
            </p>
          )}
        </div>
        <Button
          variant="outline"
          className="!px-3 !py-1.5 !min-h-0 text-[11px] leading-[11px]"
          onClick={onUploadClick}
        >
          Analyze New
        </Button>
      </div>

      <div className="flex items-center gap-8 relative z-10">
        {/* Animated ATS Ring */}
        <div className="relative w-24 h-24 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              className="text-hairline"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
            />
            <circle
              className="text-ink"
              strokeWidth="8"
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="type-display-md text-ink tracking-tight">{animatedScore}</span>
            <span className="type-mono-eyebrow text-body">ATS</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="flex-1 space-y-4">
          <div>
            <div className="flex justify-between type-mono-eyebrow text-body mb-2">
              <span>Keywords Match</span>
              <span className="text-ink">{animatedKeyword}%</span>
            </div>
            <div className="h-2 bg-hairline rounded-sm overflow-hidden">
              <div
                className="h-full bg-ink rounded-sm transition-all duration-700 ease-out"
                style={{ width: keywordWidth }}
              />
            </div>
          </div>

          {improvements.length > 0 && (
            <div className="flex items-start gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-ink mt-0.5 flex-shrink-0" />
              <p className="type-mono-caption text-body leading-snug">
                {improvements[0]}
              </p>
            </div>
          )}

          {improvements.length === 0 && (
            <div className="flex items-center gap-2 type-mono-eyebrow text-body">
              <TrendingUp className="w-3.5 h-3.5 text-ink" />
              <span className="lowercase">Your resume is well-structured</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}