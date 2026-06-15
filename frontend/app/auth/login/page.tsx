'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/layout/AuthLayout';
import { useAuth } from '@/lib/authContext';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const { login } = useAuth();
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
      const user = await login(email.trim(), password);

      if (user.role === 'job_seeker') {
        router.push('/job-seeker/dashboard');
      } else if (user.role === 'recruiter') {
        router.push('/recruiter/recruiter-dashboard');
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
  const inputBase = 'w-full bg-slate-950 border rounded-lg py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none transition-all duration-200';
  const inputNormal = `${inputBase} border-slate-800 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50`;
  const inputError = `${inputBase} border-red-500/50 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/40`;

  const FieldError = ({ msg }: { msg: string }) =>
    msg ? (
      <p className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400 animate-[fadeSlide_0.2s_ease-out]" role="alert">
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {msg}
      </p>
    ) : null;

  return (
    <AuthLayout title="Welcome back to CareerForge" subtitle="Enter your credentials to access your workspace.">
      <style jsx>{`@keyframes fadeSlide { from { opacity: 0; transform: translateY(-4px) } to { opacity: 1; transform: translateY(0) } }`}</style>

      {/* Global Error Banner */}
      {error && (
        <div className="flex items-start gap-3 p-3.5 mb-5 bg-red-500/10 border border-red-500/25 rounded-xl animate-[fadeSlide_0.25s_ease-out]" role="alert">
          <svg className="w-4 h-4 text-red-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs text-red-400 leading-relaxed">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="login-email" className="text-xs font-medium text-slate-300">Email Address</label>
          <div className="relative group">
            <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <label htmlFor="login-password" className="text-xs font-medium text-slate-300">Password</label>
          <div className="relative group">
            <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 transition-colors"
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
              className="w-4 h-4 rounded border-slate-700 bg-slate-900 text-indigo-500 focus:ring-indigo-500/20 focus:ring-offset-0 transition-colors"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors">Remember me</span>
          </label>
          <Link href="/auth/forgot-password" className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors">Forgot password?</Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          id="login-submit"
          disabled={isLoading}
          className={`w-full text-sm font-semibold py-2.5 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
            isLoading
              ? 'bg-slate-700 text-slate-400 cursor-not-allowed shadow-none'
              : 'bg-white hover:bg-slate-100 text-slate-950 shadow-white/5 hover:shadow-white/10 active:scale-[0.99]'
          }`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
              Signing in…
            </>
          ) : (
            <>
              Log In
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </form>

      <div className="mt-6 pt-6 border-t border-slate-800/50">
        <Link
          href="/auth/signup"
          className="w-full bg-slate-800/50 hover:bg-slate-800 text-slate-300 text-sm font-medium py-2.5 rounded-lg border border-slate-700/50 transition-colors inline-block text-center"
        >
          Don&apos;t have an account? Sign Up
        </Link>
      </div>
    </AuthLayout>
  );
}
