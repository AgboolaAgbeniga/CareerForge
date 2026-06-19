'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import AuthLayout from '@/components/layout/AuthLayout';
import Button from '@/components/ui/Button';
import { useForgotPassword } from '@/hooks/queries/useAuth';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordPage() {
  const forgotPasswordMutation = useForgotPassword();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [touched, setTouched] = useState(false);

  const emailError = touched && !email.trim() ? 'Email address is required'
    : touched && !EMAIL_RE.test(email.trim()) ? 'Please enter a valid email address'
    : '';

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setError('');

    if (!email.trim() || !EMAIL_RE.test(email.trim())) {
      setError(!email.trim() ? 'Please enter your email address' : 'Please enter a valid email address');
      return;
    }

    try {
      await forgotPasswordMutation.mutateAsync({ email: email.trim().toLowerCase() });
    } catch {
      // Intentionally ignore — always show success to avoid email enumeration
    } finally {
      // Always show success to avoid leaking whether an account exists
      setShowSuccess(true);
    }
  }, [email, forgotPasswordMutation]);

  // ── Styles ─────────────────────────────────────────────────
  const inputBase = 'w-full bg-canvas-dark border rounded-sm py-2 px-3 type-body-md text-on-dark placeholder-on-dark/50 focus:outline-none transition-colors duration-200';
  const inputNormal = `${inputBase} border-surface-dark-soft focus:border-on-dark`;
  const inputError = `${inputBase} border-error focus:border-error`;

  if (showSuccess) {
    return (
      <AuthLayout title="Check your inbox" subtitle="We've sent you a password reset link.">
        <div className="text-center py-4">
          {/* Success Icon */}
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-success/10 border border-success/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <p className="type-body-md text-on-dark/70 mb-2">
            If an account exists for <strong className="text-on-dark">{email.trim()}</strong>, you&apos;ll receive an email with a link to reset your password.
          </p>
          <p className="type-caption text-on-dark/50 mb-6">
            The link will expire in 1 hour. Check your spam folder if you don&apos;t see it.
          </p>

          {/* Resend */}
          <button
            onClick={() => { setShowSuccess(false); setEmail(''); setTouched(false); }}
            className="type-body-sm font-medium text-on-dark hover:text-on-dark/70 transition-colors mb-6 inline-block"
          >
            Didn&apos;t receive it? Try again with a different email
          </button>

          <div className="pt-4 border-t border-surface-dark-soft">
            <Link
              href="/auth/login"
              className="flex items-center justify-center gap-1.5 type-body-sm text-on-dark hover:text-on-dark/70 transition-colors font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Log In
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Reset your password" subtitle="No worries — we'll send you a link to get back in.">
      {/* Global Error */}
      {error && (
        <div className="flex items-start gap-3 p-3.5 mb-5 bg-error/10 border border-error/20 rounded-sm" role="alert">
          <svg className="w-4 h-4 text-error mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="type-caption text-error leading-relaxed">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="space-y-1.5">
          <label htmlFor="forgot-email" className="type-body-sm font-medium text-on-dark">Email Address</label>
          <div className="relative group">
            <svg className="absolute left-3 top-2.5 w-4 h-4 text-on-dark/50 group-focus-within:text-on-dark transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <input
              id="forgot-email"
              type="email"
              placeholder="name@company.com"
              autoComplete="email"
              autoFocus
              className={`${emailError ? inputError : inputNormal} pl-9`}
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
              onBlur={() => setTouched(true)}
              aria-invalid={!!emailError}
            />
          </div>
          {emailError && (
            <p className="flex items-center gap-1.5 mt-1.5 type-caption text-error" role="alert">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {emailError}
            </p>
          )}
        </div>

        <Button
          variant="primary"
          type="submit"
          className="w-full"
          disabled={forgotPasswordMutation.isPending}
        >
          {forgotPasswordMutation.isPending ? 'Sending...' : 'Send Reset Link'}
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-surface-dark-soft">
        <Link
          href="/auth/login"
          className="flex items-center justify-center gap-1.5 type-body-sm text-on-dark hover:text-on-dark/70 transition-colors font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Log In
        </Link>
      </div>
    </AuthLayout>
  );
}
