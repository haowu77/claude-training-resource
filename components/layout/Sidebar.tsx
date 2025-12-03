'use client'

import { X } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { TableOfContents } from './TableOfContents'
import { Button } from '@/components/ui/button'
import type { TocItem } from '@/lib/toc'
import { cn } from '@/lib/utils'

interface SidebarProps {
  items: TocItem[]
  activeId?: string
  isOpen?: boolean
  onClose?: () => void
}

export function Sidebar({ items, activeId, isOpen = true, onClose }: SidebarProps) {
  return (
    <>
      {/* 移动端遮罩层 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* 侧边栏 */}
      <aside
        className={cn(
          'fixed top-16 left-0 z-50 h-[calc(100vh-4rem)] w-72 border-r bg-background transition-transform duration-300 lg:sticky lg:block lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* 移动端关闭按钮 */}
        <div className="flex items-center justify-between border-b px-4 py-3 lg:hidden">
          <h2 className="font-semibold">目录</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* 目录内容 */}
        <ScrollArea className="h-full px-4 py-6">
          <TableOfContents items={items} activeId={activeId} />
        </ScrollArea>
      </aside>
    </>
  )
}
