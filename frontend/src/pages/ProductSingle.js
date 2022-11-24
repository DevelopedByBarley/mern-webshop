import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function ProductSingle() {
  const params = useParams();
  const id = params.productId;
  const [product, setProduct] = useState('');
  
  useEffect(() => {
    axios.get(`/api/products/${id}`)
    .then(res => setProduct(res.data.product))
  }, [])


  console.log(product);

  return (
    <div>
      <h1>{product.title}</h1>
      <h1>{product._id}</h1>
    </div>
  )
}