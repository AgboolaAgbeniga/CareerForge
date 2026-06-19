'use client';

import React from 'react';

interface ResumeAnalysisProps {}

export function ResumeAnalysis({}: ResumeAnalysisProps) {
  return (
    <div className="bg-canvas border-hairline p-5 rounded-sm shadow-none">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[10px] font-mono text-body uppercase tracking-[0.08px]">
          Resume Strength
        </h3>
        <span className="px-2 py-0.5 rounded-sm text-[10px] font-mono uppercase tracking-[0.08px] bg-primary text-on-primary">
          STRONG
        </span>
      </div>

      <div className="flex items-center gap-6 mb-4">
        {/* Radar Chart SVG */}
        <div className="relative w-24 h-24 flex-shrink-0">
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full transform -rotate-90"
          >
            {/* Background Pentagon */}
            <polygon
              points="50,10 90,40 75,90 25,90 10,40"
              fill="none"
              stroke="#1e293b"
              strokeWidth="1"
            />
            <polygon
              points="50,25 70,40 62.5,65 37.5,65 30,40"
              fill="none"
              stroke="#1e293b"
              strokeWidth="1"
            />
            {/* Data Polygon */}
            <polygon
              points="50,15 85,40 70,85 30,80 15,45"
              fill="rgba(99, 102, 241, 0.2)"
              stroke="#818cf8"
              strokeWidth="2"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center text-[10px] font-mono uppercase tracking-[0.08px] text-ink">
            85%
          </div>
        </div>
        <div className="space-y-3 flex-1">
          <div>
            <div className="flex justify-between text-[10px] font-mono text-body uppercase tracking-[0.08px] mb-1">
              <span>ATS Score</span>
              <span className="text-ink">88/100</span>
            </div>
            <div className="h-1.5 w-full bg-canvas-dark rounded-sm overflow-hidden border-hairline">
              <div className="h-full bg-primary w-[88%]"></div>
            </div>
          </div>
          <p className="text-[10px] font-mono text-body uppercase tracking-[0.08px] leading-tight">
            Your resume is optimized for{' '}
            <span className="text-ink font-bold">Tech Lead</span> roles.
          </p>
        </div>
      </div>
    </div>
  );
}