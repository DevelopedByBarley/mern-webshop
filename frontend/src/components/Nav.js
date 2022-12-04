import '../styles/components/Nav.css'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiAccountCircleFill } from 'react-icons/ri';
import { FaGamepad } from 'react-icons/fa'
import { AccountToggle } from './AccountToggle';


export function Nav({ shoppingCart, user, setUser }) {
  const [userToggle, setUserToggle] = useState(false);
  const [toggle, setToggle] = useState(false)

  const isToggle = () => {
    setToggle(!toggle)
  }




  return (
    <>
      <div className='header'>
        <div className='menu-toggle' onClick={isToggle}><FaGamepad color='white' size={30} /></div>

      </div>
      <div className={`nav ${toggle ? "active" : ""}`} >
        <div className='account-container'>
          <div className='account' >
            {!user && <Link to='/user-login'><button className='login-button'>Bejelentkezés</button></Link>}
            {user && <RiAccountCircleFill color='white' size={40} onClick={() => { setUserToggle(!userToggle) }} />}
          </div>


          <Link to='/checkout/cart' className='link'>
            <div className='shopping-cart'>

              <AiOutlineShoppingCart size={25} color='white' />
              <span className='numer-of-items'>
                {shoppingCart.reduce(function (acc, product) { ; return acc + product.quantity; }, 0)}
              </span>

            </div>
          </Link>
          <div className='account-menu'> {userToggle && <AccountToggle user={user} setUser={setUser} setUserToggle={setUserToggle} />}</div>

        </div>



      </div>
    </>
  )
}



