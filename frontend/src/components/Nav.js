import '../styles/components/Nav.css'
import axios from 'axios'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiAccountCircleFill } from 'react-icons/ri';
import { AccountToggle } from './AccountToggle';


export function Nav({ shoppingCart, user, setUser }) {
  const [userToggle, setUserToggle] = useState(false);
  const [foundProducts, setFoundProducts] = useState([]);



  const searchProducts = (event) => {
    event.preventDefault();
    const title = event.target.value;
   
      axios.post('/api/products/searchProducts', {
        title: title
      })
        .then((res) => {
          if (event.target.value.length > 0) {
            setFoundProducts(res.data)
          } else {
            setFoundProducts([])
          }
        })
  
  }





  return (
    <>
      <div className='header'>
        {/*<div className='menu-toggle' onClick={isToggle}><FaGamepad color='white' size={30} /></div>*/}
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
          <div className='account-menu'>
            <AccountToggle user={user} setUser={setUser} userToggle={userToggle} setUserToggle={setUserToggle} />
          </div>
        </div>
        <div className='searchBox-container'>
          <div className='searchBox'>
            <input type="text" name="title" placeholder='Keresés..' onChange={searchProducts} />
          </div>
          <div className='foundProducts'>

            {foundProducts.map((product) => {
              return (
                <Link to={`/product-single/${product._id}`} className="product-link">
                  <div key={product._id} className='product' onClick={() => { setFoundProducts([]) }}>
                    <input style={{ height: "65px", width: "65px", borderRadius: "50%", margin: ".5rem" }} type="image" img src={`/assets/files/${product.image}`} alt="photo" />
                    <h2 className='product-title'>{product.title}</h2>
                    <p className='product-price'>{product.price} Ft</p>
                  </div>
                </Link>
              )
            })}

            {foundProducts.length === 8 && <Link onClick={setFoundProducts([])} to="/error-page">További találatok..</Link>}
          </div>
        </div>
      </div>
      <nav className='nav'></nav>
    </>
  )
}

{/**

      <div className={`nav ${toggle ? "active" : ""}`} >



      </div>*/}


