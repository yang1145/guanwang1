const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// 路由导入
const productRoutes = require('./routes/products');
const newsRoutes = require('./routes/news');
const contactRoutes = require('./routes/contact');
const adminRoutes = require('./routes/admin');

// 模型导入
const Admin = require('./models/Admin');

const app = express();
const port = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());

// 只有在非Docker环境中才提供静态文件服务
if (!process.env.IS_DOCKER) {
  app.use(express.static(path.join(__dirname, '../dist')));
}

// API 路由
app.get('/api', (req, res) => {
  res.json({ message: '欢迎使用科技企业官网API' });
});

// 管理员路由
app.use('/api/admin', adminRoutes);

app.use('/api/products', productRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/contact', contactRoutes);

// 只有在非Docker环境中才处理前端路由
if (!process.env.IS_DOCKER) {
  // 处理前端路由（放在最后）
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在端口 ${port}`);
});

module.exports = app;