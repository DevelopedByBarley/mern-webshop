const express = require('express');
const Order = require('../database/models/order')
const router = express.Router();

router.post('/', async (req, res) => {
  const { user, shoppingCart, shippingType, paymentType } = req.body;
  try {
    const order = await Order.create({
      user: user,
      shippingType: shippingType,
      paymentType: paymentType,
      shoppingCart: shoppingCart
    })
    if(order) {
      res.json({message: "Product is ordered succesfully", order: order})
    }
    } catch (error) {
      res.json({message: "Product ordering error!", order: false})
      console.log(error);
  }
})


module.exports = router;