'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { formatRelativeTime } from '@/lib/utils/dateUtils';

interface Job {
  id: string;
  title: string;
  location: string;
  postedDays: number;
  matches: number;
  views: number;
  status: 'open' | 'draft';
}

interface ActiveJobsProps {
  jobs: Job[];
}

export function ActiveJobs({ jobs }: ActiveJobsProps) {
  return (
    <section className="bg-canvas border-hairline rounded-sm overflow-hidden flex flex-col h-full shadow-none">
      <div className="p-5 border-b-hairline flex justify-between items-center">
        <h2 className="text-base font-display text-ink tracking-tight">
          Active Jobs
        </h2>
        <a
          href="#"
          className="text-[10px] font-mono uppercase tracking-[0.08px] text-primary hover:opacity-90"
        >
          View All
        </a>
      </div>
      <div className="p-2 flex-1">
        <div className="space-y-1">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-3 rounded-sm hover:bg-canvas-dark transition-colors group cursor-pointer border-hairline border-transparent hover:border-hairline"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-sm font-display text-ink group-hover:opacity-90">
                    {job.title}
                  </h4>
                  <p className="text-[10px] font-mono uppercase tracking-[0.08px] text-body">
                    {job.location} • Posted{' '}
                    {formatRelativeTime(
                      new Date(
                        Date.now() -
                          job.postedDays * 24 * 60 * 60 * 1000
                      )
                    )}
                  </p>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-sm text-[10px] font-mono uppercase tracking-[0.08px] ${
                    job.status === 'open'
                      ? 'bg-primary text-on-primary border-hairline'
                      : 'bg-canvas-dark text-body border-hairline'
                  }`}
                >
                  {job.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.08px] text-body">
                <span className="flex items-center gap-1">
                  <Icon
                    icon="lucide:users"
                    width={12}
                    className="text-primary"
                  />
                  {job.matches} Matches
                </span>
                <span className="flex items-center gap-1">
                  <Icon
                    icon="lucide:eye"
                    width={12}
                    className="text-body"
                  />
                  {job.views} Views
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}