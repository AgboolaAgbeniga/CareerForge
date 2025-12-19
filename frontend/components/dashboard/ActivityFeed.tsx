'use client';

import React from 'react';
import { Bell, FileCheck, Briefcase, Eye } from 'lucide-react';
import { formatRelativeTime } from '@/lib/dateUtils';

interface Activity {
  id: string;
  type: 'application' | 'view' | 'match' | 'message';
  title: string;
  description: string;
  timestamp: Date;
  unread: boolean;
}

interface ActivityFeedProps {
  activities: Activity[];
}

export function ActivityFeed({ activities }: ActivityFeedProps) {
  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'application':
        return <FileCheck className="w-4 h-4 text-emerald-400" />;
      case 'view':
        return <Eye className="w-4 h-4 text-blue-400" />;
      case 'match':
        return <Briefcase className="w-4 h-4 text-purple-400" />;
      case 'message':
        return <Bell className="w-4 h-4 text-amber-400" />;
      default:
        return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <section className="glass-panel rounded-xl overflow-hidden flex flex-col h-full">
      <div className="p-5 border-b border-white/5">
        <h2 className="text-base font-semibold text-white tracking-tight">
          Recent Activity
        </h2>
      </div>
      <div className="p-2 flex-1 overflow-y-auto">
        <div className="space-y-1">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={`p-3 rounded-lg transition-colors group cursor-pointer border border-transparent hover:border-white/5 ${
                activity.unread ? 'bg-indigo-500/5 border-l-4 border-l-indigo-500/50' : 'hover:bg-white/5'
              }`}
            >
              <div className="flex gap-3">
                <div className="flex-none mt-0.5">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-medium truncate ${
                    activity.unread ? 'text-white' : 'text-slate-200 group-hover:text-white'
                  }`}>
                    {activity.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">
                    {activity.description}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    {formatRelativeTime(activity.timestamp)}
                  </p>
                </div>
                {activity.unread && (
                  <div className="flex-none">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}