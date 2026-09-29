import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    'puppeteer',
    'puppeteer-core',
    '@sparticuz/chromium',
    'pdf-parse',
    'pdfjs-dist',
    'jobspy-node',
    'node-tls-client',
    'koffi',
  ],

  // Force Webpack to treat native modules as externals during build
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [
        ...(Array.isArray(config.externals) ? config.externals : [config.externals].filter(Boolean)),
        'koffi',
        'node-tls-client',
        'jobspy-node',
      ];
    }
    return config;
  },
};

export default nextConfig;