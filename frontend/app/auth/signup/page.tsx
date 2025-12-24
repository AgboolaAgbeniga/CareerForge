'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/layout/AuthLayout';

export default function SignupPage() {
  const [role, setRole] = useState<'recruiter' | 'job_seeker'>('recruiter');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          role,
          firstName,
          lastName,
        }),
      });

      if (response.ok) {
        // Since verification is skipped, redirect to login
        router.push('/auth/login');
      } else {
        const error = await response.json();
        alert(error.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Forge your future"
      subtitle="Join thousands of companies hiring top talent."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Role Selector */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <label className="cursor-pointer">
            <input
              type="radio"
              name="role"
              className="peer sr-only"
              checked={role === 'recruiter'}
              onChange={() => setRole('recruiter')}
            />
            <div className="p-3 rounded-xl border border-slate-700 bg-slate-900/50 hover:bg-slate-800 peer-checked:bg-indigo-500/10 peer-checked:border-indigo-500/50 peer-checked:text-white transition-all text-center">
              <svg className="w-5 h-5 mx-auto mb-2 text-slate-400 peer-checked:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m8 0V8a2 2 0 01-2 2H8a2 2 0 01-2-2V6m8 0H8m0 0V4" />
              </svg>
              <span className="block text-xs font-medium">Recruiter</span>
            </div>
          </label>
          <label className="cursor-pointer">
            <input
              type="radio"
              name="role"
              className="peer sr-only"
              checked={role === 'job_seeker'}
              onChange={() => setRole('job_seeker')}
            />
            <div className="p-3 rounded-xl border border-slate-700 bg-slate-900/50 hover:bg-slate-800 peer-checked:bg-indigo-500/10 peer-checked:border-indigo-500/50 peer-checked:text-white transition-all text-center">
              <svg className="w-5 h-5 mx-auto mb-2 text-slate-400 peer-checked:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="block text-xs font-medium">Job Seeker</span>
            </div>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">First Name</label>
            <input
              type="text"
              placeholder="Sarah"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Last Name</label>
            <input
              type="text"
              placeholder="Connor"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-slate-300">Work Email</label>
          <input
            type="email"
            placeholder="sarah@cyberdyne.com"
            className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Password</label>
            <input
              type="password"
              placeholder="Create password"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-slate-300">Confirm</label>
            <input
              type="password"
              placeholder="Confirm"
              className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 px-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold py-2.5 rounded-lg shadow-lg shadow-indigo-500/20 transition-all flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
          <p className="text-center text-[10px] text-slate-600 mt-4">By joining, you agree to our Terms of Service.</p>
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
