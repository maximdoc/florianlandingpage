import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Image optimization settings */
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  /* Compression settings */
  compress: true,
  
  /* Optimization settings */
  swcMinify: true,
  
  /* Performance settings */
  reactStrictMode: true,
  experimental: {
    optimizeCss: true,
    optimizeServerReact: true
  }
};

export default nextConfig;
