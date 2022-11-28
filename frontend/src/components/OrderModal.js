export function OrderModal({ message, onApprove, onDeclined, shoppingCart }) {

 const orederModalStyle = {
  background: "yellow",
  position: "fixed",
  height: "100vh",
  width: "100%",
 }

  return (
    <div className="orderModal" style={orederModalStyle}>
      {shoppingCart ? <div>
      <h1>Full Price: {shoppingCart.reduce(function (acc, product) { return acc + (product.quantity * product.price); }, 0)}</h1>
        {shoppingCart.map((product) => {
          return (
            <div>
              <h1>{product.title}</h1>
            </div>
          )
        })}
      </div> : ""}
      <h1>{message}</h1>
      <button onClick={onApprove}>Approve</button>
      <button onClick={onDeclined}>Decline</button>
    </div>
  )
}