'use client';

import React from 'react';
import { Crown } from 'lucide-react';
import Button from '@/components/ui/Button';

interface PremiumUpsellProps {}

export function PremiumUpsell({}: PremiumUpsellProps) {
  return (
    <div className="relative rounded-sm overflow-hidden group cursor-pointer border border-hairline p-[1px]">
      <div className="absolute inset-0 brand-ribbon-gradient opacity-90 transition-transform duration-300 group-hover:scale-105"></div>
      <div className="relative p-6 text-center bg-canvas-dark h-full">
        <div className="w-10 h-10 mx-auto bg-canvas rounded-sm flex items-center justify-center mb-4">
          <Crown className="w-5 h-5 text-ink" />
        </div>
        <h3 className="type-display-md text-on-dark mb-2">
          Upgrade to Pro
        </h3>
        <p className="type-mono-caption text-on-dark/80 mb-6 px-2">
          Unlock unlimited AI insights, salary predictions, and direct
          recruiter messaging.
        </p>
        <Button variant="secondaryWhite" className="w-full">
          View Plans
        </Button>
      </div>
    </div>
  );
}