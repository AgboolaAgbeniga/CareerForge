import { ContentRenderer } from '@/components/ContentRenderer';
import { backendApiRateLimitingContent } from '@/content/backend-api/rate-limiting';

export default function RateLimitingPage() {
  return <ContentRenderer content={backendApiRateLimitingContent} />;
}

export const metadata = {
  title: 'Rate Limiting Policies | Backend API Documentation',
  description: 'Comprehensive guide to rate limiting implementation, policies, and best practices in the CareerForge backend API',
};