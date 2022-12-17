import { AiOutlineShoppingCart } from 'react-icons/ai'
import {Link} from 'react-router-dom'
import '../styles/components/ShoppingCart.css'

export function ShoppingCart({shoppingCart}) {
  return (
    <>
      <Link to='/checkout/cart' className='link'>
        <div className='shopping-cart'>
          <AiOutlineShoppingCart size={25} color='white' />
          <span className='numer-of-items'>
            {shoppingCart.reduce(function (acc, product) { return acc + product.quantity; }, 0)}
          </span>
        </div>
      </Link>
    </>
  )
}
