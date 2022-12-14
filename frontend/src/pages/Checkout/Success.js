import {MdCloudDone} from 'react-icons/md'
import { Link } from 'react-router-dom'
import '../../styles/pages/Checkout/PaymentResponse.css'
export default function Success() {
  return (
    <div className="payment-response-container">
      <MdCloudDone className='payment-response-icon' color='green'/>
      <h1 className="payment-response-title">Sikeres rendelés!</h1>
      <Link className='payment-response-link' to='/'>Vissza a kezdőoldalra</Link>
    </div>
  )
}
