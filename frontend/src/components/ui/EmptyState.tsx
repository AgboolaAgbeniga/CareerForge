import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionText,
  onAction,
  className = ''
}: EmptyStateProps) {
  return (
    <div className={`cf-card flex flex-col items-center justify-center p-5xl text-center ${className}`}>
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-sm bg-hairline">
        <Icon className="w-8 h-8 text-body" />
      </div>
      <h3 className="type-display-md mb-2 text-ink">
        {title}
      </h3>
      <p className="type-body-md mb-6 max-w-sm text-body">
        {description}
      </p>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="cf-button-primary"
        >
          {actionText}
        </button>
      )}
    </div>
  );
}
