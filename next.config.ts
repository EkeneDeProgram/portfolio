// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "http",
//         hostname: "localhost",
//         port: "1337", // Strapi default port
//         pathname: "/uploads/**", // allow all images in uploads folder
//       },
//     ],
//   },
// };

// export default nextConfig;




import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Strapi images
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },

      // News images (Next Big Future)
      {
        protocol: "https",
        hostname: "nextbigfuture.s3.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
