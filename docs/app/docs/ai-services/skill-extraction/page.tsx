import { ContentRenderer } from '@/components/ContentRenderer';
import { skillExtractionContent } from '@/content/ai-services/skill-extraction';

export const metadata = {
  title: 'Skill Extraction | CareerForge Documentation',
  description: 'Advanced AI for extracting and categorizing skills from resumes, job descriptions, and text content',
  openGraph: {
    title: 'Skill Extraction',
    description: 'Intelligent skill identification and categorization',
    type: 'website',
  },
};

export default function SkillExtractionPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <ContentRenderer content={skillExtractionContent} />
    </div>
  );
}