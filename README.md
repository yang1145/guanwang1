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

### 前端部署

1. 构建生产版本：
   ```
   npm run build
   ```
   构建完成后，会在项目根目录生成 `dist` 文件夹，其中包含所有静态资源。

2. 部署选项：
   - **静态网站托管服务**：将 `dist` 文件夹中的所有文件上传到如 GitHub Pages、Vercel、Netlify 等静态网站托管服务
   - **Web服务器部署**：将 `dist` 文件夹中的文件部署到 Nginx、Apache 等 Web 服务器

3. Nginx 配置示例：
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       root /path/to/your/project/dist;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
       
       # 代理API请求到后端服务
       location /api/ {
           proxy_pass http://localhost:3001;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

### 后端部署

1. 环境要求：
   - Node.js (>= 14.x)
   - MySQL (>= 5.7)

2. 数据库配置：
   - 复制 [.env.example](.env.example) 文件并重命名为 `.env`
   - 修改 `.env` 文件中的数据库连接信息：
     ```
     DB_HOST=localhost      # 数据库主机地址
     DB_USER=root           # 数据库用户名
     DB_PASSWORD=           # 数据库密码
     DB_NAME=tech_company   # 数据库名称
     DB_PORT=3306           # 数据库端口
     PORT=3001              # 服务端口
     ```

3. 初始化数据库：
   ```
   npm run init:db
   ```

4. 启动后端服务：
   ```
   npm start
   ```
   或使用 PM2 等进程管理工具：
   ```
   pm2 start backend/app.js --name tech-company-api
   ```

### 完整部署（前后端一体化）

1. 构建前端项目：
   ```
   npm run build
   ```

2. 配置环境变量：
   - 复制 [.env.example](.env.example) 并重命名为 `.env`
   - 修改数据库连接信息和JWT密钥

3. 初始化数据库：
   ```
   npm run init:db
   ```

4. 启动服务：
   ```
   npm start
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