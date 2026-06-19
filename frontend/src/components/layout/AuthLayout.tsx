'use client';

import React from 'react';
import { Logo } from '@/components/shared/Logo';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  showTrustBadges?: boolean;
  rightTitle?: string;
  rightSubtitle?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  children,
  showTrustBadges = true,
  rightTitle,
  rightSubtitle,
}) => {
  return (
    <div className="dark min-h-screen bg-canvas-dark text-on-dark flex flex-col">

      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-surface-dark-soft bg-canvas-dark">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Logo dark={true} />

          {/* Nav Links */}
          <nav className="hidden sm:flex items-center gap-6">
            <a href="#" className="type-body-md text-on-dark/75 hover:text-on-dark transition-colors">Help Center</a>
            <a href="#" className="type-body-md text-on-dark/75 hover:text-on-dark transition-colors">Privacy</a>
            <a href="#" className="type-body-md text-on-dark/75 hover:text-on-dark transition-colors">Terms</a>
          </nav>
        </div>
      </header>

      <div className="flex-grow max-w-7xl mx-auto w-full flex pt-24 pb-20 px-6 relative">

        {/* Main Content Column */}
        <main className="w-full lg:max-w-md mx-auto space-y-32">
          <section className="scroll-mt-32">
            <div className="mb-6 text-center">
              <h1 className="type-display-xl text-on-dark mb-2">{title}</h1>
              <p className="type-body-md text-on-dark/75">{subtitle}</p>
            </div>

            <div className="bg-canvas-dark border border-surface-dark-soft rounded-sm p-6 md:p-8">
              {children}
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-surface-dark-soft bg-canvas-dark py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-3.5 h-3.5 text-on-dark/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <p className="type-body-md text-on-dark/60">Secure hiring powered by CareerForge.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="type-body-md text-on-dark/60 hover:text-on-dark transition-colors">Help Center</a>
            <a href="#" className="type-body-md text-on-dark/60 hover:text-on-dark transition-colors">Privacy Policy</a>
            <a href="#" className="type-body-md text-on-dark/60 hover:text-on-dark transition-colors">Terms of Service</a>
          </div>
          <p className="type-caption text-on-dark/60">© 2024 CareerForge Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;