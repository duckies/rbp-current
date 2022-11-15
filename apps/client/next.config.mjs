/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Conflicts with React-Aria for now.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
      },
      {
        protocol: 'https',
        hostname: 'render.worldofwarcraft.com',
      },
    ],
  },
  experimental: {
    appDir: false,
  },
};

export default nextConfig;
