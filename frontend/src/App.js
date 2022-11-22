
import './App.css'
import { Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Nav } from './components/Nav';
import { AdminLogin } from './pages/AdminLogin';
import { Dashboard } from './pages/Dashboard';
import { Home } from './pages/Home';
import { UserRegister } from './pages/UserRegister';
import { UserLogin } from './pages/UserLogin';
import axios from 'axios';
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

  console.log(user);



  return (
    <div className="app-component">

      <Nav />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/user-register' element={<UserRegister />} />
        <Route path='/user-login' element={<UserLogin setUser={setUser} />} />
        <Route path='/user-account' element={ "user account"} />
      </Routes>
    </div>

  )

}

export default App;
