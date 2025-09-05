import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import prerender from 'vite-plugin-prerender';
import critical from 'rollup-plugin-critical';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),

    // 1. Генерація статичних HTML
    prerender({
      routes: [
        '/',      // головна
        '/uk/',   // українська
        '/en/',   // англійська
        // можна додати ще інші
      ],
    }),

    // 2. Генерація critical CSS після білду
    {
      ...critical({
        criticalBase: path.join(__dirname, 'dist'),
        criticalPages: [
          { uri: '/', template: 'index' },
          { uri: '/uk/', template: 'uk' },
          { uri: '/en/', template: 'en' },
        ],
        criticalConfig: {
          inline: true,
          extract: true,
          minify: true,
          width: 1920,
          height: 1080,
        },
      }),
      apply: 'build',
    },
  ],
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
});