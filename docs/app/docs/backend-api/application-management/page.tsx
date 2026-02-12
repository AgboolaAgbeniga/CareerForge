'use client'

import { AppShell } from '@/components/AppShell'
import { ContentRenderer } from '@/components/ContentRenderer'
import { backendApiApplicationManagementContent } from '@/content/backend-api/application-management'

export default function BackendApiApplicationManagementPage() {
  return (
    <AppShell>
      <div className="container mx-auto px-4 py-8">
        <ContentRenderer content={backendApiApplicationManagementContent} />
      </div>
    </AppShell>
  )
}