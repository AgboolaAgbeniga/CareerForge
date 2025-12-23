'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  loading: boolean;
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

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      try {
        // No need to get token from localStorage, browser will send cookie
        const response = await fetch('http://localhost:5000/api/auth/profile', {
          credentials: 'include', // Ensure cookies are sent
          headers: {
            // No Authorization header needed
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser({ ...data.user, onboardingCompleted: data.user.onboardingCompleted });
        } else {
          // If 401, cookies are invalid or missing
          // No need to clear localStorage
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important: receive cookies
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      // Tokens are set in cookies by the server
      const user = { ...data.user, onboardingCompleted: data.user.onboardingCompleted };
      setUser(user);
      return user;
    } else {
      throw new Error('Login failed');
    }
  };

  const logout = async () => {
    try {
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });
    } catch (error) {
      console.error('Logout error', error);
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};