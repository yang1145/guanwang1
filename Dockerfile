# 使用Node.js 22.19.0作为基础镜像
FROM node:22.19.0

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制所有源代码
COPY . .

# 构建前端应用
RUN npm run build

# 暴露端口
EXPOSE 3001

# 启动应用
CMD ["npm", "start"]