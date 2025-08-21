import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://eaojmlsmihpqgucajvcy.supabase.co/storage/v1/object/public/cabin-images/**",
      ),
      // Google profile images
      new URL("https://lh3.googleusercontent.com/**"),
    ],
  },
};

export default nextConfig;
