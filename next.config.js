/** @type {import('next').NextConfig} */
const withImages = require('next-images');

const nextConfig = {
  esModule: true,
  reactStrictMode: true,
  images: {
    domains: [
      'fakestoreapi.com',
      'unsplash.com',
      'i.pravatar.cc',
      'images.unsplash.com'
    ]
  }
};

module.exports = withImages(nextConfig);
