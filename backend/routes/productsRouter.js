const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware')
const { getProducts,getSingleProduct, setProduct, deleteProduct, updateProduct } = require('../controllers/product.controller')

router.get('/', getProducts)
router.get('/:productId', getSingleProduct)
router.post('/',protect, setProduct)
router.delete('/:productId',protect, deleteProduct)
router.put('/:productId',protect, updateProduct)

module.exports = router;