const express = require('express');
const router = express.Router();
const { login, getAdminInfo } = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth');
const Admin = require('../models/Admin');

// 管理员登录
router.post('/login', login);

// 获取管理员信息（用于测试）
router.get('/info/:username', getAdminInfo);

// 测试密码哈希（用于调试）
router.post('/test-hash', async (req, res) => {
  try {
    const { password } = req.body;
    const hashed = await Admin.testHashPassword(password);
    res.json({ hashed });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 重置默认管理员密码（用于修复问题）
router.post('/reset-password', async (req, res) => {
  try {
    const hashedPassword = await Admin.resetDefaultAdminPassword();
    res.json({ message: '默认管理员密码已重置', hashedPassword });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;