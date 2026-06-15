import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recruiter Dashboard - CareerForge',
  description:
    'Manage your recruitment pipeline with AI-powered candidate matching, job posting, and talent acquisition tools.',
};

import { PageContextProvider } from '@/contexts/PageContext';
import RecruiterCopilot from '@/components/recruiter/RecruiterCopilot';

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageContextProvider>
      <div className="relative min-h-screen">
        {children}
        <RecruiterCopilot />
      </div>
    </PageContextProvider>
  );
}
