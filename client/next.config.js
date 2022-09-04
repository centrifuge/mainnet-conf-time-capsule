/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: config => {
    // eslint-disable-next-line no-param-reassign
    config.resolve.fallback = {
      fs: false,
      child_process: false,
      net: false,
      tls: false,
      request: false,
    };

    return config;
  },
};

module.exports = nextConfig;
