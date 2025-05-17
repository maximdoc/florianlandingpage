/** @type {import('next').NextConfig} */
const nextConfig = {
  /* Combined experimental settings */
  experimental: {
    // Using "loose" for MongoDB bson parser
    esmExternals: "loose",
    // Enable optimizations from TS config
    optimizeCss: true,
    // Fix warning by enabling layers
    layers: true,
    // Server actions with increased limit
    serverActions: {
      bodySizeLimit: '5mb'
    }
  },
  
  // Fix for 'serverComponentsExternalPackages' warning
  serverExternalPackages: ["mongoose"],
  
  /* Image optimization settings from TS config */
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
  
  /* Webpack configuration for MongoDB */
  webpack: (config) => {
    config.experiments = {
      topLevelAwait: true,
      layers: true
    };
    return config;
  },
  
  /* Other settings from TS config */
  compress: true,
  swcMinify: true,
  reactStrictMode: true
};

module.exports = nextConfig; 