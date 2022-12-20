import axios from "axios"
import ps5 from '../../assets/ps5.jpg'
import unbound from '../../assets/unbound.jpg'
import RogPhone from '../../assets/RogPhone.jpg'
import FallenOrder from '../../assets/FallenOrder.jpg'
import GamePass from '../../assets/GamePass.jpg'

import { useEffect, useState } from "react"
import { AdminLoginButton } from "../../components/AdminLoginButton";
import { ProductCard } from "../../components/ProductCard";
import { Spinner } from "../../components/Spinner";
import PuffLoader from "react-spinners/PuffLoader";
import '../../styles/pages/Home/Home.css'



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

            <div className="ads-container">
              <div className="ads">
                <div className="bg-image" style={{ background: `url(${FallenOrder})  center center`, backgroundSize: "cover" }}></div>
                <div className="content">
                  <h2 className="title">Nagyszerű leárazás a Star Wars Jedi Fallen Order játékra!</h2>
                </div>
              </div>
              <div className="ads">
                <div className="bg-image" style={{ background: `url(${unbound})1px center`, backgroundSize: "cover" }}></div>
                <div className="content">
                  <h2 className="title">Need for Speed Unbound megvásárolható!</h2>
                </div>
              </div>
              <div className="ads">
                <div className="bg-image" style={{ background: `url(${ps5}) center center`, backgroundSize: "cover" }}></div>
                <div className="content">
                  <h2 className="title">Újra megvásárolható PS4 Konzol!</h2>
                  <h2 className="title">Rendeld meg most!</h2>
                </div>
              </div>
              <div className="ads">
                <div className="bg-image" style={{ background: `url(${RogPhone})  center center`, backgroundSize: "cover" }}></div>
                <div className="content">
                  <h2 className="title">A telefon egy Gamer PC teljesitményével a zsebedben!</h2>
                </div>
              </div>
              <div className="ads">
                <div className="bg-image" style={{ backgroundImage: `url(${GamePass} )`, backgroundSize: "cover" }}></div>
                <div className="content">
                  <h2 className="title">Xbox Game Pass 1 hónapos tagság!</h2>
                </div>
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




            <AdminLoginButton />
          </div >


        )}
    </div>
  )
}