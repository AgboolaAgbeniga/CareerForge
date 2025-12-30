import { ContentRenderer } from '@/components/ContentRenderer';
import { responsiveDesignContent } from '@/content/frontend/responsive-design';

export const metadata = {
  title: 'Responsive Design - CareerForge Documentation',
  description: 'Comprehensive guide to responsive design implementation, breakpoint system, and mobile-first development practices',
};

export default function Page() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <ContentRenderer content={responsiveDesignContent} />
      </div>
    </div>
  );
}