import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.js',
    // ADD THIS SECTION: It forces Vitest to handle the ESM/CJS clash better
    pool: 'threads', 
    server: {
      deps: {
        inline: [
          'jsdom',
          'html-encoding-sniffer',
          '@exodus/bytes'
        ],
      },
    },
  },
})