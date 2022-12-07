
const Product = require('../database/models/productModel');
const fs = require('fs');
const { fork } = require('child_process');





const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json({ products: products, message: "Product is successfully found!" })
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Products finding Error!' })
  }
}






const productQuerys = async (req, res) => {
  const discountProducts = await Product.where("discount").gt(0).limit(10);
  const latestProducts = await Product.find().sort({_id: -1}).limit(10);

  res.json({discountProducts: discountProducts, latestProducts: latestProducts});
}






const getSingleProduct = async (req, res) => {
  const id = req.params.productId

  try {
    const product = await Product.findById(id);
    res.json({ product: product, message: 'Product is succisfully found' });
  } catch (error) {
    console.log(error);
  }

}





const setProduct = async (req, res) => {

  const fileName = req.file.filename
  const product = JSON.parse(req.body.product);
  const { discount, price } = product


  try {
    const newProduct = await Product.create({
      title: product.title,
      type: product.type,
      manufacturer: product.manufacturer,
      guarantee: product.guarantee,
      isInStock: product.isInStock,
      discount: discount,
      price: discount ? price - price * (discount / 100) : price,
      description: product.description,
      video: product.video,
      image: fileName
    })

    res.status(200).json({ newProduct: newProduct, message: "Product is successfully created!" })

  } catch (error) {
    console.log(error);
  }

}






const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  const { image } = await Product.findById(productId)

  try {
    const deletedProductId = await Product.findByIdAndDelete(productId);
    if (deletedProductId) {
      fs.unlink(`./backend/public/assets/files/${image}`, function (err) {
        if (err) return console.log(err);
        console.log('file deleted successfully');
      });
    }
    res.status(200).json({ id: productId, message: "Product is successfully deleted!" })

  } catch (error) {
    console.log(error);
  }

}






const updateProduct = async (req, res) => {
  const { productId } = req.params;
  const { product, imageNameForDelete } = req.body
  const parsedProduct =JSON.parse(product)
  const { discount, price } = parsedProduct;
  let fileName


  
  
  try {
    if (req.file) {
      fileName = req.file.fileName
      fs.unlink(`./backend/public/assets/files/${imageNameForDelete}`, function (err) {
        console.log('file deleted successfully'); 
      });
    }
    const newProduct = {
      title: parsedProduct.title,
      type: parsedProduct.type,
      manufacturer: parsedProduct.manufacturer,
      guarantee: parsedProduct.guarantee,
      isInStock: parsedProduct.isInStock,
      discount: discount,
      price: discount ? price - price * (discount / 100) : price,
      description: parsedProduct.description,
      video: parsedProduct.video,
      image: fileName
    }
    console.log(newProduct.video)
    const product = await Product.findByIdAndUpdate({ _id: productId }, newProduct, { new: true });
    res.status(200).json({ product: product, message: "Product is successfully Updated!" })
  } catch (error) {
    console.log(error);
  }

}






module.exports = {
  getProducts,
  productQuerys,
  getSingleProduct,
  setProduct,
  deleteProduct,
  updateProduct
}