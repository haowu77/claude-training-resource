# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Claude Code 培训资源网站 - 一个 Next.js 14 应用，包含培训教程文档、课程安排、课前准备和培训幻灯片等页面。所有内容为中文（简体中文）。

## Commands

```bash
npm run dev      # 启动开发服务器 (localhost:3000)
npm run build    # 构建生产版本
npm run lint     # 运行 ESLint
```

## Architecture

### 页面结构 (app/)

| 路径 | 用途 |
|------|------|
| `/` | 培训营销落地页 |
| `/docs` | 培训教程文档（Markdown 渲染） |
| `/schedule` | 培训安排时间轴 |
| `/prep` | 课前准备清单 |
| `/slides` | 培训幻灯片（全屏演示） |

### 文档系统 (/docs)

数据流：
1. `app/docs/page.tsx` (Server Component) 读取 `public/markdown/tutorial.md`
2. `lib/markdown.ts` 使用 unified/remark/rehype 解析 Markdown 为 HTML
3. `lib/toc.ts` 从 Markdown 提取 H2-H4 标题生成目录树
4. `app/docs/client-page.tsx` 渲染内容，处理搜索和滚动同步

关键组件：
- `components/layout/Sidebar.tsx` - 左侧可折叠目录导航
- `components/layout/TableOfContents.tsx` - 右侧浮动目录
- `components/content/MarkdownContent.tsx` - Markdown 内容渲染
- `components/search/SearchDialog.tsx` - FlexSearch 全文搜索 (Cmd+K)

### 样式系统

- 使用 Tailwind CSS 3
- 自定义 CSS 类定义在 `app/globals.css`：
  - `.landing-page` - 落地页深色背景
  - `.glass-card` - 玻璃态卡片效果
  - `.gradient-text` - 渐变文字效果

## Content

培训教程 Markdown 文件：`public/markdown/tutorial.md`

更新文档内容时，直接编辑此文件。目录会根据 H2-H4 标题自动生成。
