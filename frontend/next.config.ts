import path from 'node:path';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const apiDomain = new URL(apiURL);

const nextConfig: NextConfig = {
  turbopack: {
    // eslint-disable-next-line unicorn/prefer-module
    root: path.resolve(__dirname, '..'),
  },
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: apiDomain.protocol.replace(':', '') as 'http' | 'https',
        hostname: apiDomain.hostname,
        port: apiDomain.port,
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
