'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  Menu,
  X,
  UploadCloud,
  Briefcase,
  Moon,
  Sun,
  MessageCircle,
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = () => {
  const [jobSeekerDropdownOpen, setJobSeekerDropdownOpen] = useState(false);
  const [recruiterDropdownOpen, setRecruiterDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  return (
    <nav className="fixed w-full z-50 top-0 start-0 border-b border-gray-100/50 bg-white/80 backdrop-blur-md transition-all dark:border-slate-700/50 dark:bg-slate-900/80">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center font-medium tracking-tighter group-hover:scale-105 transition-transform duration-300 dark:bg-slate-700">
            AI
          </div>
          <span className="self-center text-lg font-semibold whitespace-nowrap tracking-tight text-slate-900 dark:text-slate-100">
            CareerForge
          </span>
        </a>

        <div className="hidden md:flex items-center space-x-8">
          {/* Dropdown trigger style links */}
          <div className="relative group">
            <button
              className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-indigo-400"
              onMouseEnter={() => setJobSeekerDropdownOpen(true)}
              onMouseLeave={() => setJobSeekerDropdownOpen(false)}
            >
              For Job Seekers <ChevronDown className="w-3 h-3" />
            </button>
            <div
              className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 dark:bg-slate-800 dark:border-slate-600 ${jobSeekerDropdownOpen ? 'opacity-100 visible' : ''}`}
            >
              <a
                href="/job-seeker/dashboard"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Dashboard
              </a>
              <a
                href="/job-seeker/ai-resume-draft"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                AI Resume Builder
              </a>
              <a
                href="/job-seeker/full-profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Profile
              </a>
              <a
                href="/job-seeker/upload-resume"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Upload Resume
              </a>
              <a
                href="/job-seeker/messaging"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Messaging
              </a>
              <a
                href="/job-seeker/onboarding-welcome"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Onboarding
              </a>
              <a
                href="/job-seeker/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Settings
              </a>
            </div>
          </div>
          <div className="relative group">
            <button
              className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-indigo-400"
              onMouseEnter={() => setRecruiterDropdownOpen(true)}
              onMouseLeave={() => setRecruiterDropdownOpen(false)}
            >
              For Recruiters <ChevronDown className="w-3 h-3" />
            </button>
            <div
              className={`absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 dark:bg-slate-800 dark:border-slate-600 ${recruiterDropdownOpen ? 'opacity-100 visible' : ''}`}
            >
              <a
                href="/recruiter/recruiter-dashboard"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Dashboard
              </a>
              <a
                href="/recruiter/post-job"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Post Job
              </a>
              <a
                href="/recruiter/candidate-matching"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Candidate Matching
              </a>
              <a
                href="/recruiter/shortlist"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Shortlists
              </a>
              <a
                href="/recruiter/candidate-profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Candidate Profiles
              </a>
              <a
                href="/recruiter/onboarding"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Onboarding
              </a>
              <a
                href="/recruiter/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                Settings
              </a>
            </div>
          </div>
          <a
            href="#"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-indigo-400"
          >
            Pricing
          </a>
          <a
            href="#"
            className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-indigo-400"
          >
            About
          </a>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>
          {pathname.startsWith('/job-seeker') && (
            <a
              href="/job-seeker/messaging"
              className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Messages"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          )}
          <a
            href="/auth/login"
            className="hidden md:block text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2 dark:text-slate-400 dark:hover:text-slate-100"
          >
            Log In
          </a>
          <a
            href="/auth/signup"
            className="text-sm text-white bg-slate-900 hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 font-medium rounded-full px-5 py-2.5 transition-all shadow-lg shadow-slate-900/20 dark:bg-slate-700 dark:hover:bg-slate-600"
          >
            Get Started
          </a>
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 dark:bg-slate-800 dark:border-slate-700">
          <div className="px-6 py-4 space-y-4">
            <div>
              <button
                className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors w-full text-left dark:text-slate-400 dark:hover:text-indigo-400"
                onClick={() => setJobSeekerDropdownOpen(!jobSeekerDropdownOpen)}
              >
                For Job Seekers <ChevronDown className="w-3 h-3" />
              </button>
              {jobSeekerDropdownOpen && (
                <div className="mt-2 ml-4 space-y-2">
                  <a
                    href="/job-seeker/dashboard"
                    className="block text-sm text-gray-700 hover:bg-gray-50 py-1 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    Dashboard
                  </a>
                  <a
                    href="/job-seeker/ai-resume-draft"
                    className="block text-sm text-gray-700 hover:bg-gray-50 py-1 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    AI Resume Builder
                  </a>
                  <a
                    href="/job-seeker/full-profile"
                    className="block text-sm text-gray-700 hover:bg-gray-50 py-1 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    Profile
                  </a>
                  <a
                    href="/job-seeker/upload-resume"
                    className="block text-sm text-gray-700 hover:bg-gray-50 py-1 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    Upload Resume
                  </a>
                  <a
                    href="/job-seeker/messaging"
                    className="block text-sm text-gray-700 hover:bg-gray-50 py-1 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    Messaging
                  </a>
                  <a
                    href="/job-seeker/onboarding-welcome"
                    className="block text-sm text-gray-700 hover:bg-gray-50 py-1 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    Onboarding
                  </a>
                  <a
                    href="/job-seeker/settings"
                    className="block text-sm text-gray-700 hover:bg-gray-50 py-1 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    Settings
                  </a>
                </div>
              )}
            </div>
            <div>
              <button
                className="flex items-center gap-1 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors w-full text-left dark:text-slate-400 dark:hover:text-indigo-400"
                onClick={() => setRecruiterDropdownOpen(!recruiterDropdownOpen)}
              >
                For Recruiters <ChevronDown className="w-3 h-3" />
              </button>
              {recruiterDropdownOpen && (
                <div className="mt-2 ml-4 space-y-2">
                  <a
                    href="/recruiter/recruiter-dashboard"
                    className="block text-sm text-gray-700 hover:bg-gray-50 py-1 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    Dashboard
                  </a>
                  <a
                    href="/recruiter/post-job"
                    className="block text-sm text-gray-700 hover:bg-gray-50 py-1 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    Post Job
                  </a>
                  <a
                    href="/recruiter/candidate-matching"
                    className="block text-sm text-gray-700 hover:bg-gray-50 py-1 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    Candidate Matching
                  </a>
                  <a
                    href="/recruiter/shortlist"
                    className="block text-sm text-gray-700 hover:bg-gray-50 py-1 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    Shortlists
                  </a>
                  <a
                    href="/recruiter/candidate-profile"
                    className="block text-sm text-gray-700 hover:bg-gray-50 py-1 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    Candidate Profiles
                  </a>
                  <a
                    href="/recruiter/onboarding"
                    className="block text-sm text-gray-700 hover:bg-gray-50 py-1 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    Onboarding
                  </a>
                  <a
                    href="/recruiter/settings"
                    className="block text-sm text-gray-700 hover:bg-gray-50 py-1 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    Settings
                  </a>
                </div>
              )}
            </div>
            <a
              href="#"
              className="block text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-indigo-400"
            >
              Pricing
            </a>
            <a
              href="#"
              className="block text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-indigo-400"
            >
              About
            </a>
            <a
              href="/auth/login"
              className="block text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
            >
              Log In
            </a>
            <a
              href="/auth/signup"
              className="block text-sm text-white bg-slate-900 hover:bg-slate-800 font-medium rounded-full px-5 py-2.5 text-center dark:bg-slate-700 dark:hover:bg-slate-600"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
