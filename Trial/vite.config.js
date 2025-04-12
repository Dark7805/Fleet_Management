import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // change if your backend runs on another port
        changeOrigin: true,
        secure: false,
      },
    },
  },
})