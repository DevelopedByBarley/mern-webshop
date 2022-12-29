import '../../styles/pages/Checkout/ShoppingCart.css'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {BackButton} from '../../components/BackButton'
import { Spinner } from "../../components/Spinner";
import PuffLoader from "react-spinners/PuffLoader";
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { CurrencyFormatter } from '../../helpers/CurrencyFormatter';


export function ShoppingCart({ shoppingCart, setShoppingCart }) {
  const [isPending, setPending] = useState(true)


  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      setPending(false)
    }, 1200)
  }, [])



  const deleteCartItem = (productId) => {
    setShoppingCart((prev) => {
      const next = [...prev];
      const index = next.findIndex(item => item._id === productId);
      next.splice(index, 1)
      return next
    })
  }

  const clearCart = () => {
    localStorage.removeItem('shopping_cart');
    setShoppingCart([])
  }

  const setShoppingCartQuantity = (event, productId) => {
    setShoppingCart((prev) => {
      const next = [...prev];
      let index = next.findIndex(item => item._id === productId);
      next[index].quantity = Number(event.target.value);
      return next;
    })
  }


  return (

    <div className="shopping-cart-container">
      {isPending ? (<Spinner color={"#9b3b40"} size={100} SpinnerName={PuffLoader} isFullPage={true} />) : (
        <>
          {shoppingCart.length === 0 ? (
            <div className="shopping-cart-empty">
              <h1 className="shopping-cart-title">A besárálókosarad üres!</h1>
              <Link to='/' className="back-link">Vásárlás folytatása!</Link>
            </div>
          ) : (
            <div className="cart">
              <div className="shopping-cart-header">
                <h1>Kosár tartalma</h1>
                <button className="clear-cart" onClick={clearCart}>Kosár törlése</button>
              </div>
              <div className="shopping-cart-products">
                {shoppingCart.map((product) => {
                  return (

                    <div className="shopping-products-card" key={product._id}>
                      <AiOutlineCloseCircle size={20} className="delete-cart-item" onClick={() => { deleteCartItem(product._id) }} />
                      <input style={{ height: "100px", width: "100px", borderRadius: "50%", margin: ".5rem" }} type="image" img src={`/assets/files/${product.image}`} alt="photo" />
                      <span className="product-title">{product.title}</span>
                      <input type="number" className="shop-quantity" defaultValue={product.quantity} min="1" onChange={(event) => { setShoppingCartQuantity(event, product._id) }} />
                      <span className="product-quantity-unit">db</span>
                      <span className="product-price">{CurrencyFormatter(product.quantity * product.price)}</span>
                    </div>

                  )

                })}
              </div>
              <div className="shopping-cart-navigate">
                
                <Link to="/checkout/order" className="shopping-cart-link">Tovább a fizetéshez</Link>
              </div>
            </div>
          )}
        </>
      )}
      <BackButton url={'/'}/>
    </div>

  )
}


{/*Kosár ára = {shoppingCart.reduce(function (acc, product) { return acc + (product.quantity * product.price); }, 0)} ft*/ }