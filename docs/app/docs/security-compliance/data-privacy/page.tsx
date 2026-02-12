import { ContentRenderer } from '@/components/ContentRenderer';
import { dataPrivacyContent } from '@/content/security-compliance/data-privacy';

export const metadata = {
  title: 'Data Privacy Policies | CareerForge Documentation',
  description: 'Comprehensive data privacy policies and practices at CareerForge, including GDPR compliance, data collection, processing, and user rights',
  openGraph: {
    title: 'Data Privacy Policies',
    description: 'Privacy-first data handling and GDPR compliance',
    type: 'website',
  },
};

export default function DataPrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <ContentRenderer content={dataPrivacyContent} />
    </div>
  );
}