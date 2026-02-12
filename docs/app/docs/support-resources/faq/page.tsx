import { ContentRenderer } from '@/components/ContentRenderer';
import { faqContent } from '@/content/support-resources/faq';

export const metadata = {
  title: 'FAQ | CareerForge Documentation',
  description: 'Frequently asked questions about CareerForge platform, features, pricing, support, and account management',
  openGraph: {
    title: 'Frequently Asked Questions',
    description: 'Find answers to common CareerForge questions',
    type: 'website',
  },
};

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <ContentRenderer content={faqContent} />
    </div>
  );
}