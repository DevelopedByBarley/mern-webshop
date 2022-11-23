import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export function Home() {
  const [products, setProduct] = useState([]);
  useEffect(() => {
    axios.get('/api/products')
      .then(res => setProduct(res.data.products))
  }, [])
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
            <button className="add-to-cart">cart </button>
          </div>
        )
      })}
    </div >
  )
}