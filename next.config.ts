import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      // Hide in-development and placeholder routes from direct visits by redirecting to homepage
      { source: "/discover", destination: "/", permanent: false },
      { source: "/celebrate", destination: "/", permanent: false },
      { source: "/costumes", destination: "/", permanent: false },
      { source: "/games", destination: "/", permanent: false },
      { source: "/games/:path*", destination: "/", permanent: false },
      { source: "/events", destination: "/", permanent: false },
      { source: "/about", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
