import '../styles/components/Nav.css'
import { Link } from 'react-router-dom';
export function Nav({ shoppingCart }) {

  return (
    <div className='nav'>
      <Link to='/checkout/cart' className='link'>
        <div className='shopping-cart'>
          <h1>
            Shopping cart items = {shoppingCart.reduce(function (acc, product) { ; return acc + product.quantity; }, 0)} <br/>
            Fullprice = {shoppingCart.reduce(function (acc, product) { return acc + (product.quantity * product.price); }, 0)}
          </h1>
        </div>
      </Link>
    </div>
  )
}