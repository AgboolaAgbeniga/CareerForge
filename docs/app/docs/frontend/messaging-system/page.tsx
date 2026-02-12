import { Metadata } from 'next';
import { ContentRenderer } from '@/components/ContentRenderer';
import { messagingSystemContent } from '@/content/frontend/messaging-system';

export const metadata: Metadata = {
  title: `${messagingSystemContent.metadata.title} | CareerForge Documentation`,
  description: messagingSystemContent.metadata.description,
};

export default function MessagingSystemPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <ContentRenderer content={messagingSystemContent} />
    </div>
  );
}