'use client';

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils/dateUtils';
import { SkeletonAppCard } from '@/components/ui/SkeletonCard';

interface Application {
  id: string;
  status: string;
  appliedAt: string;
  jobTitle: string;
  companyName: string;
  companyLogo?: string;
}

interface ApplicationsTrackerProps {
  applications: Application[];
  viewMode: 'kanban' | 'list';
  setViewMode: (mode: 'kanban' | 'list') => void;
  loading?: boolean;
}

function getFooterInsight(count: number): string {
  if (count === 0) return 'Apply to your first job match to start tracking your pipeline.';
  if (count <= 3) return `You have ${count} active application${count === 1 ? '' : 's'}. Keep the momentum going!`;
  return `${count} active applications. A strong pipeline — keep following up.`;
}

function AppCard({ app }: { app: Application }) {
  return (
    <div className="p-3 rounded-sm border border-hairline bg-canvas hover:bg-surface-dark hover:border-surface-dark transition-colors cursor-pointer group mb-3 last:mb-0">
      <div className="flex items-center gap-3 mb-2">
        {app.companyLogo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={app.companyLogo} alt={app.companyName} className="w-8 h-8 rounded-sm object-cover" />
        ) : (
          <div className="w-8 h-8 rounded-sm bg-ink text-on-primary flex items-center justify-center type-mono-caption flex-shrink-0">
            {app.companyName ? app.companyName.substring(0, 1).toUpperCase() : '?'}
          </div>
        )}
        <div className="overflow-hidden flex-1">
          <h4 className="type-body-md text-ink truncate font-medium">{app.companyName || 'Unknown Company'}</h4>
          <p className="type-mono-caption text-body truncate">{app.jobTitle || 'Unknown Role'}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <span className="type-mono-caption text-body">
          {formatRelativeTime(new Date(app.appliedAt))}
        </span>
        <ArrowRight className="w-3 h-3 text-body group-hover:text-ink transition-colors" />
      </div>
    </div>
  );
}

export function ApplicationsTracker({
  applications,
  viewMode,
  setViewMode,
  loading = false,
}: ApplicationsTrackerProps) {
  const applied = applications.filter((a) => ['pending', 'reviewing'].includes(a.status));
  const interviewing = applications.filter((a) => a.status === 'interview');
  const offers = applications.filter((a) => a.status === 'accepted');

  const footerInsight = getFooterInsight(applications.length);

  return (
    <div className="cf-card border border-hairline overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-hairline bg-surface flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="type-display-md text-ink">Applications</h3>
          <span className="bg-ink text-canvas type-mono-label px-1.5 py-0.5 rounded-sm">
            {applications.length} Active
          </span>
        </div>
        <div className="flex type-mono-label bg-canvas p-1 border border-hairline rounded-sm">
          {(['kanban', 'list'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1 rounded-sm capitalize transition-colors ${
                viewMode === mode ? 'bg-ink text-on-primary' : 'text-body hover:text-ink hover:bg-surface-dark'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Kanban columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-hairline bg-canvas">
        {/* Applied */}
        <div className="p-4 min-h-[160px]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-sm bg-ink" />
            <span className="type-mono-eyebrow text-body">Applied</span>
          </div>
          {loading ? (
            <><SkeletonAppCard /><SkeletonAppCard /></>
          ) : applied.length > 0 ? (
            applied.map((a) => <AppCard key={a.id} app={a} />)
          ) : (
            <p className="type-mono-caption text-body text-center py-4">No applications yet</p>
          )}
        </div>

        {/* Interviewing */}
        <div className="p-4 bg-surface-dark min-h-[160px]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-sm bg-accent-periwinkle animate-pulse" />
            <span className="type-mono-eyebrow text-ink">Interviewing</span>
          </div>
          {loading ? (
            <SkeletonAppCard />
          ) : interviewing.length > 0 ? (
            interviewing.map((a) => <AppCard key={a.id} app={a} />)
          ) : (
            <p className="type-mono-caption text-body text-center py-4">No interviews yet</p>
          )}
        </div>

        {/* Offer */}
        <div className="p-4 min-h-[160px]">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 rounded-sm bg-accent-mint" />
            <span className="type-mono-eyebrow text-body">Offer</span>
          </div>
          {loading ? (
            <SkeletonAppCard />
          ) : offers.length > 0 ? (
            offers.map((a) => <AppCard key={a.id} app={a} />)
          ) : (
            <div className="flex items-center justify-center h-20 border border-dashed border-hairline rounded-sm">
              <span className="type-mono-caption text-body">Your first offer awaits</span>
            </div>
          )}
        </div>
      </div>

      {/* AI Insight footer — dynamic copy */}
      <div className="px-4 py-2 bg-ink text-on-primary flex justify-between items-center">
        <div className="flex items-center gap-2 type-mono-caption">
          <Sparkles className="w-3 h-3 text-accent-mint flex-shrink-0" />
          <span className="font-medium text-accent-mint">AI Insight:</span>
          <span className="text-on-primary/80">{footerInsight}</span>
        </div>
        {applications.length > 0 && (
          <button className="hover:opacity-80 type-mono-caption text-accent-periwinkle whitespace-nowrap ml-2">
            View Analysis
          </button>
        )}
      </div>
    </div>
  );
}