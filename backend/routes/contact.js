const express = require('express');
const router = express.Router();
const {
  submitContactForm,
  getAllMessages,
  getMessageById
} = require('../controllers/contactController');

// 提交联系表单
router.post('/', submitContactForm);

// 获取所有联系信息（管理接口）
router.get('/', getAllMessages);

// 获取特定联系信息（管理接口）
router.get('/:id', getMessageById);

module.exports = router;