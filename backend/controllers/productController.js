const Product = require('../models/Product');

// 获取所有产品
const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const products = await Product.getAll(category);
    
    res.json({
      message: '产品获取成功',
      data: products
    });
  } catch (error) {
    console.error('获取产品时出错: ' + error.stack);
    res.status(500).json({ error: '获取产品失败' });
  }
};

// 获取特定产品详情
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.getById(id);
    
    if (!product) {
      return res.status(404).json({ error: '未找到该产品' });
    }
    
    res.json({
      message: '产品详情获取成功',
      data: product
    });
  } catch (error) {
    console.error('获取产品详情时出错: ' + error.stack);
    res.status(500).json({ error: '获取产品详情失败' });
  }
};

// 创建新产品
const createProduct = async (req, res) => {
  try {
    const { name, description, category, image_url } = req.body;
    
    if (!name || !description || !category) {
      return res.status(400).json({ error: '请提供产品名称、描述和分类' });
    }
    
    const productId = await Product.create({ name, description, category, image_url });
    
    res.status(201).json({
      message: '产品创建成功',
      data: { id: productId }
    });
  } catch (error) {
    console.error('创建产品时出错: ' + error.stack);
    res.status(500).json({ error: '创建产品失败' });
  }
};

// 更新产品
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, category, image_url } = req.body;
    
    // 检查产品是否存在
    const existingProduct = await Product.getById(id);
    if (!existingProduct) {
      return res.status(404).json({ error: '未找到该产品' });
    }
    
    const result = await Product.update(id, { name, description, category, image_url });
    
    if (result === 0) {
      return res.status(400).json({ error: '更新产品失败' });
    }
    
    res.json({
      message: '产品更新成功',
      data: { id: parseInt(id) }
    });
  } catch (error) {
    console.error('更新产品时出错: ' + error.stack);
    res.status(500).json({ error: '更新产品失败' });
  }
};

// 删除产品
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    
    // 检查产品是否存在
    const existingProduct = await Product.getById(id);
    if (!existingProduct) {
      return res.status(404).json({ error: '未找到该产品' });
    }
    
    const result = await Product.delete(id);
    
    if (result === 0) {
      return res.status(400).json({ error: '删除产品失败' });
    }
    
    res.json({
      message: '产品删除成功',
      data: { id: parseInt(id) }
    });
  } catch (error) {
    console.error('删除产品时出错: ' + error.stack);
    res.status(500).json({ error: '删除产品失败' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};