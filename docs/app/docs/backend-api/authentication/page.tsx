'use client'

import { AppShell } from '@/components/AppShell'
import { ContentRenderer } from '@/components/ContentRenderer'
import { backendApiAuthenticationContent } from '@/content/backend-api/authentication'

export default function BackendApiAuthenticationPage() {
  return (
    <AppShell>
      <div className="container mx-auto px-4 py-8">
        <ContentRenderer content={backendApiAuthenticationContent} />
      </div>
    </AppShell>
  )
}