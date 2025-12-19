'use client';

import React from 'react';
import { Icon } from '@iconify/react';
import { formatRelativeTime } from '@/lib/dateUtils';

interface NotificationsPanelProps {}

export function NotificationsPanel({}: NotificationsPanelProps) {
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
        {[
          {
            icon: 'user-plus',
            color: 'indigo',
            message: '5 new candidates matched for "Backend Engineer".',
            time: formatRelativeTime(
              new Date(Date.now() - 10 * 60 * 1000)
            ),
          },
          {
            icon: 'check-circle',
            color: 'emerald',
            message: 'Job posting "Marketing Lead" is now Live.',
            time: formatRelativeTime(
              new Date(Date.now() - 60 * 60 * 1000)
            ),
          },
          {
            icon: 'message-square',
            color: 'amber',
            message: 'Sarah Chen replied to your message.',
            time: formatRelativeTime(
              new Date(Date.now() - 2 * 60 * 60 * 1000)
            ),
          },
        ].map((notif, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${index === 0 ? 'bg-white/5 border-l-2 border-indigo-500 hover:bg-white/10' : 'hover:bg-white/5'} transition-colors cursor-pointer`}
          >
            <div className="flex gap-3">
              <div className="mt-0.5">
                <Icon
                  icon={`lucide:${notif.icon}`}
                  width={14}
                  className={`text-${notif.color}-400`}
                />
              </div>
              <div>
                <p className="text-xs text-slate-200">
                  {index === 0 && (
                    <span className="font-medium text-white">
                      5 new candidates
                    </span>
                  )}
                  {index === 1 && (
                    <>
                      Job posting "
                      <span className="text-emerald-400">
                        Marketing Lead
                      </span>
                      " is now Live.
                    </>
                  )}
                  {index === 2 && (
                    <>Sarah Chen replied to your message.</>
                  )}
                </p>
                <p className="text-[10px] text-slate-500 mt-1">
                  {notif.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-2 border-t border-white/5 text-center">
        <button className="text-[10px] text-slate-400 hover:text-white transition-colors">
          Mark all as read
        </button>
      </div>
    </section>
  );
}