import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Add this for Puppeteer support
  serverExternalPackages: ['puppeteer', 'puppeteer-core', '@sparticuz/chromium'],
  
  // For local development, you might also need:
  experimental: {
    serverComponentsExternalPackages: ['puppeteer', 'puppeteer-core', '@sparticuz/chromium'],
  },
};

export default nextConfig;