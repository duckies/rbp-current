import frontmatter from "remark-frontmatter"
import remarkTOC from "remark-toc"

/** @type {import('next').NextConfig} */
export default {
  pageExtensions: ["tsx", "mdx"],
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        {
          loader: "@mdx-js/loader",
          /** @type {import('@mdx-js/loader').Options} */
          options: {
            remarkPlugins: [frontmatter, remarkTOC],
            providerImportSource: "@mdx-js/react",
          },
        },
      ],
    })

    return config
  },
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
    ],
  },
  experimental: {
    appDir: false,
  },
  sassOptions: {
    prependData: `@import "src/styles/global.scss";`,
  },
}
