// API配置文件
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export const getApiUrl = (endpoint) => {
  // 在生产环境中，使用完整的API地址
  if (API_BASE_URL) {
    // 确保endpoint以/开头
    if (!endpoint.startsWith('/')) {
      endpoint = '/' + endpoint;
    }
    return `${API_BASE_URL}${endpoint}`;
  }
  // 默认使用相对路径
  return endpoint;
};

export default API_BASE_URL;