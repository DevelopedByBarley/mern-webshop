import '../../styles/pages/Admin/AdminLogin.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useState } from "react";


export function AdminLogin() {

  const navigate = useNavigate();

  const [admin, setAdmin] = useState({
    email: "",
    password: ""
  })

  const loginAdmin = (event) => {
    event.preventDefault();
    axios.post('/api/admin/login', admin)
      .then((res) => {
        const token = res.data.token;
        if (!token) {
          alert('Érvénytelen Email vagy Jelszó!')
        } else {
          axios.get('/api/admin/getMe', {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then(() => {
            localStorage.setItem('adminToken',token)
            navigate('/dashboard')
          })
        }
      })


  }


  return (


    <form className="admin-login-form" onSubmit={loginAdmin}>
      <h1 className='admin-login-title'>Admin bejelentkezés!</h1>
      <input type="email" name="email" className="email" placeholder='Email' onChange={(event) => setAdmin((prev) => {
        prev.email = event.target.value;
        return prev
      })} />
      <input type="password" name="password"  placeholder='Jelszó' className="password" onChange={(event) => setAdmin((prev) => {
        prev.password = event.target.value;
        return prev
      })} />
      <button type="submit" className='admin-login'>Login</button>
      <div className='info'>
        <p>
          Az admin felületen való bejelentkezés kizáróla Admin részére készült
          ez a funkció termékekkel, felhasználókkal vagy megrendelésekkel 
          való müveletek elvégzésére készült! 
        </p>
      </div>
    </form>
  )
}