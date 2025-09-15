const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

// 数据库配置
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tech_company'
};

// 创建数据库连接池
const pool = mysql.createPool(dbConfig);

// 联系表单提交
router.post('/', (req, res) => {
  const { name, email, phone, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: '请提供姓名、邮箱和留言内容' });
  }
  
  const query = 'INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)';
  pool.query(query, [name, email, phone, message], (err, results) => {
    if (err) {
      console.error('插入联系信息时出错: ' + err.stack);
      return res.status(500).json({ error: '提交失败，请稍后重试' });
    }
    
    res.status(201).json({ 
      message: '留言提交成功',
      data: { id: results.insertId, name, email, phone, message }
    });
  });
});

module.exports = router;
const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

// 数据库配置
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tech_company'
};

// 创建数据库连接池
const pool = mysql.createPool(dbConfig);

// 获取所有新闻
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  
  const query = 'SELECT * FROM news ORDER BY created_at DESC LIMIT ? OFFSET ?';
  pool.query(query, [limit, offset], (err, results) => {
    if (err) {
      console.error('获取新闻时出错: ' + err.stack);
      return res.status(500).json({ error: '获取新闻失败' });
    }
    
    // 获取总数
    const countQuery = 'SELECT COUNT(*) as total FROM news';
    pool.query(countQuery, (countErr, countResults) => {
      if (countErr) {
        console.error('获取新闻总数时出错: ' + countErr.stack);
        return res.status(500).json({ error: '获取新闻失败' });
      }
      
      res.json({
        message: '新闻获取成功',
        data: results,
        pagination: {
          page,
          limit,
          total: countResults[0].total,
          totalPages: Math.ceil(countResults[0].total / limit)
        }
      });
    });
  });
});

// 获取特定新闻详情
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  const query = 'SELECT * FROM news WHERE id = ?';
  pool.query(query, [id], (err, results) => {
    if (err) {
      console.error('获取新闻详情时出错: ' + err.stack);
      return res.status(500).json({ error: '获取新闻详情失败' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: '未找到该新闻' });
    }
    
    res.json({
      message: '新闻详情获取成功',
      data: results[0]
    });
  });
});

// 获取热门新闻
router.get('/popular', (req, res) => {
  const query = 'SELECT * FROM news ORDER BY views DESC LIMIT 5';
  pool.query(query, (err, results) => {
    if (err) {
      console.error('获取热门新闻时出错: ' + err.stack);
      return res.status(500).json({ error: '获取热门新闻失败' });
    }
    
    res.json({
      message: '热门新闻获取成功',
      data: results
    });
  });
});

module.exports = router;
const express = require('express');
const mysql = require('mysql2');
const router = express.Router();

// 数据库配置
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'tech_company'
};

// 创建数据库连接池
const pool = mysql.createPool(dbConfig);

// 获取所有产品
router.get('/', (req, res) => {
  const { category } = req.query;
  let query = 'SELECT * FROM products WHERE 1=1';
  let params = [];
  
  if (category) {
    query += ' AND category = ?';
    params.push(category);
  }
  
  query += ' ORDER BY created_at DESC';
  
  pool.query(query, params, (err, results) => {
    if (err) {
      console.error('获取产品时出错: ' + err.stack);
      return res.status(500).json({ error: '获取产品失败' });
    }
    
    res.json({
      message: '产品获取成功',
      data: results
    });
  });
});

// 获取特定产品详情
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  const query = 'SELECT * FROM products WHERE id = ?';
  pool.query(query, [id], (err, results) => {
    if (err) {
      console.error('获取产品详情时出错: ' + err.stack);
      return res.status(500).json({ error: '获取产品详情失败' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ error: '未找到该产品' });
    }
    
    res.json({
      message: '产品详情获取成功',
      data: results[0]
    });
  });
});

module.exports = router;
const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// 路由导入
const productRoutes = require('./routes/products');
const newsRoutes = require('./routes/news');
const contactRoutes = require('./routes/contact');

const app = express();
const port = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

// API 路由
app.get('/api', (req, res) => {
  res.json({ message: '欢迎使用科技企业官网API' });
});

app.use('/api/products', productRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/contact', contactRoutes);

// 处理前端路由（放在最后）
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// 启动服务器
app.listen(port, () => {
  console.log(`服务器运行在端口 ${port}`);
});

module.exports = app;