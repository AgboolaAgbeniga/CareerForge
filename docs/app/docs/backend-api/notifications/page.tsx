'use client'

import { AppShell } from '@/components/AppShell'
import { ContentRenderer } from '@/components/ContentRenderer'
import { backendApiNotificationsContent } from '@/content/backend-api/notifications'

export default function BackendApiNotificationsPage() {
  return (
    <AppShell>
      <div className="container mx-auto px-4 py-8">
        <ContentRenderer content={backendApiNotificationsContent} />
      </div>
    </AppShell>
  )
}