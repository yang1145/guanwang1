// API配置文件
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const getApiUrl = (endpoint) => {
  // 在生产环境中，对于Vercel部署，我们直接使用完整的API地址
  if (import.meta.env.PROD && API_BASE_URL) {
    return `${API_BASE_URL}${endpoint}`;
  }
  // 在开发环境中，使用相对路径，让Vite代理处理
  return endpoint;
};

export default API_BASE_URL;