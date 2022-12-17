import '../styles/components/Nav.css'
import { useState } from 'react';

import { SearchBox } from './SearchBox';
import { ShoppingCart } from './ShoppingCart';
import { Account } from './Account';

export function Nav({ shoppingCart, user, setUser }) {
 
  return (
    <>
      <nav className='nav'>
      </nav>
      <Account user={user} setUser={setUser}/>
      <ShoppingCart shoppingCart={shoppingCart}/>
      <SearchBox user={user} setUser={setUser} />
    </>
  )
}


{/*<div className='menu-toggle' onClick={isToggle}><FaGamepad color='white' size={30} /></div>*/ }
