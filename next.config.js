/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: [
      process.env.NEXT_PUBLIC_CLOUDFRONT_BASE_URL.split('https://').pop(),
    ],
  },
  experimental: {
    legacyBrowsers: false,
  },
};

module.exports = nextConfig;
