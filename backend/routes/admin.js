const express = require('express');
const router = express.Router();
const { login, getAdminInfo, changePassword } = require('../controllers/adminController');
const adminAuth = require('../middleware/adminAuth');
const Admin = require('../models/Admin');

// 管理员登录
router.post('/login', login);

// 获取管理员信息（用于测试）
router.get('/info/:username', getAdminInfo);

// 修改管理员密码
router.put('/change-password', adminAuth, changePassword);

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

module.exports = router;