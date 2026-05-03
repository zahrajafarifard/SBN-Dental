/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        // protocol: "http",
        protocol: "https",
        // hostname: "localhost", // Specify only the domain here
        hostname: "api.sbn-dental.com", // Specify only the domain here
        // port: "4000", // Specify the port separately
      },
    ],
  },
};

export default nextConfig;
