import FlexSearch from 'flexsearch'

export interface SearchResult {
  id: string
  title: string
  content: string
  url: string
}

let searchIndex: FlexSearch.Index | null = null
let searchData: SearchResult[] = []

/**
 * 初始化搜索索引
 */
export function initializeSearch(markdown: string) {
  // 创建索引
  searchIndex = new FlexSearch.Index({
    tokenize: 'forward',
    charset: 'latin:advanced',
    resolution: 9,
  })

  // 解析 markdown 并构建搜索数据
  const lines = markdown.split('\n')
  let currentSection = { id: '', title: '', content: '' }
  let sectionIndex = 0

  lines.forEach((line) => {
    // 检测标题
    const headingMatch = line.match(/^(#{2,6})\s+(.+)$/)
    if (headingMatch) {
      // 保存之前的部分
      if (currentSection.title) {
        const result: SearchResult = {
          id: `section-${sectionIndex}`,
          title: currentSection.title,
          content: currentSection.content.trim().slice(0, 200), // 限制内容长度
          url: `#${slugify(currentSection.title)}`,
        }
        searchData.push(result)
        searchIndex!.add(sectionIndex, `${result.title} ${result.content}`)
        sectionIndex++
      }

      // 开始新的部分
      currentSection = {
        id: `section-${sectionIndex}`,
        title: headingMatch[2].trim(),
        content: '',
      }
    } else if (line.trim() && !line.startsWith('```')) {
      // 累积内容（跳过代码块）
      currentSection.content += line + ' '
    }
  })

  // 保存最后一个部分
  if (currentSection.title) {
    const result: SearchResult = {
      id: `section-${sectionIndex}`,
      title: currentSection.title,
      content: currentSection.content.trim().slice(0, 200),
      url: `#${slugify(currentSection.title)}`,
    }
    searchData.push(result)
    searchIndex!.add(sectionIndex, `${result.title} ${result.content}`)
  }
}

/**
 * 执行搜索
 */
export function search(query: string, limit: number = 10): SearchResult[] {
  if (!searchIndex || !query.trim()) {
    return []
  }

  const results = searchIndex.search(query, { limit })
  return results.map((index) => searchData[index as number]).filter(Boolean)
}

/**
 * URL 友好的 slug 化
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
