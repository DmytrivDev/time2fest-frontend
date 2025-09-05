import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import PrerenderSPAPlugin from 'prerender-spa-plugin';
import { PuppeteerRenderer } from 'prerender-spa-plugin';
import critical from 'rollup-plugin-critical';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),

    // 1. Пререндеринг сторінок у dist/
    {
      name: 'prerender-spa',
      apply: 'build',
      enforce: 'post',
      async closeBundle() {
        const plugin = new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, 'dist'),
          routes: ['/', '/uk/', '/en/'],
          renderer: new PuppeteerRenderer({
            headless: true,
            renderAfterTime: 2000, // зачекати поки React завантажить контент
          }),
        });
        await plugin.apply({}); // запускаємо плагін вручну
      },
    },

    // 2. Генерація критикал CSS для готових HTML
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
