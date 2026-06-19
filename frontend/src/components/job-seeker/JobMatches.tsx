'use client';

import React, { useState, useMemo } from 'react';
import { Check, Zap, Briefcase, Loader2 } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils/dateUtils';
import Button from '@/components/ui/Button';
import { SkeletonJobCard } from '@/components/ui/SkeletonCard';
import { useApplyToJob } from '@/hooks/queries/useDashboard';
import { toast } from 'sonner';
import { useCountUp } from '@/hooks/useCountUp';

interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  matchScore: number;
  skills: string[];
  salaryMin?: number;
  salaryMax?: number;
  postedAt: string;
}

interface JobMatchesProps {
  matches: JobMatch[];
  loading?: boolean;
}

type FilterKey = 'all' | 'remote' | 'full-time' | 'part-time';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'remote', label: 'Remote' },
  { key: 'full-time', label: 'Full-time' },
  { key: 'part-time', label: 'Part-time' },
];

function MatchRing({ score }: { score: number }) {
  const animated = useCountUp(score, 700);
  const r = 16;
  const circ = 2 * Math.PI * r;
  return (
    <div className="relative w-10 h-10 flex items-center justify-center flex-shrink-0">
      <svg className="w-10 h-10 transform -rotate-90 absolute inset-0">
        <circle cx="20" cy="20" r={r} stroke="currentColor" strokeWidth="2" fill="transparent" className="text-hairline" />
        <circle
          cx="20" cy="20" r={r}
          stroke="currentColor" strokeWidth="2" fill="transparent"
          strokeDasharray={circ}
          strokeDashoffset={circ - (animated / 100) * circ}
          className="text-ink"
          style={{ transition: 'stroke-dashoffset 0.7s ease-out' }}
        />
      </svg>
      <span className="type-mono-caption text-ink font-medium z-10">{animated}%</span>
    </div>
  );
}

function JobCard({ job }: { job: JobMatch }) {
  const applyMutation = useApplyToJob();
  const isPending = applyMutation.isPending;

  const handleApply = () => {
    applyMutation.mutate(
      {
        jobId: job.id,
        optimisticApp: {
          id: job.id,
          status: 'pending',
          appliedAt: new Date().toISOString(),
          jobTitle: job.title,
          companyName: job.company,
        },
      },
      {
        onSuccess: () => toast.success(`Applied to ${job.title} at ${job.company}!`),
        onError: () => toast.error('Failed to apply. Please try again.'),
      }
    );
  };

  return (
    <div className="group cf-card p-5 hover:bg-surface-dark transition-all relative">
      {/* Match ring */}
      <div className="absolute top-5 right-5">
        <MatchRing score={job.matchScore} />
      </div>

      {/* Company + role */}
      <div className="flex gap-4 mb-4 pr-12">
        <div className="w-12 h-12 rounded-sm bg-ink text-on-primary flex items-center justify-center type-mono-caption text-[14px] flex-shrink-0">
          {job.company ? job.company.substring(0, 1).toUpperCase() : '?'}
        </div>
        <div>
          <h3 className="type-body-md font-medium text-ink group-hover:underline transition-colors">
            {job.title}
          </h3>
          <p className="type-mono-caption text-body flex items-center gap-1 mt-1">
            {job.company} • {job.location}
          </p>
        </div>
      </div>

      {/* Skill tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(job.skills || []).slice(0, 3).map((skill, i) => (
          <span key={i} className="px-2 py-1 bg-surface-dark border border-hairline rounded-sm type-mono-caption text-body">
            {skill}
          </span>
        ))}
        {job.matchScore >= 80 && (
          <span className="px-2 py-1 bg-ink text-on-primary rounded-sm type-mono-caption flex items-center gap-1">
            <Check className="w-2.5 h-2.5" /> High Match
          </span>
        )}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-hairline">
        <span className="type-mono-caption text-body">
          {formatRelativeTime(new Date(job.postedAt))}
        </span>
        <Button
          variant="primary"
          className="!px-3 !py-1.5 !min-h-0 text-[11px] leading-[11px] opacity-0 group-hover:opacity-100 transition-all"
          onClick={handleApply}
          disabled={isPending}
        >
          {isPending ? (
            <><Loader2 className="w-3 h-3 animate-spin inline mr-1" />Applying…</>
          ) : 'Apply Now'}
        </Button>
      </div>
    </div>
  );
}

export function JobMatches({ matches, loading = false }: JobMatchesProps) {
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return matches;
    return matches.filter((j) => {
      const t = (j.type || j.location || '').toLowerCase();
      if (activeFilter === 'remote') return t.includes('remote');
      if (activeFilter === 'full-time') return t.includes('full');
      if (activeFilter === 'part-time') return t.includes('part');
      return true;
    });
  }, [matches, activeFilter]);

  return (
    <div>
      {/* Section header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="type-display-md text-ink">Top Recommended Matches</h2>
        <div className="flex gap-1 bg-canvas border border-hairline p-1 rounded-sm">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-3 py-1 rounded-sm type-mono-caption transition-colors ${
                activeFilter === f.key
                  ? 'bg-ink text-on-primary'
                  : 'text-body hover:text-ink hover:bg-surface-dark'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <>
            <SkeletonJobCard />
            <SkeletonJobCard />
            <SkeletonJobCard />
            <SkeletonJobCard />
          </>
        ) : filtered.length > 0 ? (
          filtered.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <div className="col-span-2 flex flex-col items-center justify-center py-10 gap-3">
            <Briefcase className="w-8 h-8 text-hairline" />
            <p className="type-mono-eyebrow text-body text-center">
              {matches.length === 0
                ? 'Complete your profile to get personalised job recommendations'
                : `No ${activeFilter} matches found`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
