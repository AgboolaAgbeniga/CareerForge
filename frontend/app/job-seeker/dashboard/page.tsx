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
  PremiumUpsell,
  JobMatches
} from '@/components';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { socketService } from '@/lib/socket';

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

  const fetchDashboardData = React.useCallback(async () => {
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
  }, []);

  useEffect(() => {
    if (user && user.onboardingCompleted) {
      fetchDashboardData();
    }
  }, [user, fetchDashboardData]);

  // Real-time updates
  useEffect(() => {
    if (user) {
      const token = localStorage.getItem('accessToken');
      if (token) {
        socketService.connect(token);
        if (user.id) socketService.joinRoom(user.id);

        const handleUpdate = () => {
          console.log('Received real-time update, refreshing dashboard...');
          fetchDashboardData();
        };

        socketService.on('application:updated', handleUpdate);
        socketService.on('dashboard:refresh', handleUpdate);
        socketService.on('notification:new', handleUpdate);

        return () => {
          socketService.off('application:updated', handleUpdate);
          socketService.off('dashboard:refresh', handleUpdate);
          socketService.off('notification:new', handleUpdate);
          // We don't disconnect here to avoid flapping on nav, relying on singleton
        };
      }
    }
  }, [user, fetchDashboardData]);

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
                  {applications.length > 0 ? applications.length : 5} active opportunities
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
              <JobMatches matches={jobMatches} />
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
