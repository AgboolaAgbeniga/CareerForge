import { ContentRenderer } from '@/components/ContentRenderer';
import { overviewContent } from '@/content/business-strategy/overview';

export const metadata = {
  title: 'Business Overview - CareerForge Documentation',
  description: 'Comprehensive overview of CareerForge\'s business model, mission, and strategic positioning in the career development and recruitment industry',
};

export default function BusinessOverviewPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <ContentRenderer content={overviewContent} />
      </div>
    </div>
  );
}