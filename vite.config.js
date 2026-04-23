import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../public',
    emptyOutDir: false,          // public/ 의 index.html, app.html은 유지
    rollupOptions: {
      input: {
        login:     resolve(__dirname, 'src/login.js'),
        authGuard: resolve(__dirname, 'src/auth-guard.js'),
      },
      output: {
        entryFileNames: 'js/[name].js',   // public/js/login.js, public/js/auth-guard.js
        chunkFileNames: 'js/[name].js',
        assetFileNames: 'assets/[name][extname]',
      },
    },
    // Firebase SDK 트리쉐이킹 — 사용한 함수만 번들에 포함
    minify: true,
    sourcemap: false,
    target: 'es2020',
  },
});
