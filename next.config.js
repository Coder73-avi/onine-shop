/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["localhost", "online-shop-api001.herokuapp.com"],
  },
};

module.exports = nextConfig;
