'use client';

import React from 'react';
import { Zap, Check, ChevronRight, Loader2, UploadCloud } from 'lucide-react';
import { toast } from 'sonner';
import { useUploadResume } from '@/hooks/queries/useProfile';
import { SkeletonCard } from '@/components/ui/SkeletonCard';
import { useCountUp } from '@/hooks/useCountUp';
import type { ChecklistItem } from '@/hooks/useDashboardProfile';
import Link from 'next/link';

interface ProfileCompletionCardProps {
  profileCompletion: number;
  completionLabel: string;
  checklistItems: ChecklistItem[];
  loading?: boolean;
}

export function ProfileCompletionCard({
  profileCompletion,
  completionLabel,
  checklistItems,
  loading = false,
}: ProfileCompletionCardProps) {
  const uploadResumeMutation = useUploadResume();
  const animatedCompletion = useCountUp(profileCompletion, 800);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      await uploadResumeMutation.mutateAsync({ formData });
      toast.success('Resume uploaded! Your profile is being updated.');
    } catch {
      toast.error('Failed to upload resume. Please try again.');
    }
  };

  if (loading) return <SkeletonCard height="h-72" lines={4} />;

  const isUploading = uploadResumeMutation.isPending;

  return (
    <div className="cf-card p-6 flex flex-col justify-between relative overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="type-display-md text-ink">Profile Strength</h3>
          <div className="flex items-baseline gap-2 mt-1">
            <span className="type-display-md text-ink">{animatedCompletion}%</span>
            <span className="type-mono-eyebrow text-body">{completionLabel}</span>
          </div>
        </div>
        <div className="w-8 h-8 rounded-sm bg-ink text-on-primary flex items-center justify-center">
          <Zap className="w-4 h-4" />
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-hairline rounded-sm overflow-hidden mb-5">
        <div
          className="h-full bg-ink rounded-sm transition-all duration-700 ease-out"
          style={{ width: `${animatedCompletion}%` }}
        />
      </div>

      {/* Upload Resume CTA */}
      <label className="flex items-center justify-center gap-2 w-full p-2 rounded-sm bg-surface-dark border border-hairline text-on-dark type-mono-eyebrow cursor-pointer hover:opacity-90 transition-opacity mb-4">
        {isUploading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <UploadCloud className="w-4 h-4 text-on-dark" />
        )}
        {isUploading ? 'Uploading...' : 'Upload Resume'}
        <input
          type="file"
          className="hidden"
          accept=".pdf,.docx"
          onChange={handleFileUpload}
          disabled={isUploading}
        />
      </label>

      {/* Dynamic Checklist */}
      <div className="space-y-2 mb-4">
        {checklistItems.map((item) => (
          <ChecklistRow key={item.label} item={item} />
        ))}
      </div>

      {/* AI Tip */}
      <div className="bg-surface-dark rounded-sm p-3 border border-hairline flex gap-3 items-start">
        <Zap className="w-4 h-4 text-on-dark mt-0.5 flex-shrink-0" />
        <p className="type-mono-caption text-on-dark/70 leading-snug">
          <span className="text-on-dark font-medium uppercase">AI Tip:</span>{' '}
          {profileCompletion >= 80
            ? 'Great profile! Add certifications to stand out further.'
            : 'Completing your profile increases match accuracy by ~20%.'}
        </p>
      </div>
    </div>
  );
}

function ChecklistRow({ item }: { item: ChecklistItem }) {
  const content = (
    <div
      className={`flex items-center gap-3 p-2 rounded-sm border transition-colors ${
        item.done
          ? 'bg-canvas border-hairline opacity-50 cursor-default'
          : 'bg-canvas border-hairline hover:border-ink cursor-pointer group'
      }`}
    >
      <div
        className={`w-5 h-5 rounded-sm flex items-center justify-center flex-shrink-0 transition-colors ${
          item.done
            ? 'bg-ink border-ink'
            : 'bg-canvas border border-hairline group-hover:bg-ink group-hover:border-ink'
        }`}
      >
        {item.done ? (
          <Check className="w-3 h-3 text-on-primary" />
        ) : (
          <div className="w-1.5 h-1.5 rounded-sm bg-body group-hover:bg-on-primary" />
        )}
      </div>
      <span
        className={`type-mono-eyebrow flex-1 ${
          item.done ? 'text-body line-through' : 'text-ink'
        }`}
      >
        {item.label}
      </span>
      {!item.done && (
        <ChevronRight className="w-3.5 h-3.5 text-body group-hover:text-ink transition-colors" />
      )}
    </div>
  );

  if (item.done || item.href === '#upload') return content;

  return <Link href={item.href}>{content}</Link>;
}
