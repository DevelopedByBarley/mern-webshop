import axios from 'axios'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from '../../components/Spinner';
import PuffLoader from "react-spinners/PuffLoader";
import '../../styles/pages/Checkout/Order.css'
import { BackButton } from '../../components/BackButton';
import { CurrencyFormatter } from '../../helpers/CurrencyFormatter';

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





  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      setPending(false)
    }, 1200)
  }, [])



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
        fullPrice: CurrencyFormatter(fullPrice)
      }).then((res) => {
        const url = res.data.url;
        window.location.href = url
        setShoppingCart([]);
      })
    } else {
      axios.post('/api/order', {
        user: newUser,
        shoppingCart: shoppingCart,
        shippingType: shippingType,
        paymentType: paymentType,
        fullPrice: CurrencyFormatter(fullPrice)
      })
        .then((res) => {
          if (res.data.order) {
            navigate('/checkout/order/success');
            setShoppingCart([]);
          } else {
            navigate('/checkout/order/cancel');
          }
        })
    }
  }








  return (
    <div>
      {isPending ?
        (
          <Spinner color={"#9b3b40"} size={100} SpinnerName={PuffLoader} isFullPage={true} />
        )
        :
        (
          <>
            <div className="order-summary">
              <div className='order-summary-header'>
                <h1> Rendel??s ??rt??ke: {CurrencyFormatter(fullPrice)}</h1>
              </div>
              {shoppingCart.map((product) => {
                return (
                  <div className='order-products' key={product._id}>
                    <input style={{ height: "75px", width: "75px", borderRadius: "50%", margin: ".5rem" }} type="image" img src={`/assets/files/${product.image}`} alt="photo" />
                    <h1 className='product-title'>{product.title}</h1>
                    <h1 className='product-price'>{CurrencyFormatter(product.price)}</h1>
                  </div>
                )
              })}
            </div>


            <form className='send-order' onSubmit={sendOrder}>
              <label htmlFor="userName">Felhaszn??l??n??v:</label><br />
              <input type="text" name="userName" onChange={(event) => { handleUser(event) }} placeholder="userName" required defaultValue={user ? user.userName : ""} /><br />
              <label htmlFor="email">Email:</label><br />
              <input type="email" name="email" onChange={(event) => { handleUser(event) }} placeholder="email" required defaultValue={user ? user.email : ""} /><br />
              <label htmlFor="firstName">Vezet??kn??v:</label><br />
              <input type="text" name="firstName" onChange={(event) => { handleUser(event) }} placeholder="Vezet??kn??v" required defaultValue={user ? user.firstName : ""} /><br />
              <label htmlFor="lastName">Keresztn??v:</label><br />
              <input type="text" name="lastName" onChange={(event) => { handleUser(event) }} placeholder="Keresztn??v" required defaultValue={user ? user.lastName : ""} /><br />
              <label htmlFor="settlement">V??ros:</label><br />
              <input type="text" name="settlement" onChange={(event) => { handleUser(event) }} placeholder="Telep??l??s" required defaultValue={user ? user.settlement : ""} /><br />
              <label htmlFor="postCode">Ir??nyit??sz??m:</label><br />
              <input type="number" name="postCode" onChange={(event) => { handleUser(event) }} placeholder="Ir??nyit??sz??m" required defaultValue={user ? user.postCode : ""} /><br />
              <label htmlFor="street">Utca:</label><br />
              <input type="text" name="street" onChange={(event) => { handleUser(event) }} placeholder="Utce" required defaultValue={user ? user.street : ""} /><br />
              <label htmlFor="streetNumber">H??zsz??m:</label><br />
              <input type="text" name="streetNumber" onChange={(event) => { handleUser(event) }} placeholder="H??z sz??m" required defaultValue={user ? user.streetNumber : ""} /><br />
              <label htmlFor="phoneNumber">Telefonsz??m:</label><br />
              <input type="tel" name="phoneNumber" onChange={(event) => { handleUser(event) }} placeholder="Telefonsz??m" required defaultValue={user ? user.phoneNumber : ""} /><br />

              <div className="shipping-type">
                <h1>Sz??llit??si lehet??s??gek:</h1>
                <label htmlFor="shipping_type">H??zhoz sz??llit??s</label><br />
                <input type="radio" name="shipping_type" onChange={() => { setShippingType("to_house") }} value="to_house" required /> <br />
                <label htmlFor="shipping_type">Szem??lyes ??tv??tel ??zletben</label><br />
                <input type="radio" name="shipping_type" onChange={() => { setShippingType("to_shop") }} value="to_shop" /><br />
                <label htmlFor="shipping_type">??tvev?? pontra rendel??s</label><br />
                <input type="radio" name="shipping_type" onChange={() => { setShippingType("to_point") }} value="to_point" /><br />
              </div>
              <div className="payment-type">
                <h1>Fizet??si lehet??s??gek:</h1>
                <label htmlFor="payment_type">Ut??nv??t</label><br />
                <input type="radio" name="payment_type" onChange={() => { setPaymentType("cash_on_delivery") }} value="cash_on_delivery" required /><br />
                <label htmlFor="payment_type">Online fizet??s bankk??rty??val</label><br />
                <input type="radio" name="payment_type" onChange={() => { setPaymentType("online_card") }} value="online_card" /><br />
                <label htmlFor="payment_type">Utal??s bankk??rty??val</label><br />
                <input type="radio" name="payment_type" onChange={() => { setPaymentType("bank_card_transfer") }} value="bank_card_transfer" /><br />
              </div>

              <button type='submit' className='summary'>V??s??rl??s</button>
            </form>
          </>

        )
      }

      <BackButton url={"/checkout/cart"} />
    </div>
  )
}