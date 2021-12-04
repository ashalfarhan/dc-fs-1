import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '^/api/.*': {
        target: 'http://localhost:4000/api/',
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    outDir: join(__dirname, '..', 'api', 'dist', 'client'),
  },
})
