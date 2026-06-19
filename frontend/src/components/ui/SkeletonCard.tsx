'use client';

import React from 'react';

interface SkeletonCardProps {
  height?: string;
  lines?: number;
  withCircle?: boolean;
  className?: string;
}

function ShimmerLine({ width = 'w-full', thin = false }: { width?: string; thin?: boolean }) {
  return (
    <div className={`bg-hairline rounded-sm animate-pulse ${thin ? 'h-2' : 'h-4'} ${width}`} />
  );
}

export function SkeletonCard({ height = 'h-48', lines = 3, withCircle = false, className = '' }: SkeletonCardProps) {
  return (
    <div className={`cf-card p-6 ${height} flex flex-col gap-4 ${className}`}>
      <div className="flex justify-between items-start">
        <ShimmerLine width="w-32" />
        {withCircle && (
          <div className="w-10 h-10 rounded-full bg-hairline animate-pulse flex-shrink-0" />
        )}
      </div>
      <div className="flex gap-4 flex-1">
        {withCircle && (
          <div className="w-24 h-24 rounded-full bg-hairline animate-pulse flex-shrink-0" />
        )}
        <div className="flex-1 flex flex-col gap-3 justify-center">
          {Array.from({ length: lines }).map((_, i) => (
            <ShimmerLine
              key={i}
              width={i === lines - 1 ? 'w-3/5' : 'w-full'}
              thin={i === lines - 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/** Skeleton for the Kanban/list column cards in ApplicationsTracker */
export function SkeletonAppCard() {
  return (
    <div className="p-3 rounded-sm border border-hairline bg-canvas mb-3">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-8 h-8 rounded-sm bg-hairline animate-pulse flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <ShimmerLine width="w-3/4" />
          <ShimmerLine width="w-1/2" thin />
        </div>
      </div>
    </div>
  );
}

/** Skeleton for a single job match card */
export function SkeletonJobCard() {
  return (
    <div className="cf-card p-5 space-y-4">
      <div className="flex gap-4">
        <div className="w-12 h-12 rounded-sm bg-hairline animate-pulse flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <ShimmerLine width="w-3/4" />
          <ShimmerLine width="w-1/2" thin />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="h-6 w-16 rounded-sm bg-hairline animate-pulse" />
        <div className="h-6 w-20 rounded-sm bg-hairline animate-pulse" />
      </div>
      <div className="border-t border-hairline pt-4">
        <ShimmerLine width="w-24" thin />
      </div>
    </div>
  );
}
