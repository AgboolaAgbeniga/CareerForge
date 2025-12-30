'use client'

import { AppShell } from '@/components/AppShell'
import { ContentRenderer } from '@/components/ContentRenderer'
import { backendApiSearchFilteringContent } from '@/content/backend-api/search-filtering'

export default function BackendApiSearchFilteringPage() {
  return (
    <AppShell>
      <div className="container mx-auto px-4 py-8">
        <ContentRenderer content={backendApiSearchFilteringContent} />
      </div>
    </AppShell>
  )
}