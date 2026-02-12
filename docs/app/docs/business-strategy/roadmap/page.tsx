import { ContentRenderer } from '@/components/ContentRenderer';
import { roadmapContent } from '@/content/business-strategy/roadmap';

export const metadata = {
  title: 'Product Roadmap - CareerForge Documentation',
  description: 'CareerForge\'s comprehensive product roadmap and feature development timeline, outlining planned releases, milestones, and strategic initiatives',
};

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <ContentRenderer content={roadmapContent} />
      </div>
    </div>
  );
}