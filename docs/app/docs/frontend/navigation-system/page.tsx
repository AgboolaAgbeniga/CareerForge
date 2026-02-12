import { ContentRenderer } from '@/components/ContentRenderer';
import { navigationSystemContent } from '@/content/frontend/navigation-system';

export const metadata = {
  title: 'Navigation System - CareerForge Documentation',
  description: 'Comprehensive guide to the platform navigation architecture, responsive navigation patterns, and user flow management',
};

export default function NavigationSystemPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <ContentRenderer content={navigationSystemContent} />
      </div>
    </div>
  );
}