'use client';

import Link from 'next/link';
import AuthLayout from '@/components/layout/AuthLayout';

export default function SessionExpiredPage() {
  return (
    <AuthLayout title="Session expired" subtitle="Your session has timed out for security.">
      <div className="text-center py-2">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
          <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <p className="text-sm text-slate-400 mb-6">
          For your security, your session has expired. Please log in again to continue where you left off.
        </p>

        {/* Info box */}
        <div className="flex items-start gap-3 p-3.5 mb-6 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-left">
          <svg className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-xs text-indigo-300 font-medium mb-0.5">Your work is safe</p>
            <p className="text-xs text-slate-400">Changes are saved automatically when possible. You won&apos;t lose your progress.</p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href="/auth/login"
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold py-2.5 rounded-lg shadow-lg shadow-indigo-500/20 hover:from-indigo-500 hover:to-violet-500 transition-all hover:scale-[1.01] active:scale-[0.99] inline-block text-center"
          >
            Log In Again
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full bg-slate-800/50 hover:bg-slate-800 text-slate-300 text-sm font-medium py-2.5 rounded-lg border border-slate-700/50 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
