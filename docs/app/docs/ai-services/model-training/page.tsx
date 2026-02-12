import { ContentRenderer } from '@/components/ContentRenderer';
import { modelTrainingContent } from '@/content/ai-services/model-training';

export const metadata = {
  title: 'AI Model Training | CareerForge Documentation',
  description: 'Comprehensive guide to CareerForge\'s AI model training processes, including data pipelines, training infrastructure, and model deployment',
  openGraph: {
    title: 'AI Model Training',
    description: 'Automated AI model training and deployment',
    type: 'website',
  },
};

export default function ModelTrainingPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <ContentRenderer content={modelTrainingContent} />
    </div>
  );
}