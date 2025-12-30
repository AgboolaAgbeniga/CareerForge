import { ContentRenderer } from '@/components/ContentRenderer';
import { sentimentAnalysisContent } from '@/content/ai-services/sentiment-analysis';

export const metadata = {
  title: 'Sentiment Analysis | CareerForge Documentation',
  description: 'AI-powered sentiment analysis for understanding candidate feedback, job descriptions, and user interactions',
  openGraph: {
    title: 'Sentiment Analysis',
    description: 'Understanding emotional context in career services',
    type: 'website',
  },
};

export default function SentimentAnalysisPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <ContentRenderer content={sentimentAnalysisContent} />
    </div>
  );
}