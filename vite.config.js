// https://vitejs.dev/config/
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: '3000',
  },
  optimizeDeps: {
    exclude: ['swiper', 'swiper-react'],
  },
  build: {
    cssCodeSplit: true,
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
})
