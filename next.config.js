/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  // images: {
  //   domains: ['real-estate-han.s3.ap-northeast-2.amazonaws.com'],

  //   loader: 'default',
  // },
};

module.exports = nextConfig;
