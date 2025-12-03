'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, ChevronDown } from 'lucide-react'
import type { TocItem } from '@/lib/toc'
import { cn } from '@/lib/utils'

interface TableOfContentsProps {
  items: TocItem[]
  activeId?: string
}

interface TocItemProps {
  item: TocItem
  activeId?: string
  level: number
}

function TocItemComponent({ item, activeId, level }: TocItemProps) {
  const [isOpen, setIsOpen] = useState(true)
  const hasChildren = item.children.length > 0
  const isActive = activeId === item.id

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault()
      setIsOpen(!isOpen)
    } else {
      // 平滑滚动到目标元素
      const element = document.getElementById(item.id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  // 计算缩进（每层 12px）
  const indent = (level - 2) * 12

  return (
    <li>
      <a
        href={`#${item.id}`}
        onClick={handleClick}
        className={cn(
          'flex items-center gap-1 rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-accent',
          isActive && 'bg-accent font-medium text-accent-foreground',
          !isActive && 'text-muted-foreground hover:text-foreground',
          level === 2 && 'font-semibold text-base',
          level === 3 && 'font-medium',
          level >= 4 && 'text-xs'
        )}
        style={{ paddingLeft: `${indent + 8}px` }}
      >
        {hasChildren && (
          <span className="shrink-0">
            {isOpen ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronRight className="h-3 w-3" />
            )}
          </span>
        )}
        <span className="truncate">{item.title}</span>
      </a>

      {hasChildren && isOpen && (
        <ul className="space-y-1 mt-1">
          {item.children.map((child) => (
            <TocItemComponent
              key={child.id}
              item={child}
              activeId={activeId}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  )
}

export function TableOfContents({ items, activeId }: TableOfContentsProps) {
  return (
    <nav className="space-y-2">
      <ul className="space-y-1">
        {items.map((item) => (
          <TocItemComponent key={item.id} item={item} activeId={activeId} level={2} />
        ))}
      </ul>
    </nav>
  )
}

/**
 * Hook to track active heading based on scroll position
 */
export function useActiveHeading(headingIds: string[]) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -80% 0px',
        threshold: 0.1,
      }
    )

    headingIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [headingIds])

  return activeId
}
