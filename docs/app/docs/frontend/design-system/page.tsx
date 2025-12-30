import { Metadata } from 'next';
import { ContentRenderer } from '@/components/ContentRenderer';
import { designSystemContent } from '@/content/frontend/design-system';

export const metadata: Metadata = {
  title: `${designSystemContent.metadata.title} | CareerForge Documentation`,
  description: designSystemContent.metadata.description,
};

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <ContentRenderer content={designSystemContent} />
    </div>
  );
}