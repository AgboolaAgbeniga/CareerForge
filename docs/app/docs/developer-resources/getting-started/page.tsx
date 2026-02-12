import { ContentRenderer } from '@/components/ContentRenderer';
import { gettingStartedContent } from '@/content/developer-resources/getting-started';

export const metadata = {
  title: 'Getting Started - CareerForge Documentation',
  description: 'Complete guide for developers to get started with CareerForge APIs, SDKs, and integration tools',
};

export default function GettingStartedPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <ContentRenderer content={gettingStartedContent} />
      </div>
    </div>
  );
}