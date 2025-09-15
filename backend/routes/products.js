const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// 获取所有产品
router.get('/', getAllProducts);

// 获取特定产品详情
router.get('/:id', getProductById);

// 创建新产品
router.post('/', createProduct);

// 更新产品
router.put('/:id', updateProduct);

// 删除产品
router.delete('/:id', deleteProduct);

module.exports = router;