import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 75 for content imagery, 90 reserved for full-bleed heroes
    qualities: [75, 90],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
  },
  async redirects() {
    return [
      { source: "/facilities/features", destination: "/the-villa/at-a-glance", permanent: true },
      { source: "/facilities/equipment", destination: "/the-villa/amenities", permanent: true },
      { source: "/facilities/villa-layout", destination: "/the-villa/layout", permanent: true },
      { source: "/facilities/services", destination: "/the-villa/services", permanent: true },
    ];
  },
};

export default nextConfig;
