# 科技企业官网

这是一个使用 Vue 3 开发的科技企业官网，采用扁平化设计风格，包含多个页面，具有响应式设计。

## 项目特点

- 使用 Vue 3 和 Vue Router 构建
- 扁平化设计风格
- 响应式设计，适配各种设备
- 多页面结构：首页、关于我们、产品中心、新闻资讯、联系我们
- 纯静态页面设计
- 管理后台系统，支持内容管理

## 项目结构

```
.
├── index.html          # 入口HTML文件
├── src/
│   ├── main.js         # 项目入口文件
│   ├── App.vue         # 主应用组件
│   ├── router/         # 路由配置
│   ├── views/          # 页面组件
│   ├── components/     # 公共组件
│   └── assets/         # 静态资源
├── backend/            # 后端API服务
│   ├── app.js         # 应用入口文件
│   ├── config/        # 配置文件
│   ├── controllers/    # 控制器
│   ├── models/        # 数据模型
│   ├── routes/        # 路由
│   └── middleware/    # 中间件
├── package.json        # 项目配置文件
└── vite.config.js      # Vite配置文件
```

## 安装与运行

1. 安装依赖：
   ```
   npm install
   ```

2. 开发环境运行：
   ```
   npm run dev
   ```

3. 构建生产版本：
   ```
   npm run build
   ```

4. 预览生产版本：
   ```
   npm run preview
   ```

## 管理后台

项目包含一个完整的管理后台系统，用于管理网站内容：

### 功能特性
- 管理员身份验证
- 产品管理（增删改查）
- 新闻管理（增删改查）
- 消息查看（只读）

### 默认管理员账户
- 用户名：admin
- 密码：admin123（生产环境部署时请务必修改）

### 访问地址
- 管理后台登录页面：`/admin/login`
- 管理后台主页：`/admin/dashboard`

### 安全建议
1. 部署时请务必修改默认管理员密码
2. 使用HTTPS保护管理后台通信安全

## 部署教程

### 前端独立部署

1. 构建生产版本：
   ```
   npm run build
   ```
   构建完成后，会在项目根目录生成 `dist` 文件夹，其中包含所有静态资源。

2. 部署选项：
   - **静态网站托管服务**：将 `dist` 文件夹中的所有文件上传到如 GitHub Pages、Vercel、Netlify 等静态网站托管服务
   - **Web服务器部署**：将 `dist` 文件夹中的文件部署到 Nginx、Apache 等 Web 服务器

3. Nginx 配置示例（前端独立部署）：
   ```nginx
   server {
       listen 80;
       server_name frontend.yourdomain.com;
       root /path/to/your/project/dist;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       # 代理API请求到独立的后端服务器
       location /api/ {
           proxy_pass http://backend-server-ip:3001;  # 后端服务器地址
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       }
   }
   ```

### 后端独立部署

1. 环境要求：
   - Node.js (>= 14.x)
   - MySQL (>= 5.7)

2. 数据库配置：
   - 在后端服务器上创建 `.env` 文件，并添加以下配置：
     ```
     # 数据库配置
     DB_HOST=your_database_host           # 数据库主机地址
     DB_USER=your_database_user           # 数据库用户名
     DB_PASSWORD=your_database_password   # 数据库密码
     DB_NAME=tech_company                 # 数据库名称
     DB_PORT=3306                         # 数据库端口
     
     # 服务配置
     PORT=3001                            # 后端服务端口
     ```

3. 安装依赖：
   ```
   npm install --only=production
   ```

4. 初始化数据库：
   ```
   npm run init:db
   ```

5. 启动后端服务：
   ```
   npm start
   ```
   或使用 PM2 等进程管理工具（推荐）：
   ```
   # 安装PM2（如果尚未安装）
   npm install -g pm2
   
   # 使用PM2启动后端服务
   pm2 start backend/app.js --name tech-company-api
   
   # 设置开机自启
   pm2 startup
   pm2 save
   ```

6. 配置防火墙：
   确保后端服务器的防火墙允许外部访问配置的端口（默认为3001）

