import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          react: ['react', 'react-dom'],

          // Роутінг
          router: ['react-router-dom'],

          // i18n
          i18n: [
            'i18next',
            'react-i18next',
            'i18next-http-backend',
            'i18next-browser-languagedetector',
          ],

          // React Query + axios
          data: ['@tanstack/react-query', 'axios'],

          // Важкі візуалізації
          graphics: ['@pixi/react', 'd3'],

          // UI та іконки
          ui: [
            '@radix-ui/react-toggle-group',
            'react-icons',
            'react-circle-flags',
          ],

          // Стан
          state: ['zustand'],

          // Утиліти
          utils: ['clsx', 'path'],
        },
      },
    },
  },
});
