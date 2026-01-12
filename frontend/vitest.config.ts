import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/tests/setup.ts',
  },
  resolve: {
    alias: {
      /* eslint-disable-next-line unicorn/prefer-module */
      '@': path.resolve(__dirname, './src'),
    },
  },
});
