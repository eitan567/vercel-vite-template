import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',    
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    open: true, // Optional: Auto-opens browser
    port: 3000, // Optional: Use a custom port
  },
  preview: {
    port: 5000, // Ensure preview mode works on a different port
  }
})
