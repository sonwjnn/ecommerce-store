import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: '3000'
  },
  optimizeDeps: {
    exclude: ['react-spinners', 'swiper', 'swiper-react']
  },
  build: {
    cssCodeSplit: true
  },
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }]
  }
})
