
const Product = require('../database/models/productModel');
const fs = require('fs');





const getProducts = async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(200).json({ products: products, message: "Product is successfully found!" })
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Products finding Error!' })
  }
}

const getProductsByPlatform = async (req, res) => {
  const platformType = req.params.platformType;
  
  try {
    const products = await Product.find({
      platform: platformType
    })
    res.json({products: products})
  } catch (error) {
    console.log(error)
  }
}






const productQueries = async (req, res) => {
  const discountProducts = await Product.where("discount").gt(0).limit(10);
  const latestProducts = await Product.find({}).sort({ _id: -1 }).limit(10);
  const gamingConsoles = await Product.find({
    categories: "játékkonzol",
  }).limit(3);
  const smartWatches = await Product.find({
    categories: "okosóra"
  }).limit(5);

  res.json({ discountProducts, latestProducts, gamingConsoles, smartWatches });
}


const searchProducts = async (req, res) => {
  const { title } = req.body;
  let query = Product.find();
  if (title != null && title != '') {
    query = query.regex('title', new RegExp(title, 'i')).limit(8)
  }

  try {
    const products = await query.exec();
    res.send(products)
  } catch (error) {
    console.log(error)
  }
}


const sameProducts = async (req, res) => {
  const { id, categories, softwareType } = req.body;
  try {
    const sameProducts = await Product.find({
      categories: categories,
      softwareType: softwareType,
    }).limit(6)


    const index = sameProducts.findIndex(product => product.id === id);
    sameProducts.splice(index, 1)

    res.json({ message: "Same products found for you!", sameProducts: sameProducts })
  } catch (error) {
    res.json({ message: "Same products finding error!", sameProducts: false })
  }
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
  const discountedPrice = discount ? price - price * (discount / 100) : price;

  try {
    const newProduct = await Product.create({
      title: product.title,
      relaseDate: product.relaseDate,
      platform: product.platform,
      categories: product.categories,
      softwareType: product.softwareType,
      manufacturer: product.manufacturer,
      guarantee: product.guarantee,
      isInStock: product.isInStock,
      discount: discount,
      price: Math.round(discountedPrice, 1),
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
  const parsedProduct = JSON.parse(product)
  const { discount, price } = parsedProduct;
  let fileName
  const discountedPrice = discount ? price - price * (discount / 100) : price;



  try {
    if (req.file) {
      fileName = req.file.filename

      fs.unlink(`./backend/public/assets/files/${imageNameForDelete}`, function (err) {
        console.log('file deleted successfully');
      });
    }

    const newProduct = {
      title: parsedProduct.title,
      relaseDate: parsedProduct.relaseDate,
      platform: parsedProduct.platform,
      categories: parsedProduct.categories,
      softwareType: parsedProduct.softwareType,
      company: parsedProduct.company,
      guarantee: parsedProduct.guarantee,
      isInStock: parsedProduct.isInStock,
      discount: discount,
      price: Math.round(discountedPrice, 1),
      description: parsedProduct.description,
      video: parsedProduct.video,
      image: fileName
    }


    const product = await Product.findByIdAndUpdate({ _id: productId }, newProduct, { new: true });
    res.status(200).json({ product: product, message: "Product is successfully Updated!" })
  } catch (error) {
    console.log(error);
  }

}




const sendComment = async (req, res) => {
  const { id, userName, content } = req.body;

  const newComment = {
    userName: userName,
    content: content
  }

  try {
    const product = await Product.findByIdAndUpdate(
      { _id: id },
      { $push: { comments: newComment } },
      { returnOriginal: false }
    )

    if (product) {
      res.json({ message: "Product comment added succesfully!", newComment: newComment })
    }
  } catch (error) {
    res.json({ message: "Product comment erorr!", product: false })
    console.log(error)
  }
}


const deleteComment = async (req, res) => {
  const { id, commentId } = req.body

  try {
    await Product.findByIdAndUpdate(
      { _id: id },
      { $pull: { comments: { _id: commentId } } },
      { multi: true }
    )
    res.json({ message: "Comment deleted successfully!", commentId: commentId })

  } catch (error) {
    res.json({ message: "Comment delete error!", commentId: false })
  }


}






module.exports = {
  getProducts,
  productQueries,
  searchProducts,
  sameProducts,
  getSingleProduct,
  setProduct,
  deleteProduct,
  updateProduct,
  sendComment,
  deleteComment,
  getProductsByPlatform,
}


/**
 *   if (title != null && title != '') {
    query =  query.regex('title', new RegExp(title, 'i'))
  }
  if (platform != null && platform != '') {
    query = query.regex('platform', new RegExp(platform, 'i'))
  }
  if (categories != null && categories != '') {
    query = query.regex('categories', new RegExp(categories, 'i'))
  }
  if (softwareType != null && softwareType != '') {
    query = query.regex('softwareType', new RegExp(softwareType, 'i'))
  }
  if (discount != null && discount != '' ) {
    query = query.where('discount').gt(1)
  }
  if (isInStock != null && isInStock != '') {
    query = query.where('isInStock').equals(isInStock)
  }

  if(gtPrice != null && gtPrice != '') {
    query = query.where('price').gte(gtPrice)
  }
  if(ltPrice != null && ltPrice != '') {
    query = query.where('price').lte(ltPrice)
  }

 * 
 */