const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  title: { type: String, required: true },
  categorie: { type: String, required: true },
  manufacturer: { type: String, required: true },
  guarantee: { type: String, required: false },
  isInStock: { type: Boolean, required: true },
  grossPrice: { type: String, required: true },
  netPrice: { type: String, required: true },
  description: { type: String, required: true },
  video: { type: String, required: false },
  image: { type: String, required: false }
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)