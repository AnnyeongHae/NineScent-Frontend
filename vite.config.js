import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    strictExports: true,
    preserveSymlinks: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://54.180.99.176/:8080',
        changeOrigin: true,
      },
    },
  },
});
