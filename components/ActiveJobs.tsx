'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { formatRelativeTime } from '../lib/dateUtils';

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
    <section className="glass-panel rounded-xl overflow-hidden flex flex-col h-full">
      <div className="p-5 border-b border-white/5 flex justify-between items-center">
        <h2 className="text-base font-semibold text-white tracking-tight">
          Active Jobs
        </h2>
        <a
          href="#"
          className="text-xs text-indigo-400 hover:text-indigo-300"
        >
          View All
        </a>
      </div>
      <div className="p-2 flex-1">
        <div className="space-y-1">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-3 rounded-lg hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="text-sm font-medium text-slate-200 group-hover:text-white">
                    {job.title}
                  </h4>
                  <p className="text-xs text-slate-500">
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
                  className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                    job.status === 'open'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-slate-700/50 text-slate-400 border border-slate-700'
                  }`}
                >
                  {job.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <Icon
                    icon="lucide:users"
                    width={12}
                    className="text-indigo-400"
                  />
                  {job.matches} Matches
                </span>
                <span className="flex items-center gap-1">
                  <Icon
                    icon="lucide:eye"
                    width={12}
                    className="text-slate-500"
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