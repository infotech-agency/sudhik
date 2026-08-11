const express = require('express');
const productController = require('../controllers/productController');
const { protect, admin } = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const { rules, validate } = require('../utils/validators');

const router = express.Router();

// --- Public product catalog ---
router.get('/', productController.listProducts);
router.get('/admin', protect, admin, productController.listProductsAdmin);
router.get('/:id', productController.getProduct);

// --- Admin product CRUD ---
router.post(
  '/',
  protect,
  admin,
  upload.array('images', 5),
  rules.product,
  validate,
  productController.createProduct
);
router.put(
  '/:id',
  protect,
  admin,
  upload.array('images', 5),
  productController.updateProduct
);
router.delete('/:id', protect, admin, productController.deleteProduct);

// --- Categories ---
router.post('/categories', protect, admin, rules.category, validate, productController.createCategory);
router.get('/categories/all', productController.listCategories);
router.delete('/categories/:id', protect, admin, productController.deleteCategory);

module.exports = router;
