'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [emailError, setEmailError] = useState('');
  const router = useRouter();

  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const passwordStrength = getPasswordStrength(password);

  const handleEmailBlur = () => {
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName && email && password && role) {
      // Simulate signup success
      router.push('/auth/email-verification');
    }
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-white text-gray-800 min-h-screen flex items-center justify-center p-4">
      <div className="max-w-7xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
        {/* Left Column: Hero and Form */}
        <div className="p-8 sm:p-12 lg:p-16">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between lg:justify-start mb-6">
              <div className="flex items-center">
                <a href="/" className="flex items-center group">
                  <div className="w-14 h-14 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-2xl flex items-center justify-center font-bold tracking-tighter text-xl shadow-lg group-hover:scale-105 transition-transform">
                    CF
                  </div>
                  <span className="ml-3 text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    CareerForge
                  </span>
                </a>
              </div>
              <a
                href="/"
                className="text-sm text-gray-500 hover:text-gray-700 lg:hidden"
              >
                ← Back to Home
              </a>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Join the Future of Careers
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Connect with top employers and unlock your potential with
              AI-powered job matching.
            </p>

            {/* Trust Badges */}
            <div className="flex items-center space-x-6 mb-8">
              <div className="flex items-center text-sm text-gray-500">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                10,000+ Professionals
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <svg
                  className="w-5 h-5 text-blue-500 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
                4.8/5 Rating
              </div>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
              <svg className="w-5 h-5" fill="#0077b5" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Continue with LinkedIn
            </button>
          </div>

          <div className="flex items-center mb-6">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-400">or</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmailBlur}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <div className="password-strength">
                <div
                  className={`password-strength-fill ${passwordStrength <= 2 ? 'password-strength-weak' : passwordStrength === 3 ? 'password-strength-medium' : 'password-strength-strong'}`}
                ></div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I am a
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                  <input
                    type="radio"
                    name="role"
                    value="job_seeker"
                    checked={role === 'job_seeker'}
                    onChange={(e) => setRole(e.target.value)}
                    className="mr-2"
                    required
                  />
                  <span className="text-sm">Job Seeker</span>
                </label>
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={role === 'recruiter'}
                    onChange={(e) => setRole(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm">Recruiter</span>
                </label>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              By signing up, you agree to our{' '}
              <a href="#" className="text-indigo-600 hover:underline">
                Terms
              </a>{' '}
              and{' '}
              <a href="#" className="text-indigo-600 hover:underline">
                Privacy Policy
              </a>
              .
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Sign Up
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="text-indigo-600 hover:underline font-medium"
              >
                Log In
              </Link>
            </p>
          </div>
        </div>

        {/* Right Column: Career Illustration */}
        <div className="hidden lg:flex flex-col items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-10"></div>
          <div className="relative z-10 w-full max-w-lg">
            <svg
              viewBox="0 0 400 300"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
            >
              {/* Background elements */}
              <circle cx="200" cy="150" r="120" fill="rgba(255,255,255,0.1)" />
              <circle cx="200" cy="150" r="80" fill="rgba(255,255,255,0.05)" />

              {/* Career ladder */}
              <rect
                x="160"
                y="100"
                width="4"
                height="120"
                fill="#ffffff"
                opacity="0.8"
              />
              <rect
                x="140"
                y="120"
                width="40"
                height="4"
                fill="#ffffff"
                opacity="0.6"
              />
              <rect
                x="140"
                y="140"
                width="40"
                height="4"
                fill="#ffffff"
                opacity="0.6"
              />
              <rect
                x="140"
                y="160"
                width="40"
                height="4"
                fill="#ffffff"
                opacity="0.6"
              />
              <rect
                x="140"
                y="180"
                width="40"
                height="4"
                fill="#ffffff"
                opacity="0.6"
              />
              <rect
                x="140"
                y="200"
                width="40"
                height="4"
                fill="#ffffff"
                opacity="0.6"
              />

              {/* Person climbing */}
              <circle cx="180" cy="110" r="8" fill="#ffffff" />
              <rect x="175" y="118" width="10" height="15" fill="#ffffff" />
              <rect x="172" y="125" width="4" height="8" fill="#ffffff" />
              <rect x="184" y="125" width="4" height="8" fill="#ffffff" />
              <rect x="172" y="133" width="16" height="4" fill="#ffffff" />

              {/* Briefcase */}
              <rect
                x="185"
                y="135"
                width="8"
                height="10"
                fill="#fbbf24"
                stroke="#ffffff"
                strokeWidth="1"
              />
              <rect x="187" y="137" width="4" height="2" fill="#ffffff" />
              <rect x="185" y="142" width="8" height="3" fill="#1f2937" />

              {/* Stars representing success */}
              <polygon
                points="50,50 52,58 60,58 54,62 56,70 50,64 44,70 46,62 40,58 48,58"
                fill="#fbbf24"
              />
              <polygon
                points="350,40 352,48 360,48 354,52 356,60 350,54 344,60 346,52 340,48 348,48"
                fill="#fbbf24"
              />
              <polygon
                points="320,200 322,208 330,208 324,212 326,220 320,214 314,220 316,212 310,208 318,208"
                fill="#fbbf24"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mt-8 relative z-10">
            Launch Your Career Journey
          </h2>
          <p className="text-indigo-100 mt-4 text-center relative z-10 max-w-sm">
            Discover opportunities, build connections, and advance your
            professional path with CareerForge.
          </p>

          {/* Additional trust elements */}
          <div className="mt-8 flex space-x-4 relative z-10">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">50K+</div>
              <div className="text-sm text-indigo-200">Job Postings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">95%</div>
              <div className="text-sm text-indigo-200">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-sm text-indigo-200">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
