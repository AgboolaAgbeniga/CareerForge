'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/layout/AuthLayout';
import Button from '@/components/ui/Button';
import { useSignup } from '@/hooks/queries/useAuth';

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
  const signupMutation = useSignup();
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
    fulfilledCount <= 2 ? 'bg-error' : fulfilledCount <= 3 ? 'bg-amber-500' : fulfilledCount <= 4 ? 'bg-yellow-400' : 'bg-success';
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

    try {
      await signupMutation.mutateAsync({
        email: email.trim().toLowerCase(),
        password,
        role,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      });
      setSuccess(true);
      setTimeout(() => router.push('/auth/login'), 3000);
    } catch (err: any) {
      const result = err.response?.data || err;
      if (result?.details && Array.isArray(result.details)) {
        const mapped: Record<string, string> = {};
        result.details.forEach((d: { field: string; message: string }) => {
          if (d.field) mapped[d.field] = d.message;
        });
        setFieldErrors(mapped);
      }
      setError(result?.message || err.message || 'Something went wrong. Please try again.');
    }
  }, [isFormValid, firstName, lastName, email, password, confirmPassword, role, isPasswordValid, passwordsMatch, router]);

  // ── Success State ──────────────────────────────────────────
  if (success) {
    return (
      <AuthLayout title="Account created!" subtitle="You're almost there.">
        <div className="text-center py-4">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-success/10 border border-success/30 flex items-center justify-center">
            <svg className="w-8 h-8 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="type-display-md text-on-dark mb-2">Welcome to CareerForge!</h2>
          <p className="type-body-md text-on-dark/70 mb-6">
            Your account has been created successfully. Redirecting you to log in…
          </p>
          <div className="w-full bg-surface-dark-soft rounded-full h-1 overflow-hidden">
            <div className="h-full bg-on-dark rounded-full animate-[fillBar_3s_ease-in-out_forwards]" />
          </div>
          <style jsx>{`@keyframes fillBar { from { width: 0% } to { width: 100% } }`}</style>
          <Link href="/auth/login" className="inline-block mt-5 type-body-sm font-medium text-on-dark hover:text-on-dark/70 transition-colors">
            Go to login now →
          </Link>
        </div>
      </AuthLayout>
    );
  }

  // ── Render Helpers ─────────────────────────────────────────
  const inputBase = 'w-full bg-canvas-dark border rounded-sm py-2 px-3 type-body-md text-on-dark placeholder-on-dark/50 focus:outline-none transition-colors duration-200';
  const inputNormal = `${inputBase} border-surface-dark-soft focus:border-on-dark`;
  const inputError = `${inputBase} border-error focus:border-error`;
  const inputSuccess = `${inputBase} border-success/40 focus:border-success`;

  function getInputClass(field: string, isValid: boolean, errorText: string): string {
    if (!touched[field]) return inputNormal;
    if (errorText || fieldErrors[field]) return inputError;
    if (isValid) return inputSuccess;
    return inputNormal;
  }

  const FieldError = ({ msg }: { msg: string }) =>
    msg ? (
      <p className="flex items-center gap-1.5 mt-1.5 type-caption text-error" role="alert">
        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {msg}
      </p>
    ) : null;

  const EyeToggle = ({ show, onClick }: { show: boolean; onClick: () => void }) => (
    <button type="button" onClick={onClick} className="absolute right-3 top-2 text-on-dark/50 hover:text-on-dark transition-colors" tabIndex={-1} aria-label={show ? 'Hide password' : 'Show password'}>
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
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Role Selector */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <label className="cursor-pointer" id="role-recruiter-label">
            <input type="radio" name="role" className="peer sr-only" checked={role === 'recruiter'} onChange={() => setRole('recruiter')} aria-labelledby="role-recruiter-label" />
            <div className="p-3 rounded-sm border border-surface-dark-soft bg-canvas-dark hover:bg-surface-dark-soft peer-checked:bg-on-dark peer-checked:border-on-dark peer-checked:text-canvas-dark text-on-dark/70 transition-colors text-center">
              <span className="block type-mono-caps-eyebrow">Recruiter</span>
            </div>
          </label>
          <label className="cursor-pointer" id="role-jobseeker-label">
            <input type="radio" name="role" className="peer sr-only" checked={role === 'job_seeker'} onChange={() => setRole('job_seeker')} aria-labelledby="role-jobseeker-label" />
            <div className="p-3 rounded-sm border border-surface-dark-soft bg-canvas-dark hover:bg-surface-dark-soft peer-checked:bg-on-dark peer-checked:border-on-dark peer-checked:text-canvas-dark text-on-dark/70 transition-colors text-center">
              <span className="block type-mono-caps-eyebrow">Job Seeker</span>
            </div>
          </label>
        </div>

        {/* Name Fields */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label htmlFor="signup-firstName" className="type-body-sm font-medium text-on-dark">First Name</label>
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
            <label htmlFor="signup-lastName" className="type-body-sm font-medium text-on-dark">Last Name</label>
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
          <label htmlFor="signup-email" className="type-body-sm font-medium text-on-dark">Work Email</label>
          <div className="relative group">
            <svg className="absolute left-3 top-2.5 w-4 h-4 text-on-dark/50 group-focus-within:text-on-dark transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          <label htmlFor="signup-password" className="type-body-sm font-medium text-on-dark">Password</label>
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
            <div className="mt-2.5 space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-1.5 bg-surface-dark-soft rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ease-out ${strengthColor}`} style={{ width: `${strengthPercent}%` }} />
                </div>
                <span className={`type-mono-caps-eyebrow ${
                  fulfilledCount <= 2 ? 'text-error' : fulfilledCount <= 3 ? 'text-amber-400' : fulfilledCount <= 4 ? 'text-yellow-400' : 'text-success'
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
          <FieldError msg={fieldErrors.password || ''} />
        </div>

        {/* Confirm Password */}
        <div className="space-y-1.5">
          <label htmlFor="signup-confirmPassword" className="type-body-sm font-medium text-on-dark">Confirm Password</label>
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
            <p className="flex items-center gap-1.5 mt-1.5 type-caption text-success">
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
          <div className="flex items-start gap-3 p-3.5 bg-error/10 border border-error/20 rounded-sm" role="alert">
            <svg className="w-4 h-4 text-error mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="type-caption text-error leading-relaxed">{error}</p>
          </div>
        )}

        {/* Submit */}
        <div className="pt-2">
          <Button
            variant="primary"
            type="submit"
            className="w-full"
            disabled={signupMutation.isPending || !isFormValid}
          >
            {signupMutation.isPending ? 'Creating your account...' : 'Create Account'}
          </Button>
          <p className="text-center type-caption text-on-dark/50 mt-4">
            By creating an account, you agree to our{' '}
            <Link href="#" className="text-on-dark hover:text-on-dark/70 transition-colors underline underline-offset-2">Terms of Service</Link>
            {' '}and{' '}
            <Link href="#" className="text-on-dark hover:text-on-dark/70 transition-colors underline underline-offset-2">Privacy Policy</Link>.
          </p>
        </div>
      </form>

      <div className="mt-6 pt-6 border-t border-surface-dark-soft text-center">
        <Link
          href="/auth/login"
          className="type-body-sm font-medium text-on-dark hover:text-on-dark/70 transition-colors"
        >
          Already have an account? Log In
        </Link>
      </div>
    </AuthLayout>
  );
}
