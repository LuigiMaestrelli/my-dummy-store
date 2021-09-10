/** @type {import('next').NextConfig} */
const withImages = require('next-images');

const nextConfig = {
  esModule: true,
  reactStrictMode: true,
  images: {
    domains: ['fakestoreapi.com', 'robohash.org', 'i.pravatar.cc']
  }
};

module.exports = withImages(nextConfig);
