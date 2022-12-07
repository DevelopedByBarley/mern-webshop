import '../styles/pages/ProductSingle.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import SetShoppingCartButton from '../components/SetShoppingCartButton';

export function ProductSingle({ getProductSingle }) {
  const params = useParams();
  const id = params.productId;
  const [isPending, setPending] = useState(true);
  const [product, setProduct] = useState('');

  useEffect(() => {
    setTimeout(() => {
      axios.get(`/api/products/${id}`)
        .then(res => setProduct(res.data.product))
        .finally(() => { setPending(false) })
    }, 1200)
  }, [id])

  const isInStockStyle = {
    color: `${product.isInStock ? "green" : "red"}`
  }




  return (
    <>
      {isPending ? (
        <Spinner />
      ) : (
        <div className='single-product-container'>
          <div className='single-product-header'>
            <div className='single-product-image'>
              <img src={`/assets/files/${product.image}`} />
            </div>
            <div className='single-product-header-content'>
              <h1 className='title'>{product.title}</h1>
              <h1 className='isInStock' style={isInStockStyle}>{product.isInStock ? "Raktáron, Szállitással 1-5 munkanap" : "Nincs raktáron"}</h1>
              <h1 className='discount'>-{product.discount}%</h1>
              <SetShoppingCartButton product={product} getProductSingle={getProductSingle} />
            </div>
          </div>
          <div className='single-product-body'>
        {/* <div className='product-properties'></div> */}
            <div className='single-product-body-content'>
              <div className='description'>
                <h1 className='description-title'>Termékleirás</h1>
                <br />
                <p>{product.description}</p>
              </div>

                <div className='single-product-video'>
                  <iframe width="560" height="315" src={product.video} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
          </div>
          <div className='single-product-footer'>
            <h1>Footer</h1>
          </div>
        </div>
      )}
    </>
  )
}
