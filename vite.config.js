import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  publicDir: 'public',
  resolve: {
    alias: {
      // Alias @images → root-level images/ folder
      '@images': new URL('./images', import.meta.url).pathname,
    },
  },
  server: {
    fs: {
      allow: ['.'],
    },
  },
})
