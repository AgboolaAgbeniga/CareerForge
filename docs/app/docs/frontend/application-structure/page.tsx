import { ContentRenderer } from '@/components/ContentRenderer';
import { applicationStructureContent } from '@/content/frontend/application-structure';

export const metadata = {
  title: 'Application Structure - CareerForge Documentation',
  description: 'Comprehensive guide to CareerForge\'s frontend architecture, project organization, routing system, and component architecture',
};

export default function ApplicationStructurePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <ContentRenderer content={applicationStructureContent} />
      </div>
    </div>
  );
}