'use client'

import { BookOpen, Menu } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '@/components/ui/button'
import { SearchDialog } from '@/components/search/SearchDialog'

interface HeaderProps {
  onMenuClick: () => void
  markdown?: string
}

export function Header({ onMenuClick, markdown }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        {/* 移动端菜单按钮 */}
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 lg:hidden"
          onClick={onMenuClick}
          aria-label="打开菜单"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Logo 和标题 */}
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-bold">Claude Code 培训教程</h1>
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* 搜索按钮 */}
          {markdown && <SearchDialog markdown={markdown} />}

          {/* 主题切换按钮 */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
