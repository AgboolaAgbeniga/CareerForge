import { ContentRenderer } from '@/components/ContentRenderer';
import { resumeParsingContent } from '@/content/ai-services/resume-parsing';

export const metadata = {
  title: 'Resume Parsing Service | CareerForge Documentation',
  description: 'Comprehensive guide to CareerForge\'s AI-powered resume parsing capabilities, including text extraction, entity recognition, and structured data generation',
  openGraph: {
    title: 'Resume Parsing Service',
    description: 'AI-powered resume parsing with 96% accuracy',
    type: 'website',
  },
};

export default function ResumeParsingPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <ContentRenderer content={resumeParsingContent} />
    </div>
  );
}