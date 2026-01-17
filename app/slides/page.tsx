'use client'

import { useState, useEffect, useCallback } from 'react'
import { Clock, Target, CheckCircle2, Award } from 'lucide-react'

// Course data
const lessons = [
  {
    id: 1,
    title: "AI Coding 思维与基础操作",
    duration: "2小时",
    content: [
      { time: "0:00-0:30", topic: "思维转变", detail: "从 80 人日到 8 人日、Vibe Coding 模式" },
      { time: "0:30-1:00", topic: "安装配置", detail: "四种安装方法、claude doctor 诊断、认证方式" },
      { time: "1:00-1:30", topic: "IDE 集成", detail: "VS Code/JetBrains 插件、快捷键设置" },
      { time: "1:30-2:00", topic: "动手练习", detail: "每人启动 Claude Code 完成第一次对话" }
    ],
    output: "全员完成安装并通过认证"
  },
  {
    id: 2,
    title: "命令行操作与斜线命令",
    duration: "2小时",
    content: [
      { time: "0:00-0:40", topic: "两种模式", detail: "交互模式 vs 一次性模式、会话恢复" },
      { time: "0:40-1:20", topic: "斜线命令", detail: "管理/配置/分析/工作流四类命令详解" },
      { time: "1:20-1:45", topic: "自定义命令", detail: "项目级 .claude/commands/、用户级命令" },
      { time: "1:45-2:00", topic: "实操演练", detail: "练习核心斜线命令" }
    ],
    output: "掌握 20+ 常用斜线命令"
  },
  {
    id: 3,
    title: "记忆系统与 CLAUDE.md",
    duration: "2小时",
    content: [
      { time: "0:00-0:30", topic: "快速符号", detail: "# 添加记忆、@ 引用文件、! 执行命令" },
      { time: "0:30-1:10", topic: "CLAUDE.md", detail: "四层记忆系统、优先级规则、导入语法" },
      { time: "1:10-1:40", topic: "最佳实践", detail: "项目模板、团队共享策略、内容组织" },
      { time: "1:40-2:00", topic: "分组练习", detail: "各组为练习项目编写 CLAUDE.md" }
    ],
    output: "能编写规范的团队 CLAUDE.md"
  },
  {
    id: 4,
    title: "Plan Mode 与权限管理",
    duration: "2小时",
    content: [
      { time: "0:00-0:40", topic: "Plan Mode", detail: "三种权限模式、Shift+Tab 切换、计划审查" },
      { time: "0:40-1:10", topic: "权限管理", detail: "细粒度控制、允许/拒绝规则、企业策略" },
      { time: "1:10-1:40", topic: "会话技巧", detail: "Token 优化、成本监控、模型选择策略" },
      { time: "1:40-2:00", topic: "实操演练", detail: "配置安全的权限策略" }
    ],
    output: "能配置安全的权限策略"
  },
  {
    id: 5,
    title: "MCP 与 Agent 系统",
    duration: "2小时",
    content: [
      { time: "0:00-0:50", topic: "MCP 服务器", detail: "架构概念、常用服务器、OAuth 认证" },
      { time: "0:50-1:30", topic: "Agent 系统", detail: "内置 Subagent、自定义 Agent 创建" },
      { time: "1:30-1:50", topic: "Git 集成", detail: "Git Worktrees、多实例并行开发" },
      { time: "1:50-2:00", topic: "答疑时间", detail: "解答高级特性问题" }
    ],
    output: "能创建简单的自定义 Agent"
  },
  {
    id: 6,
    title: "工作流程与实战准备",
    duration: "2小时",
    content: [
      { time: "0:00-0:40", topic: "工作流程", detail: "代码审查/Bug修复/特性开发/重构工作流" },
      { time: "0:40-1:10", topic: "常见问题", detail: "FAQ 精选、30 条使用感悟、避坑指南" },
      { time: "1:10-1:40", topic: "实训准备", detail: "项目要求、分组确认、评审标准" },
      { time: "1:40-2:00", topic: "总复习", detail: "快速参考卡片发放" }
    ],
    output: "明确第二阶段目标和规则"
  }
]

