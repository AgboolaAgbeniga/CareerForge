import { ContentRenderer } from '@/components/ContentRenderer';
import { troubleshootingContent } from '@/content/support-resources/troubleshooting';

export const metadata = {
  title: 'Troubleshooting Guide | CareerForge Documentation',
  description: 'Common issues and solutions for CareerForge platform, including login problems, account issues, and technical difficulties',
  openGraph: {
    title: 'Troubleshooting Guide',
    description: 'Solve common CareerForge technical issues',
    type: 'website',
  },
};

export default function TroubleshootingPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <ContentRenderer content={troubleshootingContent} />
    </div>
  );
}