'use client';

import Link from 'next/link';
import AuthLayout from '@/components/layout/AuthLayout';
import Button from '@/components/ui/Button';

export default function SessionExpiredPage() {
  return (
    <AuthLayout title="Session expired" subtitle="Your session has timed out for security.">
      <div className="text-center py-2">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
          <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <p className="type-body-sm text-on-dark/70 mb-6">
          For your security, your session has expired. Please log in again to continue where you left off.
        </p>

        {/* Info box */}
        <div className="flex items-start gap-3 p-3.5 mb-6 bg-surface-dark-soft border border-surface-dark rounded-sm text-left">
          <svg className="w-4 h-4 text-on-dark/50 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="type-caption text-on-dark font-medium mb-0.5">Your work is safe</p>
            <p className="type-caption text-on-dark/50">Changes are saved automatically when possible. You won&apos;t lose your progress.</p>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link href="/auth/login" className="block w-full text-center">
            <Button variant="primary" className="w-full">
              Log In Again
            </Button>
          </Link>
          <Button
            variant="ghostOnDark"
            onClick={() => window.history.back()}
            className="w-full"
          >
            Go Back
          </Button>
        </div>
      </div>
    </AuthLayout>
  );
}
