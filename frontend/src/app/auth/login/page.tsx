'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/layout/AuthLayout';
import { useLogin } from '@/hooks/queries/useAuth';
import Button from '@/components/ui/Button';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const { mutateAsync: login } = useLogin();
  const router = useRouter();

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  // Field-level validation
  const emailError = touched.email && !email.trim() ? 'Email address is required'
    : touched.email && !EMAIL_RE.test(email.trim()) ? 'Please enter a valid email address'
    : '';
  const passwordError = touched.password && !password ? 'Password is required' : '';

  const isFormValid = EMAIL_RE.test(email.trim()) && password.length > 0;

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setTouched({ email: true, password: true });

    if (!isFormValid) {
      setError(!email.trim() ? 'Please enter your email address' : !EMAIL_RE.test(email.trim()) ? 'Please enter a valid email address' : 'Please enter your password');
      return;
    }

    setIsLoading(true);

    try {
      const user = await login({ email: email.trim(), password });

      if (user.role === 'job_seeker') {
        if (!user.onboardingCompleted) {
          router.push('/job-seeker/onboarding-welcome');
        } else {
          router.push('/job-seeker/dashboard');
        }
      } else if (user.role === 'recruiter') {
        if (!user.onboardingCompleted) {
          router.push('/recruiter/onboarding');
        } else {
          router.push('/recruiter/recruiter-dashboard');
        }
      } else {
        router.push('/');
      }
    } catch (err: any) {
      // Map known errors to friendly messages
      const msg = err?.message?.toLowerCase() || '';
      if (msg.includes('invalid login') || msg.includes('invalid credentials') || msg.includes('invalid')) {
        setError('Incorrect email or password. Please double-check and try again.');
      } else if (msg.includes('email not confirmed') || msg.includes('not verified')) {
        setError('Your email hasn\'t been verified yet. Please check your inbox for the verification link.');
      } else if (msg.includes('too many') || msg.includes('rate')) {
        setError('Too many login attempts. Please wait a few minutes before trying again.');
      } else if (msg.includes('network') || msg.includes('fetch')) {
        setError('Unable to connect to the server. Please check your internet connection.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [isFormValid, email, password, login, router]);

  // ── Styles ─────────────────────────────────────────────────
  const inputBase = 'w-full bg-canvas-dark border rounded-sm py-2 px-3 type-body-md text-on-dark placeholder-on-dark/50 focus:outline-none transition-colors duration-200';
  const inputNormal = `${inputBase} border-surface-dark-soft focus:border-on-dark`;
  const inputError = `${inputBase} border-error focus:border-error`;

  const FieldError = ({ msg }: { msg: string }) =>
    msg ? (
      <p className="flex items-center gap-1.5 mt-1.5 type-caption text-error" role="alert">
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {msg}
      </p>
    ) : null;

  return (
    <AuthLayout title="Welcome back" subtitle="Enter your credentials to access your workspace.">
      {/* Global Error Banner */}
      {error && (
        <div className="flex items-start gap-3 p-3.5 mb-5 bg-error/10 border border-error/20 rounded-sm" role="alert">
          <svg className="w-4 h-4 text-error mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="type-caption text-error leading-relaxed">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="login-email" className="type-body-sm font-medium text-on-dark">Email Address</label>
          <div className="relative group">
            <svg className="absolute left-3 top-2.5 w-4 h-4 text-on-dark/50 group-focus-within:text-on-dark transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <input
              id="login-email"
              type="email"
              placeholder="name@company.com"
              autoComplete="email"
              className={`${emailError ? inputError : inputNormal} pl-9 pr-3`}
              value={email}
              onChange={(e) => { setEmail(e.target.value); if (error) setError(''); }}
              onBlur={() => handleBlur('email')}
              aria-invalid={!!emailError}
              aria-describedby={emailError ? 'login-email-error' : undefined}
            />
          </div>
          <FieldError msg={emailError} />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label htmlFor="login-password" className="type-body-sm font-medium text-on-dark">Password</label>
          <div className="relative group">
            <svg className="absolute left-3 top-2.5 w-4 h-4 text-on-dark/50 group-focus-within:text-on-dark transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <input
              id="login-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              autoComplete="current-password"
              className={`${passwordError ? inputError : inputNormal} pl-9 pr-10`}
              value={password}
              onChange={(e) => { setPassword(e.target.value); if (error) setError(''); }}
              onBlur={() => handleBlur('password')}
              aria-invalid={!!passwordError}
              aria-describedby={passwordError ? 'login-password-error' : undefined}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-on-dark/50 hover:text-on-dark transition-colors"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              )}
            </button>
          </div>
          <FieldError msg={passwordError} />
        </div>

        {/* Remember Me + Forgot */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              className="w-4 h-4 rounded-xs border-surface-dark-soft bg-canvas-dark text-on-dark focus:ring-0 focus:ring-offset-0 transition-colors"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className="type-body-sm text-on-dark/70 group-hover:text-on-dark transition-colors">Remember me</span>
          </label>
          <Link href="/auth/forgot-password" className="type-body-sm font-medium text-on-dark hover:text-on-dark/70 transition-colors">Forgot password?</Link>
        </div>

        {/* Submit */}
        <Button
          variant="primary"
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Log In'}
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-surface-dark-soft text-center">
        <Link
          href="/auth/signup"
          className="type-body-sm font-medium text-on-dark hover:text-on-dark/70 transition-colors"
        >
          Don&apos;t have an account? Sign Up
        </Link>
      </div>
    </AuthLayout>
  );
}
