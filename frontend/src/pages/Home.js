import axios from "axios"
import { useEffect, useState } from "react"
import { AdminLoginButton } from "../components/AdminLoginButton";
import { ProductCard } from "../components/ProductCard";
import { Spinner } from "../components/Spinner";
import PuffLoader from "react-spinners/PuffLoader";
import '../styles/pages/Home.css'



export function Home({ getProductSingle }) {

  const [discountProducts, setDiscountProducts] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [gamingConsoleProducts, setGamingConsoleProducts] = useState([]);
  const [isPending, setPending] = useState(true);


  // Get all of products
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {


      axios.get('/api/products/productQueries')
        .then((res) => {
          setDiscountProducts(res.data.discountProducts)
          setLatestProducts(res.data.latestProducts)
          setGamingConsoleProducts(res.data.gamingConsoles)
        })
        .finally(() => { setPending(false) })
    }, 1200)
  }, [])








  return (
    <div>
      {isPending ? (
        <Spinner color={"#9b3b40"} size={100} SpinnerName={PuffLoader} isFullPage={true} />
      )
        :
        (
          <div className="home-container">
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

            <div className="gaming-consoles-container">
              <h1 className="gaming-consoles-title products-title">Hogy legyen mivel játszani!</h1>
              <div className="gaming-consoles">
                {gamingConsoleProducts.map((product) => {
                  return <ProductCard key={product._id} product={product} getProductSingle={getProductSingle} />
                })}
              </div>
            </div>

            <AdminLoginButton/>
          </div >
        )}
    </div>
  )
}