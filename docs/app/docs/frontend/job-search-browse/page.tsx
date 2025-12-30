import { ContentRenderer } from '@/components/ContentRenderer';
import { jobSearchBrowseContent } from '@/content/frontend/job-search-browse';

export const metadata = {
  title: 'Job Search & Browse - CareerForge Documentation',
  description: 'Complete guide to the job search interface, filter system, job listings, and detail pages',
};

export default function JobSearchBrowsePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <ContentRenderer content={jobSearchBrowseContent} />
      </div>
    </div>
  );
}