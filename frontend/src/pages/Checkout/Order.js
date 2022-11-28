import axios from 'axios'
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { OrderModal } from '../../components/OrderModal';


export function Order({ user, shoppingCart, setShoppingCart }) {
  const navigate = useNavigate();
  const [isModalActive, setModalActive] = useState(false)
  const [shippingType, setShippingType] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [newUser, setnewUser] = useState({
    userName: "",
    email: "",
    firstName: "",
    lastName: "",
    settlement: "",
    postCode: "",
    street: "",
    streetNumber: "",
    phoneNumber: ""
  })


  function handleUser(event) {
    const next = { ...newUser };
    next[event.target.name] = event.target.value
    setnewUser(next)
  }

  async function sendOrder() {
    const newOrder = {
      user: user ? user : newUser,
      shoppingCart: shoppingCart,
      shippingType: shippingType,
      paymentType, paymentType,
    }
    const res = await axios.post('/api/order', newOrder)
    console.log(res.data);
  }





  return (
    <div>
      {isModalActive && <OrderModal
        shoppingCart={shoppingCart}
        message={"Biztosan megrendeled?"}
        onDeclined={() => { setModalActive(false) }}
        onApprove={() => {
          sendOrder(); 
          setModalActive(false);
          setShoppingCart([])
          navigate('/')
        }}
      />}


      <div className="order-summary">
        <h1>{shoppingCart.reduce(function (acc, product) { return acc + (product.quantity * product.price); }, 0)}</h1>
      </div>


      <form>

        <input type="text" name="userName" onChange={(event) => { handleUser(event) }} placeholder="userName" required defaultValue={user ? user.userName : ""} />
        <input type="email" name="email" onChange={(event) => { handleUser(event) }} placeholder="email" required defaultValue={user ? user.firstName : ""} />
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

      </form>


      <button onClick={() => { setModalActive(true) }}>Összegzés </button>


    </div>
  )
}