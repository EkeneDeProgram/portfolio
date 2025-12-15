
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: ["localhost"], // Allow images from Strapi running on localhost
//   },
// };

// export default nextConfig;



import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337", // Strapi default port
        pathname: "/uploads/**", // allow all images in uploads folder
      },
    ],
  },
};

export default nextConfig;
