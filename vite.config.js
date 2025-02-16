import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'path';import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'), // This properly resolves @ to the src directory
    },
  },
  // Add base configuration for proper path handling
  base: '/',
  // Ensure proper build settings for SPA
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});