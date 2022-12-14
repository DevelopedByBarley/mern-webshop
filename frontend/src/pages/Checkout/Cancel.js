import { VscError } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import '../../styles/pages/Checkout/PaymentResponse.css'

export default function Cancel() {
  return (
    <div className="payment-response-container">
      <VscError className='payment-response-icon' color='red' />
      <h1 className="payment-response-title">Sikertelen megrendelés!</h1>
      <Link className='payment-response-link' to='/'>Vissza a kezdőoldalra</Link>
    </div>
  )
}
