import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // O cache em disco do Turbopack estava causando "FATAL: An unexpected
    // Turbopack error occurred" no Windows. Desligado por segurança.
    turbopackFileSystemCacheForDev: false,
  },
};

export default nextConfig;
