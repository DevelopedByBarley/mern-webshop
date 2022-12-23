import '../styles/components/Nav.css'
import { useState } from 'react';

import { SearchBox } from './SearchBox';
import { ShoppingCart } from './ShoppingCart';
import { Account } from './Account';
import { Link } from 'react-router-dom';
import { MenuToggler } from './MenuToggler';

export function Nav({ shoppingCart, user, setUser }) {

  const [isMenuToggle, setMenuToggle] = useState(false);

  const closeMenuToggle = () => {
    setMenuToggle(false)
  }

  return (
    <>      <nav className='nav'>
      <div className={`menu  ${isMenuToggle ? "active" : ""}`}  >
        <MenuToggler setMenuToggle={setMenuToggle} isMenuToggle={isMenuToggle}/>
        <Link className='nav-link' to={'/'} onClick={closeMenuToggle}> Kezdőlap </Link>
        <Link className='nav-link' to={'/error-page'} onClick={closeMenuToggle}> Xbox </Link>
        <Link className='nav-link' to={'/error-page'} onClick={closeMenuToggle}> PC </Link>
        <Link className='nav-link' to={'/error-page'} onClick={closeMenuToggle}> Playstation </Link>
        <Link className='nav-link' to={'/error-page'} onClick={closeMenuToggle}> Mobil </Link>
      </div>
    </nav>
      <Account user={user} setUser={setUser} />
      <ShoppingCart shoppingCart={shoppingCart} />
      <SearchBox user={user} setUser={setUser} />
    </>
  )
}


{/*<div className='menu-toggle' onClick={isToggle}><FaGamepad color='white' size={30} /></div>*/ }
