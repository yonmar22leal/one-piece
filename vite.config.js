import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  base: command === 'build' ? 
    (process.env.NODE_ENV === 'netlify' ? '/' : '/one-piece/') : '/',
}))
