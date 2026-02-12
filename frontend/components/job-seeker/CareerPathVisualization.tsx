'use client';

import React from 'react';
import { Map, Calendar } from 'lucide-react';
// import { formatCurrency } from '@/lib/currencyUtils';

interface CareerPathVisualizationProps {}

export function CareerPathVisualization({}: CareerPathVisualizationProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border-l-4 border-l-indigo-500 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-indigo-50 dark:bg-indigo-900 rounded-md">
            <Map className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100">
            Projected Career Path
          </h3>
        </div>
        <button className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-medium">
          View Full Roadmap
        </button>
      </div>

      <div className="relative">
        {/* Horizontal Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 dark:bg-gray-700 -translate-y-1/2 z-0 hidden md:block"></div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
          {/* Step 1: Current */}
          <div className="flex flex-col md:items-center text-left md:text-center group">
            <div className="w-8 h-8 rounded-full bg-gray-900 dark:bg-gray-700 text-white flex items-center justify-center text-xs font-bold ring-4 ring-white dark:ring-gray-800 shadow-sm mb-3">
              NOW
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 p-3 rounded-xl w-full hover:border-gray-300 dark:hover:border-gray-500 transition-colors">
              <p className="text-xs font-bold text-gray-900 dark:text-gray-100">
                Product Manager
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">
                Current Role
              </p>
            </div>
          </div>

          {/* Step 2: Next */}
          <div className="flex flex-col md:items-center text-left md:text-center group">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold ring-4 ring-white dark:ring-gray-800 shadow-sm mb-3 animate-pulse">
              1y
            </div>
            <div className="bg-indigo-50 dark:bg-indigo-900 border border-indigo-200 dark:border-indigo-700 p-3 rounded-xl w-full shadow-sm">
              <p className="text-xs font-bold text-indigo-900 dark:text-indigo-100">
                Senior PM
              </p>
              <p className="text-[10px] text-indigo-600 dark:text-indigo-400">
                Goal • +$25,000 salary
              </p>
            </div>
          </div>

          {/* Step 3: Future */}
          <div className="flex flex-col md:items-center text-left md:text-center group opacity-60 hover:opacity-100 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-500 text-gray-400 dark:text-gray-500 flex items-center justify-center text-xs font-bold ring-4 ring-white dark:ring-gray-800 mb-3">
              3y
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-3 rounded-xl w-full border-dashed">
              <p className="text-xs font-bold text-gray-700 dark:text-gray-300">
                Group PM
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">
                Requires: Leadership
              </p>
            </div>
          </div>

          {/* Step 4: Long Term */}
          <div className="flex flex-col md:items-center text-left md:text-center group opacity-40 hover:opacity-100 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 text-gray-300 dark:text-gray-600 flex items-center justify-center text-xs font-bold ring-4 ring-white dark:ring-gray-800 mb-3">
              5y
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 p-3 rounded-xl w-full border-dashed">
              <p className="text-xs font-bold text-gray-700 dark:text-gray-300">
                Director of Product
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400">
                Strategic Role
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}