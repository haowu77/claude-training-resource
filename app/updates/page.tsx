'use client'

import Link from 'next/link'
import { ArrowLeft, ChevronDown, Sparkles, Wrench, Shield, Globe, Clock, BookOpen } from 'lucide-react'
import { useState } from 'react'

// ─── Types ──────────────────────────────────────────────────────

interface Update {
  id: number
  title: string
  date: string
  category: string
  categoryColor: string
  summary: string
  highlights: string[]
}

interface Tutorial {
  id: number
  title: string
  relatedUpdateIds: number[]
  description: string
  steps: string[]
  codeExample?: string
  tip?: string
}

// ─── Data ───────────────────────────────────────────────────────

const categories = [
  { label: '全部', value: 'all' },
  { label: '模型更新', value: '模型更新', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
  { label: '工具更新', value: '工具更新', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
  { label: '安全更新', value: '安全更新', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  { label: '生态更新', value: '生态更新', color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
  { label: '退役通知', value: '退役通知', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' },
]

function getCategoryStyle(category: string): string {
  const found = categories.find(c => c.value === category)
  return found?.color ?? 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30'
}

const updates: Update[] = [
  {
    id: 1,
    title: 'Claude Opus 4.6 发布',
    date: '2月5日',
    category: '模型更新',
    categoryColor: 'purple',
    summary: 'Anthropic 发布最新旗舰模型 Claude Opus 4.6（模型 ID: claude-opus-4-6），最强编码和推理能力，200K 标准上下文 / 1M beta 上下文，最大输出 128K tokens。',
    highlights: [
      '模型 ID: claude-opus-4-6，定价 $5/$25 per MTok（输入/输出）',
      '编码和推理能力为 Claude 系列最强',
      '支持 200K 标准上下文窗口，1M 扩展上下文（beta）',
      '最大输出 128K tokens，适合大型代码生成',
      '在 Claude Code 中通过 /model opus 切换使用'
    ]
  },
  {
    id: 2,
    title: 'Claude Sonnet 4.6 发布',
    date: '2月17日',
    category: '模型更新',
    categoryColor: 'purple',
    summary: 'Sonnet 4.6（模型 ID: claude-sonnet-4-6）发布，兼顾速度和能力，日常开发首选。定价 $3/$15 per MTok。',
    highlights: [
      '模型 ID: claude-sonnet-4-6，定价 $3/$15 per MTok（输入/输出）',
      '支持 200K 标准上下文窗口，1M 扩展上下文（beta）',
      '最大输出 64K tokens，响应速度优于 Opus',
      '兼顾速度和能力，日常开发推荐选择',
      '在 Claude Code 中通过 /model sonnet 切换使用'
    ]
  },
  {
    id: 3,
    title: 'Claude 3.5 Haiku 和 3.7 Sonnet 退役',
    date: '2月19日',
    category: '退役通知',
    categoryColor: 'orange',
    summary: 'claude-3-5-haiku-20241022 和 claude-3-7-sonnet-20250219 正式退役，建议迁移到 Sonnet 4.6 和 Haiku 4.5。',
    highlights: [
      'claude-3-5-haiku-20241022 正式退役（2025-12-19 标记弃用）',
      'claude-3-7-sonnet-20250219 正式退役（2025-10-28 标记弃用）',
      '建议将 3.5 Haiku 迁移到 claude-haiku-4-5-20251001',
      '建议将 3.7 Sonnet 迁移到 claude-sonnet-4-6',
      '请检查代码中的旧模型 ID 引用并及时更新'
    ]
  },
  {
    id: 4,
    title: 'Claude Haiku 3 退役通知（4月20日）',
    date: '2月19日公告',
    category: '退役通知',
    categoryColor: 'orange',
    summary: 'claude-3-haiku-20240307 于 2月19日标记弃用，计划于 2026年4月20日正式退役。建议迁移到 Haiku 4.5。',
    highlights: [
      'claude-3-haiku-20240307 于 2026-02-19 标记弃用（deprecated）',
      '计划于 2026-04-20 正式退役（retired）',
      '建议迁移到 claude-haiku-4-5-20251001',
      'Haiku 4.5 在所有指标上均优于 Haiku 3',
      '请在 4月20日前完成代码中模型 ID 的更新'
    ]
  },
  {
    id: 5,
    title: 'Claude Code Security 安全扫描',
    date: '2月20日',
    category: '安全更新',
    categoryColor: 'red',
    summary: '使用 Opus 4.6 扫描代码安全漏洞，多阶段验证过滤误报，提供严重度和置信度评级。限定研究预览阶段。',
    highlights: [
      '基于 Opus 4.6 的多阶段安全扫描，过滤误报',
      '提供严重度（severity）和置信度（confidence）评级',
      '限定研究预览：Enterprise 和 Team 客户可用',
      '开源维护者可免费使用',
      '可作为 GitHub Action 使用：github.com/anthropics/claude-code-security-review',
      '测试中已发现 500+ 个开源项目漏洞'
    ]
  },
  {
    id: 6,
    title: '收购 Vercept 增强 Computer Use',
    date: '2月25日',
    category: '生态更新',
    categoryColor: 'cyan',
    summary: 'Anthropic 收购专注 computer-use 的 AI 创业公司 Vercept，核心团队加入 Anthropic，将大幅增强 Computer Use 能力。',
    highlights: [
      '联合创始人 Kiana Ehsani、Luca Weihs、Ross Girshick 加入 Anthropic',
      'Vercept 产品 Vy（云端 computer-use agent）将于 3月25日关闭',
      '目标：增强 Claude Computer Use 能力',
      'OSWorld 基准从 <15% 提升到 72.5%'
    ]
  },
  {
    id: 7,
    title: 'Claude Code v2.1.59（Auto-Memory、/copy）',
    date: '2月26日',
    category: '工具更新',
    categoryColor: 'amber',
    summary: '新增 Auto-Memory 自动记忆功能和 /copy 交互式代码复制命令。',
    highlights: [
      'Auto-Memory：自动保存项目上下文到 ~/.claude/projects/<project>/memory/MEMORY.md',
      '默认开启，通过 /memory 命令管理，autoMemoryEnabled 设置开关',
      '/copy：交互式选择器，选择代码块复制到剪贴板',
      '消息开头加 # 可快速添加记忆'
    ]
  },
  {
    id: 8,
    title: 'Claude Code v2.1.63（/simplify、/batch、HTTP Hooks）',
    date: '2月28日',
    category: '工具更新',
    categoryColor: 'amber',
    summary: '新增 /simplify 代码审查、/batch 批量处理、HTTP Hooks 和 Shared Configs 等功能。',
    highlights: [
      '/simplify：运行三个并行审查 agent，检查代码复用、质量和效率',
      '/batch：处理代码库调查、实现和 PR 创建，使用 Git Worktree 隔离',
      'HTTP Hooks：配置 URL 类型的 hook，POST JSON 并接收 JSON 响应',
      'Shared Configs：同一仓库的 git worktree 之间共享项目配置和 auto-memory'
    ]
  },
  {
    id: 9,
    title: 'Agent Teams 实验性功能',
    date: '~2月5日',
    category: '工具更新',
    categoryColor: 'amber',
    summary: '多个 Claude Code 实例协同工作的实验性功能（v2.1.32 起），一个会话作为 team lead 分配任务。',
    highlights: [
      '多个 Claude Code 实例协同工作，一个会话作为 team lead',
      'Team lead 分配任务并汇总结果，各 teammate 有独立上下文窗口',
      '启用方式：设置 CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS 环境变量或 settings.json',
      '实验性功能，默认关闭，需手动开启'
    ]
  }
]

const tutorials: Tutorial[] = [
  {
    id: 1,
    title: '新模型使用指南',
    relatedUpdateIds: [1, 2],
    description: '学习如何在 Claude Code 中切换和使用 Opus 4.6 / Sonnet 4.6 新模型，了解各模型适用场景。',
    steps: [
      '在 Claude Code 中输入 /model 查看可用模型列表',
      '选择 claude-opus-4-6 用于复杂编程任务（架构设计、大型重构、多步推理）',
      '选择 claude-sonnet-4-6 用于日常编码（bug 修复、功能开发、代码审查）',
      '选择 claude-haiku-4-5 用于快速简单任务（格式化、简单查询）',
      '使用 /model 随时切换，根据任务复杂度选择合适模型'
    ],
    codeExample: `/model              # 查看可用模型
/model opus         # 切换 Opus 4.6
/model sonnet       # 切换 Sonnet 4.6
/model haiku        # 切换 Haiku 4.5

# 模型对比：
# Opus 4.6:   $5/$25 per MTok, 128K max output, 最强编码推理
# Sonnet 4.6: $3/$15 per MTok, 64K max output, 速度与能力兼顾
# Haiku 4.5:  轻量快速，适合简单任务`,
    tip: '建议默认使用 Sonnet 4.6 进行日常开发，只在遇到复杂架构设计或多步推理任务时切换到 Opus 4.6，以平衡效果和成本。'
  },
  {
    id: 2,
    title: 'Agent Teams 多智能体协作入门',
    relatedUpdateIds: [9],
    description: '学习如何启用 Agent Teams 实验性功能，让多个 Claude Code 实例协同工作。',
    steps: [
      '确保 Claude Code 已更新到 v2.1.32 或更新版本',
      '通过环境变量或 settings.json 启用 Agent Teams 功能',
      '在对话中描述需要并行处理的复杂任务',
      'Claude 会创建 team lead 和多个 teammate，各自有独立上下文窗口',
      'Team lead 负责分配任务并汇总各 teammate 的结果'
    ],
    codeExample: `# 方式一：通过 settings.json 启用
# 在 ~/.claude/settings.json 中添加：
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}

# 方式二：通过环境变量启用
export CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1

# 启用后，处理复杂任务时 Claude 会自动使用团队模式
# 例如：
"请帮我完成以下任务：
1. 重构 auth 模块的错误处理
2. 为 API 层添加单元测试
3. 更新 README 文档
这些任务相互独立，请并行处理。"`,
    tip: 'Agent Teams 是实验性功能，默认关闭。最适合处理多个相互独立的子任务，如果任务之间有依赖关系，建议按顺序处理。'
  },
  {
    id: 3,
    title: '/simplify 和 /batch 使用指南',
    relatedUpdateIds: [8],
    description: '掌握 /simplify 代码审查和 /batch 批量处理命令，提升开发效率。',
    steps: [
      '使用 /simplify 让三个并行审查 agent 审查最近改动的文件',
      '审查内容包括代码复用、质量和效率三个维度',
      '使用 /batch 处理代码库调查、实现和 PR 创建',
      '/batch 使用 Git Worktree 隔离，不影响当前工作分支',
      '使用 /copy 交互式选择代码块复制到剪贴板'
    ],
    codeExample: `/simplify           # 审查改动代码，检查复用/质量/效率
                    # 运行三个并行 agent 分别审查

/batch <instruction> # 批量处理，使用 Git Worktree 隔离
                    # 适合跨文件的调查、实现和 PR 创建

/copy               # 交互式选择代码块复制到剪贴板
                    # 从最近生成的代码中选择复制`,
    tip: '/simplify 在完成一轮代码编写后使用特别有效，它会运行三个并行 agent 分别从复用性、代码质量和效率三个角度审查，帮你发现可优化的部分。'
  },
  {
    id: 4,
    title: 'Auto-Memory 自动记忆配置',
    relatedUpdateIds: [7],
    description: '了解 Claude Code 的自动记忆机制，让 AI 记住你的项目偏好和工作习惯。',
    steps: [
      '自动记忆默认开启（autoMemoryEnabled 设置控制），Claude 会自动保存重要上下文',
      '记忆文件存储在 ~/.claude/projects/<project>/memory/MEMORY.md',
      '使用 /memory 命令管理记忆内容',
      'MEMORY.md 前 200 行会自动加载到上下文中',
      '可创建额外主题文件（如 debugging.md），从 MEMORY.md 链接引用',
      '消息开头加 # 可快速添加记忆'
    ],
    codeExample: `/memory             # 管理记忆

# 记忆目录结构：
# ~/.claude/projects/<project>/memory/
# ├── MEMORY.md          # 核心记忆（自动加载前 200 行）
# ├── debugging.md       # 调试相关笔记
# └── patterns.md        # 代码模式笔记

# 设置开关：
# autoMemoryEnabled: true/false

# 快速添加记忆（消息开头加 #）：
# 这个项目总是使用 bun 而不是 npm

# 手动请求保存：
"请记住：提交代码前总是先运行 lint"`,
    tip: 'MEMORY.md 前 200 行会自动加载到上下文中，所以要保持精简。详细内容放在单独的主题文件中，从 MEMORY.md 链接引用。'
  },
  {
    id: 5,
    title: 'HTTP Hooks 自动化配置',
    relatedUpdateIds: [8],
    description: '学习如何配置 URL 类型的 HTTP Hooks，实现 Claude Code 事件的自动化响应。',
    steps: [
      '在项目的 .claude/settings.json 中配置 hooks',
      '指定触发事件（如 PreToolUse、PostToolUse、Notification 等）',
      '使用 matcher 匹配特定工具（如 Write、Bash 等）',
      '设置 type: "url" 并指定 HTTP URL 作为处理端点',
      'Hook 会 POST JSON 数据并接收 JSON 响应'
    ],
    codeExample: `// .claude/settings.json 配置示例
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "url",
            "url": "http://localhost:3001/hooks/post-write"
          }
        ]
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "url",
            "url": "http://localhost:3001/hooks/pre-bash",
            "timeout": 5000
          }
        ]
      }
    ]
  }
}`,
    tip: 'HTTP Hooks 适合与团队的 CI/CD 系统或内部工具集成。例如在每次文件写入后自动触发代码风格检查，或在任务完成时发送通知到 Slack。'
  },
  {
    id: 6,
    title: '代码安全扫描入门',
    relatedUpdateIds: [5],
    description: '学习如何使用 Claude Code Security 功能检测代码中的安全漏洞，以及如何通过 GitHub Action 集成到 CI/CD。',
    steps: [
      '在 Claude Code 中明确要求对指定目录进行安全审查',
      '安全扫描基于 Opus 4.6，使用多阶段验证过滤误报',
      '扫描结果包含严重度（severity）和置信度（confidence）评级',
      '可通过 GitHub Action 集成到 CI/CD 流水线',
      '当前为限定研究预览，Enterprise/Team 客户和开源维护者可用'
    ],
    codeExample: `# 在 Claude Code 中请求安全审查
"请对 src/api/ 目录进行安全审查"

# Claude Code Security 会：
# 1. 使用 Opus 4.6 进行多阶段扫描
# 2. 过滤误报，提供严重度和置信度评级
# 3. 给出修复建议

# GitHub Action 集成
# 仓库：github.com/anthropics/claude-code-security-review
# 在 .github/workflows/ 中配置即可自动扫描 PR`,
    tip: 'Claude Code Security 处于研究预览阶段。Enterprise 和 Team 客户可直接使用，开源项目维护者可免费申请使用。测试中已发现 500+ 个开源项目漏洞。'
  },
  {
    id: 7,
    title: '模型迁移指南',
    relatedUpdateIds: [3, 4],
    description: '指导如何从即将退役的旧模型迁移到新模型，包括模型 ID 替换和注意事项。',
    steps: [
      '检查代码中是否使用了即将退役的模型 ID',
      '按照映射关系替换旧模型 ID 为新模型 ID',
      '测试替换后的功能是否正常',
      '注意新模型的输出格式可能有微小差异，需验证下游解析',
      '在 4月20日前完成 claude-3-haiku-20240307 的迁移'
    ],
    codeExample: `# 需要替换的旧模型 ID → 新模型 ID：

claude-3-haiku-20240307      → claude-haiku-4-5-20251001
claude-3-5-haiku-20241022    → claude-haiku-4-5-20251001
claude-3-7-sonnet-20250219   → claude-sonnet-4-6

# 代码中搜索和替换示例：
grep -r "claude-3-haiku-20240307" src/
grep -r "claude-3-5-haiku" src/
grep -r "claude-3-7-sonnet" src/

# 替换后务必运行测试验证
npm test`,
    tip: 'claude-3-haiku-20240307 将于 2026年4月20日正式退役，请尽快完成迁移。建议使用 grep 全局搜索旧模型 ID，确保没有遗漏。'
  }
]

// ─── Helper components ──────────────────────────────────────────

function CategoryBadge({ category }: { category: string }) {
  return (
    <span className={`inline-block px-2.5 py-0.5 text-xs font-bold rounded-full border ${getCategoryStyle(category)}`}>
      {category}
    </span>
  )
}

function TimelineDot({ color }: { color: string }) {
  const colorMap: Record<string, string> = {
    purple: 'bg-purple-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    cyan: 'bg-cyan-500',
    orange: 'bg-orange-500',
  }
  return (
    <div className={`hidden md:block absolute -left-[9px] top-6 w-4 h-4 rounded-full border-2 border-zinc-900 ${colorMap[color] ?? 'bg-zinc-500'}`} />
  )
}

function getCategoryIcon(category: string) {
  switch (category) {
    case '模型更新': return <Sparkles className="w-5 h-5" />
    case '工具更新': return <Wrench className="w-5 h-5" />
    case '安全更新': return <Shield className="w-5 h-5" />
    case '生态更新': return <Globe className="w-5 h-5" />
    case '退役通知': return <Clock className="w-5 h-5" />
    default: return <Sparkles className="w-5 h-5" />
  }
}

// ─── Page ───────────────────────────────────────────────────────

export default function UpdatesPage() {
  const [filter, setFilter] = useState('all')
  const [expandedUpdate, setExpandedUpdate] = useState<number | null>(null)
  const [expandedTutorial, setExpandedTutorial] = useState<number | null>(null)

  const filteredUpdates = filter === 'all' ? updates : updates.filter(u => u.category === filter)

  return (
    <div className="min-h-screen landing-page selection:bg-amber-500 selection:text-black">
      {/* Header */}
      <nav className="fixed top-0 w-full z-50 glass-card px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">返回首页</span>
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-black">C</div>
          <span className="font-bold text-xl tracking-tight">近期<span className="text-amber-500">更新</span></span>
        </div>
        <Link
          href="/docs"
          className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-zinc-200 transition-all"
        >
          查看教程
        </Link>
      </nav>

      {/* Hero */}
      <section className="pt-28 pb-12 px-6 max-w-6xl mx-auto text-center">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-widest">
          2026 年 2 月
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          Claude <span className="gradient-text">近期更新</span>
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8">
          了解 Claude 最新的功能更新，并通过实操教程快速上手新特性
        </p>
      </section>

      {/* ━━ Part 1: Updates Timeline ━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-amber-500" />
          官方更新一览
        </h2>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                filter === cat.value
                  ? 'bg-amber-500 text-black border-amber-500'
                  : 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative md:ml-6 md:border-l-2 md:border-zinc-800 space-y-6">
          {filteredUpdates.map(update => {
            const isExpanded = expandedUpdate === update.id
            return (
              <div key={update.id} className="relative md:pl-8">
                <TimelineDot color={update.categoryColor} />
                <div
                  className="glass-card p-6 rounded-2xl cursor-pointer hover:border-zinc-600 transition-all"
                  onClick={() => setExpandedUpdate(isExpanded ? null : update.id)}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-zinc-500 text-sm font-mono">{update.date}</span>
                    <CategoryBadge category={update.category} />
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="text-amber-500 hidden sm:block">{getCategoryIcon(update.category)}</div>
                      <h3 className="text-lg font-bold">{update.title}</h3>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-zinc-500 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                  <p className="text-zinc-400 text-sm mt-2">{update.summary}</p>

                  <div className={`overflow-hidden transition-all ${isExpanded ? 'max-h-[500px] mt-4 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <ul className="space-y-2 border-t border-zinc-800 pt-4">
                      {update.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })}

          {filteredUpdates.length === 0 && (
            <div className="text-center py-12 text-zinc-500">该分类暂无更新</div>
          )}
        </div>
      </section>

      {/* ━━ Part 2: Tutorials ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 px-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <BookOpen className="w-6 h-6 text-amber-500" />
          更新教程指导
        </h2>
        <p className="text-zinc-400 mb-10 -mt-4">针对以上更新编写的实操教程，包含步骤说明和代码示例</p>

        <div className="space-y-6">
          {tutorials.map(tutorial => {
            const isExpanded = expandedTutorial === tutorial.id
            return (
              <div key={tutorial.id} className="glass-card rounded-2xl overflow-hidden">
                <div
                  className="p-6 cursor-pointer hover:bg-white/[0.02] transition-colors"
                  onClick={() => setExpandedTutorial(isExpanded ? null : tutorial.id)}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-amber-500 text-xs font-bold">教程 {tutorial.id}</span>
                        {tutorial.relatedUpdateIds.map(uid => {
                          const related = updates.find(u => u.id === uid)
                          return related ? <CategoryBadge key={uid} category={related.category} /> : null
                        })}
                      </div>
                      <h3 className="text-lg font-bold">{tutorial.title}</h3>
                      <p className="text-zinc-400 text-sm mt-1">{tutorial.description}</p>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-zinc-500 flex-shrink-0 mt-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </div>
                </div>

                <div className={`overflow-hidden transition-all ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-6 border-t border-zinc-800 pt-4 space-y-6">
                    {/* Steps */}
                    <div>
                      <h4 className="text-sm font-bold text-amber-500 mb-3">操作步骤</h4>
                      <ol className="space-y-2">
                        {tutorial.steps.map((step, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-zinc-300">
                            <span className="w-6 h-6 bg-zinc-800 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Code example */}
                    {tutorial.codeExample && (
                      <div>
                        <h4 className="text-sm font-bold text-amber-500 mb-3">代码示例</h4>
                        <pre className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-4 overflow-x-auto">
                          <code className="text-sm text-zinc-300 whitespace-pre">{tutorial.codeExample}</code>
                        </pre>
                      </div>
                    )}

                    {/* Tip */}
                    {tutorial.tip && (
                      <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                        <p className="text-amber-400 text-sm">
                          <span className="font-bold">最佳实践：</span>{tutorial.tip}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 text-center border-t border-zinc-900">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">想深入了解？</h2>
        <p className="text-zinc-500 mb-8 max-w-lg mx-auto">查看完整的培训教程，系统学习 Claude Code 的使用方法</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/docs"
            className="bg-white text-black px-10 py-4 rounded-xl font-bold text-lg hover:bg-zinc-200 transition-all inline-block"
          >
            查看培训教程
          </Link>
          <Link
            href="/schedule"
            className="glass-card px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/5 transition-all inline-block"
          >
            查看培训安排
          </Link>
        </div>
        <div className="mt-16 text-xs text-zinc-700 uppercase tracking-[0.2em]">
          <p>© 2026 CLAUDE CODE 团队转型培训</p>
        </div>
      </footer>
    </div>
  )
}
