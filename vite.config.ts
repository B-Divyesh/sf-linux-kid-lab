import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    target: 'es2022',
    sourcemap: true,
    rollupOptions: { output: {
      manualChunks: undefined,
      entryFileNames: 'assets/app.js',
      chunkFileNames: 'assets/[name].js',
      assetFileNames: (info) => info.name?.endsWith('.css') ? 'assets/app.css' : 'assets/[name][extname]'
    } }
  }
});
