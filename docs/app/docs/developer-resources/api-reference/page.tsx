import { ContentRenderer } from '@/components/ContentRenderer';
import { apiReferenceContent } from '@/content/developer-resources/api-reference';

export const metadata = {
  title: 'API Reference - CareerForge Documentation',
  description: 'Complete reference for CareerForge APIs, including endpoints, parameters, responses, and examples for all services',
};

export default function ApiReferencePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <ContentRenderer content={apiReferenceContent} />
      </div>
    </div>
  );
}