import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve WebP where supported. (AVIF was dropped: Vercel's on-demand AVIF
    // encode could time out for some images at certain sizes, showing a broken
    // image — most visibly the promo photo on mobile. WebP is near-identical
    // quality and far more reliable.)
    formats: ["image/webp"],
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
