/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  images: {
    domains: ['github.com']
  },
  reactStrictMode: true,
  swcMinify: true
}

module.exports = nextConfig