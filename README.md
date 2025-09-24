# 科技企业官网（前端项目）

这是一个使用 Vue 3 开发的科技企业官网，采用扁平化设计风格，包含多个页面，具有响应式设计。

## 项目特点

- 使用 Vue 3 和 Vue Router 构建
- 扁平化设计风格
- 响应式设计，适配各种设备
- 多页面结构：首页、关于我们、产品中心、新闻资讯、联系我们
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

### 访问地址
- 管理后台登录页面：`/admin/login`
- 管理后台主页：`/admin/dashboard`

## 环境变量配置

项目支持通过环境变量配置API地址：

```bash
VITE_API_URL=http://your-backend-server:3001
```

在开发环境中，可以在项目根目录创建 `.env` 文件来设置API地址。

## 部署指南

### 构建项目

```
npm run build
```

构建完成后，会在项目根目录生成 `dist` 文件夹，其中包含所有静态资源。

### 部署选项

1. **静态网站托管服务**：将 `dist` 文件夹中的所有文件上传到如 GitHub Pages、Vercel、Netlify 等静态网站托管服务

2. **Web服务器部署**：将 `dist` 文件夹中的文件部署到 Nginx、Apache 等 Web 服务器

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name yourdomain.com;
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

### 与后端项目配合使用

此项目为前端部分，需要与独立的后端项目配合使用。请确保后端服务正在运行，并且API地址配置正确。