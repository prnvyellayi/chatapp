/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      NEXT_PUBLIC_CHAT_SERVER: process.env.NEXT_PUBLIC_CHAT_SERVER,
    }}

module.exports = nextConfig
