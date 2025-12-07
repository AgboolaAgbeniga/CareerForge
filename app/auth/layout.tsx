import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication - CareerAI',
  description:
    'Sign in or create your CareerAI account to access AI-powered job matching and career development tools.',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
