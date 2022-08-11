/*
 * @Author: BlackJoken
 * @Date: 2022-03-17 09:12:55
 * @LastEditors: BlackJoken
 * @LastEditTime: 2022-03-30 16:55:31
 */

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      less: {
        charset: false,
        additionalData: '@import "./src/assets/style/global.less";',
      },
    },

  },
  //开发服务器选项
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.100.30:9999',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  //构建选项
  build: {
    rollupOptions: {
      plugins:[]
    }
    
  }
})

