import axios from "axios";
import { useNavigate } from "react-router-dom";

export function UserRegister(event) {
  const navigate = useNavigate();


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
        if(user) {
          navigate('/user-login')
        }
      })

  }

  return (
    <form onSubmit={registerUser} className="register-user" style={{ display: "flex", flexDirection: "column", width: "50%" }}>
      <input type="text" name="userName" placeholder="userName" required />
      <input type="email" name="email" placeholder="Email" required />
      <input type="password" name="password" placeholder="Jelszó" required />
      <input type="text" name="firstName" placeholder="Vezetéknév" required />
      <input type="text" name="lastName" placeholder="Keresztnév" required />
      <input type="text" name="settlement" placeholder="Település" required />
      <input type="number" name="postCode" placeholder="Irányitószám" required />
      <input type="text" name="street" placeholder="Utce" required />
      <input type="text" name="streetNumber" placeholder="Ház szám" required />
      <input type="tel" name="phoneNumber" placeholder="Telefonszám" required />
      <button type="submit">Login</button>
    </form>
  )
}