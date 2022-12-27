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
        <MenuToggler setMenuToggle={setMenuToggle} isMenuToggle={isMenuToggle} />
        <Link className='nav-link' to={'/'} onClick={closeMenuToggle}> Kezdőlap </Link>
        <Link className='nav-link' to={'/products/xboxOne'} onClick={closeMenuToggle}> Xbox One </Link>
        <Link className='nav-link' to={'/products/xboxSeriesX'} onClick={closeMenuToggle}> Xbox Series X </Link>
        <Link className='nav-link' to={'/products/pc'} onClick={closeMenuToggle}> PC </Link>
        <Link className='nav-link' to={'/products/ps4'} onClick={closeMenuToggle}> Playstation 4 </Link>
        <Link className='nav-link' to={'/products/ps5'} onClick={closeMenuToggle}> Playstation 5 </Link>
        <Link className='nav-link' to={'/products/nintendo'} onClick={closeMenuToggle}> Nintendo </Link>
        <Link className='nav-link' to={'/products/okosóra'} onClick={closeMenuToggle}> Okosórák </Link>
      </div>
    </nav>
      <Account user={user} setUser={setUser} />
      <ShoppingCart shoppingCart={shoppingCart} />
      <SearchBox user={user} setUser={setUser} />
    </>
  )
}


{/*<div className='menu-toggle' onClick={isToggle}><FaGamepad color='white' size={30} /></div>*/ }
