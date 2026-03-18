import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// __dirname không tồn tại trong ES module, phải tạo thủ công
const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  // Root directory (noi chua index.html chinh)
  root: '.',

  // Base URL khi deploy (doi thanh ten repo neu deploy GitHub Pages)
  // Vi du GitHub Pages: base: '/FE_VitaTrack/'
  base: '/',

  // Dev server
  server: {
    port: 3000,
    open: true,

    // Proxy API -> Spring Boot BE (tranh CORS khi dev)
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        // Uncomment neu BE dung prefix khac:
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },

  // Build output
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,

    // Multi-page app: khai bao tat ca cac HTML entry
    rollupOptions: {
      input: {
        main:      resolve(__dirname, 'index.html'),
        login:     resolve(__dirname, 'login.html'),
        register:  resolve(__dirname, 'register.html'),
        dashboard: resolve(__dirname, 'pages/dashboard.html'),
        profile:   resolve(__dirname, 'pages/profile.html'),
        mealLog:   resolve(__dirname, 'pages/meal-log.html'),
        activity:  resolve(__dirname, 'pages/activity.html'),
        assistant: resolve(__dirname, 'pages/assistant.html'),
        expert:    resolve(__dirname, 'pages/expert.html'),
        admin:     resolve(__dirname, 'pages/admin.html'),
      },
      output: {
        // Dat JS da build vao assets/
        chunkFileNames:  'assets/js/[name]-[hash].js',
        entryFileNames:  'assets/js/[name]-[hash].js',
        assetFileNames:  'assets/[ext]/[name]-[hash].[ext]',
      }
    }
  },

  // Resolve alias (de import ngan gon hon)
  resolve: {
    alias: {
      '@core':     resolve(__dirname, 'assets/js/core'),
      '@services': resolve(__dirname, 'assets/js/services'),
      '@modules':  resolve(__dirname, 'assets/js/modules'),
      '@components': resolve(__dirname, 'assets/js/components'),
      '@utils':    resolve(__dirname, 'utils'),
    }
  },

  // Preview server (sau khi build)
  preview: {
    port: 4173,
    open: true
  }
});
