'use client';

import { useEffect } from 'react';

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="text-4xl mb-4">🔐</div>
        <h1 className="text-xl font-bold text-slate-900 mb-2">
          Authentication Error
        </h1>
        <p className="text-slate-600 mb-6">
          We couldn't process your authentication request. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors mr-3"
        >
          Try Again
        </button>
        <a
          href="/"
          className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  );
}
