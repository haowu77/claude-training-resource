'use client'

import { useState } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/layout/Header'
import { Sidebar } from '@/components/layout/Sidebar'
import { MarkdownContent } from '@/components/content/MarkdownContent'
import { useActiveHeading } from '@/components/layout/TableOfContents'
import type { TocItem } from '@/lib/toc'

interface ClientPageProps {
  html: string
  markdown: string
  toc: TocItem[]
  headingIds: string[]
}

export function ClientPage({ html, markdown, toc, headingIds }: ClientPageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const activeId = useActiveHeading(headingIds)

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-background">
        <Header onMenuClick={() => setSidebarOpen(true)} markdown={markdown} />

        <div className="container mx-auto flex">
          <Sidebar
            items={toc}
            activeId={activeId}
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <main className="flex-1 overflow-y-auto lg:ml-0">
            <div className="max-w-4xl mx-auto px-6 py-8 lg:px-12 lg:py-12">
              <MarkdownContent html={html} />
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
