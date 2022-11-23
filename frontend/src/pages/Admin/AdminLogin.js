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
          alert('Bad email or passwod')
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
      <input type="email" name="email" className="email" onChange={(event) => setAdmin((prev) => {
        prev.email = event.target.value;
        return prev
      })} />
      <input type="password" name="password" className="password" onChange={(event) => setAdmin((prev) => {
        prev.password = event.target.value;
        return prev
      })} />
      <button type="submit">Login</button>
    </form>
  )
}