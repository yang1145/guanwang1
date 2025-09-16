const db = require('../config/db');
const bcrypt = require('bcryptjs');

class Admin {
  // 根据用户名获取管理员信息
  static async getByUsername(username) {
    try {
      console.log(`查询数据库获取管理员信息，用户名: ${username}`);
      const [rows] = await db.query(
        'SELECT id, username, password FROM admins WHERE username = ?',
        [username]
      );
      
      if (rows.length > 0) {
        console.log(`找到管理员: ${username}`);
        console.log(`管理员信息:`, rows[0]);
        return rows[0];
      } else {
        console.log(`未找到管理员: ${username}`);
        return null;
      }
    } catch (error) {
      console.error('数据库查询错误:', error);
      throw error;
    }
  }

  // 验证管理员密码
  static async validatePassword(inputPassword, hashedPassword) {
    console.log(`验证密码: ${inputPassword}`);
    console.log(`数据库中的哈希密码: ${hashedPassword}`);
    const isValid = await bcrypt.compare(inputPassword, hashedPassword);
    console.log(`密码验证结果: ${isValid}`);
    return isValid;
  }

  // 创建管理员（用于初始化）
  static async create(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO admins (username, password) VALUES (?, ?)',
      [username, hashedPassword]
    );
    return result.insertId;
  }

  // 重置管理员密码
  static async resetPassword(username, newPassword) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const [result] = await db.query(
      'UPDATE admins SET password = ? WHERE username = ?',
      [hashedPassword, username]
    );
    return result.affectedRows;
  }

  // 修改管理员密码
  static async changePassword(id, currentPassword, newPassword) {
    try {
      // 获取管理员信息
      const [rows] = await db.query(
        'SELECT password FROM admins WHERE id = ?',
        [id]
      );
      
      if (rows.length === 0) {
        throw new Error('管理员不存在');
      }
      
      const admin = rows[0];
      
      // 验证当前密码
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, admin.password);
      if (!isCurrentPasswordValid) {
        throw new Error('当前密码错误');
      }
      
      // 生成新密码哈希
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      
      // 更新密码
      const [result] = await db.query(
        'UPDATE admins SET password = ? WHERE id = ?',
        [hashedNewPassword, id]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      console.error('修改密码时出错:', error);
      throw error;
    }
  }

  // 获取所有管理员（调试用）
  static async getAll() {
    const [rows] = await db.query('SELECT id, username, created_at FROM admins');
    return rows;
  }

  // 根据ID获取管理员信息
  static async getById(id) {
    const [rows] = await db.query('SELECT id, username, created_at FROM admins WHERE id = ?', [id]);
    return rows[0];
  }

  // 验证密码哈希（调试用）
  static async testHash(password, hash) {
    console.log(`测试密码: ${password}`);
    console.log(`测试哈希: ${hash}`);
    const isValid = await bcrypt.compare(password, hash);
    console.log(`哈希验证结果: ${isValid}`);
    return isValid;
  }

  // 生成新密码哈希（调试用）
  static async generateHash(password) {
    console.log(`生成新哈希，密码: ${password}`);
    const salt = await bcrypt.genSalt(10);
    console.log(`Salt: ${salt}`);
    const hash = await bcrypt.hash(password, salt);
    console.log(`生成的哈希: ${hash}`);
    return hash;
  }
}

module.exports = Admin;