import '../../styles/pages/Product/Products.css'
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductCard } from '../../components/ProductCard';


export function Products({getProductSingle}) {
  const [products, setProducts] = useState([])
  const params = useParams();
  const platformType = params.platformType;



  useEffect(() => {
    window.scrollTo(0, 0);
    axios.post(`/api/products/${platformType}`)
      .then(res => setProducts(res.data.products))
  }, [platformType])



  return (
    <div className='platform-products-container'>
      <div className='products'>
        {products?.map((product) => {
          return <ProductCard product={product} getProductSingle={getProductSingle} />
        })}
      </div>
    </div>
  )
}
