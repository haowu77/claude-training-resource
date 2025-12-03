/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // 静态导出，用于 Vercel 部署
  images: {
    unoptimized: true, // 静态导出时需要
  },
}

module.exports = nextConfig
