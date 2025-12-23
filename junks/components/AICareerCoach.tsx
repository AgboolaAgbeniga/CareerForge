'use client';

import React from 'react';
import { Sparkles, Bot } from 'lucide-react';

interface AICareerCoachProps {}

export function AICareerCoach({}: AICareerCoachProps) {
  return (
    <div className="rounded-2xl relative bg-white dark:bg-gray-800 p-[1px] shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl opacity-20"></div>
      <div className="relative rounded-2xl bg-white dark:bg-gray-800 p-5 h-full flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded bg-gradient-to-r from-indigo-500 to-purple-500">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h2 className="font-bold text-gray-900 dark:text-gray-100">
            AI Career Coach
          </h2>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/50 rounded-xl p-4 border border-indigo-100 dark:border-indigo-700 mb-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-800 flex items-center justify-center flex-shrink-0">
              <Bot className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="space-y-2">
              <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                I noticed you're targeting{' '}
                <span className="font-semibold">Senior PM</span> roles.
                Your resume lacks metric-driven results in the
                "Strategy" section.
              </p>
              <button className="text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 bg-white dark:bg-gray-700 border border-indigo-200 dark:border-indigo-600 px-3 py-1.5 rounded-lg shadow-sm hover:bg-indigo-50 dark:hover:bg-indigo-900 transition-colors">
                Auto-Fix Resume
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <button className="w-full text-left p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all group">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Optimize LinkedIn Headline
              </span>
              <div className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-indigo-500" />
            </div>
          </button>
          <button className="w-full text-left p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-all group">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                Draft Cover Letter for Stripe
              </span>
              <div className="w-4 h-4 text-gray-400 dark:text-gray-500 group-hover:text-indigo-500" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}