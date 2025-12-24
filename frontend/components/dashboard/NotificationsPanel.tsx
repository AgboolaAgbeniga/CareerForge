'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { formatRelativeTime } from '@/lib/utils/dateUtils';

interface NotificationsPanelProps {
  notifications?: any[];
}

export function NotificationsPanel({ notifications = [] }: NotificationsPanelProps) {
  return (
    <section className="glass-panel rounded-xl overflow-hidden flex flex-col max-h-[400px]">
      <div className="p-4 border-b border-white/5 flex justify-between items-center">
        <h2 className="text-sm font-semibold text-white tracking-tight">
          Notifications
        </h2>
        <span className="text-[10px] bg-rose-500 text-white px-1.5 py-0.5 rounded-full">
          3 new
        </span>
      </div>
      <div className="overflow-y-auto p-2 space-y-1">
        {(notifications.length > 0 ? notifications : [
          {
            type: 'match',
            message: '5 new candidates matched for "Backend Engineer".',
            createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
          },
          {
            type: 'system',
            message: 'Job posting "Marketing Lead" is now Live.',
            createdAt: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
          },
          {
            type: 'message',
            message: 'Sarah Chen replied to your message.',
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          },
        ]).map((notif, index) => {
          const typeMap: Record<string, { icon: string; color: string }> = {
            match: { icon: 'user-plus', color: 'indigo' },
            system: { icon: 'check-circle', color: 'emerald' },
            message: { icon: 'message-square', color: 'amber' },
            default: { icon: 'bell', color: 'slate' },
          };
          const style = typeMap[notif.type || 'default'] || typeMap.default;

          return (
            <div
              key={notif.id || index}
              className={`p-3 rounded-lg ${index === 0 ? 'bg-white/5 border-l-2 border-indigo-500 hover:bg-white/10' : 'hover:bg-white/5'} transition-colors cursor-pointer`}
            >
              <div className="flex gap-3">
                <div className="mt-0.5">
                  <Icon
                    icon={`lucide:${style.icon}`}
                    width={14}
                    className={`text-${style.color}-400`}
                  />
                </div>
                <div>
                  <p className="text-xs text-slate-200">
                    {notif.message}
                  </p>
                  <p className="text-[10px] text-slate-500 mt-1">
                    {formatRelativeTime(new Date(notif.createdAt || Date.now()))}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-2 border-t border-white/5 text-center">
        <button className="text-[10px] text-slate-400 hover:text-white transition-colors">
          Mark all as read
        </button>
      </div>
    </section>
  );
}