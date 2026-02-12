import { ContentRenderer } from '@/components/ContentRenderer';
import { chatbotIntegrationContent } from '@/content/ai-services/chatbot-integration';

export const metadata = {
  title: 'Chatbot Integration | CareerForge Documentation',
  description: 'Guide to CareerForge\'s conversational AI chatbot for career guidance, job search assistance, and personalized recommendations',
  openGraph: {
    title: 'Chatbot Integration',
    description: 'Conversational AI for career services',
    type: 'website',
  },
};

export default function ChatbotIntegrationPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <ContentRenderer content={chatbotIntegrationContent} />
    </div>
  );
}