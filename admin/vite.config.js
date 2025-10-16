import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // ⚠️ this line is very important for Render
  build: {
    outDir: 'dist',
  },
})
