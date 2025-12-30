import { ContentRenderer } from '@/components/ContentRenderer';
import { jobSeekerDashboardContent } from '@/content/frontend/job-seeker-dashboard';

export const metadata = {
  title: 'Job Seeker Dashboard - CareerForge Documentation',
  description: 'Complete guide to the job seeker dashboard implementation, features, and architecture',
};

export default function JobSeekerDashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <ContentRenderer content={jobSeekerDashboardContent} />
      </div>
    </div>
  );
}