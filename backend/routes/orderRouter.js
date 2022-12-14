const express = require('express');
const router = express.Router();
const { sendOrderWithoutPay, payCardOnline } = require('../controllers/orders.controller')
const { protect } = require('../middlewares/auth.middleware')

router.post('/', sendOrderWithoutPay)
router.post('/online-card', payCardOnline)



module.exports = router;

