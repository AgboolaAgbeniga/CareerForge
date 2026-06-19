import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/apiClient';

export function useCoachHistory() {
  return useQuery({
    queryKey: ['coach', 'history'],
    queryFn: async () => {
      const history = await apiClient.get('/api/ai/coach/history') as any;
      if (Array.isArray(history) && history.length > 0) {
        return history.map((msg: any) => ({
          id: msg.id,
          role: msg.role,
          content: msg.content
        }));
      }
      return [];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useSaveCoachMessage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (payload: { messages: { role: string, content: string }[] }) => {
      return await apiClient.post('/api/ai/coach/message', payload);
    },
    onSuccess: () => {
      // Invalidate history to keep it fresh
      queryClient.invalidateQueries({ queryKey: ['coach', 'history'] });
    }
  });
}

export function useAiInsights(pageType: string, pageContext: string) {
  return useQuery({
    queryKey: ['ai', 'insights', pageType, pageContext],
    queryFn: async () => {
      if (!pageType) return null;
      const res = await apiClient.post('/api/ai/insights', { pageType, pageContext }) as any;
      return res?.data || null;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });
}
