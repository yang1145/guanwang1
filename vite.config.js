import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    server: {
      host: '0.0.0.0',
      port: 3000,
      // 禁用HTTP/2以解决ERR_HTTP2_PROTOCOL_ERROR错误
      https: false,
      // 添加代理配置，将API请求代理到后端服务器
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:3001',
          changeOrigin: true,
          secure: false
        }
      }
    },
    build: {
      outDir: 'dist'
    },
    // 移除publicDir配置，使用默认的public目录
    // publicDir: 'src/assets',
    // 配置资源处理
    assetsInclude: ['**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.gif']
  }
})