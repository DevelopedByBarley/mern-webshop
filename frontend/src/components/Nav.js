import '../styles/components/Nav.css'
import { Link } from 'react-router-dom';
export function Nav({ shoppingCart }) {

  return (
    <div className='nav'>
      <Link to='/shopping-cart-form'>
        <div className='shopping-cart'>
          {shoppingCart.length}
        </div>
      </Link>
    </div>
  )
}