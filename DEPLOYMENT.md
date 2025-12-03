# 部署指南

## 部署到 Vercel（推荐）

### 方法 1：通过 GitHub（推荐）

1. **创建 GitHub 仓库**
   ```bash
   cd claude-code-docs
   git init
   git add .
   git commit -m "Initial commit: Claude Code 培训教程网站"
   git branch -M main
   git remote add origin https://github.com/你的用户名/claude-code-docs.git
   git push -u origin main
   ```

2. **连接 Vercel**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 "New Project"
   - 选择你的 GitHub 仓库
   - Vercel 会自动检测 Next.js 项目配置

3. **部署设置**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
   - 无需设置环境变量

4. **点击 Deploy**
   - 等待构建完成（约 2-3 分钟）
   - 部署成功后会获得一个 URL，例如：`https://claude-code-docs.vercel.app`

5. **自动部署**
   - 每次推送到 main 分支都会自动触发部署
   - PR 会自动创建预览部署

### 方法 2：通过 Vercel CLI

1. **安装 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录 Vercel**
   ```bash
   vercel login
   ```

3. **部署**
   ```bash
   cd claude-code-docs
   vercel
   ```

4. **部署到生产环境**
   ```bash
   vercel --prod
   ```

## 部署到其他平台

### Netlify

1. **创建 `netlify.toml`**
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

2. **通过 GitHub 部署**
   - 在 Netlify 上连接你的 GitHub 仓库
   - 选择 Next.js 预设
   - 点击 Deploy

### 自托管

1. **构建项目**
   ```bash
   npm run build
   ```

2. **启动生产服务器**
   ```bash
   npm start
   ```

3. **使用 PM2 管理进程**
   ```bash
   npm install -g pm2
   pm2 start npm --name "claude-code-docs" -- start
   pm2 save
   pm2 startup
   ```

4. **使用 Nginx 反向代理**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Docker 部署

1. **创建 `Dockerfile`**
   ```dockerfile
   FROM node:18-alpine AS base

   # 安装依赖
   FROM base AS deps
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci

   # 构建应用
   FROM base AS builder
   WORKDIR /app
   COPY --from=deps /app/node_modules ./node_modules
   COPY . .
   RUN npm run build

   # 生产镜像
   FROM base AS runner
   WORKDIR /app
   ENV NODE_ENV production

   RUN addgroup --system --gid 1001 nodejs
   RUN adduser --system --uid 1001 nextjs

   COPY --from=builder /app/public ./public
   COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
   COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

   USER nextjs
   EXPOSE 3000
   ENV PORT 3000

   CMD ["node", "server.js"]
   ```

2. **构建并运行**
   ```bash
   docker build -t claude-code-docs .
   docker run -p 3000:3000 claude-code-docs
   ```

## 性能优化建议

### 1. 启用 CDN
- Vercel 自动提供全球 CDN
- 自托管可以使用 Cloudflare CDN

### 2. 图片优化
- 使用 Next.js Image 组件
- 启用 WebP 格式

### 3. 代码压缩
- Next.js 自动启用生产环境优化
- Gzip/Brotli 压缩

### 4. 缓存策略
```javascript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}
```

## 自定义域名

### Vercel
1. 进入项目设置
2. 选择 "Domains"
3. 添加你的域名
4. 在域名提供商处添加 DNS 记录：
   - 类型：CNAME
   - 名称：www（或 @）
   - 值：cname.vercel-dns.com

### 配置 HTTPS
- Vercel 自动提供免费 SSL 证书
- 自托管可以使用 Let's Encrypt

## 环境变量（可选）

如果需要添加环境变量：

1. 在 Vercel 项目设置中添加环境变量
2. 创建 `.env.local` 文件（本地开发）：
   ```
   # 示例环境变量
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```

## 监控和分析

### Vercel Analytics
```javascript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### 错误追踪
- 集成 Sentry
- 使用 Vercel Error Tracking

## 故障排查

### 构建失败
1. 检查 Node.js 版本（推荐 18+）
2. 清理缓存：`rm -rf .next node_modules && npm install`
3. 查看构建日志

### 页面加载慢
1. 检查 Markdown 文件大小
2. 启用静态生成
3. 优化图片和资源

### 搜索不工作
1. 确保 FlexSearch 已正确初始化
2. 检查浏览器控制台错误
3. 验证 Markdown 文件路径

## 更新部署

### 通过 GitHub
```bash
git add .
git commit -m "Update: 添加新内容"
git push
```
Vercel 会自动重新部署。

### 通过 Vercel CLI
```bash
vercel --prod
```

## 回滚部署

### Vercel
1. 进入项目部署历史
2. 选择之前的部署
3. 点击 "Promote to Production"

## 备份

### 备份数据
```bash
# 备份 Markdown 文件
cp -r public/markdown ~/backups/

# 备份整个项目
tar -czf claude-code-docs-backup.tar.gz claude-code-docs/
```

### 恢复数据
```bash
# 恢复 Markdown 文件
cp -r ~/backups/markdown/* public/markdown/

# 恢复整个项目
tar -xzf claude-code-docs-backup.tar.gz
```

## 联系支持

- Vercel 支持：https://vercel.com/support
- Next.js 文档：https://nextjs.org/docs
- 项目 Issues：https://github.com/你的用户名/claude-code-docs/issues
