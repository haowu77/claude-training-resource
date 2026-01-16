'use client'

import Link from 'next/link'
import { ArrowLeft, User, Users, Code, TestTube, CheckCircle2, Key, ExternalLink, Terminal } from 'lucide-react'
import { useState } from 'react'

const roles = [
  { name: '项目经理', icon: Users, description: '负责项目整体规划与协调' },
  { name: '产品经理', icon: User, description: '负责需求分析与产品设计' },
  { name: '开发工程师', icon: Code, description: '负责功能开发与代码实现' },
  { name: '测试人员', icon: TestTube, description: '负责质量保障与测试验证' }
]

const checklistItems = [
  { id: 'account', label: '已注册 Anthropic 账号' },
  { id: 'login', label: '可正常登录 claude.ai' },
  { id: 'browser', label: '使用 Chrome 或 Edge 浏览器' },
  { id: 'cli', label: '已安装配置 Claude Code CLI' }
]

export default function PrepPage() {
  const [checkedItems, setCheckedItems] = useState<string[]>([])

  const toggleCheck = (id: string) => {
    setCheckedItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const allChecked = checkedItems.length === checklistItems.length

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
          <span className="font-bold text-xl tracking-tight">课前<span className="text-amber-500">准备</span></span>
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
          培训前必读
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          <span className="gradient-text">课前准备</span> 清单
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto mb-8">
          请在培训开始前完成以下准备工作，确保培训顺利进行
        </p>
      </section>

      {/* Applicable Roles */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-center">适用角色</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {roles.map((role) => (
            <div key={role.name} className="glass-card p-6 rounded-2xl text-center">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <role.icon className="w-6 h-6 text-amber-500" />
              </div>
              <h3 className="font-bold mb-1">{role.name}</h3>
              <p className="text-zinc-500 text-xs">{role.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Claude Account Preparation */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center">
            <Key className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Claude 账号准备</h2>
            <p className="text-zinc-400">注册并验证你的 Anthropic 账号</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Key className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-lg">注册账号</h3>
            </div>
            <ol className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-zinc-800 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                <div>
                  <span className="text-zinc-300">访问</span>
                  <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-amber-500 hover:underline ml-1">
                    claude.ai
                    <ExternalLink className="w-3 h-3 inline ml-1" />
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-zinc-800 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                <span className="text-zinc-300">使用邮箱或 Google 账号注册</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-zinc-800 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                <span className="text-zinc-300">完成邮箱验证</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-zinc-800 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                <span className="text-zinc-300">登录并测试对话功能</span>
              </li>
            </ol>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <User className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-lg">账号类型说明</h3>
            </div>
            <div className="space-y-4 text-sm">
              <div className="p-4 bg-zinc-900/50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold">免费版</span>
                  <span className="text-green-500 text-xs">可用于培训</span>
                </div>
                <p className="text-zinc-400">基础对话功能，有使用频率限制</p>
              </div>
              <div className="p-4 bg-zinc-900/50 rounded-xl border border-amber-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-amber-500">Pro 版（推荐）</span>
                  <span className="text-amber-500 text-xs">$20/月</span>
                </div>
                <p className="text-zinc-400">更高使用限额，优先访问新功能</p>
              </div>
              <div className="p-4 bg-zinc-900/50 rounded-xl border border-blue-500/30">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-blue-400">Max 版（多人共享）</span>
                  <span className="text-blue-400 text-xs">$100/月起</span>
                </div>
                <p className="text-zinc-400">团队共享账号，适合企业培训使用</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Claude Code CLI Preparation */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-amber-500/20 rounded-2xl flex items-center justify-center">
            <Terminal className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Claude Code CLI 准备</h2>
            <p className="text-zinc-400">安装并配置命令行工具</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-lg">安装步骤</h3>
            </div>
            <ol className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-zinc-800 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                <span className="text-zinc-300">确保已安装 Node.js 18+</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-zinc-800 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                <div className="text-zinc-300">
                  运行安装命令：
                  <code className="block mt-2 px-3 py-2 bg-zinc-800 rounded-lg text-amber-500 text-xs">npm install -g @anthropic-ai/claude-code</code>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-zinc-800 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                <span className="text-zinc-300">运行 claude 启动认证流程</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 bg-zinc-800 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
                <span className="text-zinc-300">在浏览器中完成 OAuth 授权</span>
              </li>
            </ol>
          </div>

          <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <Code className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-lg">验证安装</h3>
            </div>
            <div className="space-y-4 text-sm">
              <p className="text-zinc-400">安装完成后，在终端运行以下命令验证：</p>
              <code className="block px-3 py-2 bg-zinc-800 rounded-lg text-amber-500 text-xs">claude --version</code>
              <p className="text-zinc-400">如果显示版本号，说明安装成功。</p>
              <div className="mt-4 p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl">
                <p className="text-amber-500 text-xs">
                  详细安装指南请参考
                  <Link href="/docs" className="underline ml-1">培训教程</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="glass-card p-8 rounded-2xl max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">准备检查清单</h2>
          <div className="space-y-4">
            {checklistItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all ${
                  checkedItems.includes(item.id)
                    ? 'bg-green-500/10 border border-green-500/30'
                    : 'bg-zinc-900/50 hover:bg-zinc-800/50'
                }`}
                onClick={() => toggleCheck(item.id)}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  checkedItems.includes(item.id)
                    ? 'bg-green-500 border-green-500'
                    : 'border-zinc-600'
                }`}>
                  {checkedItems.includes(item.id) && (
                    <CheckCircle2 className="w-4 h-4 text-black" />
                  )}
                </div>
                <span className={checkedItems.includes(item.id) ? 'text-green-400' : 'text-zinc-300'}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {allChecked && (
            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl text-center">
              <p className="text-green-400 font-bold">准备完成！可以开始培训了</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="py-16 px-6 text-center border-t border-zinc-900">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">准备就绪？</h2>
        <p className="text-zinc-500 mb-8 max-w-lg mx-auto">查看培训安排，了解完整时间轴</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/schedule"
            className="bg-white text-black px-10 py-4 rounded-xl font-bold text-lg hover:bg-zinc-200 transition-all inline-block"
          >
            查看培训安排
          </Link>
          <Link
            href="/docs"
            className="glass-card px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/5 transition-all inline-block"
          >
            查看培训教程
          </Link>
        </div>
        <div className="mt-16 text-xs text-zinc-700 uppercase tracking-[0.2em]">
          <p>© 2025 CLAUDE CODE 团队转型培训</p>
        </div>
      </footer>
    </div>
  )
}
