import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function AddProduct() {
  const navigate = useNavigate();
  const adminToken = localStorage.getItem('adminToken');
  const addProduct = async (event) => {
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
    }

    const file = event.target.elements.imageCover.files[0]

    const formData = new FormData();
    formData.append('product', JSON.stringify(product))
    formData.append('coverImage', file);


    if (adminToken) {
      await axios({
        method: "POST",
        url: "/api/products",
        data: formData,
        headers: { Authorization: `Bearer ${adminToken}` }
      })
      navigate('/dashboard')
    }
  }

  return (
    <div className="add-product-form-container">
      <h1>Add product</h1>
      <form onSubmit={addProduct}>
        <input name="title" placeholder="title" required />
        <select name="type" required>
          <option value="ps4">PS4</option>
          <option value="ps5">PS5</option>
          <option value="psVita">PSVita</option>
          <option value="xboxOne">Xbox One</option>
          <option value="xboxSeriesX">Xbox Series X</option>

        </select>
        <input name="manufacturer" placeholder="manufacturer" required />
        <input name="guarantee" placeholder="guarantee" required />
        <select name="isInStock" required>
          <option value="true">true</option>
          <option value="false">false</option>
        </select>
        <input type="number" name="price" placeholder="price" min={1} required />
        <input type="number" name="discount" placeholder="discount" min={0} max={99} required />
        <input type="file" name="imageCover" required />
        <textarea placeholder='description' name="description" required></textarea>
        <button type="submit" >Send Product</button>
      </form>
      <button onClick={() => navigate('/dashboard')}>Close</button>
    </div>
  )
}