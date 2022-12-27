
import './App.css'
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Nav } from './components/Nav';
import { AdminLogin } from './pages/Admin/AdminLogin';
import { Dashboard } from './pages/Admin/Dashboard';
import { Home } from './pages/Home/Home';
import { UserRegister } from './pages/User/UserRegister';
import { UserLogin } from './pages/User/UserLogin';
import { AddProduct } from './pages/Admin/AddProduct';
import { UpdateProduct } from './pages/Admin/UpdateProduct';
import { ProductSingle } from './pages/Product/ProductSingle';
import { ShoppingCart } from './pages/Checkout/ShoppingCart';
import { Order } from './pages/Checkout/Order';
import { Error } from './pages/Error/Error';
import { Success } from './pages/Checkout/Success';
import { Cancel } from './pages/Checkout/Cancel';
import { Orders } from './pages/User/Orders';
import { OrderSingle } from './pages/User/OrderSingle';
import { Profile } from './pages/User/Profile';
import { Products } from './pages/Product/Products';
import { Footer } from './components/Footer';




function App() {
  const [shoppingCart, setShoppingCart] = useState(!localStorage.getItem("shopping_cart") ? [] : JSON.parse(localStorage.getItem("shopping_cart")));
  const [user, setUser] = useState();

  const getProductSingle = async (productId) => {
    const res = await axios.get(`/api/products/${productId}`)
    const product = res.data.product
    setShoppingCart((prev) => {
      const next = [...prev];
      const id = product._id;
      let duplicatedItem = next.find(item => item._id === id);
      if (!duplicatedItem) {
        next.push(product);
      } else {
        duplicatedItem.quantity += 1
      }
      return next;
    })
  }


  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      axios.get('/api/user/getMe', {
        headers: { Authorization: `Bearer ${userToken}` }
      }).then((res) => {
        const user = res.data.user;
        setUser(user)
      })
    }
  }, [])



  useEffect(() => {
    localStorage.setItem('shopping_cart', JSON.stringify(shoppingCart))
  }, [shoppingCart])









  return (
    <div className="app-container">

      <Nav shoppingCart={shoppingCart} user={user} setUser={setUser} />

      <Routes>
        <Route path='/error-page' element={<Error />} />
        <Route path='/checkout/order/success' element={<Success />} />
        <Route path='/checkout/order/cancel' element={<Cancel />} />
        <Route path='/' element={<Home getProductSingle={getProductSingle} setShoppingCart={setShoppingCart} user={user} />} />
        <Route path='/checkout/cart' element={<ShoppingCart shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} />} />
        <Route path='/checkout/order' element={<Order user={user} shoppingCart={shoppingCart} setShoppingCart={setShoppingCart} />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/product-single/:productId' element={<ProductSingle user={user} getProductSingle={getProductSingle} />} />
        <Route path='/product-update/:productId' element={<UpdateProduct />} />
        <Route path='/product-add' element={<AddProduct />} />
        <Route path='/products/:platformType' element={<Products getProductSingle={getProductSingle} />} />
        <Route path='/user-register' element={<UserRegister />} />
        <Route path='/user-login' element={<UserLogin setUser={setUser} />} />
        <Route path='/user/profile' element={<Profile />} />
        <Route path='/user/orders' element={<Orders />} />
        <Route path='/user/order/:orderId' element={<OrderSingle />} />
      </Routes>

      <Footer/>
    </div>

  )

}

export default App;
