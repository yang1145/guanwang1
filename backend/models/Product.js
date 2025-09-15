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
    
    const [rows] = await db.execute(query, params);
    return rows;
  }
  
  // 根据ID获取产品
  static async getById(id) {
    const [rows] = await db.execute('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  }
  
  // 创建新产品
  static async create(productData) {
    const { name, description, category, image_url } = productData;
    const query = 'INSERT INTO products (name, description, category, image_url) VALUES (?, ?, ?, ?)';
    const [result] = await db.execute(query, [name, description, category, image_url]);
    return result.insertId;
  }
  
  // 更新产品
  static async update(id, productData) {
    const { name, description, category, image_url } = productData;
    const query = 'UPDATE products SET name = ?, description = ?, category = ?, image_url = ? WHERE id = ?';
    const [result] = await db.execute(query, [name, description, category, image_url, id]);
    return result.affectedRows;
  }
  
  // 删除产品
  static async delete(id) {
    const query = 'DELETE FROM products WHERE id = ?';
    const [result] = await db.execute(query, [id]);
    return result.affectedRows;
  }
}

module.exports = Product;