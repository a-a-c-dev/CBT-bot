import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',  // Apply to all routes
        headers: [
          // Security headers
          {
            key: 'X-Frame-Options',
            value: 'DENY'  // Prevents clickjacking
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'  // Prevents MIME sniffing
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'  // Restrict browser APIs
          }
        ],
      },
      {
        source: '/api/:path*',  // API routes only
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'  // Only if you need CORS
          }
        ],
      }
    ]
  }
};



export default nextConfig;
