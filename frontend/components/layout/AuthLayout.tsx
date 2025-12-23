'use client';

import React from 'react';

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
    <div className="min-h-screen bg-slate-950 text-slate-400 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200" style={{
      backgroundImage: 'radial-gradient(circle at 0% 0%, rgba(99, 102, 241, 0.05) 0%, transparent 50%), radial-gradient(circle at 100% 100%, rgba(168, 85, 247, 0.05) 0%, transparent 50%)',
      backgroundAttachment: 'fixed'
    }}>

      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg className="w-4.5 h-4.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
              </svg>
            </div>
            <span className="text-base font-semibold tracking-tight text-white">CareerForge</span>
          </div>

          {/* Nav Links */}
          <nav className="hidden sm:flex items-center gap-6">
            <a href="#" className="text-xs font-medium text-slate-400 hover:text-white transition-colors">Help Center</a>
            <a href="#" className="text-xs font-medium text-slate-400 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-xs font-medium text-slate-400 hover:text-white transition-colors">Terms</a>
          </nav>
        </div>
      </header>

      <div className="flex-grow max-w-7xl mx-auto w-full flex pt-24 pb-20 px-6 relative">

        {/* Main Content Column */}
        <main className="w-full lg:max-w-md mx-auto space-y-32">
          <section className="scroll-mt-32">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-semibold text-white tracking-tight mb-2">{title}</h1>
              <p className="text-sm text-slate-500">{subtitle}</p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/20 backdrop-blur-sm" style={{
              boxShadow: '0 0 40px -10px rgba(99, 102, 241, 0.1)'
            }}>
              {children}
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 bg-slate-950 py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-2 mb-2">
            <svg className="w-3.5 h-3.5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <p className="text-xs text-slate-500 font-medium">Secure hiring powered by CareerForge.</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">Help Center</a>
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">Terms of Service</a>
          </div>
          <p className="text-[10px] text-slate-700">© 2024 CareerForge Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;