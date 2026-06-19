'use client';

import { create } from 'zustand';
import { ToastProps } from '@/components/types';

export interface ToastWithId extends ToastProps {
  id: string;
}

interface ToastState {
  toasts: ToastWithId[];
  showToast: (toast: Omit<ToastProps, 'onClose'>) => void;
  hideToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set, get) => ({
  toasts: [],
  showToast: (toast) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: ToastWithId = {
      ...toast,
      id,
      onClose: () => get().hideToast(id),
    };

    set((state) => ({ toasts: [...state.toasts, newToast] }));

    if (toast.duration !== 0) {
      setTimeout(() => {
        get().hideToast(id);
      }, toast.duration || 5000);
    }
  },
  hideToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));
