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
        <div className='order-container'>
            <h1>Rendelési azonosító:</h1>
            <p>{order._id}</p>
            <div className='shopping-cart'>
                {order.shoppingCart?.map((product) => {
                    return <h1>{product.title}</h1>
                })}
            </div>
        </div>
    )
}

