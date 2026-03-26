import type { NextConfig } from "next";

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Type error thakleo build hobe
  },
  eslint: {
    ignoreDuringBuilds: true, // Linting error thakleo build hobe
  },
};export default nextConfig;
