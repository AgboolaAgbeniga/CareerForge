import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recruiter Dashboard - CareerForge',
  description:
    'Manage your recruitment pipeline with AI-powered candidate matching, job posting, and talent acquisition tools.',
};

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
