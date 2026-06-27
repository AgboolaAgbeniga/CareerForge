'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function JobSeekerError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white border border-slate-200 p-8 rounded-xl max-w-md w-full text-center">
        <h1 className="text-xl font-bold text-slate-900 mb-2">
          Dashboard Error
        </h1>
        <p className="text-slate-600 mb-6">
          We couldn't load your job seeker dashboard. Please try refreshing.
        </p>
        <button
          onClick={reset}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors mr-3"
        >
          Try Again
        </button>
        <Link
          href="/auth/login"
          className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
