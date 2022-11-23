
import './App.css'
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Nav } from './components/Nav';
import { AdminLogin } from './pages/Admin/AdminLogin';
import { Dashboard } from './pages/Admin/Dashboard';
import { Home } from './pages/Home';
import { UserRegister } from './pages/User/UserRegister';
import { UserLogin } from './pages/User/UserLogin';
import axios from 'axios';
import { AddProduct } from './pages/Admin/AddProduct';
import { UpdateProduct } from './pages/Admin/UpdateProduct';
import { ProductSingle } from './pages/ProductSingle';
function App() {
  const [user, setUser] = useState()

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




  return (
    <div className="app-component">
      <Nav />
      <Routes>
        <Route path='/home' element={<Home />} />

        {/*Admin*/}
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/product-update/:productId' element={<UpdateProduct />} />
        <Route path='/product-add' element={<AddProduct />} />
        {/*User*/}
        <Route path='/product-single/:productId' element={<ProductSingle />} />
        <Route path='/user-register' element={<UserRegister />} />
        <Route path='/user-login' element={<UserLogin setUser={setUser} />} />
        <Route path='/user-account' element={"user account"} />
      </Routes>
    </div>

  )

}

export default App;
