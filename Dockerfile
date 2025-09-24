# 使用Node.js 22.19.0作为基础镜像
FROM node:22.19.0

# 设置工作目录
WORKDIR /app

# 复制package.json和package-lock.json
COPY package*.json ./

# 安装生产依赖
RUN npm install --only=production --no-optional

# 复制后端源代码
COPY backend ./backend

# 复制环境配置文件
COPY .env.docker .env

# 复制其他必要文件
COPY .env.example .env.example

# 暴露端口
EXPOSE 3001

# 启动应用
CMD ["node", "backend/app.js"]