import '../styles/components/Nav.css'
import { Link, useNavigate } from 'react-router-dom';
export function Nav() {
  const navigate = useNavigate();

  return (
    <div className="nav">
      <div className="nav-list">
        <div className='list-items'>

          <Link to={"/home"} className="nav-link">Home </Link>

        </div>
        <div className='user-nav'>
          <button onClick={() => {
            <Link to={"/user-login"} className="nav-link">User Login</Link>
            localStorage.removeItem('userToken');
            navigate('/user-login')
          }}>Logout user</button>
          <div className="shopping-cart">Cart Component</div>
          <Link to={"/user-register"} className="nav-link">User register</Link>
        </div>
      </div>
    </div>
  )
}