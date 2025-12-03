# Claude Code 培训教程 Web 文档

这是一个专业的 Web 文档展示网站，用于在线查看 Claude Code 培训教程。

## 功能特性

### 核心功能
- ✅ **双栏布局** - 左侧目录，右侧内容，桌面端固定 280px 宽度
- ✅ **智能目录** - 4 层目录结构，支持折叠/展开，层级缩进
- ✅ **点击导航** - 点击目录项平滑滚动到对应内容
- ✅ **滚动同步** - 自动高亮当前阅读位置
- ✅ **Markdown 渲染** - 完整支持 GitHub Flavored Markdown
- ✅ **代码高亮** - 支持多种语言的语法高亮
- ✅ **代码复制** - 一键复制代码块内容
- ✅ **全文搜索** - FlexSearch 驱动，支持 Cmd/Ctrl+K 快捷键
- ✅ **主题切换** - 浅色/深色主题，记住用户偏好
- ✅ **响应式设计** - 完美适配桌面端和移动端

### 技术亮点
- **服务端渲染** - Next.js 14 App Router，SEO 友好
- **静态生成** - 构建时生成静态页面，加载速度快
- **无障碍支持** - 基于 Radix UI 的可访问组件
- **TypeScript** - 类型安全的代码库
- **Tailwind CSS** - 现代化的样式系统

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **Markdown 处理**:
  - unified - 统一的文本处理框架
  - remark-parse - Markdown 解析
  - remark-gfm - GitHub Flavored Markdown 支持
  - rehype-highlight - 代码语法高亮
  - rehype-slug - 标题 ID 生成
  - rehype-autolink-headings - 标题锚点链接
- **搜索**: FlexSearch - 高性能客户端搜索
- **UI 组件**:
  - Radix UI - 无障碍组件库
  - cmdk - 命令面板组件
  - Lucide React - 现代图标库
- **主题**: next-themes - 主题管理

## 项目结构

```
claude-code-docs/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 根布局
│   ├── page.tsx           # 首页（服务端）
│   ├── client-page.tsx    # 客户端页面
│   └── globals.css        # 全局样式
├── components/
│   ├── layout/            # 布局组件
│   │   ├── Header.tsx     # 顶部导航栏
│   │   ├── Sidebar.tsx    # 侧边栏
│   │   ├── TableOfContents.tsx  # 目录树
│   │   └── ThemeToggle.tsx      # 主题切换
│   ├── content/           # 内容组件
│   │   ├── MarkdownContent.tsx  # Markdown 渲染
│   │   └── CopyButton.tsx       # 复制按钮
│   ├── search/            # 搜索组件
│   │   └── SearchDialog.tsx     # 搜索对话框
│   └── ui/                # UI 组件库
│       ├── button.tsx
│       └── scroll-area.tsx
├── lib/                   # 工具函数
│   ├── markdown.ts        # Markdown 解析
│   ├── toc.ts            # 目录生成
│   ├── search.ts         # 搜索逻辑
│   └── utils.ts          # 通用工具
├── public/
│   └── markdown/
│       └── tutorial.md    # 原始 Markdown 文件
└── styles/
    └── markdown.css       # Markdown 样式
```

## 开发

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
npm run build
```

### 启动生产服务器

```bash
npm start
```

## 部署

### 部署到 Vercel

1. 将代码推送到 GitHub 仓库

2. 在 [Vercel](https://vercel.com) 上导入项目

3. Vercel 会自动检测 Next.js 项目并进行配置

4. 点击 "Deploy" 开始部署

5. 部署完成后会获得一个生产环境 URL

### 环境变量

本项目无需配置环境变量。

### 自定义域名

在 Vercel 项目设置中可以添加自定义域名。

## 使用说明

### 导航
- 点击左侧目录项可以跳转到对应章节
- 滚动页面时，目录会自动高亮当前章节
- 移动端点击菜单按钮打开侧边栏

### 搜索
- 点击顶部搜索按钮
- 或使用快捷键：Mac 上按 `⌘K`，Windows/Linux 上按 `Ctrl+K`
- 输入关键词查找内容
- 使用 `↑` `↓` 键导航结果，按 `Enter` 跳转

### 代码复制
- 将鼠标悬停在代码块上
- 点击右上角的复制按钮
- 代码会被复制到剪贴板

### 主题切换
- 点击顶部的主题切换按钮
- 在浅色和深色主题之间切换
- 偏好设置会自动保存

## 自定义

### 更新文档内容

替换 `public/markdown/tutorial.md` 文件为你的 Markdown 文档即可。

### 修改配色

编辑 `app/globals.css` 中的 CSS 变量：

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  /* ... 更多颜色 */
}
```

### 修改样式

编辑 `styles/markdown.css` 来自定义 Markdown 内容的样式。

## 性能优化

- **静态生成** - 页面在构建时生成，无需运行时渲染
- **代码分割** - Next.js 自动分割代码
- **图片优化** - Next.js Image 组件自动优化图片
- **字体优化** - next/font 自动优化字体加载
- **客户端搜索** - FlexSearch 在客户端运行，无需服务器请求

## 浏览器支持

- Chrome (最新)
- Firefox (最新)
- Safari (最新)
- Edge (最新)

## License

MIT

## 作者

Created with Claude Code
