import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


export function UpdateProduct({ setPopUpActive, setProducts }) {
  const navigate = useNavigate();
  const param = useParams();
  const id = param.productId;
  const adminToken = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!adminToken) {
      navigate('/')
    }
  }, [])




  const updateProduct = async (event) => {
    event.preventDefault();
    const newProduct = {
      title: event.target.elements.title.value,
      categorie: event.target.elements.categorie.value,
      manufacturer: event.target.elements.manufacturer.value,
      guarantee: event.target.elements.guarantee.value,
      isInStock: event.target.elements.isInStock.value,
      price: event.target.elements.price.value,
      discount: event.target.elements.discount.value,
      description: event.target.elements.description.value,
    }

    if (adminToken) {
      await axios.put(`/api/products/${id}`, newProduct, {
        headers: { Authorization: `Bearer ${adminToken}` }
      })
      navigate('/dashboard')
    }
  }

  return (
    <div className="add-product-form-container">
      <h1>Update product</h1>
      <form onSubmit={updateProduct}>
        <input name="title" placeholder="title" required />
        <select name="categorie" required>
          <option value="ps4">ps4</option>
        </select>
        <input name="manufacturer" placeholder="manufacturer" required />
        <input name="guarantee" placeholder="guarantee" required />
        <select name="isInStock" required>
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
        <input type="number" name="price" placeholder="price" required />
        <input type="number" name="discount" placeholder="discount" />
        <textarea placeholder='description' name="description" required></textarea>
        <button type="submit" >Send Product</button>
      </form>
      <button onClick={() => navigate('/dashboard')}>Close</button>
    </div>
  )
}