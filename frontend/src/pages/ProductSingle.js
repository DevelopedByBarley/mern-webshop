import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from '../components/Spinner';

export function ProductSingle() {
  const params = useParams();
  const id = params.productId;
  const [isPending, setPending] = useState(true);
  const [product, setProduct] = useState('');

  useEffect(() => {
    setTimeout(() => {
      axios.get(`/api/products/${id}`)
        .then(res => setProduct(res.data.product))
        .finally(() => {setPending(false)})
    }, 1200)
  }, [id])


  return (
    <>
      {isPending ? (
        <Spinner/>
      ) : (
        <div>
          <img style={{ height: "200px", width: "200px" }} src={`/assets/files/${product.image}`} />
          <h1>{product.title}</h1>
          <h1>{product._id}</h1>
        </div>
      )}
    </>
  )
}