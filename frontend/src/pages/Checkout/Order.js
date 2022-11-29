import axios from 'axios'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from '../../components/Spinner';


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
  console.log(fullPrice);


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
        setShoppingCart([])
      })
    } else {
      axios.post('/api/order', {
        user: newUser,
        shoppingCart: shoppingCart,
        shippingType: shippingType,
        paymentType: paymentType,
        fullPrice: fullPrice
      })
        .then(() => {
          setShoppingCart([])
          navigate('/')
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
              <h1> Full price {fullPrice} Ft</h1>
              {shoppingCart.map((product) => {
                return (
                  <div style={{ border: "1px solid", margin: "2rem" }}>
                    <img style={{ height: "200px", width: "200px" }} src={`/assets/files/${product.image}`} />
                    <h1>{product.title}</h1>
                    <h1>{product.price} Ft</h1>
                  </div>
                )
              })}
            </div>


            <form onSubmit={sendOrder}>

              <input type="text" name="userName" onChange={(event) => { handleUser(event) }} placeholder="userName" required defaultValue={user ? user.userName : ""} />
              <input type="email" name="email" onChange={(event) => { handleUser(event) }} placeholder="email" required defaultValue={user ? user.email : ""} />
              <input type="text" name="firstName" onChange={(event) => { handleUser(event) }} placeholder="Vezetéknév" required defaultValue={user ? user.firstName : ""} />
              <input type="text" name="lastName" onChange={(event) => { handleUser(event) }} placeholder="Keresztnév" required defaultValue={user ? user.lastName : ""} />
              <input type="text" name="settlement" onChange={(event) => { handleUser(event) }} placeholder="Település" required defaultValue={user ? user.settlement : ""} />
              <input type="number" name="postCode" onChange={(event) => { handleUser(event) }} placeholder="Irányitószám" required defaultValue={user ? user.postCode : ""} />
              <input type="text" name="street" onChange={(event) => { handleUser(event) }} placeholder="Utce" required defaultValue={user ? user.street : ""} />
              <input type="text" name="streetNumber" onChange={(event) => { handleUser(event) }} placeholder="Ház szám" required defaultValue={user ? user.streetNumber : ""} />
              <input type="tel" name="phoneNumber" onChange={(event) => { handleUser(event) }} placeholder="Telefonszám" required defaultValue={user ? user.phoneNumber : ""} />

              <div className="shipping_type-type">
                <h1>Szállitási lehetőségek:</h1>
                <label htmlFor="shipping_type">Házhoz szállitás</label>
                <input type="radio" name="shipping_type" onChange={() => { setShippingType("to_house") }} value="to_house" required /> <br />
                <label htmlFor="shipping_type">Személyes átvétel üzletben</label>
                <input type="radio" name="shipping_type" onChange={() => { setShippingType("to_shop") }} value="to_shop" /><br />
                <label htmlFor="shipping_type">Átvevő pontra rendelés</label>
                <input type="radio" name="shipping_type" onChange={() => { setShippingType("to_point") }} value="to_point" /><br />
              </div>
              <div className="payment-type">
                <h1>Fizetési lehetőségek:</h1>
                <label htmlFor="payment_type">Utánvét</label>
                <input type="radio" name="payment_type" onChange={() => { setPaymentType("cash_on_delivery") }} value="cash_on_delivery" required /><br />
                <label htmlFor="payment_type">Online fizetés bankkártyával</label>
                <input type="radio" name="payment_type" onChange={() => { setPaymentType("online_card") }} value="online_card" /><br />
                <label htmlFor="payment_type">Utalás bankkártyával</label>
                <input type="radio" name="payment_type" onChange={() => { setPaymentType("bank_card_transfer") }} value="bank_card_transfer" /><br />
              </div>

              <button type='submit'>Összegzés </button>
            </form>
          </>

        )
      }



    </div>
  )
}