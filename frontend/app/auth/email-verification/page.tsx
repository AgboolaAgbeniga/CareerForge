'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import AuthLayout from '@/components/layout/AuthLayout';

function EmailVerificationContent() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email') || '';

  const [email] = useState(emailParam || 'your email');
  const [showToast, setShowToast] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [error, setError] = useState('');

  // Cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => setResendCooldown(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleResend = useCallback(async () => {
    if (isResending || resendCooldown > 0) return;

    setIsResending(true);
    setError('');
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${API_URL}/api/auth/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailParam }),
      });

      if (response.ok) {
        setShowToast(true);
        setResendCooldown(60); // 60 second cooldown
        setTimeout(() => setShowToast(false), 4000);
      } else {
        const result = await response.json().catch(() => null);
        if (result?.message?.includes('already verified')) {
          setError('Your email is already verified! You can log in.');
        } else {
          setShowToast(true); // Show success anyway to prevent enumeration
          setResendCooldown(60);
          setTimeout(() => setShowToast(false), 4000);
        }
      }
    } catch {
      setError('Unable to connect to the server. Please try again later.');
    } finally {
      setIsResending(false);
    }
  }, [isResending, resendCooldown, emailParam]);

  return (
    <AuthLayout title="Verify your email" subtitle="One more step to get started.">
      <div className="text-center py-2">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center">
          <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <p className="text-sm text-slate-400 mb-1">
          We&apos;ve sent a verification link to
        </p>
        <p className="text-sm font-semibold text-white mb-4">{email}</p>
        <p className="text-xs text-slate-500 mb-6">
          Click the link in your email to activate your account. It may take a few minutes to arrive.
        </p>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 p-3 mb-4 bg-red-500/10 border border-red-500/25 rounded-xl text-left" role="alert">
            <svg className="w-4 h-4 text-red-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-red-400">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleResend}
            disabled={isResending || resendCooldown > 0}
            className={`w-full text-sm font-semibold py-2.5 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
              isResending || resendCooldown > 0
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:scale-[1.01] active:scale-[0.99]'
            }`}
          >
            {isResending ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Sending…
              </>
            ) : resendCooldown > 0 ? (
              `Resend available in ${resendCooldown}s`
            ) : (
              'Resend Verification Email'
            )}
          </button>

          <Link
            href="/auth/login"
            className="w-full bg-slate-800/50 hover:bg-slate-800 text-slate-300 text-sm font-medium py-2.5 rounded-lg border border-slate-700/50 transition-colors inline-block text-center"
          >
            Back to Log In
          </Link>
        </div>

        {/* Helper */}
        <div className="mt-6 pt-4 border-t border-slate-800/50">
          <div className="flex items-start gap-2 text-left">
            <svg className="w-4 h-4 text-slate-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-slate-600">
              Can&apos;t find the email? Check your spam or junk folder. Make sure{' '}
              <span className="text-slate-500">noreply@careerforge.com</span> isn&apos;t blocked.
            </p>
          </div>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-5 right-5 flex items-center gap-2.5 bg-slate-900 border border-emerald-500/30 text-white py-3 px-5 rounded-xl shadow-2xl shadow-black/40 text-sm animate-[fadeSlide_0.3s_ease-out] z-50">
          <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-slate-300">Verification email sent!</span>
        </div>
      )}
      <style jsx>{`@keyframes fadeSlide { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }`}</style>
    </AuthLayout>
  );
}

export default function EmailVerificationPage() {
  return (
    <Suspense fallback={
      <AuthLayout title="Loading…" subtitle="Please wait.">
        <div className="flex justify-center py-8">
          <svg className="animate-spin w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
        </div>
      </AuthLayout>
    }>
      <EmailVerificationContent />
    </Suspense>
  );
}
