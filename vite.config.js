import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{ // 中转服务器
    proxy:{ // 通过代理实现跨域问题
      '/api/v1':{
        target:'http://xxxx',
        changeOrigin:true, /// 开启代理，允许跨域
        // rewrite:path=>path.replace(/^\/api/,''), // 重写 将path去掉
      }
    }
  },
})
