'use client';

import { useEffect } from 'react';
import Link from 'next/link';

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
    <div className="min-h-screen bg-slate-950 text-slate-400 flex items-center justify-center p-6" style={{
      backgroundImage: 'radial-gradient(circle at 0% 0%, rgba(99, 102, 241, 0.05) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)',
    }}>
      <div className="w-full max-w-md bg-slate-900/50 border border-slate-800 rounded-2xl p-8 shadow-2xl shadow-black/20 backdrop-blur-sm text-center" style={{
        boxShadow: '0 0 40px -10px rgba(99, 102, 241, 0.1)'
      }}>
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center">
          <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 className="text-lg font-semibold text-white mb-2">
          Something went wrong
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          We couldn&apos;t process your request. This is usually temporary — please try again.
        </p>

        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold py-2.5 rounded-lg shadow-lg shadow-indigo-500/20 hover:from-indigo-500 hover:to-violet-500 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            Try Again
          </button>
          <Link
            href="/auth/login"
            className="w-full bg-slate-800/50 hover:bg-slate-800 text-slate-300 text-sm font-medium py-2.5 rounded-lg border border-slate-700/50 transition-colors inline-block text-center"
          >
            Back to Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
