'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  Home,
  LogOut,
  Menu,
  MessageCircle,
  Moon,
  Settings,
  Sun,
  User,
  X,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { Logo } from '@/components/shared/Logo';

type HeaderVariant = 'public' | 'auth' | 'job-seeker' | 'recruiter';

interface HeaderProps {
  variant?: HeaderVariant;
  showUserMenu?: boolean;
  userName?: string;
  userAvatar?: string;
}

type NavItem = {
  href: string;
  label: string;
};

const publicNav: NavItem[] = [
  { href: '#features', label: 'Features' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#about', label: 'About' },
];

const jobSeekerNav: NavItem[] = [
  { href: '/job-seeker/dashboard', label: 'Dashboard' },
  { href: '/job-seeker/ai-resume-draft', label: 'Resume Builder' },
  { href: '/job-seeker/full-profile', label: 'Profile' },
  { href: '/job-seeker/messaging', label: 'Messages' },
];

const recruiterNav: NavItem[] = [
  { href: '/recruiter/recruiter-dashboard', label: 'Dashboard' },
  { href: '/recruiter/post-job', label: 'Post Job' },
  { href: '/recruiter/candidate-matching', label: 'Candidates' },
  { href: '/recruiter/shortlist', label: 'Shortlists' },
];

const Header: React.FC<HeaderProps> = ({
  variant = 'public',
  showUserMenu = false,
  userName = 'User',
  userAvatar,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentVariant: HeaderVariant =
    variant !== 'public'
      ? variant
      : pathname.startsWith('/auth')
        ? 'auth'
        : pathname.startsWith('/job-seeker')
          ? 'job-seeker'
          : pathname.startsWith('/recruiter')
            ? 'recruiter'
            : 'public';

  const isAuthenticated = currentVariant === 'job-seeker' || currentVariant === 'recruiter';
  const isDarkNav = currentVariant === 'public' && !isScrolled;

  const navItems = useMemo(() => {
    if (currentVariant === 'job-seeker') return jobSeekerNav;
    if (currentVariant === 'recruiter') return recruiterNav;
    if (currentVariant === 'public') return publicNav;
    return [];
  }, [currentVariant]);

  const headerClass = isDarkNav
    ? 'border-surface-dark-soft bg-canvas-dark text-on-dark'
    : 'border-hairline bg-canvas text-ink';

  const navLinkClass = (href: string) => {
    const active = pathname === href;
    if (isDarkNav) {
      return `type-body-md transition-colors hover:text-accent-mint ${active ? 'text-on-dark' : 'text-on-dark/75'}`;
    }
    return `type-body-md transition-colors hover:text-ink ${active ? 'text-ink' : 'text-body'}`;
  };

  const iconButtonClass = isDarkNav
    ? 'flex h-11 w-11 items-center justify-center rounded-sm text-on-dark/75 transition-colors hover:bg-surface-dark-soft hover:text-on-dark'
    : 'flex h-11 w-11 items-center justify-center rounded-sm text-body transition-colors hover:bg-hairline hover:text-ink';

  const menuPanelClass = isDarkNav
    ? 'bg-canvas-dark text-on-dark border border-surface-dark-soft shadow-none'
    : 'cf-card';

  const UserMenu = () => (
    <div className="relative">
      <button
        onClick={() => setUserMenuOpen(!userMenuOpen)}
        className={`flex h-11 items-center gap-2 rounded-sm px-2 transition-colors ${
          isDarkNav ? 'hover:bg-surface-dark-soft' : 'hover:bg-hairline'
        }`}
        aria-expanded={userMenuOpen}
        aria-haspopup="true"
      >
        {userAvatar ? (
          <img
            src={userAvatar}
            alt={userName}
            className="h-8 w-8 rounded-sm object-cover"
          />
        ) : (
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-sm ${
              isDarkNav ? 'bg-surface-dark-soft text-on-dark' : 'bg-hairline text-ink'
            }`}
          >
            <User className="h-4 w-4" />
          </span>
        )}
        <ChevronDown className="h-4 w-4" />
      </button>

      {userMenuOpen && (
        <div className={`absolute right-0 top-full z-50 mt-2 w-56 ${menuPanelClass}`}>
          <div className={`border-b px-4 py-3 ${isDarkNav ? 'border-surface-dark-soft' : 'border-hairline'}`}>
            <p className="type-body-md">{userName}</p>
            <p className={isDarkNav ? 'type-mono-caps-eyebrow text-on-dark/60' : 'type-mono-caps-eyebrow text-body'}>
              {currentVariant === 'job-seeker' ? 'Job Seeker' : 'Recruiter'}
            </p>
          </div>
          <a
            href={currentVariant === 'job-seeker' ? '/job-seeker/settings' : '/recruiter/settings'}
            className={`flex items-center gap-3 px-4 py-2 type-body-md transition-colors ${
              isDarkNav ? 'hover:bg-surface-dark-soft' : 'hover:bg-hairline'
            }`}
          >
            <Settings className="h-4 w-4" />
            Settings
          </a>
          <a
            href="/"
            className={`flex items-center gap-3 px-4 py-2 type-body-md transition-colors ${
              isDarkNav ? 'hover:bg-surface-dark-soft' : 'hover:bg-hairline'
            }`}
          >
            <Home className="h-4 w-4" />
            Home
          </a>
          <div className={`mt-2 border-t pt-2 ${isDarkNav ? 'border-surface-dark-soft' : 'border-hairline'}`}>
            <button className={`flex w-full items-center gap-3 px-4 py-2 type-body-md transition-colors ${isDarkNav ? 'hover:bg-surface-dark-soft' : 'hover:bg-hairline'}`}>
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const RightActions = () => {
    if (currentVariant === 'auth') {
      return (
        <a href="/" className="cf-button-outline hidden sm:inline-flex">
          Back Home
        </a>
      );
    }

    if (isAuthenticated) {
      return (
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className={iconButtonClass} aria-label="Toggle theme">
            {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>
          {currentVariant === 'job-seeker' && (
            <a href="/job-seeker/messaging" className={iconButtonClass} aria-label="Messages">
              <MessageCircle className="h-5 w-5" />
            </a>
          )}
          {(showUserMenu || isAuthenticated) && <UserMenu />}
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        <button onClick={toggleTheme} className={iconButtonClass} aria-label="Toggle theme">
          {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </button>
        <a href="/auth/login" className={isDarkNav ? 'cf-button-secondary-white hidden md:inline-flex' : 'cf-button-outline hidden md:inline-flex'}>
          Sign In
        </a>
        <a href="/auth/signup" className="cf-button-primary">
          Get Started
        </a>
      </div>
    );
  };

  return (
    <>
      <header className={`fixed left-0 top-0 z-50 w-full border-b ${headerClass}`}>
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-lg md:px-3xl">
          <Logo dark={isDarkNav} />

          {navItems.length > 0 && (
            <nav className="hidden items-center gap-2xl md:flex" aria-label="Primary">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className={navLinkClass(item.href)}>
                  {item.label}
                </a>
              ))}
            </nav>
          )}

          <div className="flex items-center gap-2">
            <RightActions />
            {navItems.length > 0 && (
              <button
                type="button"
                className={`${iconButtonClass} md:hidden z-50 relative`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            )}
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className={`fixed inset-0 z-40 md:hidden pt-16 ${isDarkNav ? 'bg-canvas-dark text-on-dark' : 'bg-canvas text-ink'}`}>
          <nav className="flex flex-col gap-1 px-lg py-lg" aria-label="Mobile primary">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`rounded-sm px-3 py-3 type-body-lg transition-colors ${
                  isDarkNav ? 'hover:bg-surface-dark-soft' : 'hover:bg-hairline'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
