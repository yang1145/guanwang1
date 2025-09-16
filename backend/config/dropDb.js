require('dotenv').config();
const mysql = require('mysql2/promise');

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

// 删除数据库
const dropDb = async () => {
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

    // 删除数据库（如果存在）
    await connection.query(`DROP DATABASE IF EXISTS \`${dbName}\``);
    console.log(`数据库 ${dbName} 已删除`);

  } catch (error) {
    console.error('删除数据库时出错: ' + error.message);
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

// 运行删除数据库操作
dropDb();