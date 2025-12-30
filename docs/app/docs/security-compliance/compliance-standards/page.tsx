import { ContentRenderer } from '@/components/ContentRenderer';
import { complianceStandardsContent } from '@/content/security-compliance/compliance-standards';

export const metadata = {
  title: 'Compliance Standards | CareerForge Documentation',
  description: 'Overview of CareerForge\'s compliance certifications, industry standards, and regulatory frameworks including SOC 2, ISO 27001, and GDPR',
  openGraph: {
    title: 'Compliance Standards',
    description: 'Industry-leading compliance and security certifications',
    type: 'website',
  },
};

export default function ComplianceStandardsPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <ContentRenderer content={complianceStandardsContent} />
    </div>
  );
}