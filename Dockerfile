# 使用Node.js 22.19.0作为基础镜像
FROM node:22.19.0

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装所有依赖（包括开发依赖）以支持构建过程
RUN npm ci

# 复制所有源代码
COPY . .

# 构建前端
RUN npm run build

# 移除开发依赖，只保留生产依赖
RUN npm prune --production

# 暴露端口
EXPOSE 3001

# 启动应用
CMD ["npm", "start"]