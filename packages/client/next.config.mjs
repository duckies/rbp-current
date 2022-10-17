/**
 * @type {import('next').NextConfig}
 */
export default {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    additionalData: `@use "src/styles/shared" as *;`,
  },
  images: {
    domains: ["cdn.discordapp.com"],
  },
};
