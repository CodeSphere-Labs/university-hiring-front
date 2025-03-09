/// <reference types="vite/client" />
import path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  appType: 'spa',

  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
