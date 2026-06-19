import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/apiClient';

export function useMyResumes() {
  return useQuery({
    queryKey: ['resumes', 'my'],
    queryFn: async () => {
      const res = await apiClient.get('/api/resume/my') as any;
      return res || [];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (payload: any) => {
      const res = await apiClient.put('/api/auth/profile', payload) as any;
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
}

export function useUploadResume() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ formData, onUploadProgress }: { formData: FormData, onUploadProgress?: (e: any) => void }) => {
      const res = await apiClient.post('/api/resume/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress,
      }) as any;
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
    },
  });
}

export function useParseResume() {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await apiClient.post('/api/ai/resume/parse-file', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      }) as any;
      return res;
    },
  });
}
