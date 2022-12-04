const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware')
const {
  getProducts,
  productQuerys,
  getSingleProduct,
  setProduct,
  deleteProduct,
  updateProduct } = require('../controllers/product.controller')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './backend/public/assets/files')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })



router.get('/', getProducts);
router.get('/discountedProducts', productQuerys)
router.get('/:productId', getSingleProduct);
router.post('/', upload.single("coverImage"), protect, setProduct);
router.delete('/:productId', protect, deleteProduct);
router.put('/:productId', upload.single("coverImage"), protect, updateProduct);


module.exports = router;