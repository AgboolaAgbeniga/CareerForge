'use client'

import { AppShell } from '@/components/AppShell'
import { ContentRenderer } from '@/components/ContentRenderer'
import { backendApiCompanyManagementContent } from '@/content/backend-api/company-management'

export default function BackendApiCompanyManagementPage() {
  return (
    <AppShell>
      <div className="container mx-auto px-4 py-8">
        <ContentRenderer content={backendApiCompanyManagementContent} />
      </div>
    </AppShell>
  )
}