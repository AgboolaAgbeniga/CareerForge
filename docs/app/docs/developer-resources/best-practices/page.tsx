import { Metadata } from 'next';
import { getContent } from '@/lib/content-loader';
import { ContentPage } from '@/components/ContentPage';

export const metadata: Metadata = {
  title: 'Best Practices | Developer Resources | CareerForge Documentation',
  description: 'Learn development best practices for building robust applications with CareerForge.',
};

export default async function BestPracticesPage() {
  const content = await getContent('developer-resources/best-practices');

  return (
    <ContentPage
      title={content.title}
      description={content.description}
      sections={content.sections}
      metadata={content.metadata}
    />
  );
}