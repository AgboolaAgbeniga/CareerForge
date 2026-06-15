'use client';

import { useState, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthLayout from '@/components/layout/AuthLayout';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  // Password rules — matches backend (12 char, uppercase, lowercase, number, special)
  const passwordRules = {
    minLength: password.length >= 12,
    hasUpperCase: /[A-Z]/.test(password),
    hasLowerCase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecialChar: /[^A-Za-z0-9]/.test(password),
  };
  const fulfilledCount = Object.values(passwordRules).filter(Boolean).length;
  const isPasswordValid = fulfilledCount === 5;
  const passwordsMatch = password === confirmPassword;

  // Strength
  const strengthPercent = (fulfilledCount / 5) * 100;
  const strengthColor =
    fulfilledCount <= 2 ? 'bg-red-500' : fulfilledCount <= 3 ? 'bg-amber-500' : fulfilledCount <= 4 ? 'bg-yellow-400' : 'bg-emerald-500';
  const strengthLabel =
    fulfilledCount <= 2 ? 'Weak' : fulfilledCount <= 3 ? 'Fair' : fulfilledCount <= 4 ? 'Good' : 'Strong';

  const confirmError = touched.confirmPassword && confirmPassword && !passwordsMatch ? 'Passwords don\'t match' : '';

  const isFormValid = isPasswordValid && passwordsMatch && confirmPassword.length > 0;

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setTouched({ confirmPassword: true });

    if (!isPasswordValid) {
      setError('Please meet all password requirements');
      return;
    }

    if (!passwordsMatch) {
      setError('Passwords don\'t match');
      return;
    }

    setIsLoading(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${API_URL}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => router.push('/auth/login'), 4000);
      } else {
        const result = await response.json().catch(() => null);
        const msg = result?.message?.toLowerCase() || '';
        if (msg.includes('expired') || msg.includes('invalid token')) {
          setError('This reset link has expired. Please request a new one.');
        } else if (msg.includes('common') || msg.includes('guessable')) {
          setError('This password is too common. Please choose something more unique.');
        } else {
          setError(result?.message || 'Something went wrong. Please try again.');
        }
      }
    } catch {
      setError('Unable to connect to the server. Please check your internet connection and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [isPasswordValid, passwordsMatch, password, token, router]);

  // ── Styles ─────────────────────────────────────────────────
  const inputBase = 'w-full bg-slate-950 border rounded-lg py-2.5 px-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-all duration-200';
  const inputNormal = `${inputBase} border-slate-800 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50`;
  const inputError = `${inputBase} border-red-500/50 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/40`;
  const inputSuccess = `${inputBase} border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/40`;

  const EyeToggle = ({ show, onClick }: { show: boolean; onClick: () => void }) => (
    <button type="button" onClick={onClick} className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 transition-colors" tabIndex={-1} aria-label={show ? 'Hide password' : 'Show password'}>
      {show ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" /></svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
      )}
    </button>
  );

  // ── Success State ──────────────────────────────────────────
  if (showSuccess) {
    return (
      <AuthLayout title="Password updated!" subtitle="Your password has been changed successfully.">
        <div className="text-center py-4">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <p className="text-sm text-slate-400 mb-6">
            You can now log in with your new password. Redirecting…
          </p>
          <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full animate-[fillBar_4s_ease-in-out_forwards]" />
          </div>
          <style jsx>{`@keyframes fillBar { from { width: 0% } to { width: 100% } }`}</style>
          <Link href="/auth/login" className="inline-block mt-5 text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
            Go to login now →
          </Link>
        </div>
      </AuthLayout>
    );
  }

  // ── No token warning ───────────────────────────────────────
  if (!token) {
    return (
      <AuthLayout title="Invalid reset link" subtitle="This link appears to be broken or expired.">
        <div className="text-center py-4">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm text-slate-400 mb-6">
            The password reset link is missing or has expired. Please request a new one.
          </p>
          <Link
            href="/auth/forgot-password"
            className="inline-block w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold py-2.5 rounded-lg shadow-lg shadow-indigo-500/20 hover:from-indigo-500 hover:to-violet-500 transition-all text-center"
          >
            Request New Reset Link
          </Link>
          <Link href="/auth/login" className="inline-block mt-4 text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
            ← Back to Log In
          </Link>
        </div>
      </AuthLayout>
    );
  }

  // ── Form ───────────────────────────────────────────────────
  return (
    <AuthLayout title="Set your new password" subtitle="Choose a strong password to secure your account.">
      <style jsx>{`@keyframes fadeSlide { from { opacity: 0; transform: translateY(-4px) } to { opacity: 1; transform: translateY(0) } }`}</style>

      {/* Global Error */}
      {error && (
        <div className="flex items-start gap-3 p-3.5 mb-5 bg-red-500/10 border border-red-500/25 rounded-xl animate-[fadeSlide_0.25s_ease-out]" role="alert">
          <svg className="w-4 h-4 text-red-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-xs text-red-400 leading-relaxed">
            <p>{error}</p>
            {error.includes('expired') && (
              <Link href="/auth/forgot-password" className="underline underline-offset-2 mt-1 inline-block hover:text-red-300">
                Request a new link →
              </Link>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* New Password */}
        <div className="space-y-1.5">
          <label htmlFor="reset-password" className="text-xs font-medium text-slate-300">New Password</label>
          <div className="relative">
            <input
              id="reset-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              autoComplete="new-password"
              autoFocus
              className={`${password && isPasswordValid ? inputSuccess : inputNormal} pr-10`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <EyeToggle show={showPassword} onClick={() => setShowPassword(!showPassword)} />
          </div>

          {/* Strength bar + rules */}
          {password && (
            <div className="mt-2.5 space-y-2.5 animate-[fadeSlide_0.2s_ease-out]">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ease-out ${strengthColor}`} style={{ width: `${strengthPercent}%` }} />
                </div>
                <span className={`text-[10px] font-semibold tracking-wide uppercase ${
                  fulfilledCount <= 2 ? 'text-red-400' : fulfilledCount <= 3 ? 'text-amber-400' : fulfilledCount <= 4 ? 'text-yellow-400' : 'text-emerald-400'
                }`}>{strengthLabel}</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { key: 'minLength', label: 'At least 12 characters' },
                  { key: 'hasUpperCase', label: 'One uppercase letter (A-Z)' },
                  { key: 'hasLowerCase', label: 'One lowercase letter (a-z)' },
                  { key: 'hasNumber', label: 'One number (0-9)' },
                  { key: 'hasSpecialChar', label: 'One special character (!@#$%^&*)' },
                ].map(({ key, label }) => {
                  const passed = passwordRules[key as keyof typeof passwordRules];
                  return (
                    <div key={key} className={`flex items-center gap-2 text-xs transition-colors duration-200 ${passed ? 'text-emerald-400' : 'text-slate-500'}`}>
                      <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] transition-all duration-200 ${passed ? 'bg-emerald-500/20 scale-100' : 'bg-slate-700/30 scale-90'}`}>
                        {passed ? '✓' : '○'}
                      </span>
                      {label}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label htmlFor="reset-confirmPassword" className="text-xs font-medium text-slate-300">Confirm New Password</label>
          <div className="relative">
            <input
              id="reset-confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Re-enter your new password"
              autoComplete="new-password"
              className={`${
                confirmPassword && passwordsMatch ? inputSuccess :
                confirmError ? inputError :
                inputNormal
              } pr-10`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onBlur={() => handleBlur('confirmPassword')}
              aria-invalid={!!confirmError}
            />
            <EyeToggle show={showConfirmPassword} onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
          </div>
          {confirmPassword && passwordsMatch && (
            <p className="flex items-center gap-1.5 mt-1.5 text-xs text-emerald-400 animate-[fadeSlide_0.2s_ease-out]">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Passwords match
            </p>
          )}
          {confirmError && (
            <p className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400 animate-[fadeSlide_0.2s_ease-out]" role="alert">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {confirmError}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          id="reset-submit"
          disabled={isLoading || !isFormValid}
          className={`w-full text-sm font-semibold py-2.5 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
            isLoading || !isFormValid
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-500 hover:to-violet-500 shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:scale-[1.01] active:scale-[0.99]'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              Updating password…
            </>
          ) : 'Set New Password'}
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <AuthLayout title="Loading…" subtitle="Please wait while we set things up.">
        <div className="flex justify-center py-8">
          <svg className="animate-spin w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
        </div>
      </AuthLayout>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
