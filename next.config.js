/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ['landrevj-photos-dev.s3-us-west-2.amazonaws.com'],
  },
  experimental: {
    legacyBrowsers: false,
    // browsersListForSwc: true
  },
};

module.exports = nextConfig;
