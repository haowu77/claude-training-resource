import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@/styles/markdown.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Claude Code 培训教程',
  description: '完整的 Claude Code 培训文档，包含详细的功能介绍、使用指南和最佳实践',
  keywords: 'Claude Code, AI, 编程助手, 培训教程, 文档',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
