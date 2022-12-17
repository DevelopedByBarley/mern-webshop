import '../../styles/pages/User/OrderSingle.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export function OrderSingle() {
    const [order, setOrder] = useState('');
    const params = useParams();
    const orderId = params.orderId;

    useEffect(() => {
        const userToken = localStorage.getItem('userToken');
        if (userToken) {
            axios.get(`/api/user/order/${orderId}`, {
                headers: { Authorization: `Bearer ${userToken}` }
            })
                .then(res => setOrder(res.data.order));
        }
    }, [])

    return (
        <div className='order-single-container'>
            <h1 className='order-single-title'></h1>
            <div className='order'>
                <h1>Rendelési azonosító:</h1>
                <p>{order._id}</p>
                <div className='order-shopping-cart'>
                    {order.shoppingCart?.map((product) => {
                        return (
                            <div className='order-products'>
                                <h1>{product.title}</h1>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

