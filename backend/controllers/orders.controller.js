const stripe = require("stripe")("sk_test_51M9RTYI38BdKXLU04UDDvzXyRq3MG0fE9sMQdxteOoVkjcQaEHZ2sRsf5aTTQlpIKFAdBe78W9R2ff8L2x3CT8Jy00CTDXBKje")
const Order = require('../database/models/orderModel')


const sendOrderWithoutPay = async (req, res) => {
  const { user, shoppingCart, shippingType, paymentType } = req.body;
  try {
    const order = await Order.create({
      user: user,
      shippingType: shippingType,
      paymentType: paymentType,
      shoppingCart: shoppingCart
    })
    if (order) {
      res.json({ message: "Product is ordered succesfully", order: order })
    }
  } catch (error) {
    res.json({ message: "Product ordering error!", order: false })
    console.log(error);
  }
}

const payCardOnline = async (req, res) => {
  const { user, shoppingCart, shippingType, paymentType } = req.body;



  const storeItems = new Map([]);
  shoppingCart.map((item) => {

    storeItems.set(item._id, { price: item.price, title: item.title })

  })

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: shoppingCart.map(item => {
        const storeItem = storeItems.get(item._id)
        console.log(storeItem);
        return {
          price_data: {
            currency: "huf",
            product_data: {
              name: storeItem.title,
            },
            unit_amount: storeItem.price * 100,
          },
          quantity: item.quantity,
        }
      }),
      success_url: `${process.env.CLIENT_URL}/`,
      cancel_url: `${process.env.CLIENT_URL}/`,
    })
    if (session.url) {
      await Order.create({
        user: user,
        shippingType: shippingType,
        paymentType: paymentType,
        shoppingCart: shoppingCart
      })
    }
    res.json({ url: session.url })
  } catch (e) {
    console.log(e)
    res.json({ error: e.message })
  }
}


const getOrders = async (req,res) => {
  const {admin} = req;
  if(admin) {
    const orders = await Order.find({});
    res.json({message: "Orders found!", orders: orders})
  } else {
    res.json({message: "Orders finding error!", orders: orders})
  }
}

module.exports = {
  sendOrderWithoutPay,
  payCardOnline,
  getOrders
}