'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  Menu,
  X,
  Moon,
  Sun,
  MessageCircle,
  User,
  Settings,
  LogOut,
  Home,
  UploadCloud,
  Briefcase,
} from 'lucide-react';
import { useTheme } from '@/components/shared/ThemeProvider';

type HeaderVariant = 'public' | 'auth' | 'job-seeker' | 'recruiter';

interface HeaderProps {
  variant?: HeaderVariant;
  showUserMenu?: boolean;
  userName?: string;
  userAvatar?: string;
}

const Header: React.FC<HeaderProps> = ({
  variant = 'public',
  showUserMenu = false,
  userName = 'User',
  userAvatar,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  // Determine variant based on pathname if not explicitly set
  const currentVariant: HeaderVariant = variant !== 'public' ? variant :
    pathname.startsWith('/auth') ? 'auth' :
    pathname.startsWith('/job-seeker') ? 'job-seeker' :
    pathname.startsWith('/recruiter') ? 'recruiter' :
    'public';

  const isAuthenticated = currentVariant === 'job-seeker' || currentVariant === 'recruiter';

  // Logo component
  const Logo = () => (
    <a href="/" className="flex items-center gap-2 group">
      <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center font-medium tracking-tighter group-hover:scale-105 transition-transform duration-300 dark:bg-slate-700">
        AI
      </div>
      <span className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
        CareerForge
      </span>
    </a>
  );

  // Public navigation
  const PublicNav = () => (
    <div className="hidden md:flex items-center space-x-8">
      <a href="#features" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-indigo-400">
        Features
      </a>
      <a href="#pricing" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-indigo-400">
        Pricing
      </a>
      <a href="#about" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-indigo-400">
        About
      </a>
    </div>
  );

  // Job Seeker navigation
  const JobSeekerNav = () => (
    <div className="hidden md:flex items-center space-x-6">
      <a href="/job-seeker/dashboard" className={`text-sm font-medium transition-colors ${pathname === '/job-seeker/dashboard' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400'}`}>
        Dashboard
      </a>
      <a href="/job-seeker/ai-resume-draft" className={`text-sm font-medium transition-colors ${pathname === '/job-seeker/ai-resume-draft' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400'}`}>
        Resume Builder
      </a>
      <a href="/job-seeker/full-profile" className={`text-sm font-medium transition-colors ${pathname === '/job-seeker/full-profile' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400'}`}>
        Profile
      </a>
      <a href="/job-seeker/messaging" className={`text-sm font-medium transition-colors ${pathname === '/job-seeker/messaging' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400'}`}>
        Messages
      </a>
    </div>
  );

  // Recruiter navigation
  const RecruiterNav = () => (
    <div className="hidden md:flex items-center space-x-6">
      <a href="/recruiter/recruiter-dashboard" className={`text-sm font-medium transition-colors ${pathname === '/recruiter/recruiter-dashboard' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400'}`}>
        Dashboard
      </a>
      <a href="/recruiter/post-job" className={`text-sm font-medium transition-colors ${pathname === '/recruiter/post-job' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400'}`}>
        Post Job
      </a>
      <a href="/recruiter/candidate-matching" className={`text-sm font-medium transition-colors ${pathname === '/recruiter/candidate-matching' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400'}`}>
        Candidates
      </a>
      <a href="/recruiter/shortlist" className={`text-sm font-medium transition-colors ${pathname === '/recruiter/shortlist' ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 hover:text-indigo-600 dark:text-slate-400 dark:hover:text-indigo-400'}`}>
        Shortlists
      </a>
    </div>
  );

  // User menu dropdown
  const UserMenu = () => (
    <div className="relative">
      <button
        onClick={() => setUserMenuOpen(!userMenuOpen)}
        className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        aria-expanded={userMenuOpen}
        aria-haspopup="true"
      >
        {userAvatar ? (
          <img
            src={userAvatar}
            alt={userName}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 bg-slate-200 dark:bg-slate-700 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          </div>
        )}
        <ChevronDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />
      </button>

      {userMenuOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50">
          <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{userName}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {currentVariant === 'job-seeker' ? 'Job Seeker' : 'Recruiter'}
            </p>
          </div>
          <a
            href={currentVariant === 'job-seeker' ? '/job-seeker/settings' : '/recruiter/settings'}
            className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            <Settings className="w-4 h-4" />
            Settings
          </a>
          <a
            href="/"
            className="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
          >
            <Home className="w-4 h-4" />
            Home
          </a>
          <div className="border-t border-slate-200 dark:border-slate-700 mt-2">
            <button className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Right side actions
  const RightActions = () => {
    if (currentVariant === 'auth') {
      return (
        <div className="flex items-center gap-4">
          <a
            href="/"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
          >
            Back to Home
          </a>
        </div>
      );
    }

    if (isAuthenticated) {
      return (
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </button>
          {currentVariant === 'job-seeker' && (
            <a
              href="/job-seeker/messaging"
              className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Messages"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          )}
          <UserMenu />
        </div>
      );
    }

    // Public variant
    return (
      <div className="flex items-center gap-3">
        <button
          onClick={toggleTheme}
          className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>
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
          {currentVariant === 'public' ? 'Get Started' : 'Sign Up'}
        </a>
      </div>
    );
  };

  // Mobile menu
  const MobileMenu = () => (
    <div className="md:hidden bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
      <div className="px-6 py-4 space-y-4">
        {currentVariant === 'public' && (
          <>
            <a href="#features" className="block text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-indigo-400">
              Features
            </a>
            <a href="#pricing" className="block text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-indigo-400">
              Pricing
            </a>
            <a href="#about" className="block text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-indigo-400">
              About
            </a>
          </>
        )}

        {currentVariant === 'job-seeker' && (
          <>
            <a href="/job-seeker/dashboard" className="block text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-indigo-400">
              Dashboard
            </a>
            <a href="/job-seeker/ai-resume-draft" className="block text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-indigo-400">
              Resume Builder
            </a>
            <a href="/job-seeker/full-profile" className="block text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-indigo-400">
              Profile
            </a>
            <a href="/job-seeker/messaging" className="block text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-indigo-400">
              Messages
            </a>
          </>
        )}

        {currentVariant === 'recruiter' && (
          <>
            <a href="/recruiter/recruiter-dashboard" className="block text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-indigo-400">
              Dashboard
            </a>
            <a href="/recruiter/post-job" className="block text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-indigo-400">
              Post Job
            </a>
            <a href="/recruiter/candidate-matching" className="block text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-indigo-400">
              Candidates
            </a>
            <a href="/recruiter/shortlist" className="block text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-indigo-400">
              Shortlists
            </a>
          </>
        )}

        {!isAuthenticated && (
          <>
            <a href="/auth/login" className="block text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100">
              Log In
            </a>
            <a href="/auth/signup" className="block text-sm text-white bg-slate-900 hover:bg-slate-800 font-medium rounded-full px-5 py-2.5 text-center dark:bg-slate-700 dark:hover:bg-slate-600">
              {currentVariant === 'public' ? 'Get Started' : 'Sign Up'}
            </a>
          </>
        )}
      </div>
    </div>
  );

  return (
    <header className="fixed w-full z-50 top-0 border-b border-slate-200/50 bg-white/80 backdrop-blur-md dark:border-slate-700/50 dark:bg-slate-900/80">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Logo />

        {/* Center Navigation */}
        {currentVariant === 'public' && <PublicNav />}
        {currentVariant === 'job-seeker' && <JobSeekerNav />}
        {currentVariant === 'recruiter' && <RecruiterNav />}

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <RightActions />
          <button
            type="button"
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && <MobileMenu />}
    </header>
  );
};

export default Header;