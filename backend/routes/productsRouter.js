const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware')
const { getProducts, setProduct, deleteProduct, updateProduct } = require('../controllers/product.controller')

router.get('/', protect, getProducts)
router.post('/',protect, setProduct)
router.delete('/:productId',protect, deleteProduct)
router.put('/:productId',protect, updateProduct)

module.exports = router;