import { Metadata } from 'next';
import { ContentRenderer } from '@/components/ContentRenderer';
import { applicationProcessContent } from '@/content/frontend/application-process';

export const metadata: Metadata = {
  title: `${applicationProcessContent.metadata.title} | CareerForge Documentation`,
  description: applicationProcessContent.metadata.description,
};

export default function ApplicationProcessPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <ContentRenderer content={applicationProcessContent} />
    </div>
  );
}