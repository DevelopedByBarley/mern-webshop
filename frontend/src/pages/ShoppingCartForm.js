export function ShoppingCartForm({ shoppingCart, setShoppingCart }) {


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
          <div className="transport-type">
            <h1>Szállitási lehetőségek:</h1>
            <label htmlFor="transport_type">Házhoz szállitás</label>
            <input type="radio" name="transport_type" value="" /> <br />
            <label htmlFor="transport_type">Személyes átvétel üzletben</label>
            <input type="radio" name="transport_type" value="" /><br />
            <label htmlFor="transport_type">Átvevő pontra rendelés</label>
            <input type="radio" name="transport_type" value="" /><br />
          </div>
          <div className="payment-type">
            <h1>Fizetési lehetőségek:</h1>
            <label htmlFor="payment-type">Utánvét</label>
            <input type="radio" name="payment-type" value="" /><br />
            <label htmlFor="payment-type">Online fizetés bankkártyával</label>
            <input type="radio" name="payment-type" value="" /><br />
            <label for="payment-type">Utalás bankkártyával</label>
            <input type="radio" name="payment-type" value="" /><br />
          </div>
        </div>
      )}
    </>

  )
}


