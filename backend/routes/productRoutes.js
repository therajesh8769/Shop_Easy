const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const isAdmin = require('../middlewares/isAdmin');
const {
  createProduct,
  getProductStats,
  getAllProducts,
  getProductById,
  deleteProduct,
  editProduct
} = require('../controllers/productController');

// Create product (admin only)
router.post('/create', isAdmin, upload.array('images', 5), createProduct);

router.get('/stats', getProductStats);

// Get all products
router.get('/', getAllProducts);

// Get product by ID
router.get('/:id', getProductById);

//edit product

router.put('/:id',isAdmin, upload.array('images', 5), editProduct);

// Delete product (admin only)
router.delete('/:id', isAdmin, deleteProduct);


module.exports = router;
