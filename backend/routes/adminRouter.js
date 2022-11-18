const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/admin.auth.middleware')

const { loginAdmin, getAdmin } = require('../controllers/admin.controller')

//router.post('/register', registerAdmin)
router.post('/login', loginAdmin)
router.get('/admin',protect, getAdmin)


module.exports = router;