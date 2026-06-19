'use client';

import { useToastStore, ToastWithId } from '@/store/useToastStore';

export function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  const hideToast = useToastStore((s) => s.hideToast);

  if (toasts.length === 0) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-8 right-8 z-50 flex flex-col gap-3"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} onClose={() => hideToast(toast.id)} />
      ))}
    </div>
  );
}

function ToastItem({ type, title, message, onClose, className }: ToastWithId & { onClose: () => void }) {
  const typeStyles = {
    success: {
      label: 'Success',
      iconName: 'lucide:check',
    },
    error: {
      label: 'Error',
      iconName: 'lucide:alert-circle',
    },
    info: {
      label: 'Info',
      iconName: 'lucide:info',
    },
    warning: {
      label: 'Warning',
      iconName: 'lucide:alert-triangle',
    },
  };

  const style = typeStyles[type];

  return (
    <div
      className={`cf-card pointer-events-auto flex w-80 items-start gap-3 p-lg transition-colors ${className || ''}`}
      role="alert"
    >
      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm bg-hairline text-ink">
        <span className="iconify" data-icon={style.iconName} data-width="14"></span>
      </div>
      <div className="flex-grow">
        <p className="type-mono-eyebrow text-body">{style.label}</p>
        {title && <h5 className="type-body-md text-ink">{title}</h5>}
        <p className="type-caption mt-1 text-body">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm text-body transition-colors hover:bg-hairline hover:text-ink"
        aria-label="Close notification"
      >
        <span className="iconify" data-icon="lucide:x" data-width="14"></span>
      </button>
    </div>
  );
}
