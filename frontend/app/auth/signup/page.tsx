'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/layout/AuthLayout';

// ── Helpers ────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NAME_RE = /^[a-zA-ZÀ-ÿ' \-]+$/;

function validateName(value: string, label: string): string {
  const v = value.trim();
  if (!v) return `${label} is required`;
  if (v.length > 50) return `${label} must be 50 characters or fewer`;
  if (!NAME_RE.test(v)) return `${label} can only contain letters, spaces, hyphens, and apostrophes`;
  return '';
}

function validateEmail(value: string): string {
  const v = value.trim();
  if (!v) return 'Email address is required';
  if (!EMAIL_RE.test(v)) return 'Please enter a valid email address (e.g. name@company.com)';
  return '';
}

// ── Component ──────────────────────────────────────────────────
export default function SignupPage() {
  const router = useRouter();

  // Form fields
  const [role, setRole] = useState<'recruiter' | 'job_seeker'>('recruiter');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Mark a field as touched on blur
  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  // Password rules
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

  // Strength meter
  const strengthPercent = (fulfilledCount / 5) * 100;
  const strengthColor =
    fulfilledCount <= 2 ? 'bg-red-500' : fulfilledCount <= 3 ? 'bg-amber-500' : fulfilledCount <= 4 ? 'bg-yellow-400' : 'bg-emerald-500';
  const strengthLabel =
    fulfilledCount <= 2 ? 'Weak' : fulfilledCount <= 3 ? 'Fair' : fulfilledCount <= 4 ? 'Good' : 'Strong';

  // Inline field errors (only shown after blur / touched)
  const firstNameError = touched.firstName ? validateName(firstName, 'First name') : '';
  const lastNameError = touched.lastName ? validateName(lastName, 'Last name') : '';
  const emailError = touched.email ? validateEmail(email) : '';
  const confirmError = touched.confirmPassword && confirmPassword && !passwordsMatch ? 'Passwords don\'t match' : '';

  // Overall validity
  const isFormValid =
    !validateName(firstName, 'First name') &&
    !validateName(lastName, 'Last name') &&
    !validateEmail(email) &&
    isPasswordValid &&
    passwordsMatch &&
    confirmPassword.length > 0;

  // ── Submit ─────────────────────────────────────────────────
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    // Touch all fields to surface inline errors
    setTouched({ firstName: true, lastName: true, email: true, confirmPassword: true });

    if (!isFormValid) {
      // Show the first problem found
      const firstErr =
        validateName(firstName, 'First name') ||
        validateName(lastName, 'Last name') ||
        validateEmail(email) ||
        (!isPasswordValid ? 'Please meet all password requirements' : '') ||
        (!passwordsMatch ? 'Passwords don\'t match' : '');
      setError(firstErr || 'Please check the form and fix any errors');
      return;
    }

    setIsLoading(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

    try {
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password, role, firstName: firstName.trim(), lastName: lastName.trim() }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => router.push('/auth/login'), 3000);
      } else {
        const result = await response.json().catch(() => null);
        if (result?.details && Array.isArray(result.details)) {
          // Map backend field errors to inline display
          const mapped: Record<string, string> = {};
          result.details.forEach((d: { field: string; message: string }) => {
            if (d.field) mapped[d.field] = d.message;
          });
          setFieldErrors(mapped);
        }
        setError(result?.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setError('Unable to connect to the server. Please check your internet connection and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [isFormValid, firstName, lastName, email, password, confirmPassword, role, isPasswordValid, passwordsMatch, router]);

  // ── Success State ──────────────────────────────────────────
  if (success) {
    return (
      <AuthLayout title="Account created!" subtitle="You're almost there.">
        <div className="text-center py-4">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-white mb-2">Welcome to CareerForge!</h2>
          <p className="text-sm text-slate-400 mb-6">
            Your account has been created successfully. Redirecting you to log in…
          </p>
          <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full animate-[fillBar_3s_ease-in-out_forwards]" />
          </div>
          <style jsx>{`@keyframes fillBar { from { width: 0% } to { width: 100% } }`}</style>
          <Link href="/auth/login" className="inline-block mt-5 text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
            Go to login now →
          </Link>
        </div>
      </AuthLayout>
    );
  }

  // ── Render Helpers ─────────────────────────────────────────
  const inputBase = 'w-full bg-slate-950 border rounded-lg py-2.5 px-3 text-sm text-white placeholder-slate-600 focus:outline-none transition-all duration-200';
  const inputNormal = `${inputBase} border-slate-800 focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50`;
  const inputError = `${inputBase} border-red-500/50 focus:border-red-500/50 focus:ring-1 focus:ring-red-500/40`;
  const inputSuccess = `${inputBase} border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/40`;

  function getInputClass(field: string, isValid: boolean, errorText: string): string {
    if (!touched[field]) return inputNormal;
    if (errorText || fieldErrors[field]) return inputError;
    if (isValid) return inputSuccess;
    return inputNormal;
  }

  const FieldError = ({ msg }: { msg: string }) =>
    msg ? (
      <p className="flex items-center gap-1.5 mt-1.5 text-xs text-red-400 animate-[fadeSlide_0.2s_ease-out]" role="alert">
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {msg}
      </p>
    ) : null;

  const EyeToggle = ({ show, onClick }: { show: boolean; onClick: () => void }) => (
    <button type="button" onClick={onClick} className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 transition-colors" tabIndex={-1} aria-label={show ? 'Hide password' : 'Show password'}>
      {show ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" /></svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
      )}
    </button>
  );

  // ── JSX ────────────────────────────────────────────────────
  return (
    <AuthLayout title="Forge your future" subtitle="Join thousands of companies hiring top talent.">
      <style jsx>{`@keyframes fadeSlide { from { opacity: 0; transform: translateY(-4px) } to { opacity: 1; transform: translateY(0) } }`}</style>

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Role Selector */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <label className="cursor-pointer" id="role-recruiter-label">
            <input type="radio" name="role" className="peer sr-only" checked={role === 'recruiter'} onChange={() => setRole('recruiter')} aria-labelledby="role-recruiter-label" />
            <div className="p-3 rounded-xl border border-slate-700 bg-slate-900/50 hover:bg-slate-800 peer-checked:bg-indigo-500/10 peer-checked:border-indigo-500/50 peer-checked:text-white transition-all text-center">
              <svg className="w-5 h-5 mx-auto mb-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8m0 0V4" />
              </svg>
              <span className="block text-xs font-medium">Recruiter</span>
            </div>
          </label>
          <label className="cursor-pointer" id="role-jobseeker-label">
            <input type="radio" name="role" className="peer sr-only" checked={role === 'job_seeker'} onChange={() => setRole('job_seeker')} aria-labelledby="role-jobseeker-label" />
            <div className="p-3 rounded-xl border border-slate-700 bg-slate-900/50 hover:bg-slate-800 peer-checked:bg-indigo-500/10 peer-checked:border-indigo-500/50 peer-checked:text-white transition-all text-center">
              <svg className="w-5 h-5 mx-auto mb-2 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="block text-xs font-medium">Job Seeker</span>
            </div>
          </label>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="signup-firstName" className="text-xs font-medium text-slate-300">First Name</label>
            <input
              id="signup-firstName"
              type="text"
              placeholder="Sarah"
              autoComplete="given-name"
              maxLength={50}
              className={getInputClass('firstName', !!firstName.trim() && !validateName(firstName, 'First name'), firstNameError)}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              onBlur={() => handleBlur('firstName')}
              aria-invalid={!!firstNameError}
              aria-describedby={firstNameError ? 'firstName-error' : undefined}
            />
            <FieldError msg={firstNameError || fieldErrors.firstName || ''} />
          </div>
          <div className="space-y-1.5">
            <label htmlFor="signup-lastName" className="text-xs font-medium text-slate-300">Last Name</label>
            <input
              id="signup-lastName"
              type="text"
              placeholder="Connor"
              autoComplete="family-name"
              maxLength={50}
              className={getInputClass('lastName', !!lastName.trim() && !validateName(lastName, 'Last name'), lastNameError)}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              onBlur={() => handleBlur('lastName')}
              aria-invalid={!!lastNameError}
              aria-describedby={lastNameError ? 'lastName-error' : undefined}
            />
            <FieldError msg={lastNameError || fieldErrors.lastName || ''} />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label htmlFor="signup-email" className="text-xs font-medium text-slate-300">Work Email</label>
          <div className="relative group">
            <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <input
              id="signup-email"
              type="email"
              placeholder="sarah@cyberdyne.com"
              autoComplete="email"
              className={`${getInputClass('email', !!email.trim() && !validateEmail(email), emailError)} pl-9`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur('email')}
              aria-invalid={!!emailError}
              aria-describedby={emailError ? 'email-error' : undefined}
            />
          </div>
          <FieldError msg={emailError || fieldErrors.email || ''} />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label htmlFor="signup-password" className="text-xs font-medium text-slate-300">Password</label>
          <div className="relative">
            <input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              autoComplete="new-password"
              className={`${password && isPasswordValid ? inputSuccess : inputNormal} pr-10`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <EyeToggle show={showPassword} onClick={() => setShowPassword(!showPassword)} />
          </div>

          {/* Strength bar */}
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

              {/* Rules checklist */}
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
          <FieldError msg={fieldErrors.password || ''} />
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label htmlFor="signup-confirmPassword" className="text-xs font-medium text-slate-300">Confirm Password</label>
          <div className="relative">
            <input
              id="signup-confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Re-enter your password"
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
          <FieldError msg={confirmError} />
        </div>

        {/* Global Error Banner */}
        {error && (
          <div className="flex items-start gap-3 p-3.5 bg-red-500/10 border border-red-500/25 rounded-xl animate-[fadeSlide_0.2s_ease-out]" role="alert">
            <svg className="w-4 h-4 text-red-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-red-400 leading-relaxed">{error}</p>
          </div>
        )}

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            id="signup-submit"
            disabled={isLoading}
            className={`w-full text-sm font-semibold py-2.5 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
              isLoading
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed shadow-none'
                : isFormValid
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:scale-[1.01] active:scale-[0.99]'
                  : 'bg-slate-700/80 text-slate-500 cursor-not-allowed shadow-none'
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                Creating your account…
              </>
            ) : 'Create Account'}
          </button>
          <p className="text-center text-[10px] text-slate-600 mt-4">
            By creating an account, you agree to our{' '}
            <Link href="#" className="text-slate-500 hover:text-indigo-400 transition-colors underline underline-offset-2">Terms of Service</Link>
            {' '}and{' '}
            <Link href="#" className="text-slate-500 hover:text-indigo-400 transition-colors underline underline-offset-2">Privacy Policy</Link>.
          </p>
        </div>
      </form>

      <div className="mt-6 pt-6 border-t border-slate-800/50">
        <Link
          href="/auth/login"
          className="w-full bg-slate-800/50 hover:bg-slate-800 text-slate-300 text-sm font-medium py-2.5 rounded-lg border border-slate-700/50 transition-colors inline-block text-center"
        >
          Already have an account? Log In
        </Link>
      </div>
    </AuthLayout>
  );
}
