'use client'

import { AppShell } from '@/components/AppShell'
import { ContentRenderer } from '@/components/ContentRenderer'
import { platformArchitectureContent } from '@/content/platform/platform-architecture'

export default function PlatformArchitecturePage() {
  return (
    <AppShell>
      <div className="container mx-auto px-4 py-8">
        <ContentRenderer content={platformArchitectureContent} />
      </div>
    </AppShell>
  )
}