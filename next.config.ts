import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/personal-site',
  trailingSlash: true,
};

export default nextConfig;
