import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // server: {
  //   proxy: {
  //     '/apps': {
  //       target: 'http://127.0.0.1:5000', // 后端服务地址
  //       changeOrigin: true, // 支持跨域
  //       rewrite: (path) => path.replace(/^\/api/, ''), // 可选：重写路径
  //     },
  //   },
  // },
})
