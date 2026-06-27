'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Linkedin, UploadCloud, Sparkles, X } from 'lucide-react';
import Link from 'next/link';
import {
  ResumeHealthCard,
  ProfileCompletionCard,
  CareerPathVisualization,
  ApplicationsTracker,
  AICareerCoach,
  SkillGapAnalysis,
  ActivityFeed,
  PremiumUpsell,
  JobMatches,
} from '@/components';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { socketService } from '@/lib/socket';
import Button from '@/components/ui/Button';
import { useProfileStats } from '@/hooks/useDashboardProfile';
import { useResumeScore } from '@/hooks/queries/useDashboard';
import { supabase } from '@/lib/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { usePageStore } from '@/store/usePageStore';

const WELCOME_BANNER_KEY = 'cf_welcome_banner_dismissed';

function WelcomeBanner({
  name,
  completion,
  onDismiss,
}: {
  name: string;
  completion: number;
  onDismiss: () => void;
}) {
  return (
    <div className="flex items-center justify-between bg-ink text-on-primary rounded-sm px-5 py-4 animate-[fadeIn_0.4s_ease-out]">
      <div className="flex items-center gap-3">
        <Sparkles className="w-4 h-4 text-accent-mint flex-shrink-0" />
        <p className="type-mono-eyebrow text-on-primary">
          Welcome, {name}! Your AI cockpit is live —{' '}
          {completion < 80 ? (
            <>
              your profile is <span className="text-accent-periwinkle">{completion}% complete</span>.
              Finish it to unlock higher-quality matches.
            </>
          ) : (
            <>you&apos;re set up and ready to land your next role.</>
          )}
        </p>
      </div>
      <div className="flex items-center gap-3 ml-4 flex-shrink-0">
        {completion < 80 && (
          <Link
            href="/job-seeker/full-profile"
            className="type-mono-eyebrow text-accent-mint hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            Complete Profile →
          </Link>
        )}
        <button onClick={onDismiss} className="text-on-primary/50 hover:text-on-primary transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [showWelcome, setShowWelcome] = useState(false);

  const setPageContextData = usePageStore((s) => s.setPageContextData);

  useEffect(() => {
    setPageContextData({ type: 'DASHBOARD', role: 'job_seeker' });
  }, [setPageContextData]);

  const {
    isLoading,
    profileCompletion,
    completionLabel,
    hasResume,
    resumeFileName,
    activeResumeId,
    currentRole,
    targetRole,
    careerPath,
    skills,
    skillGaps,
    checklistItems,
    topJobMatch,
    user,
    jobMatches,
    applications,
    activities,
    errors,
  } = useProfileStats();

  // Fetch ATS score from the dedicated endpoint
  const { data: atsData } = useResumeScore(activeResumeId);
  const resumeScore = hasResume ? (atsData?.ats_score ?? null) : null;
  const keywordMatchPct = atsData?.keyword_match_pct ?? 0;
  const atsImprovements: string[] = atsData?.improvements ?? [];

  // ── Onboarding redirect ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!isLoading && user && !user.onboardingCompleted) {
      router.push('/job-seeker/onboarding-welcome');
    }
  }, [user, isLoading, router]);

  // ── Welcome banner — show once per session for new users ─────────────────────
  useEffect(() => {
    if (!isLoading && user && applications.length === 0) {
      const dismissed = localStorage.getItem(WELCOME_BANNER_KEY);
      if (!dismissed) setShowWelcome(true);
    }
  }, [isLoading, user, applications.length]);

  const dismissWelcome = useCallback(() => {
    setShowWelcome(false);
    localStorage.setItem(WELCOME_BANNER_KEY, '1');
  }, []);

  // ── Real-time socket (fixed: reads token from Supabase session) ───────────────
  useEffect(() => {
    if (!user) return;

    let cleanup: (() => void) | undefined;

    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      if (!token) return;

      socketService.connect(token);
      if (user.id) socketService.joinRoom(user.id);

      const handleUpdate = () => {
        queryClient.invalidateQueries({ queryKey: ['dashboard', 'job-seeker'] });
      };

      socketService.on('application:updated', handleUpdate);
      socketService.on('dashboard:refresh', handleUpdate);
      socketService.on('notification:new', handleUpdate);

      cleanup = () => {
        socketService.off('application:updated', handleUpdate);
        socketService.off('dashboard:refresh', handleUpdate);
        socketService.off('notification:new', handleUpdate);
      };
    })();

    return () => cleanup?.();
  }, [user, queryClient]);

  return (
    <ProtectedRoute allowedRoles={['job_seeker']}>
      <div className="min-h-screen bg-canvas text-ink overflow-x-hidden">
        <main className="max-w-[1600px] mx-auto p-6 lg:p-8 space-y-6 pt-10">

          {/* Welcome banner */}
          {showWelcome && user && (
            <WelcomeBanner
              name={user.firstName}
              completion={profileCompletion}
              onDismiss={dismissWelcome}
            />
          )}

          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-1">
              <h1 className="type-display-lg text-ink">
                Welcome back,{' '}
                <span className="bg-gradient-to-r from-accent-orange via-accent-magenta to-accent-periwinkle bg-clip-text text-transparent">
                  {user ? `${user.firstName} ${user.lastName}` : 'User'}
                </span>
              </h1>
              <p className="type-body-md text-body max-w-lg mt-2">
                {applications.length > 0 ? (
                  <>
                    Your AI cockpit is tracking{' '}
                    <span className="font-medium text-ink">{applications.length} active opportunit{applications.length === 1 ? 'y' : 'ies'}</span>.
                  </>
                ) : (
                  <>
                    Your AI cockpit is ready.{' '}
                    <span className="font-medium text-ink">Apply to your first match to start tracking.</span>
                  </>
                )}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="secondaryWhite" className="!px-4">
                <Linkedin className="w-4 h-4 mr-2 inline" />
                Sync LinkedIn
              </Button>
              <Button variant="secondaryWhite" className="!px-4">
                <UploadCloud className="w-4 h-4 mr-2 inline" />
                Upload Resume
              </Button>
              <Button variant="primary" className="!px-4">
                <Sparkles className="w-4 h-4 mr-2 inline" />
                Generate with AI
              </Button>
            </div>
          </header>

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

            {/* LEFT COLUMN */}
            <div className="md:col-span-12 lg:col-span-8 space-y-6">

              {/* Resume + Profile row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResumeHealthCard
                  resumeScore={resumeScore}
                  resumeFileName={resumeFileName}
                  keywordMatchPct={keywordMatchPct}
                  improvements={atsImprovements}
                  loading={isLoading}
                />
                <ProfileCompletionCard
                  profileCompletion={profileCompletion}
                  completionLabel={completionLabel}
                  checklistItems={checklistItems}
                  loading={isLoading}
                />
              </div>

              <CareerPathVisualization
                currentRole={currentRole}
                targetRole={targetRole}
                loading={isLoading}
              />

              {errors.applications ? (
                <div className="bg-ink p-6 rounded-md border border-outline border-dashed text-center">
                  <p className="text-on-primary font-medium">Failed to load applications</p>
                  <p className="text-body text-sm mt-1">{errors.applications}</p>
                </div>
              ) : (
                <ApplicationsTracker
                  applications={applications}
                  viewMode={viewMode}
                  setViewMode={setViewMode}
                  loading={isLoading}
                />
              )}

              {errors.jobMatches ? (
                <div className="bg-ink p-6 rounded-md border border-outline border-dashed text-center">
                  <p className="text-on-primary font-medium">Failed to load job matches</p>
                  <p className="text-body text-sm mt-1">{errors.jobMatches}</p>
                </div>
              ) : (
                <JobMatches
                  matches={jobMatches}
                  loading={isLoading}
                />
              )}
            </div>

            {/* RIGHT COLUMN */}
            <div className="md:col-span-12 lg:col-span-4 space-y-6">
              <AICareerCoach
                currentRole={currentRole}
                targetRole={targetRole}
                topMatch={topJobMatch}
                hasResume={hasResume}
                loading={isLoading}
              />
              <SkillGapAnalysis
                userSkills={skills}
                skillGaps={skillGaps}
                targetRole={targetRole}
                loading={isLoading}
              />
              {errors.activities ? (
                <div className="bg-ink p-6 rounded-md border border-outline border-dashed text-center">
                  <p className="text-on-primary font-medium">Failed to load activity feed</p>
                  <p className="text-body text-sm mt-1">{errors.activities}</p>
                </div>
              ) : (
                <ActivityFeed activities={activities} />
              )}
              <PremiumUpsell />
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
