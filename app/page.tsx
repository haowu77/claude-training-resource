import { promises as fs } from 'fs'
import path from 'path'
import { parseMarkdown } from '@/lib/markdown'
import { generateToc, getFlatTocItems } from '@/lib/toc'
import { ClientPage } from './client-page'

export default async function Page() {
  // 读取 Markdown 文件
  const filePath = path.join(process.cwd(), 'public', 'markdown', 'tutorial.md')
  const markdown = await fs.readFile(filePath, 'utf-8')

  // 解析 Markdown
  const html = await parseMarkdown(markdown)

  // 生成目录
  const toc = generateToc(markdown)
  const flatToc = getFlatTocItems(toc)
  const headingIds = flatToc.map((item) => item.id)

  return <ClientPage html={html} markdown={markdown} toc={toc} headingIds={headingIds} />
}
