/** @type {import('next').NextConfig} */
const nextConfig = {
  // Conflicts with React-Aria for now.
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
      },
      {
        protocol: "https",
        hostname: "render.worldofwarcraft.com",
      },
    ],
  },
  experimental: {
    appDir: false,
  },
};

export default nextConfig;
