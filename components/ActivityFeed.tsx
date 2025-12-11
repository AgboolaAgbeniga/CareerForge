'use client';

import React from 'react';
import { Bell, FileCheck, Briefcase, Eye } from 'lucide-react';
import { formatRelativeTime } from '../lib/dateUtils';

interface ActivityFeedProps {
  notifications: any[];
  setNotifications: (notifications: any[]) => void;
}

export function ActivityFeed({ notifications, setNotifications }: ActivityFeedProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
      <div className="p-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-700/50 flex justify-between items-center">
        <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
          Activity Feed
        </h3>
        <button
          className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wide hover:text-gray-900 dark:hover:text-gray-100"
          onClick={() => setNotifications([])}
        >
          Clear
        </button>
      </div>
      <div className="divide-y divide-gray-50 dark:divide-gray-700 max-h-60 overflow-y-auto">
        {notifications.map((notif, index) => (
          <div
            key={index}
            className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex gap-3"
          >
            <div className="mt-0.5 relative">
              <notif.icon className={`w-4 h-4 ${notif.color}`} />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-900 dark:text-gray-100">
                {notif.title}
              </p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">
                {notif.desc}
              </p>
              <span className="text-[10px] text-gray-400 dark:text-gray-500 block mt-1">
                {notif.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}