'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function RecruiterError({
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
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
      <div className="bg-slate-800 border border-slate-700 p-8 rounded-xl max-w-md w-full text-center">
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
        <Link
          href="/auth/login"
          className="px-6 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-colors"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
