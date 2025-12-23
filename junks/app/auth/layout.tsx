import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication - CareerForge',
  description:
    'Sign in or create your CareerForge account to access AI-powered job matching and career development tools.',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