const criteria = [
  { name: "项目完成度", weight: "25%" },
  { name: "Claude Code 熟练度", weight: "25%" },
  { name: "代码质量", weight: "20%" },
  { name: "技术分享质量", weight: "15%" },
  { name: "团队协作", weight: "10%" },
  { name: "创新性", weight: "5%" }
]

// Clock component
function CurrentTime() {
  const [time, setTime] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('zh-CN', { hour12: false }))
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return <span className="font-mono text-2xl text-zinc-400">{time}</span>
}

// Slide components
function CoverSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <div className="w-24 h-24 bg-amber-500 rounded-3xl flex items-center justify-center mb-8">
        <span className="text-5xl font-black text-black">C</span>
      </div>
      <h1 className="text-6xl font-black mb-6">
        <span className="text-amber-500">Claude Code</span>
      </h1>
      <h2 className="text-4xl font-bold text-zinc-300 mb-8">团队转型培训</h2>
      <div className="flex gap-8 text-xl text-zinc-500">
        <span>3 天线下集训</span>
        <span className="text-amber-500">+</span>
        <span>1 周线上陪跑</span>
      </div>
      <p className="mt-16 text-zinc-600 text-lg">按 → 或点击右侧开始 | F 全屏</p>
    </div>
  )
}

function DayOverviewSlide({ day, lessonIds, title }: { day: number; lessonIds: number[]; title: string }) {
  const dayLessons = lessons.filter(l => lessonIds.includes(l.id))
  return (
    <div className="flex flex-col h-full px-12 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center">
          <span className="text-3xl font-black text-black">{day}</span>
        </div>
        <div>
          <h2 className="text-4xl font-bold">Day {day}</h2>
          <p className="text-xl text-zinc-400">{title}</p>
        </div>
      </div>
      <div className="flex-1 grid gap-6">
        {dayLessons.map((lesson) => (
          <div key={lesson.id} className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-amber-500 font-bold text-xl">
                {lesson.id}
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold">{lesson.title}</h3>
                <div className="flex items-center gap-4 text-zinc-400 mt-1">
                  <span className="flex items-center gap-2"><Clock className="w-5 h-5" />{lesson.duration}</span>
                  <span className="flex items-center gap-2"><Target className="w-5 h-5" />{lesson.output}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function LessonSlide({ lesson }: { lesson: typeof lessons[0] }) {
  return (
    <div className="flex flex-col h-full px-12 py-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 bg-amber-500 rounded-xl flex items-center justify-center">
          <span className="text-2xl font-black text-black">{lesson.id}</span>
        </div>
        <div>
          <p className="text-amber-500 text-lg font-medium">课时 {lesson.id}</p>
          <h2 className="text-3xl font-bold">{lesson.title}</h2>
        </div>
        <div className="ml-auto flex items-center gap-2 text-zinc-400">
          <Clock className="w-5 h-5" />
          <span className="text-xl">{lesson.duration}</span>
        </div>
      </div>

      <div className="flex-1 space-y-4">
        {lesson.content.map((item, idx) => (
          <div key={idx} className="bg-zinc-900/50 rounded-xl p-5 border border-zinc-800 flex items-start gap-4">
            <div className="px-3 py-1.5 bg-zinc-800 rounded-lg text-amber-500 font-mono text-lg whitespace-nowrap">
              {item.time}
            </div>
            <div>
              <h4 className="text-xl font-bold text-amber-500">{item.topic}</h4>
              <p className="text-zinc-400 text-lg mt-1">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3">
        <CheckCircle2 className="w-6 h-6 text-green-500" />
        <span className="text-green-400 text-lg font-medium">产出：{lesson.output}</span>
      </div>
    </div>
  )
}

function Phase2Slide() {
  return (
    <div className="flex flex-col h-full px-12 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center">
          <span className="text-3xl font-black text-white">2</span>
        </div>
        <div>
          <h2 className="text-4xl font-bold">第二阶段：线上陪跑</h2>
          <p className="text-xl text-zinc-400">1 周实训周期 | 2 次评审节点</p>
        </div>
      </div>

      <div className="flex-1 grid gap-4">
        <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
          <h3 className="text-xl font-bold text-blue-400 mb-4">Day 1-2：项目启动</h3>
          <ul className="space-y-2 text-lg text-zinc-300">
            <li className="flex items-center gap-3"><span className="w-2 h-2 bg-blue-400 rounded-full"></span>项目选题、需求分析</li>
            <li className="flex items-center gap-3"><span className="w-2 h-2 bg-blue-400 rounded-full"></span>技术方案设计</li>
            <li className="flex items-center gap-3"><span className="w-2 h-2 bg-blue-400 rounded-full"></span>开始开发</li>
          </ul>
        </div>
        <div className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
          <h3 className="text-xl font-bold text-blue-400 mb-4">Day 3-4：核心开发</h3>
          <ul className="space-y-2 text-lg text-zinc-300">
            <li className="flex items-center gap-3"><span className="w-2 h-2 bg-blue-400 rounded-full"></span>核心功能开发</li>
            <li className="flex items-center gap-3"><span className="w-2 h-2 bg-blue-400 rounded-full"></span>项目完善与调试</li>
          </ul>
        </div>
        <div className="bg-zinc-900/50 rounded-2xl p-6 border border-amber-500/30">
          <h3 className="text-xl font-bold text-amber-500 mb-4">Day 5：最终评审</h3>
          <ul className="space-y-2 text-lg text-zinc-300">
            <li className="flex items-center gap-3"><span className="w-2 h-2 bg-amber-500 rounded-full"></span>各组完整展示（每组 25 分钟）</li>
            <li className="flex items-center gap-3"><span className="w-2 h-2 bg-amber-500 rounded-full"></span>导师深度点评</li>
            <li className="flex items-center gap-3"><span className="w-2 h-2 bg-amber-500 rounded-full"></span>评分汇总与公布</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function CriteriaSlide() {
  return (
    <div className="flex flex-col h-full px-12 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-amber-500/20 rounded-2xl flex items-center justify-center">
          <Award className="w-8 h-8 text-amber-500" />
        </div>
        <div>
          <h2 className="text-4xl font-bold">评审标准</h2>
          <p className="text-xl text-zinc-400">100 分制，6 个维度综合评估</p>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4">
        {criteria.map((c, idx) => (
          <div key={idx} className="bg-zinc-900/50 rounded-2xl p-6 border border-zinc-800">
            <div className="text-4xl font-black text-amber-500 mb-2">{c.weight}</div>
            <div className="text-xl font-medium">{c.name}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-4 gap-3">
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-center">
          <div className="text-green-500 font-bold text-xl">90+ 分</div>
          <div className="text-zinc-400">优秀</div>
        </div>
        <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl text-center">
          <div className="text-blue-500 font-bold text-xl">80-89 分</div>
          <div className="text-zinc-400">良好</div>
        </div>
        <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl text-center">
          <div className="text-yellow-500 font-bold text-xl">70-79 分</div>
          <div className="text-zinc-400">合格</div>
        </div>
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-center">
          <div className="text-red-500 font-bold text-xl">&lt;70 分</div>
          <div className="text-zinc-400">需关注</div>
        </div>
      </div>
    </div>
  )
}

function EndSlide() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-8">
      <div className="w-20 h-20 bg-amber-500 rounded-2xl flex items-center justify-center mb-6">
        <CheckCircle2 className="w-10 h-10 text-black" />
      </div>
      <h1 className="text-5xl font-black mb-4">培训安排完毕</h1>
      <p className="text-2xl text-zinc-400 mb-8">祝培训顺利！</p>
      <div className="text-zinc-600">
        <p>按 ← 返回 | 按 Home 回到开始</p>
      </div>
    </div>
  )
}

export default function SlidesPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Define slides
  const slides = [
    { type: 'cover' },
    { type: 'day', day: 1, lessonIds: [1, 2], title: '线下集训（课时 1-2）' },
    { type: 'lesson', lessonId: 1 },
    { type: 'lesson', lessonId: 2 },
    { type: 'day', day: 2, lessonIds: [3, 4], title: '线下集训（课时 3-4）' },
    { type: 'lesson', lessonId: 3 },
    { type: 'lesson', lessonId: 4 },
    { type: 'day', day: 3, lessonIds: [5, 6], title: '线下集训（课时 5-6）' },
    { type: 'lesson', lessonId: 5 },
    { type: 'lesson', lessonId: 6 },
    { type: 'phase2' },
    { type: 'criteria' },
    { type: 'end' }
  ]

  const totalSlides = slides.length

  const goNext = useCallback(() => {
    setCurrentSlide(prev => Math.min(prev + 1, totalSlides - 1))
  }, [totalSlides])

  const goPrev = useCallback(() => {
    setCurrentSlide(prev => Math.max(prev - 1, 0))
  }, [])

  const goToStart = useCallback(() => {
    setCurrentSlide(0)
  }, [])

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        goNext()
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        goPrev()
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault()
        toggleFullscreen()
      } else if (e.key === 'Home') {
        e.preventDefault()
        goToStart()
      }
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [goNext, goPrev, goToStart, toggleFullscreen])

  // Render current slide
  const renderSlide = () => {
    const slide = slides[currentSlide]
    switch (slide.type) {
      case 'cover':
        return <CoverSlide />
      case 'day':
        return <DayOverviewSlide day={slide.day!} lessonIds={slide.lessonIds!} title={slide.title!} />
      case 'lesson':
        const lesson = lessons.find(l => l.id === slide.lessonId)
        return lesson ? <LessonSlide lesson={lesson} /> : null
      case 'phase2':
        return <Phase2Slide />
      case 'criteria':
        return <CriteriaSlide />
      case 'end':
        return <EndSlide />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white select-none">
      {/* Main slide area */}
      <div className="h-screen flex flex-col">
        {/* Header with time */}
        <div className="flex justify-between items-center px-8 py-4 border-b border-zinc-900">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-black text-sm">C</div>
            <span className="font-bold text-lg">Claude Code 培训</span>
          </div>
          <CurrentTime />
        </div>

        {/* Slide content */}
        <div className="flex-1 relative overflow-hidden">
          {/* Click zones for navigation */}
          <div
            className="absolute left-0 top-0 w-1/4 h-full z-10 cursor-w-resize opacity-0 hover:opacity-100 transition-opacity"
            onClick={goPrev}
          >
            <div className="h-full flex items-center pl-4">
              <div className="w-12 h-12 bg-zinc-800/50 rounded-full flex items-center justify-center text-zinc-400">
                ←
              </div>
            </div>
          </div>
          <div
            className="absolute right-0 top-0 w-1/4 h-full z-10 cursor-e-resize opacity-0 hover:opacity-100 transition-opacity"
            onClick={goNext}
          >
            <div className="h-full flex items-center justify-end pr-4">
              <div className="w-12 h-12 bg-zinc-800/50 rounded-full flex items-center justify-center text-zinc-400">
                →
              </div>
            </div>
          </div>

          {/* Slide */}
          <div className="h-full">
            {renderSlide()}
          </div>
        </div>

        {/* Footer with progress */}
        <div className="px-8 py-4 border-t border-zinc-900">
          <div className="flex items-center justify-between">
            <div className="text-zinc-600 text-sm">
              ← → 翻页 | F 全屏 | Home 回首页
            </div>
            <div className="flex items-center gap-4">
              {/* Progress bar */}
              <div className="w-48 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 transition-all duration-300"
                  style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
                />
              </div>
              <span className="text-zinc-400 font-mono">
                {currentSlide + 1} / {totalSlides}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
