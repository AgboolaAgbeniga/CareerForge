'use client';

import { useEffect } from 'react';

export default function RecruiterError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Recruiter error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="text-4xl mb-4">🏢</div>
        <h1 className="text-xl font-bold text-white mb-2">
          Recruiter Dashboard Error
        </h1>
        <p className="text-slate-300 mb-6">
          We couldn't load your recruiter dashboard. Please try refreshing.
        </p>
        <button
          onClick={reset}
          className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors mr-3"
        >
          Try Again
        </button>
        <a
          href="/auth/login"
          className="px-6 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
        >
          Login
        </a>
      </div>
    </div>
  );
}
