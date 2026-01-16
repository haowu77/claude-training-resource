'use client'

import Link from 'next/link'
import { ArrowLeft, Clock, Users, Target, CheckCircle2, Calendar, MessageCircle, Award, Headphones } from 'lucide-react'
import { useState } from 'react'

interface Lesson {
  id: number
  title: string
  duration: string
  content: { time: string; topic: string; detail: string }[]
  output: string
}

interface Week {
  id: number
  title: string
  description: string
  activities: string[]
  review?: {
    title: string
    duration: string
    content: string[]
    criteria?: { name: string; weight: string }[]
  }
}

const phase1Lessons: Lesson[] = [
  {
    id: 1,
    title: "AI Coding 思维与基础操作",
    duration: "2小时",
    content: [
      { time: "0:00-0:30", topic: "思维转变", detail: "从 80 人日到 8 人日、Vibe Coding 模式、从\"控制\"到\"协作\"" },
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
      { time: "0:00-0:40", topic: "两种模式", detail: "交互模式 vs 一次性模式、会话恢复、核心标志" },
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
      { time: "0:00-0:50", topic: "MCP 服务器", detail: "架构概念、常用服务器、OAuth 认证、配置范围" },
      { time: "0:50-1:30", topic: "Agent 系统", detail: "内置 Subagent、自定义 Agent 创建、代码审查示例" },
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
      { time: "1:10-1:40", topic: "实训准备", detail: "项目要求、分组确认、评审标准、时间线" },
      { time: "1:40-2:00", topic: "总复习", detail: "快速参考卡片发放" }
    ],
    output: "明确第二阶段目标和规则"
  }
]

const phase2Weeks: Week[] = [
  {
    id: 1,
    title: "项目开发与最终评审",
    description: "项目开发、完善、最终评审打分",
    activities: [
      "Day 1-2：项目选题、需求分析、技术方案、开始开发",
      "Day 3-4：核心功能开发、项目完善",
      "Day 5：最终评审与打分（线上）"
    ],
    review: {
      title: "最终评审与打分（线上）",
      duration: "3小时",
      content: [
        "各组完整展示（每组 25 分钟）：项目演示 + 技术分享 + Q&A",
        "导师深度点评：项目亮点、改进空间、个人表现评价",
        "优秀实践分享：最佳 CLAUDE.md、最佳工作流程、最佳 Agent 应用",
        "评分汇总与公布：团队排名、个人亮点表彰"
      ],
      criteria: [
        { name: "项目完成度", weight: "25%" },
        { name: "Claude Code 熟练度", weight: "25%" },
        { name: "代码质量", weight: "20%" },
        { name: "技术分享质量", weight: "15%" },
        { name: "团队协作", weight: "10%" },
        { name: "创新性", weight: "5%" }
      ]
    }
  }
]

const calendarData = [
  { week: 1, title: "第 1 周（线下）", items: ["Day 1：课时 1-2（AI 思维 + 命令行操作）", "Day 2：课时 3-4（记忆系统 + Plan Mode）", "Day 3：课时 5-6（MCP/Agent + 实战准备）"] },
  { week: 2, title: "第 2 周（线上）", items: ["Day 1-2：项目选题、需求分析、开始开发", "Day 3-4：核心功能开发、项目完善", "Day 5：最终评审与打分"] }
]

