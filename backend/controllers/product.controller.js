const asyncHandler = require('express-async-handler');
const Product = require('../database/models/productModel')


/**
 * const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/assets/files')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

 const upload = multer({ storage: storage })

 * 
 */


const getProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json({ products: products, message: "Product is successfully found!" })
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Products finding Error!' })
  }
})

const getSingleProduct = asyncHandler(async (req,res) => {
  const id = req.params.productId
  
  try {
    const product = await Product.findById(id);
    res.json({product: product, message: 'Product is succisfully found'});
  } catch (error) {
    console.log(error);
  }

})


const setProduct = asyncHandler(async (req, res) => {

  const { price, discount } = req.body;

  try {
    const newProduct = await Product.create({
      title: req.body.title,
      categorie: req.body.categorie,
      manufacturer: req.body.manufacturer,
      guarantee: req.body.guarantee,
      isInStock: req.body.isInStock,
      discount: discount,
      price: discount ? price - price * (discount / 100) : price,
      description: req.body.description,
      video: req.body.video,
      image: req.body.image,
    })

    res.status(200).json({ newProduct: newProduct, message: "Product is successfully created!" })

  } catch (error) {
    console.log(error);
  }
})

const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  try {
    await Product.findByIdAndDelete(productId);
    res.status(200).json({ id: productId, message: "Product is successfully deleted!" })
  } catch (error) {
    console.log(error);
  }

})

const updateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { price, discount } = req.body;

  const newProduct = {
    title: req.body.title,
    categorie: req.body.categorie,
    manufacturer: req.body.manufacturer,
    guarantee: req.body.guarantee,
    isInStock: req.body.isInStock,
    discount: discount,
    price: discount ? price - price * (discount / 100) : price,
    description: req.body.description,
    video: req.body.video,
    image: req.body.image,
  }

  try {
    const product = await Product.findByIdAndUpdate({ _id: productId }, newProduct, { new: true });
    res.status(200).json({ product: product, message: "Product is successfully Updated!" })
  } catch (error) {
    console.log(error);
  }
})

module.exports = {
  getProducts,
  getSingleProduct,
  setProduct,
  deleteProduct,
  updateProduct
}