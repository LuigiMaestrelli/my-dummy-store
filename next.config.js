/** @type {import('next').NextConfig} */
const withImages = require('next-images')

const nextConfig = {
  esModule: true,
  reactStrictMode: true
};

module.exports = withImages(nextConfig);
