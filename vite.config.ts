/**
 * Vite Configuration
 * ------------------
 * Description: Development server and build configuration for the React application.
 * File: vite.config.ts
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
