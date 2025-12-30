import { ContentRenderer } from '@/components/ContentRenderer';
import { recommendationEngineContent } from '@/content/ai-services/recommendation-engine';

export const metadata = {
  title: 'Recommendation Engine | CareerForge Documentation',
  description: 'Comprehensive guide to CareerForge\'s personalized recommendation system, including collaborative filtering, content-based matching, and hybrid approaches',
  openGraph: {
    title: 'Recommendation Engine',
    description: 'AI-powered personalized recommendations with 91% engagement',
    type: 'website',
  },
};

export default function RecommendationEnginePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <ContentRenderer content={recommendationEngineContent} />
    </div>
  );
}