require('dotenv').config();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

// 数据库配置
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

const dbName = process.env.DB_NAME || 'tech_company';

// 创建数据库表
const initDb = async () => {
  let connection;
  try {
    console.log('正在连接数据库服务器...');
    console.log(`主机: ${dbConfig.host}, 端口: ${dbConfig.port}, 用户: ${dbConfig.user}`);
    
    // 首先连接到 MySQL 服务器（不指定数据库）
    connection = await mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password
    });

    console.log('数据库服务器连接成功');

    // 创建数据库（如果不存在）
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`数据库 ${dbName} 已创建或已存在`);

    // 选择数据库
    await connection.query(`USE \`${dbName}\``);
    console.log(`已连接到数据库 ${dbName}`);

    // 创建产品表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(100),
        image_url VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    // 创建新闻表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS news (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT,
        author VARCHAR(100),
        image_url VARCHAR(255),
        views INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
    
    // 创建联系信息表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS contact_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // 创建管理员表
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS admins (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // 创建默认管理员账户 (用户名: admin, 密码: admin123)
    console.log('生成默认管理员账户密码哈希...');
    const salt = await bcrypt.genSalt(10);
    console.log('Salt:', salt);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    console.log('生成的哈希密码:', hashedPassword);
    
    // 验证生成的哈希密码
    const isPasswordValid = await bcrypt.compare('admin123', hashedPassword);
    console.log('验证新生成的密码哈希:', isPasswordValid);
    
    await connection.execute(
      `INSERT IGNORE INTO admins (username, password) VALUES (?, ?)`,
      ['admin', hashedPassword]
    );
    
    console.log('默认管理员账户已创建或已存在');
    console.log('数据库表创建成功');
  } catch (error) {
    console.error('创建数据库表时出错: ' + error.message);
    console.error('错误码: ' + error.errno);
    console.error('错误详情: ' + error.stack);
    if (error.errno === 'ECONNREFUSED') {
      console.error('连接被拒绝，请检查数据库服务是否运行以及主机和端口配置是否正确');
    } else if (error.errno === 'ER_ACCESS_DENIED_ERROR') {
      console.error('访问被拒绝，请检查用户名和密码是否正确');
    } else if (error.errno === 'ENOTFOUND') {
      console.error('无法找到数据库主机，请检查主机配置是否正确');
    }
  } finally {
    // 关闭连接
    if (connection) {
      await connection.end();
      console.log('数据库连接已关闭');
    }
  }
};

// 运行初始化
initDb();