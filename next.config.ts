import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Local Strapi (CMS uploads)
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },

      // News / Media CDNs (wildcards)

      // Bloomberg
      {
        protocol: "https",
        hostname: "**.bwbx.io",
        pathname: "/**",
      },

      // AFR / ffx
      {
        protocol: "https",
        hostname: "**.ffx.io",
        pathname: "/**",
      },

      // Reuters
      {
        protocol: "https",
        hostname: "**.reuters.com",
        pathname: "/**",
      },

      // Financial Times
      {
        protocol: "https",
        hostname: "**.ft.com",
        pathname: "/**",
      },

      // Vox Media / The Verge
      {
        protocol: "https",
        hostname: "**.theverge.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.vox-cdn.com",
        pathname: "/**",
      },

      // Wired
      {
        protocol: "https",
        hostname: "**.wired.com",
        pathname: "/**",
      },

      // Crypto news
      {
        protocol: "https",
        hostname: "**.coindesk.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.cointelegraph.com",
        pathname: "/**",
      },

      // Amazon S3 (generic media storage)
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
        pathname: "/**",
      },

      // Other common news CDNs
      {
        protocol: "https",
        hostname: "**.guim.co.uk",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.cnn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.nytimes.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
