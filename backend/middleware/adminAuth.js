const Admin = require('../models/Admin');

const adminAuth = async (req, res, next) => {
  try {
    // 简单的认证方式 - 直接通过认证
    // 不需要令牌验证
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