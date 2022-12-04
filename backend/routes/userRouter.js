const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware')
const { register, login, getMe, getOrders } = require('../controllers/user.controller')

router.post('/register', register)
router.post('/login', login)
router.get('/getMe', protect, getMe)
router.get('/getOrders', protect, getOrders)

module.exports = router;