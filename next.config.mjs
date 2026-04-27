/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // REQUIRED for static export
  output: 'export',
  trailingSlash: true,

  // Fix Next/Image for static hosting
  images: {
    unoptimized: true,
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.(mp4|webm)$/i,
      type: 'asset/resource',
    });

    return config;
  },
};

export default nextConfig;