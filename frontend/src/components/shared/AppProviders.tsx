'use client';

import React, { useEffect, useState } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { supabase } from '@/lib/supabase';
import { useSessionStore } from '@/store/useSessionStore';
import { usePageStore } from '@/store/usePageStore';
import { usePathname } from 'next/navigation';
import { ThemeProvider } from 'next-themes';

const ReactQueryDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : React.lazy(() =>
        import('@tanstack/react-query-devtools').then((res) => ({
          default: res.ReactQueryDevtools,
        }))
      );

/**
 * Single source of truth for auth-driven cache invalidation.
 */
function AuthListener() {
  const setSession = useSessionStore((s) => s.setSession);

  useEffect(() => {
    // Initial fetch of session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (event === 'SIGNED_IN') {
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
      if (event === 'SIGNED_OUT') {
        queryClient.clear();
      }
      // TOKEN_REFRESHED is intentionally omitted. apiClient automatically fetches fresh tokens.
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setSession]);

  return null;
}

/**
 * Resets the page context store on navigation.
 */
function PageStoreResetter() {
  const pathname = usePathname();
  const resetPageContext = usePageStore((s) => s.resetPageContext);

  useEffect(() => {
    resetPageContext();
  }, [pathname, resetPageContext]);

  return null;
}

export function AppProviders({ children }: { children: React.ReactNode }) {
  // Ensure queryClient is only instantiated once per client
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <AuthListener />
        <PageStoreResetter />
        {children}
        <React.Suspense fallback={null}>
          <ReactQueryDevtools />
        </React.Suspense>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
