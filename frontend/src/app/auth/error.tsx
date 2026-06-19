'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Auth error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-canvas-dark text-on-dark flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-canvas-dark border border-surface-dark-soft rounded-sm p-8 text-center">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-error/10 border border-error/30 flex items-center justify-center">
          <svg className="w-8 h-8 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 className="type-display-md text-on-dark mb-2">
          Something went wrong
        </h1>
        <p className="type-body-sm text-on-dark/70 mb-6">
          We couldn&apos;t process your request. This is usually temporary — please try again.
        </p>

        <div className="space-y-3">
          <Button
            variant="primary"
            onClick={reset}
            className="w-full"
          >
            Try Again
          </Button>
          <Link href="/auth/login" className="block w-full">
            <Button variant="ghostOnDark" className="w-full">
              Back to Log In
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
