'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const getPasswordStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const passwordStrength = getPasswordStrength(password);

  const getStrengthColor = () => {
    if (passwordStrength <= 2) return 'bg-red-500';
    if (passwordStrength === 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthWidth = () => {
    if (passwordStrength <= 2) return '33%';
    if (passwordStrength === 3) return '66%';
    return '100%';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    setConfirmError('');

    if (password !== confirmPassword) {
      setConfirmError('Passwords do not match.');
      return;
    }

    if (passwordStrength < 3) {
      setPasswordError('Password is too weak. Please choose a stronger password.');
      return;
    }

    // Simulate success
    setShowSuccess(true);
    setTimeout(() => {
      router.push('/auth/login');
    }, 2000);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100 text-gray-800">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Password Reset!</h1>
            <p className="text-gray-600 text-sm mb-6">
              Your password has been successfully updated. You can now log in with your new password.
            </p>
            <Link
              href="/auth/login"
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors inline-block text-center"
            >
              Proceed to Log In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100 text-gray-800">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold tracking-tighter text-lg">
                CF
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Set new password
            </h1>
            <p className="text-gray-600 text-sm">
              Choose a strong, new password for your account.
            </p>
          </div>

          {/* Reset Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
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
              <div className="h-1 w-full bg-gray-200 rounded mt-1 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${getStrengthColor()}`}
                  style={{ width: getStrengthWidth() }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Use at least 8 characters with letters, numbers, and symbols.
              </p>
              {passwordError && (
                <p className="text-red-500 text-xs mt-1">{passwordError}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {confirmError && (
                <p className="text-red-500 text-xs mt-1">{confirmError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Set New Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
