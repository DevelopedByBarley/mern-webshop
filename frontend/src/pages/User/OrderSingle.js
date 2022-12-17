import '../../styles/pages/User/OrderSingle.css'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Modal } from '../../components/Modal';

export function OrderSingle() {
	const navigate = useNavigate()
	const [order, setOrder] = useState('');
	const params = useParams();
	const orderId = params.orderId;
	const [modalToggle, setModalToggle] = useState(false)

	useEffect(() => {
		const userToken = localStorage.getItem('userToken');
		if (userToken) {
			axios.get(`/api/user/order/${orderId}`, {
				headers: { Authorization: `Bearer ${userToken}` }
			})
				.then(res => {
					if (res.data.order) {
						setOrder(res.data.order)
					} else {
						navigate('/user/orders')
					}
				});
		}
	}, [])

	const deleteOrder = (event) => {
		event.preventDefault();
		console.log(orderId)
		const userToken = localStorage.getItem('userToken');
		if (userToken) {
			axios.delete(`/api/user/order/${orderId}`, {
				headers: { Authorization: `Bearer ${userToken}` }
			})
				.then(res => {
					navigate('/user/orders');
				});
		}
	}

	return (
		<>
			{modalToggle && <Modal message={`Biztosan szeretnéd törölni a ${orderId} számú rendelést?`} onApprove={deleteOrder} onDecline={() => setModalToggle(false)}>
				<p className='message'>Valóban szeretnéd <span className='danger'>törölni</span> a <span className='danger'>{order._id}</span> számú megrendelésed?</p>
			</Modal>}
			<div className='order-single-container'>
				<div className='order'>
					<h1 className='order-title'>Rendelés azonositó:</h1>
					<p className='order-id'>{order._id}</p>
					<h1 className='full-price-title order-title'>Rendelés teljes összege:</h1>
					<p>{order.fullPrice} Ft</p>
					<div className='order-shopping-cart'>
						{order.shoppingCart?.map((product) => {
							return (
								<div key={product._id} className='order-products'>
									<img src={`/assets/files/${product.image}`} className="product-img" />
									<div className='product-data'>
										<h1 className='product-title'>{product.title}</h1>
										<p className='product-price'>-{product.discount}%</p>
										<p className='product-price'>{product.price} Ft</p>
									</div>
								</div>
							)
						})}
					</div>
					<div className='order-status'>
						<h1 className='order-status-title order-title'>Rendelés státuasza</h1>
						<p className='order-status'>{order.state} </p>
					</div>
					<button className='delete-order' onClick={() => setModalToggle(true)}>Megrendelés törlése</button>
				</div>
			</div>
		</>
	)
}

