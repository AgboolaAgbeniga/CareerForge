'use client';

import { useState, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthLayout from '@/components/layout/AuthLayout';
import Button from '@/components/ui/Button';
import { useResetPassword } from '@/hooks/queries/useAuth';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const resetPasswordMutation = useResetPassword();
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
    fulfilledCount <= 2 ? 'bg-error' : fulfilledCount <= 3 ? 'bg-amber-500' : fulfilledCount <= 4 ? 'bg-yellow-400' : 'bg-success';
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

    try {
      await resetPasswordMutation.mutateAsync({ token, newPassword: password });
      setShowSuccess(true);
      setTimeout(() => router.push('/auth/login'), 4000);
    } catch (err: any) {
      const msg = (err.response?.data?.message || '').toLowerCase();
      if (msg.includes('expired') || msg.includes('invalid token')) {
        setError('This reset link has expired. Please request a new one.');
      } else if (msg.includes('common') || msg.includes('guessable')) {
        setError('This password is too common. Please choose something more unique.');
      } else {
        setError(err.response?.data?.message || 'Something went wrong. Please try again.');
      }
    }
  }, [isPasswordValid, passwordsMatch, password, token, router]);

  // ── Styles ─────────────────────────────────────────────────
  const inputBase = 'w-full bg-canvas-dark border rounded-sm py-2 px-3 type-body-md text-on-dark placeholder-on-dark/50 focus:outline-none transition-colors duration-200';
  const inputNormal = `${inputBase} border-surface-dark-soft focus:border-on-dark`;
  const inputError = `${inputBase} border-error focus:border-error`;
  const inputSuccess = `${inputBase} border-success/40 focus:border-success`;

  const EyeToggle = ({ show, onClick }: { show: boolean; onClick: () => void }) => (
    <button type="button" onClick={onClick} className="absolute right-3 top-2.5 text-on-dark/50 hover:text-on-dark transition-colors" tabIndex={-1} aria-label={show ? 'Hide password' : 'Show password'}>
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
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-success/10 border border-success/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <p className="type-body-sm text-on-dark/70 mb-6">
            You can now log in with your new password. Redirecting…
          </p>
          <div className="w-full bg-surface-dark-soft rounded-full h-1 overflow-hidden">
            <div className="h-full bg-on-dark rounded-full animate-[fillBar_4s_ease-in-out_forwards]" />
          </div>
          <style jsx>{`@keyframes fillBar { from { width: 0% } to { width: 100% } }`}</style>
          <Link href="/auth/login" className="inline-block mt-5 type-body-sm font-medium text-on-dark hover:text-on-dark/70 transition-colors">
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
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="type-body-sm text-on-dark/70 mb-6">
            The password reset link is missing or has expired. Please request a new one.
          </p>
          <Button
            variant="primary"
            className="w-full"
            onClick={() => router.push('/auth/forgot-password')}
          >
            Request New Reset Link
          </Button>
          <Link href="/auth/login" className="inline-block mt-4 type-body-sm text-on-dark hover:text-on-dark/70 transition-colors">
            ← Back to Log In
          </Link>
        </div>
      </AuthLayout>
    );
  }

  // ── Form ───────────────────────────────────────────────────
  return (
    <AuthLayout title="Set your new password" subtitle="Choose a strong password to secure your account.">
      {/* Global Error */}
      {error && (
        <div className="flex items-start gap-3 p-3.5 mb-5 bg-error/10 border border-error/20 rounded-sm" role="alert">
          <svg className="w-4 h-4 text-error mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="type-caption text-error leading-relaxed">
            <p>{error}</p>
            {error.includes('expired') && (
              <Link href="/auth/forgot-password" className="underline underline-offset-2 mt-1 inline-block hover:text-error/70">
                Request a new link →
              </Link>
            )}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* New Password */}
        <div className="space-y-1.5">
          <label htmlFor="reset-password" className="type-body-sm font-medium text-on-dark">New Password</label>
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
            <div className="mt-2.5 space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-surface-dark-soft rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ease-out ${strengthColor}`} style={{ width: `${strengthPercent}%` }} />
                </div>
                <span className={`type-mono-caps-eyebrow ${
                  fulfilledCount <= 2 ? 'text-error' : fulfilledCount <= 3 ? 'text-amber-400' : fulfilledCount <= 4 ? 'text-yellow-400' : 'text-success'
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
                    <div key={key} className={`flex items-center gap-2 type-caption transition-colors duration-200 ${passed ? 'text-success' : 'text-on-dark/50'}`}>
                      <span className={`w-3 h-3 rounded-full flex items-center justify-center text-[8px] transition-all duration-200 ${passed ? 'bg-success/20 text-success' : 'bg-surface-dark-soft text-on-dark/30'}`}>
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
          <label htmlFor="reset-confirmPassword" className="type-body-sm font-medium text-on-dark">Confirm New Password</label>
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
            <p className="flex items-center gap-1.5 mt-1.5 type-caption text-success">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Passwords match
            </p>
          )}
          {confirmError && (
            <p className="flex items-center gap-1.5 mt-1.5 type-caption text-error" role="alert">
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {confirmError}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          variant="primary"
          type="submit"
          className="w-full"
          disabled={resetPasswordMutation.isPending || !isFormValid}
        >
          {resetPasswordMutation.isPending ? 'Updating password...' : 'Set New Password'}
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <AuthLayout title="Loading…" subtitle="Please wait while we set things up.">
        <div className="flex justify-center py-8">
          <svg className="animate-spin w-6 h-6 text-on-dark" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
        </div>
      </AuthLayout>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
