const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
  relaseDate: {type: String, required: true},
  softwareType: { type: String},
  platform: { type: String, required: true },
  categories: { type: String, required: true },
  guarantee: { type: String, required: false },
  isInStock: { type: Boolean, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  video: { type: String, required: false},
  image: { type: String, required: false },
  discount: { type: Number, required: false },
  quantity: { type: Number, required: false, default: 1 },
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)