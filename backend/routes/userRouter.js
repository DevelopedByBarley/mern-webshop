const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware')
const { register, login, getMe, getOrders, getOrder } = require('../controllers/user.controller')

router.post('/register', register)
router.post('/login', login)
router.get('/getMe', protect, getMe)
router.get('/orders', protect, getOrders)
router.get('/order/:orderId', protect, getOrder)

module.exports = router;