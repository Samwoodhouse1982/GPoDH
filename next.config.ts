import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats where the browser supports them.
    formats: ["image/avif", "image/webp"],
    // Hosts allowed for next/image optimisation (YouTube thumbnails + org logos).
    remotePatterns: [
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "images.squarespace-cdn.com" },
      { protocol: "https", hostname: "cdn.prod.website-files.com" },
      { protocol: "https", hostname: "*.pressidiumcdn.com" },
      { protocol: "https", hostname: "www.finddx.org" },
      { protocol: "https", hostname: "www.icrc.org" },
      { protocol: "https", hostname: "www.techchange.org" },
      { protocol: "https", hostname: "gdhub.org" },
    ],
  },
};

export default nextConfig;
