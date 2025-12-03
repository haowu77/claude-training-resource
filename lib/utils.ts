import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 将中文标题转换为 URL 友好的 slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    // 移除特殊符号但保留中文
    .replace(/[^\w\u4e00-\u9fa5\s-]/g, '')
    // 空格转连字符
    .replace(/[\s_]+/g, '-')
    // 移除开头和结尾的连字符
    .replace(/^-+|-+$/g, '')
}
