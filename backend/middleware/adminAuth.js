const Admin = require('../models/Admin');

const adminAuth = async (req, res, next) => {
  try {
    // 在实际应用中，这里应该验证JWT令牌或会话
    // 目前我们使用一个模拟的认证方式
    req.admin = {
      id: 1,
      username: 'admin'
    };
    
    next();
  } catch (error) {
    res.status(401).json({ error: '访问被拒绝' });
  }
};

module.exports = adminAuth;