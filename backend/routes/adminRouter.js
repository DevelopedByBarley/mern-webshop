const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware')

const { loginAdmin, registerAdmin, getMe, getOrders } = require('../controllers/admin.controller')

router.post('/register', registerAdmin)
router.post('/login', loginAdmin)
router.get('/getMe', protect, getMe)
router.get('/getOrders', protect, getOrders)


module.exports = router;