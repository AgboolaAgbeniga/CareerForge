'use client';

import React from 'react';
import { Database } from 'lucide-react';

interface SkillGapAnalysisProps {}

export function SkillGapAnalysis({}: SkillGapAnalysisProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
          Skill Gap Analysis
        </h3>
        <span className="text-[10px] text-gray-500 dark:text-gray-400">
          Based on job matches
        </span>
      </div>

      <div className="space-y-4">
        {/* Skill 1 */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium text-gray-900 dark:text-gray-100">
              SQL Data Analysis
            </span>
            <span className="text-red-500 font-medium">
              Critical Gap
            </span>
          </div>
          <p className="text-[10px] text-gray-500 dark:text-gray-400 mb-2">
            Required for 80% of your target roles.
          </p>
          <div className="flex items-center gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600">
            <div className="w-8 h-8 rounded bg-white dark:bg-gray-800 flex items-center justify-center border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-400">
              <Database className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-gray-900 dark:text-gray-100">
                Advanced SQL for PMs
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">
                Coursera • 4 weeks
              </p>
            </div>
            <button className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
              Enroll
            </button>
          </div>
        </div>

        {/* Skill 2 */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="font-medium text-gray-900 dark:text-gray-100">
              A/B Testing
            </span>
            <span className="text-yellow-600 font-medium">Gap</span>
          </div>
          <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mt-1">
            <div
              className="h-full bg-yellow-400 rounded-full"
              style={{ width: '30%' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}