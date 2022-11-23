import { useParams } from 'react-router-dom';

export function ProductSingle() {
  const params = useParams();
  const id = params.productId;
 
  return <h1>Single</h1>
}