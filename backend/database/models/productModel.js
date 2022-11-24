const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
  categorie: { type: String, required: true },
  manufacturer: { type: String, required: true },
  guarantee: { type: String, required: false },
  isInStock: { type: Boolean, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  video: { type: String, required: false },
  image: { type: String, required: false },
  discount: { type: Number, required: false},
  cart: [{}]
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)