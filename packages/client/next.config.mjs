import { defineNextConfig } from './src/lib/utils/config.mjs';

export default defineNextConfig({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdn.discordapp.com'],
  },
});
