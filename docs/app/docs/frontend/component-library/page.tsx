import { Metadata } from 'next';
import { ContentRenderer } from '@/components/ContentRenderer';
import { componentLibraryContent } from '@/content/frontend/component-library';

export const metadata: Metadata = {
  title: `${componentLibraryContent.metadata.title} | CareerForge Documentation`,
  description: componentLibraryContent.metadata.description,
};

export default function ComponentLibraryPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <ContentRenderer content={componentLibraryContent} />
    </div>
  );
}