/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["127.0.0.1", "via.placeholder.com"],
    // remotePatterns: [
    //   {
    //     protocol: "http",
    //     hostname: "**",
    //   },
    // ],
  },
};

module.exports = nextConfig;
