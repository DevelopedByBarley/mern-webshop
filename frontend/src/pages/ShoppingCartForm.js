export function ShoppingCartForm({shoppingCart}){
  return (
    <div>
      {shoppingCart.map((product) => {
        return <div>
          <h1>{product._id}</h1>
          <input type="number" defaultValue={product.quantity}/>
        </div>

      })}
    </div>
  )
}