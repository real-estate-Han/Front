/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["real-estate-han.s3.ap-northeast-2.amazonaws.com"],
    formats: ["image/webp"],
    loader: "default",
  },
};

module.exports = nextConfig;
