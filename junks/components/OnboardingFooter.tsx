"use client";

import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface OnboardingFooterProps {
  microcopy: string;
  onBack?: () => void;
  onNext?: () => void;
  nextLabel?: string;
  canGoBack?: boolean;
  canGoNext?: boolean;
}

const OnboardingFooter: React.FC<OnboardingFooterProps> = ({
  microcopy,
  onBack,
  onNext,
  nextLabel = 'Next',
  canGoBack = true,
  canGoNext = true,
}) => {
  return (
    <footer className="bg-white border-t border-slate-200 py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Microcopy */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm text-slate-600">{microcopy}</p>
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-700 mt-1 inline-block">
              Need help?
            </a>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            {canGoBack && (
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
            )}
            <button
              onClick={onNext}
              disabled={!canGoNext}
              className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors"
            >
              {nextLabel}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default OnboardingFooter;