import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Spinner } from "../components/Spinner";

export function Home({ setShoppingCart }) {
  const [products, setProduct] = useState([]);
  const [isPending, setPending] = useState(true);


  // Get all of products
  useEffect(() => {
    setTimeout(() => {
      axios.get('/api/products')
        .then(res => setProduct(res.data.products))
        .finally(() => {setPending(false)})
    }, 1200)
  }, [])


  // Get a single product and set the state

  async function getProductSingle(productId) {
    const res = await axios.get(`/api/products/${productId}`)
    const product = res.data.product
    setShoppingCart((prev) => {
      const next = [...prev];
      const id = product._id;
      let duplicatedItem = next.find(item => item._id === id);
      if (!duplicatedItem) {
        next.push(product);
      } else {
        duplicatedItem.quantity += 1
      }
      return next;
    })
  }










  return (
    <div>
      {isPending ? (
        <Spinner />
      )
        :
      (
          <div className="home-container">
            <h1>Home</h1>

            {products.map((product) => {
              return (
                <div key={product._id} className="product-card" >
                  <Link to={`/product-single/${product._id}`}>
                    <div className="product-header" style={{ border: "1px solid" }}>
                    <img style={{height: "100px", width: "200px"}} src={`/assets/files/${product.image}`}/>
                      <h1>{product.title}</h1>
                      <h1>{product.price}</h1>
                    </div>
                  </Link>
                  <button className="add-to-cart" onClick={() => { getProductSingle(product._id) }}>cart </button>
                </div>
              )
            })}
          </div >
        )}
    </div>
  )
}