const News = require('../models/News');

// 获取所有新闻
const getAllNews = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const result = await News.getAll(page, limit);
    
    res.json({
      message: '新闻获取成功',
      data: result.data,
      pagination: result.pagination
    });
  } catch (error) {
    console.error('获取新闻时出错: ' + error.stack);
    res.status(500).json({ error: '获取新闻失败' });
  }
};

// 获取特定新闻详情
const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.getById(id);
    
    if (!news) {
      return res.status(404).json({ error: '未找到该新闻' });
    }
    
    // 增加浏览量
    await News.incrementViews(id);
    
    res.json({
      message: '新闻详情获取成功',
      data: news
    });
  } catch (error) {
    console.error('获取新闻详情时出错: ' + error.stack);
    res.status(500).json({ error: '获取新闻详情失败' });
  }
};

// 获取热门新闻
const getPopularNews = async (req, res) => {
  try {
    const news = await News.getPopular();
    
    res.json({
      message: '热门新闻获取成功',
      data: news
    });
  } catch (error) {
    console.error('获取热门新闻时出错: ' + error.stack);
    res.status(500).json({ error: '获取热门新闻失败' });
  }
};

// 创建新闻
const createNews = async (req, res) => {
  try {
    const { title, content, author, image_url } = req.body;
    
    if (!title || !content || !author) {
      return res.status(400).json({ error: '请提供新闻标题、内容和作者' });
    }
    
    const newsId = await News.create({ title, content, author, image_url });
    
    res.status(201).json({
      message: '新闻创建成功',
      data: { id: newsId }
    });
  } catch (error) {
    console.error('创建新闻时出错: ' + error.stack);
    res.status(500).json({ error: '创建新闻失败' });
  }
};

// 更新新闻
const updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, author, image_url } = req.body;
    
    // 检查新闻是否存在
    const existingNews = await News.getById(id);
    if (!existingNews) {
      return res.status(404).json({ error: '未找到该新闻' });
    }
    
    const result = await News.update(id, { title, content, author, image_url });
    
    if (result === 0) {
      return res.status(400).json({ error: '更新新闻失败' });
    }
    
    res.json({
      message: '新闻更新成功',
      data: { id: parseInt(id) }
    });
  } catch (error) {
    console.error('更新新闻时出错: ' + error.stack);
    res.status(500).json({ error: '更新新闻失败' });
  }
};

// 删除新闻
const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    
    // 检查新闻是否存在
    const existingNews = await News.getById(id);
    if (!existingNews) {
      return res.status(404).json({ error: '未找到该新闻' });
    }
    
    const result = await News.delete(id);
    
    if (result === 0) {
      return res.status(400).json({ error: '删除新闻失败' });
    }
    
    res.json({
      message: '新闻删除成功',
      data: { id: parseInt(id) }
    });
  } catch (error) {
    console.error('删除新闻时出错: ' + error.stack);
    res.status(500).json({ error: '删除新闻失败' });
  }
};

module.exports = {
  getAllNews,
  getNewsById,
  getPopularNews,
  createNews,
  updateNews,
  deleteNews
};