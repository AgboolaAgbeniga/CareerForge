'use client'

import { AppShell } from '@/components/AppShell'
import { ContentRenderer } from '@/components/ContentRenderer'
import { backendApiIntroductionContent } from '@/content/backend-api/introduction'

export default function BackendApiIntroductionPage() {
  return (
    <AppShell>
      <div className="container mx-auto px-4 py-8">
        <ContentRenderer content={backendApiIntroductionContent} />
      </div>
    </AppShell>
  )
}