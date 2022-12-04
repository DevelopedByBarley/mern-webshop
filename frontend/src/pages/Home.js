import axios from "axios"
import { useEffect, useState } from "react"
import { ProductCard } from "../components/ProductCard";
import { Spinner } from "../components/Spinner";
import '../styles/pages/Home.css'

export function Home({ setShoppingCart }) {
  const [products, setProduct] = useState([]);
  const [discountProducts, setDiscountProducts] = useState([]);
  const [isPending, setPending] = useState(true);


  // Get all of products
  useEffect(() => {
    setTimeout(() => {
      axios.get('/api/products')
      .then(res => setProduct(res.data.products))
      .finally(() => { setPending(false) })
    }, 1200)
    axios.get('/api/products/discountedProducts')
      .then(res => setDiscountProducts(res.data))
  }, [])

  console.log(discountProducts);


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
            <div className="discounts-container">
              <h1>Akciós termékek</h1>
              <div className="discounts">
                {discountProducts.map((product) => {
                  return (
                    <ProductCard product={product} getProductSingle={getProductSingle} />
                  )
                })}
              </div>
            </div>
          </div >
        )}
    </div>
  )
}