/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: [
      `${process.env.S3_BUCKET_NAME}.s3-${process.env.AWS_REGION}.amazonaws.com`,
    ],
  },
  experimental: {
    legacyBrowsers: false,
  },
};

module.exports = nextConfig;
