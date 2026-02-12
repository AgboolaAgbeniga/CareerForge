'use client';

import React from 'react';
import { FileText, TrendingUp } from 'lucide-react';

interface ResumeHealthCardProps {
  resumeScore: number;
}

export function ResumeHealthCard({ resumeScore }: ResumeHealthCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 relative overflow-hidden group shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <FileText className="w-32 h-32 text-indigo-600 -rotate-12 transform translate-x-8 -translate-y-8" />
      </div>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            Resume Health
            <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
              Strong
            </span>
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Product_Manager_v4.pdf
          </p>
        </div>
        <button className="text-xs font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300 bg-indigo-50 dark:bg-indigo-900 px-3 py-1.5 rounded-lg transition-colors">
          Analyze New
        </button>
      </div>

      <div className="flex items-center gap-8">
        {/* Circular Chart */}
        <div className="relative w-24 h-24 flex-shrink-0">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="text-gray-100 dark:text-gray-700"
              strokeWidth="8"
              stroke="currentColor"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
            />
            <circle
              className="text-indigo-600 progress-ring__circle"
              strokeWidth="8"
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="42"
              cx="50"
              cy="50"
              strokeDasharray="264"
              strokeDashoffset={264 - (resumeScore / 100) * 264}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
              {resumeScore}
            </span>
            <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-semibold">
              ATS
            </span>
          </div>
        </div>

        {/* Metrics */}
        <div className="flex-1 space-y-4">
          <div>
            <div className="flex justify-between text-xs mb-1.5">
              <span className="text-gray-600 dark:text-gray-400 font-medium">
                Keywords Match
              </span>
              <span className="text-gray-900 dark:text-gray-100 font-bold">
                92%
              </span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                style={{ width: '92%' }}
              ></div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
            <TrendingUp className="w-3.5 h-3.5 text-green-500" />
            <span>Score improved by 5 pts this week</span>
          </div>
        </div>
      </div>
    </div>
  );
}