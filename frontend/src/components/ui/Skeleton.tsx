import React from 'react';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`animate-pulse rounded-sm bg-hairline ${className}`} />
  );
}

export function SkeletonCard() {
  return (
    <div className="cf-card w-full p-2xl">
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="w-12 h-12 rounded-sm" />
        <div className="flex flex-1 flex-col gap-2">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
      <div className="mb-6 flex flex-col gap-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-sm" />
        <Skeleton className="h-6 w-20 rounded-sm" />
        <Skeleton className="h-6 w-16 rounded-sm" />
      </div>
    </div>
  );
}

export function SkeletonProfile() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-6">
        <Skeleton className="w-24 h-24 rounded-sm" />
        <div className="flex flex-1 flex-col gap-3">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-5 w-1/4 mb-4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </div>
  );
}
