import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export function Home({ setShoppingCart }) {
  const [products, setProduct] = useState([]);


  // Get all of products
  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProduct(res.data.products))
  }, [])


  // Get a single product and set the state

  async function getProductSingle(productId) {
    const res = await axios.get(`/api/products/${productId}`)
    const product = res.data.product
    setShoppingCart((prev) => {
      const next = [...prev];
      const id = product._id;
      const index = next.find(item => item._id === id);
      if(!index) {
        next.push(product);
      } else {
        index.quantity = index.quantity + 1
      }
      return next;
    })
  }










  return (
    <div className="home-container">
      <h1>Home</h1>

      {products.map((product) => {
        return (
          <div key={product._id} className="product-card" >
            <Link to={`/product-single/${product._id}`}>
              <div className="product-header" style={{ border: "1px solid" }}>
                <h1>{product.title}</h1>
                <h1>{product._id}</h1>
              </div>
            </Link>
            <button className="add-to-cart" onClick={() => { getProductSingle(product._id) }}>cart </button>
          </div>
        )
      })}
    </div >
  )
}