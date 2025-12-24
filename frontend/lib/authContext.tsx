'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

  /**
   * Enhanced fetch wrapper with automatic token refresh on 401
   */
  const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
    let response = await fetch(url, {
      ...options,
      credentials: 'include',
    });

    // If 401 and not already refreshing, try to refresh token
    if (response.status === 401 && !isRefreshing) {
      console.log('Access token expired, attempting refresh...');

      setIsRefreshing(true);

      try {
        // Call refresh endpoint
        const refreshResponse = await fetch(`${API_URL}/api/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
        });

        if (refreshResponse.ok) {
          console.log('Token refreshed successfully, retrying original request...');

          // Retry original request with new access token
          response = await fetch(url, {
            ...options,
            credentials: 'include',
          });
        } else {
          console.error('Token refresh failed, logging out...');
          setUser(null);
          window.location.href = '/login';
        }
      } catch (error) {
        console.error('Error during token refresh:', error);
        setUser(null);
      } finally {
        setIsRefreshing(false);
      }
    }

    return response;
  };

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      try {
        const response = await fetchWithAuth(`${API_URL}/api/auth/profile`);

        if (response.ok) {
          const result = await response.json();
          // Extract user from result.data.user
          const userData = result.data?.user || result.user;
          if (userData) {
            setUser({ ...userData, onboardingCompleted: !!userData.onboardingCompleted });
          } else {
            setUser(null);
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

  const checkAuth = async () => {
    try {
      const response = await fetchWithAuth(`${API_URL}/api/auth/profile`);

      if (response.ok) {
        const result = await response.json();
        const userData = result.data?.user || result.user;
        if (userData) {
          setUser({ ...userData, onboardingCompleted: !!userData.onboardingCompleted });
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    }
  };

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json().catch(() => ({ message: 'Login failed' }));

    if (response.ok) {
      const userData = result.data?.user || result.user;
      const user = { ...userData, onboardingCompleted: !!userData.onboardingCompleted };
      setUser(user);
      return user;
    } else {
      const error = new Error(result.message || 'Login failed') as any;
      error.status = response.status;
      error.code = result.code;
      throw error;
    }
  };

  const logout = async () => {
    try {
      await fetch(`${API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error', error);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, checkAuth }}>
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
  const [isRefreshing, setIsRefreshing] = useState(false);

  return async (url: string, options: RequestInit = {}): Promise<Response> => {
    let response = await fetch(url, {
      ...options,
      credentials: 'include',
    });

    // Handle 401 with token refresh
    if (response.status === 401 && !isRefreshing) {
      setIsRefreshing(true);

      try {
        const refreshResponse = await fetch(`${API_URL}/api/auth/refresh`, {
          method: 'POST',
          credentials: 'include',
        });

        if (refreshResponse.ok) {
          // Retry original request
          response = await fetch(url, {
            ...options,
            credentials: 'include',
          });
        } else {
          window.location.href = '/login';
        }
      } catch (error) {
        console.error('Token refresh error:', error);
        window.location.href = '/login';
      } finally {
        setIsRefreshing(false);
      }
    }

    return response;
  };
};