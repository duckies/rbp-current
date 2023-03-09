import { withContentlayer } from "next-contentlayer"

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["tsx", "mdx"],
  reactStrictMode: true,
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
      {
        protocol: "https",
        hostname: "render-us.worldofwarcraft.com",
      },
      {
        protocol: "https",
        hostname: "wow.zamimg.com",
      },
    ],
  },
  experimental: {
    appDir: true,
  },
  webpack: (config) => {
    // Hide the webpack warnings from contentlayer.
    // https://github.com/contentlayerdev/contentlayer/issues/313
    config.infrastructureLogging = {
      level: "error",
    }

    return config
  },
}

export default withContentlayer(nextConfig)
