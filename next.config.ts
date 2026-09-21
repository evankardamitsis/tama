import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 for content imagery, 90 reserved for full-bleed heroes
    qualities: [75, 90],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
  },
  /* config options here */
};

export default nextConfig;
