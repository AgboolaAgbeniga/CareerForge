'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/authContext';
import {
  Bell,
  ChevronDown,
  Linkedin,
  UploadCloud,
  Sparkles,
  FileText,
  TrendingUp,
  Zap,
  Check,
  ArrowRight,
  Map,
  Calendar,
  Bot,
  Database,
  FileCheck,
  Briefcase,
  Eye,
  Crown,
  ChevronRight,
} from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils/dateUtils';
import {
  ResumeHealthCard,
  ProfileCompletionCard,
  CareerPathVisualization,
  ApplicationsTracker,
  AICareerCoach,
  SkillGapAnalysis,
  ActivityFeed,
  PremiumUpsell
} from '@/components';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [profileCompletion, setProfileCompletion] = useState(65);
  const [resumeScore, setResumeScore] = useState(85);
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');

  useEffect(() => {
    if (!loading && user && !user.onboardingCompleted) {
      router.push('/job-seeker/onboarding-welcome');
    }
  }, [user, loading, router]);
  const [activities, setActivities] = useState([]);
  const [applications, setApplications] = useState([]);
  const [jobMatches, setJobMatches] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch('/api/dashboard/job-seeker', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const result = await response.json();
          const dashboardData = result.data || result;
          setApplications(dashboardData.applications || []);
          setActivities(dashboardData.notifications || []);
          setJobMatches(dashboardData.jobMatches || []);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      }
    };

    if (user && user.onboardingCompleted) {
      fetchDashboardData();
    }
  }, [user]);

  return (
    <ProtectedRoute allowedRoles={['job_seeker']}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 selection:bg-indigo-100 selection:text-indigo-700 overflow-x-hidden font-['Inter']">

        {/* Main Dashboard Container */}
        <main className="max-w-[1600px] mx-auto p-4 lg:p-8 space-y-8 pt-20">
          {/* Header Section */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
                Welcome back,{' '}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {user ? `${user.firstName} ${user.lastName}` : 'User'}
                </span>
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">
                Your AI cockpit is tracking{' '}
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  5 active opportunities
                </span>
                . Market demand for your skills is up{' '}
                <span className="text-green-600 font-medium">12%</span> this week.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover-lift">
                <Linkedin className="w-4 h-4 text-[#0077b5]" />
                Sync LinkedIn
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-xl shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all hover-lift">
                <UploadCloud className="w-4 h-4" />
                Upload Resume
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-900 dark:bg-gray-700 text-white text-sm font-medium rounded-xl shadow-lg shadow-gray-900/10 hover:bg-gray-800 dark:hover:bg-gray-600 transition-all hover-lift">
                <Sparkles className="w-4 h-4" />
                Generate with AI
              </button>
            </div>
          </header>

          {/* Modular Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* LEFT COLUMN (Stats & Progress) */}
            <div className="md:col-span-12 lg:col-span-8 space-y-6">
              {/* Resume & Profile Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResumeHealthCard resumeScore={resumeScore} />

                <ProfileCompletionCard profileCompletion={profileCompletion} />
              </div>

              <CareerPathVisualization />

              <ApplicationsTracker applications={applications} viewMode={viewMode} setViewMode={setViewMode} />

              {/* Job Matches Grid */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 tracking-tight">
                    Top Recommended Matches
                  </h2>
                  <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                      Remote
                    </button>
                    <button className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-400 hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                      Full-time
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Job Card 1 */}
                  <div className="group bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all relative">
                    <div className="absolute top-5 right-5 flex flex-col items-end">
                      <div
                        className="radial-progress text-green-500 text-[10px] font-bold"
                        style={
                          {
                            '--value': 98,
                            '--size': '2rem',
                          } as React.CSSProperties
                        }
                      >
                        98%
                      </div>
                    </div>

                    <div className="flex gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 flex items-center justify-center">
                        {/* Figma icon placeholder */}
                        <div className="w-6 h-6 bg-gray-900 dark:bg-gray-100 rounded"></div>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 transition-colors">
                          Product Designer
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                          Figma • San Francisco
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-medium text-gray-600 dark:text-gray-400">
                        Design Systems
                      </span>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-medium text-gray-600 dark:text-gray-400">
                        Prototyping
                      </span>
                      <span className="px-2 py-1 bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 border border-green-100 dark:border-green-700 rounded text-[10px] font-medium flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" /> Skills Match
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-700">
                      <span className="text-[10px] text-gray-400 dark:text-gray-500">
                        {formatRelativeTime(
                          new Date(Date.now() - 4 * 60 * 60 * 1000)
                        )}
                      </span>
                      <button className="text-xs font-semibold text-white bg-gray-900 dark:bg-gray-700 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
                        Apply Now
                      </button>
                    </div>
                  </div>

                  {/* Job Card 2 */}
                  <div className="group bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-200 dark:border-gray-700 hover:border-indigo-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all relative">
                    <div className="absolute top-5 right-5 flex flex-col items-end">
                      <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900 px-2 py-1 rounded-full">
                        94% Match
                      </span>
                    </div>

                    <div className="flex gap-4 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-100 dark:border-gray-600 flex items-center justify-center">
                        {/* Slack icon placeholder */}
                        <div className="w-6 h-6 bg-gray-900 dark:bg-gray-100 rounded"></div>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 transition-colors">
                          Technical PM
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                          Slack • Remote
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-medium text-gray-600 dark:text-gray-400">
                        API
                      </span>
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-[10px] font-medium text-gray-600 dark:text-gray-400">
                        Agile
                      </span>
                      <span className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-700 rounded text-[10px] font-medium flex items-center gap-1">
                        <Zap className="w-2.5 h-2.5" /> Hot Role
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-gray-700">
                      <span className="text-[10px] text-gray-400 dark:text-gray-500">
                        {formatRelativeTime(
                          new Date(Date.now() - 24 * 60 * 60 * 1000)
                        )}
                      </span>
                      <button className="text-xs font-semibold text-white bg-gray-900 dark:bg-gray-700 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN (AI, Upskilling, Notifications) */}
            <div className="md:col-span-12 lg:col-span-4 space-y-6">
              <AICareerCoach />

              <SkillGapAnalysis />

              <ActivityFeed activities={activities} />

              <PremiumUpsell />
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
