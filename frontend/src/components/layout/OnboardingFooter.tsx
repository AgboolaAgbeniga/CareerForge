"use client";

import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

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
    <footer className="bg-canvas border-t border-hairline py-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Microcopy */}
          <div className="flex-1 text-center md:text-left">
            <p className="type-body-md text-body">{microcopy}</p>
            <a href="#" className="type-body-md text-body hover:text-ink transition-colors mt-1 inline-block">
              Need help?
            </a>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            {canGoBack && (
              <Button
                variant="secondaryWhite"
                onClick={onBack}
                icon="heroicons:arrow-left-16-solid"
                iconPosition="left"
              >
                Back
              </Button>
            )}
            <Button
              variant="primary"
              onClick={onNext}
              disabled={!canGoNext}
              icon="heroicons:arrow-right-16-solid"
              iconPosition="right"
            >
              {nextLabel}
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default OnboardingFooter;