import axios from "axios";
import '../../styles/pages/User/UserLogin.css'
import ClipLoader from "react-spinners/ClipLoader";

import { useNavigate, Link } from "react-router-dom";

import { useState } from "react";
import { Spinner } from "../../components/Spinner";

export function UserLogin({ setUser }) {
  const navigate = useNavigate();
  const [isPending, setPending] = useState(false)


  const loginUser = (event) => {
    event.preventDefault();
    const userData = {
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
    }

    axios.post('/api/user/login', userData)
      .then((res) => {
        setPending(true)
        const token = res.data.token;

        setTimeout(() => {
          if (!token) {
            alert('Érvénytelen Email vagy Jelszó')
            setPending(false)

          } else {
            axios.get('/api/user/getMe', {
              headers: { Authorization: `Bearer ${token}` }

            }).then((res) => {
              const user = res.data.user;
              setUser(user)

              if (user) {
                localStorage.setItem('userToken', token)
                navigate('/')
              }
            })
          }
        }, 1200)
      })
  }


  return (
    <div className="user-login-container">
      <h1 className="user-login-title">Bejelentkezés</h1>
      <form onSubmit={loginUser}>
        <input type="email" name="email" className="email" /><br />
        <input type="password" name="password" className="password" /><br />
        <button type="submit" className="login-user">
          {isPending && <Spinner color={"#9b3b40"} size={34} isFullPage={false} SpinnerName={ClipLoader} />}
          {!isPending && "Bejelentkezés"}
        </button>

        <div>
          <Link className="isRegistered" to="/user-register">Regisztráció</Link>
        </div>

      </form>
    </div>
  )
}