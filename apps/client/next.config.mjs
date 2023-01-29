import { withContentlayer } from "next-contentlayer"

export default withContentlayer({
  pageExtensions: ["tsx", "mdx"],
  reactStrictMode: true,
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.mdx?$/,
  //     use: [
  //       {
  //         loader: "@mdx-js/loader",
  //         /** @type {import('@mdx-js/loader').Options} */
  //         options: {
  //           remarkPlugins: [frontmatter],
  //           providerImportSource: "@mdx-js/react",
  //         },
  //       },
  //     ],
  //   })

  //   return config
  // },
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
    fontLoaders: [
      {
        loader: "@next/font/google",
        options: { subsets: ["latin"] },
      },
    ],
  },
})
