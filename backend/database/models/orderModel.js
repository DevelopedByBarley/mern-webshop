const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  paymentType: {
    type: String,
    required: true
  },
  shippingType: {
    type: String,
    required: true
  },
  user: {
    email: { type: String, required: true },
    userName: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    settlement: { type: String, required: true },
    street: { type: String, required: true },
    streetNumber: { type: String, required: true },
    postCode: { type: String, required: true },
    phoneNumber: { type: String, required: true },
  },
  shoppingCart: [{
    title: { type: String, required: true },
    type: { type: String, required: true },
    manufacturer: { type: String, required: true },
    guarantee: { type: String, required: false },
    isInStock: { type: Boolean, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    video: { type: String, required: false },
    image: { type: String, required: false },
    discount: { type: Number, required: false },
    quantity: { type: Number, required: true, }
  }],
  state: {
    type: String,
    default: "under process"
  }
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema)