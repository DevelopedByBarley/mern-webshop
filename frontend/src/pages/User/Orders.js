import '../../styles/pages/User/Orders.css'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { BackButton } from '../../components/BackButton';

export function Orders() {

  const [ordersOufUsers, setOrdersOfUsers] = useState([]);

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      axios.get('/api/user/orders', {
        headers: { Authorization: `Bearer ${userToken}` }
      })
        .then(res => setOrdersOfUsers(res.data.orderOfUser));
    }
  }, [])

  console.log(ordersOufUsers)

  return (
    <div className='user-orders-container'>
      <h1 className='user-orders-title'>Korábbi rendelések</h1>
      <div className='user-orders'>
        {ordersOufUsers.map((order) => {
          return (
            <Link className="link" to={`/user/order/${order._id}`} >
              <div className='order'>

                <h1 className='order-title'>Rendelés azonosító:</h1>
                <p className='order-id'>{order._id}</p>
                <hr />
                <div className='order-payment-type order-data'>
                  <h3>Fizetés módja:</h3>
                  <p>{order.paymentType}</p>
                </div>
                <div className='order-delivery-type'>
                  <h3>Kiszállitás módja:</h3>
                  <p>{order.shippingType}</p>
                </div>
                <div className='order-status'>
                  <h3>Rendelés státusza:</h3>
                  <p>{order.state}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
      <BackButton url={"/"} />
    </div>
  )
}
