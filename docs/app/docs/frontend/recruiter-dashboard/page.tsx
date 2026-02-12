import { ContentRenderer } from '@/components/ContentRenderer';
import { recruiterDashboardContent } from '@/content/frontend/recruiter-dashboard';

export const metadata = {
  title: 'Recruiter Dashboard - CareerForge Documentation',
  description: 'Complete guide to the recruiter dashboard implementation, features, and architecture',
};

export default function RecruiterDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <ContentRenderer content={recruiterDashboardContent} />
      </div>
    </div>
  );
}