import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',  
        headers: [
          
          {
            key: 'X-Frame-Options',
            value: 'DENY'  
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff' 
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'  
          }
        ],
      },
      {
        source: '/api/:path*', 
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: 'https://cbt-bot.vercel.app/'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization'
          }
        ],
      }
    ]
  }
};



export default nextConfig;
