import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import apiClient from '@/lib/apiClient';
import { useSessionStore } from '@/store/useSessionStore';

export interface User {
  id: string;
  email: string;
  role: 'job_seeker' | 'recruiter';
  firstName: string;
  lastName: string;
  onboardingCompleted: boolean;
  twoFactorEnabled?: boolean;
  profile?: any;
}

export function useUser() {
  const session = useSessionStore((s) => s.session);
  return useQuery<User | null>({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await apiClient.get('/api/auth/profile') as any;
      // apiClient response interceptor already unwraps data.data
      const userData = res?.user || res?.data?.user || res;
      const profileData = res?.profile || res?.data?.profile;
      if (!userData || !userData.id) return null;
      return { ...userData, profile: profileData, onboardingCompleted: !!userData.onboardingCompleted };
    },
    enabled: !!session, // Gated by synchronous session
    staleTime: 15 * 60 * 1000, // 15 mins
    retry: (count, error: any) => {
      const status = error?.response?.status;
      if (status === 401 || status === 403) return false;
      return count < 2;
    },
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: async ({ email, password }: Record<string, string>) => {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError || !authData.session) {
        const error = new Error(authError?.message || 'Login failed') as any;
        error.status = 401;
        throw error;
      }

      // Fetch the profile
      const res = await apiClient.get('/api/auth/profile') as any;
      const userData = res?.user || res?.data?.user || res;
      const profileData = res?.profile || res?.data?.profile;
      if (!userData || !userData.id) throw new Error('Failed to load user profile');
      return { ...userData, profile: profileData, onboardingCompleted: !!userData.onboardingCompleted } as User;
    },
    // We do NOT invalidate queries here. AuthListener handles it.
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },
    // We do NOT clear cache here. AuthListener handles it.
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: async ({ email, password, firstName, lastName, role }: Record<string, string>) => {
      return await apiClient.post('/api/auth/register', { email, password, firstName, lastName, role });
    }
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      return await apiClient.post('/api/auth/forgot-password', { email });
    }
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: async ({ token, newPassword }: { token: string; newPassword: string }) => {
      return await apiClient.post('/api/auth/reset-password', { token, newPassword });
    }
  });
}

export function useDisable2FA() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: { password: string, code?: string }) => {
      return await apiClient.post('/api/auth/disable-2fa', payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  });
}

export function useRegenerateBackupCodes() {
  return useMutation({
    mutationFn: async ({ password }: { password: string }) => {
      return await apiClient.post('/api/auth/backup-codes/regenerate', { password }) as any;
    }
  });
}

export function useSetup2FA() {
  return useMutation({
    mutationFn: async () => {
      return await apiClient.post('/api/auth/setup-2fa') as any;
    }
  });
}

export function useVerify2FA() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ code }: { code: string }) => {
      return await apiClient.post('/api/auth/verify-2fa', { code });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  });
}

export function useResendVerification() {
  return useMutation({
    mutationFn: async ({ email }: { email: string }) => {
      return await apiClient.post('/api/auth/resend-verification', { email });
    }
  });
}
