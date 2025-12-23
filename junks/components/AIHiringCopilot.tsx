'use client';

import React from 'react';
import { Icon } from '@iconify/react';

interface AIHiringCopilotProps {}

export function AIHiringCopilot({}: AIHiringCopilotProps) {
  return (
    <section className="glass-panel rounded-xl overflow-hidden border border-indigo-500/30 relative">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="p-5 border-b border-indigo-500/20 bg-gradient-to-r from-indigo-900/20 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.5)] animate-pulse-slow">
            <Icon
              icon="lucide:sparkles"
              width={16}
              className="text-white"
            />
          </div>
          <h2 className="text-base font-semibold text-white tracking-tight">
            AI Hiring Copilot
          </h2>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-lg p-3">
          <div className="flex gap-3">
            <Icon
              icon="lucide:zap"
              width={16}
              className="text-indigo-400 shrink-0 mt-0.5"
            />
            <div>
              <p className="text-xs text-indigo-100 leading-relaxed mb-2">
                Your "Sr. Product Designer" job description is missing 2
                key skills trending in the market:{' '}
                <span className="text-white font-medium">
                  Motion Design
                </span>{' '}
                and{' '}
                <span className="text-white font-medium">WebGL</span>.
              </p>
              <p className="text-[10px] text-indigo-400 mb-2">
                Adding these could increase candidate quality by 20%.
              </p>
              <button className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded-md transition-colors shadow-lg shadow-indigo-500/20 font-medium w-full flex justify-center items-center gap-2">
                Apply AI Fix <Icon icon="lucide:wand-2" width={12} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/5 rounded-lg p-3">
          <div className="flex gap-3">
            <Icon
              icon="lucide:alert-circle"
              width={16}
              className="text-amber-400 shrink-0 mt-0.5"
            />
            <div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Candidate{' '}
                <span className="text-white font-medium">
                  Michael T.
                </span>{' '}
                is at risk of competing offers. He's been active on 3
                other platforms today.
              </p>
              <button className="mt-2 text-xs text-white underline decoration-slate-500 underline-offset-2 hover:decoration-white transition-all">
                Schedule Interview Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}