const db = require('../config/db');

class News {
  // 获取所有新闻
  static async getAll(page = 1, limit = 10) {
    const offset = (page - 1) * limit;
    const query = 'SELECT * FROM news ORDER BY created_at DESC LIMIT ? OFFSET ?';
    const [rows] = await db.query(query, [limit, offset]);
    
    // 获取总数
    const [countResult] = await db.query('SELECT COUNT(*) as total FROM news');
    const total = countResult[0].total;
    
    return {
      data: rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    };
  }
  
  // 根据ID获取新闻
  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM news WHERE id = ?', [id]);
    return rows[0];
  }
  
  // 获取热门新闻
  static async getPopular(limit = 5) {
    const query = 'SELECT * FROM news ORDER BY views DESC LIMIT ?';
    const [rows] = await db.query(query, [limit]);
    return rows;
  }
  
  // 创建新闻
  static async create(newsData) {
    const { title, content, author, image_url } = newsData;
    const query = 'INSERT INTO news (title, content, author, image_url) VALUES (?, ?, ?, ?)';
    const [result] = await db.query(query, [title, content, author, image_url]);
    return result.insertId;
  }
  
  // 更新新闻
  static async update(id, newsData) {
    const { title, content, author, image_url } = newsData;
    const query = 'UPDATE news SET title = ?, content = ?, author = ?, image_url = ? WHERE id = ?';
    const [result] = await db.query(query, [title, content, author, image_url, id]);
    return result.affectedRows;
  }
  
  // 删除新闻
  static async delete(id) {
    const query = 'DELETE FROM news WHERE id = ?';
    const [result] = await db.query(query, [id]);
    return result.affectedRows;
  }
  
  // 增加新闻浏览量
  static async incrementViews(id) {
    const query = 'UPDATE news SET views = views + 1 WHERE id = ?';
    const [result] = await db.query(query, [id]);
    return result.affectedRows;
  }
}

module.exports = News;