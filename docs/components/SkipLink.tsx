'use client'

import { useEffect } from 'react'

export default function SkipLink() {
  useEffect(() => {
    // Focus management for skip link
    const skipLink = document.getElementById('skip-to-content')
    const mainContent = document.getElementById('main-content')

    if (skipLink && mainContent) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault()
        mainContent.focus()
        mainContent.scrollIntoView({ behavior: 'smooth' })
      })
    }
  }, [])

  return (
    <a
      id="skip-to-content"
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  )
}