export default function SchedulePage() {
  const [expandedLesson, setExpandedLesson] = useState<number | null>(null)
  const [expandedWeek, setExpandedWeek] = useState<number | null>(null)
  const [showCriteria, setShowCriteria] = useState(false)

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
          <span className="font-bold text-xl tracking-tight">培训<span className="text-amber-500">安排</span></span>
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
          精确到课时的培训安排
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          <span className="gradient-text">2 周</span> 完整培训时间轴
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8">
          3 天线下集训 + 1 周线上陪跑，带你的团队完成 AI Coding 转型
        </p>

        {/* Overview Table */}
        <div className="glass-card rounded-2xl p-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div className="p-4">
              <div className="text-3xl font-black gradient-text mb-1">3</div>
              <div className="text-zinc-400 text-sm">天线下</div>
              <div className="text-zinc-600 text-xs">集中培训</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-black gradient-text mb-1">2</div>
              <div className="text-zinc-400 text-sm">周周期</div>
              <div className="text-zinc-600 text-xs">完整培训</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-black gradient-text mb-1">1</div>
              <div className="text-zinc-400 text-sm">次评审</div>
              <div className="text-zinc-600 text-xs">筛选人员</div>
            </div>
            <div className="p-4">
              <div className="text-3xl font-black gradient-text mb-1">1</div>
              <div className="text-zinc-400 text-sm">周实训</div>
              <div className="text-zinc-600 text-xs">线上陪跑</div>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 1: Theory Training */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-black font-bold text-xl">1</div>
          <div>
            <h2 className="text-2xl font-bold">第一阶段：线下集训</h2>
            <p className="text-zinc-400">6 课时 × 2 小时 = 12 小时 | 线下出差 3 天</p>
          </div>
          <span className="ml-auto px-3 py-1 bg-amber-500/20 text-amber-500 text-xs font-bold rounded-full">线下</span>
        </div>

        <div className="space-y-4">
          {phase1Lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="glass-card rounded-2xl overflow-hidden cursor-pointer"
              onClick={() => setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)}
            >
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-zinc-800 rounded-xl flex items-center justify-center text-amber-500 font-bold">
                    {lesson.id}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{lesson.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-zinc-400">
                      <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{lesson.duration}</span>
                      <span className="flex items-center gap-1"><Target className="w-4 h-4" />{lesson.output}</span>
                    </div>
                  </div>
                </div>
                <span className={`text-amber-500 transition-transform ${expandedLesson === lesson.id ? 'rotate-180' : ''}`}>▼</span>
              </div>

              <div className={`overflow-hidden transition-all ${expandedLesson === lesson.id ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6 border-t border-zinc-800">
                  <table className="w-full mt-4 text-sm">
                    <thead>
                      <tr className="text-zinc-500 text-left">
                        <th className="pb-2 w-24">时段</th>
                        <th className="pb-2 w-32">主题</th>
                        <th className="pb-2">内容要点</th>
                      </tr>
                    </thead>
                    <tbody>
                      {lesson.content.map((item, idx) => (
                        <tr key={idx} className="border-t border-zinc-800/50">
                          <td className="py-3 text-zinc-400">{item.time}</td>
                          <td className="py-3 text-amber-500 font-medium">{item.topic}</td>
                          <td className="py-3 text-zinc-300">{item.detail}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Phase 2: Practical Training */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-black font-bold text-xl">2</div>
          <div>
            <h2 className="text-2xl font-bold">第二阶段：线上陪跑</h2>
            <p className="text-zinc-400">1 周实训周期 | 1 次评审节点 | 10-20 人分 3-4 组</p>
          </div>
          <span className="ml-auto px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-bold rounded-full">线上</span>
        </div>

        <div className="space-y-6">
          {phase2Weeks.map((week) => (
            <div
              key={week.id}
              className="glass-card rounded-2xl overflow-hidden"
            >
              <div
                className="p-6 flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedWeek(expandedWeek === week.id ? null : week.id)}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex flex-col items-center justify-center">
                    <span className="text-amber-500 text-xs">WEEK</span>
                    <span className="text-2xl font-bold">{week.id}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">{week.title}</h3>
                    <p className="text-zinc-400 text-sm">{week.description}</p>
                  </div>
                </div>
                {week.review && (
                  <div className="hidden md:flex items-center gap-2 text-amber-500 text-sm">
                    <Award className="w-4 h-4" />
                    <span>{week.review.title.split('：')[0]}</span>
                  </div>
                )}
                <span className={`text-amber-500 transition-transform ${expandedWeek === week.id ? 'rotate-180' : ''}`}>▼</span>
              </div>

              <div className={`overflow-hidden transition-all ${expandedWeek === week.id ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="px-6 pb-6 border-t border-zinc-800">
                  <div className="mt-4 space-y-2">
                    {week.activities.map((activity, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-zinc-300">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-amber-500 flex-shrink-0" />
                        {activity}
                      </div>
                    ))}
                  </div>

                  {week.review && (
                    <div className="mt-6 p-4 bg-zinc-900/50 rounded-xl border border-amber-500/20">
                      <h4 className="font-bold text-amber-500 mb-2">{week.review.title}</h4>
                      <p className="text-zinc-400 text-sm mb-3">时长：{week.review.duration}</p>
                      <ul className="space-y-2 mb-4">
                        {week.review.content.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-zinc-300">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                      {week.review.criteria && (
                        <div className="flex flex-wrap gap-2">
                          {week.review.criteria.map((c, idx) => (
                            <span key={idx} className="px-3 py-1 bg-zinc-800 rounded-full text-xs">
                              {c.name} <span className="text-amber-500">{c.weight}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Scoring Criteria */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div
          className="glass-card rounded-2xl p-6 cursor-pointer"
          onClick={() => setShowCriteria(!showCriteria)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center">
                <Award className="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold">最终评审打分标准（用于人员筛选）</h3>
                <p className="text-zinc-400 text-sm">100 分制，基于 6 个维度综合评估</p>
              </div>
            </div>
            <span className={`text-amber-500 transition-transform ${showCriteria ? 'rotate-180' : ''}`}>▼</span>
          </div>

          <div className={`overflow-hidden transition-all ${showCriteria ? 'max-h-[600px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-zinc-900/50 rounded-xl">
                <div className="text-2xl font-bold text-amber-500 mb-1">25%</div>
                <div className="font-medium">项目完成度</div>
                <div className="text-zinc-400 text-sm">功能完整性、演示效果</div>
              </div>
              <div className="p-4 bg-zinc-900/50 rounded-xl">
                <div className="text-2xl font-bold text-amber-500 mb-1">25%</div>
                <div className="font-medium">Claude Code 熟练度</div>
                <div className="text-zinc-400 text-sm">工具使用、效率提升体现</div>
              </div>
              <div className="p-4 bg-zinc-900/50 rounded-xl">
                <div className="text-2xl font-bold text-amber-500 mb-1">20%</div>
                <div className="font-medium">代码质量</div>
                <div className="text-zinc-400 text-sm">规范性、可维护性、测试覆盖</div>
              </div>
              <div className="p-4 bg-zinc-900/50 rounded-xl">
                <div className="text-2xl font-bold text-amber-500 mb-1">15%</div>
                <div className="font-medium">技术分享质量</div>
                <div className="text-zinc-400 text-sm">表达清晰度、经验总结深度</div>
              </div>
              <div className="p-4 bg-zinc-900/50 rounded-xl">
                <div className="text-2xl font-bold text-amber-500 mb-1">10%</div>
                <div className="font-medium">团队协作</div>
                <div className="text-zinc-400 text-sm">分工合理、协作效率</div>
              </div>
              <div className="p-4 bg-zinc-900/50 rounded-xl">
                <div className="text-2xl font-bold text-amber-500 mb-1">5%</div>
                <div className="font-medium">创新性</div>
                <div className="text-zinc-400 text-sm">Agent 创新应用、流程优化</div>
              </div>
            </div>

            <div className="border-t border-zinc-800 pt-4">
              <h4 className="font-bold mb-3">筛选参考</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                  <div className="text-green-500 font-bold">90+ 分</div>
                  <div className="text-zinc-400">优秀 · AI Coding 骨干</div>
                </div>
                <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
                  <div className="text-blue-500 font-bold">80-89 分</div>
                  <div className="text-zinc-400">良好 · 独立使用</div>
                </div>
                <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg text-center">
                  <div className="text-yellow-500 font-bold">70-79 分</div>
                  <div className="text-zinc-400">合格 · 持续提升</div>
                </div>
                <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-center">
                  <div className="text-red-500 font-bold">&lt;70 分</div>
                  <div className="text-zinc-400">需关注 · 额外培训</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Online Q&A Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">答疑支持安排</h2>
            <p className="text-zinc-400">贯穿全程的持续支持</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-bold text-lg text-amber-500">线下培训期间</h3>
              <span className="px-2 py-0.5 bg-amber-500/20 text-amber-500 text-xs rounded-full">3 天</span>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></span>
                <div><span className="text-zinc-300">现场答疑</span><span className="text-zinc-500"> · 培训过程中即时解答</span></div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></span>
                <div><span className="text-zinc-300">实操指导</span><span className="text-zinc-500"> · 动手练习时一对一辅导</span></div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></span>
                <div><span className="text-zinc-300">分组讨论</span><span className="text-zinc-500"> · 实训项目准备与规划</span></div>
              </li>
            </ul>
          </div>
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-bold text-lg text-blue-400">线上陪跑期间</h3>
              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 text-xs rounded-full">1 周</span>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>
                <div><span className="text-zinc-300">即时消息群</span><span className="text-zinc-500"> · 工作时间随时提问</span></div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>
                <div><span className="text-zinc-300">每周答疑会</span><span className="text-zinc-500"> · 共性问题集中解答</span></div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0"></span>
                <div><span className="text-zinc-300">评审前指导</span><span className="text-zinc-500"> · 评审前重点辅导</span></div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Follow-up Support Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center">
            <Headphones className="w-6 h-6 text-green-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">后续持续支持</h2>
            <p className="text-zinc-400">陪跑结束后按需继续答疑</p>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <div>
            <h3 className="font-bold text-lg mb-4 text-green-500">按需答疑服务</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></span>
                  <div><span className="text-zinc-300">线上答疑</span><span className="text-zinc-500"> · 消息群或视频会议，灵活安排</span></div>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></span>
                  <div><span className="text-zinc-300">线下辅导</span><span className="text-zinc-500"> · 按需出差，深度问题现场解决</span></div>
                </li>
                <li className="flex items-start gap-3 text-sm">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></span>
                  <div><span className="text-zinc-300">进阶培训</span><span className="text-zinc-500"> · 根据团队需求定制进阶内容</span></div>
                </li>
              </ul>
          </div>
        </div>
      </section>

      {/* Calendar View */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center">
            <Calendar className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">2 周培训日历</h2>
            <p className="text-zinc-400">完整的时间安排总览</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {calendarData.map((week) => (
            <div key={week.week} className={`glass-card p-5 rounded-2xl ${week.week === 1 ? 'border border-amber-500/30' : 'border border-blue-500/20'}`}>
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${week.week === 1 ? 'bg-amber-500 text-black' : 'bg-blue-500/20 text-blue-400'}`}>
                  {week.week}
                </span>
                <span className="font-bold">{week.title}</span>
              </div>
              <ul className="space-y-2">
                {week.items.map((item, idx) => (
                  <li key={idx} className="text-sm text-zinc-400 flex items-start gap-2">
                    <span className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${week.week === 1 ? 'bg-amber-500' : 'bg-blue-400'}`}></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="py-16 px-6 text-center border-t border-zinc-900">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">准备好开始培训了吗？</h2>
        <p className="text-zinc-500 mb-8 max-w-lg mx-auto">查看完整培训教程，了解更多细节</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/docs"
            className="bg-white text-black px-10 py-4 rounded-xl font-bold text-lg hover:bg-zinc-200 transition-all inline-block"
          >
            查看培训教程
          </Link>
          <Link
            href="/"
            className="glass-card px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/5 transition-all inline-block"
          >
            返回首页
          </Link>
        </div>
        <div className="mt-16 text-xs text-zinc-700 uppercase tracking-[0.2em]">
          <p>© 2025 CLAUDE CODE 团队转型培训</p>
        </div>
      </footer>
    </div>
  )
}
