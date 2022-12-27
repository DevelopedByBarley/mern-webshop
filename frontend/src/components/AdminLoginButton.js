import '../styles/components/AdminLoginButton.css'
import { Link } from "react-router-dom"


export function AdminLoginButton() {
  return (
    <div className='admin-login-container'>
      <Link to="/admin-login">
        <button className="admin-login">
          Admin
        </button>
      </Link>
    </div>
  )
}
