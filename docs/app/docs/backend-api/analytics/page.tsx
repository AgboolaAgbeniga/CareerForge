import { ContentRenderer } from '@/components/ContentRenderer'
import { analyticsContent } from '@/content/backend-api/analytics'

export default function AnalyticsPage() {
  return <ContentRenderer content={analyticsContent} />
}