"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  ChevronDown,
  User,
  Settings,
  HelpCircle,
  LogOut,
  Check,
} from 'lucide-react';

interface OnboardingHeaderProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
}

const OnboardingHeader: React.FC<OnboardingHeaderProps> = ({
  currentStep,
  totalSteps,
  stepTitle,
}) => {
  const [isBellOpen, setIsBellOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, message: 'Calendar connected', time: '2 min ago', read: false },
    { id: 2, message: 'Email templates saved', time: '5 min ago', read: false },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const progress = (currentStep / totalSteps) * 100;

  return (
    <header className="sticky top-0 bg-white border-b border-slate-200 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-slate-900">
              CareerForge
            </a>
          </div>

          {/* Progress */}
          <div className="flex-1 max-w-md mx-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-slate-600">
                {stepTitle}
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <motion.div
                className="bg-indigo-600 h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsBellOpen(!isBellOpen)}
                className="p-2 rounded-full hover:bg-slate-100 transition-colors relative"
                aria-expanded={isBellOpen}
                aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
              >
                <Bell className="w-5 h-5 text-slate-600" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isBellOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-200">
                    <h3 className="text-sm font-semibold text-slate-900">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="px-4 py-3 border-b border-slate-100 last:border-b-0">
                        <div className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-green-500 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm text-slate-900">{notification.message}</p>
                            <p className="text-xs text-slate-500">{notification.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Avatar Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsAvatarOpen(!isAvatarOpen)}
                className="flex items-center gap-2 p-2 rounded-full hover:bg-slate-100 transition-colors"
                aria-expanded={isAvatarOpen}
                aria-haspopup="true"
              >
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-indigo-600" />
                </div>
                <ChevronDown className="w-4 h-4 text-slate-600" />
              </button>

              {isAvatarOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
                  <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <User className="w-4 h-4" />
                    Profile
                  </a>
                  <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <Settings className="w-4 h-4" />
                    Settings
                  </a>
                  <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <HelpCircle className="w-4 h-4" />
                    Help Center
                  </a>
                  <div className="border-t border-slate-200 my-1"></div>
                  <a href="#" className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <LogOut className="w-4 h-4" />
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default OnboardingHeader;