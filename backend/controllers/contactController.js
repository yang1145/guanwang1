const ContactMessage = require('../models/ContactMessage');

// 提交联系表单
const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: '请提供姓名、邮箱和留言内容' });
    }
    
    // 简单邮箱验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: '请提供有效的邮箱地址' });
    }
    
    const messageId = await ContactMessage.create({ name, email, phone, message });
    
    res.status(201).json({
      message: '留言提交成功',
      data: { id: messageId }
    });
  } catch (error) {
    console.error('提交联系表单时出错: ' + error.stack);
    res.status(500).json({ error: '提交失败，请稍后重试' });
  }
};

// 获取所有联系信息（管理接口）
const getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.getAll();
    
    res.json({
      message: '联系信息获取成功',
      data: messages
    });
  } catch (error) {
    console.error('获取联系信息时出错: ' + error.stack);
    res.status(500).json({ error: '获取联系信息失败' });
  }
};

// 获取特定联系信息（管理接口）
const getMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await ContactMessage.getById(id);
    
    if (!message) {
      return res.status(404).json({ error: '未找到该联系信息' });
    }
    
    res.json({
      message: '联系信息获取成功',
      data: message
    });
  } catch (error) {
    console.error('获取联系信息时出错: ' + error.stack);
    res.status(500).json({ error: '获取联系信息失败' });
  }
};

module.exports = {
  submitContactForm,
  getAllMessages,
  getMessageById
};