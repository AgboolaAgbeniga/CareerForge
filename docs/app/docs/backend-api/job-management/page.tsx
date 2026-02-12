'use client'

import { AppShell } from '@/components/AppShell'
import { ContentRenderer } from '@/components/ContentRenderer'
import { backendApiJobManagementContent } from '@/content/backend-api/job-management'

export default function BackendApiJobManagementPage() {
  return (
    <AppShell>
      <div className="container mx-auto px-4 py-8">
        <ContentRenderer content={backendApiJobManagementContent} />
      </div>
    </AppShell>
  )
}