import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { Spinner } from "../components/Spinner";
import { Toast } from "../components/Toast";

export function Home({ setShoppingCart }) {
  const [products, setProduct] = useState([]);
  const [isPending, setPending] = useState(true);
  const [isToastActive, setToastActive] = useState(false);


  // Get all of products
  useEffect(() => {
    setTimeout(() => {
      axios.get('/api/products')
        .then(res => setProduct(res.data.products))
        .finally(() => { setPending(false) })
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







  const homeStyles = {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gridGap: "1rem",
    margin: "3rem"
  }

  const imageStyles = {
    width: "100%",
    height: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "3rem"
  }


  return (
    <div>
      {
        isToastActive && <Toast
          setToastActive={setToastActive}
          toastMessage={"Termék hozzáadva a kosárhoz!"}
          duration={2000} color={"#53BF9D"} />
      }

      {isPending ? (
        <Spinner />
      )
        :
        (
          <div className="home-container" style={homeStyles}>
            {products.map((product) => {
              return (
                <div key={product._id} className="product-card" style={{ boxShadow: "-1px 3px 19px -5px rgba(0,0,0,0.75)", padding: "1rem", borderRadius: "20px" }} >
                  <Link to={`/product-single/${product._id}`}>
                    <div className="product-header" >
                      <div className="product-image" style={imageStyles}>
                        <img style={{ height: "100%", width: "250px" }} src={`/assets/files/${product.image}`} alt="product-image" />
                      </div>
                      <h1>{product.title}</h1>
                      <h2 style={{ color: `${product.isInStock ? "green" : "red"}` }}>{product.isInStock ? "Készleten!" : "Nem elérhető!"}</h2>
                      <h4>Ár:{product.price} Ft</h4>

                    </div>
                  </Link>
                  <button disabled={!product.isInStock} className="add-to-cart" onClick={() => {
                    getProductSingle(product._id)
                    setToastActive(true)

                  }}>cart </button>
                </div>
              )
            })}
          </div >
        )}
    </div>
  )
}