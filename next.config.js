/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["127.0.0.1", "via.placeholder.com", "images.unsplash.com"],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // remotePatterns: [
    //   {
    //     protocol: "http",
    //     hostname: "**",
    //   },
    // ],
  },
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Optimize production builds
  swcMinify: true,
  // Compress static files
  compress: true,
  // Enable optimized font loading
  optimizeFonts: true,
};

module.exports = nextConfig;
