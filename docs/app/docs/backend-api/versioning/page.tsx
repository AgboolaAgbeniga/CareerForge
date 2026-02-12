'use client'

import { AppShell } from '@/components/AppShell'
import { ContentRenderer } from '@/components/ContentRenderer'
import { backendApiVersioningContent } from '@/content/backend-api/versioning'

export default function BackendApiVersioningPage() {
  return (
    <AppShell>
      <div className="container mx-auto px-4 py-8">
        <ContentRenderer content={backendApiVersioningContent} />
      </div>
    </AppShell>
  )
}