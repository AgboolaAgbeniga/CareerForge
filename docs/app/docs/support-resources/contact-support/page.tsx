import { ContentRenderer } from '@/components/ContentRenderer';
import { contactSupportContent } from '@/content/support-resources/contact-support';

export const metadata = {
  title: 'Contact Support | CareerForge Documentation',
  description: 'Get in touch with CareerForge support team through various channels including email, chat, phone, and community forums',
  openGraph: {
    title: 'Contact Support',
    description: 'Reach out to CareerForge support for assistance',
    type: 'website',
  },
};

export default function ContactSupportPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <ContentRenderer content={contactSupportContent} />
    </div>
  );
}