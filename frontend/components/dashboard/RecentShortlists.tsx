'use client';

import React from 'react';
import { Icon } from '@iconify/react';

interface RecentShortlistsProps {}

export function RecentShortlists({}: RecentShortlistsProps) {
  return (
    <section className="glass-panel rounded-xl overflow-hidden flex flex-col h-full">
      <div className="p-5 border-b border-white/5 flex justify-between items-center">
        <h2 className="text-base font-semibold text-white tracking-tight">
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
          {[
            {
              initials: 'EL',
              name: 'Elena Lewis',
              title: 'Sr. Backend • 95% Match',
            },
            {
              initials: 'JD',
              name: 'John Doe',
              title: 'Prod. Mktg • 88% Match',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white/[0.03] p-3 rounded-lg border border-white/5 flex justify-between items-center group"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-semibold text-white">
                  {item.initials}
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white">
                    {item.name}
                  </h4>
                  <p className="text-[10px] text-slate-500">
                    {item.title}
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
          ))}
        </div>
      </div>
      <div className="p-3 border-t border-white/5 text-center">
        <button className="w-full py-1.5 text-xs font-medium text-white bg-white/5 hover:bg-white/10 rounded-md transition-colors border border-white/5 flex items-center justify-center gap-2">
          <Icon icon="lucide:mail" width={12} />
          Contact All
        </button>
      </div>
    </section>
  );
}