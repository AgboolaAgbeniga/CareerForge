'use client';

import React from 'react';
import { Icon } from '@iconify/react';

interface RecentShortlistsProps {
  applications?: any[];
}

export function RecentShortlists({ applications = [] }: RecentShortlistsProps) {
  return (
    <section className="bg-canvas border-hairline shadow-none rounded-sm overflow-hidden flex flex-col h-full">
      <div className="p-5 border-b-hairline flex justify-between items-center">
        <h2 className="text-[10px] font-mono text-ink uppercase tracking-[0.08px] font-bold">
          Recent Shortlists
        </h2>
        <button
          className="text-slate-400 hover:text-white transition-colors"
          title="Export"
        >
          <Icon icon="lucide:download" width={14} />
        </button>
      </div>
      <div className="p-2 flex-1">
        <div className="space-y-2">
          {applications.length === 0 ? (
            <div className="text-center p-4 text-[10px] font-mono text-body uppercase tracking-[0.08px]">
              No recent shortlists
            </div>
          ) : applications.map((item, index) => {
            const initials = item.name
              ? item.name
                .split(' ')
                .map((n: string) => n[0])
                .join('')
                .toUpperCase()
              : '??';
            return (
              <div
                key={item.id || index}
                className="bg-canvas-dark p-3 rounded-sm border-hairline flex justify-between items-center group hover:border-primary transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-sm bg-canvas border-hairline flex items-center justify-center text-[10px] font-mono text-ink">
                    {initials}
                  </div>
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-[0.08px] text-ink font-bold">
                      {item.name}
                    </h4>
                    <p className="text-[10px] font-mono uppercase tracking-[0.08px] text-body opacity-80 mt-0.5">
                      {item.title || item.jobTitle || 'Candidate'}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    className="text-slate-400 hover:text-white p-1"
                    title="Contact"
                  >
                    <Icon icon="lucide:mail" width={14} />
                  </button>
                  <button
                    className="text-slate-400 hover:text-red-400 p-1"
                    title="Remove"
                  >
                    <Icon icon="lucide:trash-2" width={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="p-3 border-t-hairline text-center">
        <button className="w-full py-1.5 text-[10px] font-mono uppercase tracking-[0.08px] text-on-primary bg-primary hover:opacity-90 rounded-sm transition-opacity flex items-center justify-center gap-2">
          <Icon icon="lucide:mail" width={12} />
          Contact All
        </button>
      </div>
    </section>
  );
}