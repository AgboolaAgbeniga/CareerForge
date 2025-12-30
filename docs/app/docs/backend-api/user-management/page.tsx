'use client'

import { AppShell } from '@/components/AppShell'
import { ContentRenderer } from '@/components/ContentRenderer'
import { backendApiUserManagementContent } from '@/content/backend-api/user-management'

export default function BackendApiUserManagementPage() {
  return (
    <AppShell>
      <div className="container mx-auto px-4 py-8">
        <ContentRenderer content={backendApiUserManagementContent} />
      </div>
    </AppShell>
  )
}