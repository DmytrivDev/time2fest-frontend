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
        criticalBase: path.join(__dirname, 'dist'),
        criticalPages: [
          { uri: '', template: 'index' }, // тільки index.html
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
