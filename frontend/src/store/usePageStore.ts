'use client';

import { create } from 'zustand';

export type PageContextData = 
  | { type: 'DASHBOARD'; role: 'job_seeker' | 'recruiter' }
  | { type: 'PROFILE'; userId?: string }
  | { type: 'COPILOT'; context?: string }
  | { type: 'GENERIC'; payload: string }
  | null;

interface PageState {
  pageContextData: PageContextData;
  setPageContextData: (data: PageContextData) => void;
  resetPageContext: () => void;
}

export const usePageStore = create<PageState>((set) => ({
  pageContextData: null,
  setPageContextData: (data) => set({ pageContextData: data }),
  resetPageContext: () => set({ pageContextData: null }),
}));
