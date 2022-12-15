const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new Schema({
  userName: { type: String },
  content: { type: String }
})

const productSchema = new Schema({
  title: { type: String, required: true },
  relaseDate: { type: Date, required: true },
  softwareType: { type: String },
  platform: { type: String, required: true },
  categories: { type: String, required: true },
  guarantee: { type: String, required: false },
  isInStock: { type: Boolean, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  video: { type: String, required: false },
  image: { type: String, required: false },
  discount: { type: Number, required: true },
  quantity: { type: Number, required: true, default: 1 },
  comments: [commentSchema]
}, { timestamps: true })

module.exports = mongoose.model('Product', productSchema)