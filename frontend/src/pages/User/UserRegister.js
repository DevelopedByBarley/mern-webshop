import axios from "axios";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import '../../styles/pages/User/UserRegister.css'

export function UserRegister(event) {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const registerUser = (event) => {
    event.preventDefault();
    const newUser = {
      userName: event.target.elements.userName.value,
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
      firstName: event.target.elements.firstName.value,
      lastName: event.target.elements.lastName.value,
      settlement: event.target.elements.settlement.value,
      postCode: event.target.elements.postCode.value,
      street: event.target.elements.street.value,
      streetNumber: event.target.elements.streetNumber.value,
      phoneNumber: event.target.elements.phoneNumber.value,
    }

    axios.post('/api/user/register', newUser)
      .then((res) => {
        const user = res.data.user;
        if (user) {
          navigate('/user-login')
        }
      })

  }

  return (
    <div className="register-user">
      <h1 className="register-user-title">Regisztráció</h1>
      <form onSubmit={registerUser}>
        <input type="text" name="userName" placeholder="userName" required /> <br />
        <input type="email" name="email" placeholder="Email" required /><br />
        <input type="password" name="password" placeholder="Jelszó" required /><br />
        <input type="text" name="firstName" placeholder="Vezetéknév" required /><br />
        <input type="text" name="lastName" placeholder="Keresztnév" required /><br />
        <input type="text" name="settlement" placeholder="Település" required /><br />
        <input type="number" name="postCode" placeholder="Irányitószám" required /><br />
        <input type="text" name="street" placeholder="Utce" required /><br />
        <input type="text" name="streetNumber" placeholder="Ház szám" required /><br />
        <input type="tel" name="phoneNumber" placeholder="Telefonszám" required /><br />


        <button className="register" type="submit">Regisztráció</button><br />


        <Link className="isRegistered" to="/user-login">Bejelentkezés</Link>

      </form>
    </div>
  )
}