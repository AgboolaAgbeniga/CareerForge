'use client';

import React, { createContext, useContext, useState } from 'react';

interface PageContextType {
  pageContextData: string | null;
  setPageContextData: (data: string | null) => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export function PageContextProvider({ children }: { children: React.ReactNode }) {
  const [pageContextData, setPageContextData] = useState<string | null>(null);

  return (
    <PageContext.Provider value={{ pageContextData, setPageContextData }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePageContext() {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error('usePageContext must be used within a PageContextProvider');
  }
  return context;
}
