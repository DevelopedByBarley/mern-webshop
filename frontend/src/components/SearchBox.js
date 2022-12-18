
import '../styles/components/SearchBox.css'
import axios from 'axios'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'
import { Spinner } from './Spinner';
import ScaleLoader from "react-spinners/ScaleLoader";

export function SearchBox() {
  const [searchBoxToggle, setSearchBoxToggle] = useState(false);
  const [isPending, setPending] = useState(false)
  const [foundProducts, setFoundProducts] = useState([]);


  const searchProducts = (event) => {
    event.preventDefault();
    const title = event.target.value;

    axios.post('/api/products/searchProducts', {
      title: title
    }).then((res) => {
      setPending(true)
      if (event.target.value.length > 2) {
        setTimeout(() => {
          setFoundProducts(res.data)
          setPending(false)
        }, 1200)
      } else {
        setFoundProducts([])
        setPending(false)
      }
    })
  }


  return (
    <>
      <div className='searchBox-container'>
        {searchBoxToggle ?
          (
            <>
              <div className='searchBox'>
                <span><AiOutlineCloseCircle className='close-icon' size={20} onClick={() => {
                  setSearchBoxToggle(false)
                  setFoundProducts([])
                }} /></span>
                <input type="text" name="title" placeholder='Keresés..' onChange={searchProducts} />
              </div>
              <div className='foundProducts'>
                {isPending ?
                  <div className='spinner-container' style={{ textAlign: "center" }}>
                    <Spinner color={"#9b3b40"} size={40} isFullPage={false} SpinnerName={ScaleLoader} className="spinner" />
                  </div>
                  :
                  (
                    <>
                      {foundProducts.map((product) => {
                        return (
                          <Link to={`/product-single/${product._id}`} className="product-link">
                            <div key={product._id} className='product' onClick={() => { setFoundProducts([]); setSearchBoxToggle(false) }}>
                              <input style={{ height: "40px", width: "40px", borderRadius: "50%", margin: ".5rem" }} type="image" img src={`/assets/files/${product.image}`} alt="photo" />
                              <h2 className='product-title'>{product.title}</h2>
                              <p className='product-price'>{product.price} Ft</p>
                            </div>
                          </Link>
                        )
                      })}
                    </>
                  )}


                {foundProducts.length === 8 && <Link onClick={setFoundProducts([])} to="/error-page">További találatok..</Link>}
              </div>
            </>
          )
          :
          (
            <div className='search'>
              <BsSearch className='icon' size={30} onClick={() => { setSearchBoxToggle(true) }} />
            </div>
          )
        }
      </div>
    </>
  )
}
