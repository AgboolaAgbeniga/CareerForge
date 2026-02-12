'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from 'react';
import { ToastProps, ToastContextType } from '../types';

interface ToastWithId extends ToastProps {
  id: string;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastWithId[]>([]);

  const hideToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback((toast: Omit<ToastProps, 'onClose'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastWithId = {
      ...toast,
      id,
      onClose: () => hideToast(id),
    };

    setToasts((prev) => [...prev, newToast]);

    // Auto-hide after duration
    if (toast.duration !== 0) {
      setTimeout(() => {
        hideToast(id);
      }, toast.duration || 5000);
    }
  }, [hideToast]);

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <ToastContainer toasts={toasts} onClose={hideToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

function ToastContainer({
  toasts,
  onClose,
}: {
  toasts: ToastWithId[];
  onClose: (id: string) => void;
}) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50 pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} {...toast} />
      ))}
    </div>
  );
}

function ToastItem({ type, title, message, onClose, className }: ToastProps) {
  const typeStyles = {
    success: {
      bg: 'bg-green-50 border-green-100',
      icon: 'text-green-600',
      iconName: 'lucide:check',
    },
    error: {
      bg: 'bg-red-50 border-red-100',
      icon: 'text-red-600',
      iconName: 'lucide:alert-circle',
    },
    info: {
      bg: 'bg-blue-50 border-blue-100',
      icon: 'text-blue-600',
      iconName: 'lucide:info',
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-100',
      icon: 'text-yellow-600',
      iconName: 'lucide:alert-triangle',
    },
  };

  const style = typeStyles[type];

  return (
    <div
      className={`pointer-events-auto ${style.bg} border shadow-lg rounded-lg p-4 flex items-start gap-3 w-80 transform transition-all hover:scale-105 ${className}`}
      role="alert"
    >
      <div
        className={`${style.bg} rounded-full p-1 ${style.icon} flex-shrink-0 mt-0.5`}
      >
        <span
          className="iconify"
          data-icon={style.iconName}
          data-width="14"
        ></span>
      </div>
      <div className="flex-grow">
        {title && (
          <h5 className="text-sm font-semibold text-slate-900">{title}</h5>
        )}
        <p className="text-xs text-slate-600 mt-0.5">{message}</p>
      </div>
      <button
        onClick={onClose}
        className="text-slate-400 hover:text-slate-600 flex-shrink-0"
        aria-label="Close notification"
      >
        <span className="iconify" data-icon="lucide:x" data-width="14"></span>
      </button>
    </div>
  );
}
