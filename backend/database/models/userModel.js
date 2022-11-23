const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true },
  userName: { type: String, required: true},
  password: { type: String, required: true },
  cart: { type: [{String}], required: false },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  settlement: { type: String, required: true },
  street: { type: String, required: true },
  streetNumber: { type: String, required: true },
  postCode: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  shoppingCart: [{type: String, required: false}]
})

module.exports = mongoose.model('User', userSchema)