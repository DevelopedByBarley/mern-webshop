import axios from "axios"
import { TbTruckDelivery } from 'react-icons/tb'
import { BsBagCheck } from 'react-icons/bs'
import { AiOutlineDollarCircle } from 'react-icons/ai'
import { useEffect, useState } from "react"
import { AdminLoginButton } from "../../components/AdminLoginButton";
import { ProductCard } from "../../components/ProductCard";
import { Spinner } from "../../components/Spinner";
import PuffLoader from "react-spinners/PuffLoader";
import '../../styles/pages/Home/Home.css'
import { ImageSlider } from "../../components/ImageSlider"



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
                <div className="bg-image" style={{ background: `url(https://i.imgur.com/to5Zw8l.jpg)  center center`, backgroundSize: "cover" }}></div>
                <div className="content">
                  <h2 className="title">Nagyszerű leárazás a Star Wars Jedi Fallen Order játékra!</h2>
                </div>
              </div>
              <div className="ads">
                <div className="bg-image" style={{ background: `url(https://i.imgur.com/l809yPd.png)1px center`, backgroundSize: "cover" }}></div>
                <div className="content">
                  <h2 className="title">Need for Speed Unbound megvásárolható!</h2>
                </div>
              </div>
              <div className="ads">
                <div className="bg-image" style={{ background: `url(https://i.imgur.com/WJHYtW6.jpg) center center`, backgroundSize: "cover" }}></div>
                <div className="content">
                  <h2 className="title">Újra megvásárolható PS4 Konzol!</h2>
                  <h2 className="title">Rendeld meg most!</h2>
                </div>
              </div>
              <div className="ads">
                <div className="bg-image" style={{ background: `url(https://i.imgur.com/H2q3RPO.jpg)  center center`, backgroundSize: "cover" }}></div>
                <div className="content">
                  <h2 className="title">A telefon egy Gamer PC teljesitményével a zsebedben!</h2>
                </div>
              </div>
              <div className="ads">
                <div className="bg-image" style={{ backgroundImage: `url(https://i.imgur.com/eqd3iWX.jpg )`, backgroundSize: "cover" }}></div>
                <div className="content">
                  <h2 className="title">Xbox Game Pass 1 hónapos tagság!</h2>
                </div>
              </div>
            </div>


            <div className="fast-info-container">
              <div className="fast-info-card">
                <div className="icons">
                  <AiOutlineDollarCircle size={80} className="icon" color={"white"} />
                </div>
                <div className="content" >
                  <h1 className="title">Ingyenes szállitás!</h1>
                </div>
              </div>
              <div className="fast-info-card">
                <div className="icons">
                  <BsBagCheck size={80} className="icon" color={"white"} />
                </div>
                <div className="content">
                  <h1 className="title">Gyors vásárlás!</h1>
                </div>
              </div>
              <div className="fast-info-card">
                <div className="icons">
                  <TbTruckDelivery size={80} className="icon" color={"white"} />
                </div>
                <div className="content">
                  <h1 className="title">Kiszállitás akár 1 napon belül!</h1>
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