const db = require('../config/db');

class Product {
  // 获取所有产品
  static async getAll(category = null) {
    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];
    
    if (category) {
      query += ' AND category = ?';
      params.push(category);
    }
    
    query += ' ORDER BY created_at DESC';
    
    const [rows] = await db.query(query, params);
    return rows;
  }
  
  // 根据ID获取产品
  static async getById(id) {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  }
  
  // 创建产品
  static async create(productData) {
    const { name, description, category, image_url } = productData;
    const [result] = await db.query(
      'INSERT INTO products (name, description, category, image_url) VALUES (?, ?, ?, ?)',
      [name, description, category, image_url]
    );
    return result.insertId;
  }
  
  // 更新产品
  static async update(id, productData) {
    const { name, description, category, image_url } = productData;
    const [result] = await db.query(
      'UPDATE products SET name = ?, description = ?, category = ?, image_url = ? WHERE id = ?',
      [name, description, category, image_url, id]
    );
    return result.affectedRows;
  }
  
  // 删除产品
  static async delete(id) {
    const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows;
  }
}

module.exports = Product;