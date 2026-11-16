import type { NextConfig } from "next";

// GitHub Pages serves project sites from https://<user>.github.io/<repo>/,
// so assets need a basePath there. The deploy workflow sets PAGES_BASE_PATH
// (empty when a custom domain is configured). Locally it stays empty.
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Static export: `next build` writes plain HTML/CSS/JS to ./out
  output: "export",
  basePath,
  // next/image optimization needs a server; serve images as-is instead
  images: { unoptimized: true },
  // Emit /path/index.html so GitHub Pages resolves routes without extensions
  trailingSlash: true,
};

export default nextConfig;
