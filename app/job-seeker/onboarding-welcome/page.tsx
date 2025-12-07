'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '../../../components';

export default function OnboardingWelcomePage() {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const handleUploadResume = () => {
    router.push('/job-seeker/upload-resume');
  };

  const handleGenerateResume = () => {
    router.push('/job-seeker/ai-resume-draft');
  };

  const handleImportLinkedIn = () => {
    // Simulate LinkedIn import
    setProgress(33);
  };

  const handleSkip = () => {
    router.push('/job-seeker/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center text-white font-bold tracking-tighter shadow-lg">
                CF
              </div>
              <span className="font-bold text-lg tracking-tight text-gray-900">
                Career<span className="text-indigo-600">Forge</span>
              </span>
            </div>

            {/* Global Nav */}
            <div className="hidden md:flex items-center space-x-1 bg-gray-100/50 p-1 rounded-full border border-gray-200/50">
              <Link
                href="/job-seeker/dashboard"
                className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                Dashboard
              </Link>
              <a
                href="#"
                className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                Resumes
              </a>
              <a
                href="#"
                className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                Jobs
              </a>
              <a
                href="#"
                className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                Applications
              </a>
              <a
                href="#"
                className="px-4 py-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
              >
                Learn
              </a>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              <button className="relative p-2 text-gray-500 hover:text-indigo-600 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-5 5v-5zM4.868 12.683A17.925 17.925 0 0112 21c7.962 0 12-1.21 12-2.683m-12 2.683a17.925 17.925 0 01-7.132-8.317M12 21V9m0 0a9 9 0 019-9 9 9 0 00-9 9z"
                  />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="h-6 w-px bg-gray-200"></div>
              <button className="flex items-center gap-2 group">
                <img
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                  alt="Profile"
                  className="w-8 h-8 rounded-full border border-gray-200 group-hover:border-indigo-300 transition-colors"
                />
                <svg
                  className="w-4 h-4 text-gray-400 group-hover:text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4 lg:p-8 space-y-8">
        {/* Welcome Header */}
        <header className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-200 rounded-full text-sm font-medium text-indigo-700">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
            Welcome to CareerForge
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tight">
            Let's Build Your{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Career Future
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Get started with AI-powered tools to optimize your resume, find
            perfect job matches, and accelerate your career growth.
          </p>
        </header>

        {/* Action Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Upload Resume Card */}
          <div className="group bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-indigo-200">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Upload Resume
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Upload your existing resume for AI analysis and optimization to
              improve your ATS compatibility.
            </p>
            <Button onClick={handleUploadResume} className="w-full">
              Get Started
            </Button>
          </div>

          {/* Generate Resume Card */}
          <div className="group bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-purple-200">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Generate Resume
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Let AI create a tailored resume based on your experience and
              target job descriptions.
            </p>
            <Button
              onClick={handleGenerateResume}
              variant="primary"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Generate Now
            </Button>
          </div>

          {/* Import LinkedIn Card */}
          <div className="group bg-white rounded-3xl p-8 text-center shadow-sm hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-blue-200">
            <div className="w-16 h-16 mx-auto mb-6 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Import LinkedIn
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Seamlessly import your LinkedIn profile data to populate your
              career information instantly.
            </p>
            <Button
              onClick={handleImportLinkedIn}
              variant="primary"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Connect LinkedIn
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-md mx-auto">
          <div className="flex justify-between text-xs text-gray-500 mb-2">
            <span>Profile Completion</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Skip Option */}
        <div className="text-center">
          <button
            onClick={handleSkip}
            className="text-gray-500 hover:text-gray-700 text-sm font-medium"
          >
            Skip for now and explore dashboard →
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-gray-900 text-white py-8 rounded-t-3xl relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-50 blur-sm"></div>
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gray-800 flex items-center justify-center text-xs font-bold">
              CF
            </div>
            <span className="text-sm font-semibold tracking-tight">
              CareerForge
            </span>
          </div>
          <div className="flex gap-6 text-xs text-gray-400">
            <a href="#" className="hover:text-white transition-colors">
              Help Center
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms
            </a>
          </div>
          <p className="text-[10px] text-gray-600">
            Built for professionals, powered by AI.
          </p>
        </div>
      </footer>
    </div>
  );
}
