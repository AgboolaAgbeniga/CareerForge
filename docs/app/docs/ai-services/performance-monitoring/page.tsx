import { ContentRenderer } from '@/components/ContentRenderer';
import { performanceMonitoringContent } from '@/content/ai-services/performance-monitoring';

export const metadata = {
  title: 'AI Performance Monitoring | CareerForge Documentation',
  description: 'Comprehensive monitoring and analytics for AI service performance, model accuracy, and system health',
  openGraph: {
    title: 'AI Performance Monitoring',
    description: 'Monitoring AI services and model performance',
    type: 'website',
  },
};

export default function PerformanceMonitoringPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <ContentRenderer content={performanceMonitoringContent} />
    </div>
  );
}