import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Job Seeker Dashboard - CareerForge',
  description:
    'Access your personalized job seeker dashboard with AI-powered resume optimization, job matching, and career development tools.',
};

export default function JobSeekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
