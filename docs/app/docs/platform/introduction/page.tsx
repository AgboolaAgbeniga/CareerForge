'use client'

import { AppShell } from '@/components/AppShell'
import { ContentRenderer } from '@/components/ContentRenderer'
import { introductionPhilosophyContent } from '@/content/platform/introduction-philosophy'

export default function IntroductionPhilosophyPage() {
  return (
    <AppShell>
      <div className="container mx-auto px-4 py-8">
        <ContentRenderer content={introductionPhilosophyContent} />
      </div>
    </AppShell>
  )
}