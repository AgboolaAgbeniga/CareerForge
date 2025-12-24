'use client';

import React from 'react';
import { Icon } from '@iconify/react';

interface KPICardsProps {
  applicationsCount?: number;
  activeJobsCount?: number;
}

export function KPICards({ applicationsCount = 0, activeJobsCount = 0 }: KPICardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Active Jobs */}
      <div className="glass-panel p-5 rounded-xl group hover:border-indigo-500/30 transition-colors relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Icon icon="lucide:briefcase" width={48} />
        </div>
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Icon icon="lucide:briefcase" width={18} />
          </div>
          <span className="text-xs font-medium text-emerald-400 flex items-center gap-1 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
            +12% <Icon icon="lucide:arrow-up-right" width={10} />
          </span>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-slate-500 font-medium">Active Jobs</p>
          <h3 className="text-2xl font-semibold text-white tracking-tight">
            {activeJobsCount}
          </h3>
        </div>
      </div>

      {/* Candidates Matched */}
      <div className="glass-panel p-5 rounded-xl group hover:border-purple-500/30 transition-colors relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Icon icon="lucide:users" width={48} />
        </div>
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20">
            <Icon icon="lucide:users" width={18} />
          </div>
          <span className="text-xs font-medium text-emerald-400 flex items-center gap-1 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
            +{applicationsCount} <Icon icon="lucide:user-plus" width={10} />
          </span>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-slate-500 font-medium">
            Total Applications
          </p>
          <h3 className="text-2xl font-semibold text-white tracking-tight">
            {applicationsCount}
          </h3>
        </div>
        <div className="mt-3 text-xs text-slate-500">
          Your average match score is{' '}
          <span className="text-purple-400 font-medium">82%</span>.
        </div>
      </div>

      {/* Shortlisted */}
      <div className="glass-panel p-5 rounded-xl group hover:border-amber-500/30 transition-colors relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Icon icon="lucide:star" width={48} />
        </div>
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Icon icon="lucide:star" width={18} />
          </div>
          <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
            Active
          </span>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-slate-500 font-medium">Shortlisted</p>
          <h3 className="text-2xl font-semibold text-white tracking-tight">
            48
          </h3>
        </div>
        <div className="w-full bg-slate-800 h-1 mt-4 rounded-full overflow-hidden">
          <div className="bg-amber-500 h-full w-[45%] rounded-full"></div>
        </div>
      </div>

      {/* Time-to-Hire */}
      <div className="glass-panel p-5 rounded-xl group hover:border-teal-500/30 transition-colors relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
          <Icon icon="lucide:clock" width={48} />
        </div>
        <div className="flex justify-between items-start mb-4">
          <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <Icon icon="lucide:clock" width={18} />
          </div>
          <span className="text-xs font-medium text-emerald-400 flex items-center gap-1 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
            -2 days
          </span>
        </div>
        <div className="space-y-1">
          <p className="text-sm text-slate-500 font-medium">Time-to-Hire</p>
          <h3 className="text-2xl font-semibold text-white tracking-tight">
            18d
          </h3>
        </div>
      </div>
    </div>
  );
}
