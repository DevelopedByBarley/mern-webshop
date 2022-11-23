const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware')
const { register, login, shoppingCart, getMe } = require('../controllers/user.controller')

router.post('/register', register)
router.post('/login', login)
router.get('/getMe', protect, getMe)

module.exports = router;