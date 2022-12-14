import axios from 'axios'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from '../../components/Spinner';
import '../../styles/pages/Checkout/Order.css'

export function Order({ user, shoppingCart, setShoppingCart }) {
  const navigate = useNavigate();
  const [isPending, setPending] = useState(true)
  const [shippingType, setShippingType] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const fullPrice = shoppingCart.reduce(function (acc, product) { return acc + (product.quantity * product.price); }, 0)
  const [newUser, setnewUser] = useState({
    userName: user ? user.userName : "",
    email: user ? user.email : "",
    firstName: user ? user.firstName : "",
    lastName: user ? user.lastName : "",
    settlement: user ? user.settlement : "",
    postCode: user ? user.postCode : "",
    street: user ? user.street : "",
    streetNumber: user ? user.streetNumber : "",
    phoneNumber: user ? user.phoneNumber : ""
  })





  setTimeout(() => {
    setPending(false)
  }, 1200)



  function handleUser(event) {
    const next = { ...newUser };
    next[event.target.name] = event.target.value
    setnewUser(next)
  }

  function sendOrder(event) {
    event.preventDefault();
    if (paymentType === 'online_card') {
      axios.post('/api/order/online-card', {
        user: newUser,
        shoppingCart: shoppingCart,
        shippingType: shippingType,
        paymentType: paymentType,
      }).then((res) => {
        const url = res.data.url;
        window.location.href = url
      })
    } else {
      axios.post('/api/order', {
        user: newUser,
        shoppingCart: shoppingCart,
        shippingType: shippingType,
        paymentType: paymentType,
        fullPrice: fullPrice
      })
        .then((res) => {
          if(res.data.order) {
            navigate('/checkout/order/success')
          }
        })
    }
  }








  return (
    <div>
      {isPending ?
        (
          <Spinner />
        )
        :
        (
          <>
            <div className="order-summary">
              <div className='order-summary-header'>
                <h1> Rendelés értéke: {new Intl.NumberFormat('hu-HU', { 
                  maximumSignificantDigits: 3, style: 'currency', currency: 'HUF' 
                  }).format(fullPrice)}</h1>
              </div>
              {shoppingCart.map((product) => {
                return (
                  <div className='order-products' key={product._id}>
                    <input style={{ height: "150px", width: "150px", borderRadius: "50%", margin: ".5rem" }} type="image" img src={`/assets/files/${product.image}`} alt="photo" />
                    <h1 className='product-title'>{product.title}</h1>
                    <h1 className='product-price'>{product.price} Ft</h1>
                  </div>
                )
              })}
            </div>


            <form className='send-order' onSubmit={sendOrder}>
              <label htmlFor="userName">Felhasználónév:</label><br />
              <input type="text" name="userName" onChange={(event) => { handleUser(event) }} placeholder="userName" required defaultValue={user ? user.userName : ""} /><br />
              <label htmlFor="email">Email:</label><br />
              <input type="email" name="email" onChange={(event) => { handleUser(event) }} placeholder="email" required defaultValue={user ? user.email : ""} /><br />
              <label htmlFor="firstName">Vezetéknév:</label><br />
              <input type="text" name="firstName" onChange={(event) => { handleUser(event) }} placeholder="Vezetéknév" required defaultValue={user ? user.firstName : ""} /><br />
              <label htmlFor="lastName">Keresztnév:</label><br />
              <input type="text" name="lastName" onChange={(event) => { handleUser(event) }} placeholder="Keresztnév" required defaultValue={user ? user.lastName : ""} /><br />
              <label htmlFor="settlement">Város:</label><br />
              <input type="text" name="settlement" onChange={(event) => { handleUser(event) }} placeholder="Település" required defaultValue={user ? user.settlement : ""} /><br />
              <label htmlFor="postCode">Irányitószám:</label><br />
              <input type="number" name="postCode" onChange={(event) => { handleUser(event) }} placeholder="Irányitószám" required defaultValue={user ? user.postCode : ""} /><br />
              <label htmlFor="street">Utca:</label><br />
              <input type="text" name="street" onChange={(event) => { handleUser(event) }} placeholder="Utce" required defaultValue={user ? user.street : ""} /><br />
              <label htmlFor="streetNumber">Házszám:</label><br />
              <input type="text" name="streetNumber" onChange={(event) => { handleUser(event) }} placeholder="Ház szám" required defaultValue={user ? user.streetNumber : ""} /><br />
              <label htmlFor="phoneNumber">Telefonszám:</label><br />
              <input type="tel" name="phoneNumber" onChange={(event) => { handleUser(event) }} placeholder="Telefonszám" required defaultValue={user ? user.phoneNumber : ""} /><br />

              <div className="shipping-type">
                <h1>Szállitási lehetőségek:</h1>
                <label htmlFor="shipping_type">Házhoz szállitás</label><br />
                <input type="radio" name="shipping_type" onChange={() => { setShippingType("to_house") }} value="to_house" required /> <br />
                <label htmlFor="shipping_type">Személyes átvétel üzletben</label><br />
                <input type="radio" name="shipping_type" onChange={() => { setShippingType("to_shop") }} value="to_shop" /><br />
                <label htmlFor="shipping_type">Átvevő pontra rendelés</label><br />
                <input type="radio" name="shipping_type" onChange={() => { setShippingType("to_point") }} value="to_point" /><br />
              </div>
              <div className="payment-type">
                <h1>Fizetési lehetőségek:</h1>
                <label htmlFor="payment_type">Utánvét</label><br />
                <input type="radio" name="payment_type" onChange={() => { setPaymentType("cash_on_delivery") }} value="cash_on_delivery" required /><br />
                <label htmlFor="payment_type">Online fizetés bankkártyával</label><br />
                <input type="radio" name="payment_type" onChange={() => { setPaymentType("online_card") }} value="online_card" /><br />
                <label htmlFor="payment_type">Utalás bankkártyával</label><br />
                <input type="radio" name="payment_type" onChange={() => { setPaymentType("bank_card_transfer") }} value="bank_card_transfer" /><br />
              </div>

              <button type='submit' className='summary'>Vásárlás</button>
            </form>
          </>

        )
      }


    </div>
  )
}