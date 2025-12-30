import { Metadata } from 'next';
import { getContent } from '@/lib/content-loader';
import { ContentPage } from '@/components/ContentPage';

export const metadata: Metadata = {
  title: 'SDKs & Libraries | Developer Resources | CareerForge Documentation',
  description: 'Explore CareerForge SDKs and libraries for seamless integration and development.',
};

export default async function SDKsLibrariesPage() {
  const content = await getContent('developer-resources/sdks-libraries');

  return (
    <ContentPage
      title={content.title}
      description={content.description}
      sections={content.sections}
      metadata={content.metadata}
    />
  );
}