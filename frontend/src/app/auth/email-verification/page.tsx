'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import AuthLayout from '@/components/layout/AuthLayout';
import Button from '@/components/ui/Button';
import { useResendVerification } from '@/hooks/queries/useAuth';

function EmailVerificationContent() {
  const searchParams = useSearchParams();
  const emailParam = searchParams.get('email') || '';

  const [email] = useState(emailParam || 'your email');
  const resendVerificationMutation = useResendVerification();
  const [showToast, setShowToast] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [error, setError] = useState('');

  // Cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => setResendCooldown(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleResend = useCallback(async () => {
    if (resendVerificationMutation.isPending || resendCooldown > 0) return;

    setError('');

    try {
      await resendVerificationMutation.mutateAsync({ email: emailParam });
      setShowToast(true);
      setResendCooldown(60);
      setTimeout(() => setShowToast(false), 4000);
    } catch (err: any) {
      const msg = err.response?.data?.message || '';
      if (msg.includes('already verified')) {
        setError('Your email is already verified! You can log in.');
      } else {
        // Show success anyway to prevent email enumeration
        setShowToast(true);
        setResendCooldown(60);
        setTimeout(() => setShowToast(false), 4000);
      }
    }
  }, [resendVerificationMutation, resendCooldown, emailParam]);

  return (
    <AuthLayout title="Verify your email" subtitle="One more step to get started.">
      <div className="text-center py-2">
        {/* Icon */}
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-surface-dark-soft border border-surface-dark flex items-center justify-center">
          <svg className="w-8 h-8 text-on-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>

        <p className="type-body-sm text-on-dark/70 mb-1">
          We&apos;ve sent a verification link to
        </p>
        <p className="type-body-md font-semibold text-on-dark mb-4">{email}</p>
        <p className="type-caption text-on-dark/50 mb-6">
          Click the link in your email to activate your account. It may take a few minutes to arrive.
        </p>

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 p-3 mb-4 bg-error/10 border border-error/20 rounded-sm text-left" role="alert">
            <svg className="w-4 h-4 text-error mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="type-caption text-error">{error}</p>
          </div>
        )}

        {/* Actions */}
        <div className="space-y-3">
          <Button
            variant="primary"
            onClick={handleResend}
            disabled={resendVerificationMutation.isPending || resendCooldown > 0}
            className="w-full"
          >
            {resendVerificationMutation.isPending ? 'Sending...' : resendCooldown > 0 ? `Resend available in ${resendCooldown}s` : 'Resend Verification Email'}
          </Button>

          <Link href="/auth/login" className="block w-full text-center">
            <Button variant="ghostOnDark" className="w-full">
              Back to Log In
            </Button>
          </Link>
        </div>

        {/* Helper */}
        <div className="mt-6 pt-4 border-t border-surface-dark-soft">
          <div className="flex items-start gap-2 text-left">
            <svg className="w-4 h-4 text-on-dark/50 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="type-caption text-on-dark/50">
              Can&apos;t find the email? Check your spam or junk folder. Make sure{' '}
              <span className="text-on-dark">noreply@careerforge.com</span> isn&apos;t blocked.
            </p>
          </div>
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-5 right-5 flex items-center gap-2.5 bg-canvas-dark border border-success/30 text-on-dark py-3 px-5 rounded-sm shadow-2xl shadow-black/40 type-body-sm z-50">
          <svg className="w-5 h-5 text-success shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Verification email sent!</span>
        </div>
      )}
    </AuthLayout>
  );
}

export default function EmailVerificationPage() {
  return (
    <Suspense fallback={
      <AuthLayout title="Loading…" subtitle="Please wait.">
        <div className="flex justify-center py-8">
          <svg className="animate-spin w-6 h-6 text-on-dark" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
        </div>
      </AuthLayout>
    }>
      <EmailVerificationContent />
    </Suspense>
  );
}
