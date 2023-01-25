/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "localhost",
      "online-shop-api001.herokuapp.com",
      "api.raeelaproduction.com",
    ],
  },
  env: {
    // URL: "http://localhost:4001",
    URL: "https://api.raeelaproduction.com",
    GOOGLE_CLIENT_ID:
      "434554521621-6smtnnqahblegv3oq2pd83ertbl92ktc.apps.googleusercontent.com",
  },
  FACEBOOK_APP_ID: "851941756069770",
};

module.exports = nextConfig;
