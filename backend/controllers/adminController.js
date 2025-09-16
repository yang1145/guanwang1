const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');

// 管理员登录
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 检查是否提供了用户名和密码
    if (!username || !password) {
      console.log('登录失败：未提供用户名或密码');
      return res.status(400).json({ error: '请提供用户名和密码' });
    }

    console.log(`收到登录请求，用户名: ${username}`);
    console.log(`请求体内容:`, req.body);

    // 获取管理员信息
    const admin = await Admin.getByUsername(username);
    if (!admin) {
      console.log(`登录失败：用户 ${username} 不存在`);
      return res.status(401).json({ error: '用户名或密码错误' });
    }

    console.log(`找到用户 ${username}，开始验证密码`);
    console.log(`数据库中的密码哈希: ${admin.password}`);
    console.log(`用户输入的密码: ${password}`);

    // 验证密码
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    console.log(`密码验证结果: ${isPasswordValid}`);
    
    if (!isPasswordValid) {
      console.log(`登录失败：用户 ${username} 密码错误`);
      return res.status(401).json({ error: '用户名或密码错误' });
    }

    console.log(`用户 ${username} 登录成功`);

    // 登录成功，返回管理员信息（不包含密码）
    res.json({
      message: '登录成功',
      data: {
        admin: {
          id: admin.id,
          username: admin.username
        }
      }
    });
  } catch (error) {
    console.error('管理员登录时出错: ' + error.stack);
    res.status(500).json({ error: '登录失败：服务器内部错误' });
  }
};

// 获取管理员信息（用于测试）
const getAdminInfo = async (req, res) => {
  try {
    const { username } = req.params;
    const admin = await Admin.getByUsername(username);
    
    if (!admin) {
      return res.status(404).json({ error: '管理员不存在' });
    }
    
    // 不返回密码字段
    const { password, ...adminInfo } = admin;
    res.json({ data: adminInfo });
  } catch (error) {
    console.error('获取管理员信息时出错: ' + error.stack);
    res.status(500).json({ error: '获取管理员信息失败' });
  }
};

// 修改管理员密码
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const adminId = req.admin.id; // 从认证中间件获取管理员ID

    // 检查是否提供了所有必需的字段
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({ error: '请提供当前密码、新密码和确认新密码' });
    }

    // 检查新密码和确认密码是否一致
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ error: '新密码和确认密码不一致' });
    }

    // 检查新密码长度（至少6位）
    if (newPassword.length < 6) {
      return res.status(400).json({ error: '新密码长度至少为6位' });
    }

    // 调用模型方法修改密码
    const result = await Admin.changePassword(adminId, currentPassword, newPassword);
    
    if (result) {
      res.json({ message: '密码修改成功' });
    } else {
      res.status(500).json({ error: '密码修改失败' });
    }
  } catch (error) {
    console.error('修改密码时出错:', error);
    if (error.message === '当前密码错误') {
      return res.status(400).json({ error: '当前密码错误' });
    } else if (error.message === '管理员不存在') {
      return res.status(404).json({ error: '管理员不存在' });
    }
    res.status(500).json({ error: '服务器内部错误' });
  }
};

module.exports = {
  login,
  getAdminInfo,
  changePassword
};