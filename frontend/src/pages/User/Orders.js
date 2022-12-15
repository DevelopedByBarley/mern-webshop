import axios from 'axios';
import { useEffect, useState } from 'react'

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
    <div className='ordersOfUser-container'>
      <div className='user-orders'>
        {ordersOufUsers.map((order) => {
          return (
            <div className='user-order'>
              <h1>{order.createdAt}</h1>
              <h3>{order.paymentType}</h3>
              <h3>{order.shippingType}</h3>
              <h3>{order.state}</h3>
            </div>
          )
        })}
      </div>
    </div>
  )
}
