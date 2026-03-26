/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString()
  }
}

module.exports = nextConfig
