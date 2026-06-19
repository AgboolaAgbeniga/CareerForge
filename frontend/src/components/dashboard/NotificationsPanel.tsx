'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { formatRelativeTime } from '@/lib/utils/dateUtils';

interface NotificationsPanelProps {
  notifications?: any[];
}

export function NotificationsPanel({ notifications = [] }: NotificationsPanelProps) {
  return (
    <section className="bg-canvas border-hairline shadow-none rounded-sm overflow-hidden flex flex-col max-h-[400px]">
      <div className="p-4 border-b-hairline flex justify-between items-center">
        <h2 className="text-[10px] font-mono text-ink uppercase tracking-[0.08px] font-bold">
          Notifications
        </h2>
        <span className="text-[10px] font-mono uppercase tracking-[0.08px] bg-primary text-on-primary px-1.5 py-0.5 rounded-sm">
          3 new
        </span>
      </div>
      <div className="overflow-y-auto p-2 space-y-1">
        {notifications.length === 0 ? (
          <div className="text-center p-4 text-[10px] font-mono text-body uppercase tracking-[0.08px]">
            No new notifications
          </div>
        ) : notifications.map((notif, index) => {
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
              className={`p-3 rounded-sm group ${index === 0 ? 'bg-canvas-dark border-l-2 border-primary hover:bg-canvas-dark' : 'border-hairline border-transparent hover:border-hairline hover:bg-canvas-dark'} transition-colors cursor-pointer`}
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
                  <p className="text-[10px] font-mono uppercase tracking-[0.08px] text-body group-hover:text-ink">
                    {notif.message}
                  </p>
                  <p className="text-[10px] font-mono uppercase tracking-[0.08px] text-body opacity-80 mt-1">
                    {formatRelativeTime(new Date(notif.createdAt || Date.now()))}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-2 border-t-hairline text-center">
        <button className="text-[10px] font-mono uppercase tracking-[0.08px] text-primary hover:opacity-90 transition-opacity">
          Mark all as read
        </button>
      </div>
    </section>
  );
}