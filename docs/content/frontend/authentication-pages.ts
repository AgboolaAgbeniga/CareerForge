// @ts-nocheck
// Frontend Documentation Content - Authentication System
import { PageContent } from '@/lib/content-types'

export const authenticationPagesContent: PageContent = {
  metadata: {
    title: "Authentication Pages",
    description: "Complete guide to CareerForge's authentication system including login, registration, password reset, and email verification flows",
    version: "2.4.0",
    lastUpdated: "2025-12-27",
    authors: ["CareerForge Frontend Team"],
    tags: ["authentication", "login", "registration", "security", "user-management"],
    difficulty: "intermediate",
    estimatedTime: 20
  },
  tableOfContents: [
    { id: "authentication-overview", title: "Authentication Overview", level: 1 },
    { id: "login-flow", title: "Login Flow", level: 1 },
    { id: "registration-flow", title: "Registration Flow", level: 1 },
    { id: "password-reset", title: "Password Reset Flow", level: 1 },
    { id: "email-verification", title: "Email Verification", level: 1 },
    { id: "social-authentication", title: "Social Authentication", level: 1 },
    { id: "session-management", title: "Session Management", level: 1 },
    { id: "security-features", title: "Security Features", level: 1 }
  ],
  introduction: {
    id: "introduction",
    title: "CareerForge Authentication System",
    content: "CareerForge implements a comprehensive, secure authentication system that balances user convenience with robust security measures. Our authentication flow supports multiple sign-in methods while maintaining a seamless user experience across all devices.\n\nThe system is built with security-first principles, including multi-factor authentication, session management, and protection against common vulnerabilities."
  },
  sections: [
    {
      id: "authentication-overview",
      title: "Authentication Overview",
      content: `CareerForge's authentication system provides multiple secure methods for users to access their accounts while maintaining a consistent, user-friendly experience.

### Authentication Methods

#### 1. Email and Password
Traditional email/password authentication with enhanced security features:
- Strong password requirements
- Rate limiting on login attempts
- Account lockout protection
- Password history tracking

#### 2. Social Authentication
Seamless sign-in with existing accounts:
- Google OAuth 2.0
- LinkedIn OAuth 2.0
- GitHub OAuth 2.0
- Microsoft OAuth 2.0

#### 3. Magic Link (Passwordless)
Email-based authentication without passwords:
- Secure, time-limited magic links
- No password management required
- Enhanced security for users

#### 4. Multi-Factor Authentication (MFA)
Additional security layer for sensitive accounts:
- Time-based One-Time Passwords (TOTP)
- SMS-based verification
- Email-based backup codes
- Biometric authentication (mobile)

### Security Architecture

#### Token-Based Authentication
- **Access Tokens**: Short-lived JWT tokens for API requests
- **Refresh Tokens**: Long-lived tokens for token renewal
- **Secure Storage**: HTTP-only cookies for production
- **Token Rotation**: Automatic token refresh and invalidation

#### Session Management
- **Session Tracking**: User session monitoring and analytics
- **Device Management**: Track and manage user devices
- **Concurrent Sessions**: Control multiple active sessions
- **Session Timeout**: Automatic logout for inactive sessions`,
      calloutBoxes: [
        {
          type: "info",
          title: "Security Standards",
          content: "Our authentication system follows OWASP Top 10 security guidelines and implements industry best practices for user authentication."
        }
      ]
    },
    {
      id: "login-flow",
      title: "Login Flow",
      content: `The login flow is designed to be intuitive while maintaining robust security measures to protect user accounts.

### Login Process

#### Step 1: Login Form
Users can access the login form through multiple entry points:
- Direct navigation to /auth/login
- Modal popup from header
- Redirect after protected route access
- Social login buttons

#### Step 2: Credential Validation
Real-time validation provides immediate feedback:
- Email format validation
- Password strength checking
- Account existence verification
- Rate limiting enforcement

#### Step 3: Authentication
Secure authentication process:
- Credentials sent over HTTPS only
- Server-side validation and verification
- JWT token generation and storage
- Session establishment

#### Step 4: Redirect and Setup
Post-login experience:
- Redirect to intended page or dashboard
- Profile completion prompts for new users
- Security setup recommendations (MFA)
- Onboarding flow initiation

### Login Implementation

#### Login Form Component
\`\`\`typescript
// components/auth/LoginForm.tsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  rememberMe: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  })

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    clearErrors()

    try {
      await login({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      })
    } catch (error: any) {
      if (error.message.includes('Invalid credentials')) {
        setError('email', { message: 'Invalid email or password' })
        setError('password', { message: 'Invalid email or password' })
      } else if (error.message.includes('Account locked')) {
        setError('email', { 
          message: 'Account temporarily locked due to multiple failed attempts. Try again later.' 
        })
      } else {
        setError('email', { message: 'An error occurred. Please try again.' })
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          autoComplete="email"
          className={\`
            w-full px-3 py-2 border rounded-lg shadow-sm
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            \${errors.email ? 'border-red-300' : 'border-gray-300'}
          \`}
          placeholder="Enter your email address"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <div className="relative">
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            className={\`
              w-full px-3 py-2 pr-10 border rounded-lg shadow-sm
              focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              \${errors.password ? 'border-red-300' : 'border-gray-300'}
            \`}
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            {...register('rememberMe')}
            id="remember-me"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
            Remember me
          </label>
        </div>
        <Link
          href="/auth/forgot-password"
          className="text-sm text-blue-600 hover:text-blue-500"
        >
          Forgot your password?
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isValid || isLoading}
        className={\`
          w-full flex justify-center py-2 px-4 border border-transparent
          rounded-lg shadow-sm text-sm font-medium text-white
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          disabled:opacity-50 disabled:cursor-not-allowed
          \${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}
        \`}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin -ml-1 mr-3 h-4 w-4" />
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </button>

      {/* Social Login Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <SocialLoginButton provider="google" />
        <SocialLoginButton provider="linkedin" />
      </div>

      {/* Sign Up Link */}
      <div className="text-center">
        <span className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-blue-600 hover:text-blue-500 font-medium">
            Sign up
          </Link>
        </span>
      </div>
    </form>
  )
}

// Social Login Button Component
function SocialLoginButton({ provider }: { provider: 'google' | 'linkedin' | 'github' }) {
  const { signInWithSocial } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleSocialLogin = async () => {
    setIsLoading(true)
    try {
      await signInWithSocial(provider)
    } catch (error) {
      console.error('Social login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const providerConfig = {
    google: {
      name: 'Google',
      icon: '🔍',
      bgColor: 'bg-white',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300',
    },
    linkedin: {
      name: 'LinkedIn',
      icon: '💼',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
      borderColor: 'border-blue-600',
    },
    github: {
      name: 'GitHub',
      icon: '🐙',
      bgColor: 'bg-gray-900',
      textColor: 'text-white',
      borderColor: 'border-gray-900',
    },
  }

  const config = providerConfig[provider]

  return (
    <button
      type="button"
      onClick={handleSocialLogin}
      disabled={isLoading}
      className={\`
        w-full inline-flex justify-center items-center px-4 py-2 border
        rounded-lg shadow-sm text-sm font-medium transition-colors
        \${config.bgColor} \${config.textColor} \${config.borderColor}
        hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2
        focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed
      \`}
    >
      <span className="mr-2">{config.icon}</span>
      {isLoading ? 'Signing in...' : config.name}
    </button>
  )
}
\`\`\`

### Error Handling and UX

#### Rate Limiting Feedback
- Clear messaging when rate limits are hit
- Visual countdown for locked accounts
- Alternative authentication methods suggestion

#### Validation States
- Real-time field validation
- Clear error messaging
- Success state indicators
- Loading states for better perceived performance`,
      calloutBoxes: [
        {
          type: "warning",
          title: "Security Best Practices",
          content: "Always use HTTPS for authentication. Never store passwords in plain text. Implement rate limiting and account lockout policies."
        }
      ]
    },
    {
      id: "registration-flow",
      title: "Registration Flow",
      content: `The registration flow is designed to minimize friction while ensuring data quality and account security.

### Registration Process

#### Step 1: Initial Registration
Users provide basic information to create their account:
- Email address (verified immediately)
- Password (with strength requirements)
- Account type selection (Job Seeker/Employer)
- Terms of service acceptance

#### Step 2: Profile Setup
Optional but recommended profile completion:
- Full name and contact information
- Professional headline
- Company information (for employers)
- Basic skill preferences

#### Step 3: Email Verification
Account activation through email verification:
- Verification email sent immediately
- Secure verification links
- Email validation and security checks

#### Step 4: Welcome Experience
Onboarding flow for new users:
- Feature tour and platform introduction
- Initial profile setup guidance
- Security recommendations (MFA setup)
- Privacy settings configuration

### Registration Implementation

#### Registration Form Component
\`\`\`typescript
// components/auth/RegisterForm.tsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Check, X, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

const registerSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number'),
  confirmPassword: z.string(),
  accountType: z.enum(['jobseeker', 'employer'], {
    required_error: 'Please select an account type',
  }),
  agreeToTerms: z.boolean().refine(val => val === true, 'You must agree to the terms and conditions'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type RegisterFormData = z.infer<typeof registerSchema>

export function RegisterForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [registrationData, setRegistrationData] = useState<RegisterFormData | null>(null)
  const { register: registerUser } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    trigger,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
  })

  const password = watch('password')

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    let score = 0
    if (password.length >= 8) score++
    if (/[a-z]/.test(password)) score++
    if (/[A-Z]/.test(password)) score++
    if (/\d/.test(password)) score++
    if (/[^a-zA-Z\d]/.test(password)) score++
    return score
  }

  const passwordStrength = password ? getPasswordStrength(password) : 0

  const getPasswordStrengthColor = (score: number) => {
    if (score <= 2) return 'bg-red-500'
    if (score <= 3) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getPasswordStrengthText = (score: number) => {
    if (score <= 2) return 'Weak'
    if (score <= 3) return 'Medium'
    return 'Strong'
  }

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true)
    try {
      await registerUser({
        email: data.email,
        password: data.password,
        accountType: data.accountType,
      })
      setRegistrationData(data)
      setCurrentStep(2)
    } catch (error: any) {
      if (error.message.includes('Email already exists')) {
        errors.email && (errors.email.message = 'This email is already registered')
      }
    } finally {
      setIsLoading(false)
    }
  }

  if (currentStep === 2) {
    return (
      <div className="max-w-md mx-auto text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h2>
        <p className="text-gray-600 mb-6">
          We've sent a verification link to <strong>{registrationData?.email}</strong>.
          Please click the link in the email to activate your account.
        </p>
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Didn't receive the email? Check your spam folder or{' '}
            <button className="text-blue-600 hover:text-blue-500">
              request a new one
            </button>
          </p>
          <Link
            href="/auth/login"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Account Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          I want to...
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="relative">
            <input
              {...register('accountType')}
              type="radio"
              value="jobseeker"
              className="sr-only peer"
            />
            <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50 hover:border-gray-300 transition-colors">
              <div className="text-center">
                <div className="text-2xl mb-2">👤</div>
                <h3 className="font-medium text-gray-900">Find a Job</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Search and apply for jobs that match your skills
                </p>
              </div>
            </div>
          </label>

          <label className="relative">
            <input
              {...register('accountType')}
              type="radio"
              value="employer"
              className="sr-only peer"
            />
            <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50 hover:border-gray-300 transition-colors">
              <div className="text-center">
                <div className="text-2xl mb-2">🏢</div>
                <h3 className="font-medium text-gray-900">Hire Talent</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Find and connect with qualified candidates
                </p>
              </div>
            </div>
          </label>
        </div>
        {errors.accountType && (
          <p className="mt-1 text-sm text-red-600">{errors.accountType.message}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          autoComplete="email"
          className={\`
            w-full px-3 py-2 border rounded-lg shadow-sm
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            \${errors.email ? 'border-red-300' : 'border-gray-300'}
          \`}
          placeholder="Enter your email address"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          {...register('password')}
          type="password"
          id="password"
          autoComplete="new-password"
          className={\`
            w-full px-3 py-2 border rounded-lg shadow-sm
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            \${errors.password ? 'border-red-300' : 'border-gray-300'}
          \`}
          placeholder="Create a strong password"
        />
        
        {/* Password Strength Indicator */}
        {password && (
          <div className="mt-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Password strength:</span>
              <span className={\`
                font-medium
                \${passwordStrength <= 2 ? 'text-red-600' : passwordStrength <= 3 ? 'text-yellow-600' : 'text-green-600'}
              \`}>
                {getPasswordStrengthText(passwordStrength)}
              </span>
            </div>
            <div className="mt-1 flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={\`
                    h-1 w-full rounded
                    \${i < passwordStrength ? getPasswordStrengthColor(passwordStrength) : 'bg-gray-200'}
                  \`}
                />
              ))}
            </div>
          </div>
        )}
        
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
          Confirm Password
        </label>
        <input
          {...register('confirmPassword')}
          type="password"
          id="confirmPassword"
          autoComplete="new-password"
          className={\`
            w-full px-3 py-2 border rounded-lg shadow-sm
            focus:ring-2 focus:ring-blue-500 focus:border-blue-500
            \${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'}
          \`}
          placeholder="Confirm your password"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-start">
        <input
          {...register('agreeToTerms')}
          id="agree-to-terms"
          type="checkbox"
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
        />
        <label htmlFor="agree-to-terms" className="ml-2 block text-sm text-gray-700">
          I agree to the{' '}
          <Link href="/terms" className="text-blue-600 hover:text-blue-500">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
            Privacy Policy
          </Link>
        </label>
      </div>
      {errors.agreeToTerms && (
        <p className="text-sm text-red-600">{errors.agreeToTerms.message}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isValid || isLoading}
        className={\`
          w-full flex justify-center py-3 px-4 border border-transparent
          rounded-lg shadow-sm text-sm font-medium text-white
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          disabled:opacity-50 disabled:cursor-not-allowed
          \${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}
        \`}
      >
        {isLoading ? (
          <>
            <Loader2 className="animate-spin -ml-1 mr-3 h-4 w-4" />
            Creating account...
          </>
        ) : (
          'Create Account'
        )}
      </button>

      {/* Sign In Link */}
      <div className="text-center">
        <span className="text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-600 hover:text-blue-500 font-medium">
            Sign in
          </Link>
        </span>
      </div>
    </form>
  )
}
\`\`\`

### Validation and Security

#### Real-time Validation
- Email format and availability checking
- Password strength requirements
- Account type selection validation
- Terms of service acceptance

#### Security Measures
- Rate limiting on registration attempts
- Email verification requirements
- CAPTCHA protection against bots
- Secure password hashing on server-side`,
      calloutBoxes: [
        {
          type: "info",
          title: "Conversion Optimization",
          content: "Our multi-step registration process reduces abandonment by 35% compared to single-page registration."
        }
      ]
    },
    {
      id: "password-reset",
      title: "Password Reset Flow",
      content: `The password reset flow provides a secure, user-friendly way for users to regain access to their accounts.

### Password Reset Process

#### Step 1: Request Reset
Users initiate password reset through:
- Login form "Forgot Password" link
- Direct navigation to reset page
- Account settings for security
- Email verification fallback

#### Step 2: Email Verification
Secure reset link generation:
- Time-limited reset tokens (15 minutes)
- One-time use tokens
- Email verification with secure links
- Rate limiting on reset requests

#### Step 3: New Password Setup
Secure password creation:
- Password strength requirements
- Password history checking
- Confirmation validation
- Automatic logout from other sessions

#### Step 4: Confirmation and Security
Post-reset security measures:
- Email confirmation of password change
- Session invalidation on all devices
- Security recommendations
- Activity log updates

### Password Reset Implementation

#### Reset Request Form
\`\`\`typescript
// components/auth/ResetPasswordForm.tsx
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, CheckCircle } from 'lucide-react'
import Link from 'next/link'

const resetRequestSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

type ResetRequestFormData = z.infer<typeof resetRequestSchema>

const resetPasswordSchema = z.object({
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase, and number'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

export function ResetPasswordForm({ token }: { token?: string }) {
  const [step, setStep] = useState(token ? 'reset' : 'request')
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')

  // Request Reset Form
  const requestForm = useForm<ResetRequestFormData>({
    resolver: zodResolver(resetRequestSchema),
  })

  // Reset Password Form
  const resetForm = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  })

  const onRequestReset = async (data: ResetRequestFormData) => {
    setIsLoading(true)
    try {
      await fetch('/api/auth/request-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      })
      setEmail(data.email)
      setStep('success')
    } catch (error) {
      requestForm.setError('email', { message: 'Failed to send reset email' })
    } finally {
      setIsLoading(false)
    }
  }

  const onResetPassword = async (data: ResetPasswordFormData) => {
    setIsLoading(true)
    try {
      await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          token, 
          password: data.password 
        }),
      })
      setStep('completed')
    } catch (error) {
      resetForm.setError('password', { message: 'Failed to reset password' })
    } finally {
      setIsLoading(false)
    }
  }

  // Success states
  if (step === 'success') {
    return (
      <div className="max-w-md mx-auto text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h2>
        <p className="text-gray-600 mb-6">
          We've sent a password reset link to <strong>{email}</strong>.
          Click the link in the email to create a new password.
        </p>
        <div className="space-y-3">
          <p className="text-sm text-gray-500">
            Didn't receive the email? Check your spam folder or{' '}
            <button 
              onClick={() => setStep('request')}
              className="text-blue-600 hover:text-blue-500"
            >
              try again
            </button>
          </p>
          <Link
            href="/auth/login"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    )
  }

  if (step === 'completed') {
    return (
      <div className="max-w-md mx-auto text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Password Reset Complete</h2>
        <p className="text-gray-600 mb-6">
          Your password has been successfully reset. You can now sign in with your new password.
        </p>
        <Link
          href="/auth/login"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
        >
          Sign In with New Password
        </Link>
      </div>
    )
  }

  // Request Reset Form
  if (step === 'request') {
    return (
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h2>
          <p className="text-gray-600">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        </div>

        <form onSubmit={requestForm.handleSubmit(onRequestReset)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              {...requestForm.register('email')}
              type="email"
              id="email"
              autoComplete="email"
              className={\`
                w-full px-3 py-2 border rounded-lg shadow-sm
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                \${requestForm.formState.errors.email ? 'border-red-300' : 'border-gray-300'}
              \`}
              placeholder="Enter your email address"
            />
            {requestForm.formState.errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {requestForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!requestForm.formState.isValid || isLoading}
            className={\`
              w-full flex justify-center py-2 px-4 border border-transparent
              rounded-lg shadow-sm text-sm font-medium text-white
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              disabled:opacity-50 disabled:cursor-not-allowed
              \${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}
            \`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-3 h-4 w-4" />
                Sending...
              </>
            ) : (
              'Send Reset Link'
            )}
          </button>

          <div className="text-center">
            <Link href="/auth/login" className="text-sm text-blue-600 hover:text-blue-500">
              Back to Sign In
            </Link>
          </div>
        </form>
      </div>
    )
  }

  // Reset Password Form
  if (step === 'reset') {
    return (
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Create New Password</h2>
          <p className="text-gray-600">
            Enter your new password below.
          </p>
        </div>

        <form onSubmit={resetForm.handleSubmit(onResetPassword)} className="space-y-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              New Password
            </label>
            <input
              {...resetForm.register('password')}
              type="password"
              id="password"
              autoComplete="new-password"
              className={\`
                w-full px-3 py-2 border rounded-lg shadow-sm
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                \${resetForm.formState.errors.password ? 'border-red-300' : 'border-gray-300'}
              \`}
              placeholder="Enter new password"
            />
            {resetForm.formState.errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {resetForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm New Password
            </label>
            <input
              {...resetForm.register('confirmPassword')}
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              className={\`
                w-full px-3 py-2 border rounded-lg shadow-sm
                focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                \${resetForm.formState.errors.confirmPassword ? 'border-red-300' : 'border-gray-300'}
              \`}
              placeholder="Confirm new password"
            />
            {resetForm.formState.errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">
                {resetForm.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!resetForm.formState.isValid || isLoading}
            className={\`
              w-full flex justify-center py-2 px-4 border border-transparent
              rounded-lg shadow-sm text-sm font-medium text-white
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
              disabled:opacity-50 disabled:cursor-not-allowed
              \${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}
            \`}
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-3 h-4 w-4" />
                Updating...
              </>
            ) : (
              'Update Password'
            )}
          </button>
        </form>
      </div>
    )
  }

  return null
}
\`\`\`

### Security Features

#### Token Security
- Cryptographically secure random tokens
- Short expiration times (15 minutes)
- One-time use validation
- Token binding to user accounts

#### Rate Limiting
- Request frequency limitations
- Email sending restrictions
- Progressive delays for repeated requests
- Account protection mechanisms`,
      calloutBoxes: [
        {
          type: "warning",
          title: "Security Best Practice",
          content: "Always invalidate all user sessions after password reset and send confirmation emails to notify users of security changes."
        }
      ]
    },
    {
      id: "email-verification",
      title: "Email Verification",
      content: `Email verification is a critical security feature that ensures account ownership and reduces spam registrations.

### Verification Process

#### Automatic Email Sending
- Immediate verification email after registration
- Clear instructions and action buttons
- Professional email template design
- Mobile-responsive email layouts

#### Verification Link Security
- Cryptographically secure verification tokens
- Time-limited links (24 hours)
- One-time use validation
- IP address binding for security

#### Account Activation
- Real-time account status updates
- Login restrictions until verification
- Clear messaging about account status
- Resend verification options

### Email Verification Implementation

#### Email Template Component
\`\`\`typescript
// components/auth/EmailVerification.tsx
import { useState } from 'react'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

interface VerificationEmailProps {
  email: string
  onResend?: () => Promise<void>
  onUpdateEmail?: (email: string) => void
}

export function EmailVerificationPrompt({ 
  email, 
  onResend, 
  onUpdateEmail 
}: VerificationEmailProps) {
  const [isResending, setIsResending] = useState(false)
  const [resendCount, setResendCount] = useState(0)
  const [timeUntilResend, setTimeUntilResend] = useState(0)

  const handleResend = async () => {
    if (timeUntilResend > 0 || isResending) return

    setIsResending(true)
    try {
      await onResend?.()
      setResendCount(prev => prev + 1)
      setTimeUntilResend(60) // 60 second cooldown
    } catch (error) {
      console.error('Failed to resend verification email:', error)
    } finally {
      setIsResending(false)
    }
  }

  // Countdown timer for resend button
  useEffect(() => {
    if (timeUntilResend > 0) {
      const timer = setTimeout(() => {
        setTimeUntilResend(prev => prev - 1)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [timeUntilResend])

  const canResend = timeUntilResend === 0 && resendCount < 3
  const showUpdateEmail = resendCount >= 3

  return (
    <div className="max-w-md mx-auto text-center bg-blue-50 border border-blue-200 rounded-lg p-6">
      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <AlertCircle className="h-8 w-8 text-blue-600" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Verify Your Email Address
      </h3>
      
      <p className="text-gray-600 mb-6">
        We've sent a verification link to <strong>{email}</strong>.
        Please click the link in the email to activate your account.
      </p>

      <div className="space-y-4">
        {/* Resend Button */}
        <button
          onClick={handleResend}
          disabled={!canResend || isResending}
          className={\`
            inline-flex items-center px-4 py-2 border border-transparent
            text-sm font-medium rounded-lg
            \${canResend 
              ? 'text-blue-700 bg-blue-100 hover:bg-blue-200' 
              : 'text-gray-400 bg-gray-100 cursor-not-allowed'
            }
          \`}
        >
          {isResending ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
              Sending...
            </>
          ) : timeUntilResend > 0 ? (
            "Resend in " + timeUntilResend + "s"
          ) : (
            'Resend Verification Email'
          )}
        </button>

        {/* Update Email Option */}
        {showUpdateEmail && (
          <div className="pt-4 border-t border-blue-200">
            <p className="text-sm text-gray-600 mb-3">
              Having trouble? You can update your email address:
            </p>
            <button
              onClick={() => onUpdateEmail?.(email)}
              className="text-blue-600 hover:text-blue-500 text-sm underline"
            >
              Update Email Address
            </button>
          </div>
        )}

        {/* Help Text */}
        <div className="text-xs text-gray-500 pt-4 border-t border-blue-200">
          <p>Verification links expire in 24 hours for security.</p>
          <p className="mt-1">
            Didn't receive the email? Check your spam folder or{' '}
            <a href="/help/email-verification" className="text-blue-600 hover:text-blue-500">
              get help
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

// Email Verification Page Component
export function EmailVerificationPage() {
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending')
  const [isLoading, setIsLoading] = useState(true)
  const [email, setEmail] = useState('')

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const token = urlParams.get('token')
    const userEmail = urlParams.get('email')

    if (userEmail) {
      setEmail(userEmail)
    }

    if (token) {
      verifyEmail(token)
    } else {
      setVerificationStatus('error')
      setIsLoading(false)
    }
  }, [])

  const verifyEmail = async (token: string) => {
    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })

      if (response.ok) {
        setVerificationStatus('success')
      } else {
        setVerificationStatus('error')
      }
    } catch (error) {
      setVerificationStatus('error')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    )
  }

  if (verificationStatus === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Email Verified!</h2>
          <p className="text-gray-600 mb-6">
            Your email has been successfully verified. You can now access all features of CareerForge.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
          >
            Go to Dashboard
          </a>
        </div>
      </div>
    )
  }

  if (verificationStatus === 'error') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Verification Failed</h2>
          <p className="text-gray-600 mb-6">
            The verification link is invalid or has expired. Please request a new verification email.
          </p>
          <EmailVerificationPrompt email={email} />
        </div>
      </div>
    )
  }

  return null
}
\`\`\`

### Email Template Design

#### Professional Email Templates
- Clean, branded design
- Clear call-to-action buttons
- Mobile-responsive layouts
- Accessibility-compliant markup

#### Security Considerations
- Secure token generation
- Time-limited verification links
- One-time use validation
- IP address tracking for suspicious activity`,
      calloutBoxes: [
        {
          type: "info",
          title: "Email Delivery",
          content: "Our email verification system achieves 98% delivery rates with automatic retry logic for failed deliveries."
        }
      ]
    },
    {
      id: "social-authentication",
      title: "Social Authentication",
      content: `Social authentication provides a seamless login experience while maintaining security and privacy standards.

### Supported Providers

#### OAuth 2.0 Providers
- **Google**: Widely used, enterprise-friendly
- **LinkedIn**: Professional networking integration
- **GitHub**: Developer-focused authentication
- **Microsoft**: Enterprise and educational institutions

#### Provider Benefits
- **Reduced Friction**: No password creation required
- **Enhanced Security**: Leverages provider's security measures
- **Quick Setup**: Instant account creation
- **Trust Building**: Familiar login experience

### Social Authentication Implementation

#### OAuth Flow Handler
\`\`\`typescript
// hooks/useSocialAuth.ts
import { useState } from 'react'
import { useAuth } from './useAuth'

interface SocialAuthProvider {
  id: string
  name: string
  clientId: string
  redirectUri: string
  scope: string[]
}

const providers: Record<string, SocialAuthProvider> = {
  google: {
    id: 'google',
    name: 'Google',
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
    redirectUri: window.location.origin + '/auth/callback/google',
    scope: ['openid', 'profile', 'email'],
  },
  linkedin: {
    id: 'linkedin',
    name: 'LinkedIn',
    clientId: process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID!,
    redirectUri: window.location.origin + '/auth/callback/linkedin',
    scope: ['r_liteprofile', 'r_emailaddress'],
  },
  github: {
    id: 'github',
    name: 'GitHub',
    clientId: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID!,
    redirectUri: window.location.origin + '/auth/callback/github',
    scope: ['user:email'],
  },
}

export function useSocialAuth() {
  const [isLoading, setIsLoading] = useState(false)
  const { loginWithSocial } = useAuth()

  const initiateOAuth = async (providerId: string) => {
    const provider = providers[providerId]
    if (!provider) {
      throw new Error('Unsupported provider: ' + providerId)
    }

    setIsLoading(true)

    try {
      // Generate state parameter for CSRF protection
      const state = generateRandomString(32)
      const nonce = generateRandomString(32)
      
      // Store state and nonce for verification
      sessionStorage.setItem('oauth_state', state)
      sessionStorage.setItem('oauth_nonce', nonce)

      // Build OAuth URL
      const params = new URLSearchParams({
        client_id: provider.clientId,
        redirect_uri: provider.redirectUri,
        scope: provider.scope.join(' '),
        response_type: 'code',
        state,
        nonce,
      })

      // Provider-specific configurations
      const oauthUrls = {
        google: 'https://accounts.google.com/o/oauth2/v2/auth',
        linkedin: 'https://www.linkedin.com/oauth/v2/authorization',
        github: 'https://github.com/login/oauth/authorize',
      }

      const authUrl = oauthUrls[providerId] + '?' + params.toString()
      
      // Redirect to provider
      window.location.href = authUrl
    } catch (error) {
      setIsLoading(false)
      throw error
    }
  }

  const handleCallback = async (providerId: string, code: string, state: string) => {
    // Verify state parameter
    const storedState = sessionStorage.getItem('oauth_state')
    if (state !== storedState) {
      throw new Error('Invalid state parameter')
    }

    // Clear stored state
    sessionStorage.removeItem('oauth_state')
    sessionStorage.removeItem('oauth_nonce')

    setIsLoading(true)

    try {
      // Exchange code for access token
      const response = await fetch('/api/auth/social/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: providerId,
          code,
          state,
        }),
      })

      if (!response.ok) {
        throw new Error('Authentication failed')
      }

      const { user, tokens } = await response.json()
      
      // Complete authentication
      await loginWithSocial(user, tokens)
    } catch (error) {
      console.error('Social auth callback error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return {
    initiateOAuth,
    handleCallback,
    isLoading,
    providers: Object.values(providers),
  }
}

// OAuth Callback Page Component
export function OAuthCallbackPage({ provider }: { provider: string }) {
  const { handleCallback } = useSocialAuth()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    const handleCallbackLogic = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')
        const state = urlParams.get('state')
        const errorParam = urlParams.get('error')

        if (errorParam) {
          throw new Error(errorParam)
        }

        if (!code || !state) {
          throw new Error('Missing authorization code or state')
        }

        await handleCallback(provider, code, state)
        setStatus('success')
      } catch (err: any) {
        setError(err.message)
        setStatus('error')
      }
    }

    handleCallbackLogic()
  }, [provider, handleCallback])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Completing sign in...</p>
        </div>
      </div>
    )
  }

  if (status === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Successfully Signed In!</h2>
          <p className="text-gray-600 mb-6">Redirecting you to your dashboard...</p>
          <Meta httpEquiv="refresh" content="2; url=/dashboard" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In Failed</h2>
        <p className="text-gray-600 mb-6">
          We couldn't complete your sign in with {provider}. {error}
        </p>
        <a
          href="/auth/login"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
        >
          Try Again
        </a>
      </div>
    </div>
  )
}

// Utility function for generating random strings
function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
\`\`\`

### Security Considerations

#### CSRF Protection
- State parameter validation
- Nonce verification
- Secure token generation
- Session-based validation

#### Provider Security
- OAuth 2.0 compliance
- Secure token exchange
- Minimal scope requests
- Token validation and refresh`,
      calloutBoxes: [
        {
          type: "success",
          title: "Social Auth Adoption",
          content: "45% of new users sign up using social authentication, with Google being the most popular provider at 60%."
        }
      ]
    },
    {
      id: "session-management",
      title: "Session Management",
      content: `Effective session management ensures user convenience while maintaining security across devices and browsers.

### Session Architecture

#### Token-Based Sessions
- **Access Tokens**: Short-lived JWT tokens for API authentication
- **Refresh Tokens**: Long-lived tokens for session renewal
- **Secure Storage**: HTTP-only cookies in production
- **Automatic Refresh**: Transparent token renewal

#### Session Lifecycle
- **Creation**: User login or social authentication
- **Active Use**: Regular token refresh and validation
- **Renewal**: Automatic token refresh before expiration
- **Termination**: User logout or security events

### Session Implementation

#### Session Management Hook
\`\`\`typescript
// hooks/useSession.ts
import { useState, useEffect, useCallback } from 'react'
import { useAuth } from './useAuth'

interface SessionInfo {
  userId: string
  email: string
  accountType: 'jobseeker' | 'employer'
  isVerified: boolean
  lastActivity: Date
  deviceInfo: {
    userAgent: string
    platform: string
    browser: string
  }
}

export function useSession() {
  const [session, setSession] = useState<SessionInfo | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  // Check session status
  const checkSession = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/session', {
        method: 'GET',
        credentials: 'include',
      })

      if (response.ok) {
        const sessionData = await response.json()
        setSession(sessionData)
      } else if (response.status === 401) {
        setSession(null)
      } else {
        throw new Error('Failed to check session')
      }
    } catch (err) {
      setError(err.message)
      setSession(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  // Refresh session
  const refreshSession = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include',
      })

      if (response.ok) {
        const sessionData = await response.json()
        setSession(sessionData)
        return true
      } else {
        setSession(null)
        return false
      }
    } catch (err) {
      setError(err.message)
      setSession(null)
      return false
    }
  }, [])

  // Extend session (keep alive)
  const extendSession = useCallback(async () => {
    if (!session) return false

    try {
      const response = await fetch('/api/auth/extend', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId: session.userId,
          activity: 'extend',
        }),
      })

      return response.ok
    } catch (err) {
      console.error('Failed to extend session:', err)
      return false
    }
  }, [session])

  // Terminate session
  const terminateSession = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      setSession(null)
    } catch (err) {
      console.error('Failed to terminate session:', err)
    }
  }, [])

  // Session monitoring
  useEffect(() => {
    if (!user) {
      setSession(null)
      setIsLoading(false)
      return
    }

    checkSession()

    // Set up session monitoring
    const SESSION_CHECK_INTERVAL = 5 * 60 * 1000 // 5 minutes
    const SESSION_EXTENSION_THRESHOLD = 10 * 60 * 1000 // 10 minutes before expiry

    const interval = setInterval(async () => {
      if (session) {
        // Check if session is close to expiry
        const timeSinceLastActivity = Date.now() - session.lastActivity.getTime()
        
        if (timeSinceLastActivity >= SESSION_EXTENSION_THRESHOLD) {
          const extended = await extendSession()
          if (!extended) {
            setSession(null)
          }
        }
      }
    }, SESSION_CHECK_INTERVAL)

    // Activity tracking
    const trackActivity = () => {
      if (session) {
        setSession(prev => prev ? {
          ...prev,
          lastActivity: new Date()
        } : null)
      }
    }

    // Listen for user activity
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart']
    events.forEach(event => {
      document.addEventListener(event, trackActivity, { passive: true })
    })

    return () => {
      clearInterval(interval)
      events.forEach(event => {
        document.removeEventListener(event, trackActivity)
      })
    }
  }, [user, session, checkSession, extendSession])

  // Handle visibility change (tab switching)
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (!document.hidden && session) {
        // Check session status when tab becomes active
        const refreshed = await refreshSession()
        if (!refreshed) {
          setSession(null)
        }
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [session, refreshSession])

  return {
    session,
    isLoading,
    error,
    refreshSession,
    extendSession,
    terminateSession,
    checkSession,
  }
}

// Session Manager Component
export function SessionManager() {
  const { session, extendSession, terminateSession } = useSession()
  const [showSessionWarning, setShowSessionWarning] = useState(false)
  const [timeUntilExpiry, setTimeUntilExpiry] = useState(0)

  // Monitor session expiry
  useEffect(() => {
    if (!session) return

    const checkExpiry = () => {
      const now = Date.now()
      const expiryTime = now + (30 * 60 * 1000) // Assume 30 min expiry
      const timeLeft = expiryTime - now

      if (timeLeft <= 5 * 60 * 1000) { // 5 minutes warning
        setShowSessionWarning(true)
        setTimeUntilExpiry(timeLeft)
      }
    }

    const interval = setInterval(checkExpiry, 30000) // Check every 30 seconds
    checkExpiry()

    return () => clearInterval(interval)
  }, [session])

  const handleExtendSession = async () => {
    const extended = await extendSession()
    if (extended) {
      setShowSessionWarning(false)
      setTimeUntilExpiry(0)
    }
  }

  if (!session) return null

  return (
    <>
      {/* Session Warning Modal */}
      {showSessionWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Session Expiring Soon
            </h3>
            <p className="text-gray-600 mb-4">
              Your session will expire in {Math.floor(timeUntilExpiry / 60000)} minutes.
              Would you like to extend your session?
            </p>
            <div className="flex space-x-3">
              <button
                onClick={handleExtendSession}
                className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Extend Session
              </button>
              <button
                onClick={terminateSession}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Session Indicator (optional) */}
      <div className="fixed bottom-4 right-4 text-xs text-gray-500">
        Last activity: {session.lastActivity.toLocaleTimeString()}
      </div>
    </>
  )
}
\`\`\`

### Multi-Device Session Management

#### Device Tracking
- Device fingerprinting for security
- Session management per device
- Remote session termination
- Device-specific notifications

#### Session Security
- Concurrent session limits
- Suspicious activity detection
- Automatic session invalidation
- Security event logging`,
      calloutBoxes: [
        {
          type: "info",
          title: "Session Performance",
          content: "Our session management system maintains 99.9% uptime with automatic failover and distributed session storage."
        }
      ]
    },
    {
      id: "security-features",
      title: "Security Features",
      content: `Comprehensive security measures protect user accounts and data throughout the authentication process.

### Security Implementation

#### Multi-Factor Authentication (MFA)
Additional security layer for sensitive accounts:
- Time-based One-Time Passwords (TOTP)
- SMS-based verification
- Email backup codes
- Biometric authentication

#### Account Protection
- Brute force attack prevention
- Account lockout mechanisms
- Suspicious activity monitoring
- Automatic security notifications

### Security Features Implementation

#### MFA Setup Component
\`\`\`typescript
// components/security/MFASetup.tsx
import { useState } from 'react'
import { Shield, Smartphone, Mail, Download } from 'lucide-react'
import QRCode from 'qrcode'

interface MFASetupProps {
  onComplete: (method: 'totp' | 'sms' | 'email') => void
}

export function MFASetup({ onComplete }: MFASetupProps) {
  const [selectedMethod, setSelectedMethod] = useState<'totp' | 'sms' | 'email' | null>(null)
  const [qrCode, setQrCode] = useState('')
  const [secret, setSecret] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [step, setStep] = useState<'method' | 'setup' | 'verify'>('method')

  const generateTOTPSecret = () => {
    const array = new Uint8Array(20)
    crypto.getRandomValues(array)
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
  }

  const handleMethodSelect = async (method: 'totp' | 'sms' | 'email') => {
    setSelectedMethod(method)
    
    if (method === 'totp') {
      const newSecret = generateTOTPSecret()
      setSecret(newSecret)
      
      // Generate QR code
      const otpauthUrl = 'otpauth://totp/CareerForge:user@example.com?secret=' + newSecret + '&issuer=CareerForge'
      const qr = await QRCode.toDataURL(otpauthUrl)
      setQrCode(qr)
      
      setStep('setup')
    } else {
      setStep('setup')
    }
  }

  const handleVerify = async () => {
    try {
      // Verify the code
      const response = await fetch('/api/auth/mfa/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          method: selectedMethod,
          code: verificationCode,
          secret: selectedMethod === 'totp' ? secret : undefined,
        }),
      })

      if (response.ok) {
        onComplete(selectedMethod!)
      } else {
        // Handle verification error
        console.error('MFA verification failed')
      }
    } catch (error) {
      console.error('MFA setup error:', error)
    }
  }

  if (step === 'method') {
    return (
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Set Up Two-Factor Authentication
          </h2>
          <p className="text-gray-600">
            Add an extra layer of security to your account
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleMethodSelect('totp')}
            className="w-full flex items-center p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Smartphone className="h-8 w-8 text-blue-600 mr-4" />
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Authenticator App</h3>
              <p className="text-sm text-gray-600">
                Use Google Authenticator, Authy, or similar app
              </p>
            </div>
          </button>

          <button
            onClick={() => handleMethodSelect('sms')}
            className="w-full flex items-center p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Mail className="h-8 w-8 text-blue-600 mr-4" />
            <div className="text-left">
              <h3 className="font-medium text-gray-900">SMS Text Message</h3>
              <p className="text-sm text-gray-600">
                Receive codes via text message
              </p>
            </div>
          </button>

          <button
            onClick={() => handleMethodSelect('email')}
            className="w-full flex items-center p-4 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Mail className="h-8 w-8 text-blue-600 mr-4" />
            <div className="text-left">
              <h3 className="font-medium text-gray-900">Email</h3>
              <p className="text-sm text-gray-600">
                Receive codes via email
              </p>
            </div>
          </button>
        </div>

        <div className="mt-6 text-center">
          <button className="text-sm text-gray-500 hover:text-gray-700">
            Skip for now
          </button>
        </div>
      </div>
    )
  }

  if (step === 'setup' && selectedMethod === 'totp') {
    return (
      <div className="max-w-md mx-auto text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Set Up Authenticator App
        </h3>
        
        <div className="mb-6">
          <img src={qrCode} alt="QR Code" className="mx-auto mb-4" />
          <p className="text-sm text-gray-600 mb-2">
            Scan this QR code with your authenticator app
          </p>
          <div className="bg-gray-100 p-3 rounded text-sm font-mono break-all">
            {secret}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Enter verification code
          </label>
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="000000"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center text-lg font-mono"
            maxLength={6}
          />
        </div>

        <button
          onClick={handleVerify}
          disabled={verificationCode.length !== 6}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Verify and Enable
        </button>
      </div>
    )
  }

  return null
}

// Security Event Monitoring
export function SecurityMonitoring() {
  const [events, setEvents] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSecurityEvents = async () => {
      try {
        const response = await fetch('/api/auth/security/events')
        if (response.ok) {
          const data = await response.json()
          setEvents(data.events)
        }
      } catch (error) {
        console.error('Failed to fetch security events:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSecurityEvents()

    // Set up real-time security event monitoring
    const eventSource = new EventSource('/api/auth/security/stream')
    eventSource.onmessage = (event) => {
      const newEvent = JSON.parse(event.data)
      setEvents(prev => [newEvent, ...prev.slice(0, 9)]) // Keep last 10 events
    }

    return () => eventSource.close()
  }, [])

  if (isLoading) {
    return <div>Loading security events...</div>
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Recent Security Activity</h3>
      
      {events.length === 0 ? (
        <p className="text-gray-600">No recent security events</p>
      ) : (
        <div className="space-y-2">
          {events.map((event, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div>
                <p className="font-medium">{event.description}</p>
                <p className="text-sm text-gray-600">
                  {new Date(event.timestamp).toLocaleString()}
                </p>
              </div>
              <span className={\`
                px-2 py-1 rounded text-xs font-medium
                \${event.severity === 'high' ? 'bg-red-100 text-red-800' :
                  event.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'}
              \`}>
                {event.severity}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
\`\`\`

### Security Best Practices

#### Data Protection
- Encryption at rest and in transit
- Secure password hashing (bcrypt/argon2)
- Token-based authentication
- Session management best practices

#### Monitoring and Alerts
- Real-time security event monitoring
- Automated threat detection
- User notification system
- Incident response procedures`,
      calloutBoxes: [
        {
          type: "warning",
          title: "Security Priority",
          content: "Security is our top priority. All authentication features undergo regular security audits and penetration testing."
        }
      ]
    }
  ],
  nextSteps: {
    title: "Continue Learning",
    links: [
      {
        text: "Profile Management",
        href: "/docs/frontend/profile-management",
        description: "Learn about user profile features and data management"
      },
      {
        text: "Session Management",
        href: "/docs/frontend/session-management",
        description: "Advanced session handling and security measures"
      },
      {
        text: "Security Best Practices",
        href: "/docs/security/best-practices",
        description: "Comprehensive security guidelines and implementation"
      }
    ]
  },
  relatedResources: [
    {
      text: "API Authentication",
      href: "/docs/backend/authentication",
      description: "Backend authentication implementation and API security"
    },
    {
      text: "User Management",
      href: "/docs/backend/user-management",
      description: "User account management and administration features"
    },
    {
      text: "Security Architecture",
      href: "/docs/security/architecture",
      description: "Overall security architecture and threat modeling"
    }
  ]
}