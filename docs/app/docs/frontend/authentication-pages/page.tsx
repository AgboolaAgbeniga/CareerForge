import { ContentRenderer } from '@/components/ContentRenderer';
import { authenticationPagesContent } from '@/content/frontend/authentication-pages';

export const metadata = {
  title: 'Authentication Pages - CareerForge Documentation',
  description: 'Complete guide to CareerForge\'s authentication system including login, registration, password reset, and email verification flows',
};

export default function AuthenticationPagesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <ContentRenderer content={authenticationPagesContent} />
      </div>
    </div>
  );
}