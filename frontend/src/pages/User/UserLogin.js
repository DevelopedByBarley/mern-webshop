import axios from "axios";
import { useNavigate } from "react-router-dom";

export function UserLogin({setUser}) {

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
              alert('Login succesfull')
              navigate('/')
            }
          })
        }
      })
  }

  
  return (
    <form onSubmit={loginUser}>
      <input type="email" name="email" className="email" />
      <input type="password" name="password" className="password" />
      <button type="submit">Login</button>
    </form>
  )
}