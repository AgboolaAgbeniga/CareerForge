import { Metadata } from 'next';
import { ContentRenderer } from '@/components/ContentRenderer';
import { profileManagementContent } from '@/content/frontend/profile-management';

export const metadata: Metadata = {
  title: `${profileManagementContent.metadata.title} | CareerForge Documentation`,
  description: profileManagementContent.metadata.description,
};

export default function ProfileManagementPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <ContentRenderer content={profileManagementContent} />
    </div>
  );
}