'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function EmailVerificationPage() {
  const [showToast, setShowToast] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleResend = () => {
    if (isResending) return;
    setIsResending(true);
    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 text-gray-800">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 sm:p-12 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
        </div>

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Verify your email address
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          We've sent a verification link to{' '}
          <strong className="text-gray-800">user@example.com</strong>. Please
          click the link in the email to activate your account.
        </p>

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={handleResend}
            disabled={isResending}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isResending ? 'Sending...' : 'Resend Verification Email'}
          </button>
          <Link
            href="/auth/login"
            className="text-sm text-gray-600 hover:text-indigo-600 hover:underline font-medium block"
          >
            Go back to Log In
          </Link>
        </div>

        {/* Helper Text */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            Didn't receive the email? Check your spam folder or wait a few
            minutes before resending.
          </p>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-5 right-5 bg-slate-900 text-white py-3 px-5 rounded-lg shadow-xl text-sm flex items-center gap-2">
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <span>New verification email sent.</span>
          </div>
        )}
      </div>
    </div>
  );
}
