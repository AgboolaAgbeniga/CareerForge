'use client';

import React from 'react';
import { KPICard } from './KPICard';

interface KPICardsProps {
  applicationsCount?: number;
  activeJobsCount?: number;
}

export function KPICards({ applicationsCount = 0, activeJobsCount = 0 }: KPICardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Active Jobs */}
      <KPICard
        title="Active Jobs"
        value={activeJobsCount}
        icon="lucide:briefcase"
        change="+12%"
        trend="up"
        color="indigo"
        delay={0.1}
      />

      {/* Candidates Matched -> Mapped to Total Applications in previous code, keeping logic but fixing label if needed, 
          Actually previous code labeled it 'Total Applications' but title comment said 'Candidates Matched'. 
          I will stick to 'Total Applications' to match the data being passed. */}
      <KPICard
        title="Total Applications"
        value={applicationsCount}
        icon="lucide:users"
        change={`+${applicationsCount}`}
        trend="up"
        color="purple"
        delay={0.2}
        footer={
          <>
            Your average match score is{' '}
            <span className="text-purple-400 font-medium">82%</span>.
          </>
        }
      />

      {/* Shortlisted */}
      <KPICard
        title="Shortlisted"
        value="48"
        icon="lucide:star"
        change="Active"
        trend="neutral"
        color="amber"
        delay={0.3}
        footer={
          <div className="w-full bg-slate-800 h-1 mt-1 rounded-full overflow-hidden">
            <div className="bg-amber-500 h-full w-[45%] rounded-full"></div>
          </div>
        }
      />

      {/* Time-to-Hire */}
      <KPICard
        title="Time-to-Hire"
        value="18d"
        icon="lucide:clock"
        change="-2 days"
        trend="up"
        color="teal"
        delay={0.4}
      />
    </div>
  );
}
