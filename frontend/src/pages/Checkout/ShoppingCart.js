import { Link } from "react-router-dom";
import { useState } from "react";
import { Spinner } from "../../components/Spinner";
import { Toast } from "../../components/Toast";

export function ShoppingCart({ shoppingCart, setShoppingCart }) {
  const [isToastActive, setToastActive] = useState(false);
  const [isPending, setPending] = useState(true)


  setTimeout(() => {
    setPending(false)
  }, 1200)



  const deleteCartItem = (productId) => {
    setShoppingCart((prev) => {
      const next = [...prev];
      const index = next.findIndex(item => item._id === productId);
      next.splice(index, 1)
      return next
    })
  }


  return (

    <div>
      {isToastActive && <Toast setToastActive={setToastActive} toastMessage={"Termék Törölve a kosárból!"} duration={2000} color={"#F96666"} />}
      {isPending ? (<Spinner />) : (
        <>
          {shoppingCart.length === 0 ? (
            <div>
              <h1>A besárálókosarad üres!</h1>
              <Link to='/'>Vásárlás folytatása!</Link>
            </div>
          ) : (
            <div>
              {shoppingCart.map((product) => {
                return (
                  <div key={product._id}>
                    <img style={{ height: "200px", width: "200px" }} src={`/assets/files/${product.image}`} />
                    <h1>{product._id}</h1>
                    <input type="number" defaultValue={product.quantity} min="1" onChange={(event) => {
                      setShoppingCart((prev) => {
                        const next = [...prev];
                        let index = next.findIndex(item => item._id === product._id);
                        next[index].quantity = Number(event.target.value);
                        return next;
                      })
                    }} />
                    <button className="delete-cart-item" onClick={() => {
                      deleteCartItem(product._id)
                      setToastActive(true)
                    }

                    }>Törlés</button>
                  </div>
                )

              })}
              <Link to="/checkout/order">Orders</Link>
              <Link to='/'>Vásárlás folytatása!</Link>
            </div>
          )}
        </>
      )}
    </div>

  )
}


