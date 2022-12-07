import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


export function UpdateProduct({ setPopUpActive, setProducts }) {
  const navigate = useNavigate();
  const param = useParams();
  const id = param.productId;
  const adminToken = localStorage.getItem('adminToken');
  const [imageNameForDelete, setImagNameForDelete] = useState('')
  const [product, setProduct] = useState('');

  console.log(imageNameForDelete);

  useEffect(() => {

    axios.get(`/api/products/${id}`)
      .then(res => {
        setProduct(res.data.product)
        setImagNameForDelete(res.data.product.image)
      })
    if (!adminToken) {
      navigate('/')
    }
  }, [])




  const updateProduct = async (event) => {
    event.preventDefault();
    const product = {
      title: event.target.elements.title.value,
      type: event.target.elements.type.value,
      manufacturer: event.target.elements.manufacturer.value,
      guarantee: event.target.elements.guarantee.value,
      isInStock: event.target.elements.isInStock.value,
      price: event.target.elements.price.value,
      discount: event.target.elements.discount.value,
      description: event.target.elements.description.value,
      video: event.target.elements.video.value,
    }

    const file = event.target.elements.imageCover.files[0]
    const formData = new FormData();
    formData.append('product', JSON.stringify(product))
    formData.append('imageNameForDelete', imageNameForDelete);
    formData.append('coverImage', file);

    if (adminToken) {
      await axios.put(`/api/products/${id}`, formData, {
        headers: { Authorization: `Bearer ${adminToken}` }
      })
      navigate('/dashboard')
    }
  }

  return (
    <div className="add-product-form-container">
      <h1>Update product</h1>
      <form onSubmit={updateProduct}>
        <input name="title" placeholder="title" defaultValue={product.title} required />
        <select name="type" required>
          <option value="ps4">PS4</option>
          <option value="ps5">PS5</option>
          <option value="psVita">PSVita</option>
          <option value="XboxOne">Xbox One</option>
          <option value="XboxSeriesX">Xbox Series X</option>
        </select>
        <input name="manufacturer" placeholder="manufacturer" defaultValue={product.manufacturer} required />
        <input name="guarantee" placeholder="guarantee" defaultValue={product.guarantee} required />
        <select name="isInStock" required>
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
        <input type="number" name="price" placeholder="price" min={1} defaultValue={product.price} required />
        <input type="number" name="discount" placeholder="discount" min={0} max={99} defaultValue={product.discount} required />
        <input type="file" name="imageCover" />
        <input type="text" name="video" placeholder="video src" defaultValue={product.video} required />

        <textarea placeholder='description' name="description"   defaultValue={product.description} required></textarea>
        <button type="submit" >Send Product</button>
      </form>
      <button onClick={() => navigate('/dashboard')}>Close</button>
    </div>
  )
}