### 前后端分离部署完整流程

1. **准备两台服务器**：
   - 前端服务器：用于托管Vue构建后的静态文件
   - 后端服务器：用于运行Node.js API服务和数据库

2. **部署后端服务**：
   - 在后端服务器上克隆或上传项目代码
   - 配置 `.env` 文件
   - 安装依赖：`npm install --only=production`
   - 初始化数据库：`npm run init:db`
   - 启动服务：`npm start` 或使用PM2
   - 记录后端服务器的公网IP和端口号

3. **配置前端API地址**：
   在前端代码中，需要修改 `vite.config.js` 中的代理配置或在构建时指定API地址。
   
   方法一：修改 `vite.config.js` 中的代理目标地址：
   ```javascript
   // vite.config.js
   export default defineConfig({
     // ... 其他配置
     server: {
       // ... 其他配置
       proxy: {
         '/api': {
           target: 'http://backend-server-ip:3001',  // 更改为实际后端服务器地址
           changeOrigin: true,
           secure: false
         }
       }
     }
   })
   ```
   
   方法二：在构建时通过环境变量指定API地址（推荐）：
   ```javascript
   // vite.config.js
   export default defineConfig({
     // ... 其他配置
     server: {
       // ... 其他配置
       proxy: {
         '/api': {
           target: process.env.VITE_API_URL || 'http://localhost:3001',
           changeOrigin: true,
           secure: false
         }
       }
     }
   })
   ```
   
   然后在构建时指定环境变量：
   ```bash
   VITE_API_URL=http://backend-server-ip:3001 npm run build
   ```

4. **构建并部署前端**：
   - 在开发机器上构建前端项目：
     ```
     npm run build
     ```
   - 将生成的 `dist` 文件夹内容上传到前端服务器
   - 配置前端服务器（如Nginx）将静态文件提供给用户，并代理API请求到后端服务器

5. **Nginx配置示例**（前端服务器）：
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           root /path/to/your/project/dist;
           index index.html;
           try_files $uri $uri/ /index.html;
       }
       
       # 代理API请求到后端服务器
       location /api/ {
           proxy_pass http://backend-server-ip:3001;  # 替换为实际后端服务器地址
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```

### 完整部署（前后端一体化）

1. 构建前端项目：
   ```
   npm run build
   ```

2. 配置环境变量：
   - 创建 `.env` 文件
     ```
     # 数据库配置
     DB_HOST=localhost      # 数据库主机地址
     DB_USER=root           # 数据库用户名
     DB_PASSWORD=           # 数据库密码
     DB_NAME=tech_company   # 数据库名称
     DB_PORT=3306           # 数据库端口
     
     # 服务配置
     PORT=3001              # 服务端口
     ```

3. 初始化数据库：
   ```
   npm run init:db
   ```

4. 启动服务：
   ```
   npm start
   ```

   或使用 PM2：
   ```
   pm2 start backend/app.js --name tech-company-website
   pm2 startup
   pm2 save
   ```

   默认情况下，服务将在以下端口运行：
   - 前端页面：http://localhost:3001
   - API 接口：http://localhost:3001/api/
   - 管理后台：http://localhost:3001/admin/login

## 页面说明

- **首页 (Home)**: 展示公司核心价值和热门产品
- **关于我们 (About)**: 公司简介、使命愿景和团队介绍
- **产品中心 (Products)**: 产品展示和分类浏览
- **新闻资讯 (News)**: 公司动态和行业资讯
- **联系我们 (Contact)**: 联系方式和留言表单
- **管理后台 (Admin)**: 内容管理系统

## 技术栈

- Vue 3
- Vue Router 4
- Vite
- Express.js
- MySQL
- bcryptjs (密码加密)
- 原生CSS (扁平化设计风格)

## 响应式设计

网站采用响应式设计，适配各种屏幕尺寸：
- 桌面端 (>= 992px)
- 平板端 (768px - 991px)
- 手机端 (< 768px)

## 浏览器兼容性

- Chrome >= 80
- Firefox >= 70
- Safari >= 13
- Edge >= 80