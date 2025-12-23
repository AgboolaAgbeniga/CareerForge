'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { MailCheck, CheckCircle } from 'lucide-react';

export default function EmailVerificationPage() {
  const [email, setEmail] = useState('user@example.com');
  const [showToast, setShowToast] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get email from URL params or use default
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleResend = async () => {
    if (isResending) return;

    setIsResending(true);

    // Simulate API call
    setTimeout(() => {
      setIsResending(false);
      setShowToast(true);

      // Hide toast after 4 seconds
      setTimeout(() => {
        setShowToast(false);
      }, 4000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 font-sans antialiased flex items-center justify-center p-4">
      <div className="w-full max-w-md glass-panel rounded-xl border border-indigo-500/20 p-8 sm:p-12 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full flex items-center justify-center">
            <MailCheck className="w-8 h-8" />
          </div>
        </div>

        {/* Header */}
        <h1 className="text-xl font-semibold text-white tracking-tight mb-2">
          Verify your email address
        </h1>
        <p className="text-slate-400 text-sm mb-6">
          We've sent a verification link to{' '}
          <strong className="text-white">{email}</strong>
          . Please click the link in the email to activate your account.
        </p>

        {/* Actions */}
        <div className="space-y-4">
          <button
            onClick={handleResend}
            disabled={isResending}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg font-semibold shadow-lg shadow-indigo-500/20 transition-all hover:shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isResending ? 'Sending...' : 'Resend Verification Email'}
          </button>
          <Link
            href="/auth/login"
            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium flex items-center justify-center gap-1"
          >
            Go back to Log In
          </Link>
        </div>

        {/* Helper Text */}
        <div className="text-center mt-8">
          <p className="text-xs text-slate-500">
            Didn't receive the email? Check your spam folder or wait a few minutes before resending.
          </p>
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed bottom-5 right-5 bg-slate-950 border border-indigo-500/20 text-white py-3 px-5 rounded-lg shadow-xl text-sm flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>New verification email sent.</span>
          </div>
        )}
      </div>
    </div>
  );
}
