'use client'

import Link from 'next/link'
import { Terminal, Cpu, Network, Rocket, Users, BookOpen, GraduationCap, Wrench, MessageCircle } from 'lucide-react'
import { ReactNode, useState } from 'react'

interface Module {
  id: number
  title: string
  description: string
  items: string[]
  icon: ReactNode
}

interface Phase {
  id: number
  title: string
  subtitle: string
  description: string
  items: string[]
  icon: ReactNode
}

interface FAQItem {
  question: string
  answer: string
}

const modules: Module[] = [
  {
    id: 1,
    title: "基础与理论框架",
    description: "建立 AI Coding 的正确思维模式，理解人机协作的核心原理。",
    icon: <BookOpen className="w-6 h-6" />,
    items: [
      "AI Coding 思维模式转变",
      "上下文管理的重要性",
      "渐进式任务分解方法",
      "人机协作的智慧"
    ]
  },
  {
    id: 2,
    title: "Claude Code 核心技能",
    description: "掌握 CLI 工具的核心用法，从基础操作到高级技巧。",
    icon: <Terminal className="w-6 h-6" />,
    items: [
      "命令行操作与快捷键",
      "记忆系统与 CLAUDE.md",
      "Plan Mode 规划模式",
      "会话管理与优化"
    ]
  },
  {
    id: 3,
    title: "团队协作体系",
    description: "建立团队级别的 AI Coding 规范，实现知识共享和协作效率提升。",
    icon: <Users className="w-6 h-6" />,
    items: [
      "共享配置管理策略",
      "团队规范制定",
      "代码审查流程",
      "新成员上手指南"
    ]
  },
  {
    id: 4,
    title: "流程设计与优化",
    description: "设计高效的开发工作流，让 AI 融入团队的日常开发流程。",
    icon: <Cpu className="w-6 h-6" />,
    items: [
      "Agent/Subagent 系统",
      "代码审查工作流",
      "Bug 修复工作流",
      "特性开发工作流"
    ]
  },
  {
    id: 5,
    title: "自动化与高级特性",
    description: "探索 MCP、Subagent、Hooks 等进阶机制，实现开发自动化。",
    icon: <Network className="w-6 h-6" />,
    items: [
      "MCP 服务器集成",
      "自定义 Subagent 开发",
      "Hooks 自动化触发",
      "Git Worktrees 并行开发"
    ]
  },
  {
    id: 6,
    title: "实战避坑指南",
    description: "来自真实项目的经验总结，帮助团队快速避开常见陷阱。",
    icon: <Rocket className="w-6 h-6" />,
    items: [
      "常见问题诊断",
      "性能优化技巧",
      "成本控制策略",
      "最佳实践清单"
    ]
  }
]

const phases: Phase[] = [
  {
    id: 1,
    title: "理论培训",
    subtitle: "第一阶段",
    description: "建立正确的 AI Coding 思维模式，掌握核心概念和工具基础。",
    icon: <GraduationCap className="w-8 h-8" />,
    items: [
      "AI Coding 思维模式转变",
      "Claude Code 核心概念和原理",
      "团队协作规范制定",
      "200+ 页系统培训教材"
    ]
  },
  {
    id: 2,
    title: "实战培训",
    subtitle: "第二阶段",
    description: "在真实项目中实操演练，将理论知识转化为实际技能。",
    icon: <Wrench className="w-8 h-8" />,
    items: [
      "真实项目实操演练",
      "工作流程设计和优化",
      "团队配置和规范落地",
      "现场问题解决指导"
    ]
  },
  {
    id: 3,
    title: "陪跑答疑",
    subtitle: "第三阶段",
    description: "持续的项目指导和顾问服务，确保转型成功落地。",
    icon: <MessageCircle className="w-8 h-8" />,
    items: [
      "实际项目指导和顾问",
      "问题诊断和解决方案",
      "持续优化和效果追踪",
      "长期技术支持"
    ]
  }
]

