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
  webpack: (config) => {
    // @see https://github.com/konvajs/konva/issues/1458#issuecomment-1356122802
    // eslint-disable-next-line no-param-reassign
    config.externals = [...config.externals, { canvas: 'canvas' }];
    return config;
  },
};

module.exports = nextConfig;
