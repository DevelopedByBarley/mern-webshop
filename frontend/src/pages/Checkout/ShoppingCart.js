import { Link } from "react-router-dom";

export function ShoppingCart({ shoppingCart, setShoppingCart }) {



  const deleteCartItem = (productId) => {
    setShoppingCart((prev) => {
      const next = [...prev];
      const index = next.findIndex(item => item._id === productId);
      next.splice(index, 1)
      return next
    })
  }


  return (

    <>
      {shoppingCart.length === 0 ? (
        <h1>A besárálókosarad üres!</h1>
      ) : (
        <div>
          {shoppingCart.map((product) => {
            return (
              <div key={product._id}>
                <h1>{product._id}</h1>
                <input type="number" defaultValue={product.quantity} min="1" onChange={(event) => {
                  setShoppingCart((prev) => {
                    const next = [...prev];
                    let index = next.findIndex(item => item._id === product._id);
                    next[index].quantity = Number(event.target.value);
                    return next;
                  })
                }} />
                <button className="delete-cart-item" onClick={() => { deleteCartItem(product._id) }}>Törlés</button>
              </div>
            )

          })}
        <Link to="/checkout/order">Orders</Link>
        </div>
      )}
    </>

  )
}


