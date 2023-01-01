import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['**/*.{test,spec,e2e-spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  },
  plugins: [swc.vite()],
})
