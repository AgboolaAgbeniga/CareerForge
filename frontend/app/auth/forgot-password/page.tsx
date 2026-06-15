'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import AuthLayout from '@/components/layout/AuthLayout';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      // Always show success to avoid email enumeration
      setShowSuccess(true);
    } catch {
      // Still show success to avoid leaking info, but log the error
      setShowSuccess(true);
    } finally {
      setIsLoading(false);
    }
  }, [email]);

  // ── Styles ─────────────────────────────────────────────────
  const inputBase = 'w-full bg-slate-950 border rounded-lg py-2.5 px-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-all duration-200';
  const inputNormal = `${inputBase} border-slate-800 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50`;
  const inputError = `${inputBase} border-red-500/50 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/40`;

  if (showSuccess) {
    return (
      <AuthLayout title="Check your inbox" subtitle="We've sent you a password reset link.">
        <div className="text-center py-4">
          {/* Success Icon */}
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>

          <p className="text-sm text-slate-400 mb-2">
            If an account exists for <strong className="text-white">{email.trim()}</strong>, you&apos;ll receive an email with a link to reset your password.
          </p>
          <p className="text-xs text-slate-500 mb-6">
            The link will expire in 1 hour. Check your spam folder if you don&apos;t see it.
          </p>

          {/* Resend */}
          <button
            onClick={() => { setShowSuccess(false); setEmail(''); setTouched(false); }}
            className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors mb-6 inline-block"
          >
            Didn&apos;t receive it? Try again with a different email
          </button>

          <div className="pt-4 border-t border-slate-800/50">
            <Link
              href="/auth/login"
              className="flex items-center justify-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
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
      <style jsx>{`@keyframes fadeSlide { from { opacity: 0; transform: translateY(-4px) } to { opacity: 1; transform: translateY(0) } }`}</style>

      {/* Global Error */}
      {error && (
        <div className="flex items-start gap-3 p-3.5 mb-5 bg-red-500/10 border border-red-500/25 rounded-xl animate-[fadeSlide_0.25s_ease-out]" role="alert">
          <svg className="w-4 h-4 text-red-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs text-red-400 leading-relaxed">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="space-y-1.5">
          <label htmlFor="forgot-email" className="text-xs font-medium text-slate-300">Email Address</label>
          <div className="relative group">
            <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <p className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400 animate-[fadeSlide_0.2s_ease-out]" role="alert">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {emailError}
            </p>
          )}
        </div>

        <button
          type="submit"
          id="forgot-submit"
          disabled={isLoading}
          className={`w-full text-sm font-semibold py-2.5 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
            isLoading
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:scale-[1.01] active:scale-[0.99]'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              Sending…
            </>
          ) : 'Send Reset Link'}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-slate-800/50">
        <Link
          href="/auth/login"
          className="flex items-center justify-center gap-1.5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
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
