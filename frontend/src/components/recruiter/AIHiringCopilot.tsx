'use client';

import React from 'react';
import { Icon } from '@iconify/react';

interface AIHiringCopilotProps {}

export function AIHiringCopilot({}: AIHiringCopilotProps) {
  return (
    <section className="bg-canvas rounded-sm overflow-hidden border-hairline relative">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-canvas-dark rounded-full blur-3xl pointer-events-none"></div>

      <div className="p-5 border-b-hairline bg-canvas-dark">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-primary flex items-center justify-center shadow-none animate-pulse-slow">
            <Icon
              icon="lucide:sparkles"
              width={16}
              className="text-on-primary"
            />
          </div>
          <h2 className="text-base font-display text-ink tracking-tight">
            AI Hiring Copilot
          </h2>
        </div>
      </div>

      <div className="p-5 space-y-4">
        <div className="bg-canvas border-hairline rounded-sm p-3 shadow-none">
          <div className="flex gap-3">
            <Icon
              icon="lucide:zap"
              width={16}
              className="text-primary shrink-0 mt-0.5"
            />
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.08px] text-body leading-relaxed mb-2">
                Your "Sr. Product Designer" job description is missing 2
                key skills trending in the market:{' '}
                <span className="text-ink font-bold">
                  Motion Design
                </span>{' '}
                and{' '}
                <span className="text-ink font-bold">WebGL</span>.
              </p>
              <p className="text-[10px] font-mono uppercase tracking-[0.08px] text-primary mb-2">
                Adding these could increase candidate quality by 20%.
              </p>
              <button className="text-[10px] font-mono uppercase tracking-[0.08px] bg-primary hover:opacity-90 text-on-primary px-3 py-1.5 rounded-sm transition-opacity shadow-none w-full flex justify-center items-center gap-2">
                Apply AI Fix <Icon icon="lucide:wand-2" width={12} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-canvas border-hairline rounded-sm p-3">
          <div className="flex gap-3">
            <Icon
              icon="lucide:alert-circle"
              width={16}
              className="text-primary shrink-0 mt-0.5"
            />
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.08px] text-body leading-relaxed">
                Candidate{' '}
                <span className="text-ink font-bold">
                  Michael T.
                </span>{' '}
                is at risk of competing offers. He's been active on 3
                other platforms today.
              </p>
              <button className="mt-2 text-[10px] font-mono uppercase tracking-[0.08px] text-ink underline decoration-body underline-offset-2 hover:decoration-ink transition-all">
                Schedule Interview Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}