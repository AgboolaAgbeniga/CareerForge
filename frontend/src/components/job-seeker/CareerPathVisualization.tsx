'use client';

import React from 'react';
import { Map } from 'lucide-react';
import Link from 'next/link';
import { SkeletonCard } from '@/components/ui/SkeletonCard';

interface CareerPathVisualizationProps {
  currentRole?: string;
  targetRole?: string;
  loading?: boolean;
}

export function CareerPathVisualization({
  loading = false,
}: CareerPathVisualizationProps) {

  if (loading) return <SkeletonCard height="h-48" lines={3} />;

  return (
    <div className="cf-card p-6 border border-hairline relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-surface-dark rounded-sm">
            <Map className="w-4 h-4 text-on-dark" />
          </div>
          <h3 className="type-display-md text-ink">Projected Career Path</h3>
        </div>
      </div>

      {/* Phase 7 Placeholder */}
      {/* TODO(phase-7): replace with CareerStrategistAgent */}
      <div className="flex flex-col items-center justify-center py-8 gap-3">
        <div className="w-10 h-10 rounded-sm bg-hairline flex items-center justify-center">
          <Map className="w-5 h-5 text-body" />
        </div>
        <p className="type-mono-eyebrow text-body text-center">
          Your career roadmap will appear here — complete your profile to unlock personalized milestones.
        </p>
        <Link
          href="/job-seeker/full-profile"
          className="type-mono-eyebrow text-ink border border-hairline px-3 py-1.5 rounded-sm hover:bg-surface-dark transition-colors"
        >
          Complete Profile
        </Link>
      </div>
    </div>
  );
}