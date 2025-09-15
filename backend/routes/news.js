const express = require('express');
const router = express.Router();
const {
  getAllNews,
  getNewsById,
  getPopularNews,
  createNews,
  updateNews,
  deleteNews
} = require('../controllers/newsController');

// 获取所有新闻
router.get('/', getAllNews);

// 获取特定新闻详情
router.get('/:id', getNewsById);

// 获取热门新闻
router.get('/popular', getPopularNews);

// 创建新闻
router.post('/', createNews);

// 更新新闻
router.put('/:id', updateNews);

// 删除新闻
router.delete('/:id', deleteNews);

module.exports = router;