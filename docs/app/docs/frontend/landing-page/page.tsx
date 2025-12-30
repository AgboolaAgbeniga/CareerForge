import { ContentRenderer } from '@/components/ContentRenderer';
import { landingPageContent } from '@/content/frontend/landing-page';

export const metadata = {
  title: 'Landing Page Design - CareerForge Documentation',
  description: 'Comprehensive guide to CareerForge\'s homepage design, hero section, navigation, and call-to-action elements',
};

export default function LandingPagePage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <ContentRenderer content={landingPageContent} />
      </div>
    </div>
  );
}