import axios from "axios";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Toast } from '../../components/Toast'

export function UserLogin({ setUser }) {
  const [isToastActive, setToastActive] = useState(false);
  const navigate = useNavigate();


  const loginUser = (event) => {
    event.preventDefault();
    const userData = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    }

    axios.post('/api/user/login', userData)
      .then((res) => {
        const token = res.data.token;

        if (!token) {
          alert('Invalid email or password!')

        } else {
          axios.get('/api/user/getMe', {
            headers: { Authorization: `Bearer ${token}` }

          }).then((res) => {
            const user = res.data.user;
            setUser(user)

            if (user) {
              localStorage.setItem('userToken', token)
              setToastActive(true)
              setTimeout(() => {
                navigate('/')
              }, 2000)
            }
          })
        }
      })
  }


  return (
    <div>
      {isToastActive && <Toast
        toastMessage={"Sikeres bejelentkezés!"}
        duration={2000}
        color={"#53BF9D"}
      />}
      <form onSubmit={loginUser}>
        <input type="email" name="email" className="email" />
        <input type="password" name="password" className="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}