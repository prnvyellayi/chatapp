/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      CHAT_SERVER: process.env.CHAT_SERVER,
    }}

module.exports = nextConfig
