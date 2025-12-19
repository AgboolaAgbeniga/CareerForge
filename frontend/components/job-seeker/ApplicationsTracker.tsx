'use client';

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface ApplicationsTrackerProps {
  applications: any[];
  viewMode: 'kanban' | 'list';
  setViewMode: (mode: 'kanban' | 'list') => void;
}

export function ApplicationsTracker({ applications, viewMode, setViewMode }: ApplicationsTrackerProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
      <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Applications
          </h3>
          <span className="bg-gray-900 dark:bg-gray-700 text-white text-[10px] px-1.5 py-0.5 rounded-md font-medium">
            3 Active
          </span>
        </div>
        <div className="flex text-xs font-medium bg-gray-200/50 dark:bg-gray-600/50 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('kanban')}
            className={`px-3 py-1 rounded ${viewMode === 'kanban' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'}`}
          >
            Kanban
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-3 py-1 rounded ${viewMode === 'list' ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'}`}
          >
            List
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-700 bg-white dark:bg-gray-800">
        {/* Column 1: Applied */}
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Applied
            </span>
          </div>
          {/* Card */}
          <div className="p-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded bg-black text-white flex items-center justify-center font-bold text-xs">
                U
              </div>
              <div className="overflow-hidden">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
                  Uber
                </h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">
                  Product Mgr, Driver Exp
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-[10px] text-gray-400 dark:text-gray-500">
                2d ago
              </span>
              <ArrowRight className="w-3 h-3 text-gray-300 dark:text-gray-600 group-hover:text-blue-500 transition-colors" />
            </div>
          </div>
        </div>

        {/* Column 2: Interviewing */}
        <div className="p-4 space-y-3 bg-indigo-50/30 dark:bg-indigo-900/20">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></div>
            <span className="text-xs font-semibold text-indigo-900 dark:text-indigo-100 uppercase tracking-wider">
              Interviewing
            </span>
          </div>
          {/* Card */}
          <div className="p-3 rounded-xl border border-indigo-200 dark:border-indigo-700 bg-white dark:bg-gray-700 shadow-sm cursor-pointer hover:shadow-md transition-all relative">
            <div
              className="absolute top-3 right-3 w-2 h-2 rounded-full bg-red-500 border border-white dark:border-gray-800"
              title="Action Needed"
            ></div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded bg-[#635BFF] text-white flex items-center justify-center font-bold text-xs">
                S
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                  Stripe
                </h4>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">
                  Technical Product Mgr
                </p>
              </div>
            </div>
            <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-600">
              <p className="text-[10px] font-medium text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                <span>Tomorrow, 2:00 PM</span>
              </p>
            </div>
          </div>
        </div>

        {/* Column 3: Offer/Pending */}
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Offer
            </span>
          </div>
          <div className="flex items-center justify-center h-20 border-2 border-dashed border-gray-100 dark:border-gray-600 rounded-xl">
            <span className="text-[10px] text-gray-400 dark:text-gray-500">
              Drag to move here
            </span>
          </div>
        </div>
      </div>

      {/* AI Insight Footer */}
      <div className="px-4 py-2 bg-indigo-900 dark:bg-indigo-800 text-white flex justify-between items-center text-xs">
        <div className="flex items-center gap-2">
          <span>AI Insight:</span> Your response
          time is excellent (avg 2hrs).
        </div>
        <button className="hover:underline opacity-80">
          View Analysis
        </button>
      </div>
    </div>
  );
}