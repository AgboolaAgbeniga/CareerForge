'use client';

import React from 'react';
import { Bell, FileCheck, Briefcase, Eye } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils/dateUtils';

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
        return <FileCheck className="w-4 h-4 text-ink" />;
      case 'view':
        return <Eye className="w-4 h-4 text-ink" />;
      case 'match':
        return <Briefcase className="w-4 h-4 text-ink" />;
      case 'message':
        return <Bell className="w-4 h-4 text-ink" />;
      default:
        return <Bell className="w-4 h-4 text-body" />;
    }
  };

  return (
    <section className="cf-card flex flex-col h-full">
      <div className="p-5 border-b border-hairline">
        <h2 className="type-display-md text-ink">
          Recent Activity
        </h2>
      </div>
      <div className="p-2 flex-1 overflow-y-auto">
        <div className="space-y-1">
          {activities.length > 0 ? activities.map((activity) => (
            <div
              key={activity.id}
              className={`p-3 rounded-sm transition-colors group cursor-pointer border border-transparent hover:border-hairline hover:bg-surface-dark ${
                activity.unread ? 'bg-surface-dark border-l-2 border-l-ink' : ''
              }`}
            >
              <div className="flex gap-3">
                <div className="flex-none mt-0.5">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className={`type-mono-caption truncate ${
                    activity.unread ? 'text-ink font-bold' : 'text-body group-hover:text-ink'
                  }`}>
                    {activity.title}
                  </h4>
                  <p className="type-mono-caption text-body mt-1 line-clamp-2">
                    {activity.description}
                  </p>
                  <p className="type-mono-caption text-body opacity-80 mt-2">
                    {formatRelativeTime(activity.timestamp)}
                  </p>
                </div>
                {activity.unread && (
                  <div className="flex-none">
                    <div className="w-2 h-2 bg-ink rounded-sm"></div>
                  </div>
                )}
              </div>
            </div>
          )) : (
            <div className="p-4 text-center type-mono-caption text-body">
              No recent activity
            </div>
          )}
        </div>
      </div>
    </section>
  );
}