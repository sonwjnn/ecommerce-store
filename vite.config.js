import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { copy } from 'fs-extra'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: '3000'
  },
  optimizeDeps: {
    exclude: ['react-spinners']
  },
  build: {
    rollupOptions: {
      output: {
        assetFileNames: '[name][extname]'
      }
    },
    afterWrite: [
      () =>
        copy(resolve(process.cwd(), 'assets'), resolve(process.cwd(), 'dist'))
    ]
  }
})
