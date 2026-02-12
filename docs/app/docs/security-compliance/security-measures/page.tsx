import { ContentRenderer } from '@/components/ContentRenderer';
import { securityMeasuresContent } from '@/content/security-compliance/security-measures';

export const metadata = {
  title: 'Security Measures | CareerForge Documentation',
  description: 'Comprehensive overview of CareerForge\'s security architecture, including authentication, encryption, access controls, and threat protection mechanisms',
  openGraph: {
    title: 'Security Measures',
    description: 'Enterprise-grade security for career platform protection',
    type: 'website',
  },
};

export default function SecurityMeasuresPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <ContentRenderer content={securityMeasuresContent} />
    </div>
  );
}