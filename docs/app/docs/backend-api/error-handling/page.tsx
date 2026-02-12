import { ContentRenderer } from '@/components/ContentRenderer';
import { backendApiErrorHandlingContent } from '@/content/backend-api/error-handling';

export default function ErrorHandlingPage() {
  return <ContentRenderer content={backendApiErrorHandlingContent} />;
}

export const metadata = {
  title: 'Error Handling & Responses | Backend API Documentation',
  description: 'Comprehensive guide to error handling patterns, response formats, and troubleshooting in the CareerForge backend API',
};