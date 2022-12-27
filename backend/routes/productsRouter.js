const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware')
const {
  getProducts,
  getProductsByPlatform,
  productQueries,
  searchProducts,
  sameProducts,
  getSingleProduct,
  setProduct,
  deleteProduct,
  updateProduct,
  sendComment,
  deleteComment
} = require('../controllers/product.controller')
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
router.get('/productQueries', productQueries)
router.get('/:productId', getSingleProduct);
router.post('/searchProducts', searchProducts)
router.post('/comment', sendComment)
router.put('/comment/delete', deleteComment)
router.post('/sameProducts', sameProducts)
router.post('/', upload.single("coverImage"), protect, setProduct);
router.delete('/:productId', protect, deleteProduct);
router.put('/:productId', upload.single("coverImage"), protect, updateProduct);
router.post('/:platformType', getProductsByPlatform);


module.exports = router;