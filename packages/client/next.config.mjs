/**
 * @template {import('next').NextConfig}
 * @param {T} config - A generic parameter that flows through to the return type 
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

export default defineNextConfig({
  reactStrictMode: true,
  sassOptions: {
    prependData: `@import "src/styles/global.scss";`
  },
  images: {
    domains: ['cdn.discordapp.com']
  }
})
