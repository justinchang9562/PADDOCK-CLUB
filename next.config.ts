import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
  images: {
    // Serve the optimized local assets directly so the first deployment does
    // not require a separate Cloudflare Images subscription or binding.
    unoptimized: true,
  },
};

export default nextConfig;

initOpenNextCloudflareForDev();
