'use client'

import { useEffect, useState } from 'react'
import { Search, FileText } from 'lucide-react'
import { Command } from 'cmdk'
import { search, initializeSearch, type SearchResult } from '@/lib/search'
import { cn } from '@/lib/utils'

interface SearchDialogProps {
  markdown: string
}

export function SearchDialog({ markdown }: SearchDialogProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])

  // 初始化搜索索引
  useEffect(() => {
    initializeSearch(markdown)
  }, [markdown])

  // 监听 Cmd+K / Ctrl+K
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  // 搜索
  useEffect(() => {
    if (query.trim()) {
      const searchResults = search(query, 10)
      setResults(searchResults)
    } else {
      setResults([])
    }
  }, [query])

  // 处理选择
  const handleSelect = (url: string) => {
    setOpen(false)
    setQuery('')

    // 导航到锚点
    const element = document.querySelector(url)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground border border-border rounded-md hover:bg-accent transition-colors"
      >
        <Search className="h-4 w-4" />
        <span className="hidden sm:inline">搜索文档...</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs font-mono bg-muted rounded">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
    )
  }

  return (
    <>
      {/* 遮罩层 */}
      <div
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* 搜索对话框 */}
      <div className="fixed left-1/2 top-[20%] z-50 w-full max-w-2xl -translate-x-1/2 px-4">
        <Command className="rounded-lg border border-border bg-background shadow-2xl">
          <div className="flex items-center border-b border-border px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Command.Input
              value={query}
              onValueChange={setQuery}
              placeholder="搜索文档..."
              className="flex h-12 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>

          <Command.List className="max-h-[400px] overflow-y-auto p-2">
            {query.trim() === '' && (
              <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                输入关键词开始搜索...
              </Command.Empty>
            )}

            {query.trim() !== '' && results.length === 0 && (
              <Command.Empty className="py-6 text-center text-sm text-muted-foreground">
                未找到相关结果
              </Command.Empty>
            )}

            {results.map((result) => (
              <Command.Item
                key={result.id}
                value={result.title}
                onSelect={() => handleSelect(result.url)}
                className={cn(
                  'flex items-start gap-3 rounded-md px-3 py-3 cursor-pointer',
                  'hover:bg-accent aria-selected:bg-accent'
                )}
              >
                <FileText className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                <div className="flex-1 overflow-hidden">
                  <div className="font-medium text-sm line-clamp-1">
                    {result.title}
                  </div>
                  <div className="text-xs text-muted-foreground line-clamp-2 mt-1">
                    {result.content}
                  </div>
                </div>
              </Command.Item>
            ))}
          </Command.List>

          <div className="border-t border-border px-3 py-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">↑↓</kbd>
                导航
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">Enter</kbd>
                选择
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">Esc</kbd>
                关闭
              </span>
            </div>
          </div>
        </Command>
      </div>
    </>
  )
}
