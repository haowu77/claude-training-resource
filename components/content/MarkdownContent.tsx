'use client'

import { useEffect } from 'react'
import { CopyButton } from './CopyButton'

interface MarkdownContentProps {
  html: string
}

export function MarkdownContent({ html }: MarkdownContentProps) {
  useEffect(() => {
    // 为所有代码块添加复制按钮
    const codeBlocks = document.querySelectorAll('pre code')

    codeBlocks.forEach((codeBlock) => {
      const pre = codeBlock.parentElement
      if (!pre) return

      // 检查是否已经添加了复制按钮
      if (pre.querySelector('.copy-button-wrapper')) return

      // 获取代码内容
      const code = codeBlock.textContent || ''

      // 创建复制按钮容器
      const wrapper = document.createElement('div')
      wrapper.className = 'copy-button-wrapper'

      // 使用 React Portal 会更好，但为了简单起见，我们直接操作 DOM
      const button = document.createElement('button')
      button.className = 'copy-button'
      button.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        </svg>
      `

      button.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(code)
          button.classList.add('copied')
          button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          `

          setTimeout(() => {
            button.classList.remove('copied')
            button.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
              </svg>
            `
          }, 2000)
        } catch (err) {
          console.error('Failed to copy code:', err)
        }
      })

      wrapper.appendChild(button)
      pre.style.position = 'relative'
      pre.appendChild(wrapper)
    })
  }, [html])

  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
