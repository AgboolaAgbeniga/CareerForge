import { ContentRenderer } from '@/components/ContentRenderer';
import { predictiveAnalyticsContent } from '@/content/ai-services/predictive-analytics';

export const metadata = {
  title: 'Predictive Analytics | CareerForge Documentation',
  description: 'AI-powered predictive analytics for career success forecasting, market trends, and performance predictions',
  openGraph: {
    title: 'Predictive Analytics',
    description: 'Forecasting career success and market trends',
    type: 'website',
  },
};

export default function PredictiveAnalyticsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <ContentRenderer content={predictiveAnalyticsContent} />
    </div>
  );
}