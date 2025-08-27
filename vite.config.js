import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import ClosePlugin from './vite-config-close';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ClosePlugin()],
  base: '/',
  build: {
    outDir: 'dist', // Change if necessary, default is 'dist'
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    origin: 'http://localhost:3000',
  },
  define: {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
  },
});
