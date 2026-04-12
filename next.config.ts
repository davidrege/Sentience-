import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Sentience-",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
