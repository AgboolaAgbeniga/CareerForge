'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from './supabase';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

interface User {
  id: string;
  email: string;
  role: 'job_seeker' | 'recruiter';
  firstName: string;
  lastName: string;
  onboardingCompleted: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  getAccessToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Get access token from Supabase session
  const getAccessToken = async (): Promise<string | null> => {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token || null;
  };

  /**
   * Enhanced fetch wrapper with automatic token refresh on 401
   */
  const fetchWithAuth = React.useCallback(async (url: string, options: RequestInit = {}): Promise<Response> => {
    const token = await getAccessToken();
    const headers = {
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    let response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    // If 401 and not already refreshing, try to refresh token
    if (response.status === 401 && !isRefreshing) {
      console.log('Access token expired, attempting refresh...');

      setIsRefreshing(true);

      try {
        // Refresh session with Supabase
        const { data, error } = await supabase.auth.refreshSession();

        if (!error && data.session) {
          console.log('Token refreshed successfully, retrying original request...');

          const newToken = data.session.access_token;
          const newHeaders = {
            ...options.headers,
            Authorization: `Bearer ${newToken}`,
          };

          // Retry original request with new access token
          response = await fetch(url, {
            ...options,
            headers: newHeaders,
            credentials: 'include',
          });
        } else {
          console.error('Token refresh failed, logging out...');
          setUser(null);
          window.location.href = '/auth/login';
        }
      } catch (error) {
        console.error('Error during token refresh:', error);
        setUser(null);
      } finally {
        setIsRefreshing(false);
      }
    }

    return response;
  }, [isRefreshing]);

  // Check auth on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check Supabase session
        const { data: sessionData } = await supabase.auth.getSession();

        if (sessionData.session) {
          // Get user profile from backend
          const token = sessionData.session.access_token;
          const response = await fetch(`${API_URL}/api/auth/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
          });

          if (response.ok) {
            const result = await response.json();
            const userData = result.data?.user || result.user;
            if (userData) {
              setUser({ ...userData, onboardingCompleted: !!userData.onboardingCompleted });
            }
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Listen to auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
        // Sync token to cookie for Next.js middleware
        document.cookie = `accessToken=${session.access_token}; path=/; max-age=${15 * 60}; SameSite=Lax`;
        
        // Get user profile after sign in
        try {
          const response = await fetch(`${API_URL}/api/auth/profile`, {
            headers: {
              Authorization: `Bearer ${session.access_token}`,
            },
            credentials: 'include',
          });

          if (response.ok) {
            const result = await response.json();
            const userData = result.data?.user || result.user;
            if (userData) {
              setUser({ ...userData, onboardingCompleted: !!userData.onboardingCompleted });
            }
          }
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
        }
      } else if (event === 'SIGNED_OUT') {
        document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        setUser(null);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const checkAuth = async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (sessionData.session) {
        const response = await fetchWithAuth(`${API_URL}/api/auth/profile`);
        if (response.ok) {
          const result = await response.json();
          const userData = result.data?.user || result.user;
          if (userData) {
            setUser({ ...userData, onboardingCompleted: !!userData.onboardingCompleted });
          }
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  const login = async (email: string, password: string) => {
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.session) {
      const error = new Error(authError?.message || 'Login failed') as any;
      error.status = 401;
      throw error;
    }
    
    document.cookie = `accessToken=${authData.session.access_token}; path=/; max-age=${15 * 60}; SameSite=Lax`;

    // Get user profile from backend
    try {
      const response = await fetch(`${API_URL}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${authData.session.access_token}`,
        },
        credentials: 'include',
      });

      if (response.ok) {
        const result = await response.json();
        const userData = result.data?.user || result.user;
        const user: User = {
          ...userData,
          onboardingCompleted: !!userData.onboardingCompleted,
        };
        setUser(user);
        return user;
      }
    } catch (error) {
      console.error('Failed to fetch user profile after login:', error);
    }

    throw new Error('Failed to load user profile');
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout error', error);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, checkAuth, getAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook for authenticated API calls with automatic token refresh
 * Usage: const authFetch = useAuthFetch();
 *        const data = await authFetch('/api/some-endpoint');
 */
export const useAuthFetch = () => {
  const { getAccessToken } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);

  return async (url: string, options: RequestInit = {}): Promise<Response> => {
    const token = await getAccessToken();
    const headers = {
      ...options.headers,
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    let response = await fetch(url, {
      ...options,
      headers,
      credentials: 'include',
    });

    // Handle 401 with token refresh
    if (response.status === 401 && !isRefreshing) {
      setIsRefreshing(true);

      try {
        const { data, error } = await supabase.auth.refreshSession();

        if (!error && data.session) {
          const newToken = data.session.access_token;
          const newHeaders = {
            ...options.headers,
            Authorization: `Bearer ${newToken}`,
          };

          // Retry original request
          response = await fetch(url, {
            ...options,
            headers: newHeaders,
            credentials: 'include',
          });
        } else {
          window.location.href = '/auth/login';
        }
      } catch (error) {
        console.error('Token refresh error:', error);
        window.location.href = '/auth/login';
      } finally {
        setIsRefreshing(false);
      }
    }

    return response;
  };
};
