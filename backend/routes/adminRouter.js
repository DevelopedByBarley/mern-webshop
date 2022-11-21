const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware')

const { loginAdmin, getMe } = require('../controllers/admin.controller')

//router.post('/register', registerAdmin)
router.post('/login', loginAdmin)
router.get('/getMe',protect, getMe)


module.exports = router;