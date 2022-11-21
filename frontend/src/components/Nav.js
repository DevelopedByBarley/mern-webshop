import '../styles/components/Nav.css'
import { Link } from 'react-router-dom';
export function Nav() {
  return (
    <div className="nav">
      <div className="nav-list">
        <div className='list-item'>
          <Link to={"/asd"} className="nav-link">Link </Link>
        </div>
      </div>
      <div className="shopping-cart">Cart Component</div>
    </div>
  )
}