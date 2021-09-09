/** @type {import('next').NextConfig} */
const withImages = require('next-images');

const nextConfig = {
  esModule: true,
  reactStrictMode: true,
  images: {
    domains: ['fakestoreapi.com']
  }
};

module.exports = withImages(nextConfig);
