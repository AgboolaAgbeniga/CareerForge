import { ContentRenderer } from '@/components/ContentRenderer';
import { introductionContent } from '@/content/ai-services/introduction';

export const metadata = {
  title: 'AI Services Introduction | CareerForge Documentation',
  description: 'Overview of CareerForge\'s comprehensive AI services ecosystem, including machine learning models, natural language processing, and intelligent automation',
  openGraph: {
    title: 'AI Services Introduction',
    description: 'Comprehensive AI services for modern career platforms',
    type: 'website',
  },
};

export default function IntroductionPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <ContentRenderer content={introductionContent} />
    </div>
  );
}