import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/one-piece/' : '/',  // ✅ dev: '/', build: '/one-piece/'
}))
