import { useEffect } from 'react';
import { VscError } from 'react-icons/vsc'
import { Link, useNavigate } from 'react-router-dom'
import '../../styles/pages/Checkout/PaymentResponse.css'

export function Cancel() {

  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/')
    }, 2000)
  }, [])

  return (
    <div className="payment-response-container">
      <VscError className='payment-response-icon' color='red' />
      <h1 className="payment-response-title">Sikertelen megrendelés!</h1>
    </div>
  )
}
