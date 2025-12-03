import { unified } from 'unified'
import remarkParse from 'remark-parse'
import { visit } from 'unist-util-visit'
import { slugify } from './utils'

export interface TocItem {
  id: string
  title: string
  level: number
  children: TocItem[]
}

/**
 * 从 Markdown 内容生成目录树
 */
export function generateToc(markdown: string): TocItem[] {
  const tree = unified().use(remarkParse).parse(markdown)
  const items: TocItem[] = []
  const stack: TocItem[] = []

  visit(tree, 'heading', (node: any) => {
    // 跳过 h1 标题（文档标题）
    if (node.depth === 1) return

    // 提取标题文本
    const title = node.children
      .map((child: any) => {
        if (child.type === 'text') return child.value
        if (child.type === 'inlineCode') return child.value
        return ''
      })
      .join('')
      .trim()

    if (!title) return

    const id = slugify(title)
    const level = node.depth

    const item: TocItem = {
      id,
      title,
      level,
      children: [],
    }

    // 构建树形结构
    while (stack.length > 0 && stack[stack.length - 1].level >= level) {
      stack.pop()
    }

    if (stack.length === 0) {
      items.push(item)
    } else {
      stack[stack.length - 1].children.push(item)
    }

    stack.push(item)
  })

  return items
}

/**
 * 获取所有标题的扁平列表（用于滚动同步）
 */
export function getFlatTocItems(items: TocItem[]): TocItem[] {
  const flat: TocItem[] = []

  function traverse(items: TocItem[]) {
    for (const item of items) {
      flat.push(item)
      if (item.children.length > 0) {
        traverse(item.children)
      }
    }
  }

  traverse(items)
  return flat
}
