/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: "export",
  images: {
    unoptimized: true, // Fix for static exports
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
