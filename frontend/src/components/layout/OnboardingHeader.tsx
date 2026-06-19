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
import { Logo } from '@/components/shared/Logo';
import { useLogout } from '@/hooks/queries/useAuth';

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
  const { mutate: logout } = useLogout();
  const [isBellOpen, setIsBellOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, message: 'Calendar connected', time: '2 min ago', read: false },
    { id: 2, message: 'Email templates saved', time: '5 min ago', read: false },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;
  const progress = (currentStep / totalSteps) * 100;

  return (
    <header className="sticky top-0 bg-canvas border-b border-hairline z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Progress */}
          <div className="flex-1 max-w-md mx-8">
            <div className="flex items-center justify-between mb-2">
              <span className="type-body-md text-body">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="type-body-md text-body">
                {stepTitle}
              </span>
            </div>
            <div className="w-full bg-hairline rounded-sm h-2">
              <motion.div
                className="bg-ink h-2 rounded-sm"
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
                className="p-2 rounded-sm hover:bg-hairline transition-colors relative"
                aria-expanded={isBellOpen}
                aria-label={`Notifications ${unreadCount > 0 ? `(${unreadCount} unread)` : ''}`}
              >
                <Bell className="w-5 h-5 text-ink" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-ink text-canvas type-caption rounded-sm w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isBellOpen && (
                <div className="absolute right-0 mt-2 w-80 cf-card py-2 z-50">
                  <div className="px-4 py-2 border-b border-hairline">
                    <h3 className="type-body-md text-ink">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="px-4 py-3 border-b border-hairline last:border-b-0">
                        <div className="flex items-start gap-3">
                          <Check className="w-4 h-4 text-emerald-600 mt-0.5" />
                          <div className="flex-1">
                            <p className="type-body-md text-ink">{notification.message}</p>
                            <p className="type-caption text-body">{notification.time}</p>
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
                className="flex items-center gap-2 p-2 rounded-sm hover:bg-hairline transition-colors"
                aria-expanded={isAvatarOpen}
                aria-haspopup="true"
              >
                <div className="w-8 h-8 bg-hairline rounded-sm flex items-center justify-center">
                  <User className="w-4 h-4 text-ink" />
                </div>
                <ChevronDown className="w-4 h-4 text-body" />
              </button>

              {isAvatarOpen && (
                <div className="absolute right-0 mt-2 w-48 cf-card py-2 z-50">
                  <a href="mailto:support@careerforge.com" className="flex items-center gap-3 px-4 py-2 type-body-md text-ink hover:bg-hairline transition-colors">
                    <HelpCircle className="w-4 h-4" />
                    Help Center
                  </a>
                  <div className="border-t border-hairline my-1"></div>
                  <button 
                    onClick={() => {
                      setIsAvatarOpen(false);
                      logout();
                    }} 
                    className="w-full flex items-center gap-3 px-4 py-2 type-body-md text-ink hover:bg-hairline transition-colors text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
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