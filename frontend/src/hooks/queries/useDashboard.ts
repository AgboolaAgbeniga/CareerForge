import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/lib/apiClient';
import { useSessionStore } from '@/store/useSessionStore';

export function useJobSeekerDashboard() {
  const session = useSessionStore((s) => s.session);
  return useQuery({
    queryKey: ['dashboard', 'job-seeker'],
    queryFn: async () => {
      const res = await apiClient.get('/api/dashboard/job-seeker') as any;
      return res;
    },
    enabled: !!session, // gate behind authenticated session
    staleTime: 5 * 60 * 1000, // 5 mins
  });
}

export function useRecruiterDashboard() {
  const session = useSessionStore((s) => s.session);
  return useQuery({
    queryKey: ['dashboard', 'recruiter'],
    queryFn: async () => {
      const res = await apiClient.get('/api/dashboard/recruiter') as any;
      return res;
    },
    enabled: !!session,
    staleTime: 5 * 60 * 1000, // 5 mins
  });
}

export interface OptimisticApplication {
  id: string;
  status: 'pending';
  appliedAt: string;
  jobTitle: string;
  companyName: string;
  companyLogo?: string;
}

/**
 * Apply to a job with optimistic UI:
 * 1. Immediately inserts the job into the dashboard applications list.
 * 2. On success, invalidates the dashboard query so the server state syncs.
 * 3. On error, rolls back to the previous state.
 */
export function useApplyToJob() {
  const queryClient = useQueryClient();
  const QUERY_KEY = ['dashboard', 'job-seeker'];

  return useMutation({
    mutationFn: async ({ jobId }: { jobId: string; optimisticApp: OptimisticApplication }) => {
      const res = await apiClient.post(`/api/jobs/${jobId}/apply`, {}) as any;
      return res;
    },

    onMutate: async ({ optimisticApp }) => {
      // Cancel any in-flight dashboard refetches
      await queryClient.cancelQueries({ queryKey: QUERY_KEY });

      // Snapshot previous value for rollback
      const previous = queryClient.getQueryData(QUERY_KEY);

      // Optimistically add the application
      queryClient.setQueryData(QUERY_KEY, (old: any) => {
        if (!old) return old;
        return {
          ...old,
          applications: [optimisticApp, ...(old.applications || [])],
          // Remove job from matches
          jobMatches: (old.jobMatches || []).filter((j: any) => j.id !== optimisticApp.id),
        };
      });

      return { previous };
    },

    onSuccess: () => {
      // Sync with real server state
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },

    onError: (_err, _vars, context: any) => {
      // Roll back optimistic update
      if (context?.previous !== undefined) {
        queryClient.setQueryData(QUERY_KEY, context.previous);
      }
    },
  });
}

/**
 * Fetch the ATS score for a specific resume.
 */
export function useResumeScore(resumeId: string | null) {
  const session = useSessionStore((s) => s.session);
  return useQuery({
    queryKey: ['resume', 'score', resumeId],
    queryFn: async () => {
      const res = await apiClient.get(`/api/resume/${resumeId}/score`) as any;
      return res?.data ?? res;
    },
    enabled: !!session && !!resumeId,
    staleTime: 10 * 60 * 1000, // 10 mins — scores rarely change without a new upload
  });
}
