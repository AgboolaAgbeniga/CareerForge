import { ContentRenderer } from '@/components/ContentRenderer';
import { strategicGoalsContent } from '@/content/business-strategy/strategic-goals';

export const metadata = {
  title: 'Strategic Goals - CareerForge Documentation',
  description: 'CareerForge\'s comprehensive strategic objectives and goals for the next 3-5 years, focusing on growth, innovation, and market leadership',
};

export default function StrategicGoalsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <ContentRenderer content={strategicGoalsContent} />
      </div>
    </div>
  );
}