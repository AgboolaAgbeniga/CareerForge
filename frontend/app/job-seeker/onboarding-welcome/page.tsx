'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components';
import {
  Rocket,
  Bell,
  Sparkles,
  Import,
  UserCircle,
  FileText,
  Sliders,
  Bot,
  Zap,
  AlertCircle,
  MessageCircle,
  CheckCircle2,
  Circle,
  ArrowRight,
} from 'lucide-react';

export default function OnboardingWelcomePage() {
  const [progress] = useState(20);
  const [profileStrength] = useState(45);
  const [salaryMin, setSalaryMin] = useState(80);
  const [salaryMax, setSalaryMax] = useState(150);
  const [aiCoachEnabled, setAiCoachEnabled] = useState(false);
  const [desiredRole, setDesiredRole] = useState('');
  const [location, setLocation] = useState('Remote');
  const router = useRouter();

  const handleUploadResume = () => {
    router.push('/job-seeker/upload-resume');
  };

  const handleGenerateResume = () => {
    router.push('/job-seeker/ai-resume-draft');
  };

  const handleImportLinkedIn = () => {
    // Simulate LinkedIn import
    // setProgress(33);
  };

  const handleLaunch = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/auth/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          onboardingCompleted: true,
        }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Failed to update profile');
      }

      router.push('/job-seeker/dashboard');
    } catch (error) {
      console.error('Failed to update onboarding status:', error);
      router.push('/job-seeker/dashboard');
    }
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSalaryMin(Math.min(value, salaryMax - 10));
    setSalaryMax(Math.max(value, salaryMin + 10));
  };

  return (
    <div className="text-slate-800 antialiased flex flex-col min-h-screen bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">

      {/* Hero / Progress Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 text-indigo-600 mb-2">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Mission Control
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                Welcome, Alex. Let's launch your career.
              </h1>
              <p className="text-slate-500 mt-2 text-sm max-w-2xl">
                Complete these mission-critical steps to activate the AI
                matching engine.
              </p>
            </div>
            <div className="text-right hidden md:block">
              <span className="text-2xl font-bold text-slate-900">
                {progress}%
              </span>
              <span className="text-xs text-slate-400 font-medium block uppercase tracking-wide">
                Launch Readiness
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="relative h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pt-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Wizard Steps */}
          <div className="lg:col-span-8 space-y-6">
            {/* Step 1: Import */}
            <section className="bg-white rounded-xl border border-indigo-200 p-6 relative overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
                    <Import className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Import Career Identity
                    </h2>
                    <p className="text-sm text-slate-500">
                      Sync your history to jumpstart the process.
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-semibold border border-indigo-100">
                  Step 1
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* LinkedIn Import */}
                <button
                  onClick={handleImportLinkedIn}
                  className="group relative flex flex-col items-center justify-center p-6 border border-slate-200 rounded-xl hover:border-blue-300 hover:bg-blue-50/30 transition-all bg-slate-50/50"
                >
                  <div className="w-7 h-7 text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </div>
                  <span className="font-semibold text-slate-800 text-sm">
                    Import from LinkedIn
                  </span>
                  <span className="text-xs text-slate-400 mt-1">
                    Saves ~10 mins
                  </span>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-4 h-4 text-blue-500" />
                  </div>
                </button>

                {/* Resume Upload */}
                <button
                  onClick={handleUploadResume}
                  className="group relative flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 rounded-xl hover:border-indigo-400 hover:bg-indigo-50/30 transition-all bg-white"
                >
                  <div className="w-7 h-7 text-slate-400 mb-3 group-hover:text-indigo-500 transition-colors">
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      />
                    </svg>
                  </div>
                  <span className="font-semibold text-slate-800 text-sm">
                    Upload Resume
                  </span>
                  <span className="text-xs text-slate-400 mt-1">
                    PDF or DOCX
                  </span>
                </button>
              </div>
            </section>

            {/* Step 2: Complete Profile */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow opacity-90 hover:opacity-100">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center border border-slate-100">
                    <UserCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Complete Profile
                    </h2>
                    <p className="text-sm text-slate-500">
                      Fill in the gaps to reach 100% strength.
                    </p>
                  </div>
                </div>
                <span className="text-slate-400 text-xs font-semibold mt-1">
                  Step 2
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-1">
                  <span>Profile Strength</span>
                  <span>{profileStrength}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mb-6">
                  <div
                    className="bg-amber-400 h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${profileStrength}%` }}
                  ></div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 border border-slate-200 rounded-lg flex items-center justify-between cursor-pointer hover:border-slate-300 transition-colors">
                    <span className="text-sm font-medium text-slate-700">
                      Experience
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="p-3 border border-slate-200 rounded-lg flex items-center justify-between cursor-pointer hover:border-slate-300 transition-colors">
                    <span className="text-sm font-medium text-slate-700">
                      Education
                    </span>
                    <Circle className="w-4 h-4 text-slate-300" />
                  </div>
                  <div className="p-3 border border-slate-200 rounded-lg flex items-center justify-between cursor-pointer hover:border-slate-300 transition-colors">
                    <span className="text-sm font-medium text-slate-700">
                      Skills
                    </span>
                    <Circle className="w-4 h-4 text-slate-300" />
                  </div>
                  <div className="p-3 border border-slate-200 rounded-lg flex items-center justify-between cursor-pointer hover:border-slate-300 transition-colors">
                    <span className="text-sm font-medium text-slate-700">
                      Certifications
                    </span>
                    <Circle className="w-4 h-4 text-slate-300" />
                  </div>
                </div>
              </div>
            </section>

            {/* Step 3: AI Resume */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-5">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center border border-slate-100">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      AI Resume Draft
                    </h2>
                    <p className="text-sm text-slate-500">
                      Generate a tailored resume in seconds.
                    </p>
                  </div>
                </div>
                <span className="text-slate-400 text-xs font-semibold mt-1">
                  Step 3
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                {/* Template 1 */}
                <div className="aspect-[3/4] rounded-lg bg-gradient-to-br from-slate-100 to-slate-200 border-2 border-indigo-500 relative cursor-pointer shadow-sm">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wide">
                      Modern
                    </span>
                  </div>
                  <div className="absolute top-2 right-2 h-2 w-2 bg-indigo-500 rounded-full"></div>
                </div>
                {/* Template 2 */}
                <div className="aspect-[3/4] rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 cursor-pointer flex items-center justify-center">
                  <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">
                    Minimal
                  </span>
                </div>
                {/* Template 3 */}
                <div className="aspect-[3/4] rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 cursor-pointer flex items-center justify-center">
                  <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">
                    Creative
                  </span>
                </div>
                {/* Template 4 */}
                <div className="aspect-[3/4] rounded-lg bg-slate-50 border border-slate-200 hover:border-slate-300 cursor-pointer flex items-center justify-center">
                  <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wide">
                    Corp
                  </span>
                </div>
              </div>

              <Button
                onClick={handleGenerateResume}
                className="w-full py-2.5 rounded-lg bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
              >
                <div className="w-4 h-4">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                  </svg>
                </div>
                Generate with AI
              </Button>
            </section>

            {/* Step 4: Preferences */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center border border-slate-100">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                      Job Preferences
                    </h2>
                    <p className="text-sm text-slate-500">
                      Teach our AI what you're looking for.
                    </p>
                  </div>
                </div>
                <span className="text-slate-400 text-xs font-semibold mt-1">
                  Step 4
                </span>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Desired Role
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Product Designer"
                      value={desiredRole}
                      onChange={(e) => setDesiredRole(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                      Location
                    </label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all appearance-none"
                    >
                      <option>Remote</option>
                      <option>Hybrid</option>
                      <option>On-site</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-xs font-medium text-slate-700">
                      Salary Range (Annual)
                    </label>
                    <span className="text-xs font-bold text-indigo-600">
                      ${salaryMin}k - ${salaryMax}k
                    </span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="300"
                    value={(salaryMin + salaryMax) / 2}
                    onChange={handleSalaryChange}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>$30k</span>
                    <span>$300k+</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button className="px-4 py-2 bg-white border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition-colors">
                    Save Preferences
                  </button>
                </div>
              </div>
            </section>

            {/* Step 5: Coach */}
            <section className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-center">
                <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-50 to-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-900">
                      Enable AI Career Coach
                    </h2>
                    <p className="text-xs text-slate-500">
                      Get daily insights and interview prep.
                    </p>
                  </div>
                </div>
                <div className="relative inline-block w-10 align-middle select-none">
                  <input
                    type="checkbox"
                    id="ai-coach"
                    checked={aiCoachEnabled}
                    onChange={(e) => setAiCoachEnabled(e.target.checked)}
                    className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 transition-all duration-300 checked:right-0 checked:border-indigo-600"
                  />
                  <label
                    htmlFor="ai-coach"
                    className="toggle-label block overflow-hidden h-5 rounded-full cursor-pointer transition-colors duration-300"
                    style={{
                      backgroundColor: aiCoachEnabled ? '#6366F1' : '#CBD5E1',
                    }}
                  ></label>
                </div>
              </div>
            </section>

            <div className="pt-4">
              <Button
                onClick={handleLaunch}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-lg hover:shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3"
              >
                <span>Launch Career Platform</span>
                <Rocket className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Right Column: AI Insights */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* AI Insight Card */}
              <div className="bg-gradient-to-b from-indigo-50 to-white rounded-xl border border-indigo-100 p-5 shadow-sm relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-200/50 rounded-full blur-2xl"></div>

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-xs font-bold text-indigo-900 uppercase tracking-wide">
                      AI Insight
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-slate-800 mb-2">
                    Pro Tip: Import Data
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    I've detected you have a LinkedIn profile. Importing it now
                    will automatically fill 85% of your profile and increase
                    match accuracy by 3x.
                  </p>

                  <button className="w-full py-2 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-lg hover:bg-indigo-200 transition-colors flex items-center justify-center gap-2">
                    <Zap className="w-3 h-3" />
                    Apply AI Import
                  </button>
                </div>
              </div>

              {/* Secondary Insight */}
              <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800 mb-1">
                      Skill Gap Detected
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed mb-3">
                      Adding "React" and "Tailwind" to your skills section
                      usually boosts visibility for Product Design roles.
                    </p>
                    <a
                      href="#"
                      className="text-xs font-medium text-slate-900 hover:text-indigo-600 hover:underline"
                    >
                      Add Skills &rarr;
                    </a>
                  </div>
                </div>
              </div>

              {/* Need Help? */}
              <div className="rounded-xl border border-dashed border-slate-300 p-4 text-center">
                <p className="text-xs text-slate-500 mb-2">
                  Stuck on onboarding?
                </p>
                <button className="text-xs font-medium text-indigo-600 flex items-center justify-center gap-1 mx-auto hover:text-indigo-700">
                  <MessageCircle className="w-3.5 h-3.5" />
                  Chat with Support
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #6366f1;
          cursor: pointer;
          margin-top: -8px;
          box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.3);
          transition: transform 0.1s;
        }
        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
        .slider::-webkit-slider-runnable-track {
          width: 100%;
          height: 4px;
          cursor: pointer;
          background: #e2e8f0;
          border-radius: 2px;
        }
        .toggle-checkbox:checked + .toggle-label {
          background-color: #6366f1;
        }
      `}</style>
    </div>
  );
}