const faqs: FAQItem[] = [
  {
    question: "我们团队没有 AI 编程经验，能学会吗？",
    answer: "完全可以。本培训专为传统开发团队设计，从基础理论到实战应用循序渐进。我们已成功帮助多个团队完成转型，关键在于正确的方法论和持续的实践指导。"
  },
  {
    question: "培训后多久能看到效果？",
    answer: "根据我们的经验，团队在完成理论培训后即可开始应用，1-2周内能明显感受到效率提升。完整的三阶段培训后，团队通常能达到 5-10 倍的效率提升。"
  },
  {
    question: "陪跑阶段具体包含哪些服务？",
    answer: "陪跑阶段包括：定期的项目评审和指导、遇到问题时的即时支持、工作流程的持续优化建议、新特性和最佳实践的更新分享，以及团队成员的一对一答疑。"
  },
  {
    question: "培训适合多大规模的团队？",
    answer: "我们的培训方案可以适配 5-100 人的团队规模。目前正在服务的团队有 50 人，我们会根据团队规模定制具体的培训计划和协作规范。"
  }
]

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="min-h-screen landing-page selection:bg-amber-500 selection:text-black">
      {/* Header / Nav */}
      <nav className="fixed top-0 w-full z-50 glass-card px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-black">C</div>
          <span className="font-bold text-xl tracking-tight">Claude Code<span className="text-amber-500">培训</span></span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
          <a href="#curriculum" className="hover:text-amber-500 transition-colors">培训内容</a>
          <a href="#phases" className="hover:text-amber-500 transition-colors">培训阶段</a>
          <a href="#faq" className="hover:text-amber-500 transition-colors">常见问题</a>
        </div>
        <Link
          href="/docs"
          className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-zinc-200 transition-all transform hover:scale-105 active:scale-95"
        >
          查看教程
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-widest">
          团队转型实战经验 · 效率提升 10 倍
        </div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight">
          带领团队成功转型 <span className="gradient-text">AI Coding</span><br />
          <span className="text-3xl md:text-5xl text-zinc-400">从 80 人日降到 8 人日的实战方法论</span>
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
          半年时间，我成功将团队从传统开发转型为 <span className="text-white border-b border-amber-500">Vibe Coding</span> 模式。
          现在，我将这套经过验证的方法论，通过<span className="text-white border-b border-amber-500">理论培训</span>、<span className="text-white border-b border-amber-500">实战指导</span>、<span className="text-white border-b border-amber-500">持续陪跑</span>三阶段服务，帮助你的团队完成转型。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/docs"
            className="bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-zinc-200 transition-all inline-block"
          >
            查看培训教程
          </Link>
          <a
            href="#phases"
            className="glass-card px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/5 transition-all inline-block"
          >
            了解培训服务
          </a>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl text-center">
            <div className="text-4xl font-black gradient-text mb-2">10x</div>
            <div className="text-zinc-400 text-sm">效率提升</div>
            <div className="text-zinc-600 text-xs mt-1">80人日 → 8人日</div>
          </div>
          <div className="glass-card p-6 rounded-2xl text-center">
            <div className="text-4xl font-black gradient-text mb-2">50+</div>
            <div className="text-zinc-400 text-sm">团队规模</div>
            <div className="text-zinc-600 text-xs mt-1">成功转型案例</div>
          </div>
          <div className="glass-card p-6 rounded-2xl text-center">
            <div className="text-4xl font-black gradient-text mb-2">6月</div>
            <div className="text-zinc-400 text-sm">实战验证</div>
            <div className="text-zinc-600 text-xs mt-1">方法论打磨</div>
          </div>
        </div>
      </section>

      {/* Curriculum Outline */}
      <section id="curriculum" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">培训内容</h2>
            <p className="text-zinc-500">系统化的 AI Coding 转型培训体系，覆盖从理论到实战的完整链路。</p>
          </div>
          <div className="hidden md:block h-px flex-1 mx-10 bg-zinc-800"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <div key={module.id} className="glass-card p-6 rounded-2xl hover:border-amber-500/50 transition-all group">
              <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center mb-4 text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                {module.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{module.title}</h3>
              <p className="text-zinc-400 mb-4 text-sm leading-relaxed">{module.description}</p>
              <ul className="space-y-2">
                {module.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-zinc-300">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Training Phases */}
      <section id="phases" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-widest">
            三阶段培训服务
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">从理论到落地的完整服务</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto">不只是培训，更是全程陪伴的转型服务，确保你的团队真正掌握 AI Coding。</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {phases.map((phase, idx) => (
            <div key={phase.id} className="relative">
              {idx < phases.length - 1 && (
                <div className="hidden md:block absolute top-16 -right-4 w-8 h-0.5 bg-amber-500/30"></div>
              )}
              <div className="glass-card p-8 rounded-3xl border-t-4 border-amber-500 h-full">
                <div className="text-amber-500 text-sm font-bold mb-2">{phase.subtitle}</div>
                <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 text-amber-500">
                  {phase.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{phase.title}</h3>
                <p className="text-zinc-400 mb-6 leading-relaxed">{phase.description}</p>
                <ul className="space-y-3">
                  {phase.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-3 text-sm text-zinc-300">
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-6 max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-white">常见问题</h2>
        <div className="space-y-6">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="glass-card p-6 rounded-2xl border-l-4 border-amber-500 cursor-pointer"
              onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
            >
              <h3 className="text-lg font-bold mb-3 flex items-center justify-between">
                {faq.question}
                <span className={`text-amber-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </h3>
              <div className={`text-zinc-400 leading-relaxed overflow-hidden transition-all ${openFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="py-20 px-6 text-center border-t border-zinc-900">
        <h2 className="text-3xl md:text-4xl font-black mb-4">"让你的团队，也能体验 10 倍效率提升"</h2>
        <p className="text-zinc-500 mb-10 max-w-lg mx-auto">从传统开发到 AI Coding，我们提供完整的转型支持。</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/docs"
            className="bg-white text-black px-12 py-5 rounded-2xl font-bold text-xl hover:bg-zinc-200 transition-all inline-block"
          >
            查看培训教程
          </Link>
        </div>
        <div className="mt-24 text-xs text-zinc-700 uppercase tracking-[0.2em]">
          <p>© 2025 CLAUDE CODE 团队转型培训</p>
        </div>
      </footer>
    </div>
  )
}
