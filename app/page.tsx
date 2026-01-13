'use client'

import Link from 'next/link'
import { Terminal, Cpu, Network, Rocket } from 'lucide-react'
import { ReactNode, useState } from 'react'

interface Module {
  id: number
  title: string
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
    title: "CLI 基础与进阶",
    description: "掌握 Claude Code 命令行工具的核心用法，从常规操作到复杂组合技。",
    icon: <Terminal className="w-6 h-6" />,
    items: [
      "指令集熟练掌握",
      "上下文管理艺术",
      "交互式 Diff 审查",
      "终端环境优化"
    ]
  },
  {
    id: 2,
    title: "自动化与 Agentic Loop",
    description: "探索 MCP、Subagent、Hooks 等进阶机制，让 AI 自主思考并完成任务。",
    icon: <Network className="w-6 h-6" />,
    items: [
      "Agentic Loop 深度应用",
      "MCP 协议实战",
      "工具链选型指南",
      "闭环反馈流"
    ]
  },
  {
    id: 3,
    title: "开发范式重构",
    description: "从「写代码的人」转变为「指挥 AI 架构的人」，重新定义开发流程。",
    icon: <Cpu className="w-6 h-6" />,
    items: [
      "Agentic Workflow 构建",
      "大规模重构实战",
      "避坑指南",
      "高成功率任务指令"
    ]
  },
  {
    id: 4,
    title: "实战技巧",
    description: "真实项目中的最佳实践，解决业务中的实际问题。",
    icon: <Rocket className="w-6 h-6" />,
    items: [
      "真实项目结对",
      "复杂 Bug 联合会诊",
      "工程化提效方案",
      "AI 工具情报分享"
    ]
  }
]

const faqs: FAQItem[] = [
  {
    question: "这个教程适合什么水平的开发者？",
    answer: "本教程适合有一定编程基础的开发者。无论你是刚接触 AI 编程工具，还是想深入掌握 Claude Code 的高级特性，都能从中获益。"
  },
  {
    question: "教程包含哪些实战内容？",
    answer: "教程涵盖 200+ 页内容，从 CLI 基础操作到 MCP 服务器、Subagent、Plugin 等高级特性，包含大量真实项目案例和避坑指南。"
  },
  {
    question: "如何获得最佳学习效果？",
    answer: "建议边学边练，在自己的项目中尝试教程中的技巧。Claude Code 的强大之处在于实践，只有动手才能真正掌握。"
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
          <a href="#curriculum" className="hover:text-amber-500 transition-colors">教程内容</a>
          <a href="#faq" className="hover:text-amber-500 transition-colors">常见问题</a>
        </div>
        <Link
          href="/docs"
          className="bg-white text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-zinc-200 transition-all transform hover:scale-105 active:scale-95"
        >
          开始学习
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-widest">
          200+ 页教程 · 实战验证
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
          从资深开发者视角的<br />
          <span className="gradient-text">Claude Code </span>实战内参
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl max-w-3xl mx-auto mb-10 leading-relaxed">
          不谈虚构的案例，只谈真实的工作流。从命令行熟练度到 <span className="text-white border-b border-amber-500">MCP 服务器</span>、<span className="text-white border-b border-amber-500">Subagent</span>、<span className="text-white border-b border-amber-500">Plugin</span> 等高级特性，分享如何在真实业务中让生产力产生质变。
        </p>
        <Link
          href="/docs"
          className="bg-white text-black px-8 py-4 rounded-xl font-bold text-lg hover:bg-zinc-200 transition-all inline-block"
        >
          开始学习教程
        </Link>
      </section>

      {/* Curriculum Outline */}
      <section id="curriculum" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">教程内容</h2>
            <p className="text-zinc-500">系统掌握 Claude Code，提升开发效率。</p>
          </div>
          <div className="hidden md:block h-px flex-1 mx-10 bg-zinc-800"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {modules.map((module) => (
            <div key={module.id} className="glass-card p-8 rounded-3xl hover:border-amber-500/50 transition-all group">
              <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 text-amber-500 group-hover:bg-amber-500 group-hover:text-black transition-colors">
                {module.icon}
              </div>
              <h3 className="text-2xl font-bold mb-3">{module.title}</h3>
              <p className="text-zinc-400 mb-6 leading-relaxed">{module.description}</p>
              <ul className="space-y-3">
                {module.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-amber-500 flex-shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
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
        <h2 className="text-4xl font-black mb-4 italic">"AI 不会写出完美的架构，但它能帮你更快地抵达。"</h2>
        <p className="text-zinc-500 mb-10 max-w-lg mx-auto">立即开始学习，掌握 AI 编程的核心技能。</p>
        <Link
          href="/docs"
          className="bg-white text-black px-12 py-5 rounded-2xl font-bold text-xl hover:bg-zinc-200 transition-all inline-block"
        >
          开始学习教程
        </Link>
        <div className="mt-24 text-xs text-zinc-700 uppercase tracking-[0.2em]">
          <p>© 2025 CLAUDE CODE 培训教程</p>
        </div>
      </footer>
    </div>
  )
}
