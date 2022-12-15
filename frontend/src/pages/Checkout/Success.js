import { useEffect } from 'react'
import {MdCloudDone} from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import '../../styles/pages/Checkout/PaymentResponse.css'
export default function Success() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
    navigate('/')
    },2000)
  }, [])

  return (
    <div className="payment-response-container">
      <MdCloudDone className='payment-response-icon' color='green'/>
      <h1 className="payment-response-title">Sikeres rendelés!</h1>
    </div>
  )
}
