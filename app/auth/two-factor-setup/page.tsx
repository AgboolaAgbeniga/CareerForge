'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TwoFactorSetupPage() {
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCodeError('');
    if (code.length === 6 && /^\d+$/.test(code)) {
      // Simulate success
      setStep(2);
    } else {
      setCodeError('Invalid code. Please try again.');
    }
  };

  const handleContinue = () => {
    router.push('/job-seeker/dashboard-job_seekers');
  };

  const handleSkip = () => {
    router.push('/job-seeker/dashboard-job_seekers');
  };

  if (step === 2) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 text-gray-800">
        <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8 sm:p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Setup Complete!
            </h1>
            <p className="text-gray-600 text-sm mb-6">
              Two-factor authentication is now enabled. Your account is more
              secure.
            </p>
            <button
              onClick={handleContinue}
              className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Continue to Dashboard
            </button>
          </div>
          <div className="bg-gray-50 p-4 text-center border-t border-gray-200">
            <button
              onClick={handleSkip}
              className="text-sm text-gray-500 hover:text-gray-700 font-medium"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100 text-gray-800">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8 sm:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Two-Factor Authentication
            </h1>
            <p className="text-gray-600 text-sm">
              Add an extra layer of security to your account.
            </p>
          </div>

          {/* Step 1: Scan QR Code */}
          <div>
            <p className="text-center text-sm text-gray-600 mb-4">
              Scan the QR code below with your authenticator app (e.g., Google
              Authenticator, Authy).
            </p>
            <div className="flex justify-center mb-4">
              <svg
                className="w-40 h-40"
                viewBox="0 0 256 256"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#000"
                  d="M128 0h128v128H128zM0 0h128v128H0zm128 128h128v128H128z"
                  opacity=".1"
                />
                <path
                  fill="#000"
                  d="M0 0h128v128H0zm16 16h96v96H16zm128-16h112v112H128zm16 16h80v80h-80zM0 128h128v128H0zm16 16h96v96H16zm208-16h16v16h-16zm-16 0h-16v16h16zm16 16h16v16h-16zm-16 0h-16v16h16zm-16 16h16v16h-16zm0-32h16v16h-16zm-16-16h16v16h-16zm-16 0h-16v16h16zm32 48h16v16h-16zm-16 16h16v16h-16zm0 16h16v16h-16zm-16 16h16v16h-16zm-16-16h16v16h-16zm-16 0h-16v16h16zm32-16h16v16h-16zm-16-16h16v16h-16zm16 48h16v16h-16zm16-16h16v16h-16zm-48 0h-16v16h16zm-16 0h-16v16h16zm16-16h16v16h-16zm-32-16h16v16h-16zm-16 0h-16v16h16zm16 16h16v16h-16zm16-32h16v16h-16zM48 48h32v32H48z"
                />
              </svg>
            </div>
            <div className="bg-gray-100 p-3 rounded-lg text-center mb-6">
              <p className="text-xs text-gray-500 mb-1">
                Can't scan? Enter this code manually:
              </p>
              <code className="text-sm font-semibold tracking-widest">
                JBSWY3DPEHPK3PXP
              </code>
            </div>
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="codeInput"
                className="block text-sm font-medium text-gray-700 mb-1 text-center"
              >
                Enter the 6-digit code from your app
              </label>
              <input
                type="text"
                id="codeInput"
                name="code"
                required
                maxLength={6}
                pattern="\d{6}"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg text-center text-2xl font-mono focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="123456"
                style={{ letterSpacing: '0.5em' }}
              />
              {codeError && (
                <p className="text-red-500 text-xs mt-2 text-center">
                  {codeError}
                </p>
              )}
              <button
                type="submit"
                className="w-full mt-4 bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Verify & Activate
              </button>
            </form>
          </div>
        </div>

        {/* Footer for Skip option */}
        <div className="bg-gray-50 p-4 text-center border-t border-gray-200">
          <button
            onClick={handleSkip}
            className="text-sm text-gray-500 hover:text-gray-700 font-medium"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}
