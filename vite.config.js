import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    // 禁用HTTP/2以解决ERR_HTTP2_PROTOCOL_ERROR错误
    https: false
  },
  build: {
    outDir: 'dist'
  },
  // 移除publicDir配置，使用默认的public目录
  // publicDir: 'src/assets',
  // 配置资源处理
  assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.gif']
})