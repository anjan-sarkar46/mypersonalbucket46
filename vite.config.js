import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
      util: 'util',
      stream: 'stream-browserify',
    }
  },
  define: {
    'process.env.NODE_DEBUG': 'false',
    global: 'globalThis'
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis'
      }
    },
    include: ['util', 'stream-browserify']
  },
  build: {
    rollupOptions: {
      external: ['aws-crt'],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          aws: ['@aws-sdk/client-s3', '@aws-sdk/lib-storage']
        }
      }
    }
  }
});
