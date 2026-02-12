'use client'

import { AppShell } from '@/components/AppShell'
import { ContentRenderer } from '@/components/ContentRenderer'
import { gettingStartedContent } from '@/content/platform/getting-started'

export default function GettingStartedPage() {
  return (
    <AppShell>
      <div className="container mx-auto px-4 py-8">
        <ContentRenderer content={gettingStartedContent} />
      </div>
    </AppShell>
  )
}