import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ProductCard } from "../components/ProductCard";
import { Spinner } from "../components/Spinner";
import '../styles/pages/Home.css'



export function Home({ setShoppingCart, getProductSingle }) {
  const [products, setProduct] = useState([]);
  const [discountProducts, setDiscountProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  console.log(latestProducts);
  const [isPending, setPending] = useState(true);


  // Get all of products
  useEffect(() => {
    setTimeout(() => {
      axios.get('/api/products')
        .then(res => setProduct(res.data.products))
        .finally(() => { setPending(false) })
    }, 1200)
    axios.get('/api/products/discountedProducts')
      .then((res) => {
        setDiscountProducts(res.data.discountProducts)
        setLatestProducts(res.data.latestProducts)
      })
  }, [])

  console.log(latestProducts);







  return (
    <div>
      {isPending ? (
        <Spinner />
      )
        :
        (
          <div className="home-container">

            <div className="latest-products-container">
              <h1 className="latest-products-title products-title">Újdonságok</h1>
              <div className="latest-products products">
                {latestProducts.map((product) => {
                  return (
                    <ProductCard key={product._id} product={product} getProductSingle={getProductSingle} />
                  )
                })}
              </div>
            </div>
            <div className="discount-products-container">
              <h1 className="discount-products-title products-title">Kiemelt ajánlataink</h1>
              <div className="discount-products products">
                {discountProducts.map((product) => {
                  return (
                    <ProductCard key={product._id} product={product} getProductSingle={getProductSingle} />
                  )
                })}
              </div>
            </div>
            <Link to="/admin-login">Admin Login</Link>
          </div >
        )}
    </div>
  )
}