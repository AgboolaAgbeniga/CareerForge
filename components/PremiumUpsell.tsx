'use client';

import React from 'react';
import { Crown } from 'lucide-react';

interface PremiumUpsellProps {}

export function PremiumUpsell({}: PremiumUpsellProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 transition-transform duration-300 group-hover:scale-105"></div>
      <div className="relative p-6 text-center">
        <div className="w-10 h-10 mx-auto bg-gradient-to-tr from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-lg mb-3">
          <Crown className="w-5 h-5 text-yellow-900" />
        </div>
        <h3 className="text-white font-bold text-sm mb-1">
          Upgrade to Pro
        </h3>
        <p className="text-xs text-gray-400 mb-4 px-2">
          Unlock unlimited AI insights, salary predictions, and direct
          recruiter messaging.
        </p>
        <button className="w-full bg-white text-gray-900 text-xs font-bold py-2.5 rounded-xl hover:bg-gray-100 transition-colors shadow-sm">
          View Plans
        </button>
      </div>
    </div>
  );
}