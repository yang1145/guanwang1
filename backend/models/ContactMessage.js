const db = require('../config/db');

class ContactMessage {
  // 创建联系信息
  static async create(contactData) {
    const { name, email, phone, message } = contactData;
    const query = 'INSERT INTO contact_messages (name, email, phone, message) VALUES (?, ?, ?, ?)';
    const [result] = await db.execute(query, [name, email, phone, message]);
    return result.insertId;
  }
  
  // 获取所有联系信息
  static async getAll() {
    const [rows] = await db.execute('SELECT * FROM contact_messages ORDER BY created_at DESC');
    return rows;
  }
  
  // 根据ID获取联系信息
  static async getById(id) {
    const [rows] = await db.execute('SELECT * FROM contact_messages WHERE id = ?', [id]);
    return rows[0];
  }
}

module.exports = ContactMessage;