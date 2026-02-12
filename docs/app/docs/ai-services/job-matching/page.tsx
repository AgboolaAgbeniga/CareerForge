import { ContentRenderer } from '@/components/ContentRenderer';
import { jobMatchingContent } from '@/content/ai-services/job-matching';

export const metadata = {
  title: 'Job Matching Engine | CareerForge Documentation',
  description: 'Comprehensive guide to CareerForge\'s intelligent job-candidate matching algorithms, including semantic similarity, skill matching, and compatibility scoring',
  openGraph: {
    title: 'Job Matching Engine',
    description: 'AI-powered job matching with 89% user satisfaction',
    type: 'website',
  },
};

export default function JobMatchingPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <ContentRenderer content={jobMatchingContent} />
    </div>
  );
}