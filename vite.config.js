import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import critical from 'rollup-plugin-critical';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    {
      ...critical({
        criticalUrl: '/',                // яку сторінку аналізувати
        criticalBase: './dist',          // вихідна папка білду
        criticalPages: [
          { uri: '/', template: 'index' } // можна додати ще маршрути
        ],
        criticalConfig: {
          inline: true,                  // вставити critical CSS у <head>
          extract: true,                 // решта CSS окремо
          minify: true,                  // мінімізувати
          width: 1920,                   // десктоп viewport
          height: 1080,
        },
      }),
      apply: 'build', // тільки під час npm run build
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
