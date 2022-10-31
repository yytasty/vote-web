import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import AutoImport from "unplugin-auto-import/vite"
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        env: 'development'
      }
    }
  },
  // server: {
  //   port: 26000,
  //   open: false, //自动打开 
  //   base: "./ ", //生产环境路径
  //   proxy: { // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
  //     // 正则表达式写法
  //     '^/api': {
  //       target: 'http://www.yytasty.com:9027/', // 后端服务实际地址
  //       changeOrigin: true, //开启代理
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   }
  // },
  server: {
    host: '0.0.0.0',
    port: 26000,
    open: false
  },
})

