import '../styles/components/Nav.css'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { Link } from 'react-router-dom';
export function Nav({ shoppingCart }) {

  return (
    <div className='nav'>
      <Link to='/checkout/cart' className='link'>
        <div className='shopping-cart'>
          
          <h1>
           {/*Shopping cart items = {shoppingCart.reduce(function (acc, product) { return acc + (product.quantity * product.price); }, 0)} <br />*/} 
            <AiOutlineShoppingCart size={25}/>
            <span className='numer-of-items'>
            {shoppingCart.reduce(function (acc, product) { ; return acc + product.quantity; }, 0)} 
              
            </span>
          </h1>
        </div>
      </Link>
    </div>
  )
}