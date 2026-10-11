import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export: `next build` emits a self-contained `out/` folder
  // (HTML/CSS/JS only) instead of a Node server. The resume PDF is rendered
  // in the browser (see components/resume/renderResumePdf.tsx).
  output: "export",

  // Stub the optional native `canvas` dependency of @react-pdf/renderer —
  // we don't need it for text/SVG PDFs.
  turbopack: {
    resolveAlias: {
      canvas: "./lib/canvas-stub.js",
    },
  },

  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
