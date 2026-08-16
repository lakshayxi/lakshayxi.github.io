import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const assetPrefix = isGitHubPages
  ? process.env.NEXT_PUBLIC_BASE_PATH || undefined
  : undefined;

const nextConfig: NextConfig = {
  output: isGitHubPages ? "export" : undefined,
  assetPrefix,
  trailingSlash: false,
  images: {
    unoptimized: isGitHubPages,
  },
};

export default nextConfig